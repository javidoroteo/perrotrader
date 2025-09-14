/**
 * Configuración completa de los 16 arquetipos de inversión
 */

// Mapeo de códigos a nombres
const nameMapping = {
  "P-A-T-C": "El Guardián Metódico",
  "P-A-T-B": "El Estratega Ambicioso",
  "P-A-D-C": "El Asesor Racional",
  "P-A-D-B": "El Arquitecto de Riqueza",
  "P-I-T-C": "El Visionario Cauteloso",
  "P-I-T-B": "El Soñador Estratega",
  "P-I-D-C": "El Equilibrado Cauto",
  "P-I-D-B": "El Inspirador Visionario",
  "O-A-T-C": "El Analista Pragmático",
  "O-A-T-B": "El Cazador de Oportunidades",
  "O-A-D-C": "El Inversor Práctico",
  "O-A-D-B": "El Explorador Impulsivo",
  "O-I-T-C": "El Observador Intuitivo",
  "O-I-T-B": "El Innovador Audaz",
  "O-I-D-C": "El Conformista Cauto",
  "O-I-D-B": "El Pionero Adaptable"
};

// Slogans de cada arquetipo
const slogans = {
  "P-A-T-C": "Preservar el futuro, un plan a la vez.",
  "P-A-T-B": "El arquitecto de su propio destino.",
  "P-A-D-C": "Ahorrar con sabiduría, crecer con confianza.",
  "P-A-D-B": "Construir grandes metas, con el mapa de los expertos.",
  "P-I-T-C": "Soñar en grande, invertir con los pies en la tierra.",
  "P-I-T-B": "El instinto y la ambición al servicio de un gran plan.",
  "P-I-D-C": "El camino seguro, guiado por la intuición.",
  "P-I-D-B": "La audacia de un sueño, el poder de la red.",
  "O-A-T-C": "Los números hablan, la prudencia dicta.",
  "O-A-T-B": "La disciplina de los datos, la emoción de la caza.",
  "O-A-D-C": "Paso a paso, el camino seguro.",
  "O-A-D-B": "La aventura de las oportunidades, guiado por la red.",
  "O-I-T-C": "El arte de la prudencia, el don de la percepción.",
  "O-I-T-B": "Donde hay riesgo, hay una oportunidad que siento.",
  "O-I-D-C": "Cuando la mayoría va, yo también voy.",
  "O-I-D-B": "La intuición que lidera, la red que guía."
};

