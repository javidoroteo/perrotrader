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

    // Calcular cartera recomendada
    calculatePortfolio(scores, answers) {
        // Base de cartera inicial
        const cartera = {
            bonos: 50,
            acciones: 40,
            criptomonedas: 0,
            bonosVerdes: 0,
            efectivo: 10,
        };

        // Ajustar por tiempo
        this.ajustarCarteraPorTiempo(cartera, scores.timeValueGlobal);
        
        // Ajustar por perfil de riesgo
        this.ajustarCarteraPorPerfil(cartera, scores.score);
        
        // Ajustar por criptomonedas
        this.ajustarCarteraCriptomoneda(cartera, scores.criptoencartera);

        // Verificar ESG
        const esgPreference = this.getESGPreference(answers);
        if (esgPreference > 0) {
            this.ajustarCarteraESG(cartera, esgPreference);
        }

        this.asegurarPositivos(cartera);
        this.normalizarCartera(cartera);

        return cartera;
    }

    // Métodos auxiliares para ajustar cartera
    ajustarCarteraPorTiempo(cartera, timeValueGlobal) {
        if (timeValueGlobal === 1) {
            cartera.bonos += 20;
            cartera.acciones -= 10;
        } else if (timeValueGlobal === 2) {
            cartera.bonos += 5;
            cartera.acciones -= 5;
        } else if (timeValueGlobal === 3) {
            cartera.bonos -= 10;
            cartera.acciones += 17;
        } else if (timeValueGlobal >= 4) {
            cartera.bonos -= 15;
            cartera.acciones += 25;
        }
    }

    ajustarCarteraPorPerfil(cartera, score) {
        let perfilSeleccionado;
        if (score <= 25) {
            perfilSeleccionado = 'Bajo Riesgo';
            cartera.bonos += 20;
            cartera.acciones -= 10;
        } else if (score <= 50) {
            perfilSeleccionado = 'Riesgo Moderado';
        } else {
            perfilSeleccionado = 'Alto Riesgo';
            cartera.bonos -= 10;
            cartera.acciones += 20;
        }
        return perfilSeleccionado;
    }

    ajustarCarteraCriptomoneda(cartera, criptoencartera) {
        if (criptoencartera === 1) {
            cartera.acciones -= 5;
            cartera.criptomonedas += 5;
        } else if (criptoencartera === 2) {
            cartera.acciones -= 7;
            cartera.criptomonedas += 7;
        } else if (criptoencartera === 3) {
            cartera.bonos -= 3;
            cartera.acciones -= 7;
            cartera.criptomonedas += 10;
        } else if (criptoencartera >= 4) {
            cartera.bonos -= 5;
            cartera.acciones -= 10;
            cartera.criptomonedas += 15;
        }
    }

    ajustarCarteraESG(cartera, esgLevel) {
        if (esgLevel >= 1) {
            const bonosVerdesAllocation = Math.min(10 * esgLevel, 30);
            cartera.bonos -= bonosVerdesAllocation / 2;
            cartera.acciones -= bonosVerdesAllocation / 2;
            cartera.bonosVerdes += bonosVerdesAllocation;
        }
    }

    asegurarPositivos(cartera) {
        Object.keys(cartera).forEach(key => {
            cartera[key] = Math.max(0, cartera[key]);
        });
    }

    normalizarCartera(cartera) {
        let total = Object.values(cartera).reduce((acc, val) => acc + val, 0);
        if (total > 100) {
            Object.keys(cartera).forEach(key => {
                cartera[key] = (cartera[key] / total) * 100;
            });
        }
    }

    getESGPreference(answers) {
        // Buscar respuestas relacionadas con ESG
        for (const [questionId, answer] of Object.entries(answers)) {
            if (answer.answerData.esg) {
                return answer.answerData.esg;
            }
        }
        return 0;
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

    // Generar recomendaciones detalladas
    generateRecommendations(cartera, scores, answers) {
        const perfilRiesgo = this.ajustarCarteraPorPerfil({ bonos: 50, acciones: 40, criptomonedas: 0, bonosVerdes: 0, efectivo: 10 }, scores.score);
        
        let recomendaciones = {
            perfilRiesgo,
            cartera,
            explicaciones: []
        };

        // Explicaciones basadas en el perfil
        if (perfilRiesgo === 'Bajo Riesgo') {
            recomendaciones.explicaciones.push('Tu perfil conservador se refleja en una mayor asignación a bonos, que ofrecen estabilidad y menor volatilidad.');
        } else if (perfilRiesgo === 'Alto Riesgo') {
            recomendaciones.explicaciones.push('Tu perfil agresivo permite una mayor exposición a acciones, con potencial de mayores retornos a largo plazo.');
        }

        // Explicaciones sobre horizonte temporal
        if (scores.timeValueGlobal <= 2) {
            recomendaciones.explicaciones.push('Dado tu horizonte temporal más corto, hemos aumentado la asignación a activos más estables.');
        } else if (scores.timeValueGlobal >= 3) {
            recomendaciones.explicaciones.push('Tu horizonte temporal largo permite aprovechar el potencial de crecimiento de las acciones.');
        }

        // Explicaciones sobre criptomonedas
        if (scores.criptoencartera > 0) {
            recomendaciones.explicaciones.push('Hemos incluido criptomonedas según tu nivel de comodidad, como diversificación y potencial de alto crecimiento.');
        }

        // Explicaciones sobre fondo de emergencia
        if (scores.emergencyFund === 0) {
            recomendaciones.explicaciones.push('IMPORTANTE: Te recomendamos encarecidamente crear un fondo de emergencia antes de invertir.');
        }

        return recomendaciones;
    }
}

module.exports = new QuizService();