import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, Brain, Shield, Zap, ArrowRight, ArrowLeft, Check, Star, Sparkles, Trophy, Rocket } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api';

function ModernInvestmentQuiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      
      if (data.success) {
        setSessionId(data.sessionId);
        setQuizStarted(true);
        await loadQuestion(data.sessionId);
      } else {
        setError(data.message || 'Error al iniciar el cuestionario');
      }
    } catch (err) {
      setError('Error de conexión al iniciar el cuestionario');
      console.error('Error starting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestion = async (sessionIdParam = sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/question/${sessionIdParam}`);
      const data = await response.json();
      
      if (data.success) {
        setCurrentQuestion(data.question);
        setProgress(data.progress);
        setCanGoBack(data.canGoBack || false);
        setSelectedAnswer(null);
      } else {
        if (data.message === 'Cuestionario completado') {
          await getFinalResult(sessionIdParam);
        } else {
          setError(data.message);
        }
      }
    } catch (err) {
      setError('Error al cargar la pregunta');
      console.error('Error loading question:', err);
    }
  };

  const handleAnswer = async (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(async () => {
      setLoading(true);
      setError(null);
      
      try {
        const answerText = currentQuestion.answers[answerIndex].text || 
                          currentQuestion.answers[answerIndex].answer || 
                          `Opción ${answerIndex + 1}`;

        const response = await fetch(`${API_BASE_URL}/quiz/answer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            questionId: currentQuestion.id,
            answerIndex,
            answerText
          })
        });
        const data = await response.json();

        if (data.success) {
          if (data.completed) {
            await getFinalResult();
          } else {
            await loadQuestion();
          }
        } else {
          setError(data.message || 'Error al procesar la respuesta');
        }
      } catch (err) {
        setError('Error de conexión al enviar la respuesta');
        console.error('Error submitting answer:', err);
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handlePrevious = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/previous`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      const data = await response.json();
      
      if (data.success) {
        setCurrentQuestion(data.question);
        setProgress(data.progress);
        setCanGoBack(data.canGoBack);
        setSelectedAnswer(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error al retroceder');
      console.error('Error going back:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFinalResult = async (sessionIdParam = sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/result/${sessionIdParam}`);
      const data = await response.json();
      
      if (data.success) {
        setFinalResult(data.result);
        setIsCompleted(true);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error al obtener el resultado');
      console.error('Error getting results:', err);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setSessionId(null);
    setCurrentQuestion(null);
    setProgress({ current: 0, total: 0, percentage: 0 });
    setIsCompleted(false);
    setFinalResult(null);
    setCanGoBack(false);
    setError(null);
    setSelectedAnswer(null);
  };

  const getSectionIcon = (section) => {
    switch (section?.toLowerCase()) {
      case 'conociendote': return <Brain className="w-6 h-6" />;
      case 'objetivos de inversión': return <Target className="w-6 h-6" />;
      case 'experiencia de inversión': return <TrendingUp className="w-6 h-6" />;
      case 'perfil': return <Star className="w-6 h-6" />;
      case 'tolerancia al riesgo': return <Shield className="w-6 h-6" />;
      case 'horizonte de inversión': return <Zap className="w-6 h-6" />;
      default: return <DollarSign className="w-6 h-6" />;
    }
  };

  if (loading && !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-purple-300/30 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-blue-300/30 border-b-blue-600 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute inset-2 w-20 h-20 border-2 border-pink-300/30 border-r-pink-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background animated elements con colores suaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          
          {error && (
            <div className="mb-6 p-6 bg-red-50 border border-red-200 backdrop-blur-sm rounded-3xl text-red-700 animate-in slide-in-from-top duration-500 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {!quizStarted ? (
            // Start Screen - Estilo del reporte
            <div className="text-center space-y-10 animate-in fade-in duration-1000">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-300/30 rounded-full shadow-lg">
                  <TrendingUp className="w-7 h-7 text-purple-600" />
                  <span className="text-purple-800 font-bold text-lg">Análisis de Perfil de Inversión</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-gray-800 leading-tight">
                  Welcome to your
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Financial Future
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Un análisis avanzado que revelará tu estrategia de inversión perfecta a través de preguntas inteligentes y algoritmos adaptativos 🚀
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
                {[
                  { icon: <Brain />, title: "Análisis Psicológico", desc: "Evaluamos tu relación con el riesgo", gradient: "from-purple-500 to-purple-600" },
                  { icon: <Target />, title: "Objetivos Personalizados", desc: "Definimos metas específicas", gradient: "from-blue-500 to-blue-600" },
                  { icon: <Shield />, title: "Estrategia Segura", desc: "Recomendaciones basadas en datos", gradient: "from-green-500 to-green-600" }
                ].map((feature, i) => (
                  <div key={i} className="group p-8 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl border border-white/20 rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-2xl shadow-lg">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-black text-xl text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleStartQuiz}
                disabled={loading}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xl rounded-3xl shadow-2xl shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/40 disabled:opacity-50 disabled:hover:scale-100"
              >
                <span>🚀 Iniciar Análisis</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          ) : isCompleted && finalResult ? (
            // Completion Screen - Simple redirect message
            <div className="text-center space-y-8 animate-in fade-in duration-1000">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-green-50 border border-green-200 backdrop-blur-xl rounded-full shadow-lg">
                  <Check className="w-7 h-7 text-green-600" />
                  <span className="text-green-800 font-bold text-lg">Análisis Completado</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ¡PERFECTO!
                </h2>
                
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Tu análisis ha sido completado exitosamente. Ahora verás tu reporte detallado con recomendaciones personalizadas.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 mb-3">Tu reporte está listo</h3>
                  <p className="text-gray-600 text-lg">
                    Perfil: <span className="text-gray-800 font-bold">{finalResult.recommendations?.perfilRiesgo || 'Personalizado'}</span>
                  </p>
                </div>

                <button
                  onClick={handleRestart}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span>Realizar Nuevo Análisis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ) : currentQuestion ? (
            // Question Screen - Estilo del reporte
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Progress Bar */}
              <div className="p-6 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                      <div className="text-white">
                        {getSectionIcon(currentQuestion.section)}
                      </div>
                    </div>
                    <div>
                      <span className="text-purple-800 font-bold text-lg">
                        {currentQuestion.section}
                      </span>
                      <div className="text-gray-600 font-medium">
                        Pregunta {progress.current} de {progress.total}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-800">
                      {Math.round(progress.percentage || 0)}%
                    </div>
                    <div className="text-sm text-gray-600">Completado</div>
                  </div>
                </div>
                
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${progress.percentage || 0}%` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Question */}
              <div className="p-10 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-8 leading-tight">
                  {currentQuestion.question || currentQuestion.text}
                </h3>
                
                {currentQuestion.explanation && (
                  <div className="mb-8 p-6 bg-blue-50/80 border border-blue-200/50 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <p className="text-blue-800 leading-relaxed font-medium">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}
                
                <div className="grid gap-4">
                  {currentQuestion.answers?.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={loading || selectedAnswer !== null}
                      className={`group relative p-6 text-left rounded-2xl border transition-all duration-500 hover:scale-[1.02] disabled:hover:scale-100 ${
                        selectedAnswer === index
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300 scale-[1.02] shadow-lg'
                          : 'bg-white/40 hover:bg-white/60 border-gray-200 hover:border-purple-300 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedAnswer === index
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300 group-hover:border-purple-400'
                        }`}>
                          {selectedAnswer === index && (
                            <Check className="w-5 h-5 text-white" />
                          )}
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

              {/* Navigation */}
              {canGoBack && (
                <div className="flex justify-start">
                  <button
                    onClick={handlePrevious}
                    disabled={loading}
                    className="group inline-flex items-center gap-3 px-6 py-4 bg-white/40 hover:bg-white/60 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Anterior</span>
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ModernInvestmentQuiz;