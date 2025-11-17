const assetService = require('../services/assetService');

/**
 * Controller para búsqueda y gestión de activos
 */
class AssetController {

  /**
   * Buscar activos
   */
  async searchAssets(req, res) {
    try {
      const { q, type, category, riskLevel, limit } = req.query;

      const assets = await assetService.searchAssets(q, {
        type,
        category,
        riskLevel,
        limit: parseInt(limit) || 20
      });

      res.json({
        success: true,
        count: assets.length,
        query: q,
        assets
      });
    } catch (error) {
      console.error('Error searching assets:', error);
      res.status(500).json({
        error: 'Error buscando activos',
        message: error.message
      });
    }
  }

  /**
   * Obtener activos recomendados según perfil
   */
  async getRecommended(req, res) {
    try {
      const { riskProfile, category } = req.query;

      if (!riskProfile) {
        return res.status(400).json({
          error: 'riskProfile es requerido'
        });
      }

      const recommended = await assetService.getRecommendedAssets(
        riskProfile,
        category
      );

      res.json({
        success: true,
        ...recommended
      });
    } catch (error) {
      console.error('Error getting recommended assets:', error);
      res.status(500).json({
        error: 'Error obteniendo activos recomendados',
        message: error.message
      });
    }
  }

  /**
   * Obtener detalles de un activo específico
   */
  async getAssetDetails(req, res) {
    try {
      const { ticker } = req.params;

      const asset = await assetService.getAssetDetails(ticker);

      res.json({
        success: true,
        asset
      });
    } catch (error) {
      console.error('Error getting asset details:', error);
      res.status(500).json({
        error: 'Error obteniendo detalles del activo',
        message: error.message
      });
    }
  }

  /**
   * Obtener alternativas de un activo (diferentes exchanges)
   */
  async getAlternatives(req, res) {
    try {
      const { ticker } = req.params;

      const alternatives = assetService.getAssetAlternatives(ticker);

      res.json({
        success: true,
        ticker,
        count: alternatives.length,
        alternatives
      });
    } catch (error) {
      console.error('Error getting alternatives:', error);
      res.status(500).json({
        error: 'Error obteniendo alternativas',
        message: error.message
      });
    }
  }
}

module.exports = new AssetController();
