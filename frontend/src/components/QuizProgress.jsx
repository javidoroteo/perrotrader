
import React from 'react';
import { Brain, Target, TrendingUp, Star, Shield, Zap } from 'lucide-react';

const QuizProgress = ({ progress, section, getSectionIcon, phase = 'quiz' }) => {
  const percentage = Math.round(progress?.percentage ?? 0);
  
  // Configuración de fases
  const phases = {
    quiz: {
      title: 'Cuestionario Principal',
      color: 'from-purple-500 to-blue-500',
      sections: [
        'Conociendote',
        'Experiencia de Inversión',
        'Tipos de Inversión',
      ]
    },
    personality: {
      title: 'Test de Personalidad',
      color: 'from-pink-500 to-purple-600',
      sections: ['Bloque 1', 'Bloque 2', 'Bloque 3', 'Bloque 4']
    }
  };

  const currentPhase = phases[phase] || phases.quiz;
  const phaseIcon = phase === 'personality' ? <Brain className="w-6 h-6" /> : getSectionIcon?.(section);

  return (
    <div className="p-6 bg-white/30 border border-white/20 rounded-3xl shadow-lg backdrop-blur-lg fade-in mb-6">
      {/* Header con información de fase */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${currentPhase.color} shadow-lg`}>
            <div className="text-white">{phaseIcon}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-medium">{currentPhase.title}</div>
            <span className="text-purple-800 font-bold text-lg">
              {phase === 'personality' ? `Bloque ${progress.current || 1} de 4` : section}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-gray-800">{percentage}%</div>
          <div className="text-sm text-gray-600">Completado</div>
        </div>
      </div>

      {/* Barra de progreso principal */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${currentPhase.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[pulse_2s_infinite]"></div>
      </div>

      {/* Indicadores de sección */}
      <div className="flex justify-between items-center">
        {currentPhase.sections.map((sectionName, index) => {
          const isCompleted = phase === 'quiz' 
            ? (progress.completedSections || []).includes(sectionName.toLowerCase())
            : index < (progress.current - 1);
          const isCurrent = phase === 'quiz'
            ? section?.toLowerCase() === sectionName.toLowerCase()
            : index === (progress.current - 1);
          
          return (
            <div key={sectionName} className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full mb-1 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-500 shadow-lg' 
                  : isCurrent 
                    ? 'bg-purple-500 shadow-lg ring-2 ring-purple-200' 
                    : 'bg-gray-300'
              }`}></div>
              <span className={`text-xs font-medium ${
                isCompleted 
                  ? 'text-green-700' 
                  : isCurrent 
                    ? 'text-purple-700' 
                    : 'text-gray-500'
              }`}>
                {phase === 'personality' ? `${index + 1}` : sectionName.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progreso global (opcional) */}
      {progress.globalProgress && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso Total</span>
            <span>{Math.round(progress.globalProgress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000"
              style={{ width: `${progress.globalProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizProgress;