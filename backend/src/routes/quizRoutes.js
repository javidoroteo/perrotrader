const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Iniciar nueva sesión del cuestionario
router.post('/start', quizController.startQuiz.bind(quizController));

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

module.exports = router;
