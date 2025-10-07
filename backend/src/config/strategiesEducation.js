// backend/src/config/strategiesEducation.js

const STRATEGIES_EDUCATION = {
  DCA: {
  name: "Dollar Cost Averaging (DCA)",
  shortDescription: "Inversión periódica de cantidades fijas",
  description: "Inviertes una cantidad fija regularmente (mensual, trimestral) sin importar las condiciones del mercado. Elimina intentar predecir el mejor momento.",
  howItWorks: "Elige una fecha como puede ser principios de mes e inviertes lo mismo cada vez.",
  advantages: [
    "Elimina timing del mercado",
    "Disciplina automática",
    "Ideal para principiantes",
    "Reduce impacto emocional",
    "No necesitas grandes sumas iniciales"
  ],
  disadvantages: [
    "Menos rentable que suma global en mercados alcistas",
    "No aprovecha oportunidades puntuales",
    "Requiere constancia"
  ],
  suitability: {
    'Bajo Riesgo': {
      'Principiante': "Perfecta para ti: elimina presión de decidir cuándo invertir y reduce ansiedad.",
      'Intermedia': "Excelente: permite entrada gradual y controlada.",
      'Avanzada': "Mantiene enfoque disciplinado sin riesgos de timing."
    },
    'Riesgo Moderado': {
      'Principiante': "Ideal para ganar confianza mientras aprendes, reduce decisiones emocionales.",
      'Intermedia': "Estrategia consistente mientras desarrollas comprensión de ciclos.",
      'Avanzada': "Base sólida que puedes combinar con estrategias más sofisticadas."
    },
    'Alto Riesgo': {
      'Principiante': "Te ayuda a entrar de forma controlada, evita apostar todo en volatilidad.",
      'Intermedia': "Proporciona estabilidad, complementa inversiones más arriesgadas.",
      'Avanzada': "Estrategia core para mantener disciplina mientras exploras oportunidades."
    }
  }
},

  PERIODIC: {
    name: "Inversión Periódica Simple",
    shortDescription: "Aportes regulares sin estrategia específica de timing",
    description: "Similar al DCA, pero más flexible en cuanto a montos y frecuencia. Consiste en realizar aportes regulares a tu cartera sin una estrategia específica de timing o promediado de costos.",
    howItWorks: "Realizas aportes de forma regular (que pueden variar en cantidad) a tu cartera, manteniendo la disciplina de inversión pero con mayor flexibilidad que el DCA estricto.",
    advantages: [
      "Mayor flexibilidad que el DCA puro",
      "Mantiene la disciplina de ahorro e inversión",
      "Permite ajustar montos según tu situación financiera",
      "Simple de implementar y mantener"
    ],
    disadvantages: [
      "Menos sistemático que el DCA",
      "Mayor riesgo de inconsistencia en los aportes",
      "No aprovecha el efecto de promediado de costos de forma óptima"
    ],
    suitability: {
      'Bajo Riesgo': {
        'Principiante': "Perfecta para comenzar con inversiones regulares sin la presión de montos fijos, adaptándose a tu comodidad financiera.",
        'Intermedia': "Te permite mantener consistencia en tus inversiones con la flexibilidad que tu experiencia te permite manejar.",
        'Avanzada': "Una estrategia base simple que puedes ajustar según tu análisis del mercado y situación personal."
      }
    }
  },

  VALUE_AVERAGING: {
    name: "Value Averaging",
    shortDescription: "Estrategia que ajusta aportes según el rendimiento",
    description: "Una estrategia más sofisticada que el DCA donde ajustas tus aportes basándote en el rendimiento de tu cartera. El objetivo es que tu cartera crezca en una cantidad específica cada periodo.",
    howItWorks: "Estableces un objetivo de crecimiento (por ejemplo, €100 mensuales). Si tu cartera ha subido mucho, aportas menos o incluso vendes. Si ha bajado, aportas más para alcanzar tu objetivo de crecimiento.",
    advantages: [
      "Matemáticamente superior al DCA en la mayoría de escenarios",
      "Compra más en mínimos y menos en máximos de forma automática",
      "Disciplina mejorada con rebalanceo implícito",
      "Mejor rendimiento a largo plazo que el DCA tradicional"
    ],
    disadvantages: [
      "Más complejo de implementar que el DCA",
      "Requiere mayor capital disponible para aportes variables",
      "Puede requerir vender en algunos periodos",
      "Mayor carga administrativa y seguimiento"
    ],
    suitability: {
      'Riesgo Moderado': {
        'Principiante': "Una evolución natural del DCA que puedes implementar una vez que te sientas cómodo con las inversiones periódicas.",
        'Intermedia': "Ideal para tu perfil: combina disciplina con un enfoque más sofisticado que puede mejorar tus rendimientos.",
        'Avanzada': "Excelente estrategia que aprovecha tu experiencia para optimizar el timing de aportes de forma sistemática."
      },
      'Alto Riesgo': {
        'Principiante': "Considera dominar primero el DCA antes de implementar esta estrategia más compleja.",
        'Intermedia': "Una estrategia valiosa que puede complementar tu tolerancia al riesgo con un enfoque más disciplinado.",
        'Avanzada': "Perfecta para maximizar el potencial de tu estrategia, combinando sofisticación con disciplina."
      }
    }
  },

  CORE_SATELLITE: {
    name: "Core & Satellite",
    shortDescription: "Combinación de inversión pasiva (core) con oportunidades activas (satélites)",
    description: "Estrategia que divide tu cartera en dos partes: un 'core' o núcleo de inversiones pasivas y diversificadas (70-90% de la cartera), y 'satélites' que son inversiones más específicas o activas (10-30%).",
    howItWorks: "El core está formado por ETFs diversificados de bajo costo que forman la base estable de tu cartera. Los satélites son inversiones en sectores específicos, acciones individuales, o temas de inversión que crees que pueden superar al mercado.",
    advantages: [
      "Combina los beneficios de la inversión pasiva con oportunidades activas",
      "Reduce riesgos manteniendo un núcleo diversificado",
      "Permite expresar tus convicciones de inversión de forma controlada",
      "Flexibilidad para adaptarse a oportunidades del mercado",
      "Costos controlados en la parte core"
    ],
    disadvantages: [
      "Requiere más conocimiento para gestionar los satélites",
      "Mayor complejidad de seguimiento y rebalanceo",
      "Riesgo de que los satélites no superen al core",
      "Puede generar overconfidence en las habilidades de selección"
    ],
    suitability: {
      'Riesgo Moderado': {
        'Intermedia': "Perfecta para tu nivel: te permite mantener estabilidad con el core mientras exploras oportunidades específicas con los satélites.",
        'Avanzada': "Ideal para aprovechar tu experiencia en la selección de satélites mientras mantienes una base sólida y diversificada."
      },
      'Alto Riesgo': {
        'Intermedia': "Te permite canalizar tu tolerancia al riesgo de forma inteligente, concentrando las apuestas arriesgadas en los satélites.",
        'Avanzada': "Excelente para maximizar oportunidades mientras mantienes un enfoque disciplinado en la parte principal de tu cartera."
      }
    }
  },

  REBALANCING: {
    name: "Rebalanceo Sistemático",
    shortDescription: "Mantener las proporciones objetivo de tu cartera",
    description: "Estrategia de mantenimiento que consiste en ajustar periódicamente tu cartera para mantener las proporciones originales entre diferentes activos o clases de activos.",
    howItWorks: "Estableces proporciones objetivo (ej: 70% acciones, 30% bonos) y periódicamente (trimestral, anual) vendes lo que ha subido más y compras lo que ha bajado para volver a esas proporciones.",
    advantages: [
      "Disciplina automática de 'comprar barato, vender caro'",
      "Mantiene el nivel de riesgo objetivo de la cartera",
      "Reduce la deriva del riesgo a lo largo del tiempo",
      "Aprovecha la reversión a la media de los mercados",
      "Sistema objetivo sin emociones"
    ],
    disadvantages: [
      "Puede generar fricciones fiscales por las ventas",
      "Interrumpe tendencias alcistas fuertes",
      "Requiere disciplina para vender activos que van bien",
      "Costos de transacción en cada rebalanceo"
    ],
    suitability: {
      'Riesgo Moderado': {
        'Avanzada': "Esencial para tu estrategia: te permite mantener el equilibrio riesgo-retorno que buscas sin deriva temporal."
      },
      'Alto Riesgo': {
        'Avanzada': "Fundamental para evitar que tu cartera se vuelva demasiado concentrada en activos que han subido mucho, manteniendo la diversificación."
      }
    }
  },

  BUY_THE_DIP: {
    name: "Buy the Dip",
    shortDescription: "Aprovechar caídas del mercado para invertir más",
    description: "Estrategia que consiste en aumentar las inversiones durante las caídas significativas del mercado (generalmente 10% o más desde máximos recientes).",
    howItWorks: "Mantienes efectivo de reserva para aprovechar caídas del mercado. Cuando los precios bajan significativamente, utilizas este efectivo para comprar a precios más bajos.",
    advantages: [
      "Aprovecha la volatilidad del mercado a tu favor",
      "Puede mejorar significativamente los retornos a largo plazo",
      "Permite comprar activos de calidad a descuento",
      "Psicológicamente satisfactorio cuando funciona"
    ],
    disadvantages: [
      "Requiere mantener efectivo improductivo esperando oportunidades",
      "Muy difícil determinar cuándo es realmente 'el fondo'",
      "Puede llevar a intentar 'market timing' de forma emocional",
      "Los 'dips' pueden convertirse en caídas prolongadas",
      "Requiere disciplina y control emocional excepcional"
    ],
    suitability: {
      'Alto Riesgo': {
        'Avanzada': "Tu experiencia y tolerancia al riesgo te permiten implementar esta estrategia, pero úsala solo con una pequeña parte de tu capital y con mucha disciplina. Recuerda que 'catching a falling knife' puede ser peligroso incluso para expertos."
      }
    }
  }
};

module.exports = {
  STRATEGIES_EDUCATION
};