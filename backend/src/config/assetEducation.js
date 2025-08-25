// backend/src/config/assetEducation.js

const ASSET_EDUCATION = {
  RENTA_VARIABLE: {
    title: "Renta Variable (Acciones) 📈",
    description: "La renta variable es el motor de crecimiento de tu cartera. Cuando inviertes en acciones, compras una pequeña parte de una empresa. Si compras un ETF o un fondo que invierte en acciones, estas comprando una parte pequeña de muchas empresas al mismo tiempo.",
    role: "Es el activo con mayor potencial de crecimiento a largo plazo. Su principal función es generar retornos significativos que superen la inflación y otros activos, lo que te ayuda a alcanzar tus objetivos financieros. La inflación es el aumento de precio de los productos y servicios, por lo que sí puedes comprar menos con la misma moneda.",
    expectedReturn: "Históricamente, la renta variable ha ofrecido los mayores retornos, con rentabilidades anualizadas que pueden oscilar entre el 5% y el 9% a largo plazo, dependiendo de la región y el mercado.",
    behavior: "Es el activo más volátil. Su valor puede fluctuar significativamente a corto plazo debido a noticias, ciclos económicos o el sentimiento del mercado. Requiere paciencia y una mentalidad a largo plazo.",
    pros: [
      "Alto potencial de crecimiento y rentabilidad",
      "Protección contra la inflación a largo plazo",
      "Generación de ingresos pasivos (dividendos) si inviertes en empresas que los reparten"
    ],
    cons: [
      "Riesgo elevado y alta volatilidad a corto plazo",
      "Posibilidad de pérdida de capital"
    ]
  },

  RENTA_FIJA: {
    title: "Renta Fija (Bonos) 💰",
    description: "La renta fija es el ancla de tu cartera. Cuando compras bonos, actúas como un prestamista, y el emisor (gobierno o empresa) te paga un interés por ese préstamo.",
    role: "Su función principal es reducir la volatilidad y el riesgo. Actúa como un colchón durante las caídas del mercado de acciones, proporcionando estabilidad y un flujo de ingresos predecible.",
    expectedReturn: "Su rentabilidad es más modesta y predecible que la de las acciones, con retornos anualizados que suelen estar en un rango del 2% al 6%, dependiendo del tipo de bono, la solvencia del emisor y las tasas de interés.",
    behavior: "Es un activo mucho menos volátil que las acciones. Su valor tiende a moverse en la dirección opuesta a los tipos de interés: cuando los tipos suben, el valor de los bonos baja, y viceversa.",
    pros: [
      "Estabilidad y menor riesgo de pérdida de capital",
      "Generación de ingresos regulares y predecibles (cupones)",
      "Diversifica el riesgo de la renta variable"
    ],
    cons: [
      "Menor potencial de crecimiento a largo plazo",
      "Vulnerable a la inflación si la rentabilidad es inferior al aumento de los precios",
      "Riesgo de insolvencia del emisor (riesgo de crédito)"
    ]
  },

  CRIPTOMONEDAS: {
    title: "Criptomonedas ⛓️",
    description: "Las criptomonedas, lideradas por Bitcoin y Ethereum, son una clase de activo digital y descentralizado. Su inclusión en una cartera moderna es un tema de debate.",
    role: "Puede actuar como un activo satélite de alto riesgo y alto rendimiento. Su principal función es ofrecer un potencial de crecimiento exponencial y, para algunos, servir como una reserva de valor digital no correlacionada con los mercados tradicionales.",
    expectedReturn: "No hay un histórico fiable y consistente. Ha ofrecido rendimientos extraordinarios en el pasado, pero también caídas muy severas. La rentabilidad futura es muy incierta y depende de la adopción y la regulación.",
    behavior: "Es el activo más volátil y especulativo de todos. Su valor puede cambiar drásticamente en cuestión de días o incluso horas. No es un activo para inversores con aversión al riesgo.",
    pros: [
      "Potencial de crecimiento muy alto",
      "Baja o nula correlación con los activos tradicionales (en algunos períodos)",
      "Descentralización y resistencia a la censura"
    ],
    cons: [
      "Extrema volatilidad y riesgo de pérdida total",
      "Falta de regulación y riesgo de fraude(sobretodo en monedas nuevas",
      "Rendimiento y valor intrínseco difíciles de justificar"
    ]
  },

  EFECTIVO: {
    title: "Efectivo 💵",
    description: "El efectivo (dinero en una cuenta de ahorro, depósitos a plazo fijo, etc.) es la base de tu seguridad financiera.",
    role: "Sirve como reserva de seguridad y liquidez. Su función principal es proteger tu capital de la volatilidad del mercado y garantizar que tengas fondos disponibles para emergencias u oportunidades de inversión.",
    expectedReturn: "La rentabilidad es mínima y, en muchos casos, apenas compensa la inflación (o incluso es negativa en términos reales). Se espera que se mantenga en un rango muy bajo, a menudo por debajo del 2%.",
    behavior: "Es el activo más seguro y menos volátil. Su valor nominal se mantiene constante, aunque su poder adquisitivo puede disminuir con el tiempo debido a la inflación.",
    pros: [
      "Máxima seguridad y liquidez",
      "Ideal para fondos de emergencia y para aprovechar oportunidades de compra en el mercado"
    ],
    cons: [
      "Rentabilidad muy baja o nula",
      "Pérdida de poder adquisitivo a largo plazo debido a la inflación"
    ]
  }
};

module.exports = {
  ASSET_EDUCATION
};