// Descripciones detalladas
const descriptions = {
  "P-A-T-C": "Como Guardián Metódico, su enfoque es la seguridad y la estabilidad. Valora la disciplina y el rigor, y se siente más cómodo cuando sigue un plan estructurado y basado en datos concretos. Su naturaleza autónoma significa que prefiere investigar y tomar sus propias decisiones, mientras que su conservadurismo lo motiva a proteger su capital por encima de todo. No es un inversor que busque emociones; su tranquilidad está en el orden y la previsibilidad.",
  "P-A-T-B": "Combina una mente analítica y planificadora con un apetito de riesgo y una independencia inquebrantable. Como Estratega Ambicioso, su visión a largo plazo es clara y está respaldada por un análisis profundo. No le teme a las decisiones audaces, siempre y cuando estén fundamentadas en datos y lógica. Se nutre de los desafíos y disfruta del proceso de construir un futuro próspero con sus propios cálculos y determinación.",
  "P-A-D-C": "Este perfil valora la planificación y el análisis, pero se siente más seguro cuando sus decisiones están respaldadas por la opinión de expertos. Como Asesor Racional, es metódico en su enfoque y busca la seguridad por encima de la rentabilidad. Prefiere delegar o, al menos, contrastar sus ideas con profesionales antes de actuar. Se siente tranquilo sabiendo que sus finanzas están en manos de alguien con más experiencia.",
  "P-A-D-B": "Este perfil es el epítome de la planificación y la ambición, pero con la prudencia de un inversionista que valora el consejo experto. Combina una visión de futuro con una mente analítica, buscando grandes retornos mientras se apoya en una red de apoyo profesional. El Arquitecto de Riqueza no teme al riesgo, pero se asegura de que sus pasos estén validados por datos y por el juicio de terceros de confianza.",
  "P-I-T-C": "Una personalidad que combina una profunda intuición y la capacidad de ver oportunidades no obvias, con una necesidad de planificación y un enfoque conservador. El Visionario Cauteloso puede intuir el potencial de una inversión, pero su naturaleza prudente lo obliga a actuar con cautela. Es un pensador independiente que confía en su propio criterio, pero no se dejará llevar por una corazonada sin antes haber asegurado su base.",
  "P-I-T-B": "Una rara combinación de visión, intuición, planificación y ambición. El Soñador Estratega es un líder nato que ve posibilidades donde otros no las ven. Combina una mente que ve patrones con la disciplina para crear una estrategia que lo lleve a sus metas. Confía en su instinto, pero no actúa sin un plan.",
  "P-I-D-C": "Este perfil busca un equilibrio entre lo que siente y lo que es seguro. Usa su intuición para orientarse en el mundo, pero su naturaleza dependiente y conservadora le obliga a buscar un respaldo externo antes de actuar. Se siente más tranquilo siguiendo la sabiduría convencional y las recomendaciones de otros para tomar sus decisiones financieras. Su objetivo es la estabilidad, no la riqueza rápida.",
  "P-I-D-B": "Este perfil es un líder natural que combina su intuición y su ambición con la habilidad de movilizar a otros. Ve el potencial en ideas y proyectos que otros no ven y no teme asumir riesgos para hacerlos realidad. Valora la sabiduría de los demás y utiliza su red de contactos para informarse y tomar decisiones. Se siente cómodo con el riesgo, ya que lo ve como parte del camino para lograr sus grandes sueños.",
  "O-A-T-C": "Como Analista Pragmático, se guía por la lógica y los datos. Es un inversor cuidadoso que prefiere la seguridad y la preservación del capital. Sin embargo, a diferencia del Guardián, no se siente atado a un plan rígido; es capaz de reaccionar rápidamente ante nuevas informaciones para ajustar su cartera o aprovechar una oportunidad de bajo riesgo. Su autonomía lo hace independiente de las opiniones externas, y su pragmatismo lo mantiene con los pies en la tierra.",
  "O-A-T-B": "Este perfil es el de un inversor que busca alto rendimiento y que está dispuesto a asumir riesgo, pero siempre basándose en un análisis racional y una decisión autónoma. El Cazador de Oportunidades no se limita a un plan; se adapta al mercado y busca las mejores coyunturas para actuar. Es un inversionista activo, que confía en su propia investigación y disfruta el desafío de encontrar la próxima gran oportunidad.",
  "O-A-D-C": "Este perfil es pragmático y no se siente atado a un plan estricto. Prefiere la seguridad de productos estables y confía en el consejo de su entorno o de expertos. El Inversor Práctico es el arquetipo del sentido común; no busca complicaciones ni grandes rendimientos, sino un camino claro y seguro para hacer crecer sus ahorros.",
  "O-A-D-B": "Este perfil se caracteriza por un alto apetito de riesgo y la capacidad de reaccionar rápidamente ante oportunidades. Valora el análisis y la lógica, pero su dependencia en la opinión de otros lo hace susceptible a los sesgos sociales. El Explorador Impulsivo busca la emoción de la inversión y la posibilidad de un alto retorno, y se siente seguro cuando sus decisiones son compartidas y validadas por la comunidad de inversores.",
  "O-I-T-C": "Este perfil combina una profunda intuición con la cautela. Se guía por corazonadas y por una visión holística del mercado, pero su naturaleza conservadora le impide tomar riesgos innecesarios. El Observador Intuitivo es independiente en su pensamiento y prefiere confiar en su propia percepción de las cosas.",
  "O-I-T-B": "Este es el arquetipo del aventurero. Se guía por su intuición y su ambición, y está dispuesto a tomar riesgos considerables para lograr grandes retornos. El Innovador Audaz no se ata a planes, sino que reacciona a las oportunidades que su olfato detecta. Es un pensador independiente que disfruta explorando nuevas fronteras financieras sin necesidad de validación externa.",
  "O-I-D-C": "Un perfil que se siente más cómodo con la seguridad de la tradición y el camino de la mayoría. Es cauto y se guía por la intuición, pero su naturaleza dependiente le hace buscar la validación social y el consejo de otros para tomar sus decisiones. El Conformista Cauto no busca riesgos, sino la paz mental que viene con saber que está haciendo lo mismo que el resto.",
  "O-I-D-B": "Combina una naturaleza ambiciosa y adaptable con la confianza en la intuición y el consejo externo. El Pionero Adaptable es un inversor que busca alto rendimiento y que está dispuesto a asumir riesgos, pero siempre se siente más seguro cuando sus decisiones están respaldadas por su comunidad o red de asesores. Es un líder que escucha."
};

