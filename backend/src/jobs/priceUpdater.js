const cron = require('node-cron');
const prisma = require('../utils/prismaClient');
const yahooFinance = require('yahoo-finance2').default;

/**
 * Cron job para actualizar precios de activos diariamente
 */
class PriceUpdater {
  
  constructor() {
    this.isRunning = false;
  }

  /**
   * Iniciar cron job
   * Se ejecuta todos los días a las 2:00 AM
   */
  start() {
    console.log('🕐 Price updater cron job iniciado');
    
    // Ejecutar todos los días a las 2:00 AM
    cron.schedule('0 2 * * *', async () => {
      console.log('⏰ Ejecutando actualización de precios...');
      await this.updateAllPrices();
    });

    // También permitir ejecución manual al iniciar (opcional)
    // this.updateAllPrices();
  }

  /**
   * Actualizar precios de todos los activos
   */
  async updateAllPrices() {
    if (this.isRunning) {
      console.log('⚠️ Actualización de precios ya en progreso');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      // Obtener todos los activos únicos
      const assets = await prisma.asset.findMany({
        select: {
          id: true,
          ticker: true,
          name: true,
          type: true
        }
      });

      console.log(`📊 Actualizando precios de ${assets.length} activos...`);

      let updated = 0;
      let failed = 0;

      // Actualizar en lotes de 10 para no saturar la API
      const batchSize = 10;
      for (let i = 0; i < assets.length; i += batchSize) {
        const batch = assets.slice(i, i + batchSize);
        
        await Promise.allSettled(
          batch.map(asset => this.updateAssetPrice(asset))
        ).then(results => {
          results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
              updated++;
            } else {
              failed++;
              console.error(`❌ Error actualizando ${batch[index].ticker}:`, result.reason?.message);
            }
          });
        });

        // Delay entre lotes para no saturar la API
        if (i + batchSize < assets.length) {
          await this.delay(2000); // 2 segundos entre lotes
        }
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✅ Actualización completada en ${duration}s`);
      console.log(`   ✓ Actualizados: ${updated}`);
      console.log(`   ✗ Fallidos: ${failed}`);

      // Actualizar portfolios después de actualizar precios
      await this.updatePortfolioValues();

    } catch (error) {
      console.error('❌ Error en actualización de precios:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Actualizar precio de un activo específico
   */
  async updateAssetPrice(asset) {
    try {
      const quote = await yahooFinance.quote(asset.ticker);
      
      if (!quote.regularMarketPrice) {
        throw new Error('No se pudo obtener precio');
      }

      // Actualizar precio en Asset
      await prisma.asset.update({
        where: { id: asset.id },
        data: {
          currentPrice: quote.regularMarketPrice,
          lastUpdated: new Date()
        }
      });

      // Guardar en histórico
      await prisma.assetPrice.create({
        data: {
          assetId: asset.id,
          price: quote.regularMarketPrice,
          date: new Date()
        }
      });

      return true;
    } catch (error) {
      // Algunos activos pueden no estar disponibles en Yahoo Finance
      // No es crítico, solo registramos el error
      throw new Error(`Error updating ${asset.ticker}: ${error.message}`);
    }
  }

  /**
   * Actualizar valores de todos los portfolios
   */
  async updatePortfolioValues() {
    try {
      const portfolios = await prisma.portfolio.findMany({
        include: {
          holdings: {
            include: {
              asset: true
            }
          }
        }
      });

      console.log(`📈 Actualizando ${portfolios.length} portfolios...`);

      for (const portfolio of portfolios) {
        await this.recalculatePortfolioValues(portfolio);
      }

      console.log('✅ Portfolios actualizados');
    } catch (error) {
      console.error('❌ Error actualizando portfolios:', error);
    }
  }

  /**
   * Recalcular valores de un portfolio
   */
  async recalculatePortfolioValues(portfolio) {
    try {
      let totalValue = 0;
      const categoryValues = {
        RENTA_FIJA: 0,
        RENTA_VARIABLE: 0,
        CRYPTO: 0,
        GOLD: 0
      };

      // Actualizar cada holding con precio actual
      for (const holding of portfolio.holdings) {
        const currentValue = holding.quantity * holding.asset.currentPrice;
        
        await prisma.holding.update({
          where: { id: holding.id },
          data: { currentValue }
        });

        totalValue += currentValue;
        
        const category = holding.asset.category;
        if (categoryValues[category] !== undefined) {
          categoryValues[category] += currentValue;
        }
      }

      // Calcular cash disponible
      const totalCash = portfolio.totalSavings - totalValue;
      if (totalCash > 0) {
        totalValue += totalCash;
      }

      // Calcular porcentajes
      const actualPercentages = {
        actualRentaFija: totalValue > 0 ? (categoryValues.RENTA_FIJA / totalValue) * 100 : 0,
        actualRentaVariable: totalValue > 0 ? (categoryValues.RENTA_VARIABLE / totalValue) * 100 : 0,
        actualCrypto: totalValue > 0 ? (categoryValues.CRYPTO / totalValue) * 100 : 0,
        actualGold: totalValue > 0 ? (categoryValues.GOLD / totalValue) * 100 : 0,
        actualCash: totalValue > 0 ? (totalCash / totalValue) * 100 : 0
      };

      // Verificar si necesita rebalanceo
      const needsRebalancing = this.checkRebalanceNeeded(portfolio, actualPercentages);

      // Actualizar portfolio
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: {
          currentValue: totalValue,
          ...actualPercentages,
          needsRebalancing,
          lastRebalanceCheck: new Date()
        }
      });

    } catch (error) {
      console.error(`Error recalculating portfolio ${portfolio.id}:`, error);
    }
  }

  /**
   * Verificar si necesita rebalanceo (desviación > 5%)
   */
  checkRebalanceNeeded(portfolio, actualPercentages) {
    const threshold = 5;

    const deviations = [
      Math.abs(portfolio.recommendedRentaFija - actualPercentages.actualRentaFija),
      Math.abs(portfolio.recommendedRentaVariable - actualPercentages.actualRentaVariable),
      Math.abs(portfolio.recommendedCrypto - actualPercentages.actualCrypto),
      Math.abs(portfolio.recommendedGold - actualPercentages.actualGold)
    ];

    return deviations.some(dev => dev > threshold);
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Actualizar precios manualmente (para testing)
   */
  async updateNow() {
    console.log('🔄 Ejecutando actualización manual de precios...');
    await this.updateAllPrices();
  }
}

module.exports = new PriceUpdater();
