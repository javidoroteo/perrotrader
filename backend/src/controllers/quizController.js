const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const quizService = require('../services/quizService');
const portfolioService = require('../services/portfolioServices');
const personalityService = require('../services/personalityServices');
const questions = require('../data/questions');
const personalityQuestions = require('../data/personalityQuestions');


class QuizController {
  
  /**
   * Verifica si tanto el quiz como el test de personalidad están completos
   */
  async checkBothTestsComplete(sessionId) {
    try {
      // Verificar quiz
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId }
      });
      
      // Verificar test de personalidad
      const personalityTest = await prisma.personalityTest.findUnique({
        where: { sessionId }
      });
      
      const quizComplete = session ? session.isCompleted : false;
      const personalityComplete = personalityTest ? personalityTest.completed : false;
      
      return {
        quizComplete,
        personalityComplete,
        bothComplete: quizComplete && personalityComplete,
        session,
        personalityTest
      };
    } catch (error) {
      console.error('Error checking tests completion:', error);
      return {
        quizComplete: false,
        personalityComplete: false,
        bothComplete: false,
        session: null,
        personalityTest: null
      };
    }
  }

  /**
   * Genera resultado final solo cuando ambos tests estén completos
   */
async generateFinalResultIfBothComplete(sessionId) {
  const testStatus = await this.checkBothTestsComplete(sessionId);
  
  if (!testStatus.bothComplete) {
    return {
      success: true,
      completed: false,
      quizComplete: testStatus.quizComplete,
      personalityComplete: testStatus.personalityComplete,
      message: testStatus.quizComplete 
        ? 'Quiz completado. Esperando test de personalidad.'
        : 'Test de personalidad completado. Esperando quiz.',
      nextStep: testStatus.quizComplete ? 'personality_test' : 'continue_quiz'
    };
  }
  
  try {
    // Resultado del quiz
    const quizResult = await portfolioService.completeFinalResult(testStatus.session);

    // Resultado de personalidad
    const personalityResult = testStatus.personalityTest 
      ? await personalityService.processCompleteTest(
          sessionId, 
          Array.isArray(testStatus.personalityTest.responses)
            ? testStatus.personalityTest.responses
            : JSON.parse(testStatus.personalityTest.responses)
        )
      : null;

      
    // *** CAMBIO PRINCIPAL: Estructura correcta ***
    return {
      success: true,
      completed: true,
      result: {
        sessionId: sessionId,
        // Datos del quiz (portfolioService.completeFinalResult)
        riskProfile: quizResult.riskProfile,
        experienceLevel: quizResult.experienceLevel,
        portfolio: quizResult.portfolio,
        report: quizResult.report,                    // <- Aquí está tu report
        rentaFijaAdvice: quizResult.rentaFijaAdvice,
        rentaVariableAdvice: quizResult.rentaVariableAdvice,
        investmentStrategies: quizResult.investmentStrategies,
        educationalGuide: quizResult.educationalGuide,
        investorProfile: quizResult.investorProfile,
        portfolioExplanation: quizResult.portfolioExplanation,
        
        // Datos de personalidad (solo el profile)
        personality: personalityResult ? personalityResult.profile : null
      }
    };
  } catch (error) {
    console.error('Error generating final result:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

  // Iniciar nueva sesión del cuestionario
  async startQuiz(req, res) {
    try {
      const sessionId = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

      const session = await prisma.quizSession.create({
        data: {
          id: sessionId,
          expiresAt,
          currentQuestionId: 101 // Primera pregunta
        }
      });

      const firstQuestion = quizService.getQuestionById(101);

      res.json({
        success: true,
        sessionId,
        question: firstQuestion,
        progress: {
          current: 1,
          total: questions.length,
          percentage: (1 / questions.length) * 100
        }
      });
    } catch (error) {
      console.error('Error starting quiz:', error);
      res.status(500).json({ error: 'Error al iniciar el cuestionario' });
    }
  }

  // Obtener pregunta actual
  async getCurrentQuestion(req, res) {
    try {
      const { sessionId } = req.params;
      
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { answers: { orderBy: { createdAt: 'asc' } } }
      });

      if (!session) {
        return res.status(404).json({ error: 'Sesión no encontrada' });
      }

      if (new Date() > session.expiresAt) {
        return res.status(410).json({ error: 'Sesión expirada' });
      }

      if (session.isCompleted) {
        // Verificar si ambos tests están completos antes de mostrar resultado
        const finalResult = await this.generateFinalResultIfBothComplete(sessionId);
        return res.json(finalResult);
      }

      const question = quizService.getQuestionById(session.currentQuestionId);
      
      // Usar el sistema de progreso consistente
      const progress = quizService.calculateProgress(session.answers.length, questions.length);

      // Agregar conteo de preguntas respondidas para la barra
      progress.answeredCount = session.answers.length;
      
      // Agregar progreso global si hay test de personalidad
      const personalityTest = await prisma.personalityTest.findUnique({
        where: { sessionId }
      });
      
      if (personalityTest) {
        const personalityProgress = quizService.calculatePersonalityProgress(
          personalityTest.currentBlock || 1
        );
        progress.globalProgress = quizService.calculateGlobalProgress(progress, personalityProgress);
      }

      res.json({
        success: true,
        question,
        progress,
        canGoBack: session.answers.length > 0
      });
    } catch (error) {
      console.error('Error getting current question:', error);
      res.status(500).json({ error: 'Error al obtener la pregunta' });
    }
  }

  // Responder pregunta
  async answerQuestion(req, res) {
    try {
      const { sessionId, questionId, answerIndex, answerText, selectedAnswers } = req.body;

      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { answers: true }
      });

      if (!session) {
        return res.status(404).json({ error: 'Sesión no encontrada' });
      }

      if (new Date() > session.expiresAt) {
        return res.status(410).json({ error: 'Sesión expirada' });
      }

      const question = quizService.getQuestionById(questionId);
      if (!question) {
        return res.status(400).json({ error: 'Pregunta no válida' });
      }

      // ========================================
      // NUEVA LÓGICA PARA SELECCIÓN MÚLTIPLE
      // ========================================
      
      let finalAnswer, finalPoints = 0, finalConoPoints = 0, finalExPoints = 0;
      let cryptoExposure = 0, timeValue = 0, emergencyFund = 0, esgValue = 0;
      let dividend = 0, pensionFund = 0, gold = 0, age = 0, buyHouse = 0, childrenEducation = 0, wealthGrowth = 0
      let nextQuestionId;

      if (question.multipleSelect && selectedAnswers && Array.isArray(selectedAnswers)) {
        // SELECCIÓN MÚLTIPLE: Procesar array de respuestas
        const selectedTexts = [];
        let maxExPoints = 0;

        selectedAnswers.forEach(index => {
          const answer = question.answers[index];
          if (answer) {
            selectedTexts.push(answer.text);
            
            // Sumar todos los puntos excepto Expoints (donde tomamos el máximo)
            finalPoints += answer.points || 0;
            finalConoPoints += answer.conopoints || 0;
            maxExPoints = Math.max(maxExPoints, answer.Expoints || 0); // ← MÁXIMO para Expoints
            cryptoExposure += answer.criptoExposure || 0;
            timeValue += answer.timeValue || 0;
            emergencyFund += answer.emergencyFund || 0;
            esgValue += answer.esg || 0;
            dividend += answer.dividend || 0;
            pensionFund += answer.pensionFund || 0;
            gold += answer.gold || 0;
            age += answer.age || 0;
            buyHouse += answer.buyHouse || 0;
            childrenEducation += answer.childrenEducation || 0;
            wealthGrowth += answer.wealthGrowth || 0;
          }
        });

        finalExPoints = maxExPoints; // ← Usar el máximo para Expoints
        finalAnswer = answerText; // Ya viene combinado del frontend
        
        // Usar nextQuestion del primer elemento seleccionado
        nextQuestionId = question.answers[selectedAnswers[0]]?.nextQuestion || 
                       quizService.getNextQuestionId(questionId);

      } else {
        // SELECCIÓN ÚNICA: Lógica original (SIN CAMBIOS)
        const answer = question.answers[answerIndex];
        if (!answer) {
          return res.status(400).json({ error: 'Respuesta no válida' });
        }

        finalAnswer = answerText;
        finalPoints = answer.points || 0;
        finalConoPoints = answer.conopoints || 0;
        finalExPoints = answer.Expoints || 0;
        cryptoExposure = answer.criptoExposure || 0;
        timeValue = answer.timeValue || 0;
        emergencyFund = answer.emergencyFund || 0;
        esgValue = answer.esg || 0;
        dividend = answer.dividend || 0;
        pensionFund = answer.pensionFund || 0;
        gold = answer.gold || 0;
        age = answer.age || 0;
        buyHouse = answer.buyHouse || 0;
        childrenEducation = answer.childrenEducation || 0;
        wealthGrowth = answer.wealthGrowth || 0;
        nextQuestionId = answer.nextQuestion || quizService.getNextQuestionId(questionId);
      }

      // ========================================
      // GUARDAR RESPUESTA (actualizado para usar variables finales)
      // ========================================

      // Guardar respuesta
      await prisma.quizAnswer.create({
        data: {
          sessionId,
          questionId,
          answerIndex: question.multipleSelect ? -1 : answerIndex, // -1 para múltiple
          answerText: finalAnswer,
          points: finalPoints,
          conoPoints: finalConoPoints,
          exPoints: finalExPoints,
          cryptoExposure,
          timeValue,
          emergencyFund,
          esgValue,
          dividend,
          pensionFund,
          gold,
          age,
          buyHouse,
          childrenEducation,
          wealthGrowth
        }
      });

      // Actualizar sesión
      const updatedSession = await prisma.quizSession.update({
        where: { id: sessionId },
        data: {
          currentQuestionId: nextQuestionId,
          totalScore: { increment: finalConoPoints + finalPoints },
          experienceScore: { increment: finalExPoints },
          cryptoScore: { increment: cryptoExposure },
          timeValue: { increment: timeValue },
          emergencyFund: { increment: emergencyFund },
          esgValue: { increment: esgValue },
          dividend: { increment: dividend },
          pensionFund: { increment: pensionFund },
          gold: { increment: gold },
          age: { increment: age },
          buyHouse: { increment: buyHouse },
          childrenEducation: { increment: childrenEducation },
          wealthGrowth: { increment: wealthGrowth }
        },
        include: { answers: true }
      });

      // Verificar si el cuestionario está completo
      if (!nextQuestionId || quizService.isQuizComplete(nextQuestionId)) {
        // Marcar quiz como completo
        await prisma.quizSession.update({
          where: { id: sessionId },
          data: { isCompleted: true }
        });
        
        // Verificar si ambos tests están completos antes de generar resultado final
        const finalResult = await this.generateFinalResultIfBothComplete(sessionId);
        
        return res.json(finalResult);
      }

      // Obtener siguiente pregunta y calcular progreso
      const nextQuestion = quizService.getQuestionById(nextQuestionId);
      const progress = quizService.calculateProgress(updatedSession.answers.length, questions.length);
      // Agregar conteo de preguntas respondidas para la barra
      progress.answeredCount = updatedSession.answers.length;

      res.json({
        success: true,
        question: nextQuestion,
        progress,
        canGoBack: true
      });

    } catch (error) {
      console.error('Error answering question:', error);
      res.status(500).json({ error: 'Error al procesar la respuesta' });
    }
  }

  // Ir a pregunta anterior
  async goToPreviousQuestion(req, res) {
    try {
      const { sessionId } = req.body;

      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { 
          answers: { 
            orderBy: { createdAt: 'desc' }
          } 
        }
      });

      if (!session || session.answers.length === 0) {
        return res.status(400).json({ error: 'No hay preguntas anteriores' });
      }

      // Eliminar la última respuesta
      const lastAnswer = session.answers[0];
      await prisma.quizAnswer.delete({
        where: { id: lastAnswer.id }
      });

      // Actualizar puntuaciones de la sesión (restar los puntos de la respuesta eliminada)
      await prisma.quizSession.update({
        where: { id: sessionId },
        data: {
          currentQuestionId: lastAnswer.questionId,
          totalScore: { decrement: (lastAnswer.points || 0) + (lastAnswer.conoPoints || 0) },
          experienceScore: { decrement: lastAnswer.exPoints || 0 },
          cryptoScore: { decrement: lastAnswer.cryptoExposure || 0 },
          timeValue: { decrement: lastAnswer.timeValue || 0 },
          emergencyFund: { decrement: lastAnswer.emergencyFund || 0 },
          esgValue: { decrement: lastAnswer.esg || 0 },
          dividend: { decrement: lastAnswer.dividend || 0 },
          pensionFund: { decrement: lastAnswer.pensionFund || 0 },
          gold: { decrement: lastAnswer.gold || 0 },
          age: { decrement: lastAnswer.age || 0 },
          buyHouse: { decrement: lastAnswer.buyHouse || 0 },
          childrenEducation: { decrement: lastAnswer.childrenEducation || 0 },
          wealthGrowth: { decrement: lastAnswer.wealthGrowth || 0 },
          isCompleted: false
        }
      });

      // Obtener pregunta actual
      const question = quizService.getQuestionById(lastAnswer.questionId);
      const remainingAnswers = session.answers.slice(1);
      const progress = quizService.calculateProgress(remainingAnswers.length, questions.length);

      res.json({
        success: true,
        question,
        progress,
        canGoBack: remainingAnswers.length > 0
      });

    } catch (error) {
      console.error('Error going to previous question:', error);
      res.status(500).json({ error: 'Error al retroceder' });
    }
  }

  // Obtener progreso
  async getProgress(req, res) {
    try {
      const { sessionId } = req.params;
      
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { answers: true }
      });

      if (!session) {
        return res.status(404).json({ error: 'Sesión no encontrada' });
      }

      const progress = quizService.calculateProgress(session.answers.length, questions.length);
      progress.answeredCount = session.answers.length;
      
      res.json({
        success: true,
        progress,
        answeredQuestions: session.answers.length,
        totalQuestions: questions.length,
        isCompleted: session.isCompleted
      });
    } catch (error) {
      console.error('Error getting progress:', error);
      res.status(500).json({ error: 'Error al obtener progreso' });
    }
  }

  // Obtener resultado final
  async getFinalResult(req, res) {
    try {
      const { sessionId } = req.params;
      
      const finalResult = await this.generateFinalResultIfBothComplete(sessionId);
      res.json(finalResult);
    } catch (error) {
      console.error('Error getting final result:', error);
      res.status(500).json({ error: 'Error al obtener resultado' });
    }
  }

  // Reiniciar cuestionario
  async restartQuiz(req, res) {
    try {
      const { sessionId } = req.params;
      
      // Eliminar respuestas existentes
      await prisma.quizAnswer.deleteMany({
        where: { sessionId }
      });

      // Resetear sesión
      await prisma.quizSession.update({
        where: { id: sessionId },
        data: {
          currentQuestionId: 101,
          isCompleted: false,
          totalScore: 0,
          experienceScore: 0,
          cryptoScore: 0,
          timeValue: 0,
          emergencyFund: 0,
          esgValue: 0,
          dividend  : 0,
          pensionFund: 0,
          gold: 0,
          age: 0,
          riskProfile: null,
          portfolioData: null,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
      });

      const firstQuestion = quizService.getQuestionById(101);

      res.json({
        success: true,
        question: firstQuestion,
        progress: {
          current: 1,
          total: questions.length,
          percentage: (1 / questions.length) * 100
        }
      });
    } catch (error) {
      console.error('Error restarting quiz:', error);
      res.status(500).json({ error: 'Error al reiniciar cuestionario' });
    }
  }

  // Obtener todas las preguntas (para debug)
  async getAllQuestions(req, res) {
    try {
      res.json({
        success: true,
        questions,
        total: questions.length
      });
    } catch (error) {
      console.error('Error getting all questions:', error);
      res.status(500).json({ error: 'Error al obtener preguntas' });
    }
  }
}

module.exports = new QuizController();