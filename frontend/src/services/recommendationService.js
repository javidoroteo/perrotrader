// frontend/src/services/recommendationService.js

import api from './api';

const recommendationService = {
  /**
   * Búsqueda de productos por lenguaje natural con IA
   * Endpoint público - no requiere autenticación
   * 
   * @param {string} query - Consulta en lenguaje natural
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise} - Lista de productos encontrados
   */
  async searchProducts(query, filters = {}) {
    try {
      const body = {
        query,
        ...filters
      };
      const response = await api.post('/recommendations/search', body);
      return response.data;
    } catch (error) {
      console.error('Error searching products with AI:', error);
      throw error;
    }
  },

  /**
   * Obtener recomendaciones personalizadas basadas en el perfil del usuario
   * Requiere autenticación
   * 
   * @param {number} limit - Número máximo de recomendaciones (default: 10)
   * @returns {Promise} - Lista de productos recomendados
   */
  async getPersonalizedRecommendations(limit = 10) {
    try {
      const response = await api.get(`/recommendations/for-user?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      throw error;
    }
  },

  /**
   * Obtener productos similares a uno específico
   * Endpoint público - no requiere autenticación
   * 
   * @param {string} productId - ID del producto de referencia
   * @param {number} limit - Número de productos similares (default: 5)
   * @returns {Promise} - Lista de productos similares
   */
  async getSimilarProducts(productId, limit = 5) {
    try {
      const response = await api.get(`/recommendations/similar/${productId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error getting similar products:', error);
      throw error;
    }
  },

  /**
   * Registrar acción del usuario sobre un producto
   * Requiere autenticación
   * 
   * @param {string} productId - ID del producto
   * @param {string} action - Tipo de acción: VIEWED, CLICKED, SELECTED, IGNORED
   * @returns {Promise} - Confirmación del tracking
   */
  async trackAction(productId, action) {
    try {
      const response = await api.post('/recommendations/track', {
        productId,
        action
      });
      return response.data;
    } catch (error) {
      console.error('Error tracking user action:', error);
      throw error;
    }
  },

  /**
   * Obtener productos más populares
   * Endpoint público - no requiere autenticación
   * 
   * @param {number} limit - Número de productos (default: 10)
   * @param {string} action - Filtrar por tipo de acción (default: 'SELECTED')
   * @returns {Promise} - Lista de productos populares
   */
  async getTopProducts(limit = 10, action = 'SELECTED') {
    try {
      const params = new URLSearchParams({ 
        limit: limit.toString(),
        action 
      });
      const response = await api.get(`/recommendations/top-products?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error getting top products:', error);
      throw error;
    }
  },

  /**
   * Obtener métricas personales del usuario
   * Requiere autenticación
   * 
   * @returns {Promise} - Métricas del usuario
   */
  async getMetrics() {
    try {
      const response = await api.get('/recommendations/metrics');
      return response.data;
    } catch (error) {
      console.error('Error getting user metrics:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas generales del sistema de vectorización
   * Endpoint público - no requiere autenticación
   * 
   * @returns {Promise} - Estadísticas del sistema
   */
  async getStats() {
    try {
      const response = await api.get('/recommendations/stats');
      return response.data;
    } catch (error) {
      console.error('Error getting recommendation stats:', error);
      throw error;
    }
  }
};

export default recommendationService;
