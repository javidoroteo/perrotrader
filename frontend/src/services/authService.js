// frontend/src/services/authService.js
import api from './api';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const authService = {
  /**
   * Iniciar login con Google OAuth
   */
  loginWithGoogle() {
    // Si tu BASE_URL ya tuviera /api al final, usa replace para evitar duplicados, 
    // pero con la lógica de arriba basta con concatenar.
    const targetUrl = `${BASE_URL.replace(/\/api$/, '')}/api/auth/google`;
    window.location.href = targetUrl;
  },

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  /**
   * Verificar si el usuario está autenticado
   */
  async checkAuth() {
    try {
      const response = await api.get('/auth/check');
      return response.data;
    } catch (error) {
      return { authenticated: false };
    }
  },

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(data) {
    try {
      const response = await api.put('/auth/profile', data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('isfinz_token');
      localStorage.removeItem('isfinz_user');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      // Limpiar localStorage de todas formas
      localStorage.removeItem('isfinz_token');
      localStorage.removeItem('isfinz_user');
      window.location.href = '/';
    }
  },

  /**
   * Guardar token después de OAuth callback
   */
  saveToken(token) {
    localStorage.setItem('isfinz_token', token);
  },

  /**
   * Guardar datos de usuario
   */
  saveUser(user) {
    localStorage.setItem('isfinz_user', JSON.stringify(user));
  },

  /**
   * Obtener usuario guardado en localStorage
   */
  getStoredUser() {
    const user = localStorage.getItem('isfinz_user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Obtener token guardado
   */
  getToken() {
    return localStorage.getItem('isfinz_token');
  },

  /**
   * Verificar si hay token
   */
  isAuthenticated() {
    return !!this.getToken();
  },

getUserProfile: async () => {
  const response = await api.get('/auth/profile');
  return response.data;
},

updatePreferences: async (preferences) => {
  const response = await api.put('/auth/preferences', preferences);
  return response.data;
},

updateInvestorProfile: async (profile) => {
  const response = await api.put('/auth/investor-profile', profile);
  return response.data;
},

exportUserData: async () => {
  const response = await api.get('/auth/export-data');
  return response.data;
},

deleteAccount: async () => {
  const response = await api.delete('/auth/account');
  return response.data;
}

};

export default authService;
