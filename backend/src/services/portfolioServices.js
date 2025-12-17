// backend/src/services/portfolioServices.js

const CONFIG = require('../config/portfolioConfig');
const { ASSET_EDUCATION } = require('../config/assetEducation');
const { STRATEGIES_EDUCATION } = require('../config/strategiesEducation');
const { RENTA_VARIABLE_CONFIG } = require('../config/rentaVariableConfig');
const { RENTA_FIJA_CONFIG } = require('../config/rentaFijaConfig');
const PersonalityService = require('./personalityServices');

class PortfolioService {
  
 /**
   * Calcula la cartera recomendada según el nuevo algoritmo
   * Sigue el proceso: Base -> Datos Objetivos -> Cripto -> Oro -> Límites -> Personalidad  -> Normalización
   */
  async calculatePortfolio(session) {
    // 1. Cargar cartera base
    const portfolio = { ...CONFIG.BASE_PORTFOLIO };
    //console.log('1. Cartera base:', portfolio);
    
    
    // 2. Aplicar ajustes de datos objetivos
    this.applyObjectiveAdjustments(portfolio, session);
    this.clampNegativeValues(portfolio);
    //console.log('2. Después datos objetivos:', portfolio);
    
    // 3. Aplicar preferencias de criptomonedas
    this.applyCryptoPreferences(portfolio, session.cryptoScore);
    //console.log('3. Después cripto:', portfolio);
    
    // 5. Aplicar oro según puntos acumulados
    this.applyGoldAllocation(portfolio, session.gold);
    //console.log('4. Después oro:', portfolio);

        // 2. Aplicar ajustes de personalidad
    await this.applyPersonalityAdjustments(portfolio, session.id);
    this.clampNegativeValues(portfolio);
    //console.log('5. Después personalidad:', portfolio);
    
    // 6. Aplicar límites globales
    this.applyGlobalLimits(portfolio);
    //console.log('6. Después límites:', portfolio);
    
    // 7. Normalizar al 100%
    this.normalizePortfolio(portfolio);
    //console.log('7. Cartera final normalizada:', portfolio);
    
    const riskProfile = this.getRiskProfile(session.totalScore);

    // 🆕 9. CALCULAR RISK SCORE DINÁMICO (0-100)
  let personalityData = null;
  try {
    personalityData = await PersonalityService.calculatePersonalityProfile(session.id);
  } catch (error) {
    console.warn('⚠️ No se pudo calcular personalidad para risk score:', error.message);
  }
    
    return {
      riskProfile,
      allocation: portfolio
    };
  }

  /**
 * Calcula el nivel de riesgo real (0-100) basado en múltiples factores
 * @param {Object} session - Sesión del usuario con todos los datos
 * @param {Object} portfolio - Portfolio final calculado
 * @param {Object} personalityData - Datos de personalidad del usuario
 * @returns {number} Risk score de 0-100
 */


  /**
   * Aplica ajustes basados en el test de personalidad usando porcentajes
   * Consulta las 4 dimensiones del perfil psicológico y aplica ajustes escalados
   */
  async applyPersonalityAdjustments(portfolio, sessionId) {
    try {
      const personalityTest = await PersonalityService.getPersonalityTest(sessionId);
      
      if (!personalityTest || !personalityTest.completed || !personalityTest.profile?.dimensions) {
        console.log('Test de personalidad no completado, saltando ajustes');
        return;
      }

      const dimensions = personalityTest.profile.dimensions;
      
      // Aplicar ajustes por cada dimensión en orden 1-4
      for (let dimNumber = 1; dimNumber <= 4; dimNumber++) {
        const dimension = dimensions[dimNumber];
        if (!dimension) continue;

        const positivePercentage = dimension.percentages.positive;
        
        // Solo aplicar si >= 51%
        if (positivePercentage >= 51) {
          const adjustmentKey = this.getAdjustmentKey(dimNumber, true); // true = positivo
          const adjustments = CONFIG.PERSONALITY_ADJUSTMENTS[adjustmentKey];
          
          if (adjustments) {
            const multiplier = positivePercentage / 100;
            const scaledAdjustments = {};
            
            // Escalar cada ajuste por el porcentaje
            Object.entries(adjustments).forEach(([asset, baseAdjustment]) => {
              scaledAdjustments[asset] = baseAdjustment * multiplier;
            });
            
            console.log(`Aplicando ${adjustmentKey}: ${positivePercentage}% →`, scaledAdjustments);
            this.applyAdjustments(portfolio, scaledAdjustments);
          }
        } else {
          // El lado negativo es dominante
          const negativePercentage = dimension.percentages.negative;
          if (negativePercentage >= 51) {
            const adjustmentKey = this.getAdjustmentKey(dimNumber, false); // false = negativo
            const adjustments = CONFIG.PERSONALITY_ADJUSTMENTS[adjustmentKey];
            
            if (adjustments) {
              const multiplier = negativePercentage / 100;
              const scaledAdjustments = {};
              
              Object.entries(adjustments).forEach(([asset, baseAdjustment]) => {
                scaledAdjustments[asset] = baseAdjustment * multiplier;
              });
              
              console.log(`Aplicando ${adjustmentKey}: ${negativePercentage}% →`, scaledAdjustments);
              this.applyAdjustments(portfolio, scaledAdjustments);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error aplicando ajustes de personalidad:', error);
    }
  }

  /**
   * Método auxiliar para mapear dimensión y polo a clave de ajuste
   */
  getAdjustmentKey(dimensionNumber, isPositive) {
    const mappings = {
      1: { positive: 'PLANIFICADOR', negative: 'OPORTUNISTA' },
      2: { positive: 'ANALITICO', negative: 'INTUITIVO' },
      3: { positive: 'AUTONOMO', negative: 'DEPENDIENTE' },
      4: { positive: 'CONSERVADOR', negative: 'AMBICIOSO' }
    };
    
    return mappings[dimensionNumber]?.[isPositive ? 'positive' : 'negative'];
  }

  /**
   * Aplica ajustes basados en datos objetivos del usuario
   * Experiencia, edad, ingresos, riesgo, fondo emergencia, horizonte, dividendos, jubilación
   */
  applyObjectiveAdjustments(portfolio, session) {
    // Ajuste por experiencia (expoints 0-13)
    const experienceLevel = this.getExperienceLevel(session.experienceScore);
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.EXPERIENCE[experienceLevel]);

    // Ajuste por edad (age 1-6) 
    const ageLevel = this.getAgeLevel(session.age);
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.AGE[ageLevel]);

    // Ajuste por ingresos (conopoints -1 a 22)
    const incomeLevel = this.getIncomeLevel(session.experienceScore); // Nota: conopoints se almacena en experienceScore?
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.INCOME[incomeLevel]);

    // Ajuste por riesgo declarado (totalScore/points 0-25)
    const riskLevel = this.getRiskLevel(session.totalScore);
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.RISK[riskLevel]);

    // Ajuste por fondo de emergencia
    const emergencyLevel = session.emergencyFund <= 1 ? 'LOW' : 'HIGH';
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.EMERGENCY_FUND[emergencyLevel]);

