
const financialDataService = require('../services/financialDataService');
const { FINANCIAL_PRODUCTS, BROKERS } = require('../config/productsConfig_v2');

const getFinancialDetails = async (req, res) => {
  const { symbol } = req.params;

  try {
    // Buscar el producto en nuestra configuración
    const product = FINANCIAL_PRODUCTS[symbol];

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado',
        message: `El producto ${symbol} no está en nuestro catálogo`
      });
    }

    // Obtener datos de mercado usando Yahoo Finance v2
    let marketData;
    try {
      marketData = await financialDataService.getYahooFinanceData(symbol);
    } catch (error) {
      // Usar datos estáticos del producto si no hay datos de mercado
      marketData = {
        symbol,
        currentPrice: null,
        currency: 'EUR',
        annualizedReturn5Y: null,
        note: 'Datos de mercado no disponibles - Usar información estática del producto',
        error: error.message,
        lastUpdate: new Date(),
        source: 'static'
      };
    }

    // Obtener brokers recomendados para este tipo de producto
    const recommendedBrokers = Object.values(BROKERS)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5); // Top 5 brokers

    const response = {
      success: true,
      product: {
        ...product,
        marketData
      },
      brokers: recommendedBrokers,
      fees: {
        ter: product.ter,
        description: `TER (Total Expense Ratio): ${product.ter} anual`
      },
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

const getMultipleProducts = async (req, res) => {
  const { symbols } = req.body; // Array de símbolos

  if (!symbols || !Array.isArray(symbols)) {
    return res.status(400).json({
      success: false,
      error: 'Se requiere un array de símbolos'
    });
  }

  try {
    // Obtener datos de mercado para múltiples productos
    const results = await financialDataService.getMultipleQuotes(symbols);

    const productsWithData = results.map(result => {
      const product = FINANCIAL_PRODUCTS[result.symbol];
      return {
        symbol: result.symbol,
        product: product || null,
        marketData: result.data,
        error: result.error
      };
    });

    res.json({
      success: true,
      products: productsWithData,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error getting multiple products:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
};

const getProductsByCategory = (req, res) => {
  const { category, type } = req.query;

  try {
    let products = Object.values(FINANCIAL_PRODUCTS);

    if (category) {
      products = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (type) {
      products = products.filter(p => p.type === type.toUpperCase());
    }

    res.json({
      success: true,
      products,
      count: products.length,
      filters: { category, type }
    });

  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

const getBrokers = (req, res) => {
  const { profile } = req.query;

  try {
    let brokers = Object.values(BROKERS);

    if (profile) {
      brokers = brokers.filter(broker => 
        broker.recommended_for.includes(profile.toLowerCase())
      );
    }

    // Ordenar por rating
    brokers = brokers.sort((a, b) => b.rating - a.rating);

    res.json({
      success: true,
      brokers,
      count: brokers.length,
      profile: profile || 'todos'
    });

  } catch (error) {
    console.error('Error getting brokers:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getFinancialDetails,
  getMultipleProducts,
  getProductsByCategory,
  getBrokers
};
