// backend/src/controllers/productController.js
const FinancialDataService = require('../services/financialDataService');
const { FINANCIAL_PRODUCTS } = require('../config/productsConfig_v2');

const financialService = new FinancialDataService();

class ProductController {
  /**
   * Obtiene los detalles completos de un producto (estático + Yahoo Finance)
   */
  async getProductDetails(req, res) {
    try {
      const { ticker } = req.params;

      // Verificar que el producto existe en la configuración
      if (!FINANCIAL_PRODUCTS[ticker]) {
        return res.status(404).json({
          success: false,
          error: 'Producto no encontrado en la configuración'
        });
      }

      // Obtener datos estáticos
      const staticData = FINANCIAL_PRODUCTS[ticker];

      // Intentar obtener datos de Yahoo Finance
      let liveData = null;
      let dataSource = 'static';

      try {
        liveData = await financialService.getYahooFinanceData(ticker);
        dataSource = 'live';
      } catch (error) {
        console.warn(`No se pudieron obtener datos live para ${ticker}:`, error.message);
      }

      // Combinar datos
      const productData = {
        ...staticData,
        liveData: liveData,
        dataSource: dataSource,
        lastUpdated: new Date().toISOString()
      };

      return res.json({
        success: true,
        data: productData
      });

    } catch (error) {
      console.error('Error en getProductDetails:', error);
      return res.status(500).json({
        success: false,
        error: 'Error al obtener detalles del producto'
      });
    }
  }

  /**
   * Obtiene los detalles de múltiples productos en una sola llamada
   */
  async getProductsBatch(req, res) {
    try {
      const { tickers } = req.body;

      if (!Array.isArray(tickers) || tickers.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere un array de tickers'
        });
      }

      // Limitar a 10 productos por llamada para evitar sobrecarga
      if (tickers.length > 10) {
        return res.status(400).json({
          success: false,
          error: 'Máximo 10 tickers por solicitud'
        });
      }

      const results = {};

      // Procesar todos los tickers en paralelo
      await Promise.all(
        tickers.map(async (ticker) => {
          try {
            // Verificar que existe en la configuración
            if (!FINANCIAL_PRODUCTS[ticker]) {
              results[ticker] = {
                success: false,
                error: 'Producto no encontrado'
              };
              return;
            }

            const staticData = FINANCIAL_PRODUCTS[ticker];
            let liveData = null;
            let dataSource = 'static';

            try {
              liveData = await financialService.getYahooFinanceData(ticker);
              dataSource = 'live';
            } catch (error) {
              console.warn(`No se pudieron obtener datos live para ${ticker}:`, error.message);
            }

            results[ticker] = {
              success: true,
              data: {
                ...staticData,
                liveData: liveData,
                dataSource: dataSource
              }
            };

          } catch (error) {
            results[ticker] = {
              success: false,
              error: error.message
            };
          }
        })
      );

      return res.json({
        success: true,
        data: results,
        lastUpdated: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error en getProductsBatch:', error);
      return res.status(500).json({
        success: false,
        error: 'Error al obtener los productos'
      });
    }
  }
}

module.exports = new ProductController();
