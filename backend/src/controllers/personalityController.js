const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PersonalityService = require('../services/personalityServices');
/**
 * Controlador para manejar las operaciones del test de personalidad.
 * Este controlador actúa como intermediario entre las rutas y el servicio,
 * manejando validaciones, errores y respuestas estandarizadas.
 */

// Iniciar el test de personalidad
const startPersonalityTest = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'sessionId es requerido' });
    }
    const result = await PersonalityService.savePersonalityTest(sessionId, new Array(32).fill(null), 1);
    res.json({ success: true, personalityTest: result });
  } catch (error) {
    next(error);
  }
};

// Responder un bloque de preguntas
const answerBlock = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { blockResponses, blockNumber } = req.body;
    if (!sessionId || !Array.isArray(blockResponses) || blockResponses.length !== 8 || !Number.isInteger(blockNumber) || blockNumber < 1 || blockNumber > 4) {
      return res.status(400).json({ success: false, message: 'Datos inválidos: blockResponses debe ser un array de 8 enteros (1-7), blockNumber entre 1 y 4' });
    }
    if (blockResponses.some(r => !Number.isInteger(r) || r < 1 || r > 7)) {
      return res.status(400).json({ success: false, message: 'Cada respuesta debe ser un entero entre 1 y 7' });
    }
    const result = await PersonalityService.processBlock(sessionId, blockResponses, blockNumber);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener el estado actual del test
const getPersonalityTest = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'sessionId es requerido' });
    }
    const result = await PersonalityService.getPersonalityTest(sessionId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Test no encontrado' });
    }
    res.json({ success: true, personalityTest: result });
  } catch (error) {
    next(error);
  }
};

// Obtener las preguntas de un bloque específico
// Actualizar getBlockQuestions para incluir progreso correcto
const getBlockQuestions = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { blockNumber } = req.query;
    if (!sessionId || !blockNumber || !Number.isInteger(parseInt(blockNumber)) || parseInt(blockNumber) < 1 || parseInt(blockNumber) > 4) {
      return res.status(400).json({ success: false, message: 'sessionId y blockNumber (1-4) son requeridos' });
    }
    const personalityTest = await PersonalityService.getPersonalityTest(sessionId);
    if (!personalityTest) {
      return res.status(404).json({ success: false, message: 'Test no encontrado' });
    }
    const questions = PersonalityService.getShuffledQuestionsByBlock(parseInt(blockNumber));
    
    // Calcular progreso del test de personalidad
    const currentBlock = parseInt(blockNumber);
    const personalityProgress = {
      current: currentBlock,
      total: 4,
      percentage: Math.round((currentBlock / 4) * 100)
    };
    
    // Calcular progreso global incluyendo el quiz principal
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: { answers: true }
    });
    
    if (quizSession) {
      const quizProgress = { percentage: 100 }; // Quiz completado al llegar aquí
      personalityProgress.globalProgress = Math.round(70 + (personalityProgress.percentage * 0.3));
    }
    
    res.json({
      success: true,
      questions,
      progress: personalityProgress,
      currentBlock: personalityTest.currentBlock,
      completed: personalityTest.completed
    });
  } catch (error) {
    next(error);
  }
};

// Obtener el resultado final del test
const getPersonalityResult = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'sessionId es requerido' });
    }
    const personalityTest = await PersonalityService.getPersonalityTest(sessionId);
    if (!personalityTest || !personalityTest.completed) {
      return res.status(400).json({ success: false, message: 'Test no completado' });
    }
    const result = await PersonalityService.processCompleteTest(sessionId, personalityTest.responses);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Reiniciar el test de personalidad
const resetPersonalityTest = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'sessionId es requerido' });
    }
    const result = await PersonalityService.savePersonalityTest(sessionId, new Array(32).fill(null), 1);
    res.json({ success: true, message: 'Test de personalidad reiniciado', personalityTest: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startPersonalityTest,
  answerBlock,
  getPersonalityTest,
  getBlockQuestions,
  getPersonalityResult,
  resetPersonalityTest
};