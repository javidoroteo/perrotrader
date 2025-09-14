import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const scaleLabels = [
  "Totalmente en desacuerdo",
  "En desacuerdo", 
  "Ligeramente en desacuerdo",
  "Neutral",
  "Ligeramente de acuerdo",
  "De acuerdo",
  "Totalmente de acuerdo"
];

const ScaleGuide = () => {
  const circleSizes = [
    'w-3 h-3',   // Totalmente en desacuerdo - más pequeño
    'w-4 h-4',   // En desacuerdo
    'w-5 h-5',   // Ligeramente en desacuerdo  
    'w-6 h-6',   // Neutral
    'w-7 h-7',   // Ligeramente de acuerdo
    'w-8 h-8',   // De acuerdo
    'w-9 h-9'    // Totalmente de acuerdo - más grande
  ];

  const colors = [
    'bg-red-500',      // Totalmente en desacuerdo
    'bg-orange-500',   // En desacuerdo
    'bg-yellow-500',   // Ligeramente en desacuerdo
    'bg-gray-400',     // Neutral
    'bg-green-400',    // Ligeramente de acuerdo
    'bg-green-500',    // De acuerdo
    'bg-green-600'     // Totalmente de acuerdo
  ];

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-3 sm:p-6 mb-6 border border-white/40">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
        Guía de Respuestas
      </h3>
      
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-xs sm:text-sm font-medium text-red-600 bg-red-50 px-2 sm:px-3 py-1 rounded-full">
          Más en desacuerdo
        </span>
        <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
          Más de acuerdo
        </span>
      </div>

      <div className="relative mb-3 sm:mb-4">
        <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-gray-400 to-green-500 rounded-full"></div>
      </div>

      <div className="flex justify-between items-end px-1 sm:px-2">
        {circleSizes.map((size, index) => (
          <div
            key={index}
            className={`${size} ${colors[index]} rounded-full shadow-md transition-all duration-200 hover:scale-110`}
            title={scaleLabels[index]}
          ></div>
        ))}
      </div>

      <p className="text-xs text-gray-600 text-center mt-2 sm:mt-3">
        El tamaño del círculo indica la intensidad de tu opinión
      </p>
    </div>
  );
};

const PersonalityBlock = ({ questions, responses, onResponseChange, onSubmit, onPrevious, loading }) => {
  if (!questions.length) {
    return (
      <div className="text-center text-gray-600">Cargando preguntas...</div>
    );
  }

  const allAnswered = responses.every(r => r !== null && r !== undefined);

  // Configuración de círculos
  const getCircleConfig = (value, isSelected) => {
    const sizes = [
      'w-6 h-6',   // 1 - Totalmente en desacuerdo
      'w-7 h-7',   // 2 - En desacuerdo
      'w-8 h-8',   // 3 - Ligeramente en desacuerdo
      'w-9 h-9',   // 4 - Neutral
      'w-10 h-10', // 5 - Ligeramente de acuerdo
      'w-11 h-11', // 6 - De acuerdo
      'w-12 h-12'  // 7 - Totalmente de acuerdo
    ];

    const colors = [
      'bg-red-500 hover:bg-red-600',           // 1
      'bg-red-400 hover:bg-red-500',           // 2
      'bg-orange-400 hover:bg-orange-500',     // 3
      'bg-gray-400 hover:bg-gray-500',         // 4
      'bg-green-400 hover:bg-green-500',       // 5
      'bg-green-500 hover:bg-green-600',       // 6
      'bg-green-600 hover:bg-green-700'        // 7
    ];

    const selectedColors = [
      'bg-gradient-to-br from-red-500 to-red-700 ring-4 ring-red-200',      // 1
      'bg-gradient-to-br from-red-400 to-red-600 ring-4 ring-red-200',      // 2
      'bg-gradient-to-br from-orange-400 to-orange-600 ring-4 ring-orange-200', // 3
      'bg-gradient-to-br from-gray-400 to-gray-600 ring-4 ring-gray-200',   // 4
      'bg-gradient-to-br from-green-400 to-green-600 ring-4 ring-green-200', // 5
      'bg-gradient-to-br from-green-500 to-green-700 ring-4 ring-green-200', // 6
      'bg-gradient-to-br from-green-600 to-green-800 ring-4 ring-green-200'  // 7
    ];

    return {
      size: sizes[value - 1],
      color: isSelected ? selectedColors[value - 1] : colors[value - 1],
    };
  };

  // Función para desplazar hacia arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Desplazamiento suave
    });
  };

  // Manejadores que incluyen el desplazamiento
  const handleSubmit = () => {
    onSubmit();
    scrollToTop();
  };

  const handlePrevious = () => {
    onPrevious();
    scrollToTop();
  };

  return (
    <div className="max-w-4xl mx-auto px-1 py-4 sm:p-4">
      <div className="backdrop-blur-md bg-white/20 rounded-3xl shadow-xl border border-white/30 p-4 sm:p-8 mb-6">
        <ScaleGuide />
        
        <div className="space-y-4 sm:space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-2xl border border-white/20">
              <p className="text-base sm:text-lg text-gray-800 mb-4 sm:mb-6 leading-relaxed">{q.text}</p>
              
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-xs text-red-600 font-medium">En desacuerdo</span>
                <span className="text-xs text-green-600 font-medium">De acuerdo</span>
              </div>
              
              <div className="flex justify-between items-center px-0 sm:px-2">
                {[...Array(7)].map((_, val) => {
                  const value = val + 1;
                  const isSelected = responses[index] === value;
                  const config = getCircleConfig(value, isSelected);
                  
                  return (
                    <button
                      key={val}
                      title={scaleLabels[val]}
                      onClick={() => onResponseChange(index, value)}
                      disabled={loading}
                      className={`
                        ${config.size} ${config.color}
                        rounded-full shadow-lg transition-all duration-200 
                        hover:scale-110 hover:shadow-xl
                        disabled:opacity-50 disabled:hover:scale-100
                        focus:outline-none focus:ring-2 focus:ring-white/50
                        ${isSelected ? 'scale-110 animate-pulse' : ''}
                      `}
                    >
                      <span className="sr-only">{scaleLabels[val]}</span>
                    </button>
                  );
                })}
              </div>
              
              {responses[index] && (
                <div className="mt-3 sm:mt-4 text-center">
                  <span className="inline-block bg-white/20 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {scaleLabels[responses[index] - 1]}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
            {onPrevious && (
              <button
                onClick={handlePrevious}
                disabled={loading}
                className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/40 hover:bg-white/60 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm sm:text-base">Anterior</span>
              </button>
            )}
            
            <button
              onClick={handleSubmit}
              disabled={loading || !allAnswered}
              className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
            >
              <span className="text-sm sm:text-base">Continuar</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityBlock;