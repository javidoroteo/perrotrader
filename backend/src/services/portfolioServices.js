// backend/src/services/portfolioServices.js

const CONFIG = require('../config/portfolioConfig');
const { ASSET_EDUCATION } = require('../config/assetEducation');
const { STRATEGIES_EDUCATION } = require('../config/strategiesEducation');
const { RENTA_VARIABLE_CONFIG } = require('../config/rentaVariableConfig');
const { RENTA_FIJA_CONFIG } = require('../config/rentaFijaConfig');

class PortfolioService {
  
  /**
   * Calcula la cartera recomendada basada en la sesión del usuario
   */
  calculatePortfolio(session) {
    // Crear copia de la cartera base
    const portfolio = { ...CONFIG.BASE_PORTFOLIO };
    
    // Aplicar ajustes en orden
    this.applyTimeAdjustments(portfolio, session.timeValue);
    const riskProfile = this.applyRiskAdjustments(portfolio, session.totalScore);
    this.applyCryptoAdjustments(portfolio, session.cryptoScore);
    this.applyESGAdjustments(portfolio, session.esgValue);
    
    // Normalizar y asegurar valores positivos
    this.ensurePositiveValues(portfolio);
    this.normalizePortfolio(portfolio);
    
    return {
      riskProfile,
      allocation: portfolio
    };
  }

  /**
   * Ajustes por horizonte temporal
   */
  applyTimeAdjustments(portfolio, timeValue) {
    const adjustments = CONFIG.TIME_ADJUSTMENTS[timeValue];
    if (adjustments) {
      Object.entries(adjustments).forEach(([asset, change]) => {
        portfolio[asset] = (portfolio[asset] || 0) + change;
      });
    }
  }

  /**
   * Ajustes por perfil de riesgo
   */
  applyRiskAdjustments(portfolio, totalScore) {
    const riskLevel = this.getRiskLevel(totalScore);
    const adjustments = CONFIG.RISK_ADJUSTMENTS[riskLevel];
    
    if (adjustments) {
      Object.entries(adjustments).forEach(([asset, change]) => {
        portfolio[asset] = (portfolio[asset] || 0) + change;
      });
    }
    
    return CONFIG.RISK_PROFILES[riskLevel].name;
  }

  /**
   * Ajustes por exposición a criptomonedas
   */
  applyCryptoAdjustments(portfolio, cryptoScore) {
    const adjustments = CONFIG.CRYPTO_ADJUSTMENTS[cryptoScore] || CONFIG.CRYPTO_ADJUSTMENTS[0];
    
    Object.entries(adjustments).forEach(([asset, change]) => {
      portfolio[asset] = (portfolio[asset] || 0) + change;
    });
  }

  /**
   * Ajustes por preferencias ESG
   */
  applyESGAdjustments(portfolio, esgValue) {
    if (esgValue > 0) {
      const greenBondsAllocation = Math.min(
        CONFIG.ESG_CONFIG.GREEN_ALLOCATION_PER_LEVEL * esgValue,
        CONFIG.ESG_CONFIG.MAX_GREEN_BONDS
      );
      
      // Redistribuir desde bonos regulares y acciones
      const fromBonds = greenBondsAllocation / 2;
      const fromStocks = greenBondsAllocation / 2;
      
      portfolio.bonos = (portfolio.bonos || 0) - fromBonds;
      portfolio.acciones = (portfolio.acciones || 0) - fromStocks;
      portfolio.bonosVerdes = (portfolio.bonosVerdes || 0) + greenBondsAllocation;
    }
  }

  /**
   * Determina el nivel de riesgo basado en la puntuación total
   */
  getRiskLevel(totalScore) {
    for (const [level, config] of Object.entries(CONFIG.RISK_PROFILES)) {
      if (totalScore >= config.min && totalScore <= config.max) {
        return level;
      }
    }
    return 'MODERATE'; // Por defecto
  }

  /**
   * Determina el nivel de experiencia basado en los puntos de experiencia
   */
  getExperienceLevel(experienceScore) {
    for (const [level, config] of Object.entries(CONFIG.KNOWLEDGE_LEVELS)) {
      if (experienceScore >= config.min && experienceScore <= config.max) {
        return level;
      }
    }
    return 'INTERMEDIATE'; // Por defecto
  }

  /**
   * Asegura que todos los valores sean positivos
   */
  ensurePositiveValues(portfolio) {
    Object.keys(portfolio).forEach(asset => {
      portfolio[asset] = Math.max(0, portfolio[asset] || 0);
    });
  }

  /**
   * Normaliza la cartera para que sume 100%
   */
  normalizePortfolio(portfolio) {
    const total = Object.values(portfolio).reduce((sum, value) => sum + value, 0);
    
    if (total > 100) {
      Object.keys(portfolio).forEach(asset => {
        portfolio[asset] = (portfolio[asset] / total) * 100;
      });
    }
  }

