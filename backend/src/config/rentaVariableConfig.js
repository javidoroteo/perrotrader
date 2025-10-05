// config/rentaVariableConfig.js

const RENTA_VARIABLE_CONFIG = {
  // Contenido principal por experiencia y dividendos
  MAIN_CONTENT: {
    'Principiante': {
      0: { // No busca dividendos
        title: "Fondos indexados diversificados",
        content: `Empieza con un fondo que replique el S&P 500 o MSCI World. Son automáticos, diversificados y perfectos para aprender sin complicarte. Tienen ventaja fiscal: puedes hacer traspasos entre fondos sin pagar impuestos hasta que retires el dinero.

Una vez cómodo con fondos, considera ETFs como IWDA (iShares MSCI World) o VWCE (Vanguard All-World). Menor coste que los fondos activos y acceso a miles de empresas globales.

Lo mejor al principio es crear un hábito de inversión, ir creando la cartera mientras que obtienes experiencia y empiezas a comprender mejor el mercado.

Estos fondos están pensados para que estés lo más diversificado posible con la menor complicación. Son perfectos para principiantes para ir adentrándose en el mundo de la inversión.`,
        tips: [
          "Busca fondos indexados y ETFs de tipo acumulación, donde reinvierten los dividendos en las mismas acciones, así generas interés compuesto y lo ahorras en impuestos.",
          "Si te reparten dividendos a tu cuenta hay que pagar impuestos por ello."
        ],
        products: [
          { name: "S&P 500 ETFs",ticker:"SPY5.L", description: "Acceso a las 500 mayores empresas estadounidenses" },
          { name: "MSCI World ETFs", ticker:"IWDA.L", description: "Diversificación global en mercados desarrollados" },
          { name: "VWCE (Vanguard All-World)", ticker:"VWCE.DE", description: "Acceso a miles de empresas globales" }
        ]
      },
      1: { // Busca dividendos
        title: "Fondos y ETFs que reparten dividendos",
        content: `Si tu objetivo es generar ingresos periódicos, puedes empezar por fondos indexados o ETFs de distribución. Estos productos reparten los dividendos generados por las empresas que componen el índice directamente en tu cuenta.

Aunque tienen una estructura sencilla como los fondos de acumulación, los de distribución están diseñados específicamente para que recibas ese flujo de caja sin necesidad de vender.

Puedes buscar fondos o ETFs que sigan índices amplios como el MSCI World, el S&P 500 o incluso índices centrados en empresas que reparten dividendos de forma consistente, como los Dividend Aristocrats.

Lo bueno de este tipo de empresas es que en general no son tan volátiles, es decir sus movimientos no son tan bruscos, ni para abajo ni para arriba, así que en general se consideran menos arriesgadas. Pero recuerda, rendimientos pasados no garantizan rendimientos futuros.`,
        tips: [
          "Revisa la política de reparto y la fiscalidad",
          "A diferencia de los fondos de acumulación, aquí sí tributarás por los dividendos cobrados cada año.",
          "Asegúrate de que el reparto se adapte a tu calendario y que el producto sea compatible con tu broker."
        ],
        products: [
          { name: "iShares MSCI World Dividend UCITS ETF (WQDV)",ticker:"WQDV.L", description: "Invierte en empresas de todo el mundo que reparten dividendo" },
          { name: "SPDR S&P Global Dividend Aristocrats",ticker:"	GLDV.L", description: "Empresas que llevan repartiendo y aumentando dividendo durante los últimos 7 años" }
        ]
      }
    },
    'Intermedia': {
      0: { // No dividendos
        title: "Fondos y ETFs para crecer sin complicarte",
        content: `Una vez que dominas lo básico, puedes dar el siguiente paso y combinar fondos indexados con ETFs bien seleccionados para construir una cartera más eficiente.

ETFs globales de acumulación como VWCE (Vanguard FTSE All-World) o IWDA (iShares MSCI World) te dan acceso a miles de empresas de todo el mundo con muy bajos costes.

Son ideales si tu prioridad es hacer crecer tu patrimonio sin preocuparte por los dividendos, ya que reinvierten automáticamente los beneficios en lugar de repartirlos.

Mantén una base sólida con un ETF global (núcleo) y, si lo deseas, puedes añadir pequeñas posiciones en ETFs temáticos o sectoriales que te interesen: tecnología, sostenibilidad, salud, etc. Añade aquellos sectores donde tengas más experiencia.

Esto te permite aumentar el potencial de crecimiento sin complicarte con selección de acciones individuales.`,
        tips: [
          "Al usar productos de acumulación, difieres el pago de impuestos y aprovechas el efecto del interés compuesto.",
          "Los ETFs suelen tener comisiones más bajas que los fondos tradicionales, especialmente si inviertes por tu cuenta."
        ],
        products: [
          { name: "VWCE (Vanguard FTSE All-World)", ticker:"VHYL.L", description: "ETF global de acumulación con muy bajas comisiones" },
          { name: "IWDA (iShares MSCI World)", ticker:"	WQDV.L", description: "Acceso diversificado a mercados desarrollados" },
          { name: "ETFs sectoriales", ticker:"EQQQ.L", description: "Tecnología, sostenibilidad, salud para complementar tu núcleo" }
        ]
      },
      1: { // Dividendos
        title: "ETFs de dividendos para generar ingresos periódicos",
        content: `Si tu objetivo es obtener rentas de forma regular y ya tienes cierta experiencia, puedes usar ETFs de acciones que reparten dividendos de forma periódica.

Existen ETFs que replican índices con empresas seleccionadas por su historial de pago de dividendos estables y sostenibles, como los Dividend Aristocrats o el MSCI High Dividend Yield.

Estos ETFs reparten dividendos de forma trimestral o semestral directamente en tu cuenta. Son ideales si buscas complementar tu renta sin necesidad de vender participaciones.

Puedes formar el núcleo de tu cartera con un ETF de dividendos global y, si te interesa, complementarlo con un ETF sectorial defensivo (como consumo básico o salud), que suelen tener menor volatilidad y buena rentabilidad por dividendo.`,
        tips: [
          "Ten en cuenta que los dividendos cobrados tributan cada año. Lo importante no es solo el porcentaje bruto, sino cuánto queda neto tras impuestos y comisiones.",
          "Revisa si el ETF tiene domicilio fiscal adecuado para evitar retenciones adicionales (mejor Irlanda que EE.UU.)."
        ],
        products: [
          { name: "SPDR S&P Global Dividend Aristocrats", ticker:"GLDV.L", description: "Empresas con historial de dividendos crecientes" },
          { name: "iShares MSCI World Quality Dividend", ticker:"	WQDV.L", description: "Dividendos de calidad con criterios de sostenibilidad" },
          { name: "Vanguard FTSE All-World High Dividend Yield (VHYL)", ticker:"VHYL.L", description: "Alto rendimiento por dividendo con diversificación global" }
        ]
      }
    },
    'Avanzada': {
      0: { // No dividendos
        title: "Crecimiento activo con control y visión estratégica",
        content: `Dado tu nivel de experiencia, puedes construir una cartera orientada al crecimiento combinando ETFs globales de acumulación, fondos temáticos y, si lo deseas, selección directa de acciones.

Una estructura eficiente es la estrategia núcleo + satélites:
• Núcleo con un ETF global diversificado como VWCE (Vanguard FTSE All-World) o IWDA (iShares MSCI World).
• Satélites con temáticas que dominas o sectores donde tienes convicción (tecnología, salud, inteligencia artificial, sostenibilidad, etc.).

Si tienes convicciones claras sobre ciertas empresas o sectores concretos, puedes destinar una pequeña parte de tu renta variable (por ejemplo, un 10–15%) a selección activa de acciones individuales. Esto te permite aplicar tu propio criterio sin comprometer la estabilidad general de tu cartera.

Este enfoque te permite capturar crecimiento global sin complicarte con exceso de rotación, mientras reservas un espacio para tus ideas más específicas.`,
        tips: [
          "No confundas convicción con concentración. Incluso con conocimientos avanzados, la sobre concentración puede amplificar el riesgo.",
          "Mantén una base diversificada y asegúrate de que las posiciones satélite no comprometan tu equilibrio general.",
          "Si no necesitas ingresos inmediatos, prioriza ETFs de acumulación para optimizar el interés compuesto."
        ],
        products: [
          { name: "VWCE (Vanguard FTSE All-World)", ticker:"VHYL.L", description: "Núcleo global diversificado" },
          { name: "IWDA (iShares MSCI World)", ticker:"IWDA.L", description: "Base sólida en mercados desarrollados" },
          { name: "ETFs temáticos", description: "Satélites en sectores de convicción" },
          { name: "Acciones individuales", description: "10-15% para ideas específicas con criterio propio" }
        ]
      },
      1: { // Dividendos
        title: "Generación de Ingresos Pasivos con Visión y Calidad",
        content: `Dado tu nivel de experiencia, puedes construir una cartera orientada a la generación de ingresos pasivos a través de dividendos de alta calidad. El objetivo no es solo la rentabilidad por dividendo, sino la seguridad, el crecimiento y la sostenibilidad de esos dividendos en el tiempo.

Una estructura de cartera efectiva también es la estrategia núcleo + satélites:
• Núcleo con ETFs de distribución que ofrezcan exposición global centrados en empresas con historial probado de dividendos estables y crecientes.
• Satélites con selección directa de acciones de empresas que cumplen con tu tesis de inversión.

Busca empresas con un moat (ventaja competitiva duradera), historial de aumentos de dividendos y bajo payout ratio, que les da margen para crecer.

También puedes usar ETFs sectoriales de distribución centrados en industrias que entiendes bien y tienden a pagar dividendos, como salud, infraestructuras o bienes de consumo básicos.`,
        tips: [
          "Ten en cuenta que los dividendos cobrados tributan cada año. Lo importante no es solo el porcentaje bruto, sino cuánto queda neto.",
          "Revisa si el ETF tiene domicilio fiscal adecuado para evitar retenciones adicionales.",
          "Este enfoque está diseñado para maximizar ingresos pasivos sostenibles, priorizando calidad sobre porcentaje."
        ],
        products: [
          { name: "MSCI World High Dividend Yield ETFs", description: "Núcleo global centrado en dividendos de calidad" },
          { name: "MSCI World Quality Dividend ETFs", description: "Dividendos sostenibles con criterios de calidad" },
          { name: "Dividend Aristocrats", description: "Empresas con historial probado de aumentos" },
          { name: "Acciones individuales selectivas", description: "Empresas con moat y dividendos crecientes" }
        ]
      }
    }
  },

  // Bloques adicionales condicionales
  ADDITIONAL_BLOCKS: {
    TECNOLOGIA: {
      'Principiante': `Si te apasiona la tecnología, puedes canalizar ese interés de una forma inteligente. En lugar de apostar por una sola empresa, puedes usar ETFs sectoriales de tecnología para invertir en las mejores compañías del sector de manera diversificada. Piensa en ellos como un pequeño "satélite" que complementa tu cartera principal. Por ejemplo, podrías investigar un ETF que invierta en las 100 principales empresas tecnológicas de EE.UU. Este es un buen punto de partida para entender el sector sin asumir un riesgo excesivo.`,
      
      'Intermedia': `Si te interesa el sector tecnológico, la inteligencia artificial o la innovación, puedes añadir una pequeña parte de tu cartera en ETFs temáticos tecnológicos, como el iShares Digitalisation, el iShares Automation & Robotics, o el Nasdaq-100. Estos productos son más volátiles, así que deben representar una parte limitada de tu inversión, especialmente si estás empezando.`,
      
      'Avanzada': `Si te interesa el sector tecnológico, la inteligencia artificial o la innovación, puedes añadir una pequeña parte de tu cartera en ETFs temáticos tecnológicos, como el iShares Digitalisation, el iShares Automation & Robotics, o el Nasdaq-100. Usa un gran fondo de renta variable global como núcleo, y destina una parte significativa de tus satélites a acciones individuales de empresas con modelos de negocio innovadores y ventajas competitivas duraderas (moat). Podrías incluso investigar la inversión en fondos de capital riesgo o en empresas privadas con alto potencial, si tienes la oportunidad, para acceder a la fase de crecimiento más temprana.`
    },

    LARGO_PLAZO: {
      'Principiante': `Tu horizonte de inversión a largo plazo es tu mayor ventaja. El tiempo no solo suaviza las caídas del mercado, sino que también amplifica el poder del interés compuesto. Lo más importante es que empieces a invertir cuanto antes. No necesitas preocuparte por encontrar el momento perfecto para comprar; lo clave es mantener el rumbo y ser constante. Para esto, una estrategia como el DCA (Dollar-Cost Averaging), que te explicamos más adelante, te ayudará a invertir de forma regular y sin estrés.`,
      
      'Intermedia': `Tu horizonte a largo plazo es una ventaja, pero ahora puedes usarlo de forma más activa. Además de las aportaciones regulares, es el momento de aplicar una estrategia de reequilibrio de cartera. Esto significa vender activos que se han sobrevalorado para comprar aquellos que se han quedado atrás, manteniendo así tu asignación de activos deseada. Este enfoque te ayuda a "comprar barato y vender caro" de manera sistemática, aprovechando las fluctuaciones del mercado. Esto también depende del valor de la cartera por las comisiones, cuanto mayor sea la cantidad menos influencia tienen las comisiones a nivel porcentual y más podrás hacer.`,
      
      'Avanzada': `Tu horizonte de inversión es tu lienzo. Con alto conocimiento puedes ir más allá del reequilibrio y considerar una asignación de activos estratégica que evolucione con los ciclos económicos. Usa herramientas avanzadas para la gestión de riesgos, como derivados, para proteger tu cartera de grandes caídas. El objetivo es optimizar la relación riesgo-rentabilidad, maximizando el crecimiento a largo plazo mientras proteges tu patrimonio de eventos imprevistos.`
    },

    ESG: {
      'Principiante': `Si la sostenibilidad es importante para ti, puedes alinear tus inversiones con tus valores personales. La etiqueta ESG (Environmental, Social, and Governance) te ayuda a encontrar fondos y ETFs que invierten de forma responsable. Estos productos siguen los mismos índices de mercado, pero con un filtro extra que excluye a empresas controvertidas (como las de armas, tabaco o combustibles fósiles) o a aquellas con malas prácticas. Un ejemplo claro es el iShares ESG Aware S&P 500 ETF (ESGU), que replica el S&P 500 pero solo invierte en empresas que cumplen con sus criterios de sostenibilidad.`,
      
      'Intermedia': `Si te importa la sostenibilidad o la inversión responsable, puedes elegir versiones ESG de los fondos o ETFs que se pueden ajustar a tu perfil. Por ejemplo, existen versiones del MSCI World ESG, del S&P 500 ESG, o ETFs de dividendos que excluyen empresas de sectores controvertidos como el armamento, el tabaco o los combustibles fósiles. O incluso podrías empezar a plantearte tus propios criterios ESG y aplicarlo a tus inversiones.`,
      
      'Avanzada': `Tu estrategia de sostenibilidad se convierte en inversión de impacto. Más allá de los ETFs, puedes construir una cartera de acciones individuales basándote en tu propio análisis fundamental ESG, invirtiendo solo en aquellas empresas cuyas prácticas se alinean perfectamente con tus valores y tienen un potencial de rendimiento superior. La clave está en buscar empresas que no solo cumplen, sino que están innovando en materia de sostenibilidad y liderando el cambio en sus industrias. También puedes elegir versiones ESG de los fondos o ETFs que se pueden ajustar a tu perfil.`
    },

    MUY_CONSERVADOR: {
      'Principiante': `Dado que prefieres empezar con máxima seguridad, recuerda que puedes limitar tu exposición a acciones y usar solo una parte pequeña de tu cartera para aprender sin presión. Invierte poco a poco y sin presión, lo más importante es que vayas a tu ritmo y cojas experiencia y confianza a la hora de invertir.`,
      
      'Intermedia': `Dado que prefieres empezar con máxima seguridad, puedes mantener una exposición reducida a acciones, usando ETFs muy diversificados y estables. Sectores como salud, consumo básico o dividendos de empresas sólidas suelen ser menos volátiles. Lo importante es empezar sin presión, con productos que puedas mantener incluso en momentos de caídas.`,
      
      'Avanzada': `Dado tu perfil conservador, puedes mantener una exposición controlada a acciones, usando ETFs muy diversificados y estables. Sectores defensivos como salud, consumo básico o utilities suelen ser menos volátiles. Con tu experiencia, puedes aplicar estrategias de gestión de riesgo más sofisticadas mientras mantienes un enfoque prudente.`
    }
  }
};

module.exports = { RENTA_VARIABLE_CONFIG };