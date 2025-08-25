// config/rentaFijaConfig.js

const RENTA_FIJA_CONFIG = {
  // Contenido principal por experiencia y preferencia de dividendos
  MAIN_CONTENT: {
    'Principiante': {
      0: { // Sin preferencia por ingresos periódicos (acumulación)
        title: "Renta Fija para Acumulación - Nivel Principiante",
        content: `Como inversor principiante que prioriza la acumulación de capital, la renta fija será tu ancla de estabilidad en la cartera. Te recomendamos comenzar con fondos diversificados que reinviertan automáticamente los cupones para maximizar el efecto del interés compuesto.

Los ETFs de acumulación son ideales para tu perfil porque no generan distribuciones gravables periódicas, permitiéndote diferir los impuestos hasta la venta. Esto es especialmente ventajoso si tienes un horizonte temporal medio-largo.

Evita la compra directa de bonos individuales al principio, ya que requiere mayor capital y conocimiento para diversificar adecuadamente el riesgo de crédito y duración.`,
        tips: [
          "Prioriza fondos de acumulación sobre los de distribución para optimizar la fiscalidad",
          "Comienza con fondos globales diversificados antes de especializarte en sectores",
          "Reinvierte automáticamente cualquier distribución accidental para mantener el crecimiento compuesto",
          "Considera la duración del fondo según tu horizonte temporal específico"
        ],
        products: [
          {
            name: "iShares Core Global Aggregate Bond UCITS ETF (AGGG)",
            description: "ETF de acumulación con exposición global diversificada, ideal para principiantes"
          },
          {
            name: "Vanguard Global Aggregate Bond UCITS ETF (VAGF)",
            description: "Fondo de acumulación con comisiones muy bajas y amplia diversificación geográfica"
          },
          {
            name: "Xtrackers Global Government Bond UCITS ETF (XGOV)",
            description: "Enfocado en bonos soberanos globales, menor riesgo de crédito"
          }
        ]
      },
      1: { // Con preferencia por ingresos periódicos
        title: "Renta Fija para Ingresos - Nivel Principiante",
        content: `Al buscar ingresos periódicos de la renta fija, necesitas productos que distribuyan cupones de forma regular. Los fondos y ETFs de distribución serán tus aliados principales, ya que te ofrecen diversificación profesional y pagos periódicos predecibles.

Es importante que entiendas que los ingresos por cupones están sujetos a tributación anual, independientemente de si los reinviertes o no. Por ello, asegúrate de tener un plan fiscal claro.

Para principiantes, recomendamos fondos que combinen bonos soberanos y corporativos de alta calidad, evitando especializaciones muy arriesgadas como high yield o mercados emergentes.`,
        tips: [
          "Los cupones se tributan como rendimientos del capital mobiliario en el año que se reciben",
          "Planifica la liquidez para los pagos de impuestos sobre los cupones recibidos",
          "Busca fondos con historial de distribuciones consistentes y predecibles",
          "Considera el calendario de pagos para planificar tu flujo de caja personal"
        ],
        products: [
          {
            name: "iShares Core Global Aggregate Bond UCITS ETF Dist (SAGG)",
            description: "Versión distribuidora del agregado global, pagos trimestrales"
          },
          {
            name: "Vanguard EUR Corporate Bond UCITS ETF (VECP)",
            description: "Bonos corporativos europeos con distribuciones regulares"
          },
          {
            name: "iShares EUR Government Bond UCITS ETF Dist (SEGA)",
            description: "Bonos soberanos europeos con pagos predecibles"
          },
          {
            name: "Xtrackers EUR Corporate Bond UCITS ETF Dist (XEUC)",
            description: "Corporativos europeos grado inversión con distribución mensual"
          }
        ]
      }
    },
    'Intermedio': {
      0: { // Sin preferencia por ingresos periódicos (acumulación)
        title: "Estrategia de Renta Fija Intermedia - Acumulación",
        content: `Como inversor intermedio enfocado en acumulación, puedes comenzar a diversificar tu exposición de renta fija en diferentes segmentos del mercado. Considera dividir tu asignación entre bonos soberanos, corporativos y potencialmente alguna exposición internacional.

Puedes explorar ETFs más especializados por duración, calidad crediticia o geografía. La segmentación te permitirá ajustar mejor tu perfil de riesgo-rentabilidad y adaptarte a diferentes ciclos económicos.

Con tu nivel de experiencia, también puedes considerar estrategias como el "core-satellite", manteniendo una base sólida en agregados globales y añadiendo posiciones satelitales más específicas.`,
        tips: [
          "Diversifica por duración: combina bonos cortos, medios y largos según tu horizonte",
          "Considera asignaciones geográficas: Europa, EE.UU., mercados desarrollados",
          "Explora diferentes calidades crediticias dentro de tu tolerancia al riesgo",
          "Utiliza la curva de tipos para optimizar la duración de tu cartera de bonos"
        ],
        products: [
          {
            name: "iShares Core EUR Govt Bond UCITS ETF (IEAG)",
            description: "Base sólida en soberanos europeos para el core de tu posición"
          },
          {
            name: "Vanguard EUR Corporate Bond UCITS ETF (VECP)",
            description: "Exposición a corporativos europeos grado inversión"
          },
          {
            name: "iShares USD Treasury Bond 7-10yr UCITS ETF (IDTU)",
            description: "Exposición específica al Tesoro americano a medio-largo plazo"
          },
          {
            name: "Xtrackers II Global Government Bond UCITS ETF (XGOV)",
            description: "Diversificación global en bonos soberanos"
          },
          {
            name: "iShares Global High Yield Corp Bond UCITS ETF (GHYG)",
            description: "Para una pequeña exposición a high yield (máximo 5-10% del total)"
          }
        ]
      },
      1: { // Con preferencia por ingresos periódicos
        title: "Optimización de Ingresos - Nivel Intermedio",
        content: `Con experiencia intermedia y enfoque en ingresos, puedes construir una cartera más sofisticada que maximice el yield manteniendo un riesgo controlado. Considera combinar diferentes tipos de bonos para optimizar tanto el rendimiento como la frecuencia de pagos.

Puedes explorar bonos corporativos de mayor rendimiento, REITs de renta fija, e incluso una pequeña asignación a high yield si tu perfil de riesgo lo permite. La clave está en balancear rendimiento y seguridad.

También puedes empezar a considerar la construcción de una "escalera de vencimientos" (laddering) para gestionar el riesgo de tipos de interés y asegurar flujos de caja predecibles.`,
        tips: [
          "Escalonamiento de vencimientos para reducir el riesgo de reinversión",
          "Combina frecuencias de pago para optimizar tu flujo de caja personal",
          "Monitoriza los diferenciales crediticios para identificar oportunidades",
          "Considera bonos con protección inflacionista si esperas inflación sostenida"
        ],
        products: [
          {
            name: "iShares EUR High Yield Corp Bond UCITS ETF (IHYG)",
            description: "High yield europeo para mayor rendimiento controlado"
          },
          {
            name: "Vanguard Global Short-Term Bond Index Fund",
            description: "Bonos cortos globales para estabilidad y liquidez"
          },
          {
            name: "iShares USD Treasury Bond 20+yr UCITS ETF (IDTL)",
            description: "Duración larga para mayor sensibilidad y rendimiento potencial"
          },
          {
            name: "SPDR Bloomberg Euro High Yield Bond UCITS ETF (JNK4)",
            description: "Alternativa en high yield europeo con buena liquidez"
          },
          {
            name: "iShares Global Inflation Linked Govt Bond UCITS ETF (GILD)",
            description: "Protección contra inflación manteniendo ingresos reales"
          }
        ]
      }
    },
    'Avanzado': {
      0: { // Sin preferencia por ingresos periódicos (acumulación)
        title: "Gestión Avanzada de Renta Fija - Acumulación",
        content: `Como inversor avanzado, tienes la capacidad de implementar estrategias sofisticadas de renta fija. Puedes considerar la compra directa de bonos individuales para construir carteras a medida, implementar estrategias de barbelling, o usar derivados para coberturas específicas.

Tu enfoque en acumulación te permite ser más táctico con la duración y el timing del mercado. Puedes aprovechar dislocaciones temporales en la curva de rendimientos o arbitrajes entre diferentes segmentos del mercado.

Considera también bonos convertibles, preferred shares, y otros instrumentos híbridos que pueden ofrecer características únicas de riesgo-rendimiento para tu cartera.`,
        tips: [
          "Construye escaleras de bonos individuales para control total sobre vencimientos",
          "Utiliza estrategias de barbelling: combina bonos muy cortos y muy largos",
          "Aprovecha dislocaciones temporales en spreads crediticios",
          "Considera coberturas con derivados para gestión activa del riesgo de tipos"
        ],
        products: [
          {
            name: "Bonos del Tesoro Español Individuales",
            description: "Compra directa para control total sobre vencimientos y cupones"
          },
          {
            name: "iShares USD TIPS UCITS ETF (TIPS)",
            description: "Bonos indexados a inflación americana para cobertura real"
          },
          {
            name: "Invesco EUR Corporate Bond UCITS ETF (PSCS)",
            description: "Exposición corporativa europea con gestión activa"
          },
          {
            name: "VanEck Vectors Fallen Angel High Yield Bond UCITS ETF",
            description: "Estrategia especializada en 'ángeles caídos' con potencial alpha"
          },
          {
            name: "WisdomTree EUR Aggregate Bond Enhanced Yield UCITS ETF",
            description: "Estrategia de yield enhancement manteniendo calidad crediticia"
          }
        ]
      },
      1: { // Con preferencia por ingresos periódicos
        title: "Maximización de Ingresos - Estrategia Avanzada",
        content: `Con tu experiencia avanzada y enfoque en ingresos, puedes implementar estrategias complejas para maximizar el yield ajustado por riesgo. Esto incluye covered calls sobre bonos, estrategias de carry trade, y construcción de carteras de alta convexidad.

Puedes explorar segmentos más especializados como preferred shares, REITs de deuda, bonos convertibles, e incluso estrategias de lending peer-to-peer institucional. La clave es diversificar las fuentes de ingreso manteniendo correlaciones bajas.

También puedes implementar coberturas dinámicas para proteger tu capital mientras maximizas el income, utilizando opciones, swaps, o estrategias de collar en tus posiciones principales.`,
        tips: [
          "Diversifica fuentes de ingreso: cupones, dividendos preferenciales, primas de opciones",
          "Implementa coberturas dinámicas para proteger capital en entornos volátiles",
          "Utiliza análisis de convexidad para optimizar sensibilidad a tipos de interés",
          "Considera estrategias de income enhancement con derivados (covered calls, cash-secured puts)"
        ],
        products: [
          {
            name: "iShares USD Floating Rate Bond UCITS ETF (FLOT)",
            description: "Bonos de tasa flotante para protección en entornos de tipos crecientes"
          },
          {
            name: "VanEck Vectors Mortgage REIT Income ETF",
            description: "REITs hipotecarios para yields elevados con gestión profesional"
          },
          {
            name: "Global X SuperDividend ETF (SDIV)",
            description: "Estrategia global de altos dividendos incluyendo preferred shares"
          },
          {
            name: "iShares Convertible Bond UCITS ETF (ICVT)",
            description: "Bonos convertibles para combinar income con potencial de upside equity"
          },
          {
            name: "Invesco Senior Loan UCITS ETF",
            description: "Préstamos senior floating rate para mayor yield y menor sensibilidad a tipos"
          },
          {
            name: "WisdomTree AT1 CoCo Bond UCITS ETF (COCO)",
            description: "Bonos contingent convertible para yields atractivos (solo para perfiles muy arriesgados)"
          }
        ]
      }
    }
  },

  // Bloques adicionales según características específicas
  ADDITIONAL_BLOCKS: {
    HORIZONTE_CORTO: { // Para timeValue = 1 (3 años o menos)
      'Principiante': `**Enfoque en Liquidez y Capital Preservation**

Con un horizonte corto, tu prioridad absoluta debe ser la preservación del capital y la liquidez. Evita bonos de larga duración que puedan experimentar volatilidad significativa.

Concéntrate en instrumentos del mercado monetario, bonos gubernamentales de corta duración (1-3 años), y fondos de bonos ultrashort. Tu objetivo no es maximizar rentabilidad sino asegurar que el capital esté disponible cuando lo necesites.`,
      'Intermedio': `**Optimización Táctica a Corto Plazo**

Tu experiencia te permite ser más táctico en la gestión de duración. Puedes aprovechar movimientos de la curva de tipos construyendo posiciones específicas en el tramo corto.

Considera estrategias de roll-down en bonos gubernamentales, donde compras bonos de 2-3 años y aprovechas la ganancia de capital conforme se acerca el vencimiento. Mantén siempre una reserva en instrumentos líquidos.`,
      'Avanzado': `**Gestión Profesional de Liquidez**

Implementa estrategias sofisticadas de cash management utilizando repos, commercial papers de alta calidad, y construcción de ladders muy cortas (3-6-12 meses).

Puedes usar derivados para cobertura táctica y aprovechar dislocaciones temporales en el mercado monetario. Considera también estrategias de arbitraje en la curva corta si identificas oportunidades.`
    },

    HORIZONTE_MEDIO: { // Para timeValue = 2 (3-5 años)
      'Principiante': `**Equilibrio entre Seguridad y Rendimiento**

Con 3-5 años puedes asumir algo más de duración para capturar mayor rendimiento. Los bonos de duración intermedia (3-7 años) serán tu zona de confort.

Diversifica entre bonos soberanos y corporativos de alta calidad. Este horizonte te permite capturar la mayor parte de la prima de término sin exponerte excesivamente al riesgo de duración.`,
      'Intermedio': `**Construcción Táctica de Duration**

Tu horizonte medio te permite implementar estrategias más dinámicas. Puedes ajustar la duración de tu cartera según tus expectativas sobre la evolución de los tipos de interés.

Considera combinar bonos cortos (1-3 años) y medios (5-7 años) para crear flexibilidad. Esto te permite reinvertir la parte corta si los tipos suben, mientras mantienes exposure a la parte media de la curva.`,
      'Avanzado': `**Gestión Activa de la Curva**

Implementa estrategias de butterfly, barbell, y bullet según tu visión macro. Puedes ser más agresivo con la gestión de duración y calidad crediticia.

Considera positions en bonos corporativos de mayor yield, mercados emergentes (small allocation), y estrategias de carry que aprovechen diferencias en curvas de diferentes países.`
    },

    HORIZONTE_LARGO: { // Para timeValue = 3 o 4 (5+ años)
      'Principiante': `**Maximizar el Poder del Interés Compuesto**

Con horizonte largo, puedes aprovechar plenamente el interés compuesto reinvirtiendo todos los cupones. Los bonos de mayor duración te ofrecerán yields más atractivos.

No temas a la volatilidad temporal de los bonos largos; tu horizonte te permite superar los ciclos de tipos de interés. Concéntrate en la acumulación consistente y la reinversión automática.`,
      'Intermedio': `**Diversificación Geográfica y Sectorial**

Expande tu universo de inversión incluyendo bonos internacionales, corporativos de diferentes sectores, y considera una pequeña asignación a mercados emergentes.

Tu horizonte largo te permite asumir mayor riesgo crediticio a cambio de yields más atractivos. Construye una cartera core-satellite con base sólida en agregados y posiciones especializadas.`,
      'Avanzado': `**Estrategias de Largo Plazo Sofisticadas**

Implementa estrategias de immunización, cash flow matching, o construcción de liability-driven portfolios si tienes objetivos específicos de largo plazo.

Considera exposiciones alternativas como infrastructure debt, private credit (a través de fondos), y estrategias de total return que combinen capital appreciation con income generation.`
    },

    MUY_CONSERVADOR: { // Para riskProfile = 'Bajo Riesgo'
      'Principiante': `**Máxima Seguridad y Preservación**

Tu perfil conservador requiere enfoque absoluto en preservación de capital. Limítate a bonos soberanos AAA/AA y corporativos de máxima calidad (AAA/AA).

Evita completamente high yield, mercados emergentes, y bonos de larga duración. Tu cartera de renta fija debe ser el ancla de estabilidad de toda tu cartera de inversión.`,
      'Intermedio': `**Conservadurismo Inteligente**

Mantén tu enfoque conservador pero optimiza dentro de estos límites. Puedes diversificar geográficamente en países AAA (Alemania, Suiza, Países Bajos) para reducir el riesgo de concentración.

Considera bonos indexados a inflación para proteger tu poder adquisitivo real manteniendo la máxima seguridad crediticia.`,
      'Avanzado': `**Estrategias Conservadoras Sofisticadas**

Implementa estrategias de laddering y immunización usando exclusivamente bonos de máxima calidad. Puedes usar derivados defensivamente para cobertura, nunca para especulación.

Considera structured products conservadores que ofrezcan protección de capital con algún upside limitado, siempre evaluando cuidadosamente el riesgo de contraparte.`
    },

    ESG: { // Si session.esgValue > 0
      'Principiante': `**Introducción a Bonos Sostenibles**

Los bonos verdes y sostenibles te permiten alinear tus inversiones con tus valores. Comienza con fondos ESG diversificados que aplican filtros de sostenibilidad.

Los green bonds de emisores soberanos (como el Bono Verde del Estado español) ofrecen la combinación ideal de impacto positivo y seguridad crediticia para principiantes.`,
      'Intermedio': `**Diversificación ESG Estratégica**

Expande tu exposure ESG combinando green bonds, social bonds, y sustainability-linked bonds. Puedes diversificar entre emisores soberanos, corporativos, y supranacionales.

Evalúa no solo el label ESG sino también el framework y el impacto real de los proyectos financiados. Tu experiencia te permite ser más selectivo en la calidad ESG.`,
      'Avanzado': `**ESG Integration Avanzada**

Implementa estrategias ESG sofisticadas que combinen screening, integration, y active ownership. Puedes participar directamente en emisiones primarias de bonos sostenibles.

Considera bonos de transición, blue bonds, pandemic bonds, y otros instrumentos ESG especializados que ofrecen oportunidades únicas de risk-return con impacto positivo.`
    },

    INFLACION_ALTA: { // Se podría activar con algún indicador macro o preferencia del usuario
      'Principiante': `**Protección Básica Contra Inflación**

En entornos inflacionarios, los bonos tradicionales pierden poder adquisitivo. Considera ETFs de bonos indexados a inflación (TIPS, LINKERS) como protección básica.

Los bonos de tasa flotante también ofrecen cierta protección natural, ya que sus cupones se ajustan periódicamente a las tasas de mercado.`,
      'Intermedio': `**Estrategias Anti-inflacionarias**

Combina diferentes instrumentos de protección: TIPS, bonos flotantes, y real assets bonds. Puedes también considerar bonos de países con mejor historial inflacionario.

Analiza la curva real vs nominal para identificar oportunidades de breakeven inflation que estén mal preciadas por el mercado.`,
      'Avanzado': `**Gestión Sofisticada del Riesgo Inflacionario**

Implementa swaps de inflación, estrategias de curve positioning en mercados reales, y construcción de carteras que mantengan duration real mientras gestionan duration nominal.

Considera exposiciones a commodities a través de commodity-linked bonds, y estrategias de hedging dinámico que se ajusten automáticamente a cambios en expectativas inflacionarias.`
    }
  }
};

module.exports = { RENTA_FIJA_CONFIG };