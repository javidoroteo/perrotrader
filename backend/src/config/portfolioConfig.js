// config/portfolioConfig.js

const PORTFOLIO_CONFIG = {
  // Cartera base inicial
  BASE_PORTFOLIO: {
    bonos: 50,
    acciones: 40,
    criptomonedas: 0,
    bonosVerdes: 0,
    efectivo: 10
  },

  // Rangos de perfil de riesgo
  RISK_PROFILES: {
    LOW: { min: 0, max: 30, name: 'Bajo Riesgo' },
    MODERATE: { min: 31, max: 60, name: 'Riesgo Moderado' },
    HIGH: { min: 61, max: 94, name: 'Alto Riesgo' }
  },

  // Ajustes por horizonte temporal
  TIME_ADJUSTMENTS: {
    1: { bonos: +20, acciones: -10 }, // 3 años o menos
    2: { bonos: +5, acciones: -5 },   // 3-5 años
    3: { bonos: -10, acciones: +17 }, // 5-10 años
    4: { bonos: -15, acciones: +25 }  // más de 10 años
  },

  // Ajustes por perfil de riesgo
  RISK_ADJUSTMENTS: {
    LOW: { bonos: +20, acciones: -10 },
    MODERATE: { bonos: 0, acciones: 0 },
    HIGH: { bonos: -10, acciones: +20 }
  },

  // Ajustes por exposición a criptomonedas
  CRYPTO_ADJUSTMENTS: {
    0: { bonos: 0, acciones: 0, criptomonedas: 0 },
    1: { bonos: 0, acciones: -5, criptomonedas: +5 },
    2: { bonos: 0, acciones: -7, criptomonedas: +7 },
    3: { bonos: -3, acciones: -7, criptomonedas: +10 },
    4: { bonos: -5, acciones: -10, criptomonedas: +15 },
    5: { bonos: -8, acciones: -12, criptomonedas: +20 }
  },

  // Configuración ESG
  ESG_CONFIG: {
    // Porcentaje máximo de bonos verdes
    MAX_GREEN_BONDS: 30,
    // Porcentaje de bonos verdes por nivel de ESG
    GREEN_ALLOCATION_PER_LEVEL: 10
  },

  // Mensajes del fondo de emergencia
  EMERGENCY_FUND_MESSAGES: {
    0: "Si no tienes fondo de emergencia es muy importante que generes uno con los próximos ahorros que dispongas, al menos deberías tener 6 meses de tus gastos ahorrados antes de plantearte invertir.",
    1: "Bien, tienes un pequeño fondo de emergencia disponible. Lo recomendado es tener 6 meses de gastos ahorrados, pero depende de cada uno.",
    2: "Genial, tienes alrededror de 5 meses de gastos ahorrados, lo recomendado son 6 meses así que estás listo para invertir tu excedente de ahorro.",
    3: "Genial, con más de 6 meses tienes un fondo de emergencia amplio, lo recomendable son 6 meses, pero si te sientes más cómodo puedes disponer de más fondo de emergencia. El resto está listo para ser invertido y obtener rentabilidad."
  },

  // Recomendaciones personalizadas basadas en respuestas
  RECOMMENDATIONS: {
    // Recomendaciones por perfil de riesgo
    RISK_PROFILE: {
      'Bajo Riesgo': 'Tu perfil conservador se refleja en una mayor asignación a bonos, que ofrecen estabilidad y menor volatilidad.',
      'Riesgo Moderado': 'Tu perfil equilibrado busca un balance entre crecimiento y estabilidad a través de una diversificación adecuada.',
      'Alto Riesgo': 'Tu perfil agresivo permite una mayor exposición a acciones, con potencial de mayores retornos a largo plazo.'
    },
    
    // Recomendaciones por horizonte temporal
    TIME_HORIZON: {
      1: 'Dado tu horizonte temporal corto (3 años o menos), hemos priorizado activos más estables y líquidos.',
      2: 'Con un horizonte de 3-5 años, tu cartera balancea estabilidad con un crecimiento moderado.',
      3: 'Tu horizonte de 5-10 años permite aprovechar mejor el potencial de crecimiento de las acciones.',
      4: 'Con más de 10 años de inversión, puedes maximizar el potencial de crecimiento a largo plazo.'
    },

    // Recomendaciones por nivel de criptomonedas
    CRYPTO_LEVEL: {
      0: null, // No mencionar criptos si no las quiere
      1: 'Hemos incluido una pequeña exposición a criptomonedas (5%) como diversificación alternativa.',
      2: 'Incluimos un 7% en criptomonedas según tu comodidad con estos activos digitales.',
      3: 'Tu cartera incluye un 10% en criptomonedas para aprovechar su potencial de alto crecimiento.',
      4: 'Hemos asignado un 15% a criptomonedas dados tus conocimientos y tolerancia al riesgo en este sector.',
      5: 'Con un 20% en criptomonedas, tu cartera refleja una alta confianza en los activos digitales.'
    },

    // Recomendaciones por ESG
    ESG_LEVEL: {
      0: null, // No mencionar ESG si no le interesa
      1: 'Hemos incluido bonos verdes en tu cartera según tu interés en inversiones sostenibles.',
      2: 'Tu cartera prioriza inversiones con fuerte compromiso social y medioambiental a través de bonos verdes.'
    }
  }
};

module.exports = PORTFOLIO_CONFIG;