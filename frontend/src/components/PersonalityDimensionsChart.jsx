import React from 'react';
import { Brain, Target, Zap, Shield } from 'lucide-react';

const PersonalityDimensionsChart = ({ dimensions }) => {
  if (!dimensions) {
    console.log('No dimensions data available');
    return null;
  }

  // Convertir objeto de dimensiones a array para facilitar el mapeo
  const dimensionsArray = Object.values(dimensions).sort((a, b) => a.dimension - b.dimension);

  const getDimensionConfig = (dimension) => {
    const configs = {
      1: { 
        gradient: 'from-blue-500 to-cyan-500',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />,
        shadowColor: 'shadow-blue-100'
      },
      2: { 
        gradient: 'from-green-500 to-emerald-500',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" />,
        shadowColor: 'shadow-green-100'
      },
      3: { 
        gradient: 'from-purple-500 to-violet-500',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
        shadowColor: 'shadow-purple-100'
      },
      4: { 
        gradient: 'from-orange-500 to-red-500',
        textColor: 'text-orange-600',
        bgColor: 'bg-orange-50',
        icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
        shadowColor: 'shadow-orange-100'
      }
    };
    return configs[dimension] || {
      gradient: 'from-gray-400 to-gray-500',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" />,
      shadowColor: 'shadow-gray-100'
    };
  };

  return (
    <div className="p-3 sm:p-6 bg-white/40 border border-white/30 rounded-2xl sm:rounded-3xl shadow-lg backdrop-blur-lg">
      {/* Header con efecto glassmorphism */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Perfil de Personalidad</h3>
          <p className="text-xs sm:text-sm text-gray-600">Análisis de dimensiones psicológicas</p>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-6">
        {dimensionsArray.map((dim, index) => {
          const config = getDimensionConfig(dim.dimension);
          const showPositive = dim.percentages.positive >= 50;
          const dominantPercentage = showPositive ? dim.percentages.positive : dim.percentages.negative;
          const dominantLabel = showPositive ? dim.labels.positive : dim.labels.negative;
          
          return (
            <div 
              key={dim.dimension} 
              className={`p-3 sm:p-4 ${config.bgColor} rounded-xl sm:rounded-2xl border border-white/50 ${config.shadowColor} transition-all duration-500 hover:shadow-md hover:scale-[1.02] fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Header de la dimensión */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r ${config.gradient} shadow-sm flex-shrink-0`}>
                  <div className="text-white">{config.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1 sm:gap-2">
                    <span className={`text-xs sm:text-sm font-medium leading-tight text-left flex-1 ${showPositive ? `${config.textColor} font-semibold` : 'text-gray-500'}`}>
                      {dim.labels.positive}
                    </span>
                    <span className={`text-xs sm:text-sm font-medium leading-tight text-right flex-1 ${!showPositive ? `${config.textColor} font-semibold` : 'text-gray-500'}`}>
                      {dim.labels.negative}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Barra de progreso mejorada */}
              <div className="relative h-3 sm:h-4 bg-gray-200/80 rounded-full overflow-hidden shadow-inner mb-3">
                {/* Efecto de brillo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[pulse_3s_infinite]"></div>
                
                {/* Barra desde el lado dominante */}
                {showPositive ? (
                  // Dominante positivo: barra crece desde la izquierda
                  <div 
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${config.gradient} transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${dim.percentages.positive}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                ) : (
                  // Dominante negativo: barra crece desde la derecha
                  <div 
                    className={`absolute right-0 top-0 h-full bg-gradient-to-l ${config.gradient} transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${dim.percentages.negative}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                )}
                
                {/* Área no dominante con menor opacidad */}
                {showPositive ? (
                  <div 
                    className={`absolute right-0 top-0 h-full bg-gradient-to-l ${config.gradient} transition-all duration-1000 ease-out shadow-sm opacity-30`}
                    style={{ width: `${dim.percentages.negative}%` }}
                  />
                ) : (
                  <div 
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${config.gradient} transition-all duration-1000 ease-out shadow-sm opacity-30`}
                    style={{ width: `${dim.percentages.positive}%` }}
                  />
                )}
                
                {/* Línea central con estilo */}
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-gray-300 to-gray-500 transform -translate-x-px shadow-sm z-10" />
              </div>
              
              {/* Resultado con badge estilizado */}
              <div className="flex items-center justify-center">
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
                  <span className="text-xs sm:text-sm font-bold">
                    {dominantPercentage}% {dominantLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer decorativo */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/30">
        <p className="text-xs text-gray-500 text-center">
          Basado en análisis psicológico de inversión • {dimensionsArray.length} dimensiones evaluadas
        </p>
      </div>
    </div>
  );
};

export default PersonalityDimensionsChart;