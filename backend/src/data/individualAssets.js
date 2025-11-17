// backend/src/data/individualAssets.js

/**
 * Acciones individuales del S&P 500 para agregar al portfolio
 * Actualizado: Octubre 2025
 */

const INDIVIDUAL_STOCKS = {
  
  // ============================================================
  // TECNOLOGÍA (Information Technology) - 31.6% del S&P 500
  // ============================================================
  
  "AAPL": {
    ticker: "AAPL",
    name: "Apple Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Tecnología de consumo, smartphones, tablets y servicios digitales",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "MSFT": {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software empresarial, cloud computing (Azure) y productividad",
    recommended_for: ["principiante", "intermedio", "avanzado"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "NVDA": {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Líder en GPUs, inteligencia artificial y semiconductores",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "ORCL": {
    ticker: "ORCL",
    name: "Oracle Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software empresarial, bases de datos y cloud computing",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ADBE": {
    ticker: "ADBE",
    name: "Adobe Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software creativo, marketing digital y gestión de documentos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CRM": {
    ticker: "CRM",
    name: "Salesforce Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software CRM líder y servicios cloud empresariales",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "DUOL": {
    ticker: "DUOL",
    name: "Duolingo Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Plataforma líder de aprendizaje de idiomas con IA y gamificación, 34M+ usuarios activos diarios",
    recommended_for: ["intermedio", "avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "UDMY": {
    ticker: "UDMY",
    name: "Udemy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Marketplace global de cursos online con 59M usuarios y 200K+ cursos en 75 idiomas",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "CHGG": {
    ticker: "CHGG",
    name: "Chegg Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Plataforma de tutorías y ayuda académica para estudiantes con herramientas de IA",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "DCBO": {
    ticker: "DCBO",
    name: "Docebo Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Plataforma cloud de Learning Management Systems (LMS) para formación empresarial",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "LAUR": {
    ticker: "LAUR",
    name: "Laureate Education Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Red global de universidades con programas online y presenciales de grado y postgrado",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SCHL": {
    ticker: "SCHL",
    name: "Scholastic Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Empresa líder en publicación de libros educativos y materiales para escuelas, 100+ años",
    recommended_for: ["principiante", "intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "DIDI": {
    ticker: "DIDI",
    name: "DiDi Global Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Líder en ride-hailing de China, millones de usuarios, opera en China, Brasil y México. Modelo similar a Uber, recovery post-regulaciones.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "HIGH",
    exchange: "NYSE/OTC"
  },
  "GRAB": {
    ticker: "GRAB",
    name: "Grab Holdings Limited",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Super-app líder en Sudeste Asiático con ride-hailing, entregas y servicios financieros. Modelo de expansión tipo Uber y alta penetración regional.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "DASH": {
    ticker: "DASH",
    name: "DoorDash, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Líder en entregas de comida en EE.UU., 65% cuota de mercado, tecnología de marketplace gig y expansión global.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "UPWK": {
    ticker: "UPWK",
    name: "Upwork Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Marketplace global para freelancers profesionales y clientes. Modelos B2B y B2C en servicios digitales, líder en remote work.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "FVRR": {
    ticker: "FVRR",
    name: "Fiverr International Ltd.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Marketplace digital creativo con freelancers globales, servicios por encargo, modelo similar a Uber para trabajos digitales.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "XYZ": {
    ticker: "XYZ",
    name: "Block, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financial Technology",
    description: "Proveedor líder de pagos digitales y Cash App, esencial para la infraestructura gig y pymes. Soluciones de pagos y nuevos productos fintech.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "STG": {
    ticker: "STG",
    name: "Sunlands Technology Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Plataforma de educación continua online en China con preparación de exámenes y certificaciones",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },

  "IH": {
    ticker: "IH",
    name: "iHuman Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Plataforma de educación personalizada basada en IA para aprendizaje de idiomas e infantil",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "VSTA": {
    ticker: "VSTA",
    name: "Vasta Platform Limited",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Plataforma de gestión escolar y soluciones EdTech enfocada en América Latina, especialmente Brasil",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "ATGE": {
    ticker: "ATGE",
    name: "Adtalem Global Education Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Proveedor líder de educación profesional y sanitaria con crecimiento del 12.9% anual",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "EDU": {
    ticker: "EDU",
    name: "New Oriental Education and Technology Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Mayor proveedor de servicios educativos privados en China con 15M+ inscripciones históricas",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "TAL": {
    ticker: "TAL",
    name: "TAL Education Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Education Technology",
    description: "Plataforma K-12 de educación personalizada en China con millones de usuarios activos",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "ACN": {
    ticker: "ACN",
    name: "Accenture plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Consultoría tecnológica y servicios profesionales globales",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "RGTI": {
    ticker: "RGTI",
    name: "Rigetti Computing Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Quantum Computing",
    description: "Pionera en computación cuántica superconductora con 36 qubits y roadmap hacia 100+ qubits. Stock ha retornado 190% en 2025, cuarta acción más negociada en Interactive Brokers",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "QBTS": {
    ticker: "QBTS",
    name: "D-Wave Quantum Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Quantum Computing",
    description: "Líder en quantum annealing con retorno del 341% en 2025. 100+ clientes pagadores incluyendo Mastercard. Ingresos Q3 $3.7M (+100% YoY), cash $819M sin deuda",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NYSE"
  },

  "IONQ": {
    ticker: "IONQ",
    name: "IonQ Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Quantum Computing",
    description: "Primera empresa cuántica en cotizar (Oct 2021). Tecnología trampa de iones con átomos de iterbio. Retorno +49% en 2025. Mejor fidelidad de operaciones cuánticas",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NYSE"
  },

  "QUBT": {
    ticker: "QUBT",
    name: "Quantum Computing Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Quantum Computing",
    description: "Enfoque de computación nanofotónica (entropy computing) sin necesidad de criogenia. Tecnología fotónica integrada para qubits ópticos. Comercialización en fase temprana",
    recommended_for: ["avanzado", "agresivo"],
    risk: "VERY_HIGH",
    exchange: "NASDAQ"
  },

  // ============================================================
  // CRIPTOGRAFÍA POST-CUÁNTICA (Post-Quantum Cryptography)
  // ============================================================

  "LAES": {
    ticker: "LAES",
    name: "SEALSQ Corp",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Quantum Computing",
    description: "Semiconductores seguros con criptografía resistente a ataques cuánticos. Lanzó chip QS7001 con algoritmos NIST-PQC. Cash $220M, ingresos esperados $17.5-20M 2025. Stock +1,385% en 12 meses",
    recommended_for: ["intermedio", "avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "BTQ": {
    ticker: "BTQ",
    name: "BTQ Technologies Corp",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Quantum Computing",
    description: "Infraestructura post-cuántica para redes seguras. Soluciones de criptografía resistente a computación cuántica. Cotiza en NEO Exchange de Canadá con divisas CAD",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "FCCN": {
    ticker: "FCCN",
    name: "Spectral Capital Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Quantum Computing",
    description: "Acelerador de startups de tecnología cuántica (Quantum as a Service). Invierte en y apoya empresas de quantum computing. Modelo de portafolio de tecnología emergente",
    recommended_for: ["avanzado", "agresivo"],
    risk: "VERY_HIGH",
    exchange: "OTC"
  },
  "ABZT": {
  ticker: "ABZT",
  name: "Ablaze Technologies Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Information Technology",
  description: "Tecnología y soluciones empresariales",
  recommended_for: ["avanzado"],
  risk: "HIGH",
  exchange: "OTC"
},

"ABLV": {
  ticker: "ABLV",
  name: "Able View Global Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Communication Services",
  description: "Plataforma de gestión de marcas de belleza en China con servicios de marketing digital",
  recommended_for: ["avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},

"ABSI": {
  ticker: "ABSI",
  name: "Absci Corporation",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Empresa de biotecnología con IA para descubrimiento de fármacos y terapias con anticuerpos",
  recommended_for: ["avanzado", "agresivo"],
  risk: "HIGH",
  exchange: "NASDAQ"
},
"ABZT": {
  ticker: "ABZT",
  name: "Ablaze Technologies Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Information Technology",
  description: "Tecnología y soluciones empresariales",
  recommended_for: ["avanzado"],
  risk: "HIGH",
  exchange: "OTC"
},

"ABLV": {
  ticker: "ABLV",
  name: "Able View Global Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Communication Services",
  description: "Plataforma de gestión de marcas de belleza en China con servicios de marketing digital",
  recommended_for: ["avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},

"ABSI": {
  ticker: "ABSI",
  name: "Absci Corporation",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Empresa de biotecnología con IA para descubrimiento de fármacos y terapias con anticuerpos",
  recommended_for: ["avanzado", "agresivo"],
  risk: "HIGH",
  exchange: "NASDAQ"
},
"ABM": {
  ticker: "ABM",
  name: "ABM Industries Incorporated",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Industrials",
  description: "Proveedor de soluciones integradas de instalaciones: mantenimiento, limpieza y servicios técnicos",
  recommended_for: ["principiante", "intermedio"],
  risk: "LOW",
  exchange: "NYSE"
},
"AWIN": {
  ticker: "AWIN",
  name: "AERWINS Technologies Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Industrials",
  description: "Fabricante de vehículos aéreos de un solo asiento opcionalmente tripulados",
  recommended_for: ["avanzado"],
  risk: "HIGH",
  exchange: "NASDAQ"
},
"AES": {
  ticker: "AES",
  name: "The AES Corporation",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Utilities",
  description: "Generación, distribución y comercialización de energía eléctrica a nivel mundial",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NYSE"
},
"AEMD": {
  ticker: "AEMD",
  name: "Aethlon Medical, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Dispositivos médicos para enfermedades virales y sepsis",
  recommended_for: ["avanzado"],
  risk: "HIGH",
  exchange: "NASDAQ"
},

"AFYA": {
  ticker: "AFYA",
  name: "Afya Limited",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Plataforma educativa para entrenamiento médico y cursos en Brasil",
  recommended_for: ["avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},

"AMG": {
  ticker: "AMG",
  name: "Affiliated Managers Group, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Financials",
  description: "Sociedad holding de gestoras de activos independientes con presencia global",
  recommended_for: ["intermedio", "avanzado"],
  risk: "MEDIUM",
  exchange: "NYSE"
},
"AFRM": {
  ticker: "AFRM",
  name: "Affirm Holdings, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Financials",
  description: "Plataforma de punto de venta para compra a plazo sin interés ni cuotas",
  recommended_for: ["avanzado"],
  risk: "HIGH",
  exchange: "NASDAQ"
},
"A": {
  ticker: "A",
  name: "Agilent Technologies, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Instrumentos científicos, diagnósticos de laboratorio y soluciones analíticas",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NYSE"
},

"AGL": {
  ticker: "AGL",
  name: "Agilon Health, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Organizaciones de médicos en red para atención médica gerenciada",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},

"AGIO": {
  ticker: "AGIO",
  name: "Agios Pharmaceuticals, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Biofarmacéutica especializada en enfermedades genéticas raras y metabolismo",
  recommended_for: ["avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},

"AEM": {
  ticker: "AEM",
  name: "Agnico Eagle Mines Limited",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Materials",
  description: "Minería de oro con operaciones en Canadá, México, Finlandia y Australia",
  recommended_for: ["intermedio", "avanzado"],
  risk: "MEDIUM",
  exchange: "NYSE"
},

"AL": {
  ticker: "AL",
  name: "Air Lease Corporation",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Industrials",
  description: "Arrendamiento y venta de aeronaves comerciales a aerolíneas globales",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NYSE"
},

"APD": {
  ticker: "APD",
  name: "Air Products & Chemicals, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Materials",
  description: "Gases especiales, equipos de procesamiento e hidrógeno verde para industrias",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NYSE"
},

"AIRT": {
  ticker: "AIRT",
  name: "Air T, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Industrials",
  description: "Servicios de logística especializada y transporte aéreo de carga",
  recommended_for: ["avanzado"],
  risk: "HIGH",
  exchange: "NASDAQ"
},

"ABNB": {
  ticker: "ABNB",
  name: "Airbnb, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Consumer Discretionary",
  description: "Plataforma de alojamiento compartido y experiencias de viaje global",
  recommended_for: ["intermedio", "avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},

"AIRG": {
  ticker: "AIRG",
  name: "Airgain, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Technology",
  description: "Antenas y soluciones inalámbricas para dispositivos móviles y IoT",
  recommended_for: ["avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},

"ADC": {
  ticker: "ADC",
  name: "Agree Realty Corporation",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Real Estate",
  description: "REIT de retail con propiedades neto arrendadas en 50 estados de USA",
  recommended_for: ["intermedio"],
  risk: "LOW",
  exchange: "NYSE"
},
"AGNC": {
  ticker: "AGNC",
  name: "AGNC Investment Corp.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Financials",
  description: "REIT de inversión hipotecaria con alto rendimiento de dividendos mensuales",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},
"AIRJ": {
    ticker: "AIRJ",
    name: "AIRJOULE TECHNOLOGIES CORPORATION",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Tecnología de climatización y energía eficiente",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "AIRO": {
    ticker: "AIRO",
    name: "AIRO GROUP HOLDINGS, INC.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Aerospace & Defense",
    description: "Drones y sistemas autónomos para defensa",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "AIRS": {
    ticker: "AIRS",
    name: "AIRSCULPT TECHNOLOGIES, INC.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Procedimientos de escultura corporal minimamente invasivos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "AISP": {
    ticker: "AISP",
    name: "AIRSHIP AI HOLDINGS, INC.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Plataforma de vigilancia y gestión de datos de video",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "YYAI": {
    ticker: "YYAI",
    name: "AIRWA INC.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Technology",
    description: "Tecnología digital y soluciones Web3",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "AKAN": {
    ticker: "AKAN",
    name: "AKANDA CORP.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Cultivo, fabricación y distribución de cannabis medicinal",
    recommended_for: ["intermedio", "avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "AKBA": {
    ticker: "AKBA",
    name: "AKEBIA THERAPEUTICS, INC.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Biofarmacéutica enfocada en enfermedades renales",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "AKRO": {
    ticker: "AKRO",
    name: "AKERO THERAPEUTICS, INC.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Desarrollo de tratamientos para enfermedades metabólicas",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "AKTS": {
    ticker: "AKTS",
    name: "AKOUSTIS TECHNOLOGIES, INC.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Productos de filtro de radiofrecuencia para telecomunicaciones",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
"AGCC": {
  ticker: "AGCC",
  name: "Agencia Comercial Spirits Ltd",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Consumer Staples",
  description: "Distribuidor de bebidas alcohólicas de lujo y spirits",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},
"AGYS": {
  ticker: "AGYS",
  name: "Agilysys, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Technology",
  description: "Software de punto de venta y sistemas de gestión para hotelería y gastronomía",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},
"AGCO": {
  ticker: "AGCO",
  name: "AGCO Corporation",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Industrials",
  description: "Fabricante global de equipos agrícolas y maquinaria agrícola de precisión",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NYSE"
},
"AGEN": {
  ticker: "AGEN",
  name: "Agenus Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Empresa de inmuno-oncología con terapias contra el cáncer basadas en IA",
  recommended_for: ["avanzado"],
  risk: "HIGH",
  exchange: "NASDAQ"
},
"ABVE": {
  ticker: "ABVE",
  name: "Above Food Ingredients Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Consumer Staples",
  description: "Empresa regenerativa de ingredientes con cadena de suministro verticalizada en granos y CPG",
  recommended_for: ["intermedio", "avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},
"ASO": {
  ticker: "ASO",
  name: "Academy Sports and Outdoors, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Consumer Discretionary",
  description: "Retailer de artículos deportivos y outdoor con 300+ tiendas especializadas en caza, pesca y acampada",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},
"ABLE": {
  ticker: "ABLE",
  name: "Able Energy, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Energy",
  description: "Empresa de servicios de energía retail (Status: en dificultades)",
  recommended_for: ["avanzado", "agresivo"],
  risk: "HIGH",
  exchange: "OTC"
},
"ACHC": {
  ticker: "ACHC",
  name: "Acadia Healthcare Company, Inc.",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Healthcare",
  description: "Operador de instalaciones de atención de la salud conductual con hospitales psiquiátricos especializados",
  recommended_for: ["intermedio"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},
"ACTG": {
  ticker: "ACTG",
  name: "Acacia Research Corporation",
  type: "STOCK",
  category: "RENTA_VARIABLE",
  sector: "Technology",
  description: "Empresa de operaciones de propiedad intelectual e industrial en sectores variados",
  recommended_for: ["avanzado"],
  risk: "MEDIUM",
  exchange: "NASDAQ"
},
"ADTN": {
ticker: "ADTN",
name: "ADTRAN Holdings, Inc.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Information Technology",
description: "Proveedor de plataformas de networking, software y servicios de comunicaciones para operadores de telecomunicaciones y enterprise",
recommended_for: ["avanzado"],
risk: "MEDIUM",
exchange: "NASDAQ"
},
"AEIS": {
ticker: "AEIS",
name: "Advanced Energy Industries, Inc.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Technology",
description: "Proveedor de soluciones de conversion de potencia de precisión, medición y control para equipos complejos industriales y data centers",
recommended_for: ["avanzado"],
risk: "MEDIUM",
exchange: "NASDAQ"
},
"ADAG": {
ticker: "ADAG",
name: "Adagene Inc.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Healthcare",
description: "Empresa de biotecnología enfocada en desarrollo de terapias de anticuerpos para cancer usando plataforma SAFEbody® y tecnologia IA",
recommended_for: ["avanzado"],
risk: "HIGH",
exchange: "NASDAQ"
},

"ADAP": {
ticker: "ADAP",
name: "Adaptimmune Therapeutics PLC",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Healthcare",
description: "Biofarmacéutica comercial especializada en terapias celulares TCR con TECELRA para sarcoma sinovial y multiples programas oncologicos",
recommended_for: ["avanzado"],
risk: "HIGH",
exchange: "NASDAQ"
},

"ADPT": {
ticker: "ADPT",
name: "Adaptive Biotechnologies Corporation",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Healthcare",
description: "Plataforma de medicina inmunológica con diagnosticos clonoSEQ para evaluacion residual minima y tratamientos de inmunoterapia celular",
recommended_for: ["avanzado"],
risk: "MEDIUM",
exchange: "NASDAQ"
},

"ADCT": {
ticker: "ADCT",
name: "ADC Therapeutics SA",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Healthcare",
description: "Biofarmacéutica especializada en conjugados de anticuerpos medicamentosos ADC para malignidades hematologicas y tumores solidos",
recommended_for: ["avanzado"],
risk: "HIGH",
exchange: "NYSE"
},

"ADIL": {
ticker: "ADIL",
name: "Adial Pharmaceuticals, Inc.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Healthcare",
description: "Biofarmacéutica en desarrollo de terapeuticas para tratamiento y prevencion de adicción y desordenes relacionados con su candidato AD04",
recommended_for: ["avanzado"],
risk: "HIGH",
exchange: "NASDAQ"
},
"ADUS": {
ticker: "ADUS",
name: "Addus HomeCare Corporation",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Healthcare",
description: "Proveedor de servicios de cuidado personal en el hogar no medico, hospice y servicios de salud domesticos para adultos mayores",
recommended_for: ["intermedio"],
risk: "MEDIUM",
exchange: "NASDAQ"
},
  "ACVA": {
ticker: "ACVA",
name: "ACV Auctions Inc.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Consumer Discretionary",
description: "Plataforma de subastas mayoristas para venta de vehiculos usados entre concesionarios con marketplace digital e inteligencia artificial",
recommended_for: ["intermedio", "avanzado"],
risk: "MEDIUM",
exchange: "NASDAQ"
},
"ADNT": {
ticker: "ADNT",
name: "Adient PLC",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Consumer Cyclical",
description: "Proveedor lider mundial de asientos para automóviles y sistemas integrados de interiores automotrices para industria global",
recommended_for: ["intermedio"],
risk: "MEDIUM",
exchange: "NYSE"
},
"ADEA": {
ticker: "ADEA",
name: "Adeia Inc.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Technology",
description: "Empresa de licenciamiento de innovaciones y propiedad intelectual para entretenimiento, media, electronica de consumo y semiconductores",
recommended_for: ["avanzado"],
risk: "MEDIUM",
exchange: "NASDAQ"
},
"WMS": {
ticker: "WMS",
name: "Advanced Drainage Systems, Inc.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Industrials",
description: "Fabricante de tuberias corrugadas termoplasticas y sistemas de gestion de agua para drenaje residencial, comercial e infraestructura",
recommended_for: ["intermedio"],
risk: "MEDIUM",
exchange: "NYSE"
},
"AGRO": {
ticker: "AGRO",
name: "Adecoagro S.A.",
type: "STOCK",
category: "RENTA_VARIABLE",
sector: "Consumer Staples",
description: "Empresa agro-industrial verticalizada con produccion agricola, arroz, azucar, etanol y productos lacteos en Argentina Brasil Chile Uruguay",
recommended_for: ["avanzado"],
risk: "MEDIUM",
exchange: "NYSE"
},
  "AMD": {
    ticker: "AMD",
    name: "Advanced Micro Devices Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Procesadores, GPUs y soluciones de computación de alto rendimiento",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "INTC": {
    ticker: "INTC",
    name: "Intel Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Semiconductores, procesadores y tecnología de chips",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "INTU": {
    ticker: "INTU",
    name: "Intuit Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software financiero (TurboTax, QuickBooks, Mint)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "IBM": {
    ticker: "IBM",
    name: "International Business Machines",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Tecnología empresarial, cloud, IA y servicios de consultoría",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "TXN": {
    ticker: "TXN",
    name: "Texas Instruments Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Semiconductores y componentes electrónicos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "QCOM": {
    ticker: "QCOM",
    name: "Qualcomm Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Chips de telecomunicaciones y tecnología 5G",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "AMAT": {
    ticker: "AMAT",
    name: "Applied Materials Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Equipos de fabricación de semiconductores",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "MU": {
    ticker: "MU",
    name: "Micron Technology Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Memoria y almacenamiento de semiconductores",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "ADI": {
    ticker: "ADI",
    name: "Analog Devices Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Circuitos integrados analógicos y mixtos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "APH": {
    ticker: "APH",
    name: "Amphenol Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Conectores electrónicos y cables",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SNPS": {
    ticker: "SNPS",
    name: "Synopsys Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software de diseño de semiconductores y seguridad",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CDNS": {
    ticker: "CDNS",
    name: "Cadence Design Systems Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software de diseño electrónico y semiconductores",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "MCHP": {
    ticker: "MCHP",
    name: "Microchip Technology Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Microcontroladores y semiconductores especializados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "ASML": {
  ticker: "ASML", 
  name: "ASML Holding NV", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Fabricante de equipos de litografia EUV para manufactura de microchips de ultima generacion", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"ARM": {
  ticker: "ARM", 
  name: "ARM Holdings PLC", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Disenador y licenciador de arquitectura de procesadores ARM utilizada en smartphones y dispositivos IoT", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"MRVL": {
  ticker: "MRVL", 
  name: "Marvell Technology Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Disenador de chips fabless especializado en networking, datacenter, y tecnologia de IA", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"AVGO": {
  ticker: "AVGO", 
  name: "Broadcom Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Fabricante de semiconductores para infraestructura de networking, datacenter y conectividad inalambrica", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"LRCX": {
  ticker: "LRCX", 
  name: "Lam Research Corporation", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Fabricante de equipos de procesamiento de obleas para manufactura de semiconductores", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"KLAC": {
  ticker: "KLAC", 
  name: "KLA Corporation", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Proveedor de equipos de inspeccion y control de procesos para fabricacion de chips", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"SNPS": {
  ticker: "SNPS", 
  name: "Synopsys Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider en software EDA (Electronic Design Automation) para diseño de semiconductores con IA integrada", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"CDNS": {
  ticker: "CDNS", 
  name: "Cadence Design Systems Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Proveedor de software EDA y herramientas de analisis para diseño de sistemas electronicos", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"NXPI": {
  ticker: "NXPI", 
  name: "NXP Semiconductors NV", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Fabricante holandesa de semiconductores para automotriz, IoT, conectividad y aplicaciones industriales", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
  "MPWR": {
    ticker: "MPWR",
    name: "Monolithic Power Systems Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Soluciones de gestión de energía semiconductores",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CEG": {
  ticker: "CEG", 
  name: "Constellation Energy Corporation", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Utilities", 
  description: "Mayor productor de energia nuclear carbon-free en USA con 21 reactores y acuerdos con Meta y Microsoft para potencia limpia", 
  recommended_for: ["principiante", "intermedio"], 
  risk: "LOW", 
  exchange: "NASDAQ"
},
"ENPH": {
  ticker: "ENPH", 
  name: "Enphase Energy Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Utilities", 
  description: "Lider mundial en microinversores solares y sistemas de almacenamiento energetico con eficiencia del 97.5%", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"PLUG": {
  ticker: "PLUG", 
  name: "Plug Power Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Utilities", 
  description: "Pionera en tecnologia de celdas de combustible de hidrogeno verde para transporte y energias limpias industriales", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"RKLB": {
  ticker: "RKLB", 
  name: "Rocket Lab Corporation", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Aerospace & Defense", 
  description: "Compania de espaciutecnologia con cohetes Electron reutilizables, satelites y componentes orbitales para contelaciones", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"DDOG": {
  ticker: "DDOG", 
  name: "Datadog Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma SaaS de monitoreo observabilidad y seguridad para infraestructura cloud y aplicaciones con IA integrada", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"OKTA": {
  ticker: "OKTA", 
  name: "Okta Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider en identidad cloud y gestion de acceso para aplicaciones con autenticacion segura y SSO empresarial", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"GTLB": {
  ticker: "GTLB", 
  name: "Gitlab Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma DevOps completa para desarrollo de software con CI/CD integracion y seguridad desde la fuente", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"CRWD": {
  ticker: "CRWD", 
  name: "CrowdStrike Holdings Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider en ciberseguridad con plataforma Falcon para proteccion endpoints, cloud y datos empresariales", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"ZS": {
  ticker: "ZS", 
  name: "Zscaler Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma de seguridad cloud zero trust para proteger acceso a internet y aplicaciones SaaS en la nube", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"PANW": {
  ticker: "PANW", 
  name: "Palo Alto Networks Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider global en ciberseguridad con plataforma consolidada para redes firewalls cloud y proteccion AI/ML", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
  "FTNT": {
    ticker: "FTNT",
    name: "Fortinet Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Soluciones de ciberseguridad y redes",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "NOW": {
    ticker: "NOW",
    name: "ServiceNow Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Plataforma cloud de gestión de servicios IT",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "PLTR": {
    ticker: "PLTR",
    name: "Palantir Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Análisis de datos y software de inteligencia",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "APP": {
    ticker: "APP",
    name: "AppLovin Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Plataforma de marketing y monetización de aplicaciones móviles",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "FICO": {
    ticker: "FICO",
    name: "Fair Isaac Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Análisis predictivo y puntaje crediticio",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ANSS": {
    ticker: "ANSS",
    name: "ANSYS Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software de simulación y ingeniería",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "TYL": {
    ticker: "TYL",
    name: "Tyler Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software para gobiernos locales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PTC": {
    ticker: "PTC",
    name: "PTC Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software IoT y PLM (gestión del ciclo de vida del producto)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "GDDY": {
    ticker: "GDDY",
    name: "GoDaddy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Dominios web, hosting y servicios online para pequeñas empresas",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "GEN": {
    ticker: "GEN",
    name: "Gen Digital Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Ciberseguridad para consumidores (Norton, Avast)",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "AKAM": {
    ticker: "AKAM",
    name: "Akamai Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Red de entrega de contenido (CDN) y ciberseguridad",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "VRSN": {
    ticker: "VRSN",
    name: "VeriSign Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Infraestructura de dominios de internet y DNS",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "CTSH": {
    ticker: "CTSH",
    name: "Cognizant Technology Solutions Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Servicios de tecnología y consultoría",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "EPAM": {
    ticker: "EPAM",
    name: "EPAM Systems Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Servicios de ingeniería de software y desarrollo de productos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "IT": {
    ticker: "IT",
    name: "Gartner Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Investigación y consultoría tecnológica",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "FSLR": {
    ticker: "FSLR",
    name: "First Solar Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Fabricante de paneles solares fotovoltaicos",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "HPE": {
    ticker: "HPE",
    name: "Hewlett Packard Enterprise Co.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Soluciones de infraestructura IT empresarial",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "HPQ": {
    ticker: "HPQ",
    name: "HP Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "PCs, impresoras y soluciones de impresión",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DELL": {
    ticker: "DELL",
    name: "Dell Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Hardware, servidores y soluciones de almacenamiento",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "NTAP": {
    ticker: "NTAP",
    name: "NetApp Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Almacenamiento de datos y gestión de datos cloud",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "WDC": {
    ticker: "WDC",
    name: "Western Digital Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Discos duros y soluciones de almacenamiento de datos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "STX": {
    ticker: "STX",
    name: "Seagate Technology Holdings plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Almacenamiento de datos y discos duros",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "SMCI": {
    ticker: "SMCI",
    name: "Super Micro Computer Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Servidores de alto rendimiento para IA y data centers",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "ANET": {
    ticker: "ANET",
    name: "Arista Networks Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Soluciones de redes para centros de datos y cloud",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "FFIV": {
    ticker: "FFIV",
    name: "F5 Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Seguridad y gestión de aplicaciones multi-cloud",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "MSI": {
    ticker: "MSI",
    name: "Motorola Solutions Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Comunicaciones para seguridad pública y empresas",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "KEYS": {
    ticker: "KEYS",
    name: "Keysight Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Equipos de prueba y medición electrónica",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "TRMB": {
    ticker: "TRMB",
    name: "Trimble Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "GPS, software y equipos de posicionamiento",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "ZBRA": {
    ticker: "ZBRA",
    name: "Zebra Technologies Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Lectores de código de barras y soluciones de seguimiento",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CDW": {
    ticker: "CDW",
    name: "CDW Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Distribución de tecnología y soluciones IT",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "TEL": {
    ticker: "TEL",
    name: "TE Connectivity Ltd.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Conectores y sensores para industria",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "GLW": {
    ticker: "GLW",
    name: "Corning Incorporated",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Vidrios especiales, fibra óptica y materiales cerámicos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "JBL": {
    ticker: "JBL",
    name: "Jabil Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Manufactura electrónica y servicios",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ON": {
    ticker: "ON",
    name: "ON Semiconductor Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Semiconductores de energía y sensores",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "SWKS": {
    ticker: "SWKS",
    name: "Skyworks Solutions Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Semiconductores analógicos para comunicaciones móviles",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "ROP": {
    ticker: "ROP",
    name: "Roper Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Software empresarial y productos tecnológicos industriales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "TDY": {
    ticker: "TDY",
    name: "Teledyne Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Instrumentación digital y electrónica aeroespacial",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "TER": {
    ticker: "TER",
    name: "Teradyne Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Equipos de prueba de semiconductores y electrónica",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  // ============================================================
  // SERVICIOS FINANCIEROS (Financials) - 14.3% del S&P 500
  // ============================================================
  
  "JPM": {
    ticker: "JPM",
    name: "JPMorgan Chase & Co.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco líder mundial en servicios financieros y banca de inversión",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "BAC": {
    ticker: "BAC",
    name: "Bank of America Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca retail, comercial y gestión de patrimonios",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "WFC": {
    ticker: "WFC",
    name: "Wells Fargo & Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca tradicional y servicios financieros diversificados",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "GS": {
    ticker: "GS",
    name: "Goldman Sachs Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca de inversión y gestión de activos de élite",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MS": {
    ticker: "MS",
    name: "Morgan Stanley",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca de inversión, gestión patrimonial y trading",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "C": {
    ticker: "C",
    name: "Citigroup Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco global de servicios financieros",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "BX": {
    ticker: "BX",
    name: "Blackstone Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Firma líder de inversión alternativa y private equity",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "BLK": {
    ticker: "BLK",
    name: "BlackRock Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Mayor gestora de activos del mundo",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SCHW": {
    ticker: "SCHW",
    name: "Charles Schwab Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Corretaje minorista y gestión de patrimonios",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CB": {
    ticker: "CB",
    name: "Chubb Limited",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros de propiedad y responsabilidad civil",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PGR": {
    ticker: "PGR",
    name: "Progressive Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros de automóviles y propiedad",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "V": {
    ticker: "V",
    name: "Visa Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Red global de pagos electrónicos y tarjetas",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MA": {
    ticker: "MA",
    name: "Mastercard Incorporated",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Tecnología de pagos y procesamiento de transacciones",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SPGI": {
    ticker: "SPGI",
    name: "S&P Global Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Calificaciones crediticias, índices e inteligencia de mercados",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AXP": {
    ticker: "AXP",
    name: "American Express Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Tarjetas de crédito premium y servicios financieros",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CME": {
    ticker: "CME",
    name: "CME Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Mercado de derivados y futuros más grande del mundo",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "ICE": {
    ticker: "ICE",
    name: "Intercontinental Exchange Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Operadora de bolsas y mercados financieros (NYSE)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MCO": {
    ticker: "MCO",
    name: "Moody's Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Agencia de calificación crediticia y análisis de riesgos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MSCI": {
    ticker: "MSCI",
    name: "MSCI Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Índices bursátiles y herramientas de análisis de inversión",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "BRK.B": {
    ticker: "BRK.B",
    name: "Berkshire Hathaway Inc. Class B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Conglomerado de inversiones de Warren Buffett",
    recommended_for: ["principiante", "intermedio", "conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AON": {
    ticker: "AON",
    name: "Aon plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Corretaje de seguros y gestión de riesgos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MMC": {
    ticker: "MMC",
    name: "Marsh & McLennan Companies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Corretaje de seguros y consultoría de riesgos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "TFC": {
    ticker: "TFC",
    name: "Truist Financial Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca regional en el sureste de EE.UU.",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "USB": {
    ticker: "USB",
    name: "U.S. Bancorp",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco regional diversificado",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PNC": {
    ticker: "PNC",
    name: "PNC Financial Services Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca regional y gestión de activos",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "COF": {
    ticker: "COF",
    name: "Capital One Financial Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Tarjetas de crédito y banca de consumo",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "AIG": {
    ticker: "AIG",
    name: "American International Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros generales y de vida a nivel global",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MET": {
    ticker: "MET",
    name: "MetLife Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros de vida y servicios financieros",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PRU": {
    ticker: "PRU",
    name: "Prudential Financial Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros de vida y gestión de activos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AFL": {
    ticker: "AFL",
    name: "Aflac Incorporated",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros complementarios en EE.UU. y Japón",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AMP": {
    ticker: "AMP",
    name: "Ameriprise Financial Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Planificación financiera y gestión de patrimonios",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "TRV": {
    ticker: "TRV",
    name: "Travelers Companies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros de propiedad y responsabilidad civil",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ALL": {
    ticker: "ALL",
    name: "Allstate Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros de automóviles y hogar",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "FI": {
    ticker: "FI",
    name: "Fiserv Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Procesamiento de pagos y tecnología financiera",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PYPL": {
    ticker: "PYPL",
    name: "PayPal Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Pagos digitales y billeteras electrónicas",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "FIS": {
    ticker: "FIS",
    name: "Fidelity National Information Services Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Tecnología bancaria y procesamiento de pagos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "GPN": {
    ticker: "GPN",
    name: "Global Payments Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Procesamiento de transacciones y software de pagos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "SYF": {
    ticker: "SYF",
    name: "Synchrony Financial",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Financiamiento al consumidor y tarjetas de crédito retail",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "KKR": {
    ticker: "KKR",
    name: "KKR & Co. Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Private equity y gestión de inversiones alternativas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "APO": {
    ticker: "APO",
    name: "Apollo Global Management Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Inversiones alternativas y private equity",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ROKU": {
  ticker: "ROKU", 
  name: "Roku Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Communication Services", 
  description: "Lider de plataforma streaming de TV en USA con 145 millones de usuarios y Roku Channel con contenido gratis y premium", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"LYFT": {
  ticker: "LYFT", 
  name: "Lyft Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Plataforma ridesharing operando en USA y Canada con modelo de flexible pricing y tips para conductores", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"SBUX": {
  ticker: "SBUX", 
  name: "Starbucks Corporation", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Mayor cadena de cafeterias del mundo con 36000+ tiendas en 80+ paises y experiencias premium con Starbucks Reserve", 
  recommended_for: ["principiante", "intermedio"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"AMKR": {
  ticker: "AMKR", 
  name: "Amkor Technology Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Mayor proveedor OSAT de empaquetado y prueba de semiconductores para IA con inversion $7B en campus Arizona", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"ON": {
  ticker: "ON", 
  name: "onsemi Corporation", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Fabricante de semiconductores power management y sensores para automocion IoT y datacenter IA con tecnologia GaN", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"MKTX": {
  ticker: "MKTX", 
  name: "MarketAxess Holdings Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Lider plataforma electronica trading de bonos corporativos con 85% credit investment-grade y 20% volumen total USA", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"RIOT": {
  ticker: "RIOT", 
  name: "Riot Platforms Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Technology", 
  description: "Mineria de bitcoin con data centers en Texas operando 200000+ ASICs para hashrate maximo y rentabilidad", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"MARA": {
  ticker: "MARA", 
  name: "Marathon Digital Holdings Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Technology", 
  description: "Mayor mineria de bitcoin en USA con operaciones en Montana y acuerdos de energia renovable para sostenibilidad", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"HUT": {
  ticker: "HUT", 
  name: "Hut 8 Mining Corp.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Technology", 
  description: "Mineria de bitcoin canadiense con 50000+ ASICs y operaciones de blockchain para web3 infraestructura", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"COIN": {
  ticker: "COIN", 
  name: "Coinbase Global Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Mayor exchange de criptomonedas de USA con trading de bitcoin ethereum y 150 assets con staking y DeFi", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
},
  "HOOD": {
    ticker: "HOOD",
    name: "Robinhood Markets Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Plataforma de trading online sin comisiones",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "BK": {
    ticker: "BK",
    name: "BNY Mellon",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Custodia de activos y servicios bancarios institucionales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "STT": {
    ticker: "STT",
    name: "State Street Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Custodia de activos y gestión de inversiones institucionales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "TROW": {
    ticker: "TROW",
    name: "T. Rowe Price Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Gestión de activos y fondos mutuos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "BEN": {
    ticker: "BEN",
    name: "Franklin Resources Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Gestión de activos (Franklin Templeton)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CBOE": {
    ticker: "CBOE",
    name: "Cboe Global Markets Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Operadora de bolsas de opciones y derivados",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "CBOE"
  },
  "NDAQ": {
    ticker: "NDAQ",
    name: "Nasdaq Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Operadora de la bolsa Nasdaq y tecnología de mercados",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
    // ============================================================
  // SALUD (Healthcare) - 10.8% del S&P 500
  // ============================================================
  
  "UNH": {
    ticker: "UNH",
    name: "UnitedHealth Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Mayor aseguradora de salud de EE.UU. y servicios médicos",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "LLY": {
    ticker: "LLY",
    name: "Eli Lilly and Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica líder en diabetes, oncología y neurociencia",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "JNJ": {
    ticker: "JNJ",
    name: "Johnson & Johnson",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Productos farmacéuticos, dispositivos médicos y salud del consumidor",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },

  "ABBV": {
    ticker: "ABBV",
    name: "AbbVie Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Biofarmacéutica especializada en inmunología y oncología",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AMRK": {
    ticker: "AMRK",
    name: "A-Mark Precious Metals, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Proveedor global de metales preciosos, acuñación, refinerías y servicios de coberturas",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
},

"AOS": {
    ticker: "AOS",
    name: "A. O. Smith Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante líder de calentadores de agua residenciales y comerciales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
},

"MAKE": {
    ticker: "MAKE",
    name: "A.D. Makepeace Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Productor agrícola de arándanos y otros productos agrícolas",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "OTCPK"
},

"AKA": {
    ticker: "AKA",
    name: "A.K.A. Brands Holding Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Compañía de ropa y accesorios con marcas emergentes",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
},

"AWON": {
    ticker: "AWON",
    name: "A1 Group, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Retail",
    description: "Empresa de retail especializado",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "OTCPK"
},

"ATEN": {
    ticker: "ATEN",
    name: "A10 Networks, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Proveedor de soluciones de seguridad y optimización de aplicaciones",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
},

"AZ": {
    ticker: "AZ",
    name: "A2Z Cust2Mate Solutions Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Soluciones de comercio electrónico y carros de compra inteligentes",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
},

"AAM": {
    ticker: "AAM",
    name: "AA Mission Acquisition Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Sociedad de propósito especial de adquisición",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
},

"AAXT": {
    ticker: "AAXT",
    name: "Aamaxan Transport Group, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Transportation",
    description: "Empresa de transporte y logística",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "OTCPK"
},

"AAON": {
    ticker: "AAON",
    name: "AAON, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante de equipos de calefacción, ventilación y aire acondicionado",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
},

"AAP": {
    ticker: "AAP",
    name: "Advance Auto Parts, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Distribuidor de piezas de repuesto y accesorios de automóviles",
    recommended_for: ["intermedio"],
    risk: "HIGH",
    exchange: "NYSE"
},

"AIR": {
    ticker: "AIR",
    name: "AAR Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Proveedor de piezas, componentes y servicios para la industria aeroespacial",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
},

"AARD": {
    ticker: "AARD",
    name: "Aardvark Therapeutics, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Empresa de biotecnología enfocada en enfermedades metabólicas",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
},

"ABL": {
    ticker: "ABL",
    name: "Abacus Global Management, Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Firma de gestión de inversiones alternativas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
},

"ATTB.F": {
    ticker: "ATTB.F",
    name: "Abattis Bioceuticals Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Empresa de biofarmacéuticos especializada en cuidado de la salud",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "OTCPK"
},

"AXX": {
    ticker: "AXX",
    name: "Abaxx Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Technology",
    description: "Plataforma de comercio de materias primas y derivados",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
},

"ANF": {
    ticker: "ANF",
    name: "Abercrombie & Fitch Co.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Minorista de ropa e accesorios para jóvenes",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
},

"ABILF": {
    ticker: "ABILF",
    name: "Ability Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Technology",
    description: "Empresa de tecnología y software",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "OTCMKTS"
},

"ABY": {
    ticker: "ABY",
    name: "Abitibi Metals Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empresa de exploración minera de metales",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "OTCPK"
},
  "MRK": {
    ticker: "MRK",
    name: "Merck & Co. Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica global con enfoque en oncología y vacunas",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MRNA": {
  ticker: "MRNA", 
  name: "Moderna Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Empresa de biotecnologia pionera en vacunas y terapias de ARN mensajero para covid, cancer y otras enfermedades", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"BNTX": {
  ticker: "BNTX", 
  name: "BioNTech SE", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Desarrolladora alemana de vacunas y terapias de ARN mensajero con Pfizer para covid y cancer", 
  recommended_for: ["avanzado"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"ALNY": {
  ticker: "ALNY", 
  name: "Alnylam Pharmaceuticals Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Lider en terapias basadas en interferencia de ARN (RNAi) para enfermedades raras y geneticas", 
  recommended_for: ["avanzado"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"EXEL": {
  ticker: "EXEL", 
  name: "Exelixis Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Biofarmaceutica oncologica especializada en descubrimiento de farmacos para cancer con CABOMETYX como producto estrella", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"INCY": {
  ticker: "INCY", 
  name: "Incyte Corporation", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Biofarmaceutica especializada en inhibidores JAK para cancer, inflamacion y enfermedades inmunologicas", 
  recommended_for: ["avanzado"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"REGN": {
  ticker: "REGN", 
  name: "Regeneron Pharmaceuticals Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Biofarmaceutica global con productos como EYLEA para vision y Dupixent para alergias e inflamacion", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"CRSP": {
  ticker: "CRSP", 
  name: "CRISPR Therapeutics AG", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Lider en edicion genetica CRISPR para desarrollar terapias que corrijan enfermedades geneticas", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"ILMN": {
  ticker: "ILMN", 
  name: "Illumina Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Lider mundial en secuenciacion genomica y diagnosticos moleculares para investigacion y clinica", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"VRTX": {
  ticker: "VRTX", 
  name: "Vertex Pharmaceuticals Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Biofarmaceutica enfocada en medicamentos especializados para fibrosis quistica, porfirie y sickle cell", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"BMRN": {
  ticker: "BMRN", 
  name: "BioMarin Pharmaceutical Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Healthcare", 
  description: "Biofarmaceutica especializada en tratamientos para enfermedades geneticas raras y metabolicas", 
  recommended_for: ["avanzado"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
},
  "TMO": {
    ticker: "TMO",
    name: "Thermo Fisher Scientific Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Equipos científicos, instrumentación y servicios de laboratorio",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ABT": {
    ticker: "ABT",
    name: "Abbott Laboratories",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Dispositivos médicos, diagnósticos y productos nutricionales",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DHR": {
    ticker: "DHR",
    name: "Danaher Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Instrumentos científicos, diagnósticos y ciencias de la vida",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PFE": {
    ticker: "PFE",
    name: "Pfizer Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica diversificada, líder en vacunas y medicamentos",
    recommended_for: ["principiante", "intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "BMY": {
    ticker: "BMY",
    name: "Bristol Myers Squibb Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Biofarmacéutica especializada en oncología e inmunología",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AMGN": {
    ticker: "AMGN",
    name: "Amgen Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Biotecnología pionera en terapias biológicas",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "GILD": {
    ticker: "GILD",
    name: "Gilead Sciences Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Biofarmacéutica enfocada en VIH, hepatitis y oncología",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CI": {
    ticker: "CI",
    name: "Cigna Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Seguros de salud y servicios de gestión de beneficios",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CVS": {
    ticker: "CVS",
    name: "CVS Health Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacias retail, seguros de salud y servicios PBM",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ELV": {
    ticker: "ELV",
    name: "Elevance Health Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Seguros de salud (anteriormente Anthem)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ISRG": {
    ticker: "ISRG",
    name: "Intuitive Surgical Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Sistemas robóticos para cirugía mínimamente invasiva (da Vinci)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "HUM": {
    ticker: "HUM",
    name: "Humana Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Seguros de salud enfocados en Medicare",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "BSX": {
    ticker: "BSX",
    name: "Boston Scientific Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Dispositivos médicos cardiovasculares y de intervención",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "TXRH": {
  ticker: "TXRH", 
  name: "Texas Roadhouse Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Cadena casual dining de carnes y steaks cortadas a mano con 736+ restaurantes en USA e internacional con fuerte operacion", 
  recommended_for: ["intermedio"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"MAR": {
  ticker: "MAR", 
  name: "Marriott International Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Mayor cadena hotelera del mundo con 8764 propiedades y 1.6M cuartos en 37 marcas de lujo a budget con Marriott Bonvoy", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"ERIC": {
  ticker: "ERIC", 
  name: "Ericsson AB", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider global infraestructura 5G con equipos radio, transporte, seguridad y servicios para operadores telecomunicaciones", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"PDD": {
  ticker: "PDD", 
  name: "PinDuoDuo Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Tercera plataforma e-commerce China con 343 millones usuarios modelo social compra colectiva y descuentos grupo", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"BIDU": {
  ticker: "BIDU", 
  name: "Baidu Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Communication Services", 
  description: "Google de China con busqueda online publicidad digital IA generativa y plataforma desarrollo aplicaciones Ernie Bot", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"XPEV": {
    ticker: "XPEV",
    name: "XPeng Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Fabricante de vehículos eléctricos inteligentes con enfoque en tecnología autónoma",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "BILI": {
    ticker: "BILI",
    name: "Bilibili Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Plataforma de video compartido y entretenimiento, similar a YouTube para audiencia joven china",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "FUTU": {
    ticker: "FUTU",
    name: "Futu Holdings Limited",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Plataforma de brokeraje y servicios financieros de múltiples mercados",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "NTES": {
    ticker: "NTES",
    name: "NetEase Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Desarrollador y distribuidor de videojuegos, servicios de entretenimiento digital",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "KE": {
    ticker: "KE",
    name: "Ke Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Plataforma inmobiliaria líder en China para compra-venta y alquiler de propiedades",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "LKNCY": {
    ticker: "LKNCY",
    name: "Luckin Coffee Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Cadena de cafeterías china que compite con Starbucks, enfoque en tecnología móvil",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "BABA": {
    ticker: "BABA",
    name: "Alibaba Group Holding Ltd.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Gigante de e-commerce, servicios en la nube (Aliyun) y fintech, una de las mayores empresas chinas",
    recommended_for: ["principiante", "intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },

  "TME": {
    ticker: "TME",
    name: "Tencent Music Entertainment Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Plataforma de streaming de música y entretenimiento digital china, controlada por Tencent",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },

"JD": {
  ticker: "JD", 
  name: "JD.com Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Mayor e-commerce direct-sales China con servicios logistica propios marketplace y fintech avanzado", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"NIO": {
  ticker: "NIO", 
  name: "NIO Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Fabricante vehiculos electricos premium China con baterias intercambiables servicios autonomos y vision smartcar", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"LI": {
  ticker: "LI", 
  name: "Li Auto Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Fabricante vehiculos electricos de energia extendida China con carga rapida autonomia 800+ km y tecnologia EX inteligente", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
},
"TTD": {
  ticker: "TTD", 
  name: "The Trade Desk Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Communication Services", 
  description: "Lider plataforma DSP de compra programatica de publicidad digital con acceso a 2+ billones de impresiones y OpenPath", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"CSCO": {
  ticker: "CSCO", 
  name: "Cisco Systems Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider mundial en equipos networking, seguridad, colaboracion con Webex y soluciones AI para infraestructura", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"WDAY": {
  ticker: "WDAY", 
  name: "Workday Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma cloud empresarial para finanzas HCM planning y analytics con integracion global multientidad", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"SNOW": {
  ticker: "SNOW", 
  name: "Snowflake Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma data cloud AI con almacenamiento escalable computacion elastica y comparticion segura de datos entre empresas", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"PEGA": {
  ticker: "PEGA", 
  name: "Pegasystems Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma low-code para automatizacion de procesos empresariales CRM y decisiones inteligentes con IA", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"ADSK": {
  ticker: "ADSK", 
  name: "Autodesk Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider software diseño 3D construccion y manufacturacion con productos como AutoCAD Revit y Fusion 360", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"DOCU": {
  ticker: "DOCU", 
  name: "DocuSign Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider plataforma firma digital y gestion acuerdos inteligentes con IA para automatizar documentos empresariales", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
"MDB": {
  ticker: "MDB", 
  name: "MongoDB Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Lider base datos NoSQL y plataforma datos con suporte para JSON documentos flexibles y escalabilidad cloud nativa", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
  "MDT": {
    ticker: "MDT",
    name: "Medtronic plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Dispositivos médicos y terapias innovadoras",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SYK": {
    ticker: "SYK",
    name: "Stryker Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Equipos médicos ortopédicos y quirúrgicos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ZTS": {
    ticker: "ZTS",
    name: "Zoetis Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Medicamentos y vacunas para animales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MCK": {
    ticker: "MCK",
    name: "McKesson Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Distribución farmacéutica y servicios de salud",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "COR": {
    ticker: "COR",
    name: "Cencora Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Distribución farmacéutica (anteriormente AmerisourceBergen)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "BIIB": {
    ticker: "BIIB",
    name: "Biogen Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Biotecnología enfocada en neurociencia y Alzheimer",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "IDXX": {
    ticker: "IDXX",
    name: "IDEXX Laboratories Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Diagnósticos veterinarios y software de práctica",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "IQV": {
    ticker: "IQV",
    name: "IQVIA Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Investigación clínica y análisis de datos de salud",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "A": {
    ticker: "A",
    name: "Agilent Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Instrumentos científicos y diagnósticos de laboratorio",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "GEHC": {
    ticker: "GEHC",
    name: "GE HealthCare Technologies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Equipos de imagen médica y diagnóstico",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "EW": {
    ticker: "EW",
    name: "Edwards Lifesciences Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Dispositivos cardiovasculares y válvulas cardíacas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "BAX": {
    ticker: "BAX",
    name: "Baxter International Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Productos médicos para terapias de infusión y cuidados renales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "HCA": {
    ticker: "HCA",
    name: "HCA Healthcare Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Mayor operadora de hospitales de EE.UU.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "DXCM": {
    ticker: "DXCM",
    name: "DexCom Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Sistemas de monitoreo continuo de glucosa para diabetes",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "CAH": {
    ticker: "CAH",
    name: "Cardinal Health Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Distribución farmacéutica y productos médicos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "WAT": {
    ticker: "WAT",
    name: "Waters Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Instrumentos analíticos de laboratorio",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "RMD": {
    ticker: "RMD",
    name: "ResMed Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Dispositivos para apnea del sueño y terapia respiratoria",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MTD": {
    ticker: "MTD",
    name: "Mettler-Toledo International Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Instrumentos de precisión y balanzas de laboratorio",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ALGN": {
    ticker: "ALGN",
    name: "Align Technology Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Alineadores dentales transparentes (Invisalign)",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "HOLX": {
    ticker: "HOLX",
    name: "Hologic Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Diagnósticos y equipos de salud de la mujer",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "STE": {
    ticker: "STE",
    name: "STERIS plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Esterilización y equipos de prevención de infecciones",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "BDX": {
    ticker: "BDX",
    name: "Becton Dickinson and Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Dispositivos médicos, agujas y sistemas de diagnóstico",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "COO": {
    ticker: "COO",
    name: "Cooper Companies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Lentes de contacto y dispositivos de salud de la mujer",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ZBH": {
    ticker: "ZBH",
    name: "Zimmer Biomet Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Implantes ortopédicos y productos musculoesqueléticos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "TFX": {
    ticker: "TFX",
    name: "Teleflex Incorporated",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Dispositivos médicos de un solo uso",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MOH": {
    ticker: "MOH",
    name: "Molina Healthcare Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Seguros de salud gestionados para Medicaid y Medicare",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "UHS": {
    ticker: "UHS",
    name: "Universal Health Services Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Operadora de hospitales y centros de salud conductual",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "DVA": {
    ticker: "DVA",
    name: "DaVita Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Servicios de diálisis renal",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CRL": {
    ticker: "CRL",
    name: "Charles River Laboratories International Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Investigación preclínica y servicios de laboratorio",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "LH": {
    ticker: "LH",
    name: "Labcorp Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Servicios de laboratorio clínico y diagnóstico",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DGX": {
    ticker: "DGX",
    name: "Quest Diagnostics Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Servicios de pruebas de laboratorio y diagnóstico",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "TECH": {
    ticker: "TECH",
    name: "Bio-Techne Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Reactivos y herramientas de investigación en ciencias de la vida",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "PODD": {
    ticker: "PODD",
    name: "Insulet Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Sistemas de administración de insulina sin tubo",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "VTRS": {
    ticker: "VTRS",
    name: "Viatris Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica de medicamentos genéricos y biosimilares",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "HSIC": {
    ticker: "HSIC",
    name: "Henry Schein Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Distribución de productos dentales y médicos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
    // ============================================================
  // SERVICIOS DE COMUNICACIÓN (Communication Services) - 9.6% del S&P 500
  // ============================================================
  
  "GOOGL": {
    ticker: "GOOGL",
    name: "Alphabet Inc. Class A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Motor de búsqueda Google, publicidad digital, YouTube y cloud",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "GOOG": {
    ticker: "GOOG",
    name: "Alphabet Inc. Class C",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Motor de búsqueda Google, publicidad digital, YouTube y cloud",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "META": {
    ticker: "META",
    name: "Meta Platforms Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Redes sociales (Facebook, Instagram, WhatsApp) y realidad virtual",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "NFLX": {
    ticker: "NFLX",
    name: "Netflix Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Plataforma líder de streaming de video y producción de contenido",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "DIS": {
    ticker: "DIS",
    name: "The Walt Disney Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Entretenimiento, parques temáticos, streaming (Disney+) y medios",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CMCSA": {
    ticker: "CMCSA",
    name: "Comcast Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Cable, internet, NBC Universal y streaming (Peacock)",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "T": {
    ticker: "T",
    name: "AT&T Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Telecomunicaciones, internet y servicios móviles",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "VZ": {
    ticker: "VZ",
    name: "Verizon Communications Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Red móvil 5G, internet de fibra óptica y telecomunicaciones",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "TMUS": {
    ticker: "TMUS",
    name: "T-Mobile US Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Operador móvil con red 5G y servicios inalámbricos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CHTR": {
    ticker: "CHTR",
    name: "Charter Communications Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Proveedor de cable, internet de alta velocidad y telefonía",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "EA": {
    ticker: "EA",
    name: "Electronic Arts Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Desarrollador de videojuegos (FIFA, Madden, Battlefield)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "TTWO": {
    ticker: "TTWO",
    name: "Take-Two Interactive Software Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Videojuegos (Grand Theft Auto, NBA 2K, Red Dead Redemption)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "WBD": {
    ticker: "WBD",
    name: "Warner Bros. Discovery Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Contenido audiovisual, streaming (Max/HBO) y canales de TV",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "PARA": {
    ticker: "PARA",
    name: "Paramount Global",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Estudios de cine, TV (CBS) y streaming (Paramount+)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "FOX": {
    ticker: "FOX",
    name: "Fox Corporation Class B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Canales de TV, noticias (Fox News) y deportes",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "AMZN": {
  ticker: "AMZN", 
  name: "Amazon.com Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Liderador global en e-commerce, cloud computing (AWS), advertising y retail", 
  recommended_for: ["principiante", "intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"TSLA": {
  ticker: "TSLA", 
  name: "Tesla Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Fabricante de vehiculos electricos, sistemas de almacenamiento de energia y energia solar", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"SHOP": {
  ticker: "SHOP", 
  name: "Shopify Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma de comercio electronico para emprendedores y pequenas empresas", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"RIVN": {
  ticker: "RIVN", 
  name: "Rivian Automotive Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Cyclical", 
  description: "Fabricante de vehiculos electricos de lujo (SUV, camioneta y furgon de entrega)", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
},
  "FOXA": {
    ticker: "FOXA",
    name: "Fox Corporation Class A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Canales de TV, noticias (Fox News) y deportes",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "MTCH": {
    ticker: "MTCH",
    name: "Match Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Apps de citas online (Tinder, Hinge, Match, OkCupid)",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "NWSA": {
    ticker: "NWSA",
    name: "News Corporation Class A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Medios de comunicación, periódicos y publicación de libros",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "NWS": {
    ticker: "NWS",
    name: "News Corporation Class B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Medios de comunicación, periódicos y publicación de libros",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "OMC": {
    ticker: "OMC",
    name: "Omnicom Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Agencia de publicidad y marketing global",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "IPG": {
    ticker: "IPG",
    name: "Interpublic Group of Companies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Agencia de publicidad, marketing y relaciones públicas",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "TKO": {
    ticker: "TKO",
    name: "TKO Group Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Deportes de entretenimiento (UFC y WWE)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  // ============================================================
  // CONSUMO BÁSICO (Consumer Staples) - 5.9% del S&P 500
  // ============================================================
  
  "WMT": {
    ticker: "WMT",
    name: "Walmart Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Mayor cadena de retail y supermercados del mundo",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PG": {
    ticker: "PG",
    name: "Procter & Gamble Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Productos de consumo y cuidado personal (Tide, Pampers, Gillette)",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "COST": {
    ticker: "COST",
    name: "Costco Wholesale Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Club de compras mayoristas con modelo de membresía",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "KO": {
    ticker: "KO",
    name: "The Coca-Cola Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Líder mundial en bebidas no alcohólicas y refrescos",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PEP": {
    ticker: "PEP",
    name: "PepsiCo Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Bebidas y snacks (Pepsi, Gatorade, Lay's, Doritos)",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "PM": {
    ticker: "PM",
    name: "Philip Morris International Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Productos de tabaco y alternativas sin humo (Marlboro, IQOS)",
    recommended_for: ["conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MO": {
    ticker: "MO",
    name: "Altria Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Productos de tabaco en EE.UU. (Marlboro)",
    recommended_for: ["conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MDLZ": {
    ticker: "MDLZ",
    name: "Mondelez International Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Snacks y dulces (Oreo, Cadbury, Toblerone, Trident)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "CL": {
    ticker: "CL",
    name: "Colgate-Palmolive Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Cuidado bucal, personal y productos del hogar",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "KMB": {
    ticker: "KMB",
    name: "Kimberly-Clark Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Productos de papel (Kleenex, Huggies, Scott)",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "GIS": {
    ticker: "GIS",
    name: "General Mills Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Alimentos empacados (Cheerios, Betty Crocker, Häagen-Dazs)",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "KHC": {
    ticker: "KHC",
    name: "The Kraft Heinz Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Alimentos procesados y condimentos (Kraft, Heinz, Oscar Mayer)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "K": {
    ticker: "K",
    name: "Kellanova",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Cereales y snacks (anteriormente Kellogg's)",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "HSY": {
    ticker: "HSY",
    name: "The Hershey Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Chocolates y dulces (Hershey's, Reese's, Kit Kat)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "STZ": {
    ticker: "STZ",
    name: "Constellation Brands Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Bebidas alcohólicas (Corona, Modelo, vinos)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "TAP": {
    ticker: "TAP",
    name: "Molson Coors Beverage Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Cervezas (Coors, Miller, Blue Moon)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CAG": {
    ticker: "CAG",
    name: "Conagra Brands Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Alimentos empacados (Healthy Choice, Marie Callender's)",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CPB": {
    ticker: "CPB",
    name: "Campbell Soup Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Sopas enlatadas y alimentos preparados",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SJM": {
    ticker: "SJM",
    name: "J.M. Smucker Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Mermeladas, mantequilla de maní y alimentos para mascotas",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "HRL": {
    ticker: "HRL",
    name: "Hormel Foods Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Carnes procesadas y alimentos (Spam, Skippy)",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MKC": {
    ticker: "MKC",
    name: "McCormick & Company Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Especias, condimentos y saborizantes",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CLX": {
    ticker: "CLX",
    name: "Clorox Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Productos de limpieza y desinfección del hogar",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CHD": {
    ticker: "CHD",
    name: "Church & Dwight Co. Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Productos del hogar y cuidado personal (Arm & Hammer)",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "KR": {
    ticker: "KR",
    name: "Kroger Co.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Cadena de supermercados en EE.UU.",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SYY": {
    ticker: "SYY",
    name: "Sysco Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Distribución de alimentos para restaurantes y hoteles",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "KDP": {
    ticker: "KDP",
    name: "Keurig Dr Pepper Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Bebidas (Dr Pepper, 7UP, Snapple, Keurig)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "TSN": {
    ticker: "TSN",
    name: "Tyson Foods Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Mayor productor de carne de EE.UU. (pollo, cerdo, res)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MNST": {
    ticker: "MNST",
    name: "Monster Beverage Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Bebidas energéticas (Monster Energy)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "EL": {
    ticker: "EL",
    name: "Estée Lauder Companies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Cosméticos y productos de belleza de lujo",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  // ============================================================
  // INDUSTRIALES (Industrials) - 8.7% del S&P 500
  // ============================================================
  
  "GE": {
    ticker: "GE",
    name: "General Electric Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Energía, aviación y tecnología industrial",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CAT": {
    ticker: "CAT",
    name: "Caterpillar Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Maquinaria de construcción, minería y equipos pesados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "RTX": {
    ticker: "RTX",
    name: "RTX Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Aeroespacial, defensa y sistemas de misiles (Raytheon)",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "HON": {
    ticker: "HON",
    name: "Honeywell International Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Automatización industrial, aeroespacial y edificios inteligentes",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "UNP": {
    ticker: "UNP",
    name: "Union Pacific Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Ferrocarril de carga en el oeste de EE.UU.",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "BA": {
    ticker: "BA",
    name: "Boeing Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante de aviones comerciales y sistemas de defensa",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "UPS": {
    ticker: "UPS",
    name: "United Parcel Service Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Logística, envíos y cadena de suministro global",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "LMT": {
    ticker: "LMT",
    name: "Lockheed Martin Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Defensa, aeroespacial y tecnología de seguridad avanzada",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DE": {
    ticker: "DE",
    name: "Deere & Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Maquinaria agrícola y equipos de construcción (John Deere)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MMM": {
    ticker: "MMM",
    name: "3M Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Productos industriales, adhesivos y materiales innovadores",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "GD": {
    ticker: "GD",
    name: "General Dynamics Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Defensa, buques militares y jets corporativos (Gulfstream)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "NOC": {
    ticker: "NOC",
    name: "Northrop Grumman Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Aeroespacial, defensa y ciberseguridad",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ETN": {
    ticker: "ETN",
    name: "Eaton Corporation plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Gestión de energía eléctrica e hidráulica",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ITW": {
    ticker: "ITW",
    name: "Illinois Tool Works Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Equipos industriales, soldadura y componentes automotrices",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "EMR": {
    ticker: "EMR",
    name: "Emerson Electric Co.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Automatización industrial y tecnología de procesos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PH": {
    ticker: "PH",
    name: "Parker-Hannifin Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Tecnología de movimiento y control para industrias",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CSX": {
    ticker: "CSX",
    name: "CSX Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Ferrocarril de carga en el este de EE.UU.",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "NSC": {
    ticker: "NSC",
    name: "Norfolk Southern Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Transporte ferroviario de mercancías",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "FDX": {
    ticker: "FDX",
    name: "FedEx Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Envíos express, logística y comercio electrónico",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "WM": {
    ticker: "WM",
    name: "Waste Management Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Gestión de residuos, reciclaje y servicios ambientales",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "RSG": {
    ticker: "RSG",
    name: "Republic Services Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Recolección de residuos y reciclaje",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PCAR": {
    ticker: "PCAR",
    name: "PACCAR Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante de camiones comerciales (Kenworth, Peterbilt)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "ROK": {
    ticker: "ROK",
    name: "Rockwell Automation Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Automatización industrial y software de manufactura",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CARR": {
    ticker: "CARR",
    name: "Carrier Global Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Sistemas HVAC, refrigeración y control de edificios",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "OTIS": {
    ticker: "OTIS",
    name: "Otis Worldwide Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Elevadores, escaleras mecánicas y mantenimiento",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "JCI": {
    ticker: "JCI",
    name: "Johnson Controls International plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Sistemas de edificios inteligentes y HVAC",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "IR": {
    ticker: "IR",
    name: "Ingersoll Rand Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Compresores industriales y equipos de aire",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CPRT": {
    ticker: "CPRT",
    name: "Copart Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Subastas online de vehículos dañados y repuestos",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "FAST": {
    ticker: "FAST",
    name: "Fastenal Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Distribución de suministros industriales y herramientas",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "VRSK": {
    ticker: "VRSK",
    name: "Verisk Analytics Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Análisis de datos y gestión de riesgos",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "PAYX": {
    ticker: "PAYX",
    name: "Paychex Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Procesamiento de nóminas y recursos humanos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "ADP": {
    ticker: "ADP",
    name: "Automatic Data Processing Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Software de nóminas, recursos humanos y outsourcing",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "ODFL": {
    ticker: "ODFL",
    name: "Old Dominion Freight Line Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Transporte de carga por carretera menos que truckload",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CTAS": {
    ticker: "CTAS",
    name: "Cintas Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Uniformes corporativos y suministros de limpieza",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "XYL": {
    ticker: "XYL",
    name: "Xylem Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Tecnología de agua y soluciones de transporte de fluidos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "DOV": {
    ticker: "DOV",
    name: "Dover Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Equipos industriales y bombas especializadas",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "FTV": {
    ticker: "FTV",
    name: "Fortive Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Instrumentación industrial y software empresarial",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "AME": {
    ticker: "AME",
    name: "AMETEK Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Instrumentos electrónicos y motores especializados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "SWK": {
    ticker: "SWK",
    name: "Stanley Black & Decker Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Herramientas eléctricas y manuales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ROL": {
    ticker: "ROL",
    name: "Rollins Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Control de plagas (Orkin)",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "GNRC": {
    ticker: "GNRC",
    name: "Generac Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Generadores de energía de respaldo",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "UAL": {
    ticker: "UAL",
    name: "United Airlines Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Aerolínea comercial internacional",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "DAL": {
    ticker: "DAL",
    name: "Delta Air Lines Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Aerolínea comercial y de carga",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "AAL": {
    ticker: "AAL",
    name: "American Airlines Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Aerolínea comercial",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "LUV": {
    ticker: "LUV",
    name: "Southwest Airlines Co.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Aerolínea de bajo costo",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "ALK": {
    ticker: "ALK",
    name: "Alaska Air Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Aerolínea regional de la costa oeste",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "JBHT": {
    ticker: "JBHT",
    name: "J.B. Hunt Transport Services Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Transporte intermodal y logística",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "CHRW": {
    ticker: "CHRW",
    name: "C.H. Robinson Worldwide Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Logística de terceros y cadena de suministro",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "EBAY": {
  ticker: "EBAY", 
  name: "eBay Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Plataforma de marketplace global con subastas y ventas de items nuevos y usados con 500 millones de usuarios", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"ETSY": {
  ticker: "ETSY", 
  name: "Etsy Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Marketplace para articulos artesanales, vintage y suministros de manualidades con 95 millones de compradores activos", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"DLTR": {
  ticker: "DLTR", 
  name: "Dollar Tree Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Cadena de tiendas de descuento con articulos a bajo precio y treasure-hunt shopping en 9000 locales", 
  recommended_for: ["principiante", "intermedio"], 
  risk: "LOW", 
  exchange: "NASDAQ"
}, 

"ORLY": {
  ticker: "ORLY", 
  name: "O'Reilly Automotive Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Mayor minorista de autopartes con 6400 tiendas en North America para profesionales y clientes DIY", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"URBN": {
  ticker: "URBN", 
  name: "Urban Outfitters Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Portafolio de marcas retail incluyendo Urban Outfitters, Anthropologie, Free People y Nuuly subscription", 
  recommended_for: ["intermedio"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"RUN": {
  ticker: "RUN", 
  name: "Sunrun Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Utilities", 
  description: "Mayor compania de energia solar residencial en USA con mas de 100000 clientes y servicios de alquiler", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"ULTA": {
  ticker: "ULTA", 
  name: "Ulta Beauty Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Mayor minorista de belleza independiente en USA con 1300+ tiendas y plataforma e-commerce", 
  recommended_for: ["intermedio"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"ROST": {
  ticker: "ROST", 
  name: "Ross Stores Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Cadena off-price de ropa y accesorios con 2000+ tiendas en North America con descuentos hasta 60%", 
  recommended_for: ["intermedio"], 
  risk: "LOW", 
  exchange: "NASDAQ"
}, 

"CASY": {
  ticker: "CASY", 
  name: "Casey General Stores Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Cadena de tiendas de conveniencia con gasolina y mercancia diversa en el Midwest rural", 
  recommended_for: ["intermedio"], 
  risk: "LOW", 
  exchange: "NASDAQ"
}, 

"EXPE": {
  ticker: "EXPE", 
  name: "Expedia Group Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Plataforma global de viajes con hoteles, vuelos, alquiler de autos y experiencias en 180+ paises", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
  "EXPD": {
    ticker: "EXPD",
    name: "Expeditors International of Washington Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Logística global y transporte de carga",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  // ============================================================
  // ENERGÍA (Energy) - 3% del S&P 500
  // ============================================================
  
  "XOM": {
    ticker: "XOM",
    name: "Exxon Mobil Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Mayor empresa petrolera integrada del mundo",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CVX": {
    ticker: "CVX",
    name: "Chevron Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Petróleo, gas natural y energía integrada global",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "COP": {
    ticker: "COP",
    name: "ConocoPhillips",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Exploración y producción de petróleo y gas",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "SLB": {
    ticker: "SLB",
    name: "Schlumberger N.V.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Servicios y tecnología para campos petroleros (Schlumberger)",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "EOG": {
    ticker: "EOG",
    name: "EOG Resources Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Exploración y producción de petróleo y gas de esquisto",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MPC": {
    ticker: "MPC",
    name: "Marathon Petroleum Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Refinación de petróleo y comercialización",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "PSX": {
    ticker: "PSX",
    name: "Phillips 66",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Refinación, petroquímicos y gasolineras",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "VLO": {
    ticker: "VLO",
    name: "Valero Energy Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Refinación de petróleo y combustibles renovables",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "OXY": {
    ticker: "OXY",
    name: "Occidental Petroleum Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Exploración, producción de petróleo y químicos",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "WMB": {
    ticker: "WMB",
    name: "Williams Companies Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Infraestructura de gas natural y oleoductos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "KMI": {
    ticker: "KMI",
    name: "Kinder Morgan Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Infraestructura de oleoductos y gas natural",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "HAL": {
    ticker: "HAL",
    name: "Halliburton Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Servicios de perforación y campos petroleros",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "BKR": {
    ticker: "BKR",
    name: "Baker Hughes Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Servicios y equipos para campos petroleros",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "HES": {
    ticker: "HES",
    name: "Hess Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Exploración y producción de petróleo",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "DVN": {
    ticker: "DVN",
    name: "Devon Energy Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Producción de petróleo y gas natural",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "FANG": {
    ticker: "FANG",
    name: "Diamondback Energy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Exploración y producción en la cuenca Pérmica",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "APA": {
    ticker: "APA",
    name: "APA Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Exploración y producción de petróleo y gas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "SOFI": {
  ticker: "SOFI", 
  name: "SoFi Technologies Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Plataforma fintech de banca digital con prestamos, hipotecas, tarjetas de credito, inversiones y seguros", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"IBKR": {
  ticker: "IBKR", 
  name: "Interactive Brokers Group Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Plataforma de trading global para acciones, opciones, futuros, divisas y criptomonedas en 160 mercados", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"AFRM": {
  ticker: "AFRM", 
  name: "Affirm Holdings Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Lider en fintech BNPL (Buy Now Pay Later) con pagos sin interes y flexible en retail, hogar y salud", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"MELI": {
  ticker: "MELI", 
  name: "MercadoLibre Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Amazon de Latinoamerica con marketplace e-commerce, pagos digitales y fintech en 18 paises", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"MSTR": {
  ticker: "MSTR", 
  name: "MicroStrategy Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Software de business intelligence y analisis de datos para decisiones empresariales con IA", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 

"DKNG": {
  ticker: "DKNG", 
  name: "DraftKings Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Consumer Discretionary", 
  description: "Plataforma de apuestas deportivas online y juegos de fantasia diaria operando en multiples paises", 
  recommended_for: ["avanzado", "agresivo"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 

"TPG": {
  ticker: "TPG", 
  name: "TPG Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Firma global de capital privado y gestion de inversiones con mas de $230 mil millones en activos", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"BZ": {
  ticker: "BZ", 
  name: "BZ Gara BZ SE", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Mercado de energia y materias primas con operaciones en transporte y suministros", 
  recommended_for: ["avanzado"], 
  risk: "HIGH", 
  exchange: "NASDAQ"
}, 
"DBX": {
  ticker: "DBX", 
  name: "Dropbox Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Information Technology", 
  description: "Plataforma de almacenamiento en la nube y colaboracion de archivos con IA integrada", 
  recommended_for: ["intermedio", "avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
}, 
"XP": {
  ticker: "XP", 
  name: "XP Inc.", 
  type: "STOCK", 
  category: "RENTA_VARIABLE", 
  sector: "Financials", 
  description: "Plataforma de servicios financieros e inversiones brasilena con ecosistema integrado", 
  recommended_for: ["avanzado"], 
  risk: "MEDIUM", 
  exchange: "NASDAQ"
},
  "CTRA": {
    ticker: "CTRA",
    name: "Coterra Energy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Exploración y producción de gas natural",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "EQT": {
    ticker: "EQT",
    name: "EQT Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Mayor productor de gas natural de EE.UU.",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "TPL": {
    ticker: "TPL",
    name: "Texas Pacific Land Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Royalties de petróleo y gas en Texas",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "OKE": {
    ticker: "OKE",
    name: "ONEOK Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Infraestructura midstream de gas natural y líquidos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "TRGP": {
    ticker: "TRGP",
    name: "Targa Resources Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Infraestructura midstream de gas natural",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  // ============================================================
  // MATERIALES (Materials) - 1.9% del S&P 500
  // ============================================================
  
  "LIN": {
    ticker: "LIN",
    name: "Linde plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Gases industriales y de ingeniería",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "APD": {
    ticker: "APD",
    name: "Air Products and Chemicals Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Gases industriales y químicos especiales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SHW": {
    ticker: "SHW",
    name: "Sherwin-Williams Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Pinturas, recubrimientos y productos para construcción",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "FCX": {
    ticker: "FCX",
    name: "Freeport-McMoRan Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Minería de cobre, oro y molibdeno",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "NEM": {
    ticker: "NEM",
    name: "Newmont Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Mayor productor de oro del mundo",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ECL": {
    ticker: "ECL",
    name: "Ecolab Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Productos de limpieza, saneamiento y agua",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DD": {
    ticker: "DD",
    name: "DuPont de Nemours Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Materiales especiales, electrónica y construcción",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "DOW": {
    ticker: "DOW",
    name: "Dow Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Químicos, plásticos y materiales avanzados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "PPG": {
    ticker: "PPG",
    name: "PPG Industries Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Pinturas, recubrimientos y materiales especiales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "NUE": {
    ticker: "NUE",
    name: "Nucor Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Mayor productor de acero de EE.UU.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CTVA": {
    ticker: "CTVA",
    name: "Corteva Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Semillas, protección de cultivos y agricultura",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ALB": {
    ticker: "ALB",
    name: "Albemarle Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Litio, bromo y químicos especiales para baterías",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NYSE"
  },
  "VMC": {
    ticker: "VMC",
    name: "Vulcan Materials Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Agregados, asfalto y concreto para construcción",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MLM": {
    ticker: "MLM",
    name: "Martin Marietta Materials Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Agregados de construcción y materiales pesados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "BALL": {
    ticker: "BALL",
    name: "Ball Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Envases de aluminio y empaques sostenibles",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "AVY": {
    ticker: "AVY",
    name: "Avery Dennison Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Etiquetas, adhesivos y materiales de embalaje",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CE": {
    ticker: "CE",
    name: "Celanese Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Químicos especiales y materiales de ingeniería",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "EMN": {
    ticker: "EMN",
    name: "Eastman Chemical Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Químicos especiales y materiales avanzados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "IFF": {
    ticker: "IFF",
    name: "International Flavors & Fragrances Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Fragancias, sabores y ingredientes",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "PKG": {
    ticker: "PKG",
    name: "Packaging Corporation of America",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Contenedores de cartón corrugado y embalaje",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "AMCR": {
    ticker: "AMCR",
    name: "Amcor plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empaques flexibles y rígidos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "MOS": {
    ticker: "MOS",
    name: "Mosaic Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Fertilizantes de fosfato y potasio",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "CF": {
    ticker: "CF",
    name: "CF Industries Holdings Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Fertilizantes nitrogenados y productos agrícolas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "FMC": {
    ticker: "FMC",
    name: "FMC Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Químicos agrícolas y protección de cultivos",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "SW": {
    ticker: "SW",
    name: "Smurfit WestRock plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empaques de papel y cartón corrugado",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  // ============================================================
  // BIENES RAÍCES (Real Estate) - 2.1% del S&P 500
  // ============================================================
  
  "PLD": {
    ticker: "PLD",
    name: "Prologis Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT líder en centros logísticos y almacenes industriales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AMT": {
    ticker: "AMT",
    name: "American Tower Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Torres de telecomunicaciones e infraestructura inalámbrica",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CCI": {
    ticker: "CCI",
    name: "Crown Castle Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Infraestructura de torres de telecomunicaciones y fibra",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "EQIX": {
    ticker: "EQIX",
    name: "Equinix Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Centros de datos y colocation global",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "PSA": {
    ticker: "PSA",
    name: "Public Storage",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de almacenamiento self-storage",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "WELL": {
    ticker: "WELL",
    name: "Welltower Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de propiedades de salud y cuidado de personas mayores",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DLR": {
    ticker: "DLR",
    name: "Digital Realty Trust Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de centros de datos globales",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "SPG": {
    ticker: "SPG",
    name: "Simon Property Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de centros comerciales premium",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "O": {
    ticker: "O",
    name: "Realty Income Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de propiedades comerciales con dividendos mensuales",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "VICI": {
    ticker: "VICI",
    name: "VICI Properties Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de propiedades de casinos y entretenimiento",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "SBAC": {
    ticker: "SBAC",
    name: "SBA Communications Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Torres de telecomunicaciones inalámbricas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "EXR": {
    ticker: "EXR",
    name: "Extra Space Storage Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de instalaciones de almacenamiento self-storage",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AVB": {
    ticker: "AVB",
    name: "AvalonBay Communities Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de apartamentos residenciales en mercados costeros",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "EQR": {
    ticker: "EQR",
    name: "Equity Residential",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de apartamentos multifamiliares",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "WY": {
    ticker: "WY",
    name: "Weyerhaeuser Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de madera y productos forestales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "INVH": {
    ticker: "INVH",
    name: "Invitation Homes Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de casas unifamiliares en renta",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "VTR": {
    ticker: "VTR",
    name: "Ventas Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de propiedades de atención médica",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ARE": {
    ticker: "ARE",
    name: "Alexandria Real Estate Equities Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de laboratorios y espacios de ciencias de la vida",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "MAA": {
    ticker: "MAA",
    name: "Mid-America Apartment Communities Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de apartamentos en el sureste de EE.UU.",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ESS": {
    ticker: "ESS",
    name: "Essex Property Trust Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de apartamentos en la costa oeste",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "KIM": {
    ticker: "KIM",
    name: "Kimco Realty Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de centros comerciales open-air",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "DOC": {
    ticker: "DOC",
    name: "Physicians Realty Trust",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de edificios médicos ambulatorios",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "UDR": {
    ticker: "UDR",
    name: "UDR Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de apartamentos multifamiliares",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "HST": {
    ticker: "HST",
    name: "Host Hotels & Resorts Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de hoteles de lujo y upper-upscale",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "REG": {
    ticker: "REG",
    name: "Regency Centers Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de centros comerciales de compras",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "BXP": {
    ticker: "BXP",
    name: "Boston Properties Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de oficinas premium en mercados gateway",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "FRT": {
    ticker: "FRT",
    name: "Federal Realty Investment Trust",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de retail premium y uso mixto",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CPT": {
    ticker: "CPT",
    name: "Camden Property Trust",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "REIT de apartamentos multifamiliares",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  // ============================================================
  // SERVICIOS PÚBLICOS (Utilities) - 2.5% del S&P 500
  // ============================================================
  
  "NEE": {
    ticker: "NEE",
    name: "NextEra Energy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad, energía renovable eólica y solar",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "SO": {
    ticker: "SO",
    name: "Southern Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Servicios eléctricos en el sureste de EE.UU.",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DUK": {
    ticker: "DUK",
    name: "Duke Energy Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural regulado",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "D": {
    ticker: "D",
    name: "Dominion Energy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural en la costa este",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AEP": {
    ticker: "AEP",
    name: "American Electric Power Company Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad en 11 estados de EE.UU.",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "EXC": {
    ticker: "EXC",
    name: "Exelon Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Distribución eléctrica y gas en múltiples estados",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "SRE": {
    ticker: "SRE",
    name: "Sempra Energy",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Gas natural y electricidad en California y Texas",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "XEL": {
    ticker: "XEL",
    name: "Xcel Energy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural en 8 estados del medio oeste",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "PEG": {
    ticker: "PEG",
    name: "Public Service Enterprise Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas en Nueva Jersey",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ED": {
    ticker: "ED",
    name: "Consolidated Edison Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad, gas y vapor en Nueva York",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "EIX": {
    ticker: "EIX",
    name: "Edison International",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad en el sur de California",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "WEC": {
    ticker: "WEC",
    name: "WEC Energy Group Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural en Wisconsin y Michigan",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AWK": {
    ticker: "AWK",
    name: "American Water Works Company Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Mayor proveedor de agua regulada de EE.UU.",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "DTE": {
    ticker: "DTE",
    name: "DTE Energy Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural en Michigan",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "ES": {
    ticker: "ES",
    name: "Eversource Energy",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad, gas natural y agua en Nueva Inglaterra",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "FE": {
    ticker: "FE",
    name: "FirstEnergy Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad en Ohio, Pennsylvania y otros estados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "ETR": {
    ticker: "ETR",
    name: "Entergy Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad en el sur de EE.UU.",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PPL": {
    ticker: "PPL",
    name: "PPL Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad en Pennsylvania y Kentucky",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AEE": {
    ticker: "AEE",
    name: "Ameren Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural en Missouri e Illinois",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CMS": {
    ticker: "CMS",
    name: "CMS Energy Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural en Michigan",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "CNP": {
    ticker: "CNP",
    name: "CenterPoint Energy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas natural en Texas y otros estados",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "NI": {
    ticker: "NI",
    name: "NiSource Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Gas natural y electricidad en el medio oeste",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "LNT": {
    ticker: "LNT",
    name: "Alliant Energy Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad y gas en Wisconsin e Iowa",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NASDAQ"
  },
  "ATO": {
    ticker: "ATO",
    name: "Atmos Energy Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Distribución de gas natural regulado",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "PNW": {
    ticker: "PNW",
    name: "Pinnacle West Capital Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad en Arizona",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "NYSE"
  },
  "AES": {
    ticker: "AES",
    name: "AES Corporation",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Generación de energía y renovables globales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "NRG": {
    ticker: "NRG",
    name: "NRG Energy Inc.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Generación de electricidad y servicios de energía",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  "VST": {
    ticker: "VST",
    name: "Vistra Corp.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Generación y venta de electricidad en Texas",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NYSE"
  },
  // ============================================================
  // EMPRESAS ESPAÑOLAS - IBEX 35 Y MERCADO CONTINUO
  // ============================================================
  
  // === IBEX 35 - ÍNDICE PRINCIPAL (35 EMPRESAS) ===
  
  "ITX": {
    ticker: "ITX",
    name: "Inditex",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Grupo textil líder mundial (Zara, Pull&Bear, Massimo Dutti, Bershka)",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "IBE": {
    ticker: "IBE",
    name: "Iberdrola",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Electricidad, energías renovables y servicios energéticos",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "BME"
  },
  "SAN": {
    ticker: "SAN",
    name: "Banco Santander",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco global con presencia en Europa y Latinoamérica",
    recommended_for: ["principiante", "intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "BBVA": {
    ticker: "BBVA",
    name: "Banco Bilbao Vizcaya Argentaria",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca retail y servicios financieros internacionales",
    recommended_for: ["principiante", "intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "TEF": {
    ticker: "TEF",
    name: "Telefónica",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Telecomunicaciones, internet y servicios digitales",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "BME"
  },
  "REP": {
    ticker: "REP",
    name: "Repsol",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Petróleo, gas natural, refino y energías renovables",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "CABK": {
    ticker: "CABK",
    name: "CaixaBank",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca retail líder en España",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "BME"
  },
  "ELE": {
    ticker: "ELE",
    name: "Endesa",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Generación y distribución eléctrica",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "BME"
  },
  "AMS": {
    ticker: "AMS",
    name: "Amadeus IT Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Soluciones tecnológicas para el sector de viajes",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "CLNX": {
    ticker: "CLNX",
    name: "Cellnex Telecom",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Infraestructura de torres de telecomunicaciones",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "ANA": {
    ticker: "ANA",
    name: "Acciona",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Infraestructuras, energías renovables y servicios",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "ANE": {
    ticker: "ANE",
    name: "Acciona Energía",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Energías renovables (eólica, solar e hidroeléctrica)",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "FER": {
    ticker: "FER",
    name: "Ferrovial",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Infraestructuras, autopistas y construcción",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "ACS": {
    ticker: "ACS",
    name: "ACS - Actividades de Construcción y Servicios",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Construcción e infraestructuras globales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "AENA": {
    ticker: "AENA",
    name: "Aena",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Gestión de aeropuertos en España y el mundo",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "BME"
  },
  "NTGY": {
    ticker: "NTGY",
    name: "Naturgy Energy Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Gas natural, electricidad y servicios energéticos",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "BME"
  },
  "GRF": {
    ticker: "GRF",
    name: "Grifols",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Hemoderivados, diagnóstico y biofarmacéutica",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "BME"
  },
  "IAG": {
    ticker: "IAG",
    name: "International Airlines Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Holding de aerolíneas (Iberia, British Airways, Vueling)",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "BME"
  },
  "SAB": {
    ticker: "SAB",
    name: "Banco Sabadell",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca comercial y servicios financieros",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "BKT": {
    ticker: "BKT",
    name: "Bankinter",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca privada y servicios de inversión",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "BME"
  },
  "UNI": {
    ticker: "UNI",
    name: "Unicaja Banco",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banca retail en Andalucía y resto de España",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "MAP": {
    ticker: "MAP",
    name: "Mapfre",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Seguros generales, de vida y reaseguros",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "BME"
  },
  "ACX": {
    ticker: "ACX",
    name: "Acerinox",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Acero inoxidable y aleaciones especiales",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "MTS": {
    ticker: "MTS",
    name: "ArcelorMittal",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Siderurgia y producción de acero",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "BME"
  },
  "IDR": {
    ticker: "IDR",
    name: "Indra Sistemas",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Tecnología, defensa y consultoría IT",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "REE": {
    ticker: "REE",
    name: "Red Eléctrica (Redeia)",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Operador del sistema eléctrico y telecomunicaciones",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "BME"
  },
  "ENG": {
    ticker: "ENG",
    name: "Enagás",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Transporte y almacenamiento de gas natural",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "BME"
  },
  "FDR": {
    ticker: "FDR",
    name: "Fluidra",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Equipos y productos para piscinas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "COL": {
    ticker: "COL",
    name: "Inmobiliaria Colonial",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "SOCIMI de oficinas prime en Madrid, Barcelona y París",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "MRL": {
    ticker: "MRL",
    name: "Merlin Properties",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "SOCIMI de oficinas, centros comerciales y logística",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "LOG": {
    ticker: "LOG",
    name: "Logista",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Distribución y logística de productos de conveniencia",
    recommended_for: ["conservador", "principiante"],
    risk: "LOW",
    exchange: "BME"
  },
  "SCYR": {
    ticker: "SCYR",
    name: "Sacyr",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Construcción, concesiones y servicios",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "BME"
  },
  "ROVI": {
    ticker: "ROVI",
    name: "Laboratorios Farmacéuticos Rovi",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica especializada en inyectables",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "SLR": {
    ticker: "SLR",
    name: "Solaria Energía y Medio Ambiente",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Energía solar fotovoltaica",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "BME"
  },
  "PUIG": {
    ticker: "PUIG",
    name: "Puig Brands",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Perfumes y cosméticos de lujo (Carolina Herrera, Paco Rabanne)",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  
  // === MERCADO CONTINUO - OTRAS EMPRESAS RELEVANTES ===
  
  "ALM": {
    ticker: "ALM",
    name: "Almirall",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica especializada en dermatología",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "VIS": {
    ticker: "VIS",
    name: "Viscofan",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Envolturas artificiales para productos cárnicos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "BME"
  },
  "EBRO": {
    ticker: "EBRO",
    name: "Ebro Foods",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Arroz, pasta y alimentación (marca SOS, Panzani)",
    recommended_for: ["principiante", "conservador"],
    risk: "LOW",
    exchange: "BME"
  },
  "VID": {
    ticker: "VID",
    name: "Vidrala",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Envases de vidrio para alimentación y bebidas",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "BME"
  },
  "CAF": {
    ticker: "CAF",
    name: "CAF (Construcciones y Auxiliar de Ferrocarriles)",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricación de trenes y material ferroviario",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "TRE": {
    ticker: "TRE",
    name: "Técnicas Reunidas",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Ingeniería y construcción de plantas industriales",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "BME"
  },
  "PHM": {
    ticker: "PHM",
    name: "Pharma Mar",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Biotecnología oncológica de origen marino",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "BME"
  },
  "NHH": {
    ticker: "NHH",
    name: "NH Hotel Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Cadena hotelera europea",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "MEL": {
    ticker: "MEL",
    name: "Meliá Hotels International",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Cadena hotelera vacacional",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "ENC": {
    ticker: "ENC",
    name: "Ence Energía y Celulosa",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Celulosa, biomasa y energía renovable",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "BME"
  },
  "NHOA": {
    ticker: "NHOA",
    name: "NHOA (Engie EPS)",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Almacenamiento de energía y movilidad eléctrica",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "BME"
  },
  "ACS": {
    ticker: "ACS",
    name: "ACS",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Construcción e infraestructuras globales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "FCC": {
    ticker: "FCC",
    name: "Fomento de Construcciones y Contratas",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Construcción, servicios medioambientales y agua",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "OHL": {
    ticker: "OHL",
    name: "OHL (Obrascón Huarte Lain)",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Construcción y concesiones",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    exchange: "BME"
  },
  "ATRESMEDIA": {
    ticker: "A3M",
    name: "Atresmedia Corporación",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Televisión, radio y producción audiovisual (Antena 3, laSexta)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "MEDIASET": {
    ticker: "TL5",
    name: "Mediaset España Comunicación",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Televisión y contenidos digitales (Telecinco, Cuatro)",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "BME": {
    ticker: "BME",
    name: "Bolsas y Mercados Españoles",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Operador de bolsas y mercados financieros (propiedad de SIX)",
    recommended_for: ["avanzado"],
    risk: "LOW",
    exchange: "BME"
  },
  "APPLUS": {
    ticker: "APPS",
    name: "Applus Services",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Inspección, ensayos y certificación técnica",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "CIE": {
    ticker: "CIE",
    name: "CIE Automotive",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Componentes y subconjuntos para automoción",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "TALGO": {
    ticker: "TLGO",
    name: "Talgo",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricación de trenes de alta velocidad",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "BME"
  },
  "ACCOR": {
    ticker: "AC.PA",
    name: "Accor",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Cadenas hoteleras y servicios turísticos internacionales.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "AIR_LIQUIDE": {
    ticker: "AI.PA",
    name: "Air Liquide",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Líder mundial en gases industriales y médicos, hidrógeno y tecnologías limpias.",
    recommended_for: ["intermedio", "conservador"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "AIRBUS": {
    ticker: "AIR.PA",
    name: "Airbus Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante global de aviones comerciales, helicópteros y defensa.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "ARCELOR_MITTAL": {
    ticker: "MT.PA",
    name: "ArcelorMittal",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Mayor productor de acero con presencia global, líder en sostenibilidad industrial.",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "EURONEXT"
  },
  "AXA": {
    ticker: "CS.PA",
    name: "AXA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Aseguradora multinacional, seguros de vida, salud y gestión de activos.",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "BNP_PARIBAS": {
    ticker: "BNP.PA",
    name: "BNP Paribas",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco universal líder en Europa con servicios de inversión y financiación.",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "BOUYGUES": {
    ticker: "EN.PA",
    name: "Bouygues",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Conglomerado industrial: construcción, medios, telecom, energía y movilidad.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "CAPGEMINI": {
    ticker: "CAP.PA",
    name: "Capgemini",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Servicios y consultoría tecnológica global, transformación digital y cloud.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "CARREFOUR": {
    ticker: "CA.PA",
    name: "Carrefour",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Supermercados e hipermercados internacionales, líder retail en Europa.",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "CREDIT_AGRICOLE": {
    ticker: "ACA.PA",
    name: "Crédit Agricole",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco cooperativo multinacional, líder en banca rural y financiación agrícola.",
    recommended_for: ["principiante"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "DANONE": {
    ticker: "BN.PA",
    name: "Danone",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Líder global en productos lácteos, agua embotellada y nutrición especializada.",
    recommended_for: ["conservador", "intermedio"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "DASSAULT_SYSTEMES": {
    ticker: "DSY.PA",
    name: "Dassault Systèmes",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Plataformas de software 3D, digitalización y simulación industrial.",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "EDENRED": {
    ticker: "EDEN.PA",
    name: "Edenred",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Servicios de pagos y beneficios laborales, tarjetas y sistemas digitales.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "ENGIE": {
    ticker: "ENGI.PA",
    name: "Engie",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Generación y distribución de energía, servicios renovables y gas natural.",
    recommended_for: ["intermedio", "conservador"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "ESSILOR_LUXOTTICA": {
    ticker: "EL.PA",
    name: "EssilorLuxottica",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Líder mundial en lentes oftálmicas, gafas y tecnología óptica.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "EUROFINS": {
    ticker: "ERF.PA",
    name: "Eurofins Scientific",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Servicios globales de análisis bioanalíticos, farmacéutica, alimentos y medio ambiente.",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "EURONEXT"
  },
  "MICHELIN": {
    ticker: "ML.PA",
    name: "Michelin",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Principal fabricante mundial de neumáticos, movilidad sostenible y soluciones para flotas.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "LOREAL": {
    ticker: "OR.PA",
    name: "L'Oréal",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Multinacional líder en cosmética, belleza y dermocosmética.",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "LEGRAND": {
    ticker: "LR.PA",
    name: "Legrand",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Soluciones eléctricas, automatización del hogar e infraestructura digital.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "LVMH": {
    ticker: "MC.PA",
    name: "LVMH Moët Hennessy Louis Vuitton",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Conglomerado de lujo más grande del mundo: moda, joyas, relojes, perfumes y vinos.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "HERMES": {
    ticker: "RMS.PA",
    name: "Hermès International",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Casa de lujo francesa especializada en bolsos, accesorios y prendas de vestir.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "KERING": {
    ticker: "KER.PA",
    name: "Kering",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Grupo de lujo propietario de Gucci, Saint Laurent, Bottega Veneta y otras marcas.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "ORANGE": {
    ticker: "ORAN.PA",
    name: "Orange",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Telecommunications",
    description: "Operador de telecomunicaciones líder en Francia, Europa e internacionalmente.",
    recommended_for: ["conservador", "intermedio"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "PUBLICIS": {
    ticker: "PUB.PA",
    name: "Publicis Groupe",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Grupo mundial de publicidad, marketing, comunicación y servicios tecnológicos.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "PERNOD_RICARD": {
    ticker: "RI.PA",
    name: "Pernod Ricard",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Grupo líder mundial en bebidas alcohólicas, propietario de marcas como Absolut y Jameson.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "RENAULT": {
    ticker: "RNO.PA",
    name: "Renault",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Fabricante francesa de automóviles, vehículos comerciales y movilidad eléctrica.",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "EURONEXT"
  },
  "SAFRAN": {
    ticker: "SAF.PA",
    name: "Safran",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa de defensa y aeroespacial especializada en motores de aviación y sistemas de seguridad.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "SANOFI": {
    ticker: "SAN.PA",
    name: "Sanofi",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Compañía farmacéutica francesa especializada en medicamentos, vacunas y productos de salud.",
    recommended_for: ["conservador", "intermedio"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "SCHNEIDER_ELECTRIC": {
    ticker: "SU.PA",
    name: "Schneider Electric",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Líder global en gestión de energía y automatización industrial, soluciones digitales.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "SOCIETE_GENERALE": {
    ticker: "GLE.PA",
    name: "Société Générale",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco universal con servicios de inversión, banca comercial y gestión de patrimonios.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "STELLANTIS": {
    ticker: "STLA.PA",
    name: "Stellantis NV",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Empresa automovilística multinacional, resultado de fusión Fiat-Chrysler-PSA.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "STMICROELECTRONICS": {
    ticker: "STM.PA",
    name: "STMicroelectronics",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Fabricante de semiconductores, microcontroladores y dispositivos para industria y automotriz.",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "EURONEXT"
  },
  "TELEPERFORMANCE": {
    ticker: "TEP.PA",
    name: "Teleperformance",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa de servicios de externalización, contact centers y servicios digitales.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "THALES": {
    ticker: "HO.PA",
    name: "Thales",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa de defensa y aeroespacial especializada en sistemas de defensa y ciberseguridad.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "TOTAL_ENERGIES": {
    ticker: "TTE.PA",
    name: "TotalEnergies",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Empresa de energía global, petróleo, gas, energías renovables y transición energética.",
    recommended_for: ["conservador", "intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "UNIBAIL": {
    ticker: "URW.PA",
    name: "Unibail-Rodamco-Westfield",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Desarrollador y operador de centros comerciales y espacios de entretenimiento.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "VEOLIA": {
    ticker: "VIE.PA",
    name: "Veolia Environnement",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Empresa global de gestión ambiental, agua, residuos y energía, economía circular.",
    recommended_for: ["intermedio", "conservador"],
    risk: "LOW",
    exchange: "EURONEXT"
  },
  "VINCI": {
    ticker: "DG.PA",
    name: "Vinci",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Grupo de construcción, infraestructuras y concesiones, autopistas y aeropuertos.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "VIVENDI": {
    ticker: "VIV.PA",
    name: "Vivendi",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Grupo francés de medios, entretenimiento, educación y contenidos digitales.",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "WORLDLINE": {
    ticker: "WLN.PA",
    name: "Worldline",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Empresa líder en soluciones de pagos digitales, servicios financieros y tecnología.",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "EURONEXT"
  },
  "SAP": {
    ticker: "SAP",
    name: "SAP SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Líder global en software empresarial, soluciones ERP y cloud computing",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "SIE": {
    ticker: "SIE",
    name: "Siemens AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Conglomerado industrial alemán con electrificación, automatización y digitalización",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "LIN": {
    ticker: "LIN",
    name: "Linde plc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Gases especiales, ingeniería química e hidrógeno verde para industrias",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "DTE": {
    ticker: "DTE",
    name: "Deutsche Telekom AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Telecommunication Services",
    description: "Operador de telecomunicaciones alemán con redes móviles y fijas en toda Europa",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "ALV": {
    ticker: "ALV",
    name: "Allianz SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Mayor aseguradora y gestor de activos europeo con presencia global",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "ENR": {
    ticker: "ENR",
    name: "Siemens Energy AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Energías renovables, transformadores y soluciones de potencia global",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "MUV2": {
    ticker: "MUV2",
    name: "Munich Re",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Líder mundial en reaseguros y soluciones de riesgos para el sector asegurador",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "DBK": {
    ticker: "DBK",
    name: "Deutsche Bank AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Mayor banco de inversión alemán con servicios financieros globales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "SHL": {
    ticker: "SHL",
    name: "Siemens Healthineers AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Equipos médicos, diagnóstico por imagen y soluciones de salud digital",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "MBG": {
    ticker: "MBG",
    name: "Mercedes-Benz Group AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante de vehículos de lujo y automóviles premium con larga tradición",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "MRK": {
    ticker: "MRK",
    name: "Merck KGaA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica y química con soluciones de salud, lab y ciencias de la vida",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "BMW": {
    ticker: "BMW",
    name: "BMW AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante de automóviles premium con innovación en electromovilidad",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "VOW3": {
    ticker: "VOW3",
    name: "Volkswagen AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Conglomerado automovilístico alemán con múltiples marcas globales",
    recommended_for: ["intermedio"],
    risk: "HIGH",
    exchange: "XETRA"
  },

  "DHL": {
    ticker: "DHL",
    name: "Deutsche Post AG (DHL Group)",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa de logística y servicios postales con red global de entregas",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "IFX": {
    ticker: "IFX",
    name: "Infineon Technologies AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Fabricante de semiconductores para automoción, IoT e industria 4.0",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "EOAN": {
    ticker: "EOAN",
    name: "E.ON SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Utilidad energética europea con electricidad, gas y servicios de energía",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "DB1": {
    ticker: "DB1",
    name: "Deutsche Börse AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Operadora de bolsas de valores y proveedora de servicios de mercado de capitales",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "BAS": {
    ticker: "BAS",
    name: "BASF SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empresa química líder mundial en productos y soluciones para múltiples industrias",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "HEI": {
    ticker: "HEI",
    name: "Heidelberg Materials AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Cementos, áridos y soluciones para construcción sostenible",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "ADS": {
    ticker: "ADS",
    name: "adidas AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante de ropa deportiva, calzado y accesorios con presencia global",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "RWE": {
    ticker: "RWE",
    name: "RWE AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Productor de energía renovable, nuclear y convencional en Alemania",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "HEN": {
    ticker: "HEN",
    name: "Henkel AG & Co. KGaA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empresa de química especializada en adhesivos, selladores y productos de limpieza",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "BAYN": {
    ticker: "BAYN",
    name: "Bayer AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica y química especializada en agroquímicos y soluciones de salud",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "FRE": {
    ticker: "FRE",
    name: "Fresenius SE & Co. KGaA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Servicios de salud, diálisis y cuidados hospitalarios con presencia global",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "VNA": {
    ticker: "VNA",
    name: "Vonovia SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Mayor empresa de viviendas residenciales en Alemania con portafolio inmobiliario",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "BEI": {
    ticker: "BEI",
    name: "Beiersdorf AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Cuidado personal y marcas de belleza incluyendo Eucerin y Nivea",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "MTX": {
    ticker: "MTX",
    name: "MTU Aero Engines AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Aerospace & Defense",
    description: "Fabricante de motores aeronáuticos para aviación civil y defensa",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "RHM": {
    ticker: "RHM",
    name: "Rheinmetall AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Aerospace & Defense",
    description: "Defensa, automoción y tecnología con componentes de munición",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "FMS": {
    ticker: "FMS",
    name: "Fresenius Medical Care AG & Co. KGaA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Proveedor líder de servicios de diálisis y atención de la salud",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "SRT": {
    ticker: "SRT",
    name: "Sartorius AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Equipos de laboratorio y biofarmacéutica con soluciones de bioproducción",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "CON": {
    ticker: "CON",
    name: "Continental AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante de neumáticos y componentes automotrices con I+D en movilidad",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "SY1": {
    ticker: "SY1",
    name: "Symrise AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Química especializada en aromas, fragancias y nutrientes para industria",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "1COV": {
    ticker: "1COV",
    name: "Covestro AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Plásticos de alto rendimiento y poliuretanos para múltiples aplicaciones",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "PAH3": {
    ticker: "PAH3",
    name: "Porsche Automobil Holding SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Holding de inversión con participación controladora en Volkswagen y Porsche",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "QGEN": {
    ticker: "QGEN",
    name: "QIAGEN NV",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Diagnóstico molecular y kits de muestra para investigación y laboratorios",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "BNR": {
    ticker: "BNR",
    name: "Brenntag SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Distribuidor químico especializado con red global de logística",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "XETRA"
  },

  "DHER": {
    ticker: "DHER",
    name: "Delivery Hero SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Plataforma de entrega de alimentos (food delivery) con presencia en 70+ países",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "ZAL": {
    ticker: "ZAL",
    name: "Zalando SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "E-commerce de moda y lifestyle con 200+ millones de usuarios en Europa",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },

  "HFG": {
    ticker: "HFG",
    name: "HelloFresh SE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Servicio de comidas meal-kits con entregas a domicilio en múltiples países",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "XETRA"
  },
  "ISP": {
    ticker: "ISP",
    name: "Intesa Sanpaolo S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Mayor banco italiano con servicios financieros integrales y presencia europea",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "UCG": {
    ticker: "UCG",
    name: "UniCredit S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco europeo con sede en Italia y operaciones en múltiples países",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "ENEL": {
    ticker: "ENEL",
    name: "Enel S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Empresa líder en distribución de electricidad y gas en Italia y Europa",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },

  "RACE": {
    ticker: "RACE",
    name: "Ferrari N.V.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante de automóviles deportivos de lujo con marca legendaria",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "G": {
    ticker: "G",
    name: "Assicurazioni Generali S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Aseguradora multinacional italiana con presencia global",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "MTA"
  },

  "ENI": {
    ticker: "ENI",
    name: "Eni S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Empresa energética italiana con petróleo, gas natural y renovables",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "STLA": {
    ticker: "STLA",
    name: "Stellantis N.V.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Grupo automovilístico resultado de fusión Fiat-Chrysler con múltiples marcas",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "STM": {
    ticker: "STM",
    name: "STMicroelectronics N.V.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Technology",
    description: "Fabricante de semiconductores para industria automotriz y consumidor",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "PRY": {
    ticker: "PRY",
    name: "Prysmian S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante de cables y sistemas para energía y telecomunicaciones",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "SRG": {
    ticker: "SRG",
    name: "Snam S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Empresa italiana de transporte y almacenamiento de gas natural",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },

  "PST": {
    ticker: "PST",
    name: "Poste Italiane S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Operador postal italiano con servicios de correo y logística integrados",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },

  "TEN": {
    ticker: "TEN",
    name: "Tenaris S.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante de tubos de acero para industria petroquímica y construcción",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "MON": {
    ticker: "MON",
    name: "Moncler S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Marca italiana de moda y vestuario de lujo especializada en abrigos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "LDO": {
    ticker: "LDO",
    name: "Leonardo S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Aerospace & Defense",
    description: "Empresa italiana de defensa, helicópteros y sistemas aeroespaciales",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "BMED": {
    ticker: "BMED",
    name: "Banca Mediolanum S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco italiano especializado en servicios financieros personalizados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "BPE": {
    ticker: "BPE",
    name: "BPER Banca S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco regional italiano con servicios de banca minorista y empresarial",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "HER": {
    ticker: "HER",
    name: "Hera S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Empresa italiana de servicios públicos: agua, gas y electricidad",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },

  "CPR": {
    ticker: "CPR",
    name: "Campari Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Grupo de bebidas italianas con marcas de licores reconocidas globalmente",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "A2A": {
    ticker: "A2A",
    name: "A2A S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Empresa italiana de servicios de energía y agua para residencias",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },

  "PIRC": {
    ticker: "PIRC",
    name: "Pirelli & C. S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante italiano de neumáticos de automoción con presencia global",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "CNH": {
    ticker: "CNH",
    name: "CNHI Industrial N.V.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante de maquinaria agrícola e industrial de origen italiano",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "TIT": {
    ticker: "TIT",
    name: "Telecom Italia S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Telecommunication",
    description: "Operador de telecomunicaciones italiano con redes fijas y móviles",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "REC": {
    ticker: "REC",
    name: "Recordati Industria Chimica e Farmaceutica S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Farmacéutica italiana especializada en medicamentos de prescripción",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "BAMI": {
    ticker: "BAMI",
    name: "Banco BPM S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco italiano que es resultado de fusión de instituciones financieras",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "IG": {
    ticker: "IG",
    name: "Italgas S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Operador de red de gas natural en Italia y servicios relacionados",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },

  "BGN": {
    ticker: "BGN",
    name: "Banca Generali S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco italiano de servicios financieros con enfoque en gestión patrimonial",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "INW": {
    ticker: "INW",
    name: "Infrared Wireless Italiane S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Telecommunication",
    description: "Operador de infraestructura de telecomunicaciones para redes móviles",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "SPM": {
    ticker: "SPM",
    name: "Saipem S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Empresa italiana de ingeniería y construcción para sector energético",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "DIA": {
    ticker: "DIA",
    name: "DiaSorin S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Empresa de diagnóstico molecular y pruebas de laboratorio italianas",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "BZU": {
    ticker: "BZU",
    name: "Buzzi Unicem S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Fabricante italiano de cemento y materiales de construcción",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "AZM": {
    ticker: "AZM",
    name: "Azimut Holding S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Gestor de activos y fondos de inversión italiano",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "IP": {
    ticker: "IP",
    name: "Interpump Group S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante italiano de componentes industriales de precisión",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "NEXI": {
    ticker: "NEXI",
    name: "Nexi S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Technology",
    description: "Procesador de pagos digital italiano especializado en soluciones fintech",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "AMP": {
    ticker: "AMP",
    name: "Amplifon S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Healthcare",
    description: "Empresa de audición y audífonos con distribución europeo",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "MTA"
  },

  "BDS": {
    ticker: "BDS",
    name: "Banco di Sardegna S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco regional italiano sardo con servicios financieros locales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "UTIR": {
    ticker: "UTIR",
    name: "Uff. Tecn. Enel. Radiotelevisione Italiana",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Media",
    description: "Empresa italiana de radiodifusión y servicios audiovisuales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "FCT": {
    ticker: "FCT",
    name: "Fincantieri S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Mayor astillero italiano y fabricante de cruceros de lujo",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "ELC": {
    ticker: "ELC",
    name: "Elica S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Cyclical",
    description: "Fabricante italiano de campanas extractoras y sistemas de ventilación",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "MTA"
  },

  "ASC": {
    ticker: "ASC",
    name: "Ascopiave S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Empresa italiana de distribución de agua y servicios hídricos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },

  "ASTM": {
    ticker: "ASTM",
    name: "ASTM S.p.A.",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Gestor de autopistas italianas y servicios de infraestructura de transporte",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "MTA"
  },
  "ABB": {
    ticker: "ABB",
    name: "ABB Ltd",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa sueca de ingeniería con tecnología de poder y automatización industrial",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "ADDT B": {
    ticker: "ADDT-B",
    name: "Addtech AB ser. B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Distribuidor industrial sueco de componentes técnicos y productos especializados",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "ALFA": {
    ticker: "ALFA",
    name: "Alfa Laval AB",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante sueco de intercambiadores de calor y separadores centrífugos",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "ASSA B": {
    ticker: "ASSA-B",
    name: "ASSA ABLOY AB ser. B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Líder mundial sueco en soluciones de acceso y seguridad para puertas",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "AZN": {
    ticker: "AZN",
    name: "AstraZeneca",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Health Care",
    description: "Farmacéutica sueca con medicamentos oncológicos, inmunología y respiratorios",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "ATCO A": {
    ticker: "ATCO-A",
    name: "Atlas Copco A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante sueco de compresores de aire y equipos de perforación industrial",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "BOL": {
    ticker: "BOL",
    name: "Boliden",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empresa sueca de minería y fundición de metales preciosos y base",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },

  "EPI A": {
    ticker: "EPI-A",
    name: "Epiroc A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante sueco de equipos de perforación y herramientas de minería",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "EQT": {
    ticker: "EQT",
    name: "EQT",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Gestor de capital privado sueco con inversiones en infraestructura y private equity",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "ERIC B": {
    ticker: "ERIC-B",
    name: "Ericsson B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Fabricante sueco de telecomunicaciones con tecnología 5G y redes móviles",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "ESSITY B": {
    ticker: "ESSITY-B",
    name: "Essity B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Empresa sueca de higiene y papel tisú con marcas conocidas globalmente",
    recommended_for: ["intermedio", "avanzado"],
    risk: "LOW",
    exchange: "NASDAQ"
  },

  "EVO": {
    ticker: "EVO",
    name: "Evolution",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Proveedor sueco de software de casino online y entretenimiento de juegos en vivo",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SHB A": {
    ticker: "SHB-A",
    name: "Handelsbanken A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco sueco establecido de servicios financieros y banca minorista",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },

  "HM B": {
    ticker: "HM-B",
    name: "Hennes & Mauritz B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Minorista sueco de moda y vestuario con tiendas en múltiples países",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "HEXA B": {
    ticker: "HEXA-B",
    name: "Hexagon B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Empresa sueca de software y soluciones digitales para medición y seguridad",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "INDU C": {
    ticker: "INDU-C",
    name: "Industrivärden C",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Empresa de inversión sueca con participaciones en industria y tecnología",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "INVE B": {
    ticker: "INVE-B",
    name: "Investor B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Holding sueco de inversiones con participaciones en empresas industriales",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "LIFCO B": {
    ticker: "LIFCO-B",
    name: "Lifco B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Conglomerado sueco que fabrica productos de consumo y componentes industriales",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "NIBE B": {
    ticker: "NIBE-B",
    name: "Nibe Industrier B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante sueco de sistemas de climatización y calefacción para edificios",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "NDA SE": {
    ticker: "NDA-SE",
    name: "Nordea Bank Abp",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco nórdico de servicios financieros con presencia en Suecia, Noruega y Finlandia",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },

  "SAAB B": {
    ticker: "SAAB-B",
    name: "Saab B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa sueca de defensa, aviación y sistemas de seguridad tecnológica",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SAND": {
    ticker: "SAND",
    name: "Sandvik",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante sueco de herramientas y componentes para minería e industria",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SCA B": {
    ticker: "SCA-B",
    name: "SCA B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empresa sueca de productos de papel y forestales con operaciones sostenibles",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SEB A": {
    ticker: "SEB-A",
    name: "SEB A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco sueco de inversión y gestión de activos con alcance nórdico y europeo",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SKA B": {
    ticker: "SKA-B",
    name: "Skanska B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa sueca de construcción y desarrollo inmobiliario con presencia internacional",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SKF B": {
    ticker: "SKF-B",
    name: "SKF B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante sueco de rodamientos, sellos y sistemas de lubricación industrial",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "SWED A": {
    ticker: "SWED-A",
    name: "Swedbank A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco sueco de servicios financieros con presencia en Suecia y países Bálticos",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },

  "TEL2 B": {
    ticker: "TEL2-B",
    name: "Tele2 B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Operador de telecomunicaciones sueco con servicios móviles y fijos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "TELIA": {
    ticker: "TELIA",
    name: "Telia Company",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Empresa sueca de telecomunicaciones con servicios en países nórdicos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "VOLV B": {
    ticker: "VOLV-B",
    name: "Volvo B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante sueco de camiones, autobuses y motores diésel industriales",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "ELISA": {
    ticker: "ELISA",
    name: "Elisa",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Communication Services",
    description: "Operador de telecomunicaciones finlandés con servicios móviles, fijos y banda ancha",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "FORTUM": {
    ticker: "FORTUM",
    name: "Fortum",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Utilities",
    description: "Empresa finlandesa de energía con producción hidroeléctrica y servicios de calor",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },

  "HIAB": {
    ticker: "HIAB",
    name: "Hiab",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante finlandés de equipos de carga y manipulación para camiones",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "HUH1V": {
    ticker: "HUH1V",
    name: "Huhtamäki",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante finlandés de envases de alimentos y artículos de servicio desechables",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "KALMAR": {
    ticker: "KALMAR",
    name: "Kalmar B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante finlandés de equipos de manipulación de contenedores y vehículos industriales",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "KEMIRA": {
    ticker: "KEMIRA",
    name: "Kemira",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empresa química finlandesa con productos para agua, papel y cemento",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "KESKOB": {
    ticker: "KESKOB",
    name: "Kesko B",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Staples",
    description: "Retailer finlandés con cadenas de tiendas de alimentos y ferretería",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "KOJAMO": {
    ticker: "KOJAMO",
    name: "Kojamo",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Real Estate",
    description: "Empresa inmobiliaria finlandesa especializada en vivienda para estudiantes y jóvenes",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "KNEBV": {
    ticker: "KNEBV",
    name: "KONE",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Líder global finlandés en ascensores, escaleras mecánicas y sistemas de transporte",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "KCR": {
    ticker: "KCR",
    name: "Konecranes",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Fabricante finlandés de grúas industriales y sistemas de elevación especializada",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "MANTA": {
    ticker: "MANTA",
    name: "Mandatum",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Empresa financiera finlandesa de seguros de vida y gestión de activos",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "METSO": {
    ticker: "METSO",
    name: "Metso",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa finlandesa de tecnología para procesamiento de minerales y reciclaje",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "NESTE": {
    ticker: "NESTE",
    name: "Neste",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Energy",
    description: "Refinería finlandesa con producción de combustibles sostenibles y biocombustibles",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "NOKIA": {
    ticker: "NOKIA",
    name: "Nokia",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Empresa finlandesa líder en tecnología 5G, redes ópticas y servicios de telecomunicaciones",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "TYRES": {
    ticker: "TYRES",
    name: "Nokian Tyres",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Consumer Discretionary",
    description: "Fabricante finlandés de neumáticos para automoción especializado en condiciones árticas",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "NDA FI": {
    ticker: "NDA-FI",
    name: "Nordea",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Banco nórdico finlandés con servicios financieros en toda la región nórdica",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "NASDAQ"
  },

  "ORNBV": {
    ticker: "ORNBV",
    name: "Orion",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Health Care",
    description: "Farmacéutica finlandesa especializada en medicamentos neurodegenerativos y psiquiátricos",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },

  "OUT1V": {
    ticker: "OUT1V",
    name: "Outokumpu",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Fabricante finlandés de acero inoxidable y aceros especiales",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    exchange: "NASDAQ"
  },
  "QTCOM": {
    ticker: "QTCOM",
    name: "Qt Group",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Empresa finlandesa de software con plataforma Qt para desarrollo de aplicaciones",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "SAMPO": {
    ticker: "SAMPO",
    name: "Sampo A",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Financials",
    description: "Conglomerado financiero finlandés con seguros, banca y gestión de activos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "STERV": {
    ticker: "STERV",
    name: "Stora Enso R",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Empresa finlandesa de papel, cartón y productos forestales de Escandinavia",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "TIETO": {
    ticker: "TIETO",
    name: "TietoEVRY",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Information Technology",
    description: "Empresa finlandesa de servicios y soluciones tecnológicas de TI y nube",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "UPM": {
    ticker: "UPM",
    name: "UPM-Kymmene",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Materials",
    description: "Conglomerado finlandés de papel, bioproductos y energía renovable",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "VALMT": {
    ticker: "VALMT",
    name: "Valmet",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa finlandesa que fabrica maquinaria para industrias de papel y energía",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "WRT1V": {
    ticker: "WRT1V",
    name: "Wärtsilä",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Industrials",
    description: "Empresa finlandesa de ingeniería marina con motores y sistemas de propulsión",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "NASDAQ"
  },
  "NESN": {
    ticker: "NESN",
    name: "Nestlé SA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Food",
    description: "Líder mundial suizo en alimentos, bebidas y productos de bienestar con presencia global",
    recommended_for: ["principiante", "intermedio"],
    risk: "LOW",
    exchange: "SIX"
  },

  "ROG": {
    ticker: "ROG",
    name: "Roche Holding AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Pharmacy",
    description: "Farmacéutica suiza líder en oncología, diagnóstico y cuidado personal",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "NOVN": {
    ticker: "NOVN",
    name: "Novartis International AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Pharmacy",
    description: "Farmacéutica suiza especializada en medicamentos innovadores y genéricos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "CFR": {
    ticker: "CFR",
    name: "Compagnie Financière Richemont SA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Luxury Goods",
    description: "Empresa suiza de lujo con joyas, relojes y accesorios de alta gama",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "ZURN": {
    ticker: "ZURN",
    name: "Zurich Insurance Group AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Insurance",
    description: "Aseguradora suiza con seguros generales, vida y riesgos especiales",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "SIX"
  },

  "UBSG": {
    ticker: "UBSG",
    name: "UBS Group AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Banks",
    description: "Banco de inversión suizo con servicios financieros globales y gestión de patrimonio",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "ABBN": {
    ticker: "ABBN",
    name: "ABB Ltd",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Electrical equipment",
    description: "Empresa suiza de tecnología de automatización, electrificación y robótica",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "LONN": {
    ticker: "LONN",
    name: "Lonza Group AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Chemistry",
    description: "Fabricante suizo de ingredientes químicos para farmacéutica y biotech",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "SIKA": {
    ticker: "SIKA",
    name: "Sika AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Chemistry",
    description: "Empresa suiza de adhesivos y selladores para construcción e industria",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "ALC": {
    ticker: "ALC",
    name: "Alcon Inc",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Pharmacy",
    description: "Empresa oftalmológica suiza con productos para cuidado ocular y lentes de contacto",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "GIVN": {
    ticker: "GIVN",
    name: "Givaudan SA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Chemistry",
    description: "Empresa suiza líder en sabores, fragancias y aromas para alimentos y cosméticos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "HOLN": {
    ticker: "HOLN",
    name: "Holcim Limited",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Building materials",
    description: "Empresa suiza de construcción con cemento, áridos y hormigón premezclado",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "SCMN": {
    ticker: "SCMN",
    name: "Swisscom AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Telecommunications",
    description: "Operador de telecomunicaciones suizo con servicios móviles y banda ancha",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "SIX"
  },

  "PGHN": {
    ticker: "PGHN",
    name: "Partners Group Holding AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Private equity",
    description: "Gestor de inversiones suizo especializado en capital privado e infraestructura",
    recommended_for: ["avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "SREN": {
    ticker: "SREN",
    name: "Swiss Reinsurance Company Ltd",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Insurance",
    description: "Reaseguradora suiza líder mundial en gestión de riesgos complejos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "SOON": {
    ticker: "SOON",
    name: "Sonova",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Medical devices",
    description: "Empresa suiza de equipos audiovisuales y soluciones de comunicación",
    recommended_for: ["intermedio"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "GEBN": {
    ticker: "GEBN",
    name: "Geberit AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Sanitary engineering",
    description: "Fabricante suizo de sistemas de tuberías y sanitarios para construcción",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "SLHN": {
    ticker: "SLHN",
    name: "Swiss Life Holding AG",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Insurance",
    description: "Empresa suiza de seguros de vida con gestión de fondos de pensiones",
    recommended_for: ["intermedio"],
    risk: "LOW",
    exchange: "SIX"
  },

  "LOGN": {
    ticker: "LOGN",
    name: "Logitech International SA",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Computer hardware and software",
    description: "Empresa suiza de periféricos de computación y dispositivos inalámbricos",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

  "KNIN": {
    ticker: "KNIN",
    name: "Kuehne + Nagel International",
    type: "STOCK",
    category: "RENTA_VARIABLE",
    sector: "Logistics",
    description: "Empresa suiza de logística y transporte con alcance internacional",
    recommended_for: ["intermedio", "avanzado"],
    risk: "MEDIUM",
    exchange: "SIX"
  },

};

/**
 * Criptomonedas para agregar al portfolio
 */
const CRYPTOCURRENCIES = {
  "BTC-USD": {
    ticker: "BTC-USD",
    name: "Bitcoin",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Primera y más grande criptomoneda descentralizada",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    marketCap: "Large"
  },
  "ETH-USD": {
    ticker: "ETH-USD",
    name: "Ethereum",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Plataforma blockchain para contratos inteligentes",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    marketCap: "Large"
  },
  "BNB-USD": {
    ticker: "BNB-USD",
    name: "Binance Coin",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Token nativo de Binance Exchange",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    marketCap: "Large"
  },
  "ADA-USD": {
    ticker: "ADA-USD",
    name: "Cardano",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Blockchain de tercera generación",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    marketCap: "Large"
  },
  "SOL-USD": {
    ticker: "SOL-USD",
    name: "Solana",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Blockchain de alto rendimiento",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    marketCap: "Large"
  },
  "DOT-USD": {
    ticker: "DOT-USD",
    name: "Polkadot",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Protocolo de interoperabilidad blockchain",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    marketCap: "Medium"
  },
  "MATIC-USD": {
    ticker: "MATIC-USD",
    name: "Polygon",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Solución de escalabilidad para Ethereum",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    marketCap: "Medium"
  },
  "AVAX-USD": {
    ticker: "AVAX-USD",
    name: "Avalanche",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Plataforma blockchain de contratos inteligentes",
    recommended_for: ["avanzado", "agresivo"],
    risk: "HIGH",
    marketCap: "Medium"
  },
  "LINK-USD": {
    ticker: "LINK-USD",
    name: "Chainlink",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Red de oráculos descentralizada",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    marketCap: "Medium"
  },
  "UNI-USD": {
    ticker: "UNI-USD",
    name: "Uniswap",
    type: "CRYPTO",
    category: "CRYPTO",
    description: "Exchange descentralizado (DEX)",
    recommended_for: ["avanzado"],
    risk: "HIGH",
    marketCap: "Medium"
  }
};

module.exports = {
  INDIVIDUAL_STOCKS,
  CRYPTOCURRENCIES
};
