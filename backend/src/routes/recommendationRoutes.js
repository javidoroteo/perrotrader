/**
 * Rutas de recomendaciones y búsqueda vectorial
 */

const express = require('express');
const {
  searchProducts,
  getRecommendationsForUser,
  getSimilarProducts,
  trackAction,
  getMetrics,
  getTopProducts,
  getStats
} = require('../controllers/recommendationController.js');

const { checkAuth } = require('../middleware/auth.js');

const router = express.Router();

// ===== RUTAS PÚBLICAS =====

/**
 * POST /api/recommendations/search
 * Búsqueda pública por lenguaje natural
 * Body: { query, type?, category?, riskLevel?, geography?, sector?, limit? }
 */
router.post('/search', searchProducts);

/**
 * GET /api/recommendations/similar/:productId
 * Productos similares (público)
 * Query: ?limit=5
 */
router.get('/similar/:productId', getSimilarProducts);

/**
 * GET /api/recommendations/top-products
 * Top productos más recomendados (público)
 * Query: ?limit=10&action=SELECTED
 */
router.get('/top-products', getTopProducts);

/**
 * GET /api/recommendations/stats
 * Estadísticas de vectorización (público)
 */
router.get('/stats', getStats);

// ===== RUTAS PROTEGIDAS (requieren autenticación) =====

/**
 * GET /api/recommendations/for-user
 * Recomendaciones personalizadas para usuario autenticado
 * Query: ?limit=10
 * Headers: Authorization: Bearer <token>
 */
router.get('/for-user', checkAuth, getRecommendationsForUser);

/**
 * POST /api/recommendations/track
 * Registrar acción del usuario sobre una recomendación
 * Body: { productId, action }
 * Actions: VIEWED, CLICKED, SELECTED, IGNORED
 * Headers: Authorization: Bearer <token>
 */
router.post('/track', checkAuth, trackAction);

/**
 * GET /api/recommendations/metrics
 * Métricas de recomendaciones del usuario o globales
 * Query: ?global=true (opcional, requiere admin)
 * Headers: Authorization: Bearer <token>
 */
router.get('/metrics', checkAuth, getMetrics);

module.exports = router;


