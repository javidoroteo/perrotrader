const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar preguntas desde tu archivo de datos
const questions = require('./data/questions.js');

// Simulamos sesiones en memoria (en producción usarías una base de datos)
const sessions = {};

// Rutas de la API
app.get('/', (req, res) => {
    res.json({ message: 'API del cuestionario funcionando' });
});

app.post('/api/quiz/start', (req, res) => {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    sessions[sessionId] = {
        currentQuestionId: null, // Se establecerá en la primera pregunta
        answers: [],
        history: [],
        completed: false,
        // Múltiples sistemas de puntuación
        scores: {
            conopoints: 0,
            timevalue: 0,
            fondoemergencia: 0,
            expoints: 0,
            points: 0,
            criptoexposure: 0,
            esg: 0
        }
    };
    
    res.json({
        success: true,
        data: { sessionId }
    });
});

app.get('/api/quiz/question/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const session = sessions[sessionId];
    
    if (!session) {
        return res.json({
            success: false,
            message: 'Sesión no encontrada'
        });
    }
    
    if (session.completed) {
        return res.json({
            success: false,
            message: 'Cuestionario completado'
        });
    }
    
    // Encontrar pregunta por ID (no por índice)
    let question;
    if (!session.currentQuestionId) {
        // Primera pregunta
        question = questions[0];
        session.currentQuestionId = question.id;
    } else {
        question = questions.find(q => q.id === session.currentQuestionId);
    }
    
    if (!question) {
        return res.json({
            success: false,
            message: 'Pregunta no encontrada'
        });
    }
    
    const progress = {
        current: session.answers.length + 1,
        total: questions.length,
        percentage: ((session.answers.length + 1) / questions.length) * 100
    };
    
    res.json({
        success: true,
        data: {
            question,
            progress,
            canGoBack: session.history.length > 0
        }
    });
});

app.post('/api/quiz/answer', (req, res) => {
    const { sessionId, questionId, answerIndex } = req.body;
    const session = sessions[sessionId];
    
    if (!session) {
        return res.json({
            success: false,
            message: 'Sesión no encontrada'
        });
    }
    
    // Encontrar pregunta actual
    const currentQuestion = questions.find(q => q.id === questionId);
    if (!currentQuestion) {
        return res.json({
            success: false,
            message: 'Pregunta no encontrada'
        });
    }
    
    const selectedAnswer = currentQuestion.answers[answerIndex];
    
    // Guardar respuesta completa
    session.answers.push({
        questionId,
        answerIndex,
        selectedAnswer: selectedAnswer,
        timestamp: new Date()
    });
    
    // Actualizar todos los tipos de puntuación
    const scoreTypes = ['conopoints', 'timevalue', 'fondoemergencia', 'expoints', 'points', 'criptoexposure', 'esg'];
    scoreTypes.forEach(scoreType => {
        if (selectedAnswer[scoreType] !== undefined) {
            session.scores[scoreType] += selectedAnswer[scoreType];
        }
    });
    
    // Guardar pregunta actual en historial antes de cambiar
    session.history.push(session.currentQuestionId);
    
    // Determinar siguiente pregunta usando nextQuestion
    if (selectedAnswer.nextQuestion) {
        const nextQuestion = questions.find(q => q.id === selectedAnswer.nextQuestion);
        if (nextQuestion) {
            session.currentQuestionId = selectedAnswer.nextQuestion;
        } else {
            // Si nextQuestion no existe, marcar como completado
            session.completed = true;
        }
    } else {
        // Si no hay nextQuestion, el cuestionario termina
        session.completed = true;
    }
    
    res.json({
        success: true,
        data: { 
            completed: session.completed,
            scores: session.scores // Opcionalmente devolver puntuaciones actuales
        }
    });
});

