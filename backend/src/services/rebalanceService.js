const prisma = require('../utils/prismaClient');
const assetService = require('./assetService');

/**
 * Servicio para rebalanceo de portfolios
 */
class RebalanceService {

  /**
   * Analizar portfolio y generar sugerencias de rebalanceo
   */
  async analyzePortfolio(portfolioId, userId) {
    try {
      const portfolio = await prisma.portfolio.findFirst({
        where: { id: portfolioId, userId },
        include: {
          holdings: {
            include: { asset: true }
          }
        }
      });

      if (!portfolio) {
        throw new Error('Portfolio no encontrado');
      }

      // Calcular desviaciones por categoría
      const deviations = {
        rentaFija: {
          recommended: portfolio.recommendedRentaFija,
          actual: portfolio.actualRentaFija,
          deviation: portfolio.actualRentaFija - portfolio.recommendedRentaFija,
          needsAction: Math.abs(portfolio.actualRentaFija - portfolio.recommendedRentaFija) > 5
        },
        rentaVariable: {
          recommended: portfolio.recommendedRentaVariable,
          actual: portfolio.actualRentaVariable,
          deviation: portfolio.actualRentaVariable - portfolio.recommendedRentaVariable,
          needsAction: Math.abs(portfolio.actualRentaVariable - portfolio.recommendedRentaVariable) > 5
        },
        crypto: {
          recommended: portfolio.recommendedCrypto,
          actual: portfolio.actualCrypto,
          deviation: portfolio.actualCrypto - portfolio.recommendedCrypto,
          needsAction: Math.abs(portfolio.actualCrypto - portfolio.recommendedCrypto) > 5
        },
        gold: {
          recommended: portfolio.recommendedGold,
          actual: portfolio.actualGold,
          deviation: portfolio.actualGold - portfolio.recommendedGold,
          needsAction: Math.abs(portfolio.actualGold - portfolio.recommendedGold) > 5
        }
      };

      // Calcular desviación total
      const totalDeviation = Object.values(deviations).reduce((sum, cat) => 
        sum + Math.abs(cat.deviation), 0
      ) / 4;

      const needsRebalancing = totalDeviation > 5;

      if (!needsRebalancing) {
        return {
          needsRebalancing: false,
          message: 'Tu portfolio está bien balanceado',
          totalDeviation,
          deviations
        };
      }

      // Generar sugerencias específicas
      const suggestions = await this.generateRebalanceSuggestions(portfolio, deviations);

      return {
        needsRebalancing: true,
        message: 'Tu portfolio necesita rebalanceo',
        totalDeviation,
        deviations,
        suggestions
      };
    } catch (error) {
      console.error('Error analyzing portfolio:', error);
      throw error;
    }
  }

