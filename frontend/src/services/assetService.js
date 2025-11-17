// frontend/src/services/assetService.js
import api from './api';

const assetService = {
  /**
   * Buscar activos (ETFs, acciones, criptos)
   */
  async searchAssets(query, filters = {}) {
    try {
      const params = new URLSearchParams({
        q: query,
        ...filters
      });
      
      const response = await api.get(`/assets/search?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error searching assets:', error);
      throw error;
    }
  },

  /**
   * Obtener activos recomendados según perfil
   */
  async getRecommendedAssets(riskProfile, category = null) {
    try {
      const params = new URLSearchParams({ riskProfile });
      if (category) params.append('category', category);
      
      const response = await api.get(`/assets/recommended?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error getting recommended assets:', error);
      throw error;
    }
  },

  /**
   * Obtener detalles de un activo específico
   */
  async getAssetDetails(ticker) {
    try {
      const response = await api.get(`/assets/${ticker}`);
      return response.data;
    } catch (error) {
      console.error('Error getting asset details:', error);
      throw error;
    }
  },

  /**
   * Obtener alternativas de un activo (diferentes exchanges)
   */
  async getAssetAlternatives(ticker) {
    try {
      const response = await api.get(`/assets/${ticker}/alternatives`);
      return response.data;
    } catch (error) {
      console.error('Error getting asset alternatives:', error);
      throw error;
    }
  }
};

export default assetService;
