const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const { isAuthenticated } = require('../middleware/auth');

/**
 * GET /api/assets/search
 * Buscar activos por query
 * Query params: q, type, category, riskLevel, limit
 */
router.get('/search', assetController.searchAssets);

/**
 * GET /api/assets/recommended
 * Obtener activos recomendados según perfil de riesgo
 * Query params: riskProfile, category
 */
router.get('/recommended', isAuthenticated, assetController.getRecommended);

/**
 * GET /api/assets/:ticker
 * Obtener detalles de un activo específico
 */
router.get('/:ticker', assetController.getAssetDetails);

/**
 * GET /api/assets/:ticker/alternatives
 * Obtener alternativas de un activo (diferentes exchanges)
 */
router.get('/:ticker/alternatives', assetController.getAlternatives);

module.exports = router;
