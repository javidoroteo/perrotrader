// frontend/src/components/PortfolioExplanationSection.jsx
import React from 'react';
import ModernSection from './ModernSection';
import { BookOpen, TrendingUp, TrendingDown, AlertCircle, Lightbulb } from 'lucide-react';

const PortfolioExplanationSection = ({ portfolioExplanation }) => {
  if (!portfolioExplanation) return null;

  const getCategoryIcon = (category) => {
    const icons = {
      riskProfile: '🎯',
      experience: '📚',
      age: '⏳',
      income: '💰',
      emergencyFund: '🛡️',
      timeHorizon: '📅',
      dividend: '💵',
      pension: '🏖️',
      crypto: '₿',
      gold: '🥇',
      personality: '🧠'
    };
    return icons[category] || '📊';
  };

  const getCategoryColor = (category) => {
    const colors = {
      riskProfile: 'from-red-500 to-orange-500',
      experience: 'from-blue-500 to-cyan-500',
      age: 'from-purple-500 to-pink-500',
      income: 'from-green-500 to-emerald-500',
      emergencyFund: 'from-yellow-500 to-amber-500',
      timeHorizon: 'from-indigo-500 to-blue-500',
      dividend: 'from-teal-500 to-green-500',
      pension: 'from-orange-500 to-red-500',
      crypto: 'from-amber-500 to-yellow-500',
      gold: 'from-yellow-600 to-amber-600',
      personality: 'from-pink-500 to-purple-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <ModernSection
      title="Cómo se construye tu cartera"
      icon={BookOpen}
      defaultOpen={false}
      gradient="from-indigo-500 to-purple-600"
      glow="purple"
    >
      <div className="space-y-6">
        {/* Introducción */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {portfolioExplanation.intro}
          </p>
        </div>

        {/* Explicaciones por factor */}
        <div className="space-y-4">
          {portfolioExplanation.explanations.map((explanation, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header con icono y título */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`text-4xl flex-shrink-0`}>
                  {getCategoryIcon(explanation.category)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {explanation.title}
                  </h3>
                  {explanation.currentLevel && (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(explanation.category)} text-white`}>
                      {explanation.currentLevel}
                    </span>
                  )}
                </div>
              </div>

              {/* Impacto actual */}
              <div className="mb-4 pl-16">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Impacto en tu cartera:
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {explanation.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sugerencias si es diferente */}
              <div className="pl-16">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 border-l-4 border-amber-500">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Si consideras que esto no refleja tu situación:
                      </h4>
                      
                      {/* Caso especial: perfil de riesgo tiene múltiples opciones */}
                      {explanation.category === 'riskProfile' && explanation.ifDifferent ? (
                        <div className="space-y-3">
                          {Object.entries(explanation.ifDifferent).map(([key, text]) => (
                            <p key={key} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {text}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {explanation.ifDifferent}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicador de personalidad con porcentaje */}
              {explanation.category === 'personality' && explanation.percentage && (
                <div className="mt-4 pl-16">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor('personality')}`}
                        style={{ width: `${explanation.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {explanation.percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Guía rápida de ajustes */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-blue-500" />
            {portfolioExplanation.generalAdjustments.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Más crecimiento
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.generalAdjustments.moreGrowth}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Más estabilidad
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.generalAdjustments.moreStability}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">💵</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Más ingresos
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.generalAdjustments.moreIncome}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Más protección
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {portfolioExplanation.generalAdjustments.moreProtection}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de cierre */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {portfolioExplanation.closingMessage.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {portfolioExplanation.closingMessage.content}
          </p>
        </div>
      </div>
    </ModernSection>
  );
};

export default PortfolioExplanationSection;
