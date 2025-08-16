import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Función para iniciar el cuestionario
  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/api/quiz/start');
      const { sessionId, question, progress } = response.data;
      
      setSessionId(sessionId);
      setCurrentQuestion(question);
      setProgress(progress);
      setQuizStarted(true);
      setCanGoBack(false);
    } catch (err) {
      setError('Error al iniciar el cuestionario. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para responder a una pregunta
  const handleAnswer = async (answerIndex) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/api/quiz/answer', {
        sessionId,
        questionId: currentQuestion.id,
        answerIndex,
      });

      if (response.data.completed) {
        setIsCompleted(true);
        setFinalResult(response.data.result);
      } else {
        const { question, progress, canGoBack } = response.data;
        setCurrentQuestion(question);
        setProgress(progress);
        setCanGoBack(canGoBack);
      }
    } catch (err) {
      setError('Error al enviar la respuesta.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para volver a la pregunta anterior
  const handlePrevious = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/api/quiz/previous', { sessionId });
      const { question, progress, canGoBack } = response.data;
      setCurrentQuestion(question);
      setProgress(progress);
      setCanGoBack(canGoBack);
    } catch (err) {
      setError('Error al retroceder. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Función para obtener el resultado final, por si se recarga la página
  const getFinalResult = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.get(`http://localhost:3001/api/quiz/result/${sessionId}`);
        setFinalResult(response.data.result);
        setIsCompleted(true);
    } catch (err) {
        setError('Error al obtener el resultado.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  // El código que se encarga de dibujar el Quiz en pantalla
  return (
    <div id="quiz-container">
      <h1>Cuestionario de Inversión</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>Cargando...</div>}

      {!quizStarted && !loading ? (
        // Si el quiz no ha comenzado, muestra solo el botón de inicio
        <button onClick={handleStartQuiz}>Comenzar Cuestionario</button>
      ) : isCompleted ? (
        // Si ya está completo, muestra el resultado final
        <div>
          <h2>¡Cuestionario Completado!</h2>
          <pre>{JSON.stringify(finalResult, null, 2)}</pre>
        </div>
      ) : (
        // Si está en curso, muestra la pregunta actual
        <div>
          {currentQuestion ? (
            <div>
              <h3>{currentQuestion.text}</h3>
              <div>
                {currentQuestion.answers.map((answer, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleAnswer(index)}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
              <p>Progreso: {progress.current} de {progress.total}</p>
            </div>
          ) : (
            <div>Cargando pregunta...</div>
          )}
          {/* Botones de navegación */}
          <div>
            <button onClick={handlePrevious} disabled={!canGoBack}>
              Anterior
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;