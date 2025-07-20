//Las preguntas
const questions = [
    // Sección 1: Perfil del inversor
    {
        id: 101,
        section: "Conociendote",
        question: "¿Cuál es tu edad?",
        explanation: "",
        answers: [
            { text: "Entre 18 y 25 años", conopoints: 0, nextQuestion: 1011 },
            { text: "Entre 26 y 30 años", conopoints: 0, nextQuestion: 1011},
            { text: "Entre 31 y 35 años", conopoints: 0, nextQuestion: 1012 },
            { text: "Entre 36 y 45 años", conopoints: 0, nextQuestion: 1012},
            { text: "Entre 46 y 55 años", conopoints: 0, nextQuestion: 1013},
            { text: "Entre 56 y 66 años", conopoints: 0, nextQuestion: 1013},
            { text: "66 años o más", conopoints: 0, nextQuestion: 1013},
        ]
    },
    {
        id: 1011,
        section: "Conociendote",
        question: "¿Cuál es tu patrimonio liquido?",
        explanation: "No incluye inversión en una casa o tu coche. Calcula ahorros e inversiones que tengas actualmente",
        answers: [
            { text: "Menos de 5.000€", conopoints: 0, nextQuestion: 102 },
            { text: "Entre 5.001€ y 15.000€", conopoints: 1, nextQuestion: 102 },
            { text: "Entre 15.001€ y 30.000€", conopoints: 2, nextQuestion: 102 },
            { text: "Más de 30.000€", conopoints: 3, nextQuestion: 102 },
        ]
    },
    {
        id: 1012,
        section: "Conociendote",
        question: "¿Cuál es tu patrimonio liquido?",
        explanation: "No incluye inversión en una casa o tu coche. Calcula ahorros e inversiones que tengas actualmente",
        answers: [
            { text: "Menos de 10.000€", conopoints: 0, nextQuestion: 102 },
            { text: "Entre 10.001€ y 25.000€", conopoints: 1, nextQuestion: 102 },
            { text: "Entre 25.001€ y 45.000€", conopoints: 2, nextQuestion: 102 },
            { text: "Más de 45.000€", conopoints: 3, nextQuestion: 102 },
        ]
    },
    {
        id: 1013,
        section: "Conociendote",
        question: "¿Cuál es tu patrimonio liquido?",
        explanation: "No incluye inversión en una casa o tu coche. Calcula ahorros e inversiones que tengas actualmente",
        answers: [
            { text: "Menos de 15.000€", conopoints: 0, nextQuestion: 102 },
            { text: "Entre 15.001€ y 30.000€", conopoints: 1, nextQuestion: 102 },
            { text: "Entre 30.001€ y 55.000€", conopoints: 2, nextQuestion: 102 },
            { text: "Más de 55.000€", conopoints: 3, nextQuestion: 102 },
        ]
    },
    {
        id: 102,
        section: "Conociendote",
        question: "¿Cuál es tu ingreso mensual neto?",
        explanation: "Si  tienes varias fuentes de ingreso sumalas todas",
        answers: [
            { text: "Menos de 1.000€", conopoints: 0 },
            { text: "Entre 1.001€ y 2.000€", conopoints: 0 },
            { text: "Entre 2.001€ y 5.000€", conopoints: 1},
            { text: "Entre 5.001€ y 10.000€", conopoints: 2 },
            { text: "Más de 10.001€", conopoints: 3 },
        ]
    },
    {
        id: 103,
        section: "Conociendote",
        question: "¿Cuál es tu ahorro mensual aproximado?",
        explanation: "Incluye los destinados a ahorro e inversión",
        answers: [
            { text: "0% - 5%", conopoints: 0, timeValue: 0 },
            { text: "6% - 10%", conopoints: 1, timeValue: 0},
            { text: "11% - 20%", conopoints: 2, timeValue: 0 },
            { text: "20% - 30%", conopoints: 3 , timeValue: 0},
            { text: "Más de 30%", conopoints: 4, timeValue: 0 },
        ]
    },
    {
        id: 104,
        section: "Conociendote",
        question: "¿Tienes un fondo de emergencia?",
        explanation: "El fondo de emergencia es un dinero ahorrado que debería cubrir los gastos de 6 meses o más",
        answers: [
            { text: "No, no tengo.", conopoints: 0, fondoemergencia: 0},
            { text: "Sí, pero es menor a 3 meses de gasto.", conopoints: 1, fondoemergencia: 1 },
            { text: "Sí, es moderado, es de alrededor de 5 meses.", conopoints: 2, fondoemergencia: 2},
            { text: "Sí, es suficiente para más de 6 meses.", conopoints: 4, fondoemergencia: 3},
        ]
    },
    {
        id: 106,
        section: "Conociendote",
        question: "¿Tienes obligaciones financieras futuras significativas?",
        explanation: "",
        answers: [
            { text: "Sí, son significativas (Hipoteca, Préstamo del coche...) ", conopoints: -1 },
            { text: "Sí, pero solo requieren pagos moderados u ocasionales (Deuda personal pequeña o vacaciones planificadas).", conopoints: 0 },
            { text: "No, no tengo ninguna obligación financiera importante.", conopoints: 3 },
        ]
    },
    {
        id: 107,
        section: "Conociendote",
        question: "¿Estás dispuesto a invertir mensualmente una parte de tu ingreso?",
        explanation: "",
        answers: [
            { text: "No, no puedo. Sólo ahorros que ya dispongo.", conopoints: 0 },
            { text: "Sí, una pequeña cantidad.", conopoints: 1 },
            { text: "Sí, una cantidad moderada.", conopoints: 2 },
            { text: "Sí, una cantidad significativa.", conopoints: 3 },
        ]
    },
    {
        id: 108,
        section: "Objetivos de Inversión",
        question: "¿Cuál es tu objetivo principal al invertir?",
        explanation: "",
        answers: [
            { "text": "Aumentar mi patrimonio a largo plazo", nextQuestion: 109 },
            { "text": "Ahorrar para la jubilación", nextQuestion: 111 },
            { "text": "Comprar una casa", nextQuestion: 112 },
            { "text": "Generar ingresos pasivos", nextQuestion: 113 },
            { "text": "Ahorrar para la educación de mis hijos", nextQuestion: 115 },
        ]
    },
    {
        id: 109,
        section: "Riesgo y Crecimiento",
        question: "¿Cuál consideras que es tu horizonte temporal de largo plazo?",
        explanation: "",
        answers: [
            { text: "3 años o menos", timeValue: 1, nextQuestion: 201},
            { text: "De 3 a 5 años", timeValue: 2, nextQuestion: 201},
            { text: "De 5 a 10 años", timeValue: 3, nextQuestion: 201},
            { text: "Más de 10 años", timeValue: 4, nextQuestion: 201}
        ]
    },
    {
        id: 110,
        section: "Riesgo y Crecimiento",
        question: "¿Estarías dispuesto a asumir un riesgo alto para obtener un mayor rendimiento?",
        explanation: "",
        answers: [
            { text: "Sí, estoy dispuesto", conopoints: 1, nextQuestion: 201},
            { text: "Tal vez, dependiendo de la situación", nextQuestion: 201},
            { text: "No, prefiero mantener mi capital seguro", nextQuestion: 201}
        ]
    },
    {
        id: 111,
        section: "Horizonte de Inversión",
        question: "¿En cuántos años planeas jubilarte?",
        explanation: "",
        answers: [
            { text: "3 años o menos", timeValue: 1, nextQuestion: 201},
            { text: "De 3 a 5 años", timeValue: 2, nextQuestion: 201},
            { text: "De 5 a 10 años", timeValue: 3, nextQuestion: 201},
            { text: "Más de 10 años", timeValue: 4, nextQuestion: 201}
        ]
    },
    {
        id: 112,
        section: "Horizonte de Inversión",
        question: "¿En cuántos años planeas comprarte una casa?",
        explanation: "",
        answers: [
            { text: "3 años o menos", timeValue: 1, nextQuestion: 201},
            { text: "De 3 a 5 años", timeValue: 2, nextQuestion: 201},
            { text: "De 5 a 10 años", timeValue: 3, nextQuestion: 201},
            { text: "Más de 10 años", timeValue: 4, nextQuestion: 201}
        ]
    },
    {
        id: 113,
        section: "Riesgo y Crecimiento",
        question: "¿Estarías dispuesto a asumir un riesgo alto para obtener mayores ingresos pasivos?",
        explanation: "",
        answers: [
            { text: "Sí, estoy dispuesto", conopoints: 2, nextQuestion: 201},
            { text: "Tal vez, dependiendo de la situación", conopoints: 1, nextQuestion: 201},
            { text: "No, prefiero mantener mi capital seguro", conopoints: 0, nextQuestion: 201}
        ]
    },
    {
        id: 114,
        section: "Horizonte de Inversión",
        question: "¿En cúantos años querrías empezar a desinvertir?",
        explanation: "Se refiere a cuando vas a necesitar ese dinero para otros usos",
        answers: [
            { text: "3 años o menos", timeValue: 1, nextQuestion: 201},
            { text: "De 3 a 5 años", timeValue: 2, nextQuestion: 201},
            { text: "De 5 a 10 años", timeValue: 3, nextQuestion: 201},
            { text: "Más de 10 años", timeValue: 4, nextQuestion: 201}
        ]
    },
    {
        id: 115,
        section: "Horizonte de Inversión",
        question: "¿Cúantos años le falta a tu hijo/a para empezar su educación?",
        answers: [
            { text: "3 años o menos", timeValue: 1, nextQuestion: 201},
            { text: "De 3 a 5 años", timeValue: 2, nextQuestion: 201},
            { text: "De 5 a 10 años", timeValue: 3, nextQuestion: 201},
            { text: "Más de 10 años", timeValue: 4, nextQuestion: 201}
        ]
    },
    // Sección 2: Experiencia de Inversión
    {
        id: 201,
        section: "Experiencia de Inversión",
        question: "¿Cuál es tu experiencia previa con inversiones?",
        explanation: "",
        answers: [
            { text: "Ninguna experiencia.", Expoints: 0, nextQuestion: 202},
            { text: "He invertido alguna vez, pero no soy experimentado.", Expoints: 1, nextQuestion: 205},
            { text: "Soy un inversor experimentado, invierto regularmente.", Expoints: 2, nextQuestion: 205 },
        ]
    },
    {
        id: 202,
        section: "Experiencia de Inversión",
        question: "Sin experiencia previa, ¿Te planteas tomar tus propias decisiones o delegarlas en un tercero?",
        explanation: "",
        answers: [
            { text: "Realizarlas yo", Expoints: 2, },
            { text: "Delegar una parte en un experto y otra realizarlo yo", Expoints: 1},
            { text: "Delegar mis inversiones en un profesional", Expoints: 0 },
        ]
    },
        {
            id: 203,
            section: "Experiencia de Inversión",
            question: "A pesar de no tener experiencia ¿Tienes conocimientos sobre inversiones?",
            explanation: "",
            answers: [
                { text: "Si.", Expoints: 1, nextQuestion: 208},
                { text: "No.", Expoints: 0, nextQuestion: 204},
            ]
        },
            {
                id: 204,
                section: "Experiencia de Inversión",
                question: "¿Te gustaría aprender para poder manejar tu dinero?",
                explanation: "Tranquilo/a no te voy a vender ningún curso.",
                answers: [
                    { text: "Si.", Expoints: 1, nextQuestion: 2017},
                    { text: "No.", Expoints: 0, nextQuestion: 2017},
                ]
            },
    {
        id: 205,
        section: "Experiencia de Inversión",
        question: "¿Realizas tú las inversiones?",
        explanation: "",
        answers: [
            { text: "No, las delego completamente.", Expoints: 0, nextQuestion: 207 },
            { text: "Si, una parte las elijo yo y otras las delego.", Expoints: 2 },
            { text: "Si, todas mis inversiones las eligo yo.", points: 3 },
        ]
    },
    {
        id: 206,
        section: "Experiencia de Inversión",
        question: "¿Qué tipo de inversiones has realizado en el pasado?",
        explanation: "",
        answers: [
            { text: "Cuentas de ahorro.", Expoints: 1 },
            { text: "Fondos de inversión.", Expoints: 2 },
            { text: "Acciones o bonos.", Expoints: 3 },
            { text: "Criptomonedas o start ups.", Expoints: 4 },
        ]
    },
    {
        id: 207,
        section: "Experiencia de Inversión",
        question: "¿Qué tan frecuentemente revisas tus inversiones?",
        explanation: "",
        answers: [
            { text: "Diariamente.", Expoints: -1 },
            { text: "Semanalmente.", Expoints: 1 },
            { text: "Mensualmente.", Expoints: 2 },
            { text: "Rara vez.", Expoints: 1 },
        ]
    },
    {
        id: 208,
        section: "Experiencia de Inversión",
        question: "¿Qué nivel de conocimientos de inversión tienes?",
        explanation: "",
        answers: [
            { text: "Iniciación, conozco las cuentas de ahorro.", Expoints: 1, nextQuestion:  2017},
            { text: "Lo anterior y entiendo los fondos de inversión y/o los índices bursátiles.", Expoints: 2, nextQuestion: 2017},
            { text: "Lo anterior y entiendo el funcionamiento de las acciones y/o bonos.", Expoints: 3, nextQuestion: 2017 },
            { text: "Lo anterior y criptomonedas o start ups.", Expoints: 4 },
        ]
    },
    {
        id: 208,
        section: "Experiencia de Inversión",
        question: "¿Dentro de las criptomonedas que nivel de conocimientos tienes?",
        explanation: "",
        answers: [
            { text: "Conozco Bitcoin y ethereum", Expoints: 0, nextQuestion: 2017, criptoExposure: 1 },
            { text: "Lo anterior y también conozco algunas Altcoins.", Expoints: 0, nextQuestion: 2017, criptoExposure: 2},
            { text: "Alto, me manejo bien en DeFi.", Expoints: 1, nextQuestion: 2017, criptoExposure: 3 },
        ]
    },
    {
        id: 2017,
        section: "Experiencia de Inversión",
        question: "¿Lees o sigues noticias económicas y del mercado financiero regularmente?",
        explanation: "",
        answers: [
            { text: "Diariamente.", Expoints: 3 },
            { text: "Semanalmente.", Expoints: 2 },
            { text: "Mensualmente.", Expoints: 1 },
            { text: "Rara vez.", Expoints: 0 },
        ]
    },
    //Sección 3: Perfil psicologico
    {
        id: 301,
        section: "Perfil",
        question: "¿Qué tan bien manejas el estrés?",
        explanation: "No sólo aplica en las inversiones",
        answers: [
            { text: "Mal, me afecta mucho.", points: 0 },
            { text: "Regular, pero me cuesta.", points: 1 },
            { text: "Bien, lo manejo con estrategias.", points: 2 },
            { text: "Muy bien, no me afecta.", points: 3 },
        ]
    },
    {
        id: 302,
        section: "Perfil",
        question: "¿Prefieres planificar tus inversiones con antelación o actuar rápidamente?",
        explanation: "Si no tienes inversiones responde como sueles actuar en la vida en general",
        answers: [
            { text: "Actuar rápidamente.", points: 0 },
            { text: "A veces planifico, a veces actúo.", points: 1 },
            { text: "Prefiero planificar mis inversiones.", points: 3 },
            { text: "Siempre planifico todo.", points: 2 },
        ]
    },
    {
        id: 303,
        section: "Perfil",
        question: "¿Qué papel juega la opinión de otros (familiares, amigos, asesores) en tus decisiones de inversión?",
        explanation: "Si no tienes inversiones responde como sueles actuar en la vida en general",
        answers: [
            { text: "Sigo mucho las recomendaciones de otros. ", points: 0 },
            { text: "Dependo algo de sus consejos.", points: 1 },
            { text: "Prefiero tomar mis propias decisiones.", points: 2 },
        ]
    },
    {
        id: 304,
        section: "Perfil",
        question: "¿Cómo describirías tu relación con el dinero en general?",
        explanation: "",
        answers: [
            { text: "Es una fuente de estrés.", points: 0 },
            { text: "A veces me estresa.", points: 1 },
            { text: "Es una herramienta para alcanzar mis objetivos.", points: 2 },
            { text: "Es un recurso que disfruto manejar .", points: 3},
        ]
    },
    {
        id: 305,
        section: "Perfil",
        question: "¿Qué tan cómodo te sientes hablando sobre dinero y finanzas con otras personas?",
        explanation: "",
        answers: [
            { text: "Muy incómodo.", points: 0 },
            { text: "Algo incómodo.", points: 1 },
            { text: "Cómodo.", points: 2 },
            { text: "Muy cómodo.", points: 3},
        ]
    },
    {
        id: 306,
        section: "Perfil",
        question: "Cuando piensas sobre inversiones, ¿Qué es en lo primero que piensas?",
        explanation: "",
        answers: [
            { text: "El miedo a perder el dinero.", points: 0 },
            { text: "Solo por la posibilidad de ganar.", points: 3 },
            { text: "Un poco de ambas.", points: 2 },
        ]
    },
    {
        id: 307,
        section: "Perfil",
        question: "¿Cómo manejas la incertidumbre en los aspectos de tu vida?",
        explanation: "",
        answers: [
            { text: "Me siento muy incómodo con la incertidumbre.", points: 0 },
            { text: "Trato de evitar situaciones inciertas.", points: 1 },
            { text: "Puedo manejar la incertidumbre de forma razonable.", points: 2 },
            { text: "Me siento cómodo y reacciono bien ante la incertidumbre.", points: 3 },
        ]
    },
    // Sección 4: Tolerancia al Riesgo
    {
        id: 401,
        section: "Tolerancia al Riesgo",
        question: "¿Qué harías si tus inversiones pierden un 15% de su valor en un año?",
        explanation: "Inviertes 10.000€ y ves tu cuenta de inversiones en 8.500€, ¿Qué haces?",
        answers: [
            { text: "Vendería todo para evitar más pérdidas.", points: 0, nextQuestion: 403 },
            { text: "Vendería una parte para reducir el riesgo.", points: 1},
            { text: "No haría nada, esperaría a que el mercado se recupere.", points: 2 },
            { text: "Compraría más, aprovechando la caída.", points: 3 },
        ]
    },
    {
        id: 402,
        section: "Tolerancia al Riesgo",
        question: "¿Y si tus inversiones pierden un 30% de su valor en un año?",
        explanation: "Inviertes 10.000€ y ves tu cuenta de inversiones en 7.000€, ¿Qué haces?",
        answers: [
            { text: "Vendería todo para evitar más pérdidas.", points: -1 },
            { text: "Vendería una parte para reducir el riesgo.", points: 0 },
            { text: "No haría nada, esperaría a que el mercado se recupere.", points: 1 },
            { text: "Volvería a comprar más, aprovechando la caída.", points: 2 },
        ]
    },
    {
        id: 403,
        section: "Tolerancia al Riesgo",
        question: "¿Qué porcentaje de tu patrimonio estás dispuesto a arriesgar en inversiones de alto riesgo?",
        explanation: "",
        answers: [
            { text: "Nada.", points: 0, nextQuestion: 501 },
            { text: "Hasta el 10%.", points: 4},
            { text: "Hasta el 25%.", points: 6 },
            { text: "Más del 25%.", points: 8 },
        ]
    },
    {
        id: 404,
        section: "Tolerancia al Riesgo",
        question: "¿Qué tan cómodo te sientes invirtiendo en activos volátiles como criptomonedas?",
        explanation: "",
        answers: [
            { text: "Nada cómodo, me asusta la volatilidad.", points: 0, criptoExposure: -1},
            { text: "Algo cómodo, pero prefiero inversiones más estables.", points: 1, criptoExposure: 1},
            { text: "Cómodo, puedo manejar la volatilidad.", points: 2, criptoExposure: 2},
            { text: "Muy cómodo, estoy emocionado por las oportunidades que ofrecen.", points: 3, criptoExposure: 3},
        ]
    },
    // Sección 5: Objetivos de Inversión
    {
        id: 501,
        section: "Objetivos de Inversión",
        question: "¿Qué tipo de retorno esperas de tus inversiones?",
        explanation: "Recuerda que el riesgo va asociado a rentabilidad. Cuanto mayor rentabilidad indica un mayor riesgo",
        answers: [
            { text: "Retorno bajo y seguro.", points: 0 },
            { text: "Retorno moderado.", points: 1 },
            { text: "Alto retorno, aceptando el riesgo.", points: 3 },
            { text: "No tengo expectativas específicas.", points: 2 },
        ]
    },
    {
        id: 502,
        section: "Horizonte de Inversión",
        question: "¿Qué tan cómodo te sientes invirtiendo a largo plazo?",
        explanation: "",
        answers: [
            { text: "Nada cómodo, prefiero inversiones a corto plazo.", points: 0 },
            { text: "Algo cómodo, pero me gustaría ver resultados rápidos.", points: 1 },
            { text: "Cómodo, siempre que tenga un plan claro.", points: 2 },
            { text: "Muy cómodo, estoy dispuesto a esperar.", points: 3 },
        ]
    },
    {
        id: 503,
        section: "Horizonte de Inversión",
        question: "Al considerar una inversión, ¿qué es más importante para ti?",
        explanation: "",
        answers: [
            { text: "Obtener el máximo rendimiento financiero, sin importar las prácticas de la empresa.", points: 0, nextQuestion: 601 },
            { text: "Obtener un rendimiento razonable mientras la empresa tiene buenas prácticas sociales y medioambientales.", esg: 1, nextQuestion: 504 },
            { text: "Invertir solo en empresas que demuestren un fuerte compromiso con la sostenibilidad y la responsabilidad social, incluso si el rendimiento es algo menor.", esg: 2, nextQuestion: 504 },
        ]
    },
    {
        id: 504,
        section: "Horizonte de Inversión",
        question: "¿Qué tan familiarizado estás con las inversiones ESG?",
        explanation:"ESG son las siglas de inversiones con criterios Medioambientales, Sociales y de Gobernanza).",
        answers: [
            { text: "No estoy familiarizado y no tengo interés", points: 0 },
            { text: "No estoy familiarizado pero quiero aprender más sobre ello", esg: 1 },
            { text: "Estoy familiarizado con los conceptos ESG y he investigado algunas opciones de inversión.", esg: 2 },
            { text: "Estoy muy familiarizado y he invertido previamente en productos ESG.", esg: 3 },
        ]
    },
];

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
