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
// Rangos de conocimiento
  KNOWLEDGE_LEVELS: {
    BEGINNER: { min: 0, max: 6, name: 'Principiante' },
    INTERMEDIATE: { min: 7, max: 13, name: 'Intermedio' },
    ADVANCED: { min: 14, max: 20, name: 'Avanzado' }
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
    0: {
    'Bajo Riesgo': "Invertir sin una red de seguridad y con poca tolerancia al riesgo puede generarte más ansiedad que beneficios. Primero, construye un fondo de emergencia que cubra al menos 3–6 meses de gastos. Solo entonces estarás en condiciones de invertir con calma y tomar decisiones sin presión.",
    'Riesgo Moderado': "No cuentas con un fondo de emergencia, lo cual es fundamental antes de comenzar a invertir. Con un perfil de riesgo moderado, puedes tolerar cierta volatilidad, pero sin un colchón de al menos 6 meses de gastos, cualquier imprevisto podría obligarte a vender tus inversiones en un mal momento. Primero, construye tu fondo; después podrás invertir con más seguridad y aprovechar tu tolerancia al riesgo.",
    'Alto Riesgo': "Aunque estás dispuesto a asumir algo de riesgo, no contar con un fondo de emergencia limita tu margen de maniobra. Antes de construir tu cartera, asegúrate de tener un colchón que cubra al menos 3–6 meses de gastos. Esto evitará que tengas que vender inversiones en mal momento si surge un imprevisto."
  },
    1: {
    'Bajo Riesgo': "Estás en el camino correcto: empezar a construir un fondo de emergencia es una excelente decisión. Aún con perfil conservador, una red de seguridad financiera te permitirá invertir con más confianza. Prioriza completar ese fondo antes de asumir riesgo, y mientras tanto, fórmate y planifica.",
    'Riesgo Moderado': "Vas por buen camino al empezar a construir tu fondo de emergencia. Con tu perfil moderado, puedes considerar comenzar con inversiones de bajo riesgo mientras completas esa reserva. Una vez que tengas tu colchón financiero, podrás diversificar hacia activos con mayor potencial de rentabilidad sin comprometer tu estabilidad.",
    'Alto Riesgo': "Tu disposición a asumir riesgo es una ventaja, pero la paciencia será tu mejor aliada ahora. Completa primero tu fondo de emergencia antes de apostar fuerte por inversiones volátiles. Mientras tanto, puedes ir formándote y planificando tu estrategia de inversión para cuando tengas esa base sólida que te permita aprovechar al máximo tu tolerancia al riesgo."
  },
    2: {
  'Bajo Riesgo': "Ya casi alcanzas tu objetivo: con 5 meses de gastos ahorrados, estás a un paso de tener un fondo de emergencia completo. Con tu perfil conservador, lo más prudente es terminar de asegurar ese mes adicional antes de aumentar tu exposición al riesgo. Mientras tanto, mantente en productos muy seguros o en ahorro garantizado.",
  'Riesgo Moderado': "Con 5 meses de gastos cubiertos, tu fondo de emergencia está prácticamente listo. Con un perfil moderado, puedes ir explorando inversiones de bajo riesgo en paralelo, pero prioriza completar ese último mes para contar con una base totalmente sólida. Esto te permitirá luego diversificar con mayor tranquilidad.",
  'Alto Riesgo': "Has avanzado mucho: 5 meses de gastos ahorrados te ponen cerca de tu objetivo de seguridad. Con tu alta tolerancia al riesgo, puede ser tentador lanzarte ya a activos más volátiles, pero asegurar ese mes extra de colchón te dará mayor libertad para mantener tus inversiones incluso en momentos de turbulencia. Aunque si te sientes cómodo puedes ir creando tu cartera poco a poco a la vez que terminas tu fondo de emergencia."
  },
    3: {
  'Bajo Riesgo': "Has dado un paso fundamental al construir tu fondo de emergencia. Esto te permite invertir con más confianza, incluso si prefieres mantener un perfil conservador. Una cartera estable y diversificada puede ayudarte a hacer crecer tu dinero sin asumir más riesgo del que te sientas cómodo.",
  'Riesgo Moderado': "Con tu perfil moderado y un fondo de emergencia ya asegurado, cuentas con la base perfecta para invertir con equilibrio. Puedes combinar activos de bajo y mediano riesgo, buscando un crecimiento sostenido sin poner en peligro tu estabilidad financiera. Aprovecha tu margen de seguridad para diversificar gradualmente y adaptarte a las condiciones del mercado.",
  'Alto Riesgo' : "Has hecho lo más importante antes de empezar: construir un buen fondo de emergencia. Gracias a eso, puedes invertir con tranquilidad incluso en activos más volátiles aprovechando tu capacidad de asumir riesgo, pero diversifica bien."
  },
},
EQUITY_MARKET_MESSAGES: {
  'Principiante': {
    0: "",
    1: "",
  },
  'Intermedio': {
    0: "",
    1: "",
  },
  'Avanzado': {
    0: "",
    1: "",
  },
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