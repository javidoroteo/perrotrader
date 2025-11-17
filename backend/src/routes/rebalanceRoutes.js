const express = require('express');
const router = express.Router();
const rebalanceController = require('../controllers/rebalanceController');
const { isAuthenticated } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(isAuthenticated);

/**
 * GET /api/rebalance/:portfolioId/analyze
 * Analizar portfolio y obtener sugerencias de rebalanceo
 */
router.get('/:portfolioId/analyze', rebalanceController.analyze);

/**
 * GET /api/rebalance/:portfolioId/history
 * Obtener historial de rebalanceos
 */
router.get('/:portfolioId/history', rebalanceController.getHistory);

/**
 * POST /api/rebalance/:rebalanceId/execute
 * Marcar rebalanceo como ejecutado
 */
router.post('/:rebalanceId/execute', rebalanceController.markExecuted);

module.exports = router;
