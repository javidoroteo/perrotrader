// config/portfolioConfig.js - Nueva configuración basada en el documento de ajuste

const PORTFOLIO_CONFIG = {
  // Nueva cartera base según documento
  BASE_PORTFOLIO: {
    acciones: 60,    // Acciones - activo principal de crecimiento
    bonos: 30,       // Bonos - activo de estabilidad
    criptomonedas: 0, // Criptos - activo especulativo (se activa según preferencias)
    efectivo: 10,    // Efectivo - liquidez
    oro: 0          // Oro - activo defensivo anti-inflación (nuevo)
  },

  // Nuevos rangos de perfil de riesgo actualizados
  RISK_PROFILES: {
    LOW: { min: 0, max: 8, name: 'Bajo Riesgo' },      // Riesgo conservador
    MODERATE: { min: 9, max: 16, name: 'Riesgo Moderado' }, // Riesgo equilibrado
    HIGH: { min: 17, max: 25, name: 'Alto Riesgo' }    // Riesgo agresivo
  },

  // Nuevos rangos de experiencia (expoints 0-13)
  EXPERIENCE_LEVELS: {
    LOW: { min: 0, max: 4, name: 'Principiante' },        // Poca experiencia
    INTERMEDIATE: { min: 5, max: 8, name: 'Intermedia' }, // Experiencia moderada  
    HIGH: { min: 9, max: 13, name: 'Avanzada' }       // Mucha experiencia
  },

  // Nuevos rangos de edad (age 1-6)
  AGE_LEVELS: {
    YOUNG: { min: 1, max: 2, name: 'Joven' },     // 18-30 años
    MIDDLE: { min: 3, max: 4, name: 'Media' },    // 31-55 años  
    SENIOR: { min: 5, max: 6, name: 'Mayor' }     // 56+ años
  },
  ESG_LEVEL: {
    BEGINNER: { min: 1, max: 2, name: 'Bajo' },        // Poco interés en ESG
    INTERMEDIATE: { min: 3, max: 4, name: 'Medio' }, // Interés moderado en ESG
    ADVANCED  : { min: 5, max: 6, name: 'Alto' }       // Gran interés en ESG
  },
  // Nuevos rangos de ingresos (conopoints -1 a 22)
  INCOME_LEVELS: {
    LOW: { min: -1, max: 7, name: 'Bajos' },      // Ingresos limitados
    MEDIUM: { min: 8, max: 14, name: 'Medios' },  // Ingresos moderados
    HIGH: { min: 15, max: 22, name: 'Altos' }     // Ingresos elevados
  },

  // Ajustes por personalidad (afectan % sobre clase base)
  PERSONALITY_ADJUSTMENTS: {
    // Conservadurismo vs Ambición (Dimensión 4)
    CONSERVADOR: { // Score positivo en dimensión 4
      acciones: -20, bonos: +20, criptomonedas: -5, efectivo: +5
    },
    AMBICIOSO: { // Score negativo en dimensión 4  
      acciones: +20, bonos: -20, criptomonedas: +5, efectivo: -5
    },
    
    // Planificación vs Oportunismo (Dimensión 1)
    PLANIFICADOR: { // Score positivo en dimensión 1
      acciones: -8, bonos: +17, criptomonedas: -5, efectivo: +5
    },
    OPORTUNISTA: { // Score negativo en dimensión 1
      acciones: +8, bonos: -15, criptomonedas: +8, efectivo: 0
    },
    
    // Análisis vs Intuición (Dimensión 2)
    ANALITICO: { // Score positivo en dimensión 2
      acciones: 0, bonos: 0, criptomonedas: 0, efectivo: 0 // No impacta %
    },
    INTUITIVO: { // Score negativo en dimensión 2
      acciones: 0, bonos: -8, criptomonedas: +5, efectivo: +3
    },
    
    // Autonomía vs Dependencia (Dimensión 3)
    AUTONOMO: { // Score positivo en dimensión 3
      acciones: 0, bonos: 0, criptomonedas: 0, efectivo: 0 // No impacta %
    },
    DEPENDIENTE: { // Score negativo en dimensión 3
      acciones: -8, bonos: +8, criptomonedas: 0, efectivo: 0
    }
  },

  // Ajustes por datos objetivos
  OBJECTIVE_ADJUSTMENTS: {
    // Por nivel de experiencia
    EXPERIENCE: {
      LOW: { acciones: -15, bonos: +10, criptomonedas: 0, efectivo: +5 },
      INTERMEDIATE: { acciones: -5, bonos: +5, criptomonedas: +1, efectivo: -1 },
      HIGH: { acciones: +15, bonos: -15, criptomonedas: +3, efectivo: -3 }
    },
    
    // Por edad
    AGE: {
      YOUNG: { acciones: +15, bonos: -15, criptomonedas: +3, efectivo: -3 },
      MIDDLE: { acciones: 0, bonos: 0, criptomonedas: 0, efectivo: 0 },
      SENIOR: { acciones: -20, bonos: +20, criptomonedas: -5, efectivo: +5 }
    },
    
    // Por nivel de ingresos
    INCOME: {
      LOW: { acciones: -15, bonos: +5, criptomonedas: 0, efectivo: +10 },
      MEDIUM: { acciones: -5, bonos: +5, criptomonedas: 0, efectivo: 0 },
      HIGH: { acciones: +15, bonos: -15, criptomonedas: +3, efectivo: -3 }
    },
    
    // Por riesgo declarado
    RISK: {
      LOW: { acciones: -20, bonos: +15, criptomonedas: -10, efectivo: +15 },
      MODERATE: { acciones: 0, bonos: 0, criptomonedas: 0, efectivo: 0 },
      HIGH: { acciones: +20, bonos: -15, criptomonedas: +10, efectivo: -15 }
    },
    
    // Por fondo de emergencia
    EMERGENCY_FUND: {
      LOW: { acciones: -10, bonos: +5, criptomonedas: 0, efectivo: +5 },
      HIGH: { acciones: +5, bonos: -5, criptomonedas: 0, efectivo: 0 }
    },
    
    // Por horizonte temporal
    TIME_HORIZON: {
      SHORT: { acciones: -15, bonos: +10, criptomonedas: -5, efectivo: +10 },
      MEDIUM: { acciones: 0, bonos: 0, criptomonedas: 0, efectivo: 0 },
      LONG: { acciones: +15, bonos: -10, criptomonedas: +5, efectivo: -10 }
    },
    
    // Por preferencia de dividendos
    DIVIDEND: {
      YES: { acciones: 0, bonos: +5, criptomonedas: 0, efectivo: -5 },
      NO: { acciones: 0, bonos: 0, criptomonedas: 0, efectivo: 0 }
    },
    
    // Por plan de jubilación
    PENSION: {
      YES: { acciones: -5, bonos: +5, criptomonedas: -3, efectivo: +3 },
      NO: { acciones: 0, bonos: 0, criptomonedas: 0, efectivo: 0 }
    }
  },

  // Configuración de criptomonedas
  CRYPTO_CONFIG: {
    MIN_ALLOCATION: 5, // % mínimo si se activa cripto
    REBALANCE_FROM_STOCKS: 0.5, // 50% viene de acciones
    REBALANCE_FROM_BONDS: 0.5   // 50% viene de bonos
  },

  // Configuración de oro
  GOLD_CONFIG: {
    // Puntos oro -> % de cartera
    ALLOCATION_MAP: {
      0: 0,   // 0 puntos = 0% oro
      1: 5,   // 1 punto = 5% oro  
      2: 10,  // 2 puntos = 10% oro
      3: 15   // 3 puntos = 15% oro
    },
    REBALANCE_FROM_CASH: 0.5,  // 50% viene de efectivo
    REBALANCE_FROM_BONDS: 0.5  // 50% viene de bonos
  },

  // Límites globales para evitar valores extremos
  GLOBAL_LIMITS: {
    MAX_DELTA_PER_ASSET: 30, // ±30% máximo de cambio por activo desde base
    MIN_ASSET_PERCENTAGE: 0,  // 0% mínimo por activo
    MAX_ASSET_PERCENTAGE: 80  // 80% máximo por activo individual
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

  //Recomendaciones de estrategias de inversión
  STRATEGY_MESSAGES: {
  'Bajo Riesgo': {
    'LOW': "DCA, PERIODIC",           // Cambiado de BEGINNER a LOW
    'INTERMEDIATE': "DCA, PERIODIC", 
    'HIGH': "DCA, PERIODIC",         // Cambiado de ADVANCED a HIGH
  },
  'Riesgo Moderado': {
    'LOW': "DCA, VALUE_AVERAGING",           // Cambiado de BEGINNER a LOW
    'INTERMEDIATE': "DCA, VALUE_AVERAGING, CORE_SATELLITE", 
    'HIGH': "DCA, VALUE_AVERAGING, CORE_SATELLITE, REBALANCING", // Cambiado de ADVANCED a HIGH
  },
  'Alto Riesgo': {
    'LOW': "DCA, VALUE_AVERAGING",           // Cambiado de BEGINNER a LOW
    'INTERMEDIATE': "DCA, VALUE_AVERAGING, CORE_SATELLITE",
    'HIGH': "DCA, VALUE_AVERAGING, CORE_SATELLITE, REBALANCING, BUY_THE_DIP", // Cambiado de ADVANCED a HIGH
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
      1: 'Corto plazo',
      2: 'Medio plazo',
      3: 'Largo plazo',
      4: 'Muy largo plazo'
    },
  }
};

module.exports = PORTFOLIO_CONFIG;