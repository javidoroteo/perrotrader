// Hook personalizado para manejar el estado del reporte

import { useState, useEffect } from 'react';
import { reportApiService } from '../services/reportService';
import { DataMapper } from '../utils/dataMapper';

export const useReportData = (initialSessionData = null) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Genera un reporte completo
   */
  const generateReport = async (sessionData) => {
    setLoading(true);
    setError(null);
    
    try {
      const backendResponse = await reportApiService.generateReport(sessionData);
      const transformedData = DataMapper.transformBackendResponse(backendResponse);
      setReportData(transformedData);
      return transformedData;
    } catch (err) {
      const errorMessage = err.message || 'Error al generar el reporte';
      setError(errorMessage);
      console.error('Error loading report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Recarga el reporte con los mismos datos
   */
  const reloadReport = async () => {
    if (initialSessionData) {
      return generateReport(initialSessionData);
    }
  };

  /**
   * Limpia el estado del reporte
   */
  const clearReport = () => {
    setReportData(null);
    setError(null);
  };

  // Cargar datos iniciales si se proporcionan
  useEffect(() => {
    if (initialSessionData && !reportData) {
      generateReport(initialSessionData);
    }
  }, [initialSessionData]);

  return { 
    reportData, 
    loading, 
    error, 
    generateReport, 
    reloadReport, 
    clearReport 
  };
};