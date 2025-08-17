// Servicio centralizado para manejar todas las llamadas a la API del reporte

class ReportApiService {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  /**
   * Genera un reporte completo basado en los datos de sesión
   */
  async generateReport(sessionData) {
    try {
      const response = await fetch(`${this.baseURL}/portfolio/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  /**
   * Obtiene solo la cartera calculada
   */
  async getPortfolio(sessionData) {
    try {
      const response = await fetch(`${this.baseURL}/portfolio/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error calculating portfolio:', error);
      throw error;
    }
  }

  /**
   * Obtiene solo las recomendaciones
   */
  async getRecommendations(sessionData) {
    try {
      const response = await fetch(`${this.baseURL}/portfolio/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  /**
   * Obtiene la guía educativa
   */
  async getEducationalGuide(sessionData) {
    try {
      const response = await fetch(`${this.baseURL}/portfolio/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting educational guide:', error);
      throw error;
    }
  }
}

// Exportar instancia singleton
export const reportApiService = new ReportApiService();
export default reportApiService;