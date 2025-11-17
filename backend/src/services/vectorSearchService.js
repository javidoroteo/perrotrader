/**
 * Servicio de búsqueda vectorial para productos financieros
 * Usa pgvector en PostgreSQL para búsquedas semánticas
 */

const prisma = require('../utils/prismaClient');
const { generateSearchEmbedding } = require('./embeddingService.js');

/**
 * Busca productos similares usando similitud coseno con pgvector
 * @param {number[]} queryEmbedding - Vector embedding de la consulta
 * @param {Object} options - Opciones de búsqueda
 * @returns {Promise<Array>} Lista de productos ordenados por similitud
 */
async function searchSimilarProducts(queryEmbedding, options = {}) {
  const {
    limit = 10,
    minSimilarity = 0.7,
    type = null,
    category = null,
    riskLevel = null,
    geography = null,
    sector = null,
    excludeIds = []
  } = options;

  try {
    // Construir condiciones WHERE dinámicamente
    const whereConditions = [];
    const params = [];
    let paramIndex = 1;

    whereConditions.push('embedding IS NOT NULL');

    if (type) {
      whereConditions.push(`type = $${paramIndex}`);
      params.push(type);
      paramIndex++;
    }

    if (category) {
      whereConditions.push(`category = $${paramIndex}`);
      params.push(category);
      paramIndex++;
    }

    if (geography) {
      whereConditions.push(`geography = $${paramIndex}`);
      params.push(geography);
      paramIndex++;
    }

    if (sector) {
      whereConditions.push(`sector = $${paramIndex}`);
      params.push(sector);
      paramIndex++;
    }

    if (riskLevel) {
      whereConditions.push(`$${paramIndex} = ANY("recommendedFor")`);
      params.push(riskLevel);
      paramIndex++;
    }

    if (excludeIds.length > 0) {
      const placeholders = excludeIds.map((_, i) => `$${paramIndex + i}`).join(',');
      whereConditions.push(`id NOT IN (${placeholders})`);
      params.push(...excludeIds);
      paramIndex += excludeIds.length;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    const embeddingStr = `[${queryEmbedding.join(',')}]`;
    
    params.push(embeddingStr, minSimilarity, limit);
    const embeddingParamIndex = paramIndex;
    const minSimParamIndex = paramIndex + 1;
    const limitParamIndex = paramIndex + 2;

    const query = `
      SELECT 
        id,
        name,
        description,
        ticker,
        type,
        category,
        marketcap,
        "recommendedFor",
        "assetClass",
        sector,
        geography,
        expense_ratio,
        "viewCount",
        "selectCount",
        1 - (embedding <=> $${embeddingParamIndex}::vector) as similarity
      FROM financial_products
      ${whereClause}
      ${whereConditions.length > 0 ? 'AND' : 'WHERE'} 1 - (embedding <=> $${embeddingParamIndex}::vector) >= $${minSimParamIndex}
      ORDER BY similarity DESC
      LIMIT $${limitParamIndex}
    `;

    const results = await prisma.$queryRawUnsafe(query, ...params);
    
    return results.map(result => ({
      ...result,
      similarity: parseFloat(result.similarity),
      matchScore: Math.round(parseFloat(result.similarity) * 100)
    }));

  } catch (error) {
    console.error('Error en búsqueda vectorial:', error);
    throw new Error(`Error buscando productos similares: ${error.message}`);
  }
}

/**
 * Busca productos usando lenguaje natural
 */
async function searchProductsByNaturalLanguage(query, options = {}) {
  try {
    if (!query || query.trim().length === 0) {
      throw new Error('La consulta no puede estar vacía');
    }

    console.log(`Buscando productos con: "${query}"`);

    const queryEmbedding = await generateSearchEmbedding(query);

    const results = await searchSimilarProducts(queryEmbedding, {
      ...options,
      minSimilarity: options.minSimilarity || 0.6
    });

    console.log(`Encontrados ${results.length} productos relevantes`);
    
    return results;

  } catch (error) {
    console.error('Error en búsqueda por lenguaje natural:', error);
    throw error;
  }
}

/**
 * Recomienda productos basados en el perfil de usuario
 */
async function recommendProductsForUser(userId, options = {}) {
  try {
    const { limit = 10 } = options;

    const profile = await prisma.userInvestmentProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        embedding: true,
        riskTolerance: true,
        financialKnowledge: true,
        timeHorizon: true,
        investmentPreferences: true
      }
    });

    if (!profile) {
      throw new Error('Usuario no tiene perfil de inversión');
    }

    if (!profile.embedding) {
      throw new Error('Perfil de usuario no está vectorizado. Completa el cuestionario primero.');
    }

    console.log(`Generando recomendaciones para usuario ${userId}`);

    const results = await searchSimilarProducts(profile.embedding, {
      ...options,
      limit,
      riskLevel: profile.riskTolerance,
      minSimilarity: 0.65
    });

    return results;

  } catch (error) {
    console.error('Error generando recomendaciones:', error);
    throw error;
  }
}

