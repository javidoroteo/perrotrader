
const yahooFinance = require('yahoo-finance2').default;

// Cache en memoria para optimizar llamadas API
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

class FinancialDataService {

  // Yahoo Finance v2 - Servicio principal
  async getYahooFinanceData(symbol) {
    const cacheKey = `yahoo_${symbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Usar yahoo-finance2 para obtener datos actuales
      const quote = await yahooFinance.quote(symbol);

      if (!quote || !quote.regularMarketPrice) {
        throw new Error('No data found');
      }

      // Obtener datos históricos para calcular rentabilidad
      const historical = await yahooFinance.historical(symbol, {
        period1: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), // 5 años atrás
        period2: new Date(),
        interval: '1d'
      });

      let annualizedReturn = null;
      if (historical && historical.length > 250) { // Al menos un año de datos
        const oldestPrice = historical[0].close;
        const newestPrice = historical[historical.length - 1].close;
        const years = 5; // Aproximadamente 5 años
        annualizedReturn = Math.pow(newestPrice / oldestPrice, 1 / years) - 1;
      }

      const result = {
        symbol,
        currentPrice: quote.regularMarketPrice,
        currency: quote.currency || 'EUR',
        annualizedReturn5Y: annualizedReturn,
        marketCap: quote.marketCap,
        priceChange: quote.regularMarketChange,
        priceChangePercent: quote.regularMarketChangePercent,
        volume: quote.regularMarketVolume,
        fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
        lastUpdate: new Date(),
        source: 'yahoo-finance2'
      };

      this.setCache(cacheKey, result);
      return result;

    } catch (error) {
      console.error(`Error fetching Yahoo Finance data for ${symbol}:`, error);

      // Fallback con datos estáticos si no hay conexión
      return {
        symbol,
        currentPrice: null,
        currency: 'EUR',
        annualizedReturn5Y: null,
        note: 'Datos no disponibles temporalmente - Verificar ticker o conexión',
        error: error.message,
        lastUpdate: new Date(),
        source: 'fallback'
      };
    }
  }

  // Obtener múltiples símbolos en paralelo
  async getMultipleQuotes(symbols) {
    try {
      const results = await Promise.allSettled(
        symbols.map(symbol => this.getYahooFinanceData(symbol))
      );

      return results.map((result, index) => ({
        symbol: symbols[index],
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null
      }));
    } catch (error) {
      console.error('Error fetching multiple quotes:', error);
      throw error;
    }
  }

  // Cache management
  setCache(key, data) {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getFromCache(key) {
    const cached = cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return cached.data;
    }
    cache.delete(key);
    return null;
  }

  // Limpiar cache manualmente
  clearCache() {
    cache.clear();
  }
}

module.exports = new FinancialDataService();

