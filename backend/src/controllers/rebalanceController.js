const rebalanceService = require('../services/rebalanceService');

/**
 * Controller para rebalanceo de portfolios
 */
class RebalanceController {

  /**
   * Analizar portfolio y obtener sugerencias de rebalanceo
   */
  async analyze(req, res) {
    try {
      const { portfolioId } = req.params;

      const analysis = await rebalanceService.analyzePortfolio(
        portfolioId,
        req.user.id
      );

      // Guardar en historial si necesita rebalanceo
      if (analysis.needsRebalancing) {
        await rebalanceService.saveRebalanceHistory(
          portfolioId,
          req.user.id,
          analysis.suggestions,
          analysis.totalDeviation
        );
      }

      res.json({
        success: true,
        ...analysis
      });
    } catch (error) {
      console.error('Error analyzing portfolio:', error);
      res.status(500).json({
        error: 'Error analizando portfolio',
        message: error.message
      });
    }
  }

  /**
   * Obtener historial de rebalanceos
   */
  async getHistory(req, res) {
    try {
      const { portfolioId } = req.params;

      const history = await rebalanceService.getRebalanceHistory(
        portfolioId,
        req.user.id
      );

      res.json({
        success: true,
        count: history.length,
        history
      });
    } catch (error) {
      console.error('Error getting rebalance history:', error);
      res.status(500).json({
        error: 'Error obteniendo historial',
        message: error.message
      });
    }
  }

  /**
   * Marcar rebalanceo como ejecutado
   */
  async markExecuted(req, res) {
    try {
      const { rebalanceId } = req.params;

      const result = await rebalanceService.markAsExecuted(
        rebalanceId,
        req.user.id
      );

      res.json(result);
    } catch (error) {
      console.error('Error marking rebalance as executed:', error);
      res.status(500).json({
        error: 'Error marcando rebalanceo',
        message: error.message
      });
    }
  }
}

module.exports = new RebalanceController();
