/**
 * Controlador de endpoints de recomendaciones
 * Maneja búsquedas por lenguaje natural y recomendaciones personalizadas
 */

const {
  getPersonalizedRecommendations,
  trackRecommendationAction,
  getRecommendationMetrics,
  getTopRecommendedProducts
} = require('../services/recommendationService.js');

const {
  searchProductsByNaturalLanguage,
  findSimilarProducts,
  getVectorizationStats
} = require('../services/vectorSearchService.js');

/**
 * POST /api/recommendations/search
 * Búsqueda de productos por lenguaje natural
 */
async function searchProducts(req, res) {
  try {
    const { query, type, category, riskLevel, geography, sector, limit = 10 } = req.body;

    // Validación
    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La consulta no puede estar vacía'
      });
    }

    if (query.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'La consulta es demasiado larga (máximo 500 caracteres)'
      });
    }

    console.log(`Búsqueda recibida: "${query}"`);

    // Buscar productos
    const results = await searchProductsByNaturalLanguage(query, {
      type,
      category,
      riskLevel,
      geography,
      sector,
      limit: parseInt(limit),
      minSimilarity: 0.6
    });

    res.json({
      success: true,
      query,
      filters: { type, category, riskLevel, geography, sector },
      totalResults: results.length,
      products: results.map(p => ({
        id: p.id,
        name: p.name,
        ticker: p.ticker,
        type: p.type,
        category: p.category,
        description: p.description,
        sector: p.sector,
        geography: p.geography,
        marketcap: p.marketcap,
        expense_ratio: p.expense_ratio,
        recommendedFor: p.recommendedFor,
        similarity: p.similarity,
        matchScore: p.matchScore || Math.round(p.similarity * 100)
      }))
    });

  } catch (error) {
    console.error('Error en búsqueda de productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar productos',
      error: error.message
    });
  }
}

/**
 * GET /api/recommendations/for-user
 * Recomendaciones personalizadas para usuario autenticado
 */
async function getRecommendationsForUser(req, res) {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query;

    console.log(`Generando recomendaciones para usuario ${userId}`);

    // Obtener recomendaciones personalizadas
    const recommendations = await getPersonalizedRecommendations(userId, {
      limit: parseInt(limit),
      saveHistory: true
    });

    res.json({
      success: true,
      userId,
      profile: recommendations.profile,
      recommendations: recommendations.recommendations,
      totalResults: recommendations.totalResults
    });

  } catch (error) {
    console.error('Error obteniendo recomendaciones:', error);
    
    // Manejar errores específicos
    if (error.message.includes('no tiene perfil')) {
      return res.status(404).json({
        success: false,
        message: 'Debes completar el cuestionario de inversión primero para obtener recomendaciones personalizadas',
        action: 'COMPLETE_QUIZ'
      });
    }

    if (error.message.includes('no está vectorizado')) {
      return res.status(404).json({
        success: false,
        message: 'Tu perfil necesita ser actualizado. Completa el cuestionario nuevamente.',
        action: 'RETAKE_QUIZ'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al obtener recomendaciones',
      error: error.message
    });
  }
}

/**
 * GET /api/recommendations/similar/:productId
 * Encuentra productos similares a un producto dado
 */
async function getSimilarProducts(req, res) {
  try {
    const { productId } = req.params;
    const { limit = 5 } = req.query;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'productId es requerido'
      });
    }

    // Buscar productos similares
    const similar = await findSimilarProducts(productId, {
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      productId,
      totalResults: similar.length,
      similarProducts: similar.map(p => ({
        id: p.id,
        name: p.name,
        ticker: p.ticker,
        type: p.type,
        category: p.category,
        description: p.description,
        similarity: p.similarity,
        matchScore: p.matchScore
      }))
    });

  } catch (error) {
    console.error('Error buscando productos similares:', error);

    if (error.message.includes('no encontrado')) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al buscar productos similares',
      error: error.message
    });
  }
}

/**
 * POST /api/recommendations/track
 * Registrar acción del usuario sobre una recomendación
 */
async function trackAction(req, res) {
  try {
    const userId = req.user.id;
    const { productId, action } = req.body;

    // Validación
    if (!productId || !action) {
      return res.status(400).json({
        success: false,
        message: 'productId y action son requeridos'
      });
    }

    const validActions = ['VIEWED', 'CLICKED', 'SELECTED', 'IGNORED'];
    if (!validActions.includes(action)) {
      return res.status(400).json({
        success: false,
        message: `Acción inválida. Debe ser una de: ${validActions.join(', ')}`
      });
    }

    // Registrar acción
    await trackRecommendationAction(userId, productId, action);

    res.json({
      success: true,
      message: 'Acción registrada correctamente',
      userId,
      productId,
      action
    });

  } catch (error) {
    console.error('Error registrando acción:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar acción',
      error: error.message
    });
  }
}

/**
 * GET /api/recommendations/metrics
 * Obtener métricas de recomendaciones
 */
async function getMetrics(req, res) {
  try {
    const userId = req.user?.id || null;
    const { global } = req.query;

    // Si se pide global y el usuario tiene permisos, devolver métricas globales
    const metricsUserId = global === 'true' ? null : userId;

    const metrics = await getRecommendationMetrics(metricsUserId);

    res.json({
      success: true,
      scope: metricsUserId ? 'user' : 'global',
      userId: metricsUserId,
      metrics
    });

  } catch (error) {
    console.error('Error obteniendo métricas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener métricas',
      error: error.message
    });
  }
}

/**
 * GET /api/recommendations/top-products
 * Obtiene los productos más recomendados/populares
 */
async function getTopProducts(req, res) {
  try {
    const { limit = 10, action = 'SELECTED' } = req.query;

    const validActions = ['VIEWED', 'CLICKED', 'SELECTED', 'IGNORED', null];
    if (action && !validActions.includes(action)) {
      return res.status(400).json({
        success: false,
        message: `Acción inválida. Debe ser una de: ${validActions.filter(a => a).join(', ')}`
      });
    }

    const topProducts = await getTopRecommendedProducts({
      limit: parseInt(limit),
      action: action || undefined
    });

    res.json({
      success: true,
      action: action || 'all',
      totalResults: topProducts.length,
      products: topProducts
    });

  } catch (error) {
    console.error('Error obteniendo top productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos populares',
      error: error.message
    });
  }
}

/**
 * GET /api/recommendations/stats
 * Obtiene estadísticas de vectorización
 */
async function getStats(req, res) {
  try {
    const stats = await getVectorizationStats();

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
}

// Exportaciones
module.exports = {
  searchProducts,
  getRecommendationsForUser,
  getSimilarProducts,
  trackAction,
  getMetrics,
  getTopProducts,
  getStats
};
