const { PrismaClient } = require('@prisma/client');
const { personalityQuestions } = require('../data/personalityQuestions');
const { archetypeDetails } = require('../config/archetypes');

const prisma = new PrismaClient();

class PersonalityService {
  constructor() {
    // Mapeo de IDs de preguntas por dimensión y polo
    this.questionMap = {
      1: { // Planificación (P) vs Oportunismo (O)
        positive: [1, 3, 5, 7], // P
        negative: [2, 4, 6, 8]  // O
      },
      2: { // Análisis (A) vs Intuición (I)
        positive: [9, 11, 13, 15], // A
        negative: [10, 12, 14, 16] // I
      },
      3: { // Autonomía (T) vs Dependencia (D)
        positive: [17, 19, 21, 23], // T
        negative: [18, 20, 22, 24]  // D
      },
      4: { // Conservadurismo (C) vs Ambición (B)
        positive: [25, 27, 29, 31], // C
        negative: [26, 28, 30, 32]  // B
      }
    };

    // Los arquetipos vienen del archivo de config
    this.archetypeMap = archetypeDetails.nameMapping;

    // Nombres de dimensiones
    this.dimensionLabels = {
      1: { positive: 'Planificación', negative: 'Oportunismo', shortPositive: 'P', shortNegative: 'O' },
      2: { positive: 'Análisis', negative: 'Intuición', shortPositive: 'A', shortNegative: 'I' },
      3: { positive: 'Autonomía', negative: 'Dependencia', shortPositive: 'T', shortNegative: 'D' },
      4: { positive: 'Conservadurismo', negative: 'Ambición', shortPositive: 'C', shortNegative: 'B' }
    };
  }

  /**
   * Valida que todas las respuestas estén presentes y sean válidas
   */
  validateResponses(responses) {
    if (!Array.isArray(responses) || responses.length !== 32) {
      throw new Error('Se requieren exactamente 32 respuestas');
    }

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      if (!Number.isInteger(response) || response < 1 || response > 7) {
        throw new Error(`Respuesta ${i + 1} debe ser un número entero entre 1 y 7. Recibido: ${response}`);
      }
    }

