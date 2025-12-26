const prisma = require('../utils/prismaClient');
const assetService = require('./assetService');

/**
 * Servicio principal para gestión de portfolios del usuario
 */
class PortfolioManagerService {

  /**
   * Crear portfolio desde resultados del quiz
   */
/**
 * Crear portfolio desde resultados del quiz
 */
async createFromQuiz(userId, sessionId, portfolioName, totalSavings) {
  try {
    console.log('🔍 Creando portfolio desde quiz:', { userId, sessionId });
    
    // 1️⃣ Obtener sesión del quiz
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: { 
        personalityTest: true,
        answers: true 
      }
    });

    if (!session) {
      throw new Error('Sesión no encontrada');
    }

    if (!session.isCompleted) {
      throw new Error('Quiz no completado. Completa todas las preguntas primero.');
    }

    console.log('✅ Sesión encontrada:', {
      isCompleted: session.isCompleted,
      userId: session.userId,
      hasPersonality: !!session.personalityTest
    });

    // 2️⃣ Buscar reporte guardado
    let savedReport = await prisma.savedReport.findUnique({
      where: { sessionId }
    });

    // 3️⃣ Si no existe el reporte, generarlo ahora
    if (!savedReport) {
      console.log('⚠️ Reporte no encontrado, generando ahora...');
      
      const portfolioService = require('./portfolioServices');
      const reportService = require('./reportService');
      
      // Generar el reporte completo
      const result = await portfolioService.completeFinalResult(session);
      
      console.log('📊 Reporte generado:', {
        riskProfile: result.riskProfile,
        hasPortfolio: !!result.portfolio
      });
      
      // Guardar el reporte
      savedReport = await reportService.saveReport(sessionId, result);
      
      console.log('✅ Reporte guardado con ID:', savedReport.id);
    } else {
      console.log('✅ Reporte ya existía:', savedReport.id);
    }

    const portfolioAllocation = JSON.parse(savedReport.portfolioAllocation);