  /**
   * Genera el reporte del fondo de emergencia
   */
  generateReport(session) {
    const portfolio = this.calculatePortfolio(session);
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
  generateInvestmentStrategies(session) {
    const portfolio = this.calculatePortfolio(session);
    const experienceLevel = this.getExperienceLevel(session.experienceScore);

    console.log('Raw portfolio.riskProfile:', portfolio.riskProfile);
    console.log('Raw experienceLevel:', experienceLevel);
    console.log('Available keys in STRATEGY_MESSAGES:', Object.keys(CONFIG.STRATEGY_MESSAGES));
    console.log('Available keys for this risk profile:', Object.keys(CONFIG.STRATEGY_MESSAGES[portfolio.riskProfile] || {}));
    
    // Obtener estrategias del config
    const strategiesString = CONFIG.STRATEGY_MESSAGES[portfolio.riskProfile]?.[experienceLevel] || '';
    const strategyNames = strategiesString.split(', ').filter(name => name.trim() !== '');
    
    console.log('Portfolio riskProfile:', portfolio.riskProfile);
    console.log('Experience level:', experienceLevel);
    console.log('Strategies string:', strategiesString);
    
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
      description: "Estrategias recomendadas específicamente para tu perfil de riesgo y nivel de experiencia",
      userProfile: {
        riskProfile: portfolio.riskProfile,
        experienceLevel: CONFIG.KNOWLEDGE_LEVELS[experienceLevel]?.name || experienceLevel
      },
      strategies: recommendedStrategies
    };
  }
  // Bloque de renta fija
  generateRentaFijaAdvice(session) {
  const portfolio = this.calculatePortfolio(session);
  const experienceLevel = this.getExperienceLevel(session.experienceScore);
  const experienceLevelName = CONFIG.KNOWLEDGE_LEVELS[experienceLevel]?.name || experienceLevel;
  
  // Solo mostrar si hay asignación a bonos (regulares o verdes)
  if (portfolio.allocation.bonos <= 0 && portfolio.allocation.bonosVerdes <= 0) {
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
    title: "Renta Fija - Guía Personalizada",
    description: `Estrategia específica de bonos según tu perfil ${experienceLevelName.toLowerCase()} y objetivos`,
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
  generateRentaVariableAdvice(session) {
    const portfolio = this.calculatePortfolio(session);
    const experienceLevel = this.getExperienceLevel(session.experienceScore);
    const experienceLevelName = CONFIG.KNOWLEDGE_LEVELS[experienceLevel]?.name || experienceLevel;
    
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
      description: `Consejos específicos para invertir en acciones según tu perfil ${experienceLevelName.toLowerCase()}`,
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
  generateAssetEducation(session) {
    const portfolio = this.calculatePortfolio(session);
    const activeAssets = [];
    
    // Determinar qué activos están presentes en la cartera
    if (portfolio.allocation.acciones > 0) {
      activeAssets.push(ASSET_EDUCATION.RENTA_VARIABLE);
    }
    
    if (portfolio.allocation.bonos > 0 || portfolio.allocation.bonosVerdes > 0) {
      activeAssets.push(ASSET_EDUCATION.RENTA_FIJA);
    }
    
    if (portfolio.allocation.criptomonedas > 0) {
      activeAssets.push(ASSET_EDUCATION.CRIPTOMONEDAS);
    }
    
    if (portfolio.allocation.efectivo > 0) {
      activeAssets.push(ASSET_EDUCATION.EFECTIVO);
    }
    
    return {
      title: "Guía Educativa de tu Cartera",
      description: "Conoce los activos que componen tu cartera personalizada",
      assets: activeAssets,
      riskProfile: portfolio.riskProfile
    };
  }

  /**
   * Genera la guía educativa de activos
   */
  generateEducationalGuide(session) {
    return this.generateAssetEducation(session);
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
    }

    // RiskScale: Normalizar totalScore (max 94 según RISK_PROFILES)
    const maxScore = CONFIG.RISK_PROFILES.HIGH.max; // 94
    const riskValue = Math.round((session.totalScore / maxScore) * 100);

    // Colores para riskScale basados en riskProfile
    const riskColorMap = {
      LOW: 'green',
      MODERATE: 'yellow',
      HIGH: 'red'
    };

    return {
      riskScale: {
        value: riskValue,
        color: riskColorMap[riskProfile] || 'gray'
      },
      profile: {
        investorType,
        mainObjective,
        experienceLevel: CONFIG.KNOWLEDGE_LEVELS[experienceLevel]?.name || experienceLevel,
        riskTolerance,
        timeHorizon,
        ...(session.esgValue > 0 && { esgSensitivity })
      }
    };
  }

  /**
   * Genera recomendaciones personalizadas basadas en respuestas específicas
   */
  generateRecommendations(session) {
    const portfolio = this.calculatePortfolio(session);
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
    explicaciones.push('La asignación de activos busca equilibrar rentabilidad y seguridad según tu perfil.');
    
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
    const portfolio = this.calculatePortfolio(session);
    
    return {
      riskProfile: portfolio.riskProfile,
      experienceLevel: this.getExperienceLevel(session.experienceScore),
      portfolio: portfolio.allocation,
      report: this.generateReport(session),
      recommendations: this.generateRecommendations(session),
      rentaFijaAdvice: this.generateRentaFijaAdvice(session),
      rentaVariableAdvice: this.generateRentaVariableAdvice(session),
      investmentStrategies: this.generateInvestmentStrategies(session),
      educationalGuide: this.generateEducationalGuide(session),
      investorProfile: this.generateInvestorProfile(session)
    };
  }
}

module.exports = new PortfolioService();