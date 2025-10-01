const financialDataService = require('../services/financialDataService');
const feesAndBrokers = require('../config/feesAndBrokers');

const getFinancialDetails = async (req, res) => {
  const { symbol } = req.params;

  try {
    // Obtener datos de mercado (Yahoo Finance primero, Alpha Vantage como backup)
    let marketData;
    try {
      marketData = await financialDataService.getYahooFinanceData(symbol);
    } catch (error) {
      console.log(`Yahoo Finance falló para ${symbol}, intentando Alpha Vantage...`);
      try {
        marketData = await financialDataService.getAlphaVantageData(symbol);
      } catch (alphaError) {
        // Si ambos fallan, devolver datos básicos
        marketData = {
          symbol,
          currentPrice: null,
          currency: 'EUR',
          annualizedReturn5Y: null,
          note: 'Datos de mercado no disponibles temporalmente',
          lastUpdate: new Date(),
          source: 'fallback'
        };
      }
    }

    // Obtener configuración de comisiones y brokers
    const productConfig = feesAndBrokers[symbol] || feesAndBrokers['default'];

    const response = {
      success: true,
      marketData,
      fees: productConfig.fees,
      brokers: productConfig.brokers,
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    console.error('Error getting financial details:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
};

module.exports = {
  getFinancialDetails
};
