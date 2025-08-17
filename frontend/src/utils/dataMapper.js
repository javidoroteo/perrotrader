export class DataMapper {
  /**
   * Mapea el perfil del inversor desde el backend
   */
  static mapInvestorProfile(backendData) {
    const riskValues = {
      'Bajo Riesgo': 25,
      'Riesgo Moderado': 50,
      'Alto Riesgo': 75
    };

    const riskColors = {
      'Bajo Riesgo': '#10B981',
      'Riesgo Moderado': '#F59E0B', 
      'Alto Riesgo': '#EF4444'
    };

    return {
      riskScale: {
        value: riskValues[backendData.riskProfile] || 50,
        color: riskColors[backendData.riskProfile] || '#F59E0B'
      },
      profile: {
        investorType: backendData.riskProfile || 'Riesgo Moderado',
        riskTolerance: this.mapRiskTolerance(backendData.riskProfile),
        timeHorizon: this.mapTimeHorizon(backendData.session?.timeValue),
        mainObjective: this.mapMainObjective(backendData.riskProfile),
        experienceLevel: this.mapExperienceLevel(backendData.session?.experienceScore),
        esgSensitivity: this.mapESGSensitivity(backendData.session?.esgValue)
      }
    };
  }

  static mapRiskTolerance(riskProfile) {
    const mapping = {
      'Bajo Riesgo': 'Baja',
      'Riesgo Moderado': 'Media',
      'Alto Riesgo': 'Alta'
    };
    return mapping[riskProfile] || 'Media';
  }

  static mapTimeHorizon(timeValue) {
    const mapping = {
      1: 'Corto plazo (≤3 años)',
      2: 'Medio plazo (3-5 años)',
      3: 'Largo plazo (5-10 años)',
      4: 'Muy largo plazo (>10 años)'
    };
    return mapping[timeValue] || 'Medio plazo';
  }

  static mapMainObjective(riskProfile) {
    const mapping = {
      'Bajo Riesgo': 'Preservar capital',
      'Riesgo Moderado': 'Crecimiento equilibrado',
      'Alto Riesgo': 'Maximizar crecimiento'
    };
    return mapping[riskProfile] || 'Crecimiento equilibrado';
  }

  static mapExperienceLevel(experienceScore) {
    if (experienceScore <= 6) return 'Principiante';
    if (experienceScore <= 13) return 'Intermedio';
    return 'Avanzado';
  }

  static mapESGSensitivity(esgValue) {
    if (!esgValue || esgValue === 0) return null;
    if (esgValue <= 2) return 'Baja';
    if (esgValue <= 3) return 'Media';
    return 'Alta';
  }

  /**
   * Normaliza el portfolio del backend
   */
  static normalizePortfolio(portfolio) {
    const normalized = {};
    
    // Mapear nombres del backend a nombres frontend si es necesario
    const assetMapping = {
      'acciones': 'acciones',
      'bonos': 'bonos', 
      'criptomonedas': 'criptomonedas',
      'bonosVerdes': 'bonosVerdes',
      'efectivo': 'efectivo'
    };

    Object.entries(portfolio).forEach(([key, value]) => {
      const mappedKey = assetMapping[key] || key;
      normalized[mappedKey] = Math.round(value * 100) / 100; // Redondear a 2 decimales
    });

    return normalized;
  }

  /**
   * Transforma la respuesta completa del backend
   */
  static transformBackendResponse(backendResponse) {
    return {
      investorProfile: this.mapInvestorProfile(backendResponse),
      portfolio: this.normalizePortfolio(backendResponse.portfolio),
      recommendations: backendResponse.recommendations,
      emergencyFundReport: backendResponse.report,
      educationalGuide: backendResponse.educationalGuide
    };
  }
}