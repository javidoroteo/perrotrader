import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, Brain, Shield, Zap, ArrowRight, ArrowLeft, Check, Star, Sparkles, Trophy, Rocket } from 'lucide-react';
import QuizStart from './components/QuizStart';
import QuizProgress from './components/QuizProgress';
import QuizQuestion from './components/QuizQuestion';
import PersonalityBlock from './components/PersonalityBlock';
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

  // Estados para el test de personalidad
  const [showPersonalityTest, setShowPersonalityTest] = useState(false);
  const [personalityQuestions, setPersonalityQuestions] = useState([]);
  const [personalityResponses, setPersonalityResponses] = useState([]);
  const [personalityProgress, setPersonalityProgress] = useState({ current: 1, total: 4, percentage: 0 });
  const [currentPersonalityBlock, setCurrentPersonalityBlock] = useState(1);

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
          // Quiz principal completado, iniciar test de personalidad
          await startPersonalityTest(sessionIdParam);
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
        if (data.nextStep === "personality_test") {
          // Backend dice que ahora toca el test de personalidad
          await startPersonalityTest(sessionId);
        } else if (data.completed) {
          // Ambos tests completados → obtener resultado final
          await getCompleteResult();
        } else {
          // Continuar con el quiz normal
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
    if (showPersonalityTest && currentPersonalityBlock > 1) {
      // Navegar al bloque anterior de personalidad
      await loadPersonalityBlock(currentPersonalityBlock - 1);
      return;
    }

    if (showPersonalityTest && currentPersonalityBlock === 1) {
      // No permitir retroceder del primer bloque de personalidad
      return;
    }

    // Lógica original para preguntas del quiz principal
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

  // Funciones para el test de personalidad
  const startPersonalityTest = async (sessionIdParam = sessionId) => {
    setLoading(true);
    setError(null);
    try {
      // Inicializar el test de personalidad
      const startResponse = await fetch(`${API_BASE_URL}/personality/${sessionIdParam}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (startResponse.ok) {
        setShowPersonalityTest(true);
        setCurrentPersonalityBlock(1);
        await loadPersonalityBlock(1, sessionIdParam);
      } else {
        setError('Error al inicializar el test de personalidad');
      }
    } catch (err) {
      setError('Error de conexión al inicializar el test de personalidad');
      console.error('Error starting personality test:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPersonalityBlock = async (blockNumber, sessionIdParam = sessionId) => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(`${API_BASE_URL}/personality/${sessionIdParam}/questions?blockNumber=${blockNumber}`);
    const data = await response.json();
    
    if (data.success) {
      setPersonalityQuestions(data.questions);
      setPersonalityResponses(new Array(8).fill(null));
      setPersonalityProgress(data.progress); // Ahora incluye el progreso correcto
      setCurrentPersonalityBlock(blockNumber);
    } else {
      setError(data.message || 'Error al cargar las preguntas de personalidad');
    }
  } catch (err) {
    setError('Error de conexión al cargar las preguntas de personalidad');
    console.error('Error loading personality questions:', err);
  } finally {
    setLoading(false);
  }
};
  

  const handlePersonalityResponse = (questionIndex, response) => {
    const newResponses = [...personalityResponses];
    newResponses[questionIndex] = response;
    setPersonalityResponses(newResponses);
  };

  const handlePersonalitySubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/personality/${sessionId}/answer-block`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blockResponses: personalityResponses,
          blockNumber: currentPersonalityBlock
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.completed || currentPersonalityBlock === 4) {
          // Test de personalidad completado, obtener resultado final
          await getCompleteResult();
        } else {
          // Ir al siguiente bloque
          await loadPersonalityBlock(currentPersonalityBlock + 1);
        }
      } else {
        setError(data.error || 'Error al procesar las respuestas de personalidad');
      }
    } catch (err) {
      setError('Error de conexión al enviar las respuestas de personalidad');
      console.error('Error submitting personality responses:', err);
    } finally {
      setLoading(false);
    }
  };

const getCompleteResult = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/result/${sessionId}`);
    const data = await response.json();
    console.log('📡 Quiz result:', data); // ← Log después de obtener datos
    if (data.success && data.completed) {
      setFinalResult(data.result); // ← Directo, incluye quiz + personality
      setIsCompleted(true);
      setShowPersonalityTest(false);
    } else {
      setError(data.message || 'Resultados incompletos o error en el servidor');
    }
  } catch (err) {
    setError('Error de conexión al obtener los resultados');
    console.error('Error getting complete results:', err);
  } finally {
    setLoading(false);
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
    
    // Reset personality test states
    setShowPersonalityTest(false);
    setPersonalityQuestions([]);
    setPersonalityResponses([]);
    setPersonalityProgress({ current: 1, total: 4, percentage: 0 });
    setCurrentPersonalityBlock(1);
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

  if (loading && !currentQuestion && !showPersonalityTest) return <LoadingSpinner />;

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
          ) : showPersonalityTest ? (
            <>
              <QuizProgress 
                progress={personalityProgress} 
                section="Test de Personalidad" 
                getSectionIcon={() => <Brain className="w-6 h-6" />}
                phase="personality"
              />
              <PersonalityBlock
                questions={personalityQuestions}
                responses={personalityResponses}
                onResponseChange={handlePersonalityResponse}
                onSubmit={handlePersonalitySubmit}
                onPrevious={currentPersonalityBlock > 1 ? handlePrevious : null}
                loading={loading}
              />
            </>
          ) : currentQuestion ? (
            <>
              <QuizProgress progress={progress} section={currentQuestion.section} getSectionIcon={getSectionIcon} phase="quiz"/>
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