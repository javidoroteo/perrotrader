// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Global variables
let sessionId = null;
let currentQuestion = null;
let questionHistory = [];

// Initialize quiz
document.getElementById('start-button').addEventListener('click', async function() {
    try {
        // Create session
        const response = await fetch(`${API_BASE_URL}/quiz/start`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            sessionId = data.data.sessionId;
            localStorage.setItem('quizSessionId', sessionId);
            
            // Hide start button and show quiz
            document.getElementById('start-button').classList.add('hidden');
            document.getElementById('progress-container').classList.remove('hidden');
            document.getElementById('question-container').classList.remove('hidden');
            
            // Load first question
            await loadQuestion();
        } else {
            alert('Error al iniciar el cuestionario');
        }
    } catch (error) {
        console.error('Error starting quiz:', error);
        alert('Error de conexión');
    }
});

// Check for existing session on page load
window.addEventListener('load', async function() {
    const savedSessionId = localStorage.getItem('quizSessionId');
    if (savedSessionId) {
        sessionId = savedSessionId;
        try {
            await loadQuestion();
            document.getElementById('start-button').classList.add('hidden');
            document.getElementById('progress-container').classList.remove('hidden');
            document.getElementById('question-container').classList.remove('hidden');
        } catch (error) {
            // Session expired or invalid, clear it
            localStorage.removeItem('quizSessionId');
            sessionId = null;
        }
    }
});

// Load current question
async function loadQuestion() {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/question/${sessionId}`);
        const data = await response.json();
        
        if (data.success) {
            currentQuestion = data.data;
            displayQuestion(currentQuestion);
            updateProgressBar();
        } else {
            if (data.message.includes('completado')) {
                await showResults();
            } else {
                throw new Error(data.message);
            }
        }
    } catch (error) {
        console.error('Error loading question:', error);
        alert('Error al cargar la pregunta');
    }
}

// Display question
function displayQuestion(questionData) {
    const { question, progress, canGoBack } = questionData;
    const questionContainer = document.getElementById('question-container');

    let backButton = '';
    if (canGoBack) {
        backButton = '<button id="back-button" onclick="goToPreviousQuestion()" style="background-color: #95a5a6; margin-right: 10px;">← Anterior</button>';
    }

    questionContainer.innerHTML = `
        <h4>${question.section}</h4>
        <p><strong>${question.question}</strong></p>
        ${question.explanation ? `<p class="explanation">${question.explanation}</p>` : ''}
        <div id="navigation-buttons">
            ${backButton}
        </div>
        <div id="answers">
            ${question.answers.map((answer, index) => `
                <label>
                    <button onclick="selectAnswer(${index})">${answer.text}</button>
                </label>
            `).join('')}
        </div>
    `;
}

// Select answer
async function selectAnswer(answerIndex) {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId,
                questionId: currentQuestion.question.id,
                answerIndex
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            if (data.data.completed) {
                await showResults();
            } else {
                await loadQuestion();
            }
        } else {
            alert('Error al guardar respuesta');
        }
    } catch (error) {
        console.error('Error saving answer:', error);
        alert('Error de conexión');
    }
}

// Go to previous question
async function goToPreviousQuestion() {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/previous`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId })
        });
        
        const data = await response.json();
        
        if (data.success) {
            await loadQuestion();
        } else {
            alert('No se puede volver a la pregunta anterior');
        }
    } catch (error) {
        console.error('Error going back:', error);
        alert('Error de conexión');
    }
}

// Show results
async function showResults() {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/results/${sessionId}`);
        const data = await response.json();
        
        if (data.success) {
            displayResults(data.data);
            // Clean up session
            localStorage.removeItem('quizSessionId');
        } else {
            alert('Error al obtener resultados');
        }
    } catch (error) {
        console.error('Error loading results:', error);
        alert('Error de conexión');
    }
}

// Display results
function displayResults(results) {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result');
    const progressContainer = document.getElementById('progress-container');

    // Hide question container and progress bar
    questionContainer.classList.add('hidden');
    progressContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const { recommendations } = results;
    const { perfilRiesgo, cartera, explicaciones } = recommendations;

    // Build portfolio display
    let carteraMessage = '<h4>Tu cartera recomendada:</h4><ul>';
    Object.entries(cartera).forEach(([asset, percentage]) => {
        if (percentage > 0) {
            const assetNames = {
                bonos: 'Bonos',
                acciones: 'Acciones',
                criptomonedas: 'Criptomonedas',
                bonosVerdes: 'Bonos Verdes',
                efectivo: 'Efectivo'
            };
            carteraMessage += `<li>${assetNames[asset]}: ${percentage.toFixed(1)}%</li>`;
        }
    });
    carteraMessage += '</ul>';

    // Build explanations
    let explicacionesMessage = '<h4>¿Por qué esta cartera?</h4><ul>';
    explicaciones.forEach(explicacion => {
        explicacionesMessage += `<li>${explicacion}</li>`;
    });
    explicacionesMessage += '</ul>';

    resultContainer.innerHTML = `
        <h3>Resultado: ${perfilRiesgo}</h3>
        ${carteraMessage}
        ${explicacionesMessage}
        <div style="margin-top: 20px;">
            <button onclick="startNewQuiz()" style="background-color: #27ae60;">Hacer nuevo cuestionario</button>
            <button onclick="downloadResults()" style="background-color: #3498db; margin-left: 10px;">Descargar resultados</button>
        </div>
    `;
}

// Update progress bar
function updateProgressBar() {
    if (currentQuestion && currentQuestion.progress) {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${currentQuestion.progress.percentage}%`;
    }
}

// Start new quiz
function startNewQuiz() {
    sessionId = null;
    currentQuestion = null;
    questionHistory = [];
    localStorage.removeItem('quizSessionId');
    
    // Reset UI
    document.getElementById('result').classList.add('hidden');
    document.getElementById('start-button').classList.remove('hidden');
    
    // Reset progress bar
    document.getElementById('progress-bar').style.width = '0%';
}

// Download results (placeholder)
function downloadResults() {
    alert('Función de descarga en desarrollo');
    // TODO: Implement PDF generation
}

// Error handling for fetch requests
function handleFetchError(error) {
    console.error('Fetch error:', error);
    alert('Error de conexión. Por favor, verifica tu conexión a internet.');
}
