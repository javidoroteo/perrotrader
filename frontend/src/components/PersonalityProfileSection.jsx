import React from 'react';
import { Star } from 'lucide-react';
import ModernSection from './ModernSection';

const PersonalityProfileSection = ({ archetypeDetails }) => {
  if (!archetypeDetails) {
    return (
      <div className="text-center text-gray-600">
        No se encontraron datos del arquetipo de personalidad.
      </div>
    );
  }

  return (
    <ModernSection
      title="Tu Arquetipo de Inversor"
      icon={Star}
      gradient="from-purple-500 to-pink-600"
      glow="purple"
      defaultOpen={true}
      priority={true}
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">{archetypeDetails.name}</h3>
        <p className="text-lg text-gray-600 italic">{archetypeDetails.slogan}</p>
        <p className="text-gray-700">{archetypeDetails.description}</p>
        <h4 className="text-xl font-semibold text-gray-800">Fortalezas</h4>
        <p className="text-gray-700">{archetypeDetails.strengths || 'No disponibles'}</p>
        <h4 className="text-xl font-semibold text-gray-800">Riesgos</h4>
        <p className="text-gray-700">{archetypeDetails.risks || 'No disponibles'}</p>
        <h4 className="text-xl font-semibold text-gray-800">Consejos</h4>
        <p className="text-gray-700">{archetypeDetails.advice || 'No disponibles'}</p>
      </div>
    </ModernSection>
  );
};

export default PersonalityProfileSection;