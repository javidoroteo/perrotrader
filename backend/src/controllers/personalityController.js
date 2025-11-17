const prisma = require('../utils/prisma');
const PersonalityService = require('../services/personalityServices');

/**
 * Controlador para manejar el test de personalidad.
 * Todos los endpoints devuelven { success, completed, ... } para facilitar el frontend.
 * MODIFICADO: Ahora incluye información de vinculación con usuarios autenticados
 */

// Iniciar el test de personalidad
const startPersonalityTest = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'sessionId es requerido' 
      });
    }

    // NUEVO: Verificar si la sesión del quiz existe y tiene userId
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: { user: true }
    });

    if (!quizSession) {
      return res.status(404).json({
        success: false,
        message: 'Sesión del quiz no encontrada'
      });
    }

    // Crear test inicial con 32 respuestas nulas
    const result = await PersonalityService.savePersonalityTest(
      sessionId, 
      new Array(32).fill(null), 
      1
    );

    res.json({
      success: true,
      completed: false,
      personalityTest: result,
      currentBlock: 1,
      // NUEVO: Información de vinculación con usuario
      userId: quizSession.userId,
      isLinkedToUser: !!quizSession.userId
    });
  } catch (error) {
    next(error);
  }
};

// Responder un bloque de preguntas
const answerBlock = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { blockResponses, blockNumber } = req.body;

    // Validaciones
    if (!sessionId || !Array.isArray(blockResponses) || blockResponses.length !== 8 || 
        !Number.isInteger(blockNumber) || blockNumber < 1 || blockNumber > 4) {
      return res.status(400).json({ 
        success: false, 
        message: 'Datos inválidos: blockResponses debe ser un array de 8 enteros (1-7), blockNumber entre 1 y 4' 
      });
    }

    if (blockResponses.some(r => !Number.isInteger(r) || r < 1 || r > 7)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cada respuesta debe ser un entero entre 1 y 7' 
      });
    }

    const result = await PersonalityService.processBlock(sessionId, blockResponses, blockNumber);

    // NUEVO: Verificar si la sesión tiene usuario vinculado
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: { userId: true }
    });

    res.json({
      success: true,
      completed: result.completed,
      currentBlock: result.currentBlock,
      personalityTest: result,
      // NUEVO: Información de vinculación
      userId: quizSession?.userId,
      isLinkedToUser: !!quizSession?.userId
    });
  } catch (error) {
    next(error);
  }
};

// Obtener estado actual del test
const getPersonalityTest = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'sessionId es requerido' 
      });
    }

    const result = await PersonalityService.getPersonalityTest(sessionId);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'Test no encontrado' 
      });
    }

    // NUEVO: Obtener info del usuario si está vinculado
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: { userId: true }
    });

    res.json({
      success: true,
      completed: result.completed,
      personalityTest: result,
      currentBlock: result.currentBlock,
      // NUEVO: Información de vinculación
      userId: quizSession?.userId,
      isLinkedToUser: !!quizSession?.userId
    });
  } catch (error) {
    next(error);
  }
};

// Obtener bloque de preguntas
const getBlockQuestions = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { blockNumber } = req.query;

    if (!sessionId || !blockNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'sessionId y blockNumber son requeridos' 
      });
    }

    const parsedBlock = parseInt(blockNumber);
    
    if (isNaN(parsedBlock) || parsedBlock < 1 || parsedBlock > 4) {
      return res.status(400).json({ 
        success: false, 
        message: 'blockNumber debe estar entre 1 y 4' 
      });
    }

    const personalityTest = await PersonalityService.getPersonalityTest(sessionId);
    
    if (!personalityTest) {
      return res.status(404).json({ 
        success: false, 
        message: 'Test no encontrado' 
      });
    }

    const questions = PersonalityService.getShuffledQuestionsByBlock(parsedBlock);

    const personalityProgress = {
      current: parsedBlock,
      total: 4,
      percentage: Math.round((parsedBlock / 4) * 100)
    };

    // Calcular progreso global incluyendo el quiz principal
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: { 
        answers: true,
        user: true // NUEVO: incluir info del usuario
      }
    });

    if (quizSession) {
      // 70% es el quiz principal, 30% es personalidad
      personalityProgress.globalProgress = Math.round(70 + (personalityProgress.percentage * 0.3));
    }

    res.json({
      success: true,
      completed: personalityTest.completed,
      questions,
      progress: personalityProgress,
      currentBlock: parsedBlock,
      // NUEVO: Información de vinculación
      userId: quizSession?.userId,
      isLinkedToUser: !!quizSession?.userId
    });
  } catch (error) {
    next(error);
  }
};

// Obtener resultado final del test de personalidad
const getPersonalityResult = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'sessionId es requerido' 
      });
    }

    const personalityTest = await PersonalityService.getPersonalityTest(sessionId);
    
    if (!personalityTest || !personalityTest.completed) {
      return res.status(400).json({ 
        success: false, 
        message: 'Test no completado' 
      });
    }

    // Procesar respuestas (pueden venir como array o string JSON)
    const responses = Array.isArray(personalityTest.responses)
      ? personalityTest.responses
      : JSON.parse(personalityTest.responses);

    const result = await PersonalityService.processCompleteTest(sessionId, responses);

    // NUEVO: Verificar si la sesión tiene usuario vinculado
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: { userId: true }
    });

    res.json({
      success: true,
      completed: true,
      profile: result,
      // NUEVO: Información de vinculación
      userId: quizSession?.userId,
      isLinkedToUser: !!quizSession?.userId,
      // NUEVO: Flag para mostrar opción de guardar
      canLinkToUser: !quizSession?.userId
    });
  } catch (error) {
    next(error);
  }
};

// Reiniciar el test de personalidad
const resetPersonalityTest = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'sessionId es requerido' 
      });
    }

    const result = await PersonalityService.savePersonalityTest(
      sessionId, 
      new Array(32).fill(null), 
      1
    );

    // NUEVO: Obtener info del usuario si está vinculado
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: { userId: true }
    });

    res.json({
      success: true,
      completed: false,
      message: 'Test de personalidad reiniciado',
      personalityTest: result,
      currentBlock: 1,
      // NUEVO: Información de vinculación
      userId: quizSession?.userId,
      isLinkedToUser: !!quizSession?.userId
    });
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
