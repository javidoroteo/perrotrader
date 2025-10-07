// backend/src/config/assetEducation.js

const ASSET_EDUCATION = {
  RENTA_VARIABLE: {
    title: "Renta Variable (Acciones) 📈",
    description: "Compras una parte de empresas. Con ETFs o fondos, compras partes pequeñas de muchas empresas a la vez.",
    role: "Motor de crecimiento de tu cartera. Genera retornos que superan la inflación y te ayuda a alcanzar tus objetivos financieros.",
    expectedReturn: "Entre 5% y 9% anual a largo plazo, dependiendo de región y mercado.",
    behavior: "El más volátil. Fluctúa mucho a corto plazo por noticias o ciclos económicos. Requiere paciencia.",
    pros: [
      "Alto potencial de crecimiento",
      "Protege contra inflación a largo plazo",
      "Genera ingresos pasivos (dividendos) si invieres en acciones que los pagan"
    ],
    cons: [
      "Alto riesgo y volatilidad a corto plazo",
      "Posibilidad de pérdida de capital"
    ]
  },

  RENTA_FIJA: {
    title: "Renta Fija (Bonos) 💰",
    description: "Prestas dinero a gobiernos o empresas. Te pagan intereses por ese préstamo.",
    role: "Ancla de tu cartera. Reduce volatilidad y riesgo. Da estabilidad e ingresos predecibles.",
    expectedReturn: "Entre 2% y 6% anual, según tipo de bono, emisor y tasas de interés.",
    behavior: "Mucho menos volátil que acciones. Valor se mueve inversamente a tipos de interés.",
    pros: [
      "Estabilidad y menor riesgo",
      "Ingresos regulares predecibles (cupones)",
      "Diversifica riesgo de acciones"
    ],
    cons: [
      "Menor crecimiento a largo plazo",
      "Vulnerable a inflación",
      "Riesgo de insolvencia del emisor"
    ]
  },

  CRIPTOMONEDAS: {
    title: "Criptomonedas ⛓️",
    description: "Activos digitales descentralizados liderados por Bitcoin.",
    role: "Activo satélite de alto riesgo y alto rendimiento. Potencial de crecimiento exponencial.",
    expectedReturn: "No hay histórico fiable. Ha dado rendimientos extraordinarios pero también caídas severas.",
    behavior: "El más volátil y especulativo. Puede cambiar drásticamente en días u horas.",
    pros: [
      "Potencial de crecimiento muy alto",
      "Baja correlación con activos tradicionales",
      "Descentralización"
    ],
    cons: [
      "Extrema volatilidad y riesgo de altas pérdidas",
      "Falta de regulación y riesgo de fraude",
      "Valor intrínseco difícil de justificar"
    ]
  },

  EFECTIVO: {
    title: "Efectivo 💵",
    description: "Dinero en cuenta de ahorro o depósitos. Base de seguridad financiera.",
    role: "Reserva de seguridad y liquidez. Protege de volatilidad y garantiza fondos disponibles.",
    expectedReturn: "Mínima, a menudo por debajo del 2%. Apenas compensa inflación.",
    behavior: "El más seguro y menos volátil. Valor nominal constante, pero poder adquisitivo disminuye con inflación.",
    pros: [
      "Máxima seguridad y liquidez",
      "Ideal para emergencias y oportunidades"
    ],
    cons: [
      "Rentabilidad muy baja o nula",
      "Pérdida de poder adquisitivo por inflación"
    ]
  },

  ORO: {
    title: "Oro 🪙",
    description: "Activo refugio más antiguo. No genera intereses ni dividendos, pero conserva valor.",
    role: "Cobertura contra inflación, devaluación y crisis geopolíticas. Diversifica riesgo.",
    expectedReturn: "Entre 1% y 3% en términos reales a largo plazo. No suele superar acciones.",
    behavior: "No genera flujo de caja. Precio fluctúa según oferta, demanda y política monetaria.",
    pros: [
      "Refugio contra inflación y crisis",
      "Alta liquidez global",
      "Baja correlación con acciones y bonos"
    ],
    cons: [
      "No genera ingresos",
      "Largos períodos de estancamiento",
      "Precio depende del sentimiento del mercado"
    ]
  }
};

module.exports = {
  ASSET_EDUCATION
};