app.post('/api/quiz/previous', (req, res) => {
    const { sessionId } = req.body;
    const session = sessions[sessionId];
    
    if (!session || session.history.length === 0) {
        return res.json({
            success: false,
            message: 'No se puede volver atrás'
        });
    }
    
    // Obtener la última respuesta para revertir puntuaciones
    const lastAnswer = session.answers.pop();
    if (lastAnswer) {
        // Revertir puntuaciones
        const scoreTypes = ['conopoints', 'timevalue', 'fondoemergencia', 'expoints', 'points', 'criptoexposure', 'esg'];
        scoreTypes.forEach(scoreType => {
            if (lastAnswer.selectedAnswer[scoreType] !== undefined) {
                session.scores[scoreType] -= lastAnswer.selectedAnswer[scoreType];
            }
        });
    }
    
    // Volver a la pregunta anterior
    session.currentQuestionId = session.history.pop();
    session.completed = false;
    
    res.json({
        success: true,
        data: {
            scores: session.scores
        }
    });
});

app.get('/api/quiz/results/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const session = sessions[sessionId];
    
    if (!session || !session.completed) {
        return res.json({
            success: false,
            message: 'Sesión no completada'
        });
    }
    
    // Generar recomendaciones basadas en múltiples puntuaciones
    const { scores } = session;
    
    // Lógica de perfil más sofisticada basada en tus puntuaciones
    let perfilRiesgo = 'Moderado';
    let cartera = {
        acciones: 30,
        bonos: 40,
        efectivo: 20,
        criptomonedas: 5,
        bonosVerdes: 5
    };
    
    // Ajustar perfil basado en puntuaciones múltiples
    if (scores.expoints > 15) { // Alto conocimiento
        if (scores.points > 20) { // Alta tolerancia al riesgo
            perfilRiesgo = 'Agresivo';
            cartera = {
                acciones: 60,
                criptomonedas: scores.criptoexposure > 10 ? 15 : 10,
                bonos: 15,
                bonosVerdes: scores.esg > 10 ? 10 : 5,
                efectivo: 5
            };
        }
    } else if (scores.expoints < 5) { // Bajo conocimiento
        perfilRiesgo = 'Conservador';
        cartera = {
            bonos: 50,
            efectivo: 30,
            acciones: 15,
            bonosVerdes: scores.esg > 5 ? 5 : 0,
            criptomonedas: 0
        };
    }
    
    // Ajustes adicionales basados en otras puntuaciones
    if (scores.fondoemergencia < 5) {
        // Aumentar efectivo si no tiene fondo de emergencia
        cartera.efectivo += 10;
        cartera.acciones -= 5;
        cartera.bonos -= 5;
    }
    
    if (scores.timevalue > 15) {
        // Más orientado al largo plazo
        cartera.acciones += 10;
        cartera.efectivo -= 10;
    }
    
    // ESG considerations
    if (scores.esg > 15) {
        cartera.bonosVerdes += 5;
        cartera.bonos -= 5;
    }
    
    const explicaciones = [
        `Perfil de conocimiento: ${scores.expoints}/30 puntos`,
        `Tolerancia al riesgo: ${scores.points}/30 puntos`,
        `Fondo de emergencia: ${scores.fondoemergencia > 10 ? 'Adecuado' : 'Mejorar'}`,
        `Horizonte temporal: ${scores.timevalue > 10 ? 'Largo plazo' : 'Corto/Medio plazo'}`,
        `Interés ESG: ${scores.esg > 10 ? 'Alto' : 'Moderado'}`,
        `Esta cartera se adapta a tu perfil integral de inversor`
    ];
    
    res.json({
        success: true,
        data: {
            recommendations: {
                perfilRiesgo,
                cartera,
                explicaciones,
                scores: scores, // Incluir puntuaciones detalladas
                totalAnswers: session.answers.length
            }
        }
    });
});

// Limpiar sesiones viejas cada hora
setInterval(() => {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    Object.keys(sessions).forEach(sessionId => {
        const sessionTime = parseInt(sessionId.split('_')[1]);
        if (sessionTime < oneHourAgo) {
            delete sessions[sessionId];
        }
    });
}, 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api`);
});