    // Ajuste por horizonte temporal
    const timeLevel = this.getTimeHorizonLevel(session.timeValue);
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.TIME_HORIZON[timeLevel]);

    // Ajuste por dividendos
    const dividendPreference = session.dividend === 1 ? 'YES' : 'NO';
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.DIVIDEND[dividendPreference]);

    // Ajuste por jubilación
    const pensionPreference = session.pensionFund === 1 ? 'YES' : 'NO';
    this.applyAdjustments(portfolio, CONFIG.OBJECTIVE_ADJUSTMENTS.PENSION[pensionPreference]);
  }

  /**
   * Maneja las preferencias de criptomonedas
   * Si criptoExposure > 0: mínimo 5%, reduce acciones y bonos
   * Si criptoExposure <= 0: mantiene cripto en 0%
   */
  applyCryptoPreferences(portfolio, cryptoExposure) {
    if (cryptoExposure > 0) {
      // Activar slot de cripto con mínimo 5%
      const cryptoAllocation = Math.max(portfolio.criptomonedas, CONFIG.CRYPTO_CONFIG.MIN_ALLOCATION);
      
      // Calcular cuánto necesitamos añadir
      const cryptoToAdd = cryptoAllocation - portfolio.criptomonedas;
      
      if (cryptoToAdd > 0) {
        // Restar 50% de acciones, 50% de bonos
        const fromStocks = cryptoToAdd * CONFIG.CRYPTO_CONFIG.REBALANCE_FROM_STOCKS;
        const fromBonds = cryptoToAdd * CONFIG.CRYPTO_CONFIG.REBALANCE_FROM_BONDS;
        
        portfolio.acciones -= fromStocks;
        portfolio.bonos -= fromBonds;
        portfolio.criptomonedas = cryptoAllocation;
      }
    }
    // Si cryptoExposure <= 0, mantener cripto en 0% (base ya es 0)
  }

  /**
   * Aplica asignación de oro basada en puntos acumulados
   * Oro viene principalmente de efectivo y bonos
   */
  applyGoldAllocation(portfolio, goldPoints) {
    const goldAllocation = CONFIG.GOLD_CONFIG.ALLOCATION_MAP[Math.min(goldPoints, 3)] || 0;
    
    if (goldAllocation > 0) {
      // Calcular cuánto oro añadir
      const goldToAdd = goldAllocation - portfolio.oro;
      
      if (goldToAdd > 0) {
        // Restar 50% de efectivo, 50% de bonos
        const fromCash = goldToAdd * CONFIG.GOLD_CONFIG.REBALANCE_FROM_CASH;
        const fromBonds = goldToAdd * CONFIG.GOLD_CONFIG.REBALANCE_FROM_BONDS;
        
        portfolio.efectivo -= fromCash;
        portfolio.bonos -= fromBonds;
        portfolio.oro = goldAllocation;
      }
    }
  }

  /**
   * Aplica límites globales para evitar valores extremos
   * Cap deltas acumulados ±30% desde base por activo
   */
  applyGlobalLimits(portfolio) {
    Object.keys(portfolio).forEach(asset => {
      const baseValue = CONFIG.BASE_PORTFOLIO[asset] || 0;
      const maxValue = baseValue + CONFIG.GLOBAL_LIMITS.MAX_DELTA_PER_ASSET;
      const minValue = Math.max(0, baseValue - CONFIG.GLOBAL_LIMITS.MAX_DELTA_PER_ASSET);
      
      portfolio[asset] = Math.min(Math.max(portfolio[asset], minValue), maxValue);
    });
  }

  /**
   * Normaliza la cartera para que sume 100%
   * Set valores <0 a 0, luego prorratea
   */
  normalizePortfolio(portfolio) {
    // 1. Asegurar que no hay valores negativos
    Object.keys(portfolio).forEach(asset => {
      portfolio[asset] = Math.max(0, portfolio[asset] || 0);
    });

    // 2. Calcular total actual
    const total = Object.values(portfolio).reduce((sum, value) => sum + value, 0);
    
    // 3. Normalizar al 100% si es necesario
    if (total !== 100 && total > 0) {
      Object.keys(portfolio).forEach(asset => {
        portfolio[asset] = (portfolio[asset] / total) * 100;
      });
    }
  }

  /**
   * Aplica un conjunto de ajustes a la cartera
   */
  applyAdjustments(portfolio, adjustments) {
    if (!adjustments) return;
    
    Object.entries(adjustments).forEach(([asset, change]) => {
      if (portfolio.hasOwnProperty(asset)) {
        portfolio[asset] = (portfolio[asset] || 0) + change;
      }
    });
  }

  /**
   * Clamp valores negativos a 0 después de cada categoría
   */
  clampNegativeValues(portfolio) {
    Object.keys(portfolio).forEach(asset => {
      portfolio[asset] = Math.max(0, portfolio[asset] || 0);
    });
  }

  // Métodos auxiliares para determinar niveles (expuestos para el controlador)

  getExperienceLevel(experienceScore) {
    for (const [level, config] of Object.entries(CONFIG.EXPERIENCE_LEVELS)) {
      if (experienceScore >= config.min && experienceScore <= config.max) {
        return level;
      }
    }
    return 'INTERMEDIATE';
  }

  getAgeLevel(age) {
    for (const [level, config] of Object.entries(CONFIG.AGE_LEVELS)) {
      if (age >= config.min && age <= config.max) {
        return level;
      }
    }
    return 'MIDDLE';
  }

  getIncomeLevel(conoPoints) {
    for (const [level, config] of Object.entries(CONFIG.INCOME_LEVELS)) {
      if (conoPoints >= config.min && conoPoints <= config.max) {
        return level;
      }
    }
    return 'MEDIUM';
  }

  getRiskLevel(totalScore) {
    for (const [level, config] of Object.entries(CONFIG.RISK_PROFILES)) {
      if (totalScore >= config.min && totalScore <= config.max) {
        return level;
      }
    }
    return 'MODERATE';
  }

  getRiskProfile(totalScore) {
    const level = this.getRiskLevel(totalScore);
    return CONFIG.RISK_PROFILES[level].name;
  }

  getEmergencyFundLevel(emergencyValue) {
  if (emergencyValue === 0) return 'NONE';      // Sin fondo de emergencia
  if (emergencyValue === 1) return 'LOW';       // Empezando a construirlo
  if (emergencyValue === 2) return 'MEDIUM';    // Parcialmente construido
  return 'HIGH';                                 // Fondo completo (3 o más)
}


  getTimeHorizonLevel(timeValue) {
    if (timeValue <= 1) return 'SHORT';      // 3 años o menos
    if (timeValue <= 2) return 'MEDIUM';     // 3-5 años  
    if (timeValue <= 3) return 'LONG';       // 5-10 años
    return 'VERY_LONG';                           // Más de 10 años
  }
  /**
   * Genera el reporte del fondo de emergencia
   */
  async generateReport(session) {
    const portfolio = await this.calculatePortfolio(session);
    let informe = `<p>El fondo de emergencia es muy importante como colchón ante imprevistos y permite al inversor invertir con mucha comodidad el resto de su dinero liquido. El fondo de emergencia no es parte de la liquidez disponible dentro de la cartera.</p>`;
    
    // Obtener el mensaje del fondo de emergencia según perfil de riesgo
    const emergencyMessage = CONFIG.EMERGENCY_FUND_MESSAGES[session.emergencyFund]?.[portfolio.riskProfile];
    if (emergencyMessage) {
      informe += `<p>${emergencyMessage}</p>`;
    }
    
    return informe;
  }

  /**
   * Genera las estrategias de inversión recomendadas
   */
  async generateInvestmentStrategies(session) {
    const portfolio = await this.calculatePortfolio(session);
    const experienceLevel = this.getExperienceLevel(session.experienceScore);

    // Obtener estrategias del config
    const strategiesString = CONFIG.STRATEGY_MESSAGES[portfolio.riskProfile]?.[experienceLevel] || '';
    const strategyNames = strategiesString.split(', ').filter(name => name.trim() !== '');
    
    
    const recommendedStrategies = [];
    
    // Mapear nombres de estrategias a objetos completos
    strategyNames.forEach(strategyName => {
      const strategyKey = strategyName.replace(' ', '_').toUpperCase();
      if (STRATEGIES_EDUCATION[strategyKey]) {
        const strategy = STRATEGIES_EDUCATION[strategyKey];
        const suitabilityText = strategy.suitability[portfolio.riskProfile]?.[experienceLevel];
        
        recommendedStrategies.push({
          ...strategy,
          personalizedReason: suitabilityText || strategy.description,
          priority: recommendedStrategies.length === 0 ? 'high' : 'medium' // Primera estrategia como prioritaria
        });
      }
    });
    
    return {
      title: "Estrategias de Inversión",
      description: "Estrategias específicamente creadas para perfiles similares de riesgo y nivel de experiencia",
      userProfile: {
        riskProfile: portfolio.riskProfile,
        experienceLevel: CONFIG.EXPERIENCE_LEVELS[experienceLevel]?.name || experienceLevel
      },
      strategies: recommendedStrategies
    };
  }
  // Bloque de renta fija
  async generateRentaFijaAdvice(session) {
  const portfolio = await this.calculatePortfolio(session);
  const experienceLevel = this.getExperienceLevel(session.experienceScore);
  const experienceLevelName = CONFIG.EXPERIENCE_LEVELS[experienceLevel]?.name || experienceLevel;
  
  // Solo mostrar si hay asignación a bonos 
  if (portfolio.allocation.bonos <= 0) {
    return null;
  }

  // Obtener contenido principal
  const mainContent = RENTA_FIJA_CONFIG.MAIN_CONTENT[experienceLevelName]?.[session.dividend];
  
  if (!mainContent) {
    return null;
  }
  
  // Construir bloques adicionales basados en características específicas
  const additionalBlocks = [];
  
  // Bloque de horizonte temporal
  let horizonteBlock = null;
  if (session.timeValue === 1) {
    // Horizonte corto (3 años o menos)
    horizonteBlock = RENTA_FIJA_CONFIG.ADDITIONAL_BLOCKS.HORIZONTE_CORTO[experienceLevelName];
    if (horizonteBlock) {
      additionalBlocks.push({
        type: 'HORIZONTE_CORTO',
        title: 'Estrategia de Corto Plazo',
        content: horizonteBlock
      });
    }
  } else if (session.timeValue === 2) {
    // Horizonte medio (3-5 años)
    horizonteBlock = RENTA_FIJA_CONFIG.ADDITIONAL_BLOCKS.HORIZONTE_MEDIO[experienceLevelName];
    if (horizonteBlock) {
      additionalBlocks.push({
        type: 'HORIZONTE_MEDIO',
        title: 'Estrategia de Medio Plazo',
        content: horizonteBlock
      });
    }
  } else if (session.timeValue >= 3) {
    // Horizonte largo (5+ años)
    horizonteBlock = RENTA_FIJA_CONFIG.ADDITIONAL_BLOCKS.HORIZONTE_LARGO[experienceLevelName];
    if (horizonteBlock) {
      additionalBlocks.push({
        type: 'HORIZONTE_LARGO',
        title: 'Estrategia de Largo Plazo',
        content: horizonteBlock
      });
    }
  }
  
  // Bloque conservador (si tiene perfil de bajo riesgo)
  if (portfolio.riskProfile === 'Bajo Riesgo') {
    const conservativeBlock = RENTA_FIJA_CONFIG.ADDITIONAL_BLOCKS.MUY_CONSERVADOR[experienceLevelName];
    if (conservativeBlock) {
      additionalBlocks.push({
        type: 'MUY_CONSERVADOR',
        title: 'Enfoque Conservador',
        content: conservativeBlock
      });
    }
  }
  
  // Bloque ESG (si tiene preferencias ESG)
  if (session.esgValue > 0) {
    const esgBlock = RENTA_FIJA_CONFIG.ADDITIONAL_BLOCKS.ESG[experienceLevelName];
    if (esgBlock) {
      additionalBlocks.push({
        type: 'ESG',
        title: 'Bonos Sostenibles',
        content: esgBlock
      });
    }
  }
  return {
    title: "Renta Fija - Guía",
    description: `Estrategia de bonos según perfiles similares a ${experienceLevelName.toLowerCase()} y a tu objetivos`,
    userProfile: {
      experienceLevel: experienceLevelName,
      seeksDividends: session.dividend === 1,
      riskProfile: portfolio.riskProfile,
      timeHorizon: session.timeValue,
      bondsAllocation: Math.round(portfolio.allocation.bonos),
      greenBondsAllocation: Math.round(portfolio.allocation.bonosVerdes || 0),
      totalFixedIncomeAllocation: Math.round(portfolio.allocation.bonos + (portfolio.allocation.bonosVerdes || 0))
    },
    mainContent,
    additionalBlocks
  };
}
  /**
    Genera consejos de renta variable personalizados
   */
