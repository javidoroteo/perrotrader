import React, { useState } from 'react';
import { 
  TrendingUp, Shield, Rocket, Scale, Umbrella, Zap, 
  BarChart2, Award, BookOpen, Activity, Home,
  Calendar, DollarSign, Clock, Percent, Lock,
  AlertCircle, LogIn, XCircle, Coins
} from 'lucide-react';

const iconMap = {
  TrendingUp, Shield, Rocket, Scale, Umbrella, Zap,
  BarChart2, Award, BookOpen, Activity, Home,
  Calendar, DollarSign, Clock, Percent, Lock, 
  AlertCircle, XCircle, Coins
};

const PortfolioAdjustmentButtons = ({ 
  adjustmentOptions, 
  onAdjust, 
  isAuthenticated,
  onLoginPrompt,
  loading = false 
}) => {
  const [selectedPreset, setSelectedPreset] = useState(null);

  if (!isAuthenticated) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Registra tu cuenta para personalizar tu cartera
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Para poder aplicar cambios a tu portafolio recomendado, primero debes crear una cuenta o iniciar sesión. 
              Esto nos permitirá guardar tus preferencias y ajustes de forma segura.
            </p>
            <button
              onClick={onLoginPrompt}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Crear cuenta / Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {adjustmentOptions.map((option, index) => {
        const Icon = iconMap[option.icon] || TrendingUp;
        
        return (
          <button
            key={index}
            onClick={() => {
              setSelectedPreset(option.preset);
              onAdjust(option.preset);
            }}
            disabled={loading}
            className={`
              w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all
              ${loading && selectedPreset === option.preset 
                ? 'bg-blue-100 dark:bg-blue-900 cursor-wait' 
                : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'
              }
              border-2 ${selectedPreset === option.preset 
                ? 'border-blue-500' 
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }
              shadow-sm hover:shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-lg transition-colors flex-shrink-0
                ${selectedPreset === option.preset 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-blue-100 group-hover:text-blue-600'
                }
              `}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {option.label}
                </h4>
                {option.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </p>
                )}
              </div>

              {loading && selectedPreset === option.preset && (
                <div className="flex-shrink-0">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PortfolioAdjustmentButtons;
