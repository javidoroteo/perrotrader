// frontend/src/services/portfolioService.js

import api from './api';

const portfolioService = {

  // ========================================
  // FUNCIONES ORIGINALES (tu código actual)
  // ========================================

  /**
   * Ajustar portfolio con preset o ajustes manuales
   */
  async adjustPortfolio(portfolioId, data) {
    try {
      const response = await api.post(`/portfolio/${portfolioId}/adjust`, data);
      return response.data;
    } catch (error) {
      console.error('Error adjusting portfolio:', error);
      throw error.response?.data || error;
    }
  },
  async createFromQuiz(sessionId, name, totalSavings) {
    try {
      // Llamamos a la ruta definida en el backend como: router.post('/create', ...)
      const response = await api.post('/portfolio/create', {
        sessionId,
        name,
        totalSavings
      });
      return response.data;
    } catch (error) {
      console.error('Error creating portfolio from quiz:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Vincular sesión de quiz a usuario autenticado
   */
  async linkSessionToUser(sessionId) {
    try {
      const response = await api.post('/quiz/link-session', { sessionId });
      return response.data;
    } catch (error) {
      console.error('Error linking session to user:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Preview de ajuste sin guardar
   */
  async previewAdjustment(portfolioId, data) {
    try {
      const response = await api.post(`/portfolio/${portfolioId}/adjust/preview`, data);
      return response.data;
    } catch (error) {
      console.error('Error previewing adjustment:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Resetear portfolio a valores recomendados
   */
  async resetPortfolio(portfolioId) {
    try {
      const response = await api.post(`/portfolio/${portfolioId}/reset`);
      return response.data;
    } catch (error) {
      console.error('Error resetting portfolio:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Obtener todos los portfolios del usuario
   */
  async getPortfolios() {
    try {
      const response = await api.get('/portfolio/list');
      return response.data;
    } catch (error) {
      console.error('Error getting portfolios:', error);
      throw error;
    }
  },
  /**
   * Crear portfolio manual (sin quiz)
   */
  async createManualPortfolio(name, totalSavings, manualProfile) {
    try {
      const response = await api.post('/portfolio/create-manual', {
        name,
        totalSavings,
        manualProfile
      });
      return response.data;
    } catch (error) {
      console.error('Error creating manual portfolio:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Crear un nuevo portfolio
   */
  async createPortfolio(data) {
    try {
      const response = await api.post('/portfolio', data);
      return response.data;
    } catch (error) {
      console.error('Error creating portfolio:', error);
      throw error;
    }
  },

  /**
   * Obtener detalles de un portfolio específico
   */
  async getPortfolioDetails(portfolioId) {
    try {
      const response = await api.get(`/portfolio/${portfolioId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting portfolio details:', error);
      throw error;
    }
  },

  /**
   * Actualizar un portfolio
   */
  async updatePortfolio(portfolioId, data) {
    try {
      const response = await api.put(`/portfolio/${portfolioId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating portfolio:', error);
      throw error;
    }
  },

  /**
   * Eliminar un portfolio
   */
  async deletePortfolio(portfolioId) {
    try {
      const response = await api.delete(`/portfolio/${portfolioId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      throw error;
    }
  },

  /**
   * Agregar un activo al portfolio
   */
  async addAssetToPortfolio(portfolioId, assetData) {
    try {
      const response = await api.post(`/portfolio/${portfolioId}/holdings`, assetData);
      return response.data;
    } catch (error) {
      console.error('Error adding asset to portfolio:', error);
      throw error;
    }
  },

  /**
   * Actualizar un holding existente
   */
  async updateHolding(portfolioId, holdingId, data) {
    try {
      const response = await api.put(`/portfolio/${portfolioId}/holdings/${holdingId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating holding:', error);
      throw error;
    }
  },

  /**
   * Eliminar un holding del portfolio
   */
  async deleteHolding(portfolioId, holdingId) {
    try {
      const response = await api.delete(`/portfolio/${portfolioId}/holdings/${holdingId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting holding:', error);
      throw error;
    }
  },

  // ========================================
  // FUNCIONES DE COMPARTIR PORTFOLIO
  // ========================================

  /**
   * Crear un link de compartir para un portfolio
   */
  async createShareLink(portfolioId) {
    try {
      const response = await api.post(`/portfolio/${portfolioId}/share`);
      return response.data;
    } catch (error) {
      console.error('Error creating share link:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Obtener mis links de compartir
   */
  async getMyShareLinks() {
    try {
      const response = await api.get('/portfolio/my-share-links');
      return response.data;
    } catch (error) {
      console.error('Error getting share links:', error);
      throw error;
    }
  },

  /**
   * Eliminar un link de compartir
   */
  async deleteShareLink(shareId) {
    try {
      const response = await api.delete(`/portfolio/share-links/${shareId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting share link:', error);
      throw error;
    }
  },

  /**
   * Obtener portfolio compartido (público)
   */
  async getSharedPortfolio(shareToken) {
    try {
      const response = await api.get(`/portfolio/shared/${shareToken}`);
      return response.data;
    } catch (error) {
      console.error('Error getting shared portfolio:', error);
      throw error;
    }
  },

  /**
   * Copiar resumen del portfolio al portapapeles
   * ✅ CORREGIDO: Ahora devuelve Promise correctamente
   */
  async copyPortfolioSummary(portfolio, holdings) {
    try {
      const totalValue = holdings.reduce((sum, h) => sum + (h.currentValue || 0), 0);
      const totalInvested = holdings.reduce((sum, h) => sum + (h.quantity * h.purchasePrice), 0);
      const totalGainLoss = totalValue - totalInvested;
      const gainLossPercentage = totalInvested > 0 ?
        ((totalGainLoss / totalInvested) * 100).toFixed(2) : '0.00';

      const summary = `
📊 Mi Portfolio: ${portfolio.name}

💰 Valor Total: €${totalValue.toFixed(2)}
📈 Ganancia/Pérdida: €${totalGainLoss.toFixed(2)} (${gainLossPercentage}%)

🎯 Activos (${holdings.length}):
${holdings.map(h =>
        `• ${h.ticker}: ${h.quantity} uds @ €${h.currentPrice?.toFixed(2) || 'N/A'}`
      ).join('\n')}

Creado con Isfinz 🚀
      `.trim();

      await navigator.clipboard.writeText(summary);
      return { success: true, message: 'Resumen copiado al portapapeles' };
    } catch (error) {
      console.error('Error copying summary:', error);
      throw new Error('No se pudo copiar al portapapeles');
    }
  }
};

export default portfolioService;