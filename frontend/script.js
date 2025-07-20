
let currentQuestionIndex = 0;
let selectedAnswers = [];
let score = 0;
let exscore = 0;
let criptoencartera = 0;
let perfilSeleccionado;
let timeValueGlobal = 0;
let fondoEmergenciaGlobal = 0;

// Base de cartera inicial
const cartera = {
    bonos: 50,
    acciones: 40,
    criptomonedas: 0,
    bonosVerdes: 0,
    efectivo:10,
};

// Función para mostrar la siguiente pregunta
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];

        questionContainer.innerHTML = `
            <h4>${question.section}</h4>
            <p>${question.question}</p>
            <p>${question.explanation}</p>
            ${question.answers.map((answer, index) => `
                <label>
                    <button onclick="selectAnswer(${answer.conopoints || 0}, ${answer.points || 0}, ${answer.fondoemergencia || 0}, ${answer.criptoExposure || 0}, ${answer.Expoints || 0}, ${answer.timeValue || 0}, ${answer.nextQuestion || null})">${answer.text}</button>
                </label>
            `).join('')}
        `;
        updateProgressBar();
    } else {
        showResult(); // Si se han respondido todas las preguntas
    }
}
// Función para actualizar el puntuacion total, de experiencia y de criptomonedas
function updateScore(conopoints, Expoints, points, criptoExposure, timeValue, fondoemergencia) {
    timeValueGlobal += timeValue;
    score += Expoints + conopoints + points; // Sumar los puntos a score
    exscore += Expoints; // sumar puntos de experiencia
    criptoencartera += criptoExposure; // sumar puntos de criptomonedas
    fondoEmergenciaGlobal += fondoemergencia;
}
// Función para actualizar la barra de progreso
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100; // Calcula el porcentaje
    progressBar.style.width = `${progressPercentage}%`; // Actualiza el ancho de la barra
}
// Función para asegurarse de que las posiciones no sean negativas
function asegurarPositivos(cartera) {
    Object.keys(cartera).forEach(key => {
        cartera[key] = Math.max(0, cartera[key]);
    });
}
// Función para normalizar la cartera y asegurarse de que no supere el 100%
function normalizarCartera(cartera) {
    let total = Object.values(cartera).reduce((acc, val) => acc + val, 0);
    if (total > 100) {
        Object.keys(cartera).forEach(key => {
            cartera[key] = (cartera[key] / total) * 100;
        });
    }
}

// Función para ajustar la cartera según el horizonte temporal
function ajustarCarteraPorTiempo(cartera, timeValueGlobal) {
    if (timeValueGlobal === 1) {
        cartera.bonos += 20;
        cartera.acciones -= 10;
    } else if (timeValueGlobal === 2) {
        cartera.bonos += 5;
        cartera.acciones -= 5;
    } else if (timeValueGlobal === 3) {
        cartera.bonos -= 10;
        cartera.acciones += 17;
    } else {
        cartera.bonos -= 15;
        cartera.acciones += 25;
    }
    asegurarPositivos(cartera);
    normalizarCartera(cartera);
}

//ajustar cartera segun el perfil de riesgo
function ajustarCarteraPorPerfil (cartera, score) {
        if (score <= 25) {
            perfilSeleccionado = 'Bajo Riesgo';
            cartera.bonos += 20; // Aumentar bonos
            cartera.acciones -= 10; // Reducir acciones
        } else if (score <= 50) {
            perfilSeleccionado = 'Riesgo Moderado';
            // No hay ajuste, mantener cartera base
        } else {
        perfilSeleccionado = 'Alto Riesgo';
        cartera.bonos -= 10; // Reducir bonos
        cartera.acciones += 20; // Aumentar acciones
        }
    asegurarPositivos(cartera);
    normalizarCartera(cartera);
}

//ajustar cartera segun preferencias de criptomonedas
function ajustarCarteraCriptomoneda (cartera, criptoencartera) {
    if (criptoencartera === 0) {
        cartera.bonos += 0;
        cartera.acciones -= 0; // Reducir acciones
        // No hay ajuste, mantener cartera base
    } else if (criptoencartera === 1) {
        cartera.bonos += 0; 
        cartera.acciones -= 5; // Reducir acciones
        cartera.criptomonedas += 5; // Aumentar criptomonedas
    } else if (criptoencartera === 2) {
        cartera.bonos += 0; // Aumentar bonos
        cartera.acciones -= 7; // Reducir acciones
        cartera.criptomonedas += 7; // Aumentar criptomonedas
    } else if (criptoencartera === 3) {
        cartera.bonos -= 3; // Aumentar bonos
        cartera.acciones -= 7; // Reducir acciones
        cartera.criptomonedas += 10; // Aumentar criptomonedas
    } else if (criptoencartera === 4) {
        cartera.bonos -= 5; // Aumentar bonos
        cartera.acciones -= 10; // Reducir acciones
        cartera.criptomonedas += 15; // Aumentar criptomonedas
    } else {
        cartera.bonos -= 8; // Aumentar bonos
        cartera.acciones -= 12; // Reducir acciones
        cartera.criptomonedas += 20; // Aumentar criptomonedas
    }
asegurarPositivos(cartera);
normalizarCartera(cartera);
}