// Fortalezas de cada arquetipo
const strengths = {
  "P-A-T-C": "Su mayor fortaleza es la disciplina y su aversión a las decisiones emocionales. El Guardián evita los atajos mentales y se apoya en análisis profundos, lo que reduce el riesgo de errores impulsivos.",
  
  "P-A-T-B": "La visión clara y la capacidad de tomar decisiones basadas en análisis exhaustivos son sus mayores activos. Este perfil evita el sesgo de autoridad y la mentalidad de manada, ya que su confianza radica en su propia investigación.",

  "P-A-D-C": "Su principal fortaleza es su pragmatismo. No cae en la trampa del exceso de confianza y evita decisiones impulsivas. Su dependencia de fuentes externas le ayuda a evitar errores que se basan en una falta de conocimiento.",
  "P-A-D-B": "La capacidad para integrar su visión personal con análisis rigurosos y el consejo de expertos le otorga una ventaja considerable.",
  "P-I-T-C": "Su intuición puede permitirle identificar oportunidades únicas antes que otros. Su autonomía lo protege de la mentalidad de manada.",
  "P-I-T-B": "Su principal fortaleza es la capacidad de pensar fuera de la caja para encontrar soluciones creativas mientras mantiene la disciplina para ejecutar. Su autonomía lo protege de modas.",
  "P-I-D-C": "Su mayor activo es su prudencia. Al combinar su intuición con el consejo de otros, evita las decisiones impulsivas y los riesgos innecesarios.",
  "P-I-D-B": "Su carisma y capacidad de inspirar a otros son sus mayores fortalezas. Puede identificar grandes oportunidades y generar un entusiasmo contagioso.",
  "O-A-T-C": "Su habilidad para combinar el análisis con la adaptabilidad es una gran fortaleza. Evita la parálisis por análisis y puede reaccionar rápidamente a nuevas informaciones.",
  "O-A-T-B": "Su mayor fortaleza es la combinación de adaptabilidad y lógica. Puede tomar decisiones rápidas pero informadas. Su autonomía lo protege de la mentalidad de rebaño.",
  "O-A-D-C": "Su mayor fortaleza es que evita los riesgos innecesarios. Su dependencia en la sabiduría colectiva lo protege de decisiones basadas en una falta de conocimiento.",
  "O-A-D-B": "Su mayor fortaleza es su ambición y su capacidad para tomar decisiones rápidas cuando surgen oportunidades. Su naturaleza adaptable le permite entrar y salir de inversiones.",
  "O-I-T-C": "Su intuición puede darle una ventaja para detectar oportunidades no obvias. Su prudencia y autonomía lo protegen de modas.",
  "O-I-T-B": "Su mayor fortaleza es su capacidad para detectar oportunidades en mercados emergentes y su agilidad para actuar. No teme a la volatilidad.",
  "O-I-D-C": "Su principal fortaleza es que evita la asunción de riesgos innecesarios. Su dependencia de fuentes externas lo protege de errores basados en la falta de conocimiento.",
  "O-I-D-B": "Su mayor fortaleza es la combinación de adaptabilidad, ambición y la capacidad de aprovechar la inteligencia colectiva. No teme a los nuevos mercados o a las tendencias emergentes."
  
};