async generateRentaVariableAdvice(session) {
    const portfolio = await this.calculatePortfolio(session);
    const experienceLevel = this.getExperienceLevel(session.experienceScore);
    const experienceLevelName = CONFIG.EXPERIENCE_LEVELS[experienceLevel]?.name || experienceLevel;
    
    // Solo mostrar si hay asignación a acciones
    if (portfolio.allocation.acciones <= 0) {
      return null;
    }
    
    // Obtener contenido principal
    const mainContent = RENTA_VARIABLE_CONFIG.MAIN_CONTENT[experienceLevelName]?.[session.dividend];
    
    if (!mainContent) {
      return null;
    }
    
    // Construir bloques adicionales
    const additionalBlocks = [];
    
    // Bloque de tecnología (si tiene interés en crypto/tech)
    if (session.cryptoScore > 0) {
      const techBlock = RENTA_VARIABLE_CONFIG.ADDITIONAL_BLOCKS.TECNOLOGIA[experienceLevelName];
      if (techBlock) {
        additionalBlocks.push({
          type: 'TECNOLOGIA',
          title: 'Enfoque Tecnológico',
          content: techBlock
        });
      }
    }
    
    // Bloque ESG (si tiene preferencias ESG)
    if (session.esgValue > 0) {
      const esgBlock = RENTA_VARIABLE_CONFIG.ADDITIONAL_BLOCKS.ESG[experienceLevelName];
      if (esgBlock) {
        additionalBlocks.push({
          type: 'ESG',
          title: 'Inversión Sostenible',
          content: esgBlock
        });
      }
    }
    
    // Bloque conservador (si tiene perfil de bajo riesgo)
    if (portfolio.riskProfile === 'Bajo Riesgo') {
      const conservativeBlock = RENTA_VARIABLE_CONFIG.ADDITIONAL_BLOCKS.MUY_CONSERVADOR[experienceLevelName];
      if (conservativeBlock) {
        additionalBlocks.push({
          type: 'MUY_CONSERVADOR',
          title: 'Enfoque Conservador',
          content: conservativeBlock
        });
      }
    }
    
    // Bloque largo plazo (si tiene horizonte > 10 años)
    if (session.timeValue === 4) {
      const longTermBlock = RENTA_VARIABLE_CONFIG.ADDITIONAL_BLOCKS.LARGO_PLAZO[experienceLevelName];
      if (longTermBlock) {
        additionalBlocks.push({
          type: 'LARGO_PLAZO',
          title: 'Visión a Largo Plazo',
          content: longTermBlock
        });
      }
    }
    
    return {
      title: "Renta Variable - Guía Personalizada",
      description: `Guía para invertir en acciones según perfiles similares ${experienceLevelName.toLowerCase()}`,
      userProfile: {
        experienceLevel: experienceLevelName,
        seeksDividends: session.dividend === 1,
        riskProfile: portfolio.riskProfile,
        equityAllocation: Math.round(portfolio.allocation.acciones)
      },
      mainContent,
      additionalBlocks
    };
  }

  /**
   * Genera educación sobre los activos en la cartera
   */
  async generateAssetEducation(session) {
    const portfolio = await this.calculatePortfolio(session);
    const activeAssets = [];
    
      activeAssets.push(ASSET_EDUCATION.RENTA_VARIABLE);
    
    if (portfolio.allocation.bonos > 0) {
      activeAssets.push(ASSET_EDUCATION.RENTA_FIJA);
    }
    
    if (portfolio.allocation.criptomonedas > 0) {
      activeAssets.push(ASSET_EDUCATION.CRIPTOMONEDAS);
    }
    
    if (portfolio.allocation.efectivo > 0) {
      activeAssets.push(ASSET_EDUCATION.EFECTIVO);
    }

    if (portfolio.allocation.oro > 0) {
      activeAssets.push(ASSET_EDUCATION.ORO);
    }
    
    return {
      title: "Guía Educativa de tu Cartera",
      description: "Conoce los activos que componen la cartera asignada a los perfiles similares al tuyo",
      assets: activeAssets,
      riskProfile: portfolio.riskProfile
    };
  }

  /**
   * Genera la guía educativa de activos
   */
  async generateEducationalGuide(session) {
    return await this.generateAssetEducation(session);
  }

  /**
   * Genera el objeto investorProfile basado en la sesión
   */
  generateInvestorProfile(session) {
    const riskProfile = this.getRiskLevel(session.totalScore);
    const experienceLevel = this.getExperienceLevel(session.experienceScore);

    // Mapeo para investorType y riskTolerance desde RISK_PROFILES
    const investorType = CONFIG.RISK_PROFILES[riskProfile]?.name || 'No definido';
    const riskTolerance = CONFIG.RECOMMENDATIONS.RISK_PROFILE[riskProfile]
      ? CONFIG.RISK_PROFILES[riskProfile].name // Usa el nombre directamente
      : 'No definido';

    // Mapeo para timeHorizon desde RECOMMENDATIONS.TIME_HORIZON
    const timeHorizon = CONFIG.RECOMMENDATIONS.TIME_HORIZON[session.timeValue]
      ? CONFIG.RECOMMENDATIONS.TIME_HORIZON[session.timeValue].split('.')[0] // Extrae solo la primera parte
      : 'No definido';

    // Mapeo para esgSensitivity desde ESG_LEVEL
    const esgSensitivity = session.esgValue > 0
      ? CONFIG.ESG_LEVEL[experienceLevel]?.[session.esgValue] || 'No definido'
      : 'Nula';

    // Objetivo principal: Inferido de session (pensionFund, dividend, etc.)
    let mainObjective = 'No especificado';
    if (session.pensionFund > 0) {
      mainObjective = 'Jubilación';
    } else if (session.dividend > 0) {
      mainObjective = 'Generar ingresos';
    } else if (session.wealthGrowth > 0) {
      mainObjective = 'Aumentar patrimonio';
    } else if (session.buyHouse > 0) {
      mainObjective = 'Comprar casa';
    } else if (session.childrenEducation > 0) {
      mainObjective = 'Educación hijos';
    }

    return {
      profile: {
        investorType,
        mainObjective,
        experienceLevel: CONFIG.EXPERIENCE_LEVELS[experienceLevel]?.name || experienceLevel,
        riskTolerance,
        timeHorizon,
        ...(session.esgValue > 0 && { esgSensitivity })
      }
    };
  }

  /**
 * Genera la explicación de cómo se construyó la cartera
 */