// Función para manejar la selección de respuesta
function selectAnswer (points, conopoints, fondoemergencia, criptoExposure, Expoints, timeValue, nextQuestion) {
    if (nextQuestion) {
        const nextIndex = questions.findIndex(question => question.id === nextQuestion);
        if (nextIndex !== -1) {
            currentQuestionIndex = nextIndex;
        } else {
            currentQuestionIndex++; // Si no hay siguiente, pasa a la siguiente pregunta
        }
    } else {
        currentQuestionIndex++;
    }
    updateScore(conopoints, points, Expoints, criptoExposure, timeValue, fondoemergencia);
    showQuestion();
    asegurarPositivos(cartera);
    normalizarCartera(cartera);
}


// Función para mostrar el resultado final
function showResult() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result');

    // Ocultar el contenedor de preguntas y mostrar el contenedor de resultados
    questionContainer.classList.add('hidden');
    document.getElementById('progress-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');

    ajustarCarteraPorTiempo(cartera, timeValueGlobal);
    ajustarCarteraPorPerfil(cartera, score);
    ajustarCarteraCriptomoneda(cartera, criptoencartera);

    asegurarPositivos(cartera); // Asegúrate de que las posiciones no sean negativas
    // Asegurarse de que la suma de la cartera no supere el 100%
    normalizarCartera(cartera);
    
    // Mostrar el resultado
    let carteraMessage = `<h4>Tu cartera recomendada:</h4><ul>`;

    // Solo mostrar los activos que son mayores que 0
    if (cartera.bonos > 0) {
        carteraMessage += `<li>Bonos: ${cartera.bonos.toFixed(2)}%</li>`;
    }
    if (cartera.acciones > 0) {
        carteraMessage += `<li>Acciones: ${cartera.acciones.toFixed(2)}%</li>`;
    }
    if (cartera.criptomonedas > 0) {
        carteraMessage += `<li>Criptomonedas: ${cartera.criptomonedas.toFixed(2)}%</li>`;
    }
    if (cartera.efectivo > 0) {
        carteraMessage += `<li>Efectivo: ${cartera.efectivo.toFixed(2)}%</li>`;
    }

    carteraMessage += `</ul>`;
    // Empezamos informe
    let informe = `<p>El fondo de emergencia es muy importante como colchón ante imprevistos y permite al inversor invertir con mucha comodidad el resto de su dinero liquido. 
    El fondo de emergencia no es parte de la liquidez disponible dentro de la cartera.<p><ul>`;
    if (fondoEmergenciaGlobal === 0) {
        informe += `<p>Si no tienes fondo de emergencia es muy importante que generes uno con los próximos ahorros que dispongas, al menos deberías tener 6 meses de tus gastos ahorrados antes de plantearte invertir.</p>`;
    }
    if (fondoEmergenciaGlobal === 1) {
        informe += `<p>Bien, tienes un pequeño fondo de emergencia disponible. Lo recomendado es tener 6 meses de gastos ahorrados, pero depende de cada uno.</p>`;
    }
    if (fondoEmergenciaGlobal === 2) {
        informe += `<p>Genial, tienes alrededror de 5 meses de gastos ahorrados, lo recomendado son 6 meses así que estás listo para invertir tu excedente de ahorro.</p>`;
    }
    if (fondoEmergenciaGlobal === 3) {
        informe += `<p>Genial, con más de 6 meses tienes un fondo de emergencia amplio, lo recomendable son 6 meses, pero si te sientes más cómodo puedes disponer de más fondo de emergencia. El resto está listo para ser invertido y obtener rentabilidad.</p>`;
    }
    
    resultContainer.innerHTML = `
        <h4>Resultado:</h4>
        <h3>Tu perfil de riesgo: ${perfilSeleccionado}</h3>
        ${carteraMessage}
        <h4>Informe:</h4>
        ${informe}

    `;
}

// Agregar un evento al botón de comenzar
document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('quiz-container').querySelector('#start-button').classList.add('hidden');
    document.getElementById('progress-container').classList.remove('hidden'); // Muestra la barra de progreso
    document.getElementById('question-container').classList.remove('hidden');
    showQuestion(); // Inicia el cuestionario
});
