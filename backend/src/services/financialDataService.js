// backend/src/services/financialDataService.js (VERSIÓN COMPLETA)
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
        const years = historical.length / 252; // ~252 días hábiles por año
        annualizedReturn = (Math.pow(newestPrice / oldestPrice, 1 / years) - 1) * 100;
      }

      const data = {
        symbol: symbol,
        price: quote.regularMarketPrice,
        currency: quote.currency || 'USD',
        change: quote.regularMarketChange || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        volume: quote.regularMarketVolume || 0,
        marketCap: quote.marketCap || null,
        dividendYield: quote.dividendYield ? (quote.dividendYield * 100) : null,
        annualizedReturn5Y: annualizedReturn,
        fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh || null,
        fiftyTwoWeekLow: quote.fiftyTwoWeekLow || null,
        averageVolume: quote.averageDailyVolume10Day || null,
        lastUpdated: new Date().toISOString()
      };

      this.saveToCache(cacheKey, data);
      return data;

    } catch (error) {
      console.error(`Error obteniendo datos de Yahoo Finance para ${symbol}:`, error.message);
      throw new Error(`No se pudieron obtener datos financieros para ${symbol}`);
    }
  }

  // Método para obtener múltiples símbolos en paralelo
  async getMultipleSymbols(symbols) {
    try {
      const promises = symbols.map(symbol => 
        this.getYahooFinanceData(symbol).catch(err => ({
          symbol,
          error: err.message
        }))
      );
      
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error en getMultipleSymbols:', error);
      throw error;
    }
  }

  // Gestión de caché
  getFromCache(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  saveToCache(key, data) {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    cache.clear();
  }
}

module.exports = FinancialDataService;
