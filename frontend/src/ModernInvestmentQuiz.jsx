import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, Brain, Shield, Zap, ArrowRight, ArrowLeft, Check, Star, Sparkles, Trophy, Rocket } from 'lucide-react';
import QuizStart from './components/QuizStart';
import QuizProgress from './components/QuizProgress';
import QuizQuestion from './components/QuizQuestion';
import ModernInvestorProfile from './components/report';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';

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

  if (loading && !currentQuestion) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl">
          {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

          {!quizStarted ? (
            <QuizStart onStart={handleStartQuiz} loading={loading} />
          ) : isCompleted && finalResult ? (
            <ModernInvestorProfile result={finalResult} onRestart={handleRestart} />
          ) : currentQuestion ? (
            <>
              <QuizProgress progress={progress} section={currentQuestion.section} getSectionIcon={getSectionIcon} />
              <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} loading={loading} selectedAnswer={selectedAnswer} />
              {canGoBack && (
                <div className="flex justify-start mt-6">
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
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ModernInvestmentQuiz;