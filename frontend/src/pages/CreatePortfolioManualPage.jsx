// frontend/src/pages/CreatePortfolioManualPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import portfolioService from '../services/portfolioService';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ManualProfileForm from '../components/ManualProfileForm';

const CreatePortfolioManualPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState('info'); // 'info' | 'profile' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Datos del portfolio
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    totalSavings: ''
  });

  // Datos del perfil manual (opcional)
  const [manualProfile, setManualProfile] = useState(null);
  const [fillProfile, setFillProfile] = useState(false);

  // Paso 1: Información básica
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Paso 2: Crear portfolio
  const handleCreatePortfolio = async () => {
    if (!portfolioData.name || !portfolioData.totalSavings) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await portfolioService.createManualPortfolio(
        portfolioData.name,
        portfolioData.totalSavings,
        fillProfile ? manualProfile : null
      );

      // Guardar ID del nuevo portfolio para redirigir
      localStorage.setItem('lastCreatedPortfolio', response.portfolio.id);

      setStep('success');
    } catch (err) {
      setError(err.message || 'Error creando portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Ir a hacer el test
  const handleGoToQuiz = () => {
    navigate('/quiz');
  };

  // Ir al portfolio creado
  const handleGoToPortfolio = () => {
    const portfolioId = localStorage.getItem('lastCreatedPortfolio');
    if (portfolioId) {
      navigate(`/portfolio/${portfolioId}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Progress */}
          <div className="h-2 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: step === 'info' ? '33%' : step === 'profile' ? '66%' : '100%'
              }}
            />
          </div>

          <div className="p-8">
            {/* PASO 1: Información Básica */}
            {step === 'info' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Crea Tu Cartera
                </h2>
                <p className="text-gray-600 mb-8">
                  Proporciona información básica sobre tu cartera
                </p>

                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre de la Cartera
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={portfolioData.name}
                      onChange={handleBasicInfoChange}
                      placeholder="ej: Mi Portfolio 2025"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Capital Inicial */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Capital Inicial (€)
                    </label>
                    <input
                      type="number"
                      name="totalSavings"
                      value={portfolioData.totalSavings}
                      onChange={handleBasicInfoChange}
                      placeholder="ej: 10000"
                      min="0"
                      step="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Checkbox: Rellenar perfil */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fillProfile}
                        onChange={(e) => setFillProfile(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Rellenar perfil de inversión ahora (opcional)
                      </span>
                    </label>
                    <p className="text-xs text-gray-600 mt-2">
                      Puedes hacerlo después o completar el test para recomendaciones personalizadas
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => {
                        if (fillProfile) {
                          setStep('profile');
                        } else {
                          handleCreatePortfolio();
                        }
                      }}
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading && <Loader2 size={20} className="animate-spin" />}
                      {fillProfile ? 'Siguiente' : 'Crear Cartera'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: Perfil Manual */}
            {step === 'profile' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Tu Perfil de Inversión
                </h2>
                <p className="text-gray-600 mb-8">
                  Estos datos nos ayudarán a mostrarte activos más relevantes
                </p>

                <ManualProfileForm
                  onSubmit={(profile) => {
                    setManualProfile(profile);
                    handleCreatePortfolio();
                  }}
                  loading={loading}
                />
              </div>
            )}

            {/* PASO 3: Éxito */}
            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✅</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  ¡Cartera Creada!
                </h2>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  Tu cartera está lista. Ahora puedes buscar activos e invertir.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleGoToPortfolio}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Ver Mi Cartera
                  </button>
                  <button
                    onClick={handleGoToQuiz}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Hacer Test (Obtener Recomendaciones)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolioManualPage;
