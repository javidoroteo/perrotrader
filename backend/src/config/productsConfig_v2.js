
// Configuración completa de productos financieros para ISFINZ
// Actualizado con todos los productos y brokers proporcionados

const FINANCIAL_PRODUCTS = {
  // ===== RENTA FIJA =====

  // Bonos Globales Diversificados
  'AGGG.L': {
    name: 'iShares Core Global Aggregate Bond UCITS ETF',
    ticker: 'AGGG.L',
    isin: 'IE00B3F81409',
    ter: '0.10%',
    type: 'RENTA_FIJA',
    description: 'ETF de bonos globales diversificado',
    category: 'Bonos Globales',
    risk: 'Bajo',
    recommended_for: ['principiante', 'conservador']
  },

  'VAGF.L': {
    name: 'Vanguard Global Aggregate Bond UCITS ETF',
    ticker: 'VAGF.L',
    isin: 'IE00BG47K951',
    ter: '0.10%',
    type: 'RENTA_FIJA',
    description: 'Fondo de bonos globales de Vanguard',
    category: 'Bonos Globales',
    risk: 'Bajo',
    recommended_for: ['principiante', 'intermedio']
  },

  'XGOV.L': {
    name: 'Xtrackers Global Government Bond UCITS ETF',
    ticker: 'XGOV.L',
    isin: 'IE00B8JARL60',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bonos gubernamentales globales',
    category: 'Bonos Gubernamentales',
    risk: 'Muy Bajo',
    recommended_for: ['conservador', 'principiante']
  },

  // Bonos Europeos
  'VECP.L': {
    name: 'Vanguard EUR Corporate Bond UCITS ETF',
    ticker: 'VECP.L',
    isin: 'IE00BZ163H91',
    ter: '0.09%',
    type: 'RENTA_FIJA',
    description: 'Bonos corporativos europeos',
    category: 'Bonos Corporativos',
    risk: 'Bajo-Medio',
    recommended_for: ['intermedio', 'avanzado']
  },

  'SEGA.L': {
    name: 'iShares EUR Government Bond UCITS ETF Dist',
    ticker: 'SEGA.L',
    isin: 'IE00B3VTML14',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bonos gubernamentales europeos',
    category: 'Bonos Gubernamentales',
    risk: 'Bajo',
    recommended_for: ['conservador', 'dividendos']
  },

  'IEAG.L': {
    name: 'iShares Core EUR Govt Bond UCITS ETF',
    ticker: 'IEAG.L',
    isin: 'IE00B4WXJJ64',
    ter: '0.09%',
    type: 'RENTA_FIJA',
    description: 'Core gubernamentales europeos',
    category: 'Bonos Gubernamentales',
    risk: 'Bajo',
    recommended_for: ['principiante', 'conservador']
  },

  'XEUC.L': {
    name: 'Xtrackers EUR Corporate Bond UCITS ETF Dist',
    ticker: 'XEUC.L',
    isin: 'LU0484968812',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Corporativos europeos con distribución',
    category: 'Bonos Corporativos',
    risk: 'Bajo-Medio',
    recommended_for: ['intermedio', 'dividendos']
  },

  // Bonos del Tesoro USA
  'IBTM.L': {
    name: 'iShares USD Treasury Bond 7-10yr UCITS ETF',
    ticker: 'IBTM.L',
    isin: 'IE00B1FZS574',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bonos del Tesoro USA 7-10 años',
    category: 'Tesoro USA',
    risk: 'Bajo',
    recommended_for: ['intermedio', 'diversificacion']
  },

  'IDTL.L': {
    name: 'iShares USD Treasury Bond 20+yr UCITS ETF',
    ticker: 'IDTL.L',
    isin: 'IE00B1FZS681',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bonos del Tesoro USA largo plazo',
    category: 'Tesoro USA',
    risk: 'Medio',
    recommended_for: ['avanzado', 'largo_plazo']
  },

  'TIPS.L': {
    name: 'iShares USD TIPS UCITS ETF',
    ticker: 'TIPS.L',
    isin: 'IE00B1FZSC47',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'TIPS estadounidenses',
    category: 'Inflacion Protegida',
    risk: 'Bajo-Medio',
    recommended_for: ['inflacion', 'avanzado']
  },

  // Alto Rendimiento
  'GHYG.L': {
    name: 'iShares Global High Yield Corp Bond UCITS ETF',
    ticker: 'GHYG.L',
    isin: 'IE00B74DQ490',
    ter: '0.50%',
    type: 'RENTA_FIJA',
    description: 'Alto rendimiento global',
    category: 'High Yield',
    risk: 'Medio-Alto',
    recommended_for: ['avanzado', 'alto_rendimiento']
  },

  'IHYG.L': {
    name: 'iShares EUR High Yield Corp Bond UCITS ETF',
    ticker: 'IHYG.L',
    isin: 'IE00B66F4759',
    ter: '0.50%',
    type: 'RENTA_FIJA',
    description: 'Alto rendimiento europeo',
    category: 'High Yield',
    risk: 'Medio-Alto',
    recommended_for: ['avanzado', 'alto_rendimiento']
  },

  'JNK4.L': {
    name: 'SPDR Bloomberg Euro High Yield Bond UCITS ETF',
    ticker: 'JNK4.L',
    isin: 'IE00B6X8B070',
    ter: '0.55%',
    type: 'RENTA_FIJA',
    description: 'Alto rendimiento europeo SPDR',
    category: 'High Yield',
    risk: 'Medio-Alto',
    recommended_for: ['avanzado', 'alto_rendimiento']
  },

  // Productos Especializados Renta Fija
  'GILD.L': {
    name: 'iShares Global Inflation Linked Govt Bond UCITS ETF',
    ticker: 'GILD.L',
    isin: 'IE00B3B8Q275',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bonos indexados a inflación',
    category: 'Inflacion Protegida',
    risk: 'Bajo-Medio',
    recommended_for: ['inflacion', 'avanzado']
  },

  'FLOT.L': {
    name: 'iShares USD Floating Rate Bond UCITS ETF',
    ticker: 'FLOT.L',
    isin: 'IE00B3VWN518',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bonos tasa flotante USD',
    category: 'Tasa Flotante',
    risk: 'Bajo',
    recommended_for: ['tipos_subida', 'avanzado']
  },

  'ICVT.L': {
    name: 'iShares Convertible Bond UCITS ETF',
    ticker: 'ICVT.L',
    isin: 'IE00B3B8Q275',
    ter: '0.65%',
    type: 'RENTA_FIJA',
    description: 'Bonos convertibles',
    category: 'Convertibles',
    risk: 'Medio',
    recommended_for: ['avanzado', 'hibrido']
  },

  'COCO.L': {
    name: 'WisdomTree AT1 CoCo Bond UCITS ETF',
    ticker: 'COCO.L',
    isin: 'IE00BD1DJ437',
    ter: '0.75%',
    type: 'RENTA_FIJA',
    description: 'Bonos contingente convertibles',
    category: 'Especializado',
    risk: 'Alto',
    recommended_for: ['avanzado', 'alto_riesgo']
  },

  'PSCS.L': {
    name: 'Invesco EUR Corporate Bond UCITS ETF',
    ticker: 'PSCS.L',
    isin: 'IE00BF2B0K52',
    ter: '0.05%',
    type: 'RENTA_FIJA',
    description: 'Corporativos europeos Invesco',
    category: 'Bonos Corporativos',
    risk: 'Bajo-Medio',
    recommended_for: ['coste_bajo', 'intermedio']
  },

  'SDIV': {
    name: 'Global X SuperDividend ETF',
    ticker: 'SDIV',
    isin: 'US37954Y5747',
    ter: '0.58%',
    type: 'RENTA_FIJA',
    description: 'ETF de altos dividendos global',
    category: 'Alto Dividendo',
    risk: 'Medio',
    recommended_for: ['dividendos', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  // ===== RENTA VARIABLE =====

  // ETFs Globales Core
  'IWDA.L': {
    name: 'iShares Core MSCI World UCITS ETF',
    ticker: 'IWDA.L',
    alternativeTickers: ['IWDA.AS'],
    isin: 'IE00B4L5Y983',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI World desarrollados',
    category: 'Global Core',
    risk: 'Medio',
    recommended_for: ['principiante', 'intermedio', 'core']
  },

  'VWCE.DE': {
    name: 'Vanguard FTSE All-World UCITS ETF',
    ticker: 'VWCE.DE',
    alternativeTickers: ['VWCE.AS'],
    isin: 'IE00BK5BQT80',
    ter: '0.22%',
    type: 'RENTA_VARIABLE',
    description: 'Todo el mundo desarrollado + emergente',
    category: 'Global Core',
    risk: 'Medio',
    recommended_for: ['principiante', 'intermedio', 'diversificacion']
  },

  'XMWO.L': {
    name: 'Xtrackers MSCI World UCITS ETF',
    ticker: 'XMWO.L',
    isin: 'IE00BJ0KDQ92',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI World alternativa',
    category: 'Global Core',
    risk: 'Medio',
    recommended_for: ['coste_bajo', 'intermedio']
  },

  // ETFs de Dividendos
  'WQDV.L': {
    name: 'iShares MSCI World Dividend UCITS ETF',
    ticker: 'WQDV.L',
    isin: 'IE00B14X4M10',
    ter: '0.38%',
    type: 'RENTA_VARIABLE',
    description: 'Dividendos MSCI World',
    category: 'Dividendos',
    risk: 'Medio',
    recommended_for: ['dividendos', 'intermedio']
  },

  'VHYL.L': {
    name: 'Vanguard FTSE All-World High Dividend Yield',
    ticker: 'VHYL.L',
    isin: 'IE00BK5BR626',
    ter: '0.29%',
    type: 'RENTA_VARIABLE',
    description: 'Alto dividendo global',
    category: 'Dividendos',
    risk: 'Medio',
    recommended_for: ['dividendos', 'conservador_rv']
  },

  'GLDV.L': {
    name: 'SPDR S&P Global Dividend Aristocrats',
    ticker: 'GLDV.L',
    isin: 'IE00B9CQXS71',
    ter: '0.45%',
    type: 'RENTA_VARIABLE',
    description: 'Dividend Aristocrats global',
    category: 'Dividendos Premium',
    risk: 'Medio',
    recommended_for: ['dividendos', 'calidad', 'avanzado']
  },

  // ETF S&P 500
  'SPY5.L': {
    name: 'SPDR S&P 500 UCITS ETF',
    ticker: 'SPY5.L',
    isin: 'IE00B6YX5C33',
    ter: '0.03%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 réplica',
    category: 'USA',
    risk: 'Medio',
    recommended_for: ['coste_bajo', 'usa', 'intermedio']
  }
};

// ===== CONFIGURACIÓN DE BROKERS =====

const BROKERS = {
  'Interactive Brokers': {
    name: 'Interactive Brokers',
    commission_etf: '0.05% (mín. €1.25, máx. €29)',
    custody_fee: '€0 (sin comisión)',
    regulation: 'FCA (Reino Unido), registrado CNMV',
    min_deposit: '€0',
    available_products: 'Acciones, ETFs, Bonos, Opciones, Futuros',
    pros: 'Acceso a 150+ mercados, comisiones muy bajas',
    cons: 'Plataforma compleja para principiantes',
    rating: 5,
    recommended_for: ['avanzado', 'internacional', 'coste_bajo']
  },

  'DEGIRO': {
    name: 'DEGIRO',
    commission_etf: '€1-2 (selección gratuita limitada)',
    custody_fee: '€0',
    regulation: 'BaFiN (Alemania), registrado CNMV',
    min_deposit: '€0.01',
    available_products: 'Acciones, ETFs, Bonos, Opciones, Futuros',
    pros: 'Comisiones muy bajas, +200 ETFs',
    cons: 'Comisión conectividad €2.50/mercado',
    rating: 4,
    recommended_for: ['intermedio', 'coste_bajo', 'europa']
  },

  'Trade Republic': {
    name: 'Trade Republic',
    commission_etf: '€1 por operación',
    custody_fee: '€0',
    regulation: 'BaFiN (Alemania), registrado CNMV',
    min_deposit: '€0',
    available_products: '2000+ ETFs, Acciones, Bonos',
    pros: 'App muy intuitiva, cuenta remunerada 2.53%',
    cons: 'Solo móvil, no CFDs',
    rating: 4,
    recommended_for: ['principiante', 'movil', 'sencillo']
  },

  'XTB': {
    name: 'XTB',
    commission_etf: '0% hasta €100,000/mes, después 0.2%',
    custody_fee: '€0',
    regulation: 'CNMV (España)',
    min_deposit: '€0',
    available_products: '100+ ETFs, Acciones, CFDs',
    pros: 'Sin comisiones hasta €100k, regulación española',
    cons: 'Catálogo ETF limitado',
    rating: 4,
    recommended_for: ['españa', 'sin_comisiones', 'intermedio']
  },

  'eToro': {
    name: 'eToro',
    commission_etf: '€0 (sin comisiones ETFs)',
    custody_fee: '€0',
    regulation: 'CySEC (Chipre), registrado CNMV',
    min_deposit: '€50',
    available_products: '600+ ETFs, Acciones, Criptos',
    pros: 'Sin comisiones ETFs, copy trading',
    cons: 'Comisión retiro €5, conversión divisa',
    rating: 3,
    recommended_for: ['principiante', 'social', 'sin_comisiones']
  },

  'Renta 4 Banco': {
    name: 'Renta 4 Banco',
    commission_etf: '€7-12 (nacional/internacional)',
    custody_fee: 'Varía según producto',
    regulation: 'CNMV (España)',
    min_deposit: '€0',
    available_products: '2400+ ETFs, todos los productos',
    pros: 'Mayor banco inversión España, atención personal',
    cons: 'Comisiones altas',
    rating: 3,
    recommended_for: ['españa', 'atencion_personal', 'catálogo_amplio']
  },

  'MyInvestor': {
    name: 'MyInvestor',
    commission_etf: 'Varía por producto',
    custody_fee: '€0 primeros €50,000',
    regulation: 'Banco de España, CNMV',
    min_deposit: '€0',
    available_products: '1300+ ETFs',
    pros: 'Banco español, cuenta remunerada',
    cons: 'Comisiones menos competitivas',
    rating: 3,
    recommended_for: ['españa', 'banco_tradicional', 'principiante']
  },

  'Self Bank': {
    name: 'Self Bank',
    commission_etf: 'Desde €9-15 según mercado',
    custody_fee: 'Cuota mantenimiento',
    regulation: 'Banco de España, CNMV',
    min_deposit: '€0',
    available_products: '2700+ ETFs',
    pros: 'Banco español, gran catálogo',
    cons: 'Comisiones altas',
    rating: 2,
    recommended_for: ['españa', 'catalogo_amplio']
  },

  'ING Broker Naranja': {
    name: 'ING Broker Naranja',
    commission_etf: '€7.5 España, €15 internacional',
    custody_fee: '€0',
    regulation: 'Banco de España, CNMV',
    min_deposit: '€0',
    available_products: '600+ ETFs',
    pros: 'Banco establecido',
    cons: 'Comisiones altas, catálogo limitado',
    rating: 2,
    recommended_for: ['banco_tradicional', 'españa']
  }
};

// ===== FUNCIONES AUXILIARES =====

const getProductsByType = (type) => {
  return Object.values(FINANCIAL_PRODUCTS).filter(product => product.type === type);
};

const getProductsByCategory = (category) => {
  return Object.values(FINANCIAL_PRODUCTS).filter(product => product.category === category);
};

const getProductsByRisk = (riskLevel) => {
  return Object.values(FINANCIAL_PRODUCTS).filter(product => product.risk === riskLevel);
};

const getRecommendedProducts = (profile) => {
  return Object.values(FINANCIAL_PRODUCTS).filter(product => 
    product.recommended_for.includes(profile)
  );
};

const getBrokersByProfile = (profile) => {
  return Object.values(BROKERS).filter(broker => 
    broker.recommended_for.includes(profile)
  );
};

const getTopBrokers = (limit = 5) => {
  return Object.values(BROKERS)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

module.exports = {
  FINANCIAL_PRODUCTS,
  BROKERS,
  getProductsByType,
  getProductsByCategory,
  getProductsByRisk,
  getRecommendedProducts,
  getBrokersByProfile,
  getTopBrokers
};

module.exports = {
  FINANCIAL_PRODUCTS
};
