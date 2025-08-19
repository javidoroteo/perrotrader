import React from 'react';
import { Lightbulb, ChevronDown } from 'lucide-react';

// Componente para una recomendación individual
const RecommendationItem = ({ text, index }) => (
  <li className="flex items-start space-x-4 p-4 bg-white/80 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
    <Lightbulb className="w-6 h-6 text-purple-600 flex-shrink-0" />
    <p className="text-gray-700 text-base">{text}</p>
  </li>
);

// Componente principal de Recomendaciones
const RecommendationsSection = ({ recommendations }) => {
  if (!recommendations || !recommendations.explicaciones || recommendations.explicaciones.length === 0) {
    return (
      <div className="bg-white/80 p-6 rounded-lg shadow-md text-center animate-fadeInUp">
        <p className="text-gray-600">No hay recomendaciones disponibles.</p>
      </div>
    );
  }

  return (
    <div className="modern-section bg-white/80 p-6 rounded-lg shadow-md animate-fadeInUp">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Lightbulb className="w-8 h-8 text-purple-600 mr-2" />
        Recomendaciones Personalizadas
      </h2>
      <ul className="space-y-4">
        {recommendations.explicaciones.map((rec, index) => (
          <RecommendationItem key={index} text={rec} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsSection;