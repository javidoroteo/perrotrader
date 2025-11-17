// backend/src/routes/portfolioRoutes.js

const express = require('express');
const router = express.Router();
const portfolioService = require('../services/portfolioServices'); // Servicio original del quiz
const portfolioManagerController = require('../controllers/portfolioManagerController');
const reportService = require('../services/reportService');
const { isAuthenticated, checkAuth } = require('../middleware/auth');

// ===== RUTAS DEL QUIZ (PÚBLICAS) =====

/**
 * POST /api/portfolio/generate
 * Genera un reporte completo basado en la sesión del usuario
 */
router.post('/generate', checkAuth, async (req, res) => {
  try {
    const sessionData = req.body;

    if (!sessionData.totalScore && sessionData.totalScore !== 0) {
      return res.status(400).json({
        error: 'Datos de sesión inválidos',
        message: 'totalScore es requerido'
      });
    }

    const result = await portfolioService.completeFinalResult(sessionData);
    result.sessionId = sessionData.id;
    result.session = sessionData;

    if (req.user) {
      try {
        await reportService.saveReport(sessionData.id, result);
        result.reportSaved = true;
      } catch (error) {
        console.error('Error saving report:', error);
        result.reportSaved = false;
      }
    }

    res.json(result);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

/**
 * POST /api/portfolio/calculate
 * Calcula solo la cartera recomendada
 */
router.post('/calculate', async (req, res) => {
  try {
    const sessionData = req.body;
    const portfolioResult = await portfolioService.calculatePortfolio(sessionData);
    
    res.json({
      riskProfile: portfolioResult.riskProfile,
      riskScore: portfolioResult.riskScore,
      portfolio: portfolioResult.allocation
    });
  } catch (error) {
    console.error('Error calculating portfolio:', error);
    res.status(500).json({
      error: 'Error calculando cartera',
      message: error.message
    });
  }
});

/**
 * POST /api/portfolio/recommendations
 * Obtiene solo las recomendaciones
 */
router.post('/recommendations', async (req, res) => {
  try {
    const sessionData = req.body;
    const recommendations = portfolioService.generateRecommendations(sessionData);
    res.json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      error: 'Error generando recomendaciones',
      message: error.message
    });
  }
});

/**
 * POST /api/portfolio/education
 * Obtiene la guía educativa
 */
router.post('/education', async (req, res) => {
  try {
    const sessionData = req.body;
    const educationalGuide = await portfolioService.generateEducationalGuide(sessionData);
    res.json(educationalGuide);
  } catch (error) {
    console.error('Error generating educational guide:', error);
    res.status(500).json({
      error: 'Error generando guía educativa',
      message: error.message
    });
  }
});

// ===== RUTAS DE GESTIÓN DE PORTFOLIOS (REQUIEREN AUTENTICACIÓN) =====

/**
 * POST /api/portfolio/create
 * Crear portfolio desde quiz
 */
router.post('/create', isAuthenticated, portfolioManagerController.createFromQuiz);

/**
 * GET /api/portfolio/list
 * Listar portfolios del usuario
 */
router.get('/list', isAuthenticated, portfolioManagerController.listPortfolios);

/**
 * GET /api/portfolio/:portfolioId
 * Obtener detalles de un portfolio
 */
router.get('/:portfolioId', isAuthenticated, portfolioManagerController.getPortfolio);

/**
 * PUT /api/portfolio/:portfolioId
 * Actualizar portfolio
 */
router.put('/:portfolioId', isAuthenticated, portfolioManagerController.updatePortfolio);

/**
 * DELETE /api/portfolio/:portfolioId
 * Eliminar portfolio
 */
router.delete('/:portfolioId', isAuthenticated, portfolioManagerController.deletePortfolio);

/**
 * POST /api/portfolio/:portfolioId/holdings
 * Agregar holding a portfolio
 */
router.post('/:portfolioId/holdings', isAuthenticated, portfolioManagerController.addHolding);

/**
 * GET /api/portfolio/:portfolioId/suggestions
 * Obtener sugerencias de inversión
 */
router.get('/:portfolioId/suggestions', isAuthenticated, portfolioManagerController.getInvestmentSuggestions);

// ===== 🆕 NUEVAS RUTAS: COMPARTIR PORTFOLIO (CORREGIDAS) =====

/**
 * POST /api/portfolio/:portfolioId/share
 * Generar link para compartir portfolio (7 días de validez)
 * ✅ CORREGIDO: Usa isAuthenticated
 */
router.post('/:portfolioId/share', isAuthenticated, portfolioManagerController.createShareLink);

/**
 * GET /api/portfolio/shared/:token
 * Obtener portfolio compartido (PÚBLICO - no requiere auth)
 * ✅ Registra visualización para analytics
 */
router.get('/shared/:token', portfolioManagerController.getSharedPortfolio);

/**
 * GET /api/portfolio/my-share-links
 * Listar mis links compartidos con analytics
 * ✅ CORREGIDO: Usa isAuthenticated y ruta sin conflictos
 */
router.get('/my-share-links', isAuthenticated, portfolioManagerController.getMyShareLinks);

/**
 * DELETE /api/portfolio/share-links/:token
 * Eliminar/revocar un link compartido
 * ✅ CORREGIDO: Usa isAuthenticated
 */
router.delete('/share-links/:token', isAuthenticated, portfolioManagerController.deleteShareLink);

/**
 * GET /api/portfolio/health
 * Endpoint de salud
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'portfolio-service'
  });

  // ===== CREAR PORTFOLIO MANUAL (SIN QUIZ) =====
/**
 * POST /api/portfolio/create-manual
 * Crear portfolio desde cero (sin quiz)
 * Body: { name, totalSavings, manualProfile? }
 */
router.post('/create-manual', isAuthenticated, portfolioManagerController.createManualPortfolio);

/**
 * PUT /api/portfolio/:portfolioId/convert-to-quiz
 * Convertir portfolio manual a portfolio con quiz
 * Body: { sessionId }
 */
router.put('/:portfolioId/convert-to-quiz', isAuthenticated, portfolioManagerController.convertToQuizPortfolio);

});


module.exports = router;
