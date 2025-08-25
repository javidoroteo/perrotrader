import React, { useRef, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const QuizQuestion = ({ question, onAnswer, loading, selectedAnswer, questionIndex }) => {
  const questionRef = useRef(null);

  // Scroll automático cuando aparece el componente por primera vez o cambia pregunta
  useEffect(() => {
    const timer = setTimeout(() => {
      smoothScrollToTop();
    }, 150); // Delay muy corto para renderizado

    return () => clearTimeout(timer);
  }, [question]); // Solo depende de la pregunta, no del índice

  // Función para scroll ultra-smooth
  const smoothScrollToTop = () => {
    const startPosition = window.pageYOffset;
    const duration = 800; // 800ms para scroll súper suave
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function para scroll más natural
      const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      window.scrollTo(0, startPosition * (1 - ease(progress)));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  const handleAnswer = (answerIndex) => {
    // Primero procesamos la respuesta
    onAnswer(answerIndex);
    
    // Esperamos un momento para que se renderice la nueva pregunta
    setTimeout(() => {
      // Opción simple - descomenta esta línea si prefieres:
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Opción súper smooth:
      smoothScrollToTop();
    }, 400);
  };

  return (
    <div className="space-y-6" ref={questionRef}>
      <div className="p-2 pt-0 bg-white/30 border border-white/20 rounded-3xl shadow-xl backdrop-blur-lg fade-in">
        <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-4 p-2 pt-0 leading-tight">
          {question.question || question.text}
        </h3>
        {question.explanation && (
          <div className="mb-4 p-2 bg-blue-50/80 border border-blue-200/50 rounded-2xl backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-blue-800 leading-relaxed font-medium">{question.explanation}</p>
            </div>
          </div>
        )}
        <div className="grid gap-2">
          {question.answers?.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={loading || selectedAnswer !== null}
              className={`answer-btn ${selectedAnswer === index ? 'answer-selected' : ''}`}
            >
              <div className="flex items-center gap-1">
                <div className={`w-4 h-4 rounded-full border-1 flex items-center justify-center transition-all duration-300 ${
                  selectedAnswer === index ? 'border-purple-500 bg-purple-500' : 'border-gray-300 group-hover:border-purple-400'
                }`}>
                  {selectedAnswer === index && <Check className="w-5 h-5 text-white" />}
                </div>
                <span className="text-gray-800 font-medium leading-relaxed flex-1">
                  {answer.text || answer.answer}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </div>
              {selectedAnswer === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;