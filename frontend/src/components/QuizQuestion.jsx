import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Check, Clock } from 'lucide-react';

const QuizQuestion = ({ question, onAnswer, loading, selectedAnswer, questionIndex }) => {
  const questionRef = useRef(null);
  
  // Estados para selección múltiple
  const [selectedMultiple, setSelectedMultiple] = useState([]);
  const [showTimer, setShowTimer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);
  
  // Reset cuando cambia la pregunta
  useEffect(() => {
    setSelectedMultiple([]);
    setShowTimer(false);
    setTimeRemaining(3);
    
    const timer = setTimeout(() => {
      smoothScrollToTop();
    }, 150);

    return () => clearTimeout(timer);
  }, [question]);

  // Timer para auto-envío en selección múltiple
  useEffect(() => {
    let interval;
    
    if (showTimer && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 0.1);
      }, 100);
    } else if (showTimer && timeRemaining <= 0) {
      // Auto-enviar cuando se acaba el tiempo
      handleMultipleSubmit();
    }
    
    return () => clearInterval(interval);
  }, [showTimer, timeRemaining]);

  const smoothScrollToTop = () => {
    const startPosition = window.pageYOffset;
    const duration = 800;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      window.scrollTo(0, startPosition * (1 - ease(progress)));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  // Manejar selección múltiple
  const handleMultipleSelect = (answerIndex) => {
    if (loading) return;
    
    setSelectedMultiple(prev => {
      const newSelection = prev.includes(answerIndex)
        ? prev.filter(i => i !== answerIndex) // Deseleccionar si ya estaba
        : [...prev, answerIndex]; // Agregar nueva selección
      
      // Si es la primera selección, iniciar el timer
      if (newSelection.length === 1 && prev.length === 0) {
        setShowTimer(true);
        setTimeRemaining(3);
      }
      // Si hay selecciones, resetear el timer
      else if (newSelection.length > 0) {
        setTimeRemaining(3);
      }
      // Si no hay selecciones, ocultar timer
      else if (newSelection.length === 0) {
        setShowTimer(false);
      }
      
      return newSelection;
    });
  };

  // Enviar selecciones múltiples
  const handleMultipleSubmit = () => {
    if (selectedMultiple.length > 0) {
      // Crear textos seleccionados para mostrar
      const selectedTexts = selectedMultiple.map(i => question.answers[i].text);
      
      // Llamar a onAnswer con los datos de selección múltiple
      onAnswer(null, selectedMultiple, selectedTexts.join(', '));
      
      setShowTimer(false);
    }
  };

  // Manejar selección única (lógica original)
  const handleSingleAnswer = (answerIndex) => {
    onAnswer(answerIndex);
    
    setTimeout(() => {
      smoothScrollToTop();
    }, 400);
  };

  // Decidir qué función usar según el tipo de pregunta
  const handleAnswerClick = (answerIndex) => {
    if (question.multipleSelect) {
      handleMultipleSelect(answerIndex);
    } else {
      handleSingleAnswer(answerIndex);
    }
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

        {/* Timer visual para selección múltiple */}
        {question.multipleSelect && showTimer && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-purple-800 font-semibold">
                  ¿Algo más? Enviando en {Math.ceil(timeRemaining)}s...
                </span>
              </div>
              <button
                onClick={handleMultipleSubmit}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Continuar ahora
              </button>
            </div>
            {/* Barra de progreso del timer */}
            <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${Math.max(0, (timeRemaining / 3) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid gap-2">
          {question.answers?.map((answer, index) => {
            // Determinar si está seleccionada según el tipo de pregunta
            const isSelected = question.multipleSelect 
              ? selectedMultiple.includes(index)
              : selectedAnswer === index;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={loading || (!question.multipleSelect && selectedAnswer !== null)}
                className={`answer-btn ${isSelected ? 'answer-selected' : ''} ${
                  question.multipleSelect ? 'hover:bg-purple-50' : ''
                }`}
              >
                <div className="flex items-center gap-1">
                  <div className={`w-4 h-4 rounded-full border-1 flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300 group-hover:border-purple-400'
                  }`}>
                    {isSelected && <Check className="w-5 h-5 text-white" />}
                  </div>
                  <span className="text-gray-800 font-medium leading-relaxed flex-1">
                    {answer.text || answer.answer}
                  </span>
                  {!question.multipleSelect && (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  )}
                </div>
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Indicador de selecciones múltiples */}
        {question.multipleSelect && selectedMultiple.length > 0 && (
          <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded-2xl">
            <p className="text-green-800 text-sm font-medium">
              ✓ {selectedMultiple.length} opción{selectedMultiple.length > 1 ? 'es' : ''} seleccionada{selectedMultiple.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;