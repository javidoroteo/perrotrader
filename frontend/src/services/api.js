// frontend/src/services/api.js

// frontend/src/services/api.js
import axios from 'axios';

// 1. OBTENCIÓN Y LIMPIEZA DE LA URL
// Obtenemos la variable de entorno o usamos el fallback local
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// 2. LÓGICA DE SEGURIDAD PARA EL PREFIJO
// Aseguramos que la URL base de Axios SIEMPRE termine en '/api'.
// Si viene como "https://...run.app", le añade "/api".
// Si viene como ".../api", la deja igual.
export const API_BASE_URL = rawUrl.endsWith('/api') 
  ? rawUrl 
  : `${rawUrl}/api`;

// Validar variables de entorno en producción (solo advertencia)
if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
  console.warn('⚠️ VITE_API_URL no está definida en producción');
}

// 3. CREACIÓN DE LA INSTANCIA
const api = axios.create({
  baseURL: API_BASE_URL, // <--- Usamos la URL corregida aquí
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para cookies de sesión
});

// 4. INTERCEPTOR DE REQUEST (Token)
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

// 5. INTERCEPTOR DE RESPONSE (Manejo de errores 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rutas públicas que no requieren redirección al login
      // Añade aquí cualquier otra ruta pública que tengas
      const publicRoutes = ['/shared/', '/quiz', '/oauth-callback', '/', '/login', '/register'];
      const currentPath = window.location.pathname;
      
      const isPublicRoute = publicRoutes.some(route => 
        currentPath.includes(route)
      );
      
      // Solo redirigir si NO es una ruta pública
      if (!isPublicRoute) {
        localStorage.removeItem('isfinz_token');
        localStorage.removeItem('isfinz_user');
        
        // Evitar loop infinito si ya estamos en la home
        if (currentPath !== '/') {
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;