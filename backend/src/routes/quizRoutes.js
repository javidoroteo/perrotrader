const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { isAuthenticated, checkAuth } = require('../middleware/auth');

// ===== RUTAS PÚBLICAS (sin autenticación requerida) =====

// Iniciar nueva sesión del cuestionario
// checkAuth es opcional: si el usuario está loggeado, vincula automáticamente
router.post('/start', checkAuth, quizController.startQuiz.bind(quizController));

// Obtener pregunta actual
router.get('/question/:sessionId', quizController.getCurrentQuestion.bind(quizController));

// Responder pregunta y avanzar
router.post('/answer', quizController.answerQuestion.bind(quizController));

// Navegar a pregunta anterior
router.post('/previous', quizController.goToPreviousQuestion.bind(quizController));

// Obtener progreso del cuestionario
router.get('/progress/:sessionId', quizController.getProgress.bind(quizController));

// Obtener resultado final
router.get('/result/:sessionId', quizController.getFinalResult.bind(quizController));

// Reiniciar cuestionario
router.post('/restart/:sessionId', quizController.restartQuiz.bind(quizController));

// Obtener todas las preguntas (para debug)
router.get('/questions', quizController.getAllQuestions.bind(quizController));


// ===== NUEVAS RUTAS: REQUIEREN AUTENTICACIÓN =====

// Vincular sesión existente a usuario autenticado
// Se usa cuando el usuario completa el quiz sin cuenta y luego se registra
router.post('/link-session', isAuthenticated, quizController.linkSessionToUser.bind(quizController));

// Obtener historial de todas las sesiones del usuario
router.get('/my-sessions', isAuthenticated, quizController.getUserSessions.bind(quizController));

module.exports = router;
