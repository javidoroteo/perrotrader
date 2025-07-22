const API_BASE_URL = 'http://localhost:3000/api';

let sessionId = null;
let currentQuestion = null;
let isCompleted = false;

// Initialize quiz
document.getElementById('start-button').addEventListener('click', async function() {
    try {
        // Create session
        const response = await fetch(`${API_BASE_URL}/quiz/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            sessionId = data.data.sessionId;
            
            // Hide start button and show quiz
            document.getElementById('start-button').classList.add('hidden');
            document.getElementById('progress-container').classList.remove('hidden');
            document.getElementById('question-container').classList.remove('hidden');
            
            // Load first question
            await loadQuestion();
        } else {
            alert('Error al iniciar el cuestionario: ' + data.message);
        }
    } catch (error) {
        console.error('Error starting quiz:', error);
        alert('Error de conexión con el servidor');
    }
});

// Function to load current question
async function loadQuestion() {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/question/${sessionId}`);
        const data = await response.json();
        
        if (data.success) {
            currentQuestion = data.data.question;
            const progress = data.data.progress;
            
            displayQuestion(currentQuestion);
            updateProgressBar(progress.percentage);
            
        } else {
            if (data.message === 'Cuestionario completado') {
                await showResults();
            } else {
                alert('Error: ' + data.message);
            }
        }
    } catch (error) {
        console.error('Error loading question:', error);
        alert('Error de conexión al cargar la pregunta');
    }
}

// Function to display question
function displayQuestion(question) {
    const questionContainer = document.getElementById('question-container');
    
    let answersHTML = question.answers.map((answer, index) => `
        <label>
            <button onclick="selectAnswer(${index})">${answer.text}</button>
        </label>
    `).join('');
    
    questionContainer.innerHTML = `
        <h4>${question.section}</h4>
        <p><strong>${question.question}</strong></p>
        ${question.explanation ? `<p class="explanation">${question.explanation}</p>` : ''}
        ${answersHTML}
    `;
}

// Function to handle answer selection
async function selectAnswer(answerIndex) {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: sessionId,
                questionId: currentQuestion.id,
                answerIndex: answerIndex
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            if (data.data.completed) {
                // Quiz completed, show results
                await showResults();
            } else {
                // Load next question
                await loadQuestion();
            }
        } else {
            alert('Error al procesar respuesta: ' + data.message);
        }
    } catch (error) {
        console.error('Error submitting answer:', error);
        alert('Error de conexión al enviar respuesta');
    }
}

// Function to update progress bar
function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${percentage}%`;
}

// Function to show final results
async function showResults() {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/results/${sessionId}`);
        const data = await response.json();
        
        if (data.success) {
            const { recommendations } = data.data;
            
            // Hide question container and progress bar
            document.getElementById('question-container').classList.add('hidden');
            document.getElementById('progress-container').classList.add('hidden');
            
            // Show results
            const resultContainer = document.getElementById('result');
            resultContainer.classList.remove('hidden');
            
            // Build portfolio display
            let carteraHTML = '<h4>Tu cartera recomendada:</h4><ul>';
            Object.entries(recommendations.cartera).forEach(([asset, percentage]) => {
                if (percentage > 0) {
                    const assetName = getAssetDisplayName(asset);
                    carteraHTML += `<li>${assetName}: ${percentage.toFixed(1)}%</li>`;
                }
            });
            carteraHTML += '</ul>';
            
            // Build explanations
            let explicacionesHTML = '<h4>Explicación de tu perfil:</h4><ul>';
            recommendations.explicaciones.forEach(explicacion => {
                explicacionesHTML += `<li>${explicacion}</li>`;
            });
            explicacionesHTML += '</ul>';
            
            resultContainer.innerHTML = `
                <h2>¡Resultados de tu cuestionario!</h2>
                <h3>Perfil de riesgo: ${recommendations.perfilRiesgo}</h3>
                ${carteraHTML}
                ${explicacionesHTML}
                <div style="margin-top: 20px;">
                    <button onclick="restartQuiz()">Hacer el cuestionario de nuevo</button>
                </div>
            `;
            
        } else {
            alert('Error al obtener resultados: ' + data.message);
        }
    } catch (error) {
        console.error('Error loading results:', error);
        alert('Error de conexión al cargar resultados');
    }
}

// Function to get display names for assets
function getAssetDisplayName(asset) {
    const displayNames = {
        'acciones': 'Acciones',
        'bonos': 'Bonos',
        'efectivo': 'Efectivo',
        'criptomonedas': 'Criptomonedas',
        'bonosVerdes': 'Bonos Verdes'
    };
    return displayNames[asset] || asset;
}

// Function to restart quiz
function restartQuiz() {
    // Reset variables
    sessionId = null;
    currentQuestion = null;
    isCompleted = false;
    
    // Reset UI
    document.getElementById('result').classList.add('hidden');
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('progress-container').classList.add('hidden');
    document.getElementById('start-button').classList.remove('hidden');
    
    // Reset progress bar
    document.getElementById('progress-bar').style.width = '0%';
}
