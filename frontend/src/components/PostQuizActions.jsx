// frontend/src/components/PostQuizActions.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import portfolioService from '../services/portfolioService';
import { Loader2, Save, AlertCircle } from 'lucide-react';

const PostQuizActions = ({ sessionId, result }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePortfolio = async () => {
    if (!isAuthenticated) {
      setError('Necesitas iniciar sesión para guardar el portfolio');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // 1. Vincular la sesión actual al usuario antes de crear el portfolio
      // Esto asegura que el reporte generado se guarde en "UserInvestmentProfile"
      // y aparezca en la sección "Mis Reportes"
      await portfolioService.linkSessionToUser(sessionId);

      const portfolioName = `Mi Portfolio - ${new Date().toLocaleDateString('es-ES')}`;
      const totalSavings = 10000;

      const response = await portfolioService.createFromQuiz(
        sessionId,
        portfolioName,
        totalSavings
      );

      navigate(`/portfolio/${response.portfolio.id}`);
    } catch (err) {
      setError(err.message || 'Error creando portfolio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 py-12 mt-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Guarda tu Portfolio
        </h2>
        <p className="text-gray-600 mb-8">
          Crea un portfolio con las recomendaciones del test para gestionar tus inversiones
        </p>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6 flex items-center gap-2 justify-center">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <button
          onClick={handleCreatePortfolio}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all disabled:opacity-50 inline-flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Creando...
            </>
          ) : (
            <>
              <Save size={24} />
              Guardar Portfolio
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 mt-8">
          Podrás buscar activos y personalizar tu portfolio después
        </p>
      </div>
    </div>
  );
};

export default PostQuizActions;