  /**
   * Generar sugerencias específicas de rebalanceo
   */
  async generateRebalanceSuggestions(portfolio, deviations) {
    const suggestions = [];
    const totalValue = portfolio.currentValue;

    for (const [category, data] of Object.entries(deviations)) {
      if (!data.needsAction) continue;

      const categoryMap = {
        rentaFija: 'RENTA_FIJA',
        rentaVariable: 'RENTA_VARIABLE',
        crypto: 'CRYPTO',
        gold: 'GOLD'
      };

      const actualCategory = categoryMap[category];
      const targetAmount = (data.recommended / 100) * totalValue;
      const currentAmount = (data.actual / 100) * totalValue;
      const difference = targetAmount - currentAmount;

      if (difference > 0) {
        // Necesita COMPRAR
        const recommendedAssets = await assetService.getRecommendedAssets(
          portfolio.riskProfile,
          actualCategory
        );

        const topAssets = recommendedAssets.recommendations[actualCategory]?.slice(0, 3) || [];

        suggestions.push({
          action: 'BUY',
          category: actualCategory,
          categoryName: this.getCategoryName(actualCategory),
          currentPercentage: data.actual,
          targetPercentage: data.recommended,
          currentAmount,
          targetAmount,
          amountNeeded: Math.abs(difference),
          message: `Necesitas invertir ${this.formatCurrency(Math.abs(difference))} más en ${this.getCategoryName(actualCategory)}`,
          suggestedAssets: topAssets.map(asset => ({
            ticker: asset.ticker,
            name: asset.name,
            suggestedAmount: Math.abs(difference) / topAssets.length,
            currentPrice: 0 // Se actualizará después
          }))
        });
      } else {
        // Necesita VENDER
        const holdings = portfolio.holdings.filter(h => h.asset.category === actualCategory);

        suggestions.push({
          action: 'SELL',
          category: actualCategory,
          categoryName: this.getCategoryName(actualCategory),
          currentPercentage: data.actual,
          targetPercentage: data.recommended,
          currentAmount,
          targetAmount,
          amountToReduce: Math.abs(difference),
          message: `Considera reducir ${this.formatCurrency(Math.abs(difference))} de ${this.getCategoryName(actualCategory)}`,
          holdingsToConsider: holdings.map(h => ({
            ticker: h.asset.ticker,
            name: h.asset.name,
            currentValue: h.currentValue,
            quantity: h.quantity,
            suggestedReduction: (Math.abs(difference) / currentAmount) * h.currentValue
          }))
        });
      }
    }

    return suggestions;
  }

  /**
   * Guardar historial de rebalanceo
   */
  async saveRebalanceHistory(portfolioId, userId, suggestions, deviation) {
    try {
      const portfolio = await prisma.portfolio.findFirst({
        where: { id: portfolioId, userId }
      });

      if (!portfolio) {
        throw new Error('Portfolio no encontrado');
      }

      const rebalance = await prisma.rebalanceHistory.create({
        data: {
          portfolioId,
          suggestions: JSON.stringify(suggestions),
          deviation,
          executed: false
        }
      });

      return rebalance;
    } catch (error) {
      console.error('Error saving rebalance history:', error);
      throw error;
    }
  }

  /**
   * Marcar rebalanceo como ejecutado
   */
  async markAsExecuted(rebalanceId, userId) {
    try {
      const rebalance = await prisma.rebalanceHistory.findFirst({
        where: {
          id: rebalanceId,
          portfolio: {
            userId
          }
        }
      });

      if (!rebalance) {
        throw new Error('Registro de rebalanceo no encontrado');
      }

      await prisma.rebalanceHistory.update({
        where: { id: rebalanceId },
        data: {
          executed: true,
          executedAt: new Date()
        }
      });

      return { success: true, message: 'Rebalanceo marcado como ejecutado' };
    } catch (error) {
      console.error('Error marking rebalance as executed:', error);
      throw error;
    }
  }

  /**
   * Obtener historial de rebalanceos de un portfolio
   */
  async getRebalanceHistory(portfolioId, userId) {
    try {
      const portfolio = await prisma.portfolio.findFirst({
        where: { id: portfolioId, userId }
      });

      if (!portfolio) {
        throw new Error('Portfolio no encontrado');
      }

      const history = await prisma.rebalanceHistory.findMany({
        where: { portfolioId },
        orderBy: { createdAt: 'desc' },
        take: 10
      });

      return history.map(h => ({
        id: h.id,
        createdAt: h.createdAt,
        deviation: h.deviation,
        executed: h.executed,
        executedAt: h.executedAt,
        suggestions: JSON.parse(h.suggestions)
      }));
    } catch (error) {
      console.error('Error getting rebalance history:', error);
      throw error;
    }
  }

  /**
   * Utilidades
   */
  getCategoryName(category) {
    const names = {
      RENTA_FIJA: 'Renta Fija',
      RENTA_VARIABLE: 'Renta Variable',
      CRYPTO: 'Criptomonedas',
      GOLD: 'Oro',
      CASH: 'Efectivo'
    };
    return names[category] || category;
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }
}

module.exports = new RebalanceService();
