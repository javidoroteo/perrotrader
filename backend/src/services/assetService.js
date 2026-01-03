const prisma = require('../utils/prismaClient');
const FINANCIAL_PRODUCTS = require('../config/productsConfig_v2');
const yahooFinance = require('yahoo-finance2').default;

/**
 * Servicio para gestión de activos financieros
 */
class AssetService {

  /**
   * Buscar activos por query (ticker o nombre)
   * 
   * Busca SIMULTÁNEAMENTE en la BD y en productsConfig_v2.
   * Combina ambos resultados, priorizando los de la BD.
   */
  async searchAssets(query, filters = {}) {
    try {
      const { type, category, riskLevel, limit = 20 } = filters;
      const lowerQuery = query ? query.toLowerCase() : null;

      // 1. Consulta a la base de datos (asíncrona)
      const dbPromise = prisma.asset.findMany({
        where: {
          AND: [
            lowerQuery ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { ticker: { contains: query, mode: 'insensitive' } },
                { baseTicker: { contains: query, mode: 'insensitive' } }
              ]
            } : {},
            type ? { type } : {},
            category ? { category } : {},
            riskLevel ? { riskLevel } : {}
          ]
        },
        take: limit * 2 // Pedimos más para filtrar duplicados después
      });

      // 2. Búsqueda en memoria en productsConfig (síncrona)
      const configAssets = this.searchInProductsConfig(query, filters);

      // 3. Búsqueda externa en Yahoo Finance (asíncrona)
      let yahooPromise = Promise.resolve([]);
      if (query && query.length > 2) {
        yahooPromise = yahooFinance.search(query).catch(err => {
          console.warn('Yahoo Finance search failed:', err.message);
          return { quotes: [] };
        }).then(result => result.quotes || []);
      }

      // 4. Esperar todas las respuestas
      const [dbAssets, yahooResults] = await Promise.all([dbPromise, yahooPromise]);

      // 5. Combinar resultados sin duplicados usando Map (clave: ticker)
      const uniqueAssetsMap = new Map();

      // Primero: añadimos todos los de la BD (prioridad máxima, tienen ID y precio)
      dbAssets.forEach(asset => {
        uniqueAssetsMap.set(asset.ticker, asset);
      });

      // Segundo: añadimos los del config SOLO si no están ya en la BD
      configAssets.forEach(product => {
        if (!uniqueAssetsMap.has(product.ticker)) {
          uniqueAssetsMap.set(product.ticker, {
            id: null,
            ticker: product.ticker,
            name: product.name,
            type: product.type,
            category: product.category || 'RENTA_VARIABLE',
            description: product.description || null,
            currentPrice: 0,
            currency: 'USD',
            baseTicker: this.extractBaseTicker(product.ticker),
            exchange: this.extractExchange(product.ticker),
            isin: product.isin || null,
            ter: product.ter || null,
            riskLevel: this.mapRiskLevel(product.risk),
            isRecommended: !!(product.recommended_for?.length),
            recommendedFor: JSON.stringify(product.recommended_for || []),
            lastUpdated: null,
            source: 'config' // Flag para debug
          });
        }
      });

      // Tercero: añadimos los de Yahoo SOLO si no están ya en el mapa
      yahooResults.forEach(quote => {
        // Filtramos solo equity y etf para evitar ruido, o lo incluimos todo
        if (!quote.symbol) return;

        const symbol = quote.symbol;
        if (!uniqueAssetsMap.has(symbol)) {
          uniqueAssetsMap.set(symbol, {
            id: null,
            ticker: symbol,
            name: quote.longname || quote.shortname || symbol,
            type: quote.quoteType === 'ETF' ? 'ETF' : 'STOCK', // Mapeo simple
            category: 'RENTA_VARIABLE', // Default
            description: `Importado de Yahoo Finance (${quote.exchDisp || ''})`,
            currentPrice: 0, // Se obtendrá al seleccionar/guardar
            currency: 'USD', // Default, se actualizará
            baseTicker: this.extractBaseTicker(symbol),
            exchange: quote.exchDisp || 'UNKNOWN',
            riskLevel: 'MEDIUM',
            isRecommended: false,
            source: 'yahoo'
          });
        }
      });

