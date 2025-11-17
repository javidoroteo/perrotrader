// backend/src/config/portfolioExplanationConfig.js

const PORTFOLIO_EXPLANATION_CONFIG = {
  
  SECTION_TITLE: "Cómo se construye tu cartera personalizada",
  
  SECTION_DESCRIPTION: "Tu cartera se genera combinando múltiples factores de tu perfil. Aquí te explicamos el impacto de cada uno y cómo ajustarla si consideras que algo no refleja tu situación real.",

  INTRO_TEXT: "La asignación de activos que ves en tu cartera no es aleatoria. Se ha construido mediante un algoritmo que analiza tus respuestas en varias dimensiones clave:",

  // Explicaciones por perfil de riesgo
  RISK_PROFILE_EXPLANATION: {
    'Bajo Riesgo': {
      title: "Tu perfil: Conservador (Bajo Riesgo)",
      impact: "Esto ha resultado en una mayor asignación a bonos y efectivo, reduciendo la exposición a acciones y activos volátiles. Priorizamos la estabilidad y la preservación del capital sobre el crecimiento agresivo.",
      ifDifferent: {
        toModerate: "Si consideras que puedes tolerar más volatilidad para buscar mayores retornos, podrías aumentar tu exposición a acciones (renta variable) y reducir bonos. Esto incrementaría el potencial de crecimiento pero también las fluctuaciones de corto plazo.",
        toAggressive: "Si realmente te sientes cómodo con riesgo alto, podrías aumentar significativamente acciones, considerar incluir criptomonedas si no las tienes, y reducir tanto bonos como efectivo. Ten en cuenta que esto implica aceptar caídas temporales importantes."
      }
    },
    'Riesgo Moderado': {
      title: "Tu perfil: Equilibrado (Riesgo Moderado)",
      impact: "Esto ha resultado en un balance entre crecimiento y estabilidad. Tu cartera combina acciones para aprovechar el crecimiento del mercado con bonos para amortiguar volatilidad y efectivo para liquidez.",
      ifDifferent: {
        toConservative: "Si percibes que las fluctuaciones del mercado te generan más ansiedad de la esperada, considera aumentar bonos y efectivo mientras reduces acciones. Sacrificarás algo de potencial de crecimiento pero ganarás tranquilidad.",
        toAggressive: "Si sientes que puedes tolerar más riesgo del que refleja tu cartera actual, aumenta la exposición a acciones y reduce bonos. Si estás interesado en activos más especulativos, podrías considerar añadir o aumentar criptomonedas."
      }
    },
    'Alto Riesgo': {
      title: "Tu perfil: Agresivo (Alto Riesgo)",
      impact: "Esto ha resultado en una fuerte concentración en acciones, con exposición potencial a criptomonedas y menor asignación a bonos. Buscas maximizar el crecimiento a largo plazo aceptando volatilidad significativa.",
      ifDifferent: {
        toModerate: "Si al ver tu cartera consideras que el nivel de riesgo es excesivo, puedes moderar aumentando bonos y reduciendo acciones. También podrías eliminar o reducir criptomonedas si las tienes.",
        toConservative: "Si prefieres priorizar la estabilidad, aumenta significativamente bonos y efectivo mientras reduces acciones. Elimina activos especulativos como criptomonedas y considera añadir oro para diversificación defensiva."
      }
    }
  },

  // Explicaciones por nivel de experiencia
  EXPERIENCE_LEVEL_EXPLANATION: {
    'Principiante': {
      title: "Tu experiencia: Principiante",
      impact: "Al ser nuevo en inversiones, tu cartera tiene una asignación más conservadora con mayor peso en bonos y efectivo, y menor exposición a activos complejos. Esto reduce la probabilidad de errores costosos mientras te familiarizas con el mercado.",
      ifDifferent: "Si tienes más experiencia de la reflejada (has invertido anteriormente, entiendes los mercados, o has estudiado inversión en profundidad), considera aumentar acciones y reducir bonos. Los inversores con experiencia tienden a manejar mejor la volatilidad y activos más sofisticados."
    },
    'Intermedia': {
      title: "Tu experiencia: Intermedia",
      impact: "Con experiencia moderada, tu cartera equilibra crecimiento y estabilidad. Tienes exposición a acciones pero también protección mediante bonos. Se asume que comprendes los ciclos del mercado y puedes gestionar volatilidad moderada.",
      ifDifferent: "Si consideras que tu experiencia es mayor (años invirtiendo activamente, conocimiento técnico sólido), puedes aumentar acciones y considerar estrategias más activas. Si por el contrario te sientes menos preparado, aumenta bonos y efectivo para mayor seguridad mientras sigues aprendiendo."
    },
    'Avanzada': {
      title: "Tu experiencia: Avanzada",
      impact: "Con experiencia sólida, tu cartera tiene mayor exposición a acciones y menor asignación a bonos. Se asume que entiendes bien los mercados, puedes analizar inversiones y manejar la volatilidad con perspectiva de largo plazo.",
      ifDifferent: "Si consideras que tu experiencia es menor a la reflejada, modera tu cartera aumentando bonos y efectivo mientras reduces acciones. Es mejor crecer gradualmente en riesgo conforme ganas experiencia real en mercados."
    }
  },

  // Explicaciones por edad
  AGE_EXPLANATION: {
    'Joven': {
      title: "Tu edad: 18-25 años",
      impact: "Tu juventud permite un horizonte temporal largo, por lo que tu cartera tiene mayor exposición a acciones para aprovechar el crecimiento compuesto. Tienes décadas para recuperarte de caídas temporales.",
      ifDifferent: "Si tus objetivos son de corto plazo (comprar casa en 2-3 años, por ejemplo) a pesar de tu edad, considera aumentar bonos y efectivo para reducir el riesgo de tener que vender acciones en un mal momento."
    },
    'Adulto Joven': {
      title: "Tu edad: 26-30 años",
      impact: "Tu juventud permite un horizonte temporal largo, por lo que tu cartera tiene mayor exposición a acciones para aprovechar el crecimiento compuesto. Tienes décadas para recuperarte de caídas temporales.",
      ifDifferent: "Si tus objetivos son de corto plazo (comprar casa en 2-3 años, por ejemplo) a pesar de tu edad, considera aumentar bonos y efectivo para reducir el riesgo de tener que vender acciones en un mal momento."
    },
    'Adulto': {
      title: "Tu edad: 31-35 años",
      impact: "En esta etapa, tu cartera equilibra crecimiento con algo de protección. Aún tienes horizonte temporal para aprovechar el crecimiento de acciones pero con más conservadurismo que inversores más jóvenes.",
      ifDifferent: "",
    },
    'Media': {
      title: "Tu edad: 36-45 años",
      impact: "En edad media, tu cartera balancea crecimiento con algo de protección. Aún tienes horizonte temporal para aprovechar el crecimiento de acciones pero con más conservadurismo que inversores más jóvenes.",
      ifDifferent: "Si estás en la parte más joven de este rango (36-40) y cómodo con riesgo, considera aumentar acciones. Si estás más cerca de 45 y priorizas estabilidad, aumenta bonos y reduce acciones gradualmente."
    },
    'Maduro': {
      title: "Tu edad: 46-55 años",
      impact: "En este rango de edad, tu cartera empieza a priorizar la preservación del capital mediante mayor asignación a bonos y efectivo, reduciendo exposición a acciones volátiles. El enfoque es proteger lo acumulado.",
      ifDifferent: "Si estás en la parte más joven de este rango (46-50) y cómodo con riesgo, considera aumentar acciones. Si estás más cerca de 55 y priorizas estabilidad, aumenta bonos y reduce acciones gradualmente."
    },
    'Senior': {
      title: "Tu edad: 56-66 años",
      impact: "Con menor horizonte temporal, tu cartera prioriza la preservación del capital mediante mayor asignación a bonos y efectivo, reduciendo exposición a acciones volátiles. El enfoque es proteger lo acumulado.",
      ifDifferent: "Si tu situación financiera te permiten mantener un horizonte más largo (planeas no tocar inversiones por 10+ años), podrías mantener más acciones. Si necesitas el dinero pronto, aumenta aún más bonos y efectivo."
    },
    'Mayor': {
      title: "Tu edad: 66 años o más",
      impact: "Con menor horizonte temporal, tu cartera prioriza la preservación del capital mediante mayor asignación a bonos y efectivo, reduciendo exposición a acciones volátiles. El enfoque es proteger lo acumulado.",
      ifDifferent: "Si situación financiera te permiten mantener un horizonte más largo (planeas no tocar inversiones por 10+ años), podrías mantener más acciones. Si necesitas el dinero pronto, aumenta aún más bonos y efectivo."
    }
  },

  // Explicaciones por nivel de ingresos
  INCOME_EXPLANATION: {
    'Bajos': {
      title: "Tus ingresos: Limitados",
      impact: "Con ingresos más ajustados, tu cartera tiene mayor asignación a efectivo y bonos para priorizar liquidez y seguridad. Reducimos el riesgo porque tienes menos margen para absorber pérdidas.",
      ifDifferent: "Si tu situación de ingresos ha mejorado o tienes otras fuentes de respaldo financiero no reflejadas, podrías reducir efectivo y aumentar acciones para buscar mayor crecimiento."
    },
    'Medios': {
      title: "Tus ingresos: Moderados",
      impact: "Con ingresos estables, tu cartera equilibra crecimiento con seguridad. Tienes algo de colchón para tolerar volatilidad pero sin exposición excesiva.",
      ifDifferent: "Si tus ingresos son más altos o más estables de lo reflejado, considera aumentar acciones. Si son más precarios, aumenta efectivo y bonos para mayor seguridad."
    },
    'Altos': {
      title: "Tus ingresos: Elevados",
      impact: "Con ingresos sólidos, tu cartera tiene mayor exposición a acciones y menor necesidad de liquidez inmediata. Puedes permitirte asumir más riesgo para buscar mayores retornos.",
      ifDifferent: "Si tus ingresos son menos estables de lo que parece, considera aumentar efectivo y bonos como red de seguridad adicional."
    }
  },

  // Explicaciones por fondo de emergencia
  EMERGENCY_FUND_EXPLANATION: {
  NONE: {
    title: "Fondo de emergencia: Sin colchón (0 meses)",
    impact: "Priorizamos liquidez. Tu cartera tiene más efectivo y menos activos volátiles para asegurar acceso rápido al dinero.",
    ifDifferent: "Si ya has construido un fondo de emergencia después de hacer el test, actualiza tu perfil para reducir efectivo y aumentar exposición a activos de crecimiento."
  },
  LOW: {
    title: "Fondo de emergencia: En construcción (1-3 meses)",
    impact: "Mantenemos precaución con mayor efectivo y bonos mientras completas tu colchón financiero.",
    ifDifferent: "Si ya has alcanzado 6+ meses de gastos cubiertos, considera actualizar tu perfil para optimizar la asignación hacia activos de mayor rentabilidad."
  },
  MEDIUM: {
    title: "Fondo de emergencia: Casi completo (4-5 meses)",
    impact: "Con tu fondo casi completo, tu cartera adopta un enfoque equilibrado. Mantienes suficiente liquidez pero comienzas a aprovechar mejor oportunidades de crecimiento a mediano plazo.",
    ifDifferent: "Si tu situación ha cambiado y tu fondo se ha reducido, considera aumentar temporalmente efectivo en la cartera como medida de precaución adicional."
  },
  HIGH: {
    title: "Fondo de emergencia: Sólido (6+ meses)",
    impact: "Con un fondo de emergencia robusto, tu cartera puede optimizar el crecimiento con menor asignación a efectivo y mayor exposición a activos de rentabilidad. Tienes la tranquilidad de no necesitar vender inversiones ante imprevistos.",
    ifDifferent: "Si tu fondo de emergencia ha disminuido desde el test, considera aumentar efectivo dentro de la cartera como precaución adicional."
  }
},


  // Explicaciones por horizonte temporal
  TIME_HORIZON_EXPLANATION: {
    SHORT: {
      title: "Horizonte temporal: Corto plazo (≤3 años)",
      impact: "Con un horizonte corto, tu cartera prioriza estabilidad mediante mayor asignación a bonos y efectivo. Reducimos acciones porque no hay tiempo suficiente para recuperarse de caídas significativas.",
      ifDifferent: "Si tu horizonte es realmente más largo (no necesitarás el dinero por 5+ años), aumenta acciones y reduce bonos para aprovechar el potencial de crecimiento a largo plazo."
    },
    MEDIUM: {
      title: "Horizonte temporal: Medio plazo (3-5 años)",
      impact: "Con horizonte medio, tu cartera balancea crecimiento y estabilidad. Tienes tiempo para recuperarte de volatilidad pero no tanto como para ser completamente agresivo.",
      ifDifferent: "Si tu horizonte es más corto (necesitas el dinero en 1-2 años), aumenta bonos y efectivo. Si es más largo (5+ años), aumenta acciones."
    },
    LONG: {
      title: "Horizonte temporal: Largo plazo (5-10 años)",
      impact: "Con horizonte largo, tu cartera tiene mayor exposición a acciones para maximizar el crecimiento compuesto. Puedes permitirte ignorar la volatilidad de corto plazo.",
      ifDifferent: "Si en realidad necesitarás parte del dinero antes de lo planificado, aumenta bonos y efectivo para esa porción que puedas necesitar en los próximos años."
    },
    VERY_LONG: {
      title: "Horizonte temporal: Muy largo plazo (10+ años)",
      impact: "Con horizonte muy largo, tu cartera maximiza exposición a acciones y activos de crecimiento. Tienes décadas para beneficiarte del crecimiento compuesto y recuperarte de caídas.",
      ifDifferent: "Si en realidad necesitarás parte del dinero antes de lo planificado, aumenta bonos y efectivo para esa porción que puedas necesitar en los próximos años."
    }
  },

  // Explicaciones por preferencia de dividendos
  DIVIDEND_EXPLANATION: {
    YES: {
      title: "Preferencia: Generación de ingresos (dividendos)",
      impact: "Al priorizar ingresos, tu cartera tiene algo más de bonos y acciones que pagan dividendos. Esto genera flujo de caja regular aunque puede reducir algo el crecimiento total.",
      ifDifferent: "Si prefieres reinvertir todo para maximizar crecimiento en vez de recibir ingresos periódicos, puedes aumentar acciones de crecimiento y reducir bonos."
    },
    NO: {
      title: "Preferencia: Crecimiento de capital",
      impact: "Al priorizar crecimiento sobre ingresos, tu cartera se enfoca en acumulación de valor en vez de generar flujos periódicos.",
      ifDifferent: "Si ahora necesitas o prefieres ingresos regulares, considera aumentar bonos y acciones de dividendos."
    }
  },

  // Explicaciones por objetivo de pensión/jubilación
  PENSION_EXPLANATION: {
    YES: {
      title: "Objetivo: Ahorro para jubilación",
      impact: "Al ahorrar para jubilación, tu cartera tiene un enfoque más conservador y de preservación, con mayor peso en bonos y algo más de efectivo.",
      ifDifferent: "Si tu horizonte hasta la jubilación es largo (15+ años) y puedes tolerar volatilidad, considera aumentar acciones para mayor crecimiento."
    },
    NO: {
      title: "Objetivo: Otros objetivos financieros",
      impact: "Sin enfoque específico en jubilación, tu cartera se ajusta a tus otros objetivos según riesgo y horizonte temporal.",
      ifDifferent: "Si ahora priorizas jubilación, considera aumentar gradualmente bonos para mayor estabilidad conforme te acerques a esa etapa."
    }
  },

  // Explicaciones por criptomonedas
  CRYPTO_EXPLANATION: {
    HAS_CRYPTO: {
      title: "Exposición a criptomonedas: Incluida",
      impact: "Has indicado interés en criptomonedas, por lo que tu cartera incluye una asignación (mínimo 5%). Esto se ha tomado principalmente de acciones y bonos, aumentando el potencial especulativo pero también la volatilidad.",
      ifDifferent: "Si consideras que las criptomonedas son demasiado volátiles o especulativas para tu perfil, puedes eliminarlas y redistribuir ese porcentaje aumentando acciones y bonos. Si por el contrario quieres más exposición, ten en cuenta que superar el 10-15% suele ser muy arriesgado."
    },
    NO_CRYPTO: {
      title: "Exposición a criptomonedas: Ninguna",
      impact: "No tienes asignación a criptomonedas. Tu cartera se compone de activos tradicionales más establecidos.",
      ifDifferent: "Si ahora estás interesado en incluir criptomonedas, considera empezar con una asignación pequeña (5% máximo) reduciendo proporcionalmente acciones y bonos. Asegúrate de entender bien este activo antes de invertir."
    }
  },

  // Explicaciones por oro
  GOLD_EXPLANATION: {
    HAS_GOLD: {
      title: "Exposición a oro: Incluida",
      impact: "Tu cartera incluye oro como activo defensivo y de cobertura contra inflación. Esto se ha tomado de efectivo y bonos.",
      ifDifferent: "Si no crees necesaria esta cobertura o prefieres mayor crecimiento, puedes eliminar oro y aumentar acciones. Si por el contrario buscas más protección ante crisis, podrías aumentar oro reduciendo acciones."
    },
    NO_GOLD: {
      title: "Exposición a oro: Ninguna",
      impact: "No tienes asignación a oro. Tu cartera se enfoca en acciones, bonos y efectivo.",
      ifDifferent: "Si buscas más protección ante inflación o crisis, considera añadir oro (5-10%) reduciendo efectivo y bonos."
    }
  },

  // Explicaciones por personalidad (4 dimensiones)
  PERSONALITY_EXPLANATION: {
    PLANIFICADOR: {
      title: "Tu personalidad: Planificador",
      impact: "Tu tendencia a la planificación se refleja en una cartera más conservadora, con mayor asignación a bonos y menor a activos especulativos. Priorizamos estabilidad y previsibilidad.",
      ifDifferent: "Si consideras que eres más flexible y oportunista de lo que refleja tu perfil, podrías aumentar acciones y reducir bonos para aprovechar mejor las oportunidades del mercado."
    },
    OPORTUNISTA: {
      title: "Tu personalidad: Oportunista",
      impact: "Tu enfoque oportunista se refleja en mayor exposición a acciones y potencialmente criptomonedas, con menor peso en bonos. Buscamos capturar oportunidades de crecimiento.",
      ifDifferent: "Si prefieres más estabilidad y menos sorpresas que las que implica un enfoque oportunista, aumenta bonos y efectivo mientras reduces acciones."
    },
    ANALITICO: {
      title: "Tu personalidad: Analítico",
      impact: "Tu perfil analítico no impacta directamente los porcentajes de tu cartera, pero sugiere que te sentirás cómodo analizando inversiones individuales y tomando decisiones informadas.",
      ifDifferent: "Sin cambios específicos en la asignación, pero si te consideras más intuitivo, podrías preferir fondos diversificados en vez de selección individual de acciones."
    },
    INTUITIVO: {
      title: "Tu personalidad: Intuitivo",
      impact: "Tu enfoque intuitivo se refleja en algo menos de bonos y más de activos con potencial de crecimiento como acciones y criptomonedas. Confías en tu instinto para identificar oportunidades.",
      ifDifferent: "Si prefieres más análisis y menos intuición, aumenta bonos y reduce criptomonedas si las tienes. Enfócate en inversiones más predecibles."
    },
    AUTONOMO: {
      title: "Tu personalidad: Autónomo",
      impact: "Tu autonomía no impacta directamente los porcentajes, pero sugiere que te sentirás cómodo gestionando tu cartera de forma independiente.",
      ifDifferent: "Sin cambios específicos, pero si prefieres más apoyo, considera fondos gestionados en vez de selección directa de activos."
    },
    DEPENDIENTE: {
      title: "Tu personalidad: Dependiente (busca asesoría)",
      impact: "Tu preferencia por apoyo se refleja en una cartera algo más conservadora, con mayor peso en bonos y menor en acciones. Priorizamos simplicidad y menor necesidad de decisiones activas.",
      ifDifferent: "Si te sientes más autónomo de lo reflejado, puedes aumentar acciones y reducir bonos para mayor potencial de crecimiento, asumiendo que tomarás decisiones más activas."
    },
    CONSERVADOR: {
      title: "Tu personalidad: Conservador (psicológicamente)",
      impact: "Tu conservadurismo psicológico se refleja en una cartera con mayor asignación a bonos y efectivo, reduciendo acciones y activos volátiles. Priorizamos tu tranquilidad emocional.",
      ifDifferent: "Si te consideras más ambicioso de lo que refleja tu perfil, aumenta acciones y reduce bonos. Asegúrate de que realmente puedes manejar la volatilidad emocionalmente antes de hacerlo."
    },
    AMBICIOSO: {
      title: "Tu personalidad: Ambicioso",
      impact: "Tu ambición se refleja en mayor exposición a acciones y activos de crecimiento, con menor peso en bonos. Buscamos maximizar tu potencial de crecimiento.",
      ifDifferent: "Si consideras que eres más conservador de lo reflejado, aumenta bonos y efectivo mientras reduces acciones. La ambición es buena pero debe estar alineada con tu verdadera tolerancia al riesgo."
    }
  },

  // Mensaje de cierre
  CLOSING_MESSAGE: {
    title: "Ajusta tu cartera según tu criterio",
    content: "Esta cartera es un punto de partida basado en tus respuestas. Tú conoces mejor tu situación real y tus objetivos. Usa estas explicaciones para entender el razonamiento detrás de cada decisión y ajustar las asignaciones según lo que realmente necesitas. Recuerda que cualquier cambio debe hacerse de forma gradual y siempre manteniendo una buena diversificación."
  },

  // Resumen de ajustes generales
  GENERAL_ADJUSTMENTS: {
    title: "Guía rápida de ajustes",
    moreGrowth: "Para más crecimiento: Aumenta acciones, reduce bonos y efectivo. Considera criptomonedas si entiendes el riesgo.",
    moreStability: "Para más estabilidad: Aumenta bonos y efectivo, reduce acciones. Elimina o reduce criptomonedas.",
    moreIncome: "Para más ingresos: Aumenta bonos y acciones de dividendos.",
    moreProtection: "Para más protección: Aumenta efectivo, bonos y oro. Reduce acciones y criptomonedas."
  },
    // ===== ACCIONES DE AJUSTE BASADAS EN portfolioConfig.js =====
  ADJUSTMENT_ACTIONS: {
    
    // Mensaje para usuarios no registrados
    UNAUTHENTICATED_MESSAGE: {
      title: "Registra tu cuenta para personalizar tu cartera",
      description: "Para poder aplicar cambios a tu portafolio recomendado, primero debes crear una cuenta o iniciar sesión. Esto nos permitirá guardar tus preferencias y ajustes de forma segura.",
      ctaText: "Crear cuenta / Iniciar sesión"
    },

    // ===== CAMBIOS POR PERFIL DE RIESGO =====
    // Basado en OBJECTIVE_ADJUSTMENTS.RISK del portfolioConfig
    RISK_ADJUSTMENTS: {
      'Bajo Riesgo': {
        toModerate: {
          label: "Cambiar a Riesgo Moderado",
          description: "Buscar equilibrio entre estabilidad y crecimiento",
          icon: "TrendingUp",
          category: "risk",
          adjustments: { rentaVariable: 20, rentaFija: -15, crypto: 10, cash: -15 }
        },
        toHigh: {
          label: "Cambiar a Alto Riesgo",
          description: "Maximizar potencial de crecimiento",
          icon: "Rocket",
          category: "risk",
          adjustments: { rentaVariable: 40, rentaFija: -30, crypto: 20, cash: -30 }
        }
      },
      
      'Riesgo Moderado': {
        toLow: {
          label: "Cambiar a Bajo Riesgo",
          description: "Priorizar estabilidad y preservación",
          icon: "Shield",
          category: "risk",
          adjustments: { rentaVariable: -20, rentaFija: 15, crypto: -10, cash: 15 }
        },
        toHigh: {
          label: "Cambiar a Alto Riesgo",
          description: "Aumentar exposición a activos de crecimiento",
          icon: "Zap",
          category: "risk",
          adjustments: { rentaVariable: 20, rentaFija: -15, crypto: 10, cash: -15 }
        }
      },
      
      'Alto Riesgo': {
        toModerate: {
          label: "Cambiar a Riesgo Moderado",
          description: "Equilibrar crecimiento y estabilidad",
          icon: "Scale",
          category: "risk",
          adjustments: { rentaVariable: -20, rentaFija: 15, crypto: -10, cash: 15 }
        },
        toLow: {
          label: "Cambiar a Bajo Riesgo",
          description: "Reducir volatilidad significativamente",
          icon: "Umbrella",
          category: "risk",
          adjustments: { rentaVariable: -40, rentaFija: 30, crypto: -20, cash: 30 }
        }
      }
    },

    // ===== CAMBIOS POR EXPERIENCIA =====
    EXPERIENCE_ADJUSTMENTS: {
      'Principiante': {
        toIntermediate: {
          label: "Tengo experiencia intermedia",
          description: "Aumentar exposición moderadamente",
          icon: "BarChart2",
          category: "experience",
          adjustments: { rentaVariable: 10, rentaFija: -5, crypto: 1, cash: -6 }
        },
        toAdvanced: {
          label: "Tengo experiencia avanzada",
          description: "Gestionar activos más complejos",
          icon: "Award",
          category: "experience",
          adjustments: { rentaVariable: 30, rentaFija: -25, crypto: 3, cash: -8 }
        }
      },
      
      'Intermedia': {
        toBeginner: {
          label: "Soy más principiante",
          description: "Simplificar la cartera",
          icon: "BookOpen",
          category: "experience",
          adjustments: { rentaVariable: -10, rentaFija: 5, crypto: -1, cash: 6 }
        },
        toAdvanced: {
          label: "Tengo experiencia avanzada",
          description: "Incrementar complejidad",
          icon: "TrendingUp",
          category: "experience",
          adjustments: { rentaVariable: 20, rentaFija: -20, crypto: 2, cash: -2 }
        }
      },
      
      'Avanzada': {
        toIntermediate: {
          label: "Soy intermedio",
          description: "Moderar exposición",
          icon: "Activity",
          category: "experience",
          adjustments: { rentaVariable: -20, rentaFija: 20, crypto: -2, cash: 2 }
        },
        toBeginner: {
          label: "Soy principiante",
          description: "Reducir complejidad significativamente",
          icon: "Home",
          category: "experience",
          adjustments: { rentaVariable: -30, rentaFija: 25, crypto: -3, cash: 8 }
        }
      }
    },

    // ===== CAMBIOS POR EDAD =====
    AGE_ADJUSTMENTS: {
      'Joven': {
        toYoungAdult: {
          label: "Realmente tengo 26-30 años",
          description: "Ajustar horizonte temporal",
          icon: "Calendar",
          category: "age",
          adjustments: { rentaVariable: -3, rentaFija: 3, crypto: -1, cash: 1 }
        },
        toAdult: {
          label: "Tengo 31-35 años",
          description: "Horizonte más conservador",
          icon: "Calendar",
          category: "age",
          adjustments: { rentaVariable: -5, rentaFija: 5, crypto: -2, cash: 2 }
        }
      },
      'Adulto Joven': {
        toYoung: {
          label: "Soy más joven (18-25)",
          description: "Mayor horizonte de inversión",
          icon: "Calendar",
          category: "age",
          adjustments: { rentaVariable: 3, rentaFija: -3, crypto: 1, cash: -1 }
        },
        toAdult: {
          label: "Tengo 31-35 años",
          description: "Ajustar a mediana edad",
          icon: "Calendar",
          category: "age",
          adjustments: { rentaVariable: -2, rentaFija: 2, crypto: -1, cash: 1 }
        }
      },
      'Adulto': {
        toYoungAdult: {
          label: "Soy más joven (26-30)",
          adjustments: { rentaVariable: 2, rentaFija: -2, crypto: 1, cash: -1 }
        },
        toMiddle: {
          label: "Tengo 36-45 años",
          adjustments: { rentaVariable: -5, rentaFija: 5, crypto: -2, cash: 2 }
        }
      },
      'Media': {
        toAdult: {
          label: "Soy más joven (31-35)",
          adjustments: { rentaVariable: 5, rentaFija: -5, crypto: 2, cash: -2 }
        },
        toExperienced: {
          label: "Tengo 46-55 años",
          adjustments: { rentaVariable: -10, rentaFija: 10, crypto: -2, cash: 2 }
        }
      },
      'Maduro': {
        toMiddle: {
          label: "Soy más joven (36-45)",
          adjustments: { rentaVariable: 10, rentaFija: -10, crypto: 2, cash: -2 }
        },
        toMature: {
          label: "Tengo 56-66 años",
          adjustments: { rentaVariable: -10, rentaFija: 10, crypto: -1, cash: 1 }
        }
      },
      'Senior': {
        toMature: {
          label: "Soy más joven (56-66)",
          adjustments: { rentaVariable: 5, rentaFija: -5, crypto: 2, cash: -2 }
        }
      }
    },

    // ===== CAMBIOS POR INGRESOS =====
    INCOME_ADJUSTMENTS: {
      'Bajos': {
        toMedium: {
          label: "Tengo ingresos medios",
          description: "Mayor capacidad de ahorro",
          icon: "DollarSign",
          category: "income",
          adjustments: { rentaVariable: 10, rentaFija: 0, crypto: 0, cash: -10 }
        },
        toHigh: {
          label: "Tengo ingresos altos",
          description: "Maximizar crecimiento del capital",
          icon: "TrendingUp",
          category: "income",
          adjustments: { rentaVariable: 30, rentaFija: -10, crypto: 3, cash: -13 }
        }
      },
      'Medios': {
        toLow: {
          label: "Tengo ingresos bajos",
          description: "Priorizar liquidez",
          icon: "DollarSign",
          category: "income",
          adjustments: { rentaVariable: -10, rentaFija: 0, crypto: 0, cash: 10 }
        },
        toHigh: {
          label: "Tengo ingresos altos",
          description: "Mayor agresividad",
          icon: "TrendingUp",
          category: "income",
          adjustments: { rentaVariable: 20, rentaFija: -10, crypto: 3, cash: -3 }
        }
      },
      'Altos': {
        toMedium: {
          label: "Tengo ingresos medios",
          description: "Moderar agresividad",
          icon: "DollarSign",
          category: "income",
          adjustments: { rentaVariable: -20, rentaFija: 10, crypto: -3, cash: 3 }
        },
        toLow: {
          label: "Tengo ingresos bajos",
          adjustments: { rentaVariable: -30, rentaFija: 10, crypto: -3, cash: 13 }
        }
      }
    },

    // ===== CAMBIOS POR HORIZONTE TEMPORAL =====
    TIME_HORIZON_ADJUSTMENTS: {
      'Corto plazo': {
        toMedium: {
          label: "Mi horizonte es medio plazo (3-7 años)",
          description: "Incrementar crecimiento moderado",
          icon: "Clock",
          category: "time",
          adjustments: { rentaVariable: 20, rentaFija: -15, crypto: 7, cash: -12 }
        },
        toLong: {
          label: "Mi horizonte es largo plazo (7-15 años)",
          description: "Maximizar crecimiento",
          icon: "Clock",
          category: "time",
          adjustments: { rentaVariable: 30, rentaFija: -20, crypto: 10, cash: -20 }
        }
      },
      'Medio plazo': {
        toShort: {
          label: "Mi horizonte es corto plazo (<3 años)",
          description: "Priorizar liquidez",
          icon: "Clock",
          category: "time",
          adjustments: { rentaVariable: -20, rentaFija: 15, crypto: -7, cash: 12 }
        },
        toLong: {
          label: "Mi horizonte es largo plazo (7-15 años)",
          description: "Aumentar exposición",
          icon: "Clock",
          category: "time",
          adjustments: { rentaVariable: 10, rentaFija: -5, crypto: 3, cash: -8 }
        }
      },
      'Largo plazo': {
        toMedium: {
          label: "Mi horizonte es medio plazo (3-7 años)",
          description: "Moderar exposición",
          icon: "Clock",
          category: "time",
          adjustments: { rentaVariable: -10, rentaFija: 5, crypto: -3, cash: 8 }
        },
        toVeryLong: {
          label: "Mi horizonte es muy largo plazo (>15 años)",
          description: "Máxima agresividad",
          icon: "Clock",
          category: "time",
          adjustments: { rentaVariable: 5, rentaFija: -5, crypto: 5, cash: -5 }
        }
      },
      'Muy largo plazo': {
        toLong: {
          label: "Mi horizonte es largo plazo (7-15 años)",
          adjustments: { rentaVariable: -5, rentaFija: 5, crypto: -5, cash: 5 }
        }
      }
    },

    // ===== AJUSTES RÁPIDOS GENERALES =====
    QUICK_ADJUSTMENTS: {
      moreGrowth: {
        label: "Quiero más crecimiento",
        description: "Aumentar potencial de retorno",
        icon: "TrendingUp",
        category: "general",
        adjustments: { rentaVariable: 10, rentaFija: -7, crypto: 0, cash: -3, gold: 0 }
      },
      moreStability: {
        label: "Quiero más estabilidad",
        description: "Reducir volatilidad",
        icon: "Shield",
        category: "general",
        adjustments: { rentaVariable: -10, rentaFija: 7, crypto: 0, cash: 3, gold: 0 }
      },
      moreIncome: {
        label: "Priorizar ingresos (dividendos)",
        description: "Aumentar activos que generan flujo",
        icon: "Percent",
        category: "general",
        adjustments: { rentaVariable: 0, rentaFija: 5, crypto: 0, cash: -5, gold: 0 }
      },
      moreProtection: {
        label: "Más protección anti-inflación",
        description: "Aumentar oro y activos defensivos",
        icon: "Lock",
        category: "general",
        adjustments: { rentaVariable: -10, rentaFija: 0, crypto: 0, gold: 5, cash: 5 }
      },
      addCrypto: {
        label: "Añadir criptomonedas (5%)",
        description: "Exposición a activos digitales",
        icon: "Bitcoin",
        category: "general",
        condition: (portfolio) => (portfolio.actualCrypto || portfolio.recommendedCrypto || 0) === 0,
        adjustments: { crypto: 5, rentaVariable: -3, rentaFija: -2, cash: 0, gold: 0 }
      },
      removeCrypto: {
        label: "Eliminar criptomonedas",
        description: "Reducir riesgo especulativo",
        icon: "XCircle",
        category: "general",
        condition: (portfolio) => (portfolio.actualCrypto || portfolio.recommendedCrypto || 0) > 0,
        adjustments: { crypto: -5, rentaVariable: 3, rentaFija: 2, cash: 0, gold: 0 }
      },
      addGold: {
        label: "Añadir oro (5%)",
        description: "Activo de protección",
        icon: "Coins",
        category: "general",
        condition: (portfolio) => (portfolio.actualGold || portfolio.recommendedGold || 0) === 0,
        adjustments: { gold: 5, rentaVariable: -3, rentaFija: -2, cash: 0, crypto: 0 }
      },
      removeGold: {
        label: "Eliminar oro",
        description: "Redistribuir a otros activos",
        icon: "XCircle",
        category: "general",
        condition: (portfolio) => (portfolio.actualGold || portfolio.recommendedGold || 0) > 0,
        adjustments: { gold: -5, rentaVariable: 3, rentaFija: 2, cash: 0, crypto: 0 }
      }
    }
  }
};

module.exports = PORTFOLIO_EXPLANATION_CONFIG;
