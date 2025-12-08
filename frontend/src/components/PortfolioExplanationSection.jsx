import React, { useState } from 'react';
import ModernSection from './ModernSection';
import PortfolioAdjustmentButtons from './PortfolioAdjustmentButtons';
import { portfolioService } from '../services/portfolioService';
import { 
  TrendingUp, 
  Shield, 
  AlertCircle, 
  Info,
  CheckCircle,
  DollarSign,
  Calendar,
  Target,
  Award,
  Users,
  Briefcase,
  Clock
} from 'lucide-react';

const PortfolioExplanationSection = ({ 
  portfolioExplanation, 
  portfolio,
  isAuthenticated = false,
  onPortfolioUpdate
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  /**
   * Construir opciones de ajuste basadas en el perfil actual del usuario
   */
  const getAdjustmentOptions = () => {
    const options = [];
    const config = portfolioExplanation.adjustmentActions;

    if (!config) return options;

    // 1. Opciones basadas en riskProfile actual
    if (portfolio.riskProfile && config.RISK_ADJUSTMENTS && config.RISK_ADJUSTMENTS[portfolio.riskProfile]) {
      Object.entries(config.RISK_ADJUSTMENTS[portfolio.riskProfile]).forEach(([key, adj]) => {
        options.push({
          preset: `RISK_ADJUSTMENTS.${portfolio.riskProfile}.${key}`,
          ...adj
        });
      });
    }

    // 2. Opciones basadas en experienceLevel
    if (portfolio.experienceLevel && config.EXPERIENCE_ADJUSTMENTS && config.EXPERIENCE_ADJUSTMENTS[portfolio.experienceLevel]) {
      Object.entries(config.EXPERIENCE_ADJUSTMENTS[portfolio.experienceLevel]).forEach(([key, adj]) => {
        options.push({
          preset: `EXPERIENCE_ADJUSTMENTS.${portfolio.experienceLevel}.${key}`,
          ...adj
        });
      });
    }

    // 3. Opciones basadas en edad (si tienes ageGroup en portfolio)
    if (portfolio.ageGroup && config.AGE_ADJUSTMENTS && config.AGE_ADJUSTMENTS[portfolio.ageGroup]) {
      Object.entries(config.AGE_ADJUSTMENTS[portfolio.ageGroup]).forEach(([key, adj]) => {
        options.push({
          preset: `AGE_ADJUSTMENTS.${portfolio.ageGroup}.${key}`,
          ...adj
        });
      });
    }

    // 4. Opciones basadas en ingresos
    if (portfolio.incomeLevel && config.INCOME_ADJUSTMENTS && config.INCOME_ADJUSTMENTS[portfolio.incomeLevel]) {
      Object.entries(config.INCOME_ADJUSTMENTS[portfolio.incomeLevel]).forEach(([key, adj]) => {
        options.push({
          preset: `INCOME_ADJUSTMENTS.${portfolio.incomeLevel}.${key}`,
          ...adj
        });
      });
    }

    // 5. Opciones basadas en horizonte temporal
    if (portfolio.timeHorizon && config.TIME_HORIZON_ADJUSTMENTS && config.TIME_HORIZON_ADJUSTMENTS[portfolio.timeHorizon]) {
      Object.entries(config.TIME_HORIZON_ADJUSTMENTS[portfolio.timeHorizon]).forEach(([key, adj]) => {
        options.push({
          preset: `TIME_HORIZON_ADJUSTMENTS.${portfolio.timeHorizon}.${key}`,
          ...adj
        });
      });
    }

    // 6. Añadir quick adjustments (siempre disponibles)
    if (config.QUICK_ADJUSTMENTS) {
      Object.entries(config.QUICK_ADJUSTMENTS).forEach(([key, adj]) => {
        // Validar condición si existe
        if (!adj.condition || adj.condition(portfolio)) {
          options.push({
            preset: `QUICK_ADJUSTMENTS.${key}`,
            ...adj
          });
        }
      });
    }

    return options;
  };

  /**
   * Manejar ajuste de portfolio
   */
  const handleAdjustment = async (presetPath) => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await portfolioService.adjustPortfolio(portfolio.id, {
        preset: presetPath
      });
      
      console.log('Portfolio ajustado exitosamente:', response);

      // Mostrar mensaje de éxito
      setSuccessMessage('Portfolio actualizado correctamente');

      // Actualizar UI con nuevo portfolio
      if (onPortfolioUpdate && response.portfolio) {
        onPortfolioUpdate(response.portfolio);
      }

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

    } catch (err) {
      console.error('Error al ajustar portfolio:', err);
      setError(err.message || 'Error al actualizar el portfolio. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manejar prompt de login
   */
  const handleLoginPrompt = () => {
    // Guardar la URL actual para redirigir después del login
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
  };

  // Función auxiliar para obtener el ícono según la categoría
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'risk':
        return Shield;
      case 'experience':
        return Award;
      case 'age':
        return Calendar;
      case 'income':
        return DollarSign;
      case 'time':
        return Clock;
      case 'general':
        return Target;
      default:
        return Info;
    }
  };

  return (
    <ModernSection
      title={portfolioExplanation.sectionTitle || "Cómo se construye tu cartera personalizada"}
      icon={Info}
      defaultOpen={true}
      gradient="from-blue-500 to-purple-600"
      glow="blue"
    >
      <div className="space-y-8">
        {/* Introducción */}
        {portfolioExplanation.sectionDescription && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 border border-blue-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {portfolioExplanation.sectionDescription}
            </p>
          </div>
        )}

        {portfolioExplanation.introText && (
          <div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {portfolioExplanation.introText}
            </p>
          </div>
        )}

        {/* Explicación por Perfil de Riesgo */}
        {portfolioExplanation.riskProfileExplanation && portfolio.riskProfile && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              {portfolioExplanation.riskProfileExplanation[portfolio.riskProfile]?.title || "Tu Perfil de Riesgo"}
            </h3>
            
            {portfolioExplanation.riskProfileExplanation[portfolio.riskProfile]?.impact && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.riskProfileExplanation[portfolio.riskProfile].impact}
                </p>
              </div>
            )}

            {/* Opciones "Si fuera diferente" */}
            {portfolioExplanation.riskProfileExplanation[portfolio.riskProfile]?.ifDifferent && (
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  ¿Y si tu situación es diferente?
                </h4>
                {Object.entries(portfolioExplanation.riskProfileExplanation[portfolio.riskProfile].ifDifferent).map(([key, text]) => (
                  <div key={key} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explicación por Nivel de Experiencia */}
        {portfolioExplanation.experienceExplanation && portfolio.experienceLevel && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              {portfolioExplanation.experienceExplanation[portfolio.experienceLevel]?.title || "Tu Nivel de Experiencia"}
            </h3>
            
            {portfolioExplanation.experienceExplanation[portfolio.experienceLevel]?.impact && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.experienceExplanation[portfolio.experienceLevel].impact}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Explicación por Edad */}
        {portfolioExplanation.ageExplanation && portfolio.ageGroup && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              {portfolioExplanation.ageExplanation[portfolio.ageGroup]?.title || "Tu Edad y Horizonte"}
            </h3>
            
            {portfolioExplanation.ageExplanation[portfolio.ageGroup]?.impact && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.ageExplanation[portfolio.ageGroup].impact}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Explicación por Ingresos */}
        {portfolioExplanation.incomeExplanation && portfolio.incomeLevel && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              {portfolioExplanation.incomeExplanation[portfolio.incomeLevel]?.title || "Tus Ingresos"}
            </h3>
            
            {portfolioExplanation.incomeExplanation[portfolio.incomeLevel]?.impact && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.incomeExplanation[portfolio.incomeLevel].impact}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Explicación por Horizonte Temporal */}
        {portfolioExplanation.timeHorizonExplanation && portfolio.timeHorizon && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              {portfolioExplanation.timeHorizonExplanation[portfolio.timeHorizon]?.title || "Tu Horizonte Temporal"}
            </h3>
            
            {portfolioExplanation.timeHorizonExplanation[portfolio.timeHorizon]?.impact && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.timeHorizonExplanation[portfolio.timeHorizon].impact}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Objetivos del Usuario */}
        {portfolioExplanation.goalsExplanation && portfolio.goals && portfolio.goals.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Tus Objetivos de Inversión
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.goals.map((goal, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{goal}</p>
                      {portfolioExplanation.goalsExplanation[goal] && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {portfolioExplanation.goalsExplanation[goal]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ajustes Generales Sugeridos */}
        {portfolioExplanation.generalAdjustments && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Ajustes Generales que Puedes Considerar
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioExplanation.generalAdjustments.moreGrowth && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Más Crecimiento</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {portfolioExplanation.generalAdjustments.moreGrowth}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {portfolioExplanation.generalAdjustments.moreStability && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Más Estabilidad</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {portfolioExplanation.generalAdjustments.moreStability}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {portfolioExplanation.generalAdjustments.moreIncome && (
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Más Ingresos</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {portfolioExplanation.generalAdjustments.moreIncome}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {portfolioExplanation.generalAdjustments.moreProtection && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Más Protección</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {portfolioExplanation.generalAdjustments.moreProtection}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mensaje de Cierre */}
        {portfolioExplanation.closingMessage && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                {portfolioExplanation.closingMessage.title && (
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {portfolioExplanation.closingMessage.title}
                  </h4>
                )}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {portfolioExplanation.closingMessage.content}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* NUEVA SECCIÓN: Botones de Ajuste Interactivo */}
        <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              ¿No estás de acuerdo con algo?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Tu cartera es flexible. Puedes ajustarla con un solo clic según tus preferencias reales. 
              Los cambios se aplicarán inmediatamente y podrás ver el impacto en tu distribución de activos.
            </p>
          </div>

          {/* Mensaje de Éxito */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-green-700 dark:text-green-400">{successMessage}</p>
            </div>
          )}

          {/* Mensaje de Error */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Botones de Ajuste */}
          <PortfolioAdjustmentButtons
            adjustmentOptions={getAdjustmentOptions()}
            onAdjust={handleAdjustment}
            isAuthenticated={isAuthenticated}
            onLoginPrompt={handleLoginPrompt}
            loading={loading}
          />

          {/* Nota Informativa */}
          {isAuthenticated && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Los ajustes que realices se guardarán automáticamente. Puedes modificar tu cartera tantas veces 
                  como necesites. Siempre podrás volver a la configuración recomendada original desde tu dashboard.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </ModernSection>
  );
};

export default PortfolioExplanationSection;
