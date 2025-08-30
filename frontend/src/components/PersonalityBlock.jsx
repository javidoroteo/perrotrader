import React from 'react';
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react';

const scaleLabels = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Ligeramente en desacuerdo",
  "Neutral",
  "Ligeramente de acuerdo",
  "De acuerdo",
  "Totalmente de acuerdo"
];

const ModernSection = ({ children, title, icon: Icon, gradient, glow, defaultOpen = true, priority = false }) => {
  return (
    <div className={`backdrop-blur-md bg-white/20 rounded-3xl shadow-xl border border-white/30 p-8 mb-6 ${priority ? 'ring-2 ring-white/50' : ''}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
};

const PersonalityBlock = ({ questions, responses, onResponseChange, onSubmit, onPrevious, loading }) => {
  if (!questions.length) {
    return (
      <div className="text-center text-gray-600">Cargando preguntas...</div>
    );
  }

  const blockNumber = questions[0]?.blockNumber || 1;
  const allAnswered = responses.every(r => r !== null && r !== undefined);

  return (
    <ModernSection
      title={`Bloque ${blockNumber} de 4 - Test de Personalidad`}
      icon={Brain}
      gradient="from-purple-500 to-pink-600"
      glow="purple"
      defaultOpen={true}
    >
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white/10 p-4 rounded-2xl">
            <p className="text-lg text-gray-800 mb-3">{q.text}</p>
            <div className="flex justify-between gap-2">
              {[...Array(7)].map((_, val) => (
                <button
                  key={val}
                  title={scaleLabels[val]}
                  onClick={() => onResponseChange(index, val + 1)}
                  disabled={loading}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    responses[index] === val + 1
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105'
                  } disabled:opacity-50`}
                >
                  {val + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="flex justify-between mt-6">
          {onPrevious && (
            <button
              onClick={onPrevious}
              disabled={loading}
              className="group inline-flex items-center gap-3 px-6 py-4 bg-white/40 hover:bg-white/60 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Anterior</span>
            </button>
          )}
          
          <button
            onClick={onSubmit}
            disabled={loading || !allAnswered}
            className="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
          >
            <span>{blockNumber === 4 ? 'Finalizar Test' : 'Siguiente Bloque'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </ModernSection>
  );
};

export default PersonalityBlock;