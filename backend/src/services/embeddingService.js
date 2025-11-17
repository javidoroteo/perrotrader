/**
 * Servicio de generación de embeddings usando Google Vertex AI
 * gemini-embedding-001 con 1536 dimensiones
 * Soporte multilingüe (100+ idiomas, incluyendo español)
 */

const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform');

// Configuración
const PROJECT_ID = process.env.GCP_PROJECT_ID || 'avid-battery-478212-u8';
const LOCATION = process.env.GCP_LOCATION || 'europe-west1';
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'gemini-embedding-001';
const EMBEDDING_DIMENSIONS = parseInt(process.env.EMBEDDING_DIMENSIONS || '1536');
const TASK_TYPE = process.env.TASK_TYPE || 'RETRIEVAL_DOCUMENT';

// Cliente de Vertex AI Prediction
const client = new PredictionServiceClient({
  apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
});

/**
 * Genera un embedding para un texto dado usando Vertex AI
 * @param {string} text - Texto a vectorizar
 * @param {string} taskType - Tipo de tarea
 * @returns {Promise<number[]>} Array de números (embedding)
 */
async function generateEmbedding(text, taskType = TASK_TYPE) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error('El texto no puede estar vacío');
    }

    if (!PROJECT_ID) {
      throw new Error('GCP_PROJECT_ID no está configurada en las variables de entorno');
    }

    const endpoint = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${EMBEDDING_MODEL}`;
    
    const instance = helpers.toValue({
      content: text.trim(),
      task_type: taskType,
    });

    const parameters = helpers.toValue({
      outputDimensionality: EMBEDDING_DIMENSIONS,
    });

    const request = {
      endpoint,
      instances: [instance],
      parameters,
    };

    const [response] = await client.predict(request);
    const prediction = response.predictions[0];
    
    const embeddings = prediction.structValue.fields.embeddings;
    const values = embeddings.structValue.fields.values;
    
    return values.listValue.values.map(v => v.numberValue);
    
  } catch (error) {
    console.error('Error generando embedding:', error.message);
    throw new Error(`Error al generar embedding: ${error.message}`);
  }
}

/**
 * Genera embedding para un producto financiero
 * @param {Object} product - Objeto con datos del producto
 * @returns {Promise<number[]>} Embedding del producto
 */
async function generateProductEmbedding(product) {
  try {
    const parts = [
      `Producto financiero: ${product.name}`,
      `Tipo de producto: ${product.type}`,
      `Descripción: ${product.description}`,
      product.ticker ? `Ticker o símbolo: ${product.ticker}` : null,
      product.category ? `Categoría: ${product.category}` : null,
      product.marketcap ? `Capitalización de mercado: ${product.marketcap}` : null,
      product.assetClass ? `Clase de activo: ${product.assetClass}` : null,
      product.sector ? `Sector: ${product.sector}` : null,
      product.geography ? `Cobertura geográfica: ${product.geography}` : null,
      product.expense_ratio ? `Ratio de gastos: ${product.expense_ratio}%` : null,
      product.recommendedFor && product.recommendedFor.length > 0
        ? `Recomendado para inversores con: ${product.recommendedFor.join(', ')}`
        : null
    ];

    const text = parts.filter(Boolean).join('. ') + '.';
    console.log(`Generando embedding para producto: ${product.name}`);
    
    return await generateEmbedding(text, 'RETRIEVAL_DOCUMENT');
  } catch (error) {
    console.error(`Error generando embedding para producto ${product.name}:`, error.message);
    throw error;
  }
}

/**
 * Genera embedding para perfil de usuario
 * @param {Object} profile - Objeto con datos del perfil
 * @returns {Promise<{embedding: number[], profileText: string}>}
 */
async function generateUserProfileEmbedding(profile) {
  try {
    const riskMap = {
      'Bajo Riesgo': 'perfil conservador con baja tolerancia al riesgo',
      'Riesgo Moderado': 'perfil moderado que busca equilibrio entre seguridad y crecimiento',
      'Alto Riesgo': 'perfil agresivo que busca alto crecimiento y acepta volatilidad'
    };

    const knowledgeMap = {
      'BEGINNER': 'principiante en inversión con conocimientos básicos',
      'INTERMEDIATE': 'conocimiento intermedio de inversión y mercados',
      'ADVANCED': 'conocimiento avanzado de inversión y productos financieros'
    };

    const horizonMap = {
      'CORTO': 'corto plazo (menos de 3 años)',
      'MEDIO': 'medio plazo (entre 3 y 7 años)',
      'LARGO': 'largo plazo (más de 7 años)'
    };

    const parts = [
      `Inversor con ${riskMap[profile.riskTolerance] || profile.riskTolerance}`,
      `Nivel de experiencia: ${knowledgeMap[profile.financialKnowledge] || profile.financialKnowledge}`,
      `Edad: ${profile.age} años`,
      `Horizonte temporal de inversión: ${horizonMap[profile.timeHorizon] || profile.timeHorizon}`,
      `Ingresos anuales: ${profile.income} euros`,
      `Capital disponible para invertir: ${profile.savings} euros`,
      profile.investmentPreferences && profile.investmentPreferences.length > 0
        ? `Intereses e preferencias de inversión: ${profile.investmentPreferences.join(', ')}`
        : null
    ];

    const profileText = parts.filter(Boolean).join('. ') + '.';
    console.log(`Generando embedding para perfil de usuario`);
    
    const embedding = await generateEmbedding(profileText, 'RETRIEVAL_QUERY');
    return {
      embedding,
      profileText
    };
  } catch (error) {
    console.error('Error generando embedding para perfil de usuario:', error.message);
    throw error;
  }
}

/**
 * Genera embedding para una búsqueda en lenguaje natural
 * @param {string} query - Consulta del usuario
 * @returns {Promise<number[]>} Embedding de la búsqueda
 */
async function generateSearchEmbedding(query) {
  try {
    if (!query || query.trim().length === 0) {
      throw new Error('La consulta de búsqueda no puede estar vacía');
    }

    console.log(`Generando embedding para búsqueda: "${query}"`);
    
    return await generateEmbedding(query, 'RETRIEVAL_QUERY');
  } catch (error) {
    console.error('Error generando embedding para búsqueda:', error.message);
    throw error;
  }
}

/**
 * Genera múltiples embeddings en batch
 * @param {string[]} texts - Array de textos a vectorizar
 * @param {string} taskType - Tipo de tarea para todos los embeddings
 * @returns {Promise<number[][]>} Array de embeddings
 */
async function generateBatchEmbeddings(texts, taskType = 'RETRIEVAL_DOCUMENT') {
  try {
    if (!texts || texts.length === 0) {
      throw new Error('No se proporcionaron textos para vectorizar');
    }

    const validTexts = texts.filter(t => t && t.trim().length > 0);
    if (validTexts.length === 0) {
      throw new Error('Todos los textos están vacíos');
    }

    console.log(`Generando ${validTexts.length} embeddings en batch...`);
    
    const batchSize = 5;
    const embeddings = [];
    
    for (let i = 0; i < validTexts.length; i += batchSize) {
      const batch = validTexts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(text => generateEmbedding(text, taskType))
      );
      embeddings.push(...batchResults);
      
      if (i + batchSize < validTexts.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return embeddings;
  } catch (error) {
    console.error('Error generando embeddings en batch:', error.message);
    throw new Error(`Error al generar embeddings en batch: ${error.message}`);
  }
}

/**
 * Valida que un embedding tenga el formato correcto
 * @param {number[]} embedding - Embedding a validar
 * @returns {boolean} True si es válido
 */
function validateEmbedding(embedding) {
  if (!Array.isArray(embedding)) {
    return false;
  }

  if (embedding.length !== EMBEDDING_DIMENSIONS) {
    console.warn(`Embedding tiene ${embedding.length} dimensiones, se esperaban ${EMBEDDING_DIMENSIONS}`);
    return false;
  }

  if (!embedding.every(num => typeof num === 'number' && !isNaN(num))) {
    return false;
  }

  return true;
}

/**
 * Convierte un embedding a formato string para PostgreSQL
 * @param {number[]} embedding - Array de números
 * @returns {string} String en formato PostgreSQL: '[0.1, 0.2, ...]'
 */
function embeddingToString(embedding) {
  if (!validateEmbedding(embedding)) {
    throw new Error('Embedding inválido');
  }

  return `[${embedding.join(',')}]`;
}

// Configuración
const config = {
  model: EMBEDDING_MODEL,
  dimensions: EMBEDDING_DIMENSIONS,
  taskType: TASK_TYPE,
  provider: 'Google Vertex AI',
  location: LOCATION,
  isConfigured: !!PROJECT_ID,
  supportsLanguages: ['es', 'en', 'fr', 'de', 'pt', 'it', 'ar', 'zh', 'ja', 'ko', '100+ more']
};

// Exportaciones CommonJS
module.exports = {
  generateEmbedding,
  generateProductEmbedding,
  generateUserProfileEmbedding,
  generateSearchEmbedding,
  generateBatchEmbeddings,
  validateEmbedding,
  embeddingToString,
  config
};
