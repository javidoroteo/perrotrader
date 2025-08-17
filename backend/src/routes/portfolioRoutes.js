// Rutas del backend para la API del portfolio

const express = require('express');
const portfolioService = require('../services/portfolioServices');
const router = express.Router();

/**
 * POST /api/portfolio/generate
 * Genera un reporte completo basado en la sesión del usuario
 */
router.post('/generate', async (req, res) => {
  try {
    const sessionData = req.body;
    
    // Validar datos requeridos
    if (!sessionData.totalScore && sessionData.totalScore !== 0) {
      return res.status(400).json({
        error: 'Datos de sesión inválidos',
        message: 'totalScore es requerido'
      });
    }

    // Generar resultado completo
    const result = await portfolioService.completeFinalResult(sessionData);
    
    // Agregar datos de sesión para el mapeo frontend
    result.session = sessionData;
    
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
    const portfolioResult = portfolioService.calculatePortfolio(sessionData);
    
    res.json({
      riskProfile: portfolioResult.riskProfile,
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
    const educationalGuide = portfolioService.generateEducationalGuide(sessionData);
    
    res.json(educationalGuide);
  } catch (error) {
    console.error('Error generating educational guide:', error);
    res.status(500).json({
      error: 'Error generando guía educativa',
      message: error.message
    });
  }
});

/**
 * GET /api/portfolio/health
 * Endpoint de salud para verificar que el servicio funciona
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'portfolio-service'
  });
});

module.exports = router;