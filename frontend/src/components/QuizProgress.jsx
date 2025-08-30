import React from 'react';

const QuizProgress = ({ progress, section, getSectionIcon }) => {
  const percentage = Math.round(progress?.percentage ?? 0);

  return (
    <div className="p-6 bg-white/30 border border-white/20 rounded-3xl shadow-lg backdrop-blur-lg fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
            <div className="text-white">{getSectionIcon?.(section)}</div>
          </div>
          <div>
            <span className="text-purple-800 font-bold text-lg">{section}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-gray-800">{percentage}%</div>
          <div className="text-sm text-gray-600">Completado</div>
        </div>
      </div>
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[pulse_2s_infinite]"></div>
      </div>
    </div>
  );
};

export default QuizProgress;