// Riesgos de cada arquetipo
const risks = {
  "P-A-T-C": "Su exceso de cautela y su fuerte aversión a las pérdidas pueden llevarlo a la parálisis por análisis. Puede perder oportunidades de crecimiento significativas por miedo a una pequeña volatilidad o por el dolor de una posible pérdida, lo que le impide alcanzar sus metas a largo plazo.",
  
  "P-A-T-B": "Su principal riesgo es el exceso de confianza. Puede sobrevalorar su capacidad para predecir el mercado y subestimar la volatilidad o los riesgos inesperados, lo que podría llevarle a asumir riesgos excesivos.",

"P-A-D-C": "Su riesgo principal es el sesgo de autoridad. Puede seguir ciegamente los consejos de un experto sin hacer un análisis adicional, o peor aún, dejarse llevar por las recomendaciones de un chiringuito financiero",
  "P-A-D-B": "Su mayor debilidad radica en el sesgo de la mentalidad de manada y el sesgo de autoridad, especialmente cuando los expertos que sigue están influenciados por modas pasajeras. Puede asumir riesgos que no encajan con su perfil, simplemente porque todos los grandes lo están haciendo",
  "P-I-T-C": "Su conservadurismo puede llevarle a dudar demasiado y a no actuar sobre sus intuiciones válidas, perdiendo oportunidades valiosas. Puede quedar atrapado en la aversión a las pérdidas, frenando su crecimiento por un miedo excesivo a la incertidumbre.",
  "P-I-T-B": "Puede caer en el exceso de confianza en su intuición, lanzándose a proyectos demasiado grandes o arriesgados, asumiendo que su olfato es infalible.",
  "P-I-D-C": "Su principal riesgo es que puede quedar atrapado entre lo que siente que es correcto y lo que le aconsejan, lo que podría llevar a la indecisión. También es vulnerable a la mentalidad de manada, siguiendo a otros sin cuestionar la razón de fondo.",
  "P-I-D-B": "Su principal riesgo es el sesgo de autoridad y la mentalidad de manada, que le puede llevar a seguir ciegamente a líderes o gurús que no son tan confiables. También es vulnerable al sesgo de exceso de optimismo, sobreestimando las probabilidades de éxito.",
  "O-A-T-C": "Su principal riesgo es el sesgo de anclaje, ya que podría aferrarse a los precios históricos de un activo, impidiéndole vender incluso si las condiciones del mercado han cambiado negativamente. Su enfoque conservador también puede hacer que pase por alto oportunidades de crecimiento significativas.",
  "O-A-T-B": "Su principal riesgo es el exceso de confianza y el sesgo de disponibilidad, sobrevalorando la probabilidad de eventos recientes o impactantes. Esto podría llevarle a operar con más frecuencia de la necesaria o a asumir riesgos excesivos en inversiones que parecen demasiado buenas para ser verdad",
  "O-A-D-C": "Su principal riesgo es la mentalidad de manada, que le podría llevar a invertir en burbujas especulativas o seguir modas sin una evaluación adecuada del riesgo.",
  "O-A-D-B": "Su principal riesgo es la mentalidad de manada, que lo hace vulnerable a los cambios de humor del mercado, y el sesgo de autoridad, que lo expone a seguir los consejos de influencers o gurús no calificados.",
  "O-I-T-C": " Su mayor riesgo es la aversión a las pérdidas, lo que podría llevarle a pasar por alto grandes oportunidades. Puede quedarse en la etapa de observación y no actuar, perdiendo el momento ideal para invertir.",
  "O-I-T-B": "Su principal riesgo es el exceso de confianza y la falta de disciplina. Puede caer en decisiones impulsivas, basadas en un optimismo excesivo, y sobreestimar sus propias habilidades.",
  "O-I-D-C": "Su mayor riesgo es la mentalidad de manada, que lo hace susceptible a seguir a la masa, incluso si esta se dirige a una burbuja o a una mala decisión financiera.",
  "O-I-D-B": "Sin embargo, su principal riesgo es el sesgo de autoridad y la mentalidad de manada, que le pueden llevar a asumir riesgos excesivos basándose en el entusiasmo de otros, sin haber realizado un análisis individual."

};
/*
// Carteras sugeridas
const portfolios = {
  "P-A-T-C": "Una cartera conservadora enfocada en la preservación del capital y la estabilidad. Esto incluye una alta asignación a instrumentos de bajo riesgo como bonos de alta calidad, fondos indexados diversificados y planes de pensiones con baja volatilidad.",
  
  "P-A-T-B": "Una cartera de crecimiento y orientación agresiva. Incluye una alta ponderación de activos de renta variable, como acciones de crecimiento, fondos de inversión de gestión activa, o incluso participación en private equity.",
  
  // Continúar con el resto...
};
*/
// Consejos educacionales
const advice = {
  "P-A-T-C": "Su objetivo no es eliminar el riesgo, sino gestionarlo. El Guardián Metódico debe aprender a diferenciar entre la precaución y el miedo irracional. Es vital que entienda que una inversión en el mercado no se evalúa diariamente, sino en el largo plazo. Debe practicar el 'no hacer nada' durante las fluctuaciones, resistiendo el impulso de vender ante una caída, sabiendo que la disciplina del plan es su mejor aliado.",
  
  "P-A-T-B": "Debe complementar su confianza con humildad. Es fundamental que el Estratega Ambicioso realice un análisis de escenarios pesimistas y establezca límites de pérdida claros. Recordar que incluso los inversores más experimentados no pueden controlar el mercado ayuda a mitigar el sesgo de ilusión de control.",
  "P-A-D-C": "Debe desarrollar un papel más activo en sus finanzas. Aunque delegue, es esencial que entienda los principios básicos de sus inversiones. Debe aprender a hacer preguntas pertinentes sobre comisiones, riesgos y estrategias para asegurarse de que las recomendaciones se alinean con sus propios objetivos.",
  "P-A-D-B": "Debe aprender a auditar a sus asesores y a la manada. Es fundamental que entienda que la experiencia pasada no garantiza resultados futuros y que el éxito de otros no elimina los riesgos para su propia cartera.",
  "P-I-T-C": "Debe aprender a darle el justo valor a su intuición. Un consejo es establecer un presupuesto de riesgo para explorar sus corazonadas. Esto le permite invertir una pequeña cantidad en una oportunidad intuitiva sin poner en peligro su capital principal.",
  "P-I-T-B": "El Soñador Estratega debe establecer puntos de control claros y objetivamente medibles en su plan. Debe reconocer que su intuición es una guía, no una garantía. Es vital que aprenda a desprenderse de una inversión si el plan original no se está cumpliendo, incluso si su intuición inicial le dijo que era una buena idea.",
  "P-I-D-C": "Debe desarrollar su criterio para elegir sus fuentes de información. Se le recomienda buscar consejos de profesionales acreditados y no de influencers o expertos en redes sociales. Su tarea es aprender a distinguir una buena guía de un mero seguidor de modas.",
  "P-I-D-B": " Debe aprender a realizar su propia diligencia debida (investigación). Es vital que aprenda a cuestionar, incluso a las personas que admira, y a verificar la información antes de actuar. Es importante que no ponga todo su patrimonio en un solo proyecto, sin importar cuán inspirador sea.",
  "O-A-T-C": "Los números hablan, la prudencia dicta.Debe aprender a ser flexible con sus expectativas. Es crucial que actualice sus puntos de anclaje para basar sus decisiones en las condiciones actuales y no en el pasado. Se le recomienda establecer límites claros para el riesgo, de manera que pueda reaccionar a una oportunidad sin comprometer su seguridad.",
  "O-A-T-B": "Debe establecer un plan de gestión de riesgos estricto y utilizar herramientas como las órdenes de stop loss para limitar las pérdidas. Es vital que no confunda el éxito con su propia habilidad y que reconozca que el azar y las variables del mercado juegan un papel fundamental.",
  "O-A-D-C": "El Inversor Práctico debe aprender a cuestionar a sus fuentes de información. Debe buscar el consejo de profesionales certificados y educarse sobre los principios básicos de las inversiones.",
  "O-A-D-B": "Debe aprender a desarrollar su propio criterio y a diversificar sus fuentes de información. Es fundamental que establezca un presupuesto de riesgo y no invierta más de lo que puede permitirse perder.",
  "O-I-T-C": "Debe aprender a confiar en su intuición, pero de forma controlada. Se le recomienda crear una lista de observación de activos que le interesen. Si su intuición le dice que invierta, debe hacerlo con una pequeña cantidad, como un experimento, y luego analizar si su olfato funcionó o no.",
  "O-I-T-B": "El Innovador Audaz debe desarrollar un marco de gestión de riesgos estricto. Debe aprender a diferenciar entre una buena intuición y una emoción pasajera. Es vital que diversifique sus inversiones y no invierta todo su capital en una sola idea, por muy prometedora que parezca.",
  "O-I-D-C": "Debe aprender a cuestionar las decisiones del grupo. Se le recomienda investigar por su cuenta o, al menos, diversificar sus fuentes de consejo. Es vital que comprenda que ir con la mayoría no siempre es el camino correcto para sus finanzas.",
  "O-I-D-B": "El Pionero Adaptable debe aprender a desarrollar su propio criterio. Aunque valora el consejo de otros, es crucial que sepa cuándo separarse del grupo y tomar una decisión independiente, especialmente en momentos de volatilidad del mercado"
};

// Función helper para obtener todos los datos de un arquetipo
function getCompleteArchetypeData(code) {
  return {
    code,
    name: nameMapping[code],
    slogan: slogans[code],
    description: descriptions[code],
    strengths: strengths[code],
    risks: risks[code],
    advice: advice[code]
  };
}

// Función para obtener todos los arquetipos
function getAllArchetypes() {
  return Object.keys(nameMapping).map(code => getCompleteArchetypeData(code));
}

module.exports = {
  archetypeDetails: {
    nameMapping,
    slogans,
    descriptions,
    strengths,
    risks,
    advice
  },
  getCompleteArchetypeData,
  getAllArchetypes
};