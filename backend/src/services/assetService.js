const prisma = require('../utils/prismaClient');
const FINANCIAL_PRODUCTS = require('../config/productsConfig_v2');
const yahooFinance = require('yahoo-finance2').default;


/**
 * Servicio para gestión de activos financieros
 */
class AssetService {

  /**
   * Buscar activos por query (ticker o nombre)
   * Primero busca en BD, luego en productsConfig
   */
  async searchAssets(query, filters = {}) {
    try {
      const { type, category, riskLevel, limit = 20 } = filters;

      // 1. Buscar en base de datos
      let dbAssets = await prisma.asset.findMany({
        where: {
          AND: [
            query ? {
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
        take: limit
      });

      // 2. Si no hay resultados en BD, buscar en config de productos
      if (dbAssets.length === 0 && query) {
        const configAssets = this.searchInProductsConfig(query, filters);
        return configAssets.slice(0, limit);
      }

      return dbAssets;
    } catch (error) {
      console.error('Error searching assets:', error);
      throw error;
    }
  }

  /**
   * Buscar en productsConfig_v2.js
   */
  searchInProductsConfig(query, filters = {}) {
    const { type, category } = filters;
    const lowerQuery = query.toLowerCase();

    const results = Object.values(FINANCIAL_PRODUCTS).filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.ticker.toLowerCase().includes(lowerQuery);
      
      const matchesType = !type || product.type === type;
      const matchesCategory = !category || product.category === category;

      return matchesQuery && matchesType && matchesCategory;
    });

    return results;
  }

  /**
   * Obtener activos recomendados según perfil de riesgo
   */
  async getRecommendedAssets(riskProfile, category = null) {
    try {
      // Mapear perfil de riesgo a etiquetas
      const riskMapping = {
        'Bajo Riesgo': ['principiante', 'conservador'],
        'Riesgo Moderado': ['intermedio', 'moderado'],
        'Alto Riesgo': ['avanzado', 'agresivo']
      };

      const profileTags = riskMapping[riskProfile] || ['intermedio'];

      // Buscar en productsConfig
      const recommended = Object.values(FINANCIAL_PRODUCTS).filter(product => {
        const matchesProfile = product.recommended_for?.some(tag =>
          profileTags.includes(tag)
        );
        const matchesCategory = !category || product.category === category;
        return matchesProfile && matchesCategory;
      });

      // Agrupar por categoría
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
      // Buscar en BD
      let asset = await prisma.asset.findUnique({
        where: { ticker }
      });

      if (asset) {
        return asset;
      }

      // Buscar en productsConfig
      const productConfig = FINANCIAL_PRODUCTS[ticker];
      
      if (productConfig) {
        // Crear desde config
        asset = await prisma.asset.create({
          data: {
            ticker: productConfig.ticker,
            name: productConfig.name,
            type: productConfig.type,
            category: productConfig.category || 'RENTA_VARIABLE',
            description: productConfig.description,
            currentPrice: 0, // Se actualizará después
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

        // Intentar obtener precio actual
        await this.updateAssetPrice(asset.id, ticker);

        return asset;
      }

      // Si no está en config, intentar obtener de Yahoo Finance
      try {
        const quote = await yahooFinance.quote(ticker);
        asset = await prisma.asset.create({
          data: {
            ticker,
            name: quote.longName || quote.shortName || ticker,
            type: 'ETF',
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
      const quote = await yahooFinance.quote(ticker);
      
      if (!quote.regularMarketPrice) {
        return null;
      }

      // Actualizar precio en Asset
      await prisma.asset.update({
        where: { id: assetId },
        data: {
          currentPrice: quote.regularMarketPrice,
          lastUpdated: new Date()
        }
      });

      // Guardar histórico
      await prisma.assetPrice.create({
        data: {
          assetId,
          price: quote.regularMarketPrice,
          date: new Date()
        }
      });

      return quote.regularMarketPrice;
    } catch (error) {
      console.error(`Error updating price for ${ticker}:`, error.message);
      return null;
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
