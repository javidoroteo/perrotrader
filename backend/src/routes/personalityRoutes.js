const express = require('express');
const router = express.Router();
const personalityController = require('../controllers/personalityController');
const { checkAuth } = require('../middleware/auth');

// ===== RUTAS PÚBLICAS =====
// checkAuth es opcional: detecta si hay usuario loggeado pero no bloquea

// Iniciar test de personalidad (después del quiz principal)
router.post('/:sessionId/start', checkAuth, personalityController.startPersonalityTest);

// Responder un bloque de 8 preguntas
router.post('/:sessionId/answer-block', personalityController.answerBlock);

// Obtener estado actual del test de personalidad
router.get('/:sessionId/current', personalityController.getPersonalityTest);

// Obtener bloque de preguntas
router.get('/:sessionId/questions', personalityController.getBlockQuestions);

// Obtener resultado final del test de personalidad
router.get('/:sessionId/result', personalityController.getPersonalityResult);

// Reiniciar test de personalidad
router.post('/:sessionId/reset', personalityController.resetPersonalityTest);

module.exports = router;