    // 4️⃣ Crear portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        name: portfolioName || 'Mi Portfolio',
        totalSavings: totalSavings || 0,
        currentValue: totalSavings || 0,
        riskProfile: savedReport.riskProfile,
        createdFromQuiz: true,
        sessionId,
        recommendedRentaFija: portfolioAllocation.bonos || 0,
        recommendedRentaVariable: portfolioAllocation.acciones || 0,
        recommendedCrypto: portfolioAllocation.criptomonedas || 0,
        recommendedGold: portfolioAllocation.oro || 0,
        recommendedCash: portfolioAllocation.efectivo || 0,
        actualRentaFija: 0,
        actualRentaVariable: 0,
        actualCrypto: 0,
        actualGold: 0,
        actualCash: totalSavings || 0 // Todo empieza en cash
      }
    });

    // 5️⃣ Actualizar usuario
    await prisma.user.update({
      where: { id: userId },
      data: { hasCompletedQuiz: true }
    });

    console.log('✅ Portfolio creado:', portfolio.id);

    return portfolio;
  } catch (error) {
    console.error('❌ Error creating portfolio from quiz:', error);
    throw error;
  }
}


  /**
   * Obtener todos los portfolios de un usuario
   */
  async getUserPortfolios(userId) {
    try {
      const portfolios = await prisma.portfolio.findMany({
        where: { userId },
        include: {
          holdings: {
            include: {
              asset: true
            }
          },
          _count: {
            select: {
              transactions: true,
              rebalanceHistory: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });

      return portfolios.map(p => this.formatPortfolio(p));
    } catch (error) {
      console.error('Error getting user portfolios:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles completos de un portfolio
   */
  async getPortfolioDetails(portfolioId, userId) {
    try {
      const portfolio = await prisma.portfolio.findFirst({
        where: {
          id: portfolioId,
          userId
        },
        include: {
          holdings: {
            include: { asset: true }
          },
          transactions: {
            include: { asset: true },
            orderBy: { createdAt: 'desc' },
            take: 20
          },
          rebalanceHistory: {
            orderBy: { createdAt: 'desc' },
            take: 5
          }
        }
      });

      if (!portfolio) {
        throw new Error('Portfolio no encontrado');
      }

      return this.formatPortfolioDetails(portfolio);
    } catch (error) {
      console.error('Error getting portfolio details:', error);
      throw error;
    }
  }

  /**
   * Agregar holding a portfolio
   */
  async addHolding(portfolioId, userId, ticker, quantity, purchasePrice) {
    try {
      // Verificar portfolio
      const portfolio = await prisma.portfolio.findFirst({
        where: { id: portfolioId, userId }
      });

      if (!portfolio) {
        throw new Error('Portfolio no encontrado');
      }

      // Obtener o crear activo
      const asset = await assetService.getOrCreateAsset(ticker);

      // Calcular valores
      const currentPrice = asset.currentPrice || purchasePrice;
      const totalInvested = quantity * purchasePrice;
      const currentValue = quantity * currentPrice;

      // Verificar si ya existe holding de este activo
      const existingHolding = await prisma.holding.findUnique({
        where: {
          portfolioId_assetId: {
            portfolioId,
            assetId: asset.id
          }
        }
      });

      let holding;
      if (existingHolding) {
        // Actualizar holding existente (promedio ponderado)
        const newQuantity = existingHolding.quantity + quantity;
        const newAveragePrice = 
          ((existingHolding.quantity * existingHolding.averagePrice) +
           (quantity * purchasePrice)) / newQuantity;

        holding = await prisma.holding.update({
          where: { id: existingHolding.id },
          data: {
            quantity: newQuantity,
            averagePrice: newAveragePrice,
            currentValue: newQuantity * currentPrice,
            updatedAt: new Date()
          },
          include: { asset: true }
        });
      } else {
        // Crear nuevo holding
        holding = await prisma.holding.create({
          data: {
            portfolioId,
            assetId: asset.id,
            quantity,
            averagePrice: purchasePrice,
            currentValue,
            allocation: 0 // Se calculará después
          },
          include: { asset: true }
        });
      }

      // Registrar transacción
      await prisma.transaction.create({
        data: {
          userId,
          portfolioId,
          assetId: asset.id,
          type: 'BUY',
          quantity,
          pricePerUnit: purchasePrice,
          totalAmount: totalInvested
        }
      });

      // Actualizar portfolio: calcular allocations y valores
      await this.recalculatePortfolio(portfolioId);

      return holding;
    } catch (error) {
      console.error('Error adding holding:', error);
      throw error;
    }
  }

  /**
   * Recalcular allocations y valores del portfolio
   */
  async recalculatePortfolio(portfolioId) {
    try {
      const holdings = await prisma.holding.findMany({
        where: { portfolioId },
        include: { asset: true }
      });

      let totalValue = 0;
      let categoryValues = {
        RENTA_FIJA: 0,
        RENTA_VARIABLE: 0,
        CRYPTO: 0,
        GOLD: 0,
        CASH: 0
      };

      // Calcular valor total y por categorías
      holdings.forEach(holding => {
        totalValue += holding.currentValue;
        const category = holding.asset.category;
        if (categoryValues[category] !== undefined) {
          categoryValues[category] += holding.currentValue;
        }
      });

      // Actualizar allocations de cada holding
      for (const holding of holdings) {
        const allocation = totalValue > 0 
          ? (holding.currentValue / totalValue) * 100 
          : 0;
        
        await prisma.holding.update({
          where: { id: holding.id },
          data: { allocation }
        });
      }

      // Obtener portfolio para sumar cash
      const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId }
      });

      const totalCash = portfolio.totalSavings - totalValue;
      if (totalCash > 0) {
        categoryValues.CASH = totalCash;
        totalValue += totalCash;
      }

      // Calcular porcentajes actuales por categoría
      const actualPercentages = {
        actualRentaFija: totalValue > 0 ? (categoryValues.RENTA_FIJA / totalValue) * 100 : 0,
        actualRentaVariable: totalValue > 0 ? (categoryValues.RENTA_VARIABLE / totalValue) * 100 : 0,
        actualCrypto: totalValue > 0 ? (categoryValues.CRYPTO / totalValue) * 100 : 0,
        actualGold: totalValue > 0 ? (categoryValues.GOLD / totalValue) * 100 : 0,
        actualCash: totalValue > 0 ? (categoryValues.CASH / totalValue) * 100 : 0
      };

      // Verificar si necesita rebalanceo (desviación > 5%)
      const needsRebalancing = this.checkRebalanceNeeded(portfolio, actualPercentages);

      // Actualizar portfolio
      await prisma.portfolio.update({
        where: { id: portfolioId },
        data: {
          currentValue: totalValue,
          ...actualPercentages,
          needsRebalancing,
          lastRebalanceCheck: new Date()
        }
      });

      return true;
    } catch (error) {
      console.error('Error recalculating portfolio:', error);
      throw error;
    }
  }

  /**
   * Verificar si el portfolio necesita rebalanceo
   */
  checkRebalanceNeeded(portfolio, actualPercentages) {
    const threshold = 5; // 5% de desviación

    const deviations = [
      Math.abs(portfolio.recommendedRentaFija - actualPercentages.actualRentaFija),
      Math.abs(portfolio.recommendedRentaVariable - actualPercentages.actualRentaVariable),
      Math.abs(portfolio.recommendedCrypto - actualPercentages.actualCrypto),
      Math.abs(portfolio.recommendedGold - actualPercentages.actualGold)
    ];

    return deviations.some(dev => dev > threshold);
  }

  /**
   * Generar sugerencias de distribución de dinero
   */
  async generateInvestmentSuggestions(portfolioId, userId) {
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

      const availableCash = portfolio.totalSavings - portfolio.currentValue;

      if (availableCash <= 0) {
        return {
          message: 'No hay efectivo disponible para invertir',
          suggestions: []
        };
      }

      if (!portfolio.riskProfile) {
        return {
          availableCash,
          totalSavings: portfolio.totalSavings,
          message: 'Portfolio sin perfil de riesgo. Busca activos manualmente o completa el test.',
          suggestions: [],
          hasProfile: false
        };
      }

      // Calcular cuánto falta para alcanzar cada categoría
      const targets = {
        RENTA_FIJA: {
          recommended: portfolio.recommendedRentaFija,
          actual: portfolio.actualRentaFija,
          targetAmount: (portfolio.recommendedRentaFija / 100) * portfolio.totalSavings
        },
        RENTA_VARIABLE: {
          recommended: portfolio.recommendedRentaVariable,
          actual: portfolio.actualRentaVariable,
          targetAmount: (portfolio.recommendedRentaVariable / 100) * portfolio.totalSavings
        },
        CRYPTO: {
          recommended: portfolio.recommendedCrypto,
          actual: portfolio.actualCrypto,
          targetAmount: (portfolio.recommendedCrypto / 100) * portfolio.totalSavings
        },
        GOLD: {
          recommended: portfolio.recommendedGold,
          actual: portfolio.actualGold,
          targetAmount: (portfolio.recommendedGold / 100) * portfolio.totalSavings
        }
      };

      // Obtener activos recomendados para cada categoría
      const recommendedAssets = await assetService.getRecommendedAssets(
        portfolio.riskProfile
      );

      // Generar sugerencias
      const suggestions = [];

      for (const [category, data] of Object.entries(targets)) {
        if (data.recommended > 0) {
          const currentAmount = (data.actual / 100) * portfolio.currentValue;
          const gap = data.targetAmount - currentAmount;

          if (gap > 0) {
            const assets = recommendedAssets.recommendations[category] || [];
            const topAssets = assets.slice(0, 3); // Top 3 recomendados

            suggestions.push({
              category,
              recommendedPercentage: data.recommended,
              currentPercentage: data.actual,
              targetAmount: data.targetAmount,
              currentAmount,
              gap,
              suggestedAssets: topAssets.map(asset => ({
                ticker: asset.ticker,
                name: asset.name,
                suggestedAmount: gap / topAssets.length,
                description: asset.description
              }))
            });
          }
        }
      }

      return {
        availableCash,
        totalSavings: portfolio.totalSavings,
        suggestions: suggestions.sort((a, b) => b.gap - a.gap)
      };
    } catch (error) {
      console.error('Error generating investment suggestions:', error);
      throw error;
    }
  }

  /**
   * Formatear portfolio para respuesta
   */
  formatPortfolio(portfolio) {
    return {
      id: portfolio.id,
      name: portfolio.name,
      totalSavings: portfolio.totalSavings,
      currentValue: portfolio.currentValue,
      riskProfile: portfolio.riskProfile,
      holdingsCount: portfolio.holdings?.length || 0,
      transactionsCount: portfolio._count?.transactions || 0,
      needsRebalancing: portfolio.needsRebalancing,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
      recommended: {
        rentaFija: portfolio.recommendedRentaFija,
        rentaVariable: portfolio.recommendedRentaVariable,
        crypto: portfolio.recommendedCrypto,
        gold: portfolio.recommendedGold,
        cash: portfolio.recommendedCash
      },
      actual: {
        rentaFija: portfolio.actualRentaFija,
        rentaVariable: portfolio.actualRentaVariable,
        crypto: portfolio.actualCrypto,
        gold: portfolio.actualGold,
        cash: portfolio.actualCash
      }
    };
  }

  /**
   * Formatear detalles completos del portfolio
   */
  formatPortfolioDetails(portfolio) {
    return {
      ...this.formatPortfolio(portfolio),
      holdings: portfolio.holdings?.map(h => ({
        id: h.id,
        asset: h.asset,
        quantity: h.quantity,
        averagePrice: h.averagePrice,
        currentValue: h.currentValue,
        allocation: h.allocation,
        profitLoss: h.currentValue - (h.quantity * h.averagePrice),
        profitLossPercentage: ((h.currentValue - (h.quantity * h.averagePrice)) / (h.quantity * h.averagePrice)) * 100
      })) || [],
      recentTransactions: portfolio.transactions || [],
      rebalanceHistory: portfolio.rebalanceHistory || []
    };
  }
    /**
   * ⭐ NUEVO: Crear portfolio manual (sin quiz)
   */
  async createManualPortfolio(userId, name, totalSavings, manualProfile = null) {
    try {
      // Si proporciona perfil manual, úsalo; si no, portfolio neutro
      const riskProfile = manualProfile?.riskTolerance || null;

      // Allocations por defecto si no hay perfil
      let recommendedAllocations = {
        rentaFija: 0,
        rentaVariable: 0,
        crypto: 0,
        gold: 0,
        cash: 100 // Por defecto, todo en cash
      };

      // Si proporciona perfil manual, generar allocations básicas
      if (manualProfile && manualProfile.riskTolerance) {
        recommendedAllocations = this.getDefaultAllocations(manualProfile.riskTolerance);
      }

      // Crear portfolio
      const portfolio = await prisma.portfolio.create({
        data: {
          userId,
          name,
          totalSavings,
          currentValue: totalSavings,
          riskProfile,
          createdFromQuiz: false,
          sessionId: null,

          recommendedRentaFija: recommendedAllocations.rentaFija,
          recommendedRentaVariable: recommendedAllocations.rentaVariable,
          recommendedCrypto: recommendedAllocations.crypto,
          recommendedGold: recommendedAllocations.gold,
          recommendedCash: recommendedAllocations.cash,

          actualRentaFija: 0,
          actualRentaVariable: 0,
          actualCrypto: 0,
          actualGold: 0,
          actualCash: 100
        }
      });

      return portfolio;
    } catch (error) {
      console.error('Error creating manual portfolio:', error);
      throw error;
    }
  }

  /**
   * ⭐ NUEVO: Convertir portfolio manual a portfolio con quiz
   */
  async convertToQuizPortfolio(portfolioId, userId, sessionId) {
    try {
      // Verificar que el portfolio es del usuario
      const portfolio = await prisma.portfolio.findFirst({
        where: { id: portfolioId, userId }
      });

      if (!portfolio) {
        throw new Error('Portfolio no encontrado');
      }

      // Obtener datos del quiz
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { personalityTest: true }
      });

      if (!session || !session.isCompleted) {
        throw new Error('Quiz no completado');
      }

      const savedReport = await prisma.savedReport.findUnique({
        where: { sessionId }
      });

      if (!savedReport) {
        throw new Error('Reporte no encontrado');
      }

      const portfolioAllocation = JSON.parse(savedReport.portfolioAllocation);

      // Actualizar portfolio con datos del quiz
      const updatedPortfolio = await prisma.portfolio.update({
        where: { id: portfolioId },
        data: {
          riskProfile: savedReport.riskProfile,
          createdFromQuiz: true,
          sessionId,
          recommendedRentaFija: portfolioAllocation.bonos || 0,
          recommendedRentaVariable: portfolioAllocation.acciones || 0,
          recommendedCrypto: portfolioAllocation.criptomonedas || 0,
          recommendedGold: portfolioAllocation.oro || 0,
          recommendedCash: portfolioAllocation.efectivo || 0,
          updatedAt: new Date()
        }
      });

      // Actualizar usuario: hasCompletedQuiz
      await prisma.user.update({
        where: { id: userId },
        data: { hasCompletedQuiz: true }
      });

      return updatedPortfolio;
    } catch (error) {
      console.error('Error converting portfolio to quiz:', error);
      throw error;
    }
  }

  /**
   * ⭐ HELPER: Obtener allocations por defecto según riesgo
   */
  getDefaultAllocations(riskTolerance) {
    const allocations = {
      'Bajo Riesgo': {
        rentaFija: 70,
        rentaVariable: 20,
        crypto: 0,
        gold: 5,
        cash: 5
      },
      'Riesgo Moderado': {
        rentaFija: 40,
        rentaVariable: 50,
        crypto: 5,
        gold: 5,
        cash: 0
      },
      'Alto Riesgo': {
        rentaFija: 10,
        rentaVariable: 70,
        crypto: 15,
        gold: 5,
        cash: 0
      }
    };

    return allocations[riskTolerance] || {
      rentaFija: 0,
      rentaVariable: 0,
      crypto: 0,
      gold: 0,
      cash: 100
    };
  }
}

module.exports = new PortfolioManagerService();
