import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, Target, Brain, Shield, Zap, ArrowRight, ArrowLeft, Check, Star, Sparkles, Trophy, Rocket } from 'lucide-react';
import QuizStart from './components/QuizStart';
import QuizProgress from './components/QuizProgress';
import QuizQuestion from './components/QuizQuestion';
import PersonalityBlock from './components/PersonalityBlock';
import ModernInvestorProfile from './components/report';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import PostQuizActions from './components/PostQuizActions';

const API_BASE_URL = 'https://isfinz.onrender.com/api';

function ModernInvestmentQuiz({ onOpenPrivacyPolicy, hasConsent = false }) {
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

  // ✅ NUEVO: Ref para cleanup y control de timeouts
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // ✅ MEJORADO: Restaurar estado con JSON.parse seguro
  useEffect(() => {
    isMountedRef.current = true;

    const savedState = sessionStorage.getItem("quizState");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        
        // Verificar que el estado parseado es válido
        if (parsed && typeof parsed === 'object') {
          if (isMountedRef.current) {
            setQuizStarted(parsed.quizStarted || false);
            setSessionId(parsed.sessionId || null);
            setCurrentQuestion(parsed.currentQuestion || null);
            setProgress(parsed.progress || { current: 0, total: 0, percentage: 0 });
            setIsCompleted(parsed.isCompleted || false);
            setFinalResult(parsed.finalResult || null);
            setCanGoBack(parsed.canGoBack || false);
            setSelectedAnswer(parsed.selectedAnswer || null);
            setShowPersonalityTest(parsed.showPersonalityTest || false);
            setPersonalityQuestions(parsed.personalityQuestions || []);
            setPersonalityResponses(parsed.personalityResponses || []);
            setPersonalityProgress(parsed.personalityProgress || { current: 1, total: 4, percentage: 0 });
            setCurrentPersonalityBlock(parsed.currentPersonalityBlock || 1);
          }
        }
      } catch (err) {
        console.error('Error parsing saved quiz state:', err);
        // Limpiar estado corrupto
        sessionStorage.removeItem("quizState");
      }
    }

    // ✅ Cleanup function
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Guardar estado en sessionStorage al cambiar
  useEffect(() => {
    if (!isMountedRef.current) return;

    const stateToSave = {
      quizStarted,
      sessionId,
      currentQuestion,
      progress,
      isCompleted,
      finalResult,
      canGoBack,
      selectedAnswer,
      showPersonalityTest,
      personalityQuestions,
      personalityResponses,
      personalityProgress,
      currentPersonalityBlock
    };

    try {
      sessionStorage.setItem("quizState", JSON.stringify(stateToSave));
    } catch (err) {
      console.error('Error saving quiz state:', err);
    }
  }, [
    quizStarted,
    sessionId,
    currentQuestion,
    progress,
    isCompleted,
    finalResult,
    canGoBack,
    selectedAnswer,
    showPersonalityTest,
    personalityQuestions,
    personalityResponses,
    personalityProgress,
    currentPersonalityBlock
  ]);

  const handleStartQuiz = async () => {
    if (!hasConsent) {
      setError('Debes aceptar las cookies para continuar');
      return;
    }

    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/quiz/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (!isMountedRef.current) return;

      if (data.success) {
        setSessionId(data.sessionId);
        setQuizStarted(true);
        await loadQuestion(data.sessionId);
      } else {
        setError(data.message || 'Error al iniciar el cuestionario');
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Error de conexión al iniciar el cuestionario');
        console.error('Error starting quiz:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const loadQuestion = async (sessionIdParam = sessionId) => {
    if (!isMountedRef.current) return;

    try {
      const response = await fetch(`${API_BASE_URL}/quiz/question/${sessionIdParam}`);
      const data = await response.json();

      if (!isMountedRef.current) return;

      if (data.success) {
        setCurrentQuestion(data.question);
        setProgress(data.progress);
        setCanGoBack(data.canGoBack || false);
        setSelectedAnswer(null);
      } else {
        if (data.message === 'Cuestionario completado') {
          await startPersonalityTest(sessionIdParam);
        } else {
          setError(data.message);
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Error al cargar la pregunta');
        console.error('Error loading question:', err);
      }
    }
  };

  // ✅ MEJORADO: handleAnswer con cleanup de timeout
  const handleAnswer = async (answerIndex, selectedMultiple = null, combinedText = null) => {
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Para selección múltiple, usar selectedMultiple
    if (selectedMultiple) {
      setSelectedAnswer(selectedMultiple);
    } else {
      setSelectedAnswer(answerIndex);
    }

    // ✅ Guardar referencia del timeout para cleanup
    timeoutRef.current = setTimeout(async () => {
      if (!isMountedRef.current) return;

      setLoading(true);
      setError(null);

      try {
        const requestBody = {
          sessionId,
          questionId: currentQuestion.id,
        };

        if (selectedMultiple) {
          requestBody.selectedAnswers = selectedMultiple;
          requestBody.answerText = combinedText;
          requestBody.answerIndex = -1;
        } else {
          requestBody.answerIndex = answerIndex;
          requestBody.answerText = currentQuestion.answers[answerIndex].text ||
            currentQuestion.answers[answerIndex].answer ||
            `Opción ${answerIndex + 1}`;
        }

        const response = await fetch(`${API_BASE_URL}/quiz/answer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!isMountedRef.current) return;

        if (data.success) {
          if (data.nextStep === "personality_test") {
            await startPersonalityTest(sessionId);
          } else if (data.completed) {
            await getCompleteResult();
          } else {
            await loadQuestion();
          }
        } else {
          setError(data.message || 'Error al procesar la respuesta');
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError('Error de conexión al enviar la respuesta');
          console.error('Error submitting answer:', err);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }, 800);
  };

  const handlePrevious = async () => {
    if (showPersonalityTest && currentPersonalityBlock > 1) {
      await loadPersonalityBlock(currentPersonalityBlock - 1);
      return;
    }

    if (showPersonalityTest && currentPersonalityBlock === 1) {
      return;
    }

    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/quiz/previous`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });

      const data = await response.json();

      if (!isMountedRef.current) return;

      if (data.success) {
        setCurrentQuestion(data.question);
        setProgress(data.progress);
        setCanGoBack(data.canGoBack);
        setSelectedAnswer(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Error al retroceder');
        console.error('Error going back:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const startPersonalityTest = async (sessionIdParam = sessionId) => {
    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const startResponse = await fetch(`${API_BASE_URL}/personality/${sessionIdParam}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!isMountedRef.current) return;

      if (startResponse.ok) {
        setShowPersonalityTest(true);
        setCurrentPersonalityBlock(1);
        await loadPersonalityBlock(1, sessionIdParam);
      } else {
        setError('Error al inicializar el test de personalidad');
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Error de conexión al inicializar el test de personalidad');
        console.error('Error starting personality test:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const loadPersonalityBlock = async (blockNumber, sessionIdParam = sessionId) => {
    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/personality/${sessionIdParam}/questions?blockNumber=${blockNumber}`);
      const data = await response.json();

      if (!isMountedRef.current) return;

      if (data.success) {
        setPersonalityQuestions(data.questions);
        setPersonalityResponses(new Array(8).fill(null));
        setPersonalityProgress(data.progress);
        setCurrentPersonalityBlock(blockNumber);
      } else {
        setError(data.message || 'Error al cargar las preguntas de personalidad');
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Error de conexión al cargar las preguntas de personalidad');
        console.error('Error loading personality questions:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handlePersonalityResponse = (questionIndex, response) => {
    const newResponses = [...personalityResponses];
    newResponses[questionIndex] = response;
    setPersonalityResponses(newResponses);
  };

  const handlePersonalitySubmit = async () => {
    if (!isMountedRef.current) return;

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

      if (!isMountedRef.current) return;

      if (data.success) {
        if (data.completed || currentPersonalityBlock === 4) {
          await getCompleteResult();
        } else {
          await loadPersonalityBlock(currentPersonalityBlock + 1);
        }
      } else {
        setError(data.error || 'Error al procesar las respuestas de personalidad');
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Error de conexión al enviar las respuestas de personalidad');
        console.error('Error submitting personality responses:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const getCompleteResult = async () => {
    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/quiz/result/${sessionId}`);
      const data = await response.json();

      if (!isMountedRef.current) return;

      console.log('📡 Quiz result:', data);

      if (data.success && data.completed) {
        setFinalResult(data.result);
        setIsCompleted(true);
        setShowPersonalityTest(false);
      } else {
        setError(data.message || 'Resultados incompletos o error en el servidor');
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Error de conexión al obtener los resultados');
        console.error('Error getting complete results:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

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

    sessionStorage.removeItem("quizState");
  };

  const getSectionIcon = (section) => {
    switch (section?.toLowerCase()) {
      case 'conociendote': return <Star className="w-5 h-5" />;
      case 'conocimiento': return <Brain className="w-5 h-5" />;
      case 'objetivos': return <Target className="w-5 h-5" />;
      case 'riesgo': return <Shield className="w-5 h-5" />;
      case 'recursos': return <DollarSign className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // ========================================
  // RENDERIZADO
  // ========================================

  if (loading && !currentQuestion && !showPersonalityTest) {
    return <LoadingSpinner />;
  }

  if (error && !quizStarted) {
    return <ErrorAlert message={error} onRetry={handleStartQuiz} />;
  }

  if (isCompleted && finalResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ModernInvestorProfile
          result={finalResult}
          sessionId={sessionId}
          onRestart={handleRestart}
        />
        <PostQuizActions sessionId={sessionId} />
      </div>
    );
  }

  if (showPersonalityTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <QuizProgress
            current={personalityProgress.current}
            total={personalityProgress.total}
            percentage={personalityProgress.percentage}
          />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          <PersonalityBlock
            questions={personalityQuestions}
            responses={personalityResponses}
            onResponseChange={handlePersonalityResponse}
            onSubmit={handlePersonalitySubmit}
            onBack={currentPersonalityBlock > 1 ? handlePrevious : null}
            blockNumber={currentPersonalityBlock}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <QuizStart
        onStart={handleStartQuiz}
        loading={loading}
        onOpenPrivacyPolicy={onOpenPrivacyPolicy}
        hasConsent={hasConsent}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <QuizProgress
          current={progress.current}
          total={progress.total}
          percentage={progress.percentage}
        />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onPrevious={canGoBack ? handlePrevious : null}
            loading={loading}
            selectedAnswer={selectedAnswer}
            sectionIcon={getSectionIcon(currentQuestion.section)}
          />
        )}
      </div>
    </div>
  );
}

export default ModernInvestmentQuiz;