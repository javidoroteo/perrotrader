import { useState, useEffect } from 'react';
import { reportApiService } from '../services/reportService';
import { DataMapper } from '../utils/dataMapper';

export const useReportData = (initialSessionData = null) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = async (sessionData) => {
    console.log('InitialSessionData enviada a generateReport:', sessionData);
    setLoading(true);
    setError(null);
    try {
      const backendResponse = await reportApiService.generateReport(sessionData);
      console.log('Respuesta del backend:', backendResponse);
      const transformedData = DataMapper.transformBackendResponse(backendResponse);
      console.log('Datos transformados:', transformedData);
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

  useEffect(() => {
    console.log('InitialSessionData en useEffect:', initialSessionData);
    if (initialSessionData && !reportData) {
      generateReport(initialSessionData);
    }
  }, [initialSessionData]);

  return { 
    reportData, 
    loading, 
    error, 
    generateReport, 
    reloadReport: () => initialSessionData && generateReport(initialSessionData),
    clearReport: () => {
      setReportData(null);
      setError(null);
    }
  };
};