    return true;
  }

  /**
   * Calcula la puntuación para una dimensión específica
   */
  calculateDimensionScore(responses, dimension) {
    const questionIds = this.questionMap[dimension];
    
    let positiveSum = 0;
    questionIds.positive.forEach(id => {
      positiveSum += responses[id - 1];
    });

    let negativeSum = 0;
    questionIds.negative.forEach(id => {
      negativeSum += (8 - responses[id - 1]);
    });

    const netScore = positiveSum - negativeSum;

    return {
      positiveSum,
      negativeSum,
      netScore
    };
  }

  /**
   * Determina la letra de una dimensión basada en la puntuación neta
   */
  getDimensionLetter(netScore, dimension) {
    const labels = this.dimensionLabels[dimension];
    
    return netScore > 0 ? labels.shortPositive : labels.shortNegative;
  }

  /**
   * Calcula el porcentaje de inclinación hacia cada polo
   */
  calculatePercentages(netScore) {
    const positivePercentage = Math.round(((netScore + 24) / 48) * 100);
    return {
      positive: positivePercentage,
      negative: 100 - positivePercentage
    };
  }

  /**
   * Procesa todas las respuestas y calcula el perfil completo
   */
  calculatePersonalityProfile(responses) {
    this.validateResponses(responses);

    const results = {
      dimensions: {},
      archetype: '',
      archetypeName: '',
      detailedScores: {}
    };

    const letters = [];
    
    for (let dimension = 1; dimension <= 4; dimension++) {
      const score = this.calculateDimensionScore(responses, dimension);
      const letter = this.getDimensionLetter(score.netScore, dimension);
      const percentages = this.calculatePercentages(score.netScore);
      const labels = this.dimensionLabels[dimension];

      letters.push(letter);

      results.dimensions[dimension] = {
        dimension,
        netScore: score.netScore,
        positiveSum: score.positiveSum,
        negativeSum: score.negativeSum,
        letter,
        percentages,
        labels,
        dominantText: percentages.positive >= 50 
          ? `${percentages.positive}% ${labels.positive}`
          : `${percentages.negative}% ${labels.negative}`
      };

      results.detailedScores[dimension] = score.netScore;
    }

    results.archetype = letters.join('-');
    results.archetypeName = this.archetypeMap[results.archetype] || 'Arquetipo Desconocido';

    return results;
  }

  /**
   * Guarda o actualiza el test de personalidad en base de datos
   */
  async savePersonalityTest(sessionId, responses, blockNumber = null) {
    try {
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId }
      });

      if (!session) {
        throw new Error('Sesión no encontrada');
      }

      let personalityTest = await prisma.personalityTest.findUnique({
        where: { sessionId }
      });

      if (!personalityTest) {
        personalityTest = await prisma.personalityTest.create({
          data: {
            sessionId,
            responses: JSON.stringify(responses),
            currentBlock: blockNumber || 1
          }
        });
      }

      if (responses.length === 32 && responses.every(r => r !== null && r !== undefined)) {
        const profile = this.calculatePersonalityProfile(responses);

        personalityTest = await prisma.personalityTest.update({
          where: { id: personalityTest.id },
          data: {
            responses: JSON.stringify(responses),
            completed: true,
            planningScore: profile.detailedScores[1],
            analysisScore: profile.detailedScores[2],
            autonomyScore: profile.detailedScores[3],
            ambitionScore: profile.detailedScores[4],
            archetype: profile.archetype,
            archetypeName: profile.archetypeName,
            currentBlock: 4
          }
        });

        return {
          ...personalityTest,
          profile,
          completed: true
        };
      } else {
        personalityTest = await prisma.personalityTest.update({
          where: { id: personalityTest.id },
          data: {
            responses: JSON.stringify(responses),
            currentBlock: blockNumber || personalityTest.currentBlock
          }
        });

        return {
          ...personalityTest,
          completed: false
        };
      }
    } catch (error) {
      throw new Error(`Error guardando test de personalidad: ${error.message}`);
    }
  }

  /**
   * Obtiene el test de personalidad por sessionId
   */
  async getPersonalityTest(sessionId) {
    try {
      const personalityTest = await prisma.personalityTest.findUnique({
        where: { sessionId },
        include: { session: true }
      });

      if (!personalityTest) {
        return null;
      }

      let profile = null;
      
      if (personalityTest.completed && personalityTest.responses) {
        const responses = JSON.parse(personalityTest.responses);
        profile = this.calculatePersonalityProfile(responses);
      }

      return {
        ...personalityTest,
        profile,
        responses: personalityTest.responses ? JSON.parse(personalityTest.responses) : null
      };
    } catch (error) {
      throw new Error(`Error obteniendo test de personalidad: ${error.message}`);
    }
  }

  /**
   * Obtiene preguntas para un bloque específico (1-4)
   */
  getQuestionsByBlock(blockNumber) {
    if (blockNumber < 1 || blockNumber > 4) {
      throw new Error('El número de bloque debe estar entre 1 y 4');
    }

    const startIndex = (blockNumber - 1) * 8;
    const endIndex = startIndex + 8;
    
    return personalityQuestions.slice(startIndex, endIndex);
  }

  /**
   * Obtiene todas las preguntas mezcladas por bloque para mejor UX
   */
  getShuffledQuestionsByBlock(blockNumber) {
    const questions = this.getQuestionsByBlock(blockNumber);
    return this.shuffleArray([...questions]);
  }

  /**
   * Función auxiliar para mezclar array
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Obtiene información detallada de un arquetipo específico
   */
  getArchetypeDetails(archetypeCode) {
    return {
      code: archetypeCode,
      name: archetypeDetails.nameMapping[archetypeCode] || 'Arquetipo Desconocido',
      slogan: archetypeDetails.slogans[archetypeCode] || '',
      description: archetypeDetails.descriptions[archetypeCode] || 'Descripción no disponible',
      strengths: archetypeDetails.strengths[archetypeCode] || 'Fortalezas no disponibles',
      risks: archetypeDetails.risks[archetypeCode] || 'Riesgos no disponibles',
      //portfolio: archetypeDetails.portfolios[archetypeCode] || 'Cartera no disponible',
      advice: archetypeDetails.advice[archetypeCode] || 'Consejos no disponibles'
    };
  }

  /**
   * Procesa el test completo y retorna resultado final
   */
  async processCompleteTest(sessionId, allResponses) {
    try {
      const profile = this.calculatePersonalityProfile(allResponses);
      const savedTest = await this.savePersonalityTest(sessionId, allResponses);
      const archetypeDetails = this.getArchetypeDetails(profile.archetype);

      return {
        success: true,
        personalityTest: savedTest,
        profile: {
          ...profile,
          archetypeDetails
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Procesa un bloque parcial de respuestas
   */
  async processBlock(sessionId, blockResponses, blockNumber) {
    try {
      let existingTest = await prisma.personalityTest.findUnique({
        where: { sessionId }
      });

      let allResponses = new Array(32).fill(null);
      
      if (existingTest && existingTest.responses) {
        allResponses = JSON.parse(existingTest.responses);
      }

      const startIndex = (blockNumber - 1) * 8;
      for (let i = 0; i < blockResponses.length; i++) {
        allResponses[startIndex + i] = blockResponses[i];
      }

      const savedTest = await this.savePersonalityTest(sessionId, allResponses, blockNumber);

      const isComplete = allResponses.every(r => r !== null && r !== undefined);

      if (isComplete) {
        return this.processCompleteTest(sessionId, allResponses);
      }

      return {
        success: true,
        personalityTest: savedTest,
        completed: false,
        currentBlock: blockNumber,
        progress: (blockNumber / 4) * 100
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Genera un reporte detallado del perfil
   */
  generateDetailedReport(profile) {
    const report = {
      arquetipo: {
        codigo: profile.archetype,
        nombre: profile.archetypeName,
        eslogan: archetypeDetails.slogans[profile.archetype] || ''
      },
      dimensiones: [],
      recomendaciones: {
        fortalezas: archetypeDetails.strengths[profile.archetype] || 'Fortalezas no disponibles',
        riesgos: archetypeDetails.risks[profile.archetype] || 'Riesgos no disponibles',
        //cartera: archetypeDetails.portfolios[profile.archetype] || 'Cartera no disponible',
        consejos: archetypeDetails.advice[profile.archetype] || 'Consejos no disponibles'
      }
    };

    Object.values(profile.dimensions).forEach(dim => {
      report.dimensiones.push({
        numero: dim.dimension,
        etiquetas: dim.labels,
        puntuacionNeta: dim.netScore,
        letra: dim.letter,
        porcentajes: dim.percentages,
        textoDescriptivo: dim.dominantText
      });
    });

    return report;
  }
}

module.exports = new PersonalityService();