/**
 * Servicio de recomendaciones inteligentes de productos financieros
 */

const prisma = require('../utils/prismaClient');
const { recommendProductsForUser } = require('./vectorSearchService');

function generateExplanation(product, profile, similarity) {
  const reasons = [];

  if (similarity >= 0.9) {
    reasons.push('Coincidencia perfecta con tu perfil de inversión');
  } else if (similarity >= 0.8) {
    reasons.push('Muy adecuado para tu perfil de inversión');
  } else if (similarity >= 0.7) {
    reasons.push('Buena coincidencia con tus preferencias');
  } else {
    reasons.push('Compatible con tu perfil');
  }

  if (product.recommendedFor?.includes(profile.riskTolerance)) {
    reasons.push(`Compatible con tu tolerancia al riesgo: ${profile.riskTolerance}`);
  }

  if (product.type === 'ETF' || product.type === 'EQUITY_ETF' || product.type === 'BOND_ETF') {
    reasons.push('ETF diversificado con bajos costes de gestión');
  } else if (product.type === 'STOCK') {
    reasons.push('Acción individual para portfolio más activo');
  }

  if (product.geography?.includes('Global')) {
    reasons.push('Exposición geográfica global y diversificada');
  } else if (product.geography?.includes('Estados Unidos')) {
    reasons.push('Exposición al mercado estadounidense');
  } else if (product.geography?.includes('Europa')) {
    reasons.push('Exposición al mercado europeo');
  }

  if (product.sector && profile.investmentPreferences?.some(pref => 
    product.sector.toLowerCase().includes(pref.toLowerCase())
  )) {
    reasons.push(`Alineado con tus intereses: ${product.sector}`);
  }

  if (product.expense_ratio && product.expense_ratio < 0.20) {
    reasons.push(`Coste muy competitivo: ${product.expense_ratio}% TER`);
  }

  if (profile.timeHorizon === 'LARGO' && product.type === 'EQUITY_ETF') {
    reasons.push('Ideal para horizontes de inversión a largo plazo');
  } else if (profile.timeHorizon === 'CORTO' && product.type === 'BOND_ETF') {
    reasons.push('Adecuado para horizontes de inversión más cortos');
  }

  return reasons;
}

async function getPersonalizedRecommendations(userId, options = {}) {
  try {
    const { limit = 10, saveHistory = true } = options;

    const profile = await prisma.userInvestmentProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    });

    if (!profile) {
      throw new Error('Usuario no tiene perfil de inversión');
    }

    if (!profile.embedding) {
      throw new Error('Perfil no está vectorizado. Completa el cuestionario primero.');
    }

    console.log(`Generando recomendaciones personalizadas para usuario ${userId}`);

    const products = await recommendProductsForUser(userId, { 
      limit: limit * 2
    });

    const recommendations = products.slice(0, limit).map(product => ({
      product: {
        id: product.id,
        name: product.name,
        ticker: product.ticker,
        type: product.type,
        category: product.category,
        description: product.description,
        marketcap: product.marketcap,
        sector: product.sector,
        geography: product.geography,
        expense_ratio: product.expense_ratio
      },
      similarity: product.similarity,
      explanation: generateExplanation(product, profile, product.similarity),
      matchScore: Math.round(product.similarity * 100)
    }));

    if (saveHistory && recommendations.length > 0) {
      await Promise.all(
        recommendations.map(rec =>
          prisma.productRecommendation.create({
            data: {
              userId,
              productId: rec.product.id,
              profileId: profile.id,
              similarityScore: rec.similarity,
              action: 'VIEWED',
              explanation: {
                reasons: rec.explanation,
                score: rec.matchScore
              }
            }
          }).catch(err => {
            console.error(`Error guardando recomendación ${rec.product.id}:`, err.message);
          })
        )
      );
    }

    return {
      profile: {
        riskTolerance: profile.riskTolerance,
        timeHorizon: profile.timeHorizon,
        financialKnowledge: profile.financialKnowledge,
        investmentPreferences: profile.investmentPreferences
      },
      recommendations,
      totalResults: recommendations.length
    };

  } catch (error) {
    console.error('Error obteniendo recomendaciones personalizadas:', error);
    throw error;
  }
}

