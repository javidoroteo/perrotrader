import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

function Quiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Función para iniciar el cuestionario
  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/quiz/start`);
      
      if (response.data.success) {
        setSessionId(response.data.sessionId);
        setQuizStarted(true);
        // Cargar la primera pregunta
        await loadQuestion(response.data.sessionId);
      } else {
        setError(response.data.message || 'Error al iniciar el cuestionario');
      }
    } catch (err) {
      setError('Error de conexión al iniciar el cuestionario');
      console.error('Error starting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar pregunta actual
  const loadQuestion = async (sessionIdParam = sessionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quiz/question/${sessionIdParam}`);
      
      if (response.data.success) {
        setCurrentQuestion(response.data.question);
        setProgress(response.data.progress);
        setCanGoBack(response.data.canGoBack || false);
      } else {
        if (response.data.message === 'Cuestionario completado') {
          await getFinalResult(sessionIdParam);
        } else {
          setError(response.data.message);
        }
      }
    } catch (err) {
      setError('Error al cargar la pregunta');
      console.error('Error loading question:', err);
    }
  };

  // Función para responder a una pregunta
  const handleAnswer = async (answerIndex) => {
    setLoading(true);
    setError(null);
    
    try {
      const answerText = currentQuestion.answers[answerIndex].text || 
                        currentQuestion.answers[answerIndex].answer || 
                        `Opción ${answerIndex + 1}`;

      const response = await axios.post(`${API_BASE_URL}/quiz/answer`, {
        sessionId,
        questionId: currentQuestion.id,
        answerIndex,
        answerText
      });

      if (response.data.success) {
        if (response.data.completed) {
          await getFinalResult();
        } else {
          await loadQuestion();
        }
      } else {
        setError(response.data.message || 'Error al procesar la respuesta');
      }
    } catch (err) {
      setError('Error de conexión al enviar la respuesta');
      console.error('Error submitting answer:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para volver a la pregunta anterior
  const handlePrevious = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/quiz/previous`, { sessionId });
      
      if (response.data.success) {
        setCurrentQuestion(response.data.question);
        setProgress(response.data.progress);
        setCanGoBack(response.data.canGoBack);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al retroceder');
      console.error('Error going back:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Función para obtener el resultado final
  const getFinalResult = async (sessionIdParam = sessionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quiz/result/${sessionIdParam}`);
      
      if (response.data.success) {
        setFinalResult(response.data.result);
        setIsCompleted(true);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al obtener el resultado');
      console.error('Error getting results:', err);
    }
  };

  // Función para reiniciar el cuestionario
  const handleRestart = () => {
    setQuizStarted(false);
    setSessionId(null);
    setCurrentQuestion(null);
    setProgress({ current: 0, total: 0, percentage: 0 });
    setIsCompleted(false);
    setFinalResult(null);
    setCanGoBack(false);
    setError(null);
  };

  // Función para obtener nombre de display de los activos
  const getAssetDisplayName = (asset) => {
    const displayNames = {
      'acciones': 'Acciones',
      'bonos': 'Bonos',
      'efectivo': 'Efectivo',
      'criptomonedas': 'Criptomonedas',
      'bonosVerdes': 'Bonos Verdes'
    };
    return displayNames[asset] || asset;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Cuestionario de Inversión
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Cargando...</span>
          </div>
        )}

        {!quizStarted && !loading ? (
          // Pantalla de inicio
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-6">
              Responde algunas preguntas para descubrir tu perfil de inversión ideal
            </p>
            <button 
              onClick={handleStartQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Comenzar Cuestionario
            </button>
          </div>
        ) : isCompleted && finalResult ? (
          // Pantalla de resultados
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
              ¡Cuestionario Completado!
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Perfil de riesgo: {finalResult.recommendations?.perfilRiesgo || 'No disponible'}
              </h3>
              
              {finalResult.recommendations?.cartera && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">Tu cartera recomendada:</h4>
                  <ul className="space-y-2">
                    {Object.entries(finalResult.recommendations.cartera).map(([asset, percentage]) => (
                      percentage > 0 && (
                        <li key={asset} className="flex justify-between bg-gray-50 p-2 rounded">
                          <span>{getAssetDisplayName(asset)}</span>
                          <span className="font-semibold">{percentage.toFixed(1)}%</span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}
              
              {finalResult.recommendations?.explicaciones && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">Explicación de tu perfil:</h4>
                  <ul className="space-y-2">
                    {finalResult.recommendations.explicaciones.map((explicacion, index) => (
                      <li key={index} className="text-gray-600 bg-gray-50 p-2 rounded">
                        {explicacion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleRestart}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Hacer el cuestionario de nuevo
              </button>
            </div>
          </div>
        ) : quizStarted && currentQuestion ? (
          // Pantalla de pregunta
          <div className="space-y-6">
            {/* Barra de progreso */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso</span>
                <span>{progress.current} de {progress.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage || 0}%` }}
                ></div>
              </div>
            </div>

            {/* Pregunta */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-medium text-blue-600 mb-2">
                {currentQuestion.section}
              </h4>
              <p className="text-xl font-semibold text-gray-800 mb-4">
                {currentQuestion.question || currentQuestion.text}
              </p>
              
              {currentQuestion.explanation && (
                <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-3 rounded">
                  {currentQuestion.explanation}
                </p>
              )}
              
              <div className="space-y-3">
                {currentQuestion.answers?.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={loading}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition duration-200 disabled:opacity-50"
                  >
                    {answer.text || answer.answer}
                  </button>
                ))}
              </div>
            </div>

            {/* Botones de navegación */}
            {canGoBack && (
              <div className="flex justify-start">
                <button
                  onClick={handlePrevious}
                  disabled={loading}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  ← Anterior
                </button>
              </div>
            )}
          </div>
        ) : quizStarted ? (
          // Estado de carga de pregunta
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p>Cargando pregunta...</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Quiz;