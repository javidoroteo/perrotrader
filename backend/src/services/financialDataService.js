const axios = require('axios');

// Cache en memoria para optimizar llamadas API
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

class FinancialDataService {

  // Yahoo Finance - Para ETFs y acciones
  async getYahooFinanceData(symbol) {
    const cacheKey = `yahoo_${symbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Usamos yahoo-finance-api alternativa más simple
      const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
      const data = response.data.chart.result[0];
      
      if (!data) throw new Error('No data found');

      const meta = data.meta;
      const currentPrice = meta.regularMarketPrice;
      
      // Calcular rentabilidad aproximada (últimos 5 años si hay datos)
      const timestamps = data.timestamp;
      const prices = data.indicators.quote[0].close;
      
      let annualizedReturn = null;
      if (timestamps && prices && timestamps.length > 252) { // Al menos un año de datos
        const oldestPrice = prices[0];
        const newestPrice = prices[prices.length - 1];
        const years = (timestamps[timestamps.length - 1] - timestamps[0]) / (365.25 * 24 * 60 * 60);
        annualizedReturn = Math.pow(newestPrice / oldestPrice, 1 / years) - 1;
      }

      const result = {
        symbol,
        currentPrice: currentPrice,
        currency: meta.currency,
        annualizedReturn5Y: annualizedReturn,
        marketCap: meta.marketCap,
        lastUpdate: new Date(),
        source: 'yahoo'
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`Error fetching Yahoo Finance data for ${symbol}:`, error);
      
      // Fallback con datos básicos si no hay conexión
      return {
        symbol,
        currentPrice: null,
        currency: 'EUR',
        annualizedReturn5Y: null,
        note: 'Datos no disponibles temporalmente',
        lastUpdate: new Date(),
        source: 'yahoo_fallback'
      };
    }
  }

  // Alpha Vantage como backup
  async getAlphaVantageData(symbol) {
    const cacheKey = `alpha_${symbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: process.env.ALPHA_VANTAGE_KEY || 'ANYZQ3L1CRR08YUX'
        }
      });

      const quote = response.data['Global Quote'];
      if (!quote) throw new Error('No data found');

      const result = {
        symbol,
        currentPrice: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'],
        lastUpdate: new Date(),
        source: 'alphavantage'
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`Error fetching Alpha Vantage data for ${symbol}:`, error);
      throw new Error(`No se pudieron obtener datos para ${symbol}`);
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
}

module.exports = new FinancialDataService();
