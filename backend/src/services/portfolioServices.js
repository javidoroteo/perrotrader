// backend/src/services/portfolioServices.js

const CONFIG = require('../config/portfolioConfig');
const { ASSET_EDUCATION } = require('../config/assetEducation');

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

    // Mensaje de estrategia de inversión según nivel y riesgo
    const strategyExplanation = CONFIG.STRATEGY_MESSAGES[portfolio.riskProfile]?.[experienceLevel];
    if (strategyExplanation && strategyExplanation.trim() !== "") {
      explicaciones.push(strategyExplanation);
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
      educationalGuide: this.generateEducationalGuide(session),
      investorProfile: this.generateInvestorProfile(session)
    };
  }
}

module.exports = new PortfolioService();