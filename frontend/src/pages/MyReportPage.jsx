// frontend/src/pages/MyReportPage.jsx (ARCHIVO NUEVO)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Loader2, BookOpen } from 'lucide-react';
import ModernInvestorProfile from '../components/report'; 
import reportService from '../services/reportService';

const MyReportPage = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedReport();
  }, []);

  const loadSavedReport = async () => {
    try {
      setLoading(true);
      
      // Usar tu reportService existente con la nueva función
      const data = await reportService.getMyReport();
      setReport(data);
    } catch (err) {
      console.error('Error loading report:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Cargando tu reporte...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Reporte no disponible
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Aún no has completado el test de inversión.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
            >
              Hacer Test de Inversión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header fijo */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>

          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mi Reporte de Inversión
          </h1>

          <button
            onClick={() => alert('Descarga PDF próximamente')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Tu componente de reporte existente */}
      <div className="py-8">
        <ModernInvestorProfile 
          result={report} 
          sessionId={report.sessionId}
          onRestart={() => navigate('/')}
          hideEmailSection={true}
        />
      </div>

      {/* Botón al dashboard */}
      <div className="max-w-6xl mx-auto px-4 pb-12 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
        >
          Ir a Mi Dashboard
        </button>
      </div>
    </div>
  );
};

export default MyReportPage;