async function trackRecommendationAction(userId, productId, action) {
  try {
    const validActions = ['VIEWED', 'CLICKED', 'SELECTED', 'IGNORED'];
    
    if (!validActions.includes(action)) {
      throw new Error(`Acción inválida. Debe ser: ${validActions.join(', ')}`);
    }

    if (action === 'SELECTED') {
      await prisma.financialProduct.update({
        where: { id: productId },
        data: { selectCount: { increment: 1 } }
      });
    } else if (action === 'CLICKED') {
      await prisma.financialProduct.update({
        where: { id: productId },
        data: { viewCount: { increment: 1 } }
      });
    }

    const profile = await prisma.userInvestmentProfile.findUnique({
      where: { userId }
    });

    const recommendation = await prisma.productRecommendation.create({
      data: {
        userId,
        productId,
        profileId: profile?.id,
        similarityScore: 0,
        action,
        query: null
      }
    });

    console.log(`Acción registrada: ${action} en producto ${productId} por usuario ${userId}`);

    return recommendation;

  } catch (error) {
    console.error('Error registrando acción:', error);
    throw error;
  }
}

async function getRecommendationMetrics(userId = null) {
  try {
    const whereClause = userId ? { userId } : {};

    const [
      totalRecommendations,
      selectedRecommendations,
      clickedRecommendations,
      viewedRecommendations,
      ignoredRecommendations
    ] = await Promise.all([
      prisma.productRecommendation.count({ where: whereClause }),
      prisma.productRecommendation.count({ 
        where: { ...whereClause, action: 'SELECTED' } 
      }),
      prisma.productRecommendation.count({ 
        where: { ...whereClause, action: 'CLICKED' } 
      }),
      prisma.productRecommendation.count({ 
        where: { ...whereClause, action: 'VIEWED' } 
      }),
      prisma.productRecommendation.count({ 
        where: { ...whereClause, action: 'IGNORED' } 
      })
    ]);

    return {
      totalRecommendations,
      byAction: {
        selected: selectedRecommendations,
        clicked: clickedRecommendations,
        viewed: viewedRecommendations,
        ignored: ignoredRecommendations
      },
      rates: {
        selectionRate: totalRecommendations > 0 
          ? ((selectedRecommendations / totalRecommendations) * 100).toFixed(2) + '%'
          : '0%',
        clickRate: totalRecommendations > 0
          ? ((clickedRecommendations / totalRecommendations) * 100).toFixed(2) + '%'
          : '0%',
        engagementRate: totalRecommendations > 0
          ? (((selectedRecommendations + clickedRecommendations) / totalRecommendations) * 100).toFixed(2) + '%'
          : '0%'
      }
    };

  } catch (error) {
    console.error('Error obteniendo métricas:', error);
    throw error;
  }
}

async function getTopRecommendedProducts(options = {}) {
  try {
    const { limit = 10, action = 'SELECTED' } = options;

    const topProducts = await prisma.productRecommendation.groupBy({
      by: ['productId'],
      where: action ? { action } : {},
      _count: {
        productId: true
      },
      orderBy: {
        _count: {
          productId: 'desc'
        }
      },
      take: limit
    });

    const productIds = topProducts.map(tp => tp.productId);
    const products = await prisma.financialProduct.findMany({
      where: {
        id: { in: productIds }
      }
    });

    const result = topProducts.map(tp => {
      const product = products.find(p => p.id === tp.productId);
      return {
        product,
        recommendationCount: tp._count.productId
      };
    });

    return result;

  } catch (error) {
    console.error('Error obteniendo top productos:', error);
    throw error;
  }
}

module.exports = {
  getPersonalizedRecommendations,
  trackRecommendationAction,
  getRecommendationMetrics,
  getTopRecommendedProducts
};
