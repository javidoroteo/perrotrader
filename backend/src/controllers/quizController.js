const prisma = require('../utils/prisma');
const { v4: uuidv4 } = require('uuid');
const quizService = require('../services/quizService');
const portfolioService = require('../services/portfolioServices');
const personalityService = require('../services/personalityServices');
const questions = require('../data/questions');
const personalityQuestions = require('../data/personalityQuestions');
const { generateUserProfileEmbedding } = require('../services/embeddingService');


class QuizController {
  
  /**
   * Verifica si tanto el quiz como el test de personalidad están completos
   */
  async checkBothTestsComplete(sessionId) {
    try {
      // Verificar quiz
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { user: true } // NUEVO: incluir info del usuario si existe
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
      nextStep: testStatus.quizComplete ? 'personality_test' : 'continue_quiz',
      canLinkToUser: testStatus.quizComplete && !testStatus.session.userId
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

    // ========================================
    // NUEVO: Crear y vectorizar perfil de inversión
    // ========================================
    try {
      // Solo crear perfil si el usuario está vinculado
      if (testStatus.session.userId) {
        
        // Extraer datos del perfil desde el quiz result
// Extraer datos del perfil desde TU quiz result REAL
const profileData = {
  // Edad: desde session.age (valores 1-7 del quiz)
  age: calculateAgeFromLevel(testStatus.session.age) || 35,
  
  // Ingresos y ahorros: NO los guardas directamente
  // Los estimamos desde experienceScore (conopoints acumulados)
  income: estimateIncomeFromConopoints(testStatus.session.experienceScore),
  savings: estimateSavingsFromConopoints(testStatus.session.experienceScore),
  
  // Nivel de conocimientos: basado en experienceScore (expoints)
  financialKnowledge: testStatus.session.experienceScore >= 9 ? 'ADVANCED' 
    : testStatus.session.experienceScore >= 5 ? 'INTERMEDIATE' 
    : 'BEGINNER',
  
  // Tolerancia al riesgo: desde riskProfile del resultado
  riskTolerance: quizResult.riskProfile || 'Riesgo Moderado',
  
  // Preferencias: extraídas de los valores del quiz
  investmentPreferences: extractPreferences(testStatus.session),
  
  // Horizonte temporal: basado en timeValue del quiz
  timeHorizon: testStatus.session.timeValue >= 4 ? 'LARGO' 
    : testStatus.session.timeValue >= 2 ? 'MEDIO' 
    : 'CORTO'
};

// Funciones auxiliares para estimar ingresos y ahorros
function calculateAgeFromLevel(ageLevel) {
  const ageMap = {
    1: 22,  // 18-25
    2: 28,  // 26-30
    3: 33,  // 31-35
    4: 40,  // 36-45
    5: 50,  // 46-55
    6: 60,  // 56-66
    7: 70   // 66+
  };
  return ageMap[ageLevel] || 35;
}

function estimateIncomeFromConopoints(conopoints) {
  // Conopoints reflejan patrimonio + ingresos + ahorro
  // Valores típicos: -1 a 22 puntos
  if (conopoints <= 3) return 15000;   // Bajo
  if (conopoints <= 7) return 30000;   // Medio-bajo
  if (conopoints <= 12) return 50000;  // Medio
  if (conopoints <= 18) return 80000;  // Medio-alto
  return 120000;                        // Alto
}

function estimateSavingsFromConopoints(conopoints) {
  // Estimación de ahorros basada en conopoints
  if (conopoints <= 3) return 5000;
  if (conopoints <= 7) return 15000;
  if (conopoints <= 12) return 30000;
  if (conopoints <= 18) return 60000;
  return 100000;
}


        // Verificar si ya existe perfil para este usuario
        const existingProfile = await prisma.userInvestmentProfile.findUnique({
          where: { userId: testStatus.session.userId }
        });

        if (existingProfile) {
          // Actualizar perfil existente
          const { generateUserProfileEmbedding } = require('../services/embeddingService');
          const { embedding, profileText } = await generateUserProfileEmbedding(profileData);
          const embeddingStr = `[${embedding.join(',')}]`;
          
          await prisma.$executeRawUnsafe(`
            UPDATE user_investment_profiles 
            SET 
              age = $1,
              income = $2,
              savings = $3,
              "financialKnowledge" = $4,
              "riskTolerance" = $5,
              "investmentPreferences" = $6,
              "timeHorizon" = $7,
              "profileText" = $8,
              embedding = $9::vector,
              "updatedAt" = NOW()
            WHERE "userId" = $10
          `, 
            profileData.age,
            profileData.income,
            profileData.savings,
            profileData.financialKnowledge,
            profileData.riskTolerance,
            profileData.investmentPreferences,
            profileData.timeHorizon,
            profileText,
            embeddingStr,
            testStatus.session.userId
          );
          
          console.log('✓ Perfil de inversión actualizado y vectorizado');
          
        } else {
          const { generateUserProfileEmbedding } = require('../services/embeddingService');
          const { embedding, profileText } = await generateUserProfileEmbedding(profileData);
          
          const profile = await prisma.userInvestmentProfile.create({
            data: {
              userId: testStatus.session.userId,
              ...profileData,
              profileText
            }
          });

          // Vectorizar el perfil
          const embeddingStr = `[${embedding.join(',')}]`;
          await prisma.$executeRawUnsafe(`
            UPDATE user_investment_profiles 
            SET embedding = $1::vector
            WHERE id = $2
          `, embeddingStr, profile.id);
          
          console.log('✓ Perfil de inversión creado y vectorizado');
        }
      }
    } catch (vectorError) {
      console.error('Error creando/vectorizando perfil:', vectorError);
      // No fallar si falla la vectorización
    }
    // ========================================

    return {
      success: true,
      completed: true,
      result: {
        sessionId: sessionId,
        userId: testStatus.session.userId,
        isLinkedToUser: !!testStatus.session.userId,
        // Datos del quiz (portfolioService.completeFinalResult)
        riskProfile: quizResult.riskProfile,
        experienceLevel: quizResult.experienceLevel,
        portfolio: quizResult.portfolio,
        report: quizResult.report,
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

  /**
   * Iniciar nueva sesión del cuestionario
   * MODIFICADO: Ahora puede vincular con usuario si está autenticado
   */
  async startQuiz(req, res) {
    try {
      const sessionId = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

      // NUEVO: Obtener userId si está autenticado (viene del middleware checkAuth)
      const userId = req.user?.id || null;

      const session = await prisma.quizSession.create({
        data: {
          id: sessionId,
          expiresAt,
          currentQuestionId: 101, // Primera pregunta
          userId // NUEVO: vincular con usuario si está loggeado
        }
      });

      const firstQuestion = quizService.getQuestionById(101);

      res.json({
        success: true,
        sessionId,
        userId: userId, // NUEVO: informar si está vinculado a usuario
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

  /**
   * NUEVO: Vincular sesión existente con usuario autenticado
   * Se usa cuando el usuario completa el quiz sin cuenta y luego se registra
   */
  async linkSessionToUser(req, res) {
    try {
      const { sessionId } = req.body;

      if (!req.user) {
        return res.status(401).json({
          error: 'Usuario no autenticado'
        });
      }

      // Verificar que la sesión existe y no está vinculada a otro usuario
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId }
      });

      if (!session) {
        return res.status(404).json({
          error: 'Sesión no encontrada'
        });
      }

      if (session.userId && session.userId !== req.user.id) {
        return res.status(403).json({
          error: 'Esta sesión ya está vinculada a otro usuario'
        });
      }

      // Vincular sesión al usuario
      const updatedSession = await prisma.quizSession.update({
        where: { id: sessionId },
        data: {
          userId: req.user.id,
          email: req.user.email // Actualizar email también
        }
      });

      res.json({
        success: true,
        message: 'Sesión vinculada correctamente al usuario',
        sessionId: updatedSession.id,
        userId: updatedSession.userId
      });
    } catch (error) {
      console.error('Error linking session to user:', error);
      res.status(500).json({
        error: 'Error vinculando sesión',
        message: error.message
      });
    }
  }

  /**
   * NUEVO: Obtener historial de sesiones del usuario autenticado
   */
  async getUserSessions(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Usuario no autenticado'
        });
      }

      const sessions = await prisma.quizSession.findMany({
        where: {
          userId: req.user.id
        },
        include: {
          personalityTest: true,
          _count: {
            select: { answers: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json({
        success: true,
        count: sessions.length,
        sessions: sessions.map(s => ({
          id: s.id,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          isCompleted: s.isCompleted,
          riskProfile: s.riskProfile,
          totalScore: s.totalScore,
          answersCount: s._count.answers,
          hasPersonalityTest: !!s.personalityTest
        }))
      });
    } catch (error) {
      console.error('Error getting user sessions:', error);
      res.status(500).json({
        error: 'Error obteniendo sesiones del usuario',
        message: error.message
      });
    }
  }

  // Obtener pregunta actual
  async getCurrentQuestion(req, res) {
    try {
      const { sessionId } = req.params;

      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { 
          answers: { orderBy: { createdAt: 'asc' } },
          user: true
        }
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
        canGoBack: session.answers.length > 0,
        userId: session.userId, // NUEVO: informar si está vinculado
        isLinkedToUser: !!session.userId // NUEVO: flag
      });
    } catch (error) {
      console.error('Error getting current question:', error);
      res.status(500).json({ error: 'Error al obtener la pregunta' });
    }
  }

  // Responder pregunta (SIN CAMBIOS - mantener toda la lógica existente)
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
      // LÓGICA PARA SELECCIÓN MÚLTIPLE (SIN CAMBIOS)
      // ========================================
      let finalAnswer, finalPoints = 0, finalConoPoints = 0, finalExPoints = 0;
      let cryptoExposure = 0, timeValue = 0, emergencyFund = 0, esgValue = 0;
      let dividend = 0, pensionFund = 0, gold = 0, age = 0, buyHouse = 0, childrenEducation = 0, wealthGrowth = 0;
      let nextQuestionId;

      if (question.multipleSelect && selectedAnswers && Array.isArray(selectedAnswers)) {
        // SELECCIÓN MÚLTIPLE
        const selectedTexts = [];
        let maxExPoints = 0;

        selectedAnswers.forEach(index => {
          const answer = question.answers[index];
          if (answer) {
            selectedTexts.push(answer.text);
            finalPoints += answer.points || 0;
            finalConoPoints += answer.conopoints || 0;
            maxExPoints = Math.max(maxExPoints, answer.Expoints || 0);
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

        finalExPoints = maxExPoints;
        finalAnswer = answerText;
        nextQuestionId = question.answers[selectedAnswers[0]]?.nextQuestion ||
          quizService.getNextQuestionId(questionId);
      } else {
        // SELECCIÓN ÚNICA
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

      // Guardar respuesta
      await prisma.quizAnswer.create({
        data: {
          sessionId,
          questionId,
          answerIndex: question.multipleSelect ? -1 : answerIndex,
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

  // Los siguientes métodos permanecen SIN CAMBIOS
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

      const lastAnswer = session.answers[0];

      await prisma.quizAnswer.delete({
        where: { id: lastAnswer.id }
      });

      await prisma.quizSession.update({
        where: { id: sessionId },
        data: {
          currentQuestionId: lastAnswer.questionId,
          totalScore: { decrement: (lastAnswer.points || 0) + (lastAnswer.conoPoints || 0) },
          experienceScore: { decrement: lastAnswer.exPoints || 0 },
          cryptoScore: { decrement: lastAnswer.cryptoExposure || 0 },
          timeValue: { decrement: lastAnswer.timeValue || 0 },
          emergencyFund: { decrement: lastAnswer.emergencyFund || 0 },
          esgValue: { decrement: lastAnswer.esgValue || 0 },
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

  async restartQuiz(req, res) {
    try {
      const { sessionId } = req.params;

      await prisma.quizAnswer.deleteMany({
        where: { sessionId }
      });

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
          dividend: 0,
          pensionFund: 0,
          gold: 0,
          age: 0,
          buyHouse: 0,
          childrenEducation: 0,
          wealthGrowth: 0,
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

// Función auxiliar para extraer preferencias de inversión
// Función auxiliar para extraer preferencias de inversión
// Basada en tus valores REALES del quiz
function extractPreferences(session) {
  const preferences = [];
  
  // ESG/Sostenibilidad (session.esgValue: 0, 1 o 2)
  if (session.esgValue && session.esgValue > 0) {
    preferences.push('sostenibilidad');
  }
  
  // Dividendos (session.dividend: 0 o 1)
  if (session.dividend === 1) {
    preferences.push('dividendos');
  }
  
  // Fondo de pensión (session.pensionFund: 0 o 1)
  if (session.pensionFund === 1) {
    preferences.push('pensión');
  }
  
  // Oro (session.gold: 0, 1 o 2)
  if (session.gold && session.gold > 0) {
    preferences.push('oro');
  }
  
  // Criptomonedas (session.cryptoScore: -1, 1, 2 o 3)
  if (session.cryptoScore && session.cryptoScore > 1) {
    preferences.push('criptomonedas');
  }
  
  // Comprar vivienda (session.buyHouse: 0 o 1)
  if (session.buyHouse === 1) {
    preferences.push('vivienda');
  }
  
  // Educación hijos (session.childrenEducation: 0 o 1)
  if (session.childrenEducation === 1) {
    preferences.push('educación');
  }
  
  // Crecimiento patrimonial (session.wealthGrowth: 0 o 1)
  if (session.wealthGrowth === 1) {
    preferences.push('crecimiento');
  }
  
  // Si no hay preferencias, poner "diversificación"
  return preferences.length > 0 ? preferences : ['diversificación'];
}


module.exports = new QuizController();

