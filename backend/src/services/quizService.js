const { PrismaClient } = require('../utils/prismaCLients');
const questions = require('../data/questions');

class QuizService {
    // Crear una nueva sesión de cuestionario
    async createQuizSession() {
        const sessionId = this.generateSessionId();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

        const session = await prisma.quizSession.create({
            data: {
                sessionId,
                expiresAt,
                currentQuestionId: 101, // Empezamos con la primera pregunta
                answers: {},
                scores: {
                    score: 0,
                    exscore: 0,
                    criptoencartera: 0,
                    timeValueGlobal: 0,
                    emergencyFund: 0
                }
            }
        });

        return session;
    }

    // Obtener sesión por ID
    async getSession(sessionId) {
        const session = await prisma.quizSession.findFirst({
            where: {
                sessionId,
                expiresAt: {
                    gt: new Date()
                }
            }
        });

        if (!session) {
            throw new Error('Sesión no encontrada o expirada');
        }

        return session;
    }

    // Guardar respuesta y actualizar sesión
    async saveAnswer(sessionId, questionId, answerIndex, answerData) {
        const session = await this.getSession(sessionId);
        
        // Actualizar answers
        const updatedAnswers = { ...session.answers };
        updatedAnswers[questionId] = {
            answerIndex,
            answerData,
            timestamp: new Date()
        };

        // Actualizar scores
        const updatedScores = { ...session.scores };
        if (answerData.conopoints) updatedScores.score += answerData.conopoints;
        if (answerData.points) updatedScores.score += answerData.points;
        if (answerData.Expoints) {
            updatedScores.exscore += answerData.Expoints;
            updatedScores.score += answerData.Expoints;
        }
        if (answerData.criptoExposure) updatedScores.criptoencartera += answerData.criptoExposure;
        if (answerData.timeValue) updatedScores.timeValueGlobal += answerData.timeValue;
        if (answerData.emergencyFund) updatedScores.emergencyFund += answerData.emergencyFund;

        // Determinar siguiente pregunta
        let nextQuestionId = answerData.nextQuestion || this.getNextQuestionId(questionId);

        const updatedSession = await prisma.quizSession.update({
            where: { id: session.id },
            data: {
                answers: updatedAnswers,
                scores: updatedScores,
                currentQuestionId: nextQuestionId
            }
        });

        return updatedSession;
    }

    // Obtener pregunta anterior
    async getPreviousQuestion(sessionId) {
        const session = await this.getSession(sessionId);
        const answeredQuestions = Object.keys(session.answers).map(Number).sort((a, b) => b - a);
        
        if (answeredQuestions.length === 0) {
            return null; // No hay preguntas anteriores
        }

        const previousQuestionId = answeredQuestions[0];
        
        // Eliminar la última respuesta y recalcular scores
        const updatedAnswers = { ...session.answers };
        const lastAnswer = updatedAnswers[previousQuestionId];
        delete updatedAnswers[previousQuestionId];

        // Recalcular scores eliminando los puntos de la respuesta eliminada
        const updatedScores = { ...session.scores };
        if (lastAnswer.answerData.conopoints) updatedScores.score -= lastAnswer.answerData.conopoints;
        if (lastAnswer.answerData.points) updatedScores.score -= lastAnswer.answerData.points;
        if (lastAnswer.answerData.Expoints) {
            updatedScores.exscore -= lastAnswer.answerData.Expoints;
            updatedScores.score -= lastAnswer.answerData.Expoints;
        }
        if (lastAnswer.answerData.criptoExposure) updatedScores.criptoencartera -= lastAnswer.answerData.criptoExposure;
        if (lastAnswer.answerData.timeValue) updatedScores.timeValueGlobal -= lastAnswer.answerData.timeValue;
        if (lastAnswer.answerData.emergencyFund) updatedScores.emergencyFund -= lastAnswer.answerData.emergencyFund;

        await prisma.quizSession.update({
            where: { id: session.id },
            data: {
                answers: updatedAnswers,
                scores: updatedScores,
                currentQuestionId: previousQuestionId
            }
        });

        return previousQuestionId;
    }

// Calcular progreso del cuestionario
calculateProgress(answeredQuestions, totalQuestions) {
    const current = answeredQuestions + 1;
    const percentage = Math.round((current / totalQuestions) * 100);
    
    return {
        current,
        total: totalQuestions,
        percentage: Math.min(percentage, 100) // Asegurar que no exceda 100%
    };
}

// También agregar esta función auxiliar que usa tu controlador
getQuestionById(questionId) {
    const { questions } = require('../data/questions');
    return questions.find(q => q.id === questionId);
}

// Y esta función que también necesitas
isQuizComplete(questionId) {
    // Retorna true si no hay más preguntas o si llegamos al final
    return questionId === null || questionId === undefined;
}

// Función para guardar estadísticas anónimas (que también usa tu controlador)
async saveAnonymousStats(session, result) {
    try {
        // Aquí puedes implementar lógica para guardar estadísticas anónimas
        // Por ejemplo, contar cuántos usuarios han completado el quiz, etc.
        console.log('Guardando estadísticas anónimas...', {
            riskProfile: result.riskProfile,
            completedAt: new Date(),
            totalAnswers: session.answers?.length || 0
        });
    } catch (error) {
        console.error('Error saving anonymous stats:', error);
        // No lanzar error ya que esto es opcional
    }
}
    // Obtener la siguiente pregunta
    getQuestionById(id) {
        return questions.find(q => q.id === id);
    }

    getNextQuestionId(currentId) {
        // Lógica simple para obtener siguiente pregunta si no hay nextQuestion especificado
        // Esto debería ser más sofisticado en una implementación real
        const questionIds = [101, 1011, 1012, 1013, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 201, 202, 203, 204, 205, 206, 207, 208, 2017, 301, 302, 303, 304, 305, 306, 307, 401, 402, 403, 404, 501, 502, 503, 504];
        const currentIndex = questionIds.indexOf(currentId);
        return currentIndex < questionIds.length - 1 ? questionIds[currentIndex + 1] : null;
    }

    generateSessionId() {
        return 'quiz_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}

module.exports = new QuizService();