      // Convertimos a array, limitamos y devolvemos
      return Array.from(uniqueAssetsMap.values()).slice(0, limit);

    } catch (error) {
      console.error('Error searching assets:', error);
      throw error;
    }
  }

  /**
   * Buscar en productsConfig_v2.js (helper privado)
   */
  searchInProductsConfig(query, filters = {}) {
    const { type, category } = filters;
    if (!query) return [];

    const lowerQuery = query.toLowerCase();

    return Object.values(FINANCIAL_PRODUCTS).filter(product => {
      // Safety check: ensure name and ticker exist
      if (!product.name || !product.ticker) return false;

      const matchesQuery =
        product.name.toLowerCase().includes(lowerQuery) ||
        product.ticker.toLowerCase().includes(lowerQuery);

      const matchesType = !type || product.type === type;
      const matchesCategory = !category || product.category === category;

      return matchesQuery && matchesType && matchesCategory;
    });
  }

  /**
   * Obtener activos recomendados según perfil de riesgo
   */
  async getRecommendedAssets(riskProfile, category = null) {
    try {
      const riskMapping = {
        'Bajo Riesgo': ['principiante', 'conservador'],
        'Riesgo Moderado': ['intermedio', 'moderado'],
        'Alto Riesgo': ['avanzado', 'agresivo']
      };

      const profileTags = riskMapping[riskProfile] || ['intermedio'];

      const recommended = Object.values(FINANCIAL_PRODUCTS).filter(product => {
        const matchesProfile = product.recommended_for?.some(tag =>
          profileTags.includes(tag)
        );
        const matchesCategory = !category || product.category === category;
        return matchesProfile && matchesCategory;
      });

      const grouped = {
        RENTA_FIJA: [],
        RENTA_VARIABLE: [],
        CRYPTO: [],
        GOLD: []
      };

      recommended.forEach(asset => {
        if (grouped[asset.category]) {
          grouped[asset.category].push(asset);
        }
      });

      return {
        riskProfile,
        recommendations: grouped,
        total: recommended.length
      };
    } catch (error) {
      console.error('Error getting recommended assets:', error);
      throw error;
    }
  }

  /**
   * Obtener o crear activo en BD
   */
  async getOrCreateAsset(ticker) {
    try {
      // 1. Buscar en BD
      let asset = await prisma.asset.findUnique({
        where: { ticker }
      });

      if (asset) {
        // Actualizar precio si es necesario (respetando caché)
        try {
          const freshPrice = await this.updateAssetPrice(asset.id, ticker);
          if (freshPrice !== null) {
            asset.currentPrice = freshPrice;
          }
        } catch (err) {
          console.warn(`Could not refresh price for ${ticker}: ${err.message}`);
        }
        return asset;
      }

      // 2. Si no existe, buscar configuración para crearlo bien definido
      const productConfig = FINANCIAL_PRODUCTS[ticker];

      if (productConfig) {
        asset = await prisma.asset.create({
          data: {
            ticker: productConfig.ticker,
            name: productConfig.name,
            type: productConfig.type,
            category: productConfig.category || 'RENTA_VARIABLE',
            description: productConfig.description,
            currentPrice: 0,
            currency: 'USD',
            baseTicker: this.extractBaseTicker(productConfig.ticker),
            exchange: this.extractExchange(productConfig.ticker),
            isin: productConfig.isin || null,
            ter: productConfig.ter || null,
            riskLevel: this.mapRiskLevel(productConfig.risk),
            isRecommended: productConfig.recommended_for?.length > 0 || false,
            recommendedFor: JSON.stringify(productConfig.recommended_for || [])
          }
        });

        // Actualizar precio inmediatamente
        await this.updateAssetPrice(asset.id, ticker);
        return asset;
      }

      // 3. Fallback: Intentar obtener de Yahoo Finance si no está en config
      try {
        const quote = await yahooFinance.quote(ticker);
        asset = await prisma.asset.create({
          data: {
            ticker,
            name: quote.longName || quote.shortName || ticker,
            type: 'ETF', // Asumimos ETF/Stock por defecto si viene de Yahoo directo
            category: 'RENTA_VARIABLE',
            currentPrice: quote.regularMarketPrice || 0,
            currency: quote.currency || 'USD',
            baseTicker: this.extractBaseTicker(ticker)
          }
        });
        return asset;
      } catch (error) {
        throw new Error(`No se pudo obtener información del activo: ${ticker}`);
      }
    } catch (error) {
      console.error('Error getting or creating asset:', error);
      throw error;
    }
  }

  /**
   * Actualizar precio de un activo desde Yahoo Finance
   */
  async updateAssetPrice(assetId, ticker) {
    try {
      // 1. Verificar Caché (15 minutos)
      const asset = await prisma.asset.findUnique({
        where: { id: assetId }
      });

      if (!asset) return null;

      const CACHE_DURATION = 15 * 60 * 1000; // 15 min
      const now = new Date();

      if (asset.lastUpdated && (now - new Date(asset.lastUpdated) < CACHE_DURATION)) {
        // console.log(`[Cache] Using cached price for ${ticker}`);
        return asset.currentPrice;
      }

      // 2. Intentar obtener de Yahoo Finance
      try {
        const quote = await yahooFinance.quote(ticker);

        if (!quote || quote.regularMarketPrice === undefined) {
          console.warn(`No price found for ${ticker} in Yahoo`);
          return asset.currentPrice; // Fallback
        }

        const newPrice = quote.regularMarketPrice;

        // 3. Actualizar BD
        await prisma.asset.update({
          where: { id: assetId },
          data: {
            currentPrice: newPrice,
            lastUpdated: now
          }
        });

        // 4. Guardar histórico
        await prisma.assetPrice.create({
          data: {
            assetId,
            price: newPrice,
            date: now
          }
        });

        return newPrice;

      } catch (yahooError) {
        console.warn(`Yahoo Finance error for ${ticker}: ${yahooError.message}`);
        return asset.currentPrice; // Fallback robusto a precio anterior
      }

    } catch (error) {
      console.error(`Error updating price for ${ticker}:`, error.message);
      // Intentar devolver el último precio conocido de la DB si falla todo
      const asset = await prisma.asset.findUnique({ where: { id: assetId } });
      return asset ? asset.currentPrice : null;
    }
  }

  /**
   * Extraer ticker base (sin sufijo de bolsa)
   */
  extractBaseTicker(ticker) {
    // WQDV.L -> WQDV
    // BTC-USD -> BTC
    return ticker.split('.')[0].split('-')[0];
  }

  /**
   * Extraer exchange del ticker
   */
  extractExchange(ticker) {
    if (ticker.includes('.L')) return 'LSE';
    if (ticker.includes('.AS')) return 'EURONEXT';
    if (ticker.includes('.MI')) return 'MILAN';
    if (ticker.includes('-USD')) return 'CRYPTO';
    return 'NYSE'; // default
  }

  /**
   * Mapear nivel de riesgo
   */
  mapRiskLevel(risk) {
    if (!risk) return 'MEDIUM';
    const riskLower = risk.toLowerCase();

    if (riskLower.includes('bajo') || riskLower.includes('low')) return 'LOW';
    if (riskLower.includes('alto') || riskLower.includes('high')) return 'HIGH';

    return 'MEDIUM';
  }

  /**
   * Obtener información detallada de un activo
   */
  async getAssetDetails(ticker) {
    try {
      const asset = await this.getOrCreateAsset(ticker);

      // Obtener histórico de precios (últimos 30 días)
      const priceHistory = await prisma.assetPrice.findMany({
        where: { assetId: asset.id },
        orderBy: { date: 'desc' },
        take: 30
      });

      return {
        ...asset,
        priceHistory,
        recommendedFor: asset.recommendedFor
          ? JSON.parse(asset.recommendedFor)
          : []
      };
    } catch (error) {
      console.error('Error getting asset details:', error);
      throw error;
    }
  }

  /**
   * Obtener alternativas de un activo (diferentes exchanges)
   */
  getAssetAlternatives(ticker) {
    const baseTicker = this.extractBaseTicker(ticker);

    const alternatives = Object.values(FINANCIAL_PRODUCTS).filter(product => {
      const productBase = this.extractBaseTicker(product.ticker);
      return productBase === baseTicker && product.ticker !== ticker;
    });

    return alternatives;
  }
}

module.exports = new AssetService();
