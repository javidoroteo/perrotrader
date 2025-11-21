// frontend/src/services/api.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Validar variables de entorno en producción
if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
  console.warn('⚠️ VITE_API_URL no está definida en producción');
}

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para cookies de sesión
});

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('isfinz_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ MEJORADO: Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rutas públicas que no requieren redirección
      const publicRoutes = ['/shared/', '/quiz', '/oauth-callback', '/' ];
      const currentPath = window.location.pathname;
      
      const isPublicRoute = publicRoutes.some(route => 
        currentPath.includes(route)
      );
      
      // Solo redirigir si NO es una ruta pública
      if (!isPublicRoute) {
        localStorage.removeItem('isfinz_token');
        localStorage.removeItem('isfinz_user');
        
        // Evitar loop infinito
        if (currentPath !== '/') {
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
