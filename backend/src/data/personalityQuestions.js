const personalityQuestions = [
  // DIMENSIÓN 1: Planificación (P) vs. Oportunismo (O)
  {
    id: 1,
    dimension: 1, // P/O
    text: "Me siento más cómodo cuando sigo un plan definido.",
    pole: 'positive', // P
    scale: 'direct'
  },
  {
    id: 2,
    dimension: 1,
    text: "Si aparece una buena oportunidad, soy capaz de cambiar mis planes sin dudarlo.",
    pole: 'negative', // O
    scale: 'direct'
  },
  {
    id: 3,
    dimension: 1,
    text: "Prefiero organizar mis decisiones de forma estructurada.",
    pole: 'positive', // P
    scale: 'direct'
  },
  {
    id: 4,
    dimension: 1,
    text: "Disfruto adaptándome a lo que surge en el momento, sin necesidad de planear demasiado.",
    pole: 'negative', // O
    scale: 'direct'
  },
  {
    id: 5,
    dimension: 1,
    text: "Me gusta avanzar siguiendo un método claro, aunque no siempre sea el más rápido.",
    pole: 'positive', // P
    scale: 'direct'
  },
  {
    id: 6,
    dimension: 1,
    text: "Me motiva experimentar cosas nuevas aunque no encajen con mis planes iniciales.",
    pole: 'negative', // O
    scale: 'direct'
  },
  {
    id: 7,
    dimension: 1,
    text: "Cuando tengo un objetivo, suelo dividirlo en pasos concretos.",
    pole: 'positive', // P
    scale: 'direct'
  },
  {
    id: 8,
    dimension: 1,
    text: "Suelo decidir sobre la marcha, sin dedicar demasiado tiempo a planificar.",
    pole: 'negative', // O
    scale: 'direct'
  },

  // DIMENSIÓN 2: Análisis (A) vs. Intuición (I)
  {
    id: 9,
    dimension: 2, // A/I
    text: "Antes de decidir, necesito entender bien los detalles.",
    pole: 'positive', // A
    scale: 'direct'
  },
  {
    id: 10,
    dimension: 2,
    text: "Sigo mi instinto cuando algo me parece correcto.",
    pole: 'negative', // I
    scale: 'direct'
  },
  {
    id: 11,
    dimension: 2,
    text: "Me siento más seguro comparando datos que escuchando opiniones.",
    pole: 'positive', // A
    scale: 'direct'
  },
  {
    id: 12,
    dimension: 2,
    text: "La historia que hay detrás de una idea me importa tanto como los números.",
    pole: 'negative', // I
    scale: 'direct'
  },
  {
    id: 13,
    dimension: 2,
    text: "Reviso varias fuentes antes de tomar una decisión importante.",
    pole: 'positive', // A
    scale: 'direct'
  },
  {
    id: 14,
    dimension: 2,
    text: "Prefiero actuar pronto si tengo una buena corazonada, aunque no tenga todos los datos.",
    pole: 'negative', // I
    scale: 'direct'
  },
  {
    id: 15,
    dimension: 2,
    text: "Me gusta analizar ventajas e inconvenientes antes de actuar.",
    pole: 'positive', // A
    scale: 'direct'
  },
  {
    id: 16,
    dimension: 2,
    text: "Me dejo llevar por la intuición cuando siento que algo tiene potencial.",
    pole: 'negative', // I
    scale: 'direct'
  },

  // DIMENSIÓN 3: Autonomía (T) vs. Dependencia (D)
  {
    id: 17,
    dimension: 3, // T/D
    text: "Me gusta tomar decisiones por mí mismo.",
    pole: 'positive', // T
    scale: 'direct'
  },
  {
    id: 18,
    dimension: 3,
    text: "Confío en que los expertos suelen tener mejor información que yo.",
    pole: 'negative', // D
    scale: 'direct'
  },
  {
    id: 19,
    dimension: 3,
    text: "Disfruto investigando las cosas por mi cuenta.",
    pole: 'positive', // T
    scale: 'direct'
  },
  {
    id: 20,
    dimension: 3,
    text: "Me resulta cómodo seguir las recomendaciones de alguien con más experiencia.",
    pole: 'negative', // D
    scale: 'direct'
  },
  {
    id: 21,
    dimension: 3,
    text: "Me sentiría incómodo si dependiera siempre de la opinión de otros.",
    pole: 'positive', // T
    scale: 'direct'
  },
  {
    id: 22,
    dimension: 3,
    text: "Aprecio tener consejos o referencias antes de decidirme.",
    pole: 'negative', // D
    scale: 'direct'
  },
  {
    id: 23,
    dimension: 3,
    text: "Prefiero aprender por mi cuenta aunque me lleve más tiempo.",
    pole: 'positive', // T
    scale: 'direct'
  },
  {
    id: 24,
    dimension: 3,
    text: "Me gusta contrastar mis ideas con otros antes de tomar una decisión.",
    pole: 'negative', // D
    scale: 'direct'
  },

  // DIMENSIÓN 4: Conservadurismo (C) vs. Ambición (B)
  {
    id: 25,
    dimension: 4, // C/B
    text: "Prefiero asegurar lo que ya tengo antes que arriesgarlo.",
    pole: 'positive', // C
    scale: 'direct'
  },
  {
    id: 26,
    dimension: 4,
    text: "Estoy dispuesto a asumir más riesgo si con ello puedo lograr mayores resultados.",
    pole: 'negative', // B
    scale: 'direct'
  },
  {
    id: 27,
    dimension: 4,
    text: "Valoro la estabilidad más que el crecimiento rápido.",
    pole: 'positive', // C
    scale: 'direct'
  },
  {
    id: 28,
    dimension: 4,
    text: "Creo que las mejores oportunidades suelen estar en quienes se atreven a ir más allá.",
    pole: 'negative', // B
    scale: 'direct'
  },
  {
    id: 29,
    dimension: 4,
    text: "Me siento más tranquilo protegiendo lo que poseo, incluso si eso significa avanzar más despacio.",
    pole: 'positive', // C
    scale: 'direct'
  },
  {
    id: 30,
    dimension: 4,
    text: "Para mí, apuntar alto es más emocionante que conformarme con lo seguro.",
    pole: 'negative', // B
    scale: 'direct'
  },
  {
    id: 31,
    dimension: 4,
    text: "Evito decisiones que puedan poner en peligro lo que ya he conseguido.",
    pole: 'positive', // C
    scale: 'direct'
  },
  {
    id: 32,
    dimension: 4,
    text: "Me motiva más lo que puedo ganar que lo que puedo perder.",
    pole: 'negative', // B
    scale: 'direct'
  }
];

const scaleOptions = [
  { value: 1, label: "Totalmente en desacuerdo" },
  { value: 2, label: "En desacuerdo" },
  { value: 3, label: "Ligeramente en desacuerdo" },
  { value: 4, label: "Neutral" },
  { value: 5, label: "Ligeramente de acuerdo" },
  { value: 6, label: "De acuerdo" },
  { value: 7, label: "Totalmente de acuerdo" }
];

module.exports = {
  personalityQuestions,
  scaleOptions,
};