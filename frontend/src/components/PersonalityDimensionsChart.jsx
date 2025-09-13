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
        icon: <Target className="w-5 h-5" />,
        shadowColor: 'shadow-blue-100'
      },
      2: { 
        gradient: 'from-green-500 to-emerald-500',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <Brain className="w-5 h-5" />,
        shadowColor: 'shadow-green-100'
      },
      3: { 
        gradient: 'from-purple-500 to-violet-500',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        icon: <Zap className="w-5 h-5" />,
        shadowColor: 'shadow-purple-100'
      },
      4: { 
        gradient: 'from-orange-500 to-red-500',
        textColor: 'text-orange-600',
        bgColor: 'bg-orange-50',
        icon: <Shield className="w-5 h-5" />,
        shadowColor: 'shadow-orange-100'
      }
    };
    return configs[dimension] || {
      gradient: 'from-gray-400 to-gray-500',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: <Brain className="w-5 h-5" />,
      shadowColor: 'shadow-gray-100'
    };
  };

  return (
    <div className="p-6 bg-white/40 border border-white/30 rounded-3xl shadow-lg backdrop-blur-lg">
      {/* Header con efecto glassmorphism */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Perfil de Personalidad</h3>
          <p className="text-sm text-gray-600">Análisis de dimensiones psicológicas</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {dimensionsArray.map((dim, index) => {
          const config = getDimensionConfig(dim.dimension);
          const showPositive = dim.percentages.positive >= 50;
          const dominantPercentage = showPositive ? dim.percentages.positive : dim.percentages.negative;
          const dominantLabel = showPositive ? dim.labels.positive : dim.labels.negative;
          
          return (
            <div 
              key={dim.dimension} 
              className={`p-4 ${config.bgColor} rounded-2xl border border-white/50 ${config.shadowColor} transition-all duration-500 hover:shadow-md hover:scale-[1.02] fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Header de la dimensión */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${config.gradient} shadow-sm`}>
                  <div className="text-white">{config.icon}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span className={showPositive ? `${config.textColor} font-semibold` : 'text-gray-500'}>
                      {dim.labels.positive}
                    </span>
                    <span className={!showPositive ? `${config.textColor} font-semibold` : 'text-gray-500'}>
                      {dim.labels.negative}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Barra de progreso mejorada */}
              <div className="relative h-4 bg-gray-200/80 rounded-full overflow-hidden shadow-inner mb-3">
                {/* Efecto de brillo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[pulse_3s_infinite]"></div>
                
                {/* Barra del lado positivo */}
                <div 
                  className={`absolute left-0 top-0 h-full bg-gradient-to-r ${config.gradient} transition-all duration-1000 ease-out shadow-sm`}
                  style={{ 
                    width: `${dim.percentages.positive}%`,
                    opacity: showPositive ? 1 : 0.4
                  }}
                >
                  {/* Efecto de pulso en la barra dominante */}
                  {showPositive && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  )}
                </div>
                
                {/* Línea central con estilo */}
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-gray-300 to-gray-500 transform -translate-x-px shadow-sm" />
              </div>
              
              {/* Resultado con badge estilizado */}
              <div className="flex items-center justify-center">
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
                  <span className="text-sm font-bold">
                    {dominantPercentage}% {dominantLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer decorativo */}
      <div className="mt-6 pt-4 border-t border-white/30">
        <p className="text-xs text-gray-500 text-center">
          Basado en análisis psicológico de inversión • {dimensionsArray.length} dimensiones evaluadas
        </p>
      </div>
    </div>
  );
};

export default PersonalityDimensionsChart;