async generatePortfolioExplanation(session) {
  const CONFIG_EXPLANATION = require('../config/portfolioExplanationConfig');
  const portfolio = await this.calculatePortfolio(session);
  const personalityTest = await PersonalityService.getPersonalityTest(session.id);
  
  const experienceLevel = this.getExperienceLevel(session.experienceScore);
  const ageLevel = this.getAgeLevel(session.age);
  const incomeLevel = this.getIncomeLevel(session.experienceScore);
  const riskLevel = this.getRiskLevel(session.totalScore);
  const timeLevel = this.getTimeHorizonLevel(session.timeValue);
  const emergencyLevel = this.getEmergencyFundLevel(session.emergencyFund);
  
  const explanations = [];
  
  // 1. Explicación del perfil de riesgo (siempre)
  const riskExplanation = CONFIG_EXPLANATION.RISK_PROFILE_EXPLANATION[portfolio.riskProfile];
  if (riskExplanation) {
    explanations.push({
      category: 'riskProfile',
      ...riskExplanation,
      currentLevel: portfolio.riskProfile
    });
  }
  
  // 2. Explicación de experiencia (siempre)
  const experienceLevelName = CONFIG.EXPERIENCE_LEVELS[experienceLevel]?.name || experienceLevel;
  const expExplanation = CONFIG_EXPLANATION.EXPERIENCE_LEVEL_EXPLANATION[experienceLevelName];
  if (expExplanation) {
    explanations.push({
      category: 'experience',
      ...expExplanation,
      currentLevel: experienceLevelName
    });
  }
  
  // 3. Explicación de edad (siempre)
  const ageLevelName = CONFIG.AGE_LEVELS[ageLevel]?.name || ageLevel;
  const ageExplanation = CONFIG_EXPLANATION.AGE_EXPLANATION[ageLevelName];
  if (ageExplanation) {
    explanations.push({
      category: 'age',
      ...ageExplanation,
      currentLevel: ageLevelName
    });
  }
  
  // 4. Explicación de ingresos (siempre)
  const incomeLevelName = CONFIG.INCOME_LEVELS[incomeLevel]?.name || incomeLevel;
  const incomeExplanation = CONFIG_EXPLANATION.INCOME_EXPLANATION[incomeLevelName];
  if (incomeExplanation) {
    explanations.push({
      category: 'income',
      ...incomeExplanation,
      currentLevel: incomeLevelName
    });
  }
  
  // 5. Explicación de fondo de emergencia (siempre)
  const emergencyExplanation = CONFIG_EXPLANATION.EMERGENCY_FUND_EXPLANATION[emergencyLevel];
  if (emergencyExplanation) {
    explanations.push({
      category: 'emergencyFund',
      ...emergencyExplanation,
      currentLevel: emergencyLevel === 'LOW' ? 'Insuficiente' : 'Sólido'
    });
  }
  
  // 6. Explicación de horizonte temporal (siempre)
  const timeExplanation = CONFIG_EXPLANATION.TIME_HORIZON_EXPLANATION[timeLevel];
  if (timeExplanation) {
    explanations.push({
      category: 'timeHorizon',
      ...timeExplanation,
      currentLevel: timeLevel
    });
  }
  
  // 7. Explicación de dividendos (siempre)
  const dividendKey = session.dividend === 1 ? 'YES' : 'NO';
  const dividendExplanation = CONFIG_EXPLANATION.DIVIDEND_EXPLANATION[dividendKey];
  if (dividendExplanation) {
    explanations.push({
      category: 'dividend',
      ...dividendExplanation,
      currentLevel: dividendKey === 'YES' ? 'Generación de ingresos' : 'Crecimiento de capital'
    });
  }
  
  // 8. Explicación de pensión (siempre)
  const pensionKey = session.pensionFund === 1 ? 'YES' : 'NO';
  const pensionExplanation = CONFIG_EXPLANATION.PENSION_EXPLANATION[pensionKey];
  if (pensionExplanation) {
    explanations.push({
      category: 'pension',
      ...pensionExplanation,
      currentLevel: pensionKey === 'YES' ? 'Ahorro para jubilación' : 'Otros objetivos'
    });
  }
  
  // 9. Explicación de criptomonedas (solo si tiene o no tiene)
  const hasCrypto = portfolio.allocation.criptomonedas > 0;
  const cryptoKey = hasCrypto ? 'HAS_CRYPTO' : 'NO_CRYPTO';
  const cryptoExplanation = CONFIG_EXPLANATION.CRYPTO_EXPLANATION[cryptoKey];
  if (cryptoExplanation) {
    explanations.push({
      category: 'crypto',
      ...cryptoExplanation,
      currentLevel: hasCrypto ? `${Math.round(portfolio.allocation.criptomonedas)}%` : 'Sin exposición',
      hasCrypto
    });
  }
  
  // 10. Explicación de oro (solo si tiene o no tiene)
  const hasGold = portfolio.allocation.oro > 0;
  const goldKey = hasGold ? 'HAS_GOLD' : 'NO_GOLD';
  const goldExplanation = CONFIG_EXPLANATION.GOLD_EXPLANATION[goldKey];
  if (goldExplanation) {
    explanations.push({
      category: 'gold',
      ...goldExplanation,
      currentLevel: hasGold ? `${Math.round(portfolio.allocation.oro)}%` : 'Sin exposición',
      hasGold
    });
  }
  
  // 11. Explicaciones de personalidad (solo las dimensiones dominantes ≥51%)
  if (personalityTest?.completed && personalityTest.profile?.dimensions) {
    const dimensions = personalityTest.profile.dimensions;
    
    for (let dimNumber = 1; dimNumber <= 4; dimNumber++) {
      const dimension = dimensions[dimNumber];
      if (!dimension) continue;
      
      const positivePercentage = dimension.percentages.positive;
      const negativePercentage = dimension.percentages.negative;
      
      let personalityKey = null;
      let percentage = 0;
      
      if (positivePercentage >= 51) {
        personalityKey = this.getAdjustmentKey(dimNumber, true);
        percentage = positivePercentage;
      } else if (negativePercentage >= 51) {
        personalityKey = this.getAdjustmentKey(dimNumber, false);
        percentage = negativePercentage;
      }
      
      if (personalityKey) {
        const personalityExplanation = CONFIG_EXPLANATION.PERSONALITY_EXPLANATION[personalityKey];
        if (personalityExplanation) {
          explanations.push({
            category: 'personality',
            dimension: dimNumber,
            trait: personalityKey,
            percentage,
            ...personalityExplanation
          });
        }
      }
    }
  }
  
  return {
    title: CONFIG_EXPLANATION.SECTION_TITLE,
    description: CONFIG_EXPLANATION.SECTION_DESCRIPTION,
    intro: CONFIG_EXPLANATION.INTRO_TEXT,
    explanations,
    generalAdjustments: CONFIG_EXPLANATION.GENERAL_ADJUSTMENTS,
    closingMessage: CONFIG_EXPLANATION.CLOSING_MESSAGE,
    currentAllocation: portfolio.allocation,
    riskProfile: portfolio.riskProfile
  };
}


  /**
   * Genera recomendaciones personalizadas basadas en respuestas específicas
   */
  
  async generateRecommendations(session) {
    const portfolio = await this.calculatePortfolio(session);
    const experienceLevel = this.getExperienceLevel(session.experienceScore);
    const explicaciones = [];

    // Mensaje del fondo de emergencia (siempre, es muy importante)
    const emergencyMessage = CONFIG.EMERGENCY_FUND_MESSAGES[session.emergencyFund]?.[portfolio.riskProfile];
    if (emergencyMessage) {
      explicaciones.push(emergencyMessage);
    }

    // Mensaje de la renta variable según nivel de experiencia y dividendos
    const equityMessage = CONFIG.EQUITY_MARKET_MESSAGES[experienceLevel]?.[session.dividend];
    if (equityMessage && equityMessage.trim() !== "") {
      explicaciones.push(equityMessage);
    }

    // Mensaje de bonos según tiempo de inversión y perfil de riesgo
    const bondMessage = CONFIG.BOND_MARKET_MESSAGES[portfolio.riskProfile]?.[session.timeValue];
    if (bondMessage && bondMessage.trim() !== "") {
      explicaciones.push(bondMessage);
    }

    // Explicación de ESG (solo si tiene preferencia)
    if (session.esgValue > 0) {
      const esgExplanation = CONFIG.ESG_LEVEL[experienceLevel]?.[session.esgValue];
      if (esgExplanation && esgExplanation.trim() !== "") {
        explicaciones.push(esgExplanation);
      }
    }

    // Mensaje de largo plazo (solo si existe texto)
    const longTermMessage = CONFIG.LONG_TERM_MESSAGE[experienceLevel]?.[session.timeValue];
    if (longTermMessage && longTermMessage.trim() !== "") {
      explicaciones.push(longTermMessage);
    }

    // Mensaje de tecnología (solo si existe texto)
    const techMessage = CONFIG.TECHNOLOGY_MESSAGE[experienceLevel]?.[session.cryptoScore];
    if (techMessage && techMessage.trim() !== "") {
      explicaciones.push(techMessage);
    }

    // Explicación de criptomonedas (solo si tiene exposición)
    if (session.cryptoScore > 0) {
      const cryptoExplanation = CONFIG.CRYPTO_LEVEL[experienceLevel]?.[session.cryptoScore];
      if (cryptoExplanation && cryptoExplanation.trim() !== "") {
        explicaciones.push(cryptoExplanation);
      }
    }

    // Explicación del perfil de riesgo (siempre)
    const riskExplanation = CONFIG.RECOMMENDATIONS.RISK_PROFILE[portfolio.riskProfile];
    if (riskExplanation) {
      explicaciones.push(riskExplanation);
    }
    
    // Explicación del horizonte temporal
    const timeExplanation = CONFIG.RECOMMENDATIONS.TIME_HORIZON[session.timeValue];
    if (timeExplanation) {
      explicaciones.push(timeExplanation);
    }
    
    // Mensaje general (siempre al final)
    explicaciones.push('La asignación de activos busca equilibrar rentabilidad y seguridad según perfiles similares al tuyo.');
    
    return {
      perfilRiesgo: portfolio.riskProfile,
      experienceLevel,
      cartera: portfolio.allocation,
      explicaciones,
    };
  }

  /**
   * Genera el resultado final completo
   */
  async completeFinalResult(session) {
  const portfolio = await this.calculatePortfolio(session);
   const investorProfile = await this.generateInvestorProfile(
    session,
  );
  const report = await this.generateReport(session);
  const rentaFijaAdvice = await this.generateRentaFijaAdvice(session);
  const rentaVariableAdvice = await this.generateRentaVariableAdvice(session);
  const investmentStrategiesData = await this.generateInvestmentStrategies(session);
  const educationalGuide = await this.generateEducationalGuide(session);
  const portfolioExplanation = await this.generatePortfolioExplanation(session);

  return {
    sessionId: session.id,
    riskProfile: portfolio.riskProfile,
    experienceLevel: this.getExperienceLevel(session.experienceScore),
    portfolio: portfolio.allocation,               // Plano
    report,                                         // Objeto directo
    rentaFijaAdvice,                                // Objeto directo
    rentaVariableAdvice,                            // Objeto directo
    investmentStrategies: investmentStrategiesData, // Objeto completo con metadata
    educationalGuide,                               // Objeto directo
    investorProfile: investorProfile.profile,       // Solo objeto principal
    portfolioExplanation
  };
}
   // ===== 🆕 MÉTODOS PARA EXPORTAR Y COMPARTIR =====

  /**
   * Generar link para compartir portfolio (válido 7 días)
   */
  async createShareLink(portfolioId, userId) {
    try {
      const prisma = require('@prisma/client').PrismaClient;
      const db = new prisma();

      // Verificar que el portfolio pertenece al usuario
      const portfolio = await db.portfolio.findUnique({
        where: { id: portfolioId }
      });

      if (!portfolio || portfolio.userId !== userId) {
        throw new Error('Portfolio no encontrado o no tienes permiso');
      }

      // Eliminar links expirados
      await db.sharedPortfolio.deleteMany({
        where: {
          expiresAt: { lt: new Date() }
        }
      });

      // Crear nuevo link (válido 7 días)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const shareLink = await db.sharedPortfolio.create({
        data: {
          portfolioId,
          createdBy: userId,
          expiresAt
        }
      });

      return {
        success: true,
        token: shareLink.token,
        shareUrl: `${process.env.FRONTEND_URL}/shared-portfolio/${shareLink.token}`,
        expiresAt: shareLink.expiresAt
      };
    } catch (error) {
      console.error('Error creating share link:', error);
      throw error;
    }
  }

  /**
   * Obtener portfolio compartido por token
   */
  async getSharedPortfolio(token) {
    try {
      const prisma = require('@prisma/client').PrismaClient;
      const db = new prisma();

      const shared = await db.sharedPortfolio.findUnique({
        where: { token },
        include: {
          portfolio: {
            include: {
              holdings: {
                include: {
                  asset: true,
                  financialProduct: true
                }
              }
            }
          },
          owner: {
            select: { name: true, email: true }
          }
        }
      });

      if (!shared) {
        throw new Error('Link no encontrado o expirado');
      }

      // Verificar si expiró
      if (new Date() > shared.expiresAt) {
        await db.sharedPortfolio.delete({ where: { token } });
        throw new Error('Este link ha expirado');
      }

      // Incrementar view count
      await db.sharedPortfolio.update({
        where: { token },
        data: {
          viewCount: { increment: 1 },
          lastViewedAt: new Date()
        }
      });

      return {
        success: true,
        portfolio: shared.portfolio,
        sharedBy: shared.owner,
        viewCount: shared.viewCount + 1
      };
    } catch (error) {
      console.error('Error getting shared portfolio:', error);
      throw error;
    }
  }

  /**
   * Listar mis links compartidos activos
   */
  async getMyShareLinks(userId) {
    try {
      const prisma = require('@prisma/client').PrismaClient;
      const db = new prisma();

      const links = await db.sharedPortfolio.findMany({
        where: {
          createdBy: userId,
          expiresAt: { gt: new Date() }
        },
        include: {
          portfolio: {
            select: { name: true, currentValue: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return {
        success: true,
        links: links.map(link => ({
          token: link.token,
          portfolioName: link.portfolio.name,
          shareUrl: `${process.env.FRONTEND_URL}/shared-portfolio/${link.token}`,
          expiresAt: link.expiresAt,
          viewCount: link.viewCount,
          createdAt: link.createdAt
        }))
      };
    } catch (error) {
      console.error('Error getting my share links:', error);
      throw error;
    }
  }

  /**
   * Eliminar link compartido
   */
  async deleteShareLink(token, userId) {
    try {
      const prisma = require('@prisma/client').PrismaClient;
      const db = new prisma();

      const shared = await db.sharedPortfolio.findUnique({
        where: { token }
      });

      if (!shared || shared.createdBy !== userId) {
        throw new Error('No tienes permiso para eliminar este link');
      }

      await db.sharedPortfolio.delete({
        where: { token }
      });

      return { success: true, message: 'Link eliminado' };
    } catch (error) {
      console.error('Error deleting share link:', error);
      throw error;
    }
  }
}

module.exports = new PortfolioService();
