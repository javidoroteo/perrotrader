// backend/src/services/portfolioServices.js

const CONFIG = require('../config/portfolioConfig');

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
    let informe = `<p>El fondo de emergencia es muy importante como colchón ante imprevistos y permite al inversor invertir con mucha comodidad el resto de su dinero liquido. El fondo de emergencia no es parte de la liquidez disponible dentro de la cartera.</p>`;
    
    if (session.emergencyFund === 0) {
      informe += `<p>${CONFIG.EMERGENCY_FUND_MESSAGES[0]}</p>`;
    }
    if (session.emergencyFund === 1) {
      informe += `<p>${CONFIG.EMERGENCY_FUND_MESSAGES[1]}</p>`;
    }
    if (session.emergencyFund === 2) {
      informe += `<p>${CONFIG.EMERGENCY_FUND_MESSAGES[2]}</p>`;
    }
    if (session.emergencyFund === 3) {
      informe += `<p>${CONFIG.EMERGENCY_FUND_MESSAGES[3]}</p>`;
    }
    
    return informe;
  }


/**
 * Genera recomendaciones personalizadas basadas en respuestas específicas
 */
generateRecommendations(session) {
  const portfolio = this.calculatePortfolio(session);
  const explicaciones = [];
  
  // 1. Explicación del perfil de riesgo (siempre)
  const riskExplanation = CONFIG.RECOMMENDATIONS.RISK_PROFILE[portfolio.riskProfile];
  if (riskExplanation) {
    explicaciones.push(riskExplanation);
  }
  
  // 2. Explicación del horizonte temporal
  const timeExplanation = CONFIG.RECOMMENDATIONS.TIME_HORIZON[session.timeValue];
  if (timeExplanation) {
    explicaciones.push(timeExplanation);
  }
  
  // 3. Explicación de criptomonedas (solo si tiene exposición)
  if (session.cryptoScore > 0) {
    const cryptoExplanation = CONFIG.RECOMMENDATIONS.CRYPTO_LEVEL[session.cryptoScore];
    if (cryptoExplanation) {
      explicaciones.push(cryptoExplanation);
    }
  }
  
  // 4. Explicación de ESG (solo si tiene preferencia)
  if (session.esgValue > 0) {
    const esgExplanation = CONFIG.RECOMMENDATIONS.ESG_LEVEL[session.esgValue] || 
                         CONFIG.RECOMMENDATIONS.ESG_LEVEL[1]; // Por defecto si >2
    if (esgExplanation) {
      explicaciones.push(esgExplanation);
    }
  }
  
  // 5. Advertencia sobre fondo de emergencia (solo si no tiene)
  if (session.emergencyFund === 0) {
    explicaciones.push('IMPORTANTE: Te recomendamos encarecidamente crear un fondo de emergencia antes de invertir en activos de alto riesgo.');
  }
  
  // 6. Mensaje general (siempre al final)
  explicaciones.push('La asignación de activos busca equilibrar rentabilidad y seguridad según tu perfil.');
  
  return {
    perfilRiesgo: portfolio.riskProfile,
    cartera: portfolio.allocation,
    explicaciones
  };
}


  /**
   * Genera el resultado final completo
   */
  async completeFinalResult(session) {
    const portfolio = this.calculatePortfolio(session);
    
    return {
      riskProfile: portfolio.riskProfile,
      portfolio: portfolio.allocation,
      report: this.generateReport(session),
      recommendations: this.generateRecommendations(session)
    };
  }
}

// Exportar instancia única
module.exports = new PortfolioService();