export class DataMapper {
  /**
   * Mapea el perfil del inversor desde el backend
   */
  static mapInvestorProfile(backendData) {

    return {
      profile: {
        investorType: backendData.riskProfile || 'Riesgo Moderado',
        riskTolerance: this.mapRiskTolerance(backendData.riskProfile),
        timeHorizon: this.mapTimeHorizon(backendData.session?.timeValue),
        mainObjective: this.mapMainObjective(backendData.riskProfile),
        experienceLevel: backendData.experienceLevel || this.mapExperienceLevel(backendData.session?.experienceScore),
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
    if (!experienceScore || experienceScore <= 6) return 'Principiante';
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
    if (!portfolio || typeof portfolio !== 'object') {
      console.warn('Portfolio data is invalid:', portfolio);
      return {};
    }

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
      const numValue = parseFloat(value);
      normalized[mappedKey] = isNaN(numValue) ? 0 : Math.round(numValue * 100) / 100;
    });

    return normalized;
  }

  /**
   * Transforma la respuesta completa del backend
   */
  static transformBackendResponse(backendResponse) {
    console.log('Backend response:', backendResponse); // Debug log
    
    if (!backendResponse) {
      throw new Error('Backend response is empty');
    }

    // Construir el objeto de perfil del inversor usando los datos disponibles
    const profileData = {
      riskProfile: backendResponse.riskProfile,
      experienceLevel: backendResponse.experienceLevel,
      session: backendResponse.session || {}
    };

    const transformed = {
      investorProfile: this.mapInvestorProfile(profileData),
      portfolio: this.normalizePortfolio(backendResponse.portfolio),
      recommendations: backendResponse.recommendations,
      report: backendResponse.report, // Changed from emergencyFundReport
      educationalGuide: backendResponse.educationalGuide
    };

    console.log('Transformed data:', transformed); // Debug log
    return transformed;
  }
}