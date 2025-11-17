// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setLoading(true);
      
      // Verificar si hay token en localStorage
      const token = authService.getToken();
      const storedUser = authService.getStoredUser();

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      // Verificar token con el backend
      const response = await authService.checkAuth();
      
      if (response.authenticated) {
        setIsAuthenticated(true);
        setUser(response.user);
      } else {
        // Token inválido
        setIsAuthenticated(false);
        setUser(null);
        authService.saveToken('');
        authService.saveUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    authService.loginWithGoogle();
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      setUser(response.user);
      authService.saveUser(response.user);
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.user);
      authService.saveUser(response.user);
      return response.user;
    } catch (error) {
      console.error('Error refreshing user:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    hasCompletedQuiz: user?.hasCompletedQuiz || false,
    login,
    logout,
    updateUser,
    refreshUser,
    checkAuthentication
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
