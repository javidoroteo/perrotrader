const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Iniciar nueva sesión del cuestionario
router.post('/start', quizController.startQuiz);

// Obtener pregunta actual
router.get('/question/:sessionId', quizController.getCurrentQuestion);

// Responder pregunta y avanzar
router.post('/answer', quizController.answerQuestion);

// Navegar a pregunta anterior
router.post('/previous', quizController.goToPreviousQuestion);

// Obtener progreso del cuestionario
router.get('/progress/:sessionId', quizController.getProgress);

// Obtener resultado final
router.get('/result/:sessionId', quizController.getFinalResult);

// Reiniciar cuestionario
router.post('/restart/:sessionId', quizController.restartQuiz);

// Obtener todas las preguntas (para debug)
router.get('/questions', quizController.getAllQuestions);

module.exports = router;