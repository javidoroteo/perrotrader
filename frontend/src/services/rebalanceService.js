// frontend/src/services/rebalanceService.js
import api from './api';

const rebalanceService = {
  /**
   * Analizar portfolio y obtener sugerencias de rebalanceo
   */
  async analyzePortfolio(portfolioId) {
    try {
      const response = await api.get(`/rebalance/${portfolioId}/analyze`);
      return response.data;
    } catch (error) {
      console.error('Error analyzing portfolio:', error);
      throw error;
    }
  },

  /**
   * Obtener historial de rebalanceos
   */
  async getHistory(portfolioId) {
    try {
      const response = await api.get(`/rebalance/${portfolioId}/history`);
      return response.data;
    } catch (error) {
      console.error('Error getting rebalance history:', error);
      throw error;
    }
  },

  /**
   * Marcar rebalanceo como ejecutado
   */
  async markAsExecuted(rebalanceId) {
    try {
      const response = await api.post(`/rebalance/${rebalanceId}/execute`);
      return response.data;
    } catch (error) {
      console.error('Error marking rebalance as executed:', error);
      throw error;
    }
  }
};

export default rebalanceService;