/**
 * Encuentra productos similares a un producto dado
 */
async function findSimilarProducts(productId, options = {}) {
  try {
    const { limit = 5 } = options;

    const product = await prisma.financialProduct.findUnique({
      where: { id: productId },
      select: {
        id: true,
        embedding: true,
        type: true,
        category: true
      }
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (!product.embedding) {
      throw new Error('Producto no está vectorizado');
    }

    console.log(`Buscando productos similares a ${productId}`);

    const results = await searchSimilarProducts(product.embedding, {
      ...options,
      limit: limit + 1,
      excludeIds: [productId],
      type: product.type,
      minSimilarity: 0.75
    });

    return results.slice(0, limit);

  } catch (error) {
    console.error('Error buscando productos similares:', error);
    throw error;
  }
}

/**
 * Calcula la similitud coseno entre dos embeddings
 */
function cosineSimilarity(embedding1, embedding2) {
  if (!embedding1 || !embedding2) {
    throw new Error('Se requieren ambos embeddings');
  }

  if (embedding1.length !== embedding2.length) {
    throw new Error('Los embeddings deben tener la misma dimensión');
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    norm1 += embedding1[i] * embedding1[i];
    norm2 += embedding2[i] * embedding2[i];
  }

  const magnitude = Math.sqrt(norm1) * Math.sqrt(norm2);
  
  if (magnitude === 0) {
    return 0;
  }

  return dotProduct / magnitude;
}

/**
 * Obtiene estadísticas de productos vectorizados
 */
async function getVectorizationStats() {
  try {
    const [total, vectorized, byType] = await Promise.all([
      prisma.financialProduct.count(),
      
      prisma.financialProduct.count({
        where: { embedding: { not: null } }
      }),
      
      prisma.financialProduct.groupBy({
        by: ['type'],
        _count: { id: true }
      })
    ]);

    return {
      total,
      vectorized,
      pending: total - vectorized,
      vectorizationRate: total > 0 ? ((vectorized / total) * 100).toFixed(2) + '%' : '0%',
      byType: byType.map(t => ({
        type: t.type,
        count: t._count.id
      }))
    };

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
}

/**
 * Búsqueda híbrida
 */
async function hybridSearch(filters = {}) {
  const {
    query = null,
    type = null,
    category = null,
    riskLevel = null,
    minExpenseRatio = null,
    maxExpenseRatio = null,
    limit = 20
  } = filters;

  try {
    let results;

    if (query && query.trim().length > 0) {
      results = await searchProductsByNaturalLanguage(query, {
        type,
        category,
        riskLevel,
        limit
      });
    } else {
      const where = {};
      
      if (type) where.type = type;
      if (category) where.category = category;
      if (riskLevel) where.recommendedFor = { has: riskLevel };
      if (minExpenseRatio !== null || maxExpenseRatio !== null) {
        where.expense_ratio = {};
        if (minExpenseRatio !== null) where.expense_ratio.gte = minExpenseRatio;
        if (maxExpenseRatio !== null) where.expense_ratio.lte = maxExpenseRatio;
      }

      results = await prisma.financialProduct.findMany({
        where,
        take: limit,
        orderBy: { selectCount: 'desc' }
      });
    }

    if (minExpenseRatio !== null || maxExpenseRatio !== null) {
      results = results.filter(p => {
        if (p.expense_ratio === null) return true;
        if (minExpenseRatio !== null && p.expense_ratio < minExpenseRatio) return false;
        if (maxExpenseRatio !== null && p.expense_ratio > maxExpenseRatio) return false;
        return true;
      });
    }

    return results;

  } catch (error) {
    console.error('Error en búsqueda híbrida:', error);
    throw error;
  }
}

module.exports = {
  searchSimilarProducts,
  searchProductsByNaturalLanguage,
  recommendProductsForUser,
  findSimilarProducts,
  cosineSimilarity,
  getVectorizationStats,
  hybridSearch
};
