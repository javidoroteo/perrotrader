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
            { text: "Menos de 1.000€", conopoints: 0, nextQuestion: 103 },
            { text: "Entre 1.001€ y 2.000€", conopoints: 0, nextQuestion: 103 },
            { text: "Entre 2.001€ y 5.000€", conopoints: 1, nextQuestion: 103},
            { text: "Entre 5.001€ y 10.000€", conopoints: 2, nextQuestion: 103},
            { text: "Más de 10.001€", conopoints: 3, nextQuestion: 103},
        ]
    },
    {
        id: 103,
        section: "Conociendote",
        question: "¿Cuál es tu ahorro mensual aproximado?",
        explanation: "Incluye los destinados a ahorro e inversión",
        answers: [
            { text: "0% - 5%", conopoints: 0, timeValue: 0, nextQuestion: 104 },
            { text: "6% - 10%", conopoints: 1, timeValue: 0, nextQuestion: 104},
            { text: "11% - 20%", conopoints: 2, timeValue: 0, nextQuestion: 104},
            { text: "20% - 30%", conopoints: 3 , timeValue: 0, nextQuestion: 104},
            { text: "Más de 30%", conopoints: 4, timeValue: 0, nextQuestion: 104},
        ]
    },
    {
        id: 104,
        section: "Conociendote",
        question: "¿Tienes un fondo de emergencia?",
        explanation: "El fondo de emergencia es un dinero ahorrado que debería cubrir los gastos de 6 meses o más",
        answers: [
            { text: "No, no tengo.", conopoints: 0, emergencyFund: 0, nextQuestion: 106},
            { text: "Sí, pero es menor a 3 meses de gasto.", conopoints: 1, emergencyFund: 1, nextQuestion: 106 },
            { text: "Sí, es moderado, es de alrededor de 5 meses.", conopoints: 2, emergencyFund: 2, nextQuestion: 106},
            { text: "Sí, es suficiente para más de 6 meses.", conopoints: 4, emergencyFund: 3, nextQuestion: 106},
        ]
    },
    {
        id: 106,
        section: "Conociendote",
        question: "¿Tienes obligaciones financieras futuras significativas?",
        explanation: "",
        answers: [
            { text: "Sí, son significativas (Hipoteca, Préstamo del coche...) ", conopoints: -1, nextQuestion: 107 },
            { text: "Sí, pero solo requieren pagos moderados u ocasionales (Deuda personal pequeña o vacaciones planificadas).", conopoints: 0, nextQuestion: 107 },
            { text: "No, no tengo ninguna obligación financiera importante.", conopoints: 3, nextQuestion: 107 },
        ]
    },
    {
        id: 107,
        section: "Conociendote",
        question: "¿Estás dispuesto a invertir mensualmente una parte de tu ingreso?",
        explanation: "",
        answers: [
            { text: "No, no puedo. Sólo ahorros que ya dispongo.", conopoints: 0, nextQuestion: 108},
            { text: "Sí, una pequeña cantidad.", conopoints: 1, nextQuestion: 108 },
            { text: "Sí, una cantidad moderada.", conopoints: 2, nextQuestion: 108 },
            { text: "Sí, una cantidad significativa.", conopoints: 3, nextQuestion: 108 },
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
            { text: "Realizarlas yo", Expoints: 2, nextQuestion: 203},
            { text: "Delegar una parte en un experto y otra realizarlo yo", Expoints: 1, nextQuestion: 203},
            { text: "Delegar mis inversiones en un profesional", Expoints: 0, nextQuestion: 203},
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
            { text: "Si, una parte las elijo yo y otras las delego.", Expoints: 2, nextQuestion: 206 },
            { text: "Si, todas mis inversiones las eligo yo.", points: 3, nextQuestion: 206},
        ]
    },
    {
        id: 206,
        section: "Experiencia de Inversión",
        question: "¿Qué tipo de inversiones has realizado en el pasado?",
        explanation: "",
        answers: [
            { text: "Cuentas de ahorro.", Expoints: 1, nextQuestion: 207},
            { text: "Fondos de inversión.", Expoints: 2, nextQuestion: 207},
            { text: "Acciones o bonos.", Expoints: 3, nextQuestion: 207},
            { text: "Criptomonedas o start ups.", Expoints: 4, nextQuestion: 207},
        ]
    },
    {
        id: 207,
        section: "Experiencia de Inversión",
        question: "¿Qué tan frecuentemente revisas tus inversiones?",
        explanation: "",
        answers: [
            { text: "Diariamente.", Expoints: -1, nextQuestion: 208},
            { text: "Semanalmente.", Expoints: 1, nextQuestion: 208},
            { text: "Mensualmente.", Expoints: 2, nextQuestion: 208},
            { text: "Rara vez.", Expoints: 1, nextQuestion: 208},
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
            { text: "Lo anterior y criptomonedas o start ups.", Expoints: 4, nextQuestion: 209 },
        ]
    },
    {
        id: 209,
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
            { text: "Diariamente.", Expoints: 3, nextQuestion: 301 },
            { text: "Semanalmente.", Expoints: 2, nextQuestion: 301 },
            { text: "Mensualmente.", Expoints: 1, nextQuestion: 301 },
            { text: "Rara vez.", Expoints: 0, nextQuestion: 301 },
        ]
    },
    //Sección 3: Perfil psicologico
    {
        id: 301,
        section: "Perfil",
        question: "¿Qué tan bien manejas el estrés?",
        explanation: "No sólo aplica en las inversiones",
        answers: [
            { text: "Mal, me afecta mucho.", points: 0, nextQuestion: 302 },
            { text: "Regular, pero me cuesta.", points: 1, nextQuestion: 302 },
            { text: "Bien, lo manejo con estrategias.", points: 2, nextQuestion: 302 },
            { text: "Muy bien, no me afecta.", points: 3, nextQuestion: 302 },
        ]
    },
    {
        id: 302,
        section: "Perfil",
        question: "¿Prefieres planificar tus inversiones con antelación o actuar rápidamente?",
        explanation: "Si no tienes inversiones responde como sueles actuar en la vida en general",
        answers: [
            { text: "Actuar rápidamente.", points: 0, nextQuestion: 303 },
            { text: "A veces planifico, a veces actúo.", points: 1, nextQuestion: 303 },
            { text: "Prefiero planificar mis inversiones.", points: 3, nextQuestion: 303 },
            { text: "Siempre planifico todo.", points: 2, nextQuestion: 303 },
        ]
    },
    {
        id: 303,
        section: "Perfil",
        question: "¿Qué papel juega la opinión de otros (familiares, amigos, asesores) en tus decisiones de inversión?",
        explanation: "Si no tienes inversiones responde como sueles actuar en la vida en general",
        answers: [
            { text: "Sigo mucho las recomendaciones de otros. ", points: 0, nextQuestion: 304 },
            { text: "Dependo algo de sus consejos.", points: 1, nextQuestion: 304 },
            { text: "Prefiero tomar mis propias decisiones.", points: 2, nextQuestion: 304 },
        ]
    },
    {
        id: 304,
        section: "Perfil",
        question: "¿Cómo describirías tu relación con el dinero en general?",
        explanation: "",
        answers: [
            { text: "Es una fuente de estrés.", points: 0, nextQuestion: 305 },
            { text: "A veces me estresa.", points: 1, nextQuestion: 305 },
            { text: "Es una herramienta para alcanzar mis objetivos.", points: 2, nextQuestion: 305 },
            { text: "Es un recurso que disfruto manejar .", points: 3, nextQuestion: 305},
        ]
    },
    {
        id: 305,
        section: "Perfil",
        question: "¿Qué tan cómodo te sientes hablando sobre dinero y finanzas con otras personas?",
        explanation: "",
        answers: [
            { text: "Muy incómodo.", points: 0, nextQuestion: 306},
            { text: "Algo incómodo.", points: 1, nextQuestion: 306 },
            { text: "Cómodo.", points: 2 , nextQuestion: 306},
            { text: "Muy cómodo.", points: 3, nextQuestion: 306},
        ]
    },
    {
        id: 306,
        section: "Perfil",
        question: "Cuando piensas sobre inversiones, ¿Qué es en lo primero que piensas?",
        explanation: "",
        answers: [
            { text: "El miedo a perder el dinero.", points: 0, nextQuestion: 307 },
            { text: "Solo por la posibilidad de ganar.", points: 3, nextQuestion: 307 },
            { text: "Un poco de ambas.", points: 2, nextQuestion: 307 },
        ]
    },
    {
        id: 307,
        section: "Perfil",
        question: "¿Cómo manejas la incertidumbre en los aspectos de tu vida?",
        explanation: "",
        answers: [
            { text: "Me siento muy incómodo con la incertidumbre.", points: 0 , nextQuestion: 401},
            { text: "Trato de evitar situaciones inciertas.", points: 1, nextQuestion: 401},
            { text: "Puedo manejar la incertidumbre de forma razonable.", points: 2 , nextQuestion: 401},
            { text: "Me siento cómodo y reacciono bien ante la incertidumbre.", points: 3, nextQuestion: 401 },
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
            { text: "Vendería una parte para reducir el riesgo.", points: 1, nextQuestion: 402},
            { text: "No haría nada, esperaría a que el mercado se recupere.", points: 2, nextQuestion: 402},
            { text: "Compraría más, aprovechando la caída.", points: 3, nextQuestion: 402 },
        ]
    },
    {
        id: 402,
        section: "Tolerancia al Riesgo",
        question: "¿Y si tus inversiones pierden un 30% de su valor en un año?",
        explanation: "Inviertes 10.000€ y ves tu cuenta de inversiones en 7.000€, ¿Qué haces?",
        answers: [
            { text: "Vendería todo para evitar más pérdidas.", points: -1, nextQuestion: 403 },
            { text: "Vendería una parte para reducir el riesgo.", points: 0, nextQuestion: 403 },
            { text: "No haría nada, esperaría a que el mercado se recupere.", points: 1, nextQuestion: 403 },
            { text: "Volvería a comprar más, aprovechando la caída.", points: 2, nextQuestion: 403},
        ]
    },
    {
        id: 403,
        section: "Tolerancia al Riesgo",
        question: "¿Qué porcentaje de tu patrimonio estás dispuesto a arriesgar en inversiones de alto riesgo?",
        explanation: "",
        answers: [
            { text: "Nada.", points: 0, nextQuestion: 501 },
            { text: "Hasta el 10%.", points: 4, nextQuestion: 404},
            { text: "Hasta el 25%.", points: 6 , nextQuestion: 404},
            { text: "Más del 25%.", points: 8 , nextQuestion: 404},
        ]
    },
    {
        id: 404,
        section: "Tolerancia al Riesgo",
        question: "¿Qué tan cómodo te sientes invirtiendo en activos volátiles como criptomonedas?",
        explanation: "",
        answers: [
            { text: "Nada cómodo, me asusta la volatilidad.", points: 0, criptoExposure: -1, nextQuestion: 501},
            { text: "Algo cómodo, pero prefiero inversiones más estables.", points: 1, criptoExposure: 1, nextQuestion: 501},
            { text: "Cómodo, puedo manejar la volatilidad.", points: 2, criptoExposure: 2, nextQuestion: 501},
            { text: "Muy cómodo, estoy emocionado por las oportunidades que ofrecen.", points: 3, criptoExposure: 3, nextQuestion: 501},
        ]
    },
    // Sección 5: Objetivos de Inversión
    {
        id: 501,
        section: "Objetivos de Inversión",
        question: "¿Qué tipo de retorno esperas de tus inversiones?",
        explanation: "Recuerda que el riesgo va asociado a rentabilidad. Cuanto mayor rentabilidad indica un mayor riesgo",
        answers: [
            { text: "Retorno bajo y seguro.", points: 0, nextQuestion: 502 },
            { text: "Retorno moderado.", points: 1 , nextQuestion: 502},
            { text: "Alto retorno, aceptando el riesgo.", points: 3, nextQuestion: 502 },
            { text: "No tengo expectativas específicas.", points: 2, nextQuestion: 502},
        ]
    },
    {
        id: 502,
        section: "Horizonte de Inversión",
        question: "¿Qué tan cómodo te sientes invirtiendo a largo plazo?",
        explanation: "",
        answers: [
            { text: "Nada cómodo, prefiero inversiones a corto plazo.", points: 0, nextQuestion: 503 },
            { text: "Algo cómodo, pero me gustaría ver resultados rápidos.", points: 1, nextQuestion: 503 },
            { text: "Cómodo, siempre que tenga un plan claro.", points: 2, nextQuestion: 503},
            { text: "Muy cómodo, estoy dispuesto a esperar.", points: 3 , nextQuestion: 503},
        ]
    },
    {
        id: 503,
        section: "Horizonte de Inversión",
        question: "Al considerar una inversión, ¿qué es más importante para ti?",
        explanation: "",
        answers: [
            { text: "Obtener el máximo rendimiento financiero, sin importar las prácticas de la empresa.", points: 0 },
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
module.exports = questions;