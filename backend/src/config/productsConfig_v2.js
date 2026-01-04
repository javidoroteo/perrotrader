
// Configuración completa de productos financieros para ISFINZ
// Actualizado con todos los productos y brokers proporcionados

const FINANCIAL_PRODUCTS = {
  // ===== RENTA FIJA =====
  // RIZE ENVIRONMENTAL IMPACT 100 - ART. 9 SFDR
  'LIFE': {
    name: 'Rize Environmental Impact 100 UCITS ETF (LIFE)',
    ticker: 'LIFE',
    isin: 'IE00BLRPRR04',
    ter: '0.55%',
    type: 'RENTA_VARIABLE',
    description: 'Foxberry SMS Environmental Impact 100: 100 empresas impacto ambiental. EU Taxonomy 6 objetivos incluyendo biodiversidad. 118M USD. Article 9 SFDR. Acumulación.',
    category: 'Environmental Impact 100',
    risk: 'Alto',
    recommended_for: ['biodiversidad', 'tematico', 'avanzado', 'sostenible']
  },
  // AXA IM ACT BIODIVERSITY - MÁS GRANDE + ACTIVE
  'ABIT': {
    name: 'AXA IM ACT Biodiversity Equity UCITS ETF USD Acc',
    ticker: 'ABIT',
    isin: 'IE000SBHVL31',
    ter: '0.70%',
    type: 'RENTA_VARIABLE',
    description: 'GESTIÓN ACTIVA: biodiversidad global developed + emerging. Criterios ESG + fundamentales. Impacto biodiversidad medible.',
    category: 'Active Biodiversity Global',
    risk: 'Alto',
    recommended_for: ['biodiversidad', 'tematico', 'avanzado', 'sostenible']
  },
  // OSSIAM FOOD FOR BIODIVERSITY - SECTOR AGRÍCOLA
  'F4DU': {
    name: 'Ossiam Food for Biodiversity UCITS ETF 1A USD (Acc)',
    ticker: 'F4DU',
    isin: 'IE00BN0YSJ74',
    ter: '0.75%',
    type: 'RENTA_VARIABLE',
    description: 'GESTIÓN ACTIVA: sector agricultura/alimentos con biodiversidad. 41 holdings. Enfoque transición alimentaria sostenible. Biodiversidad agrícola + ESG.',
    category: 'Active Food Biodiversity',
    risk: 'Alto',
    recommended_for: ['biodiversidad', 'tematico', 'avanzado', 'sostenible']
  },
  // HSBC WORLD BIODIVERSITY SCREENED - PRIMER ETF
  'HBDV': {
    name: 'HSBC World ESG Biodiversity Screened Equity UCITS ETF USD (Acc)',
    ticker: 'HBDV',
    isin: 'IE0002UTLE51',
    ter: '0.35%',
    type: 'RENTA_VARIABLE',
    description: 'Euronext ESG Biodiversity Screened World: developed markets con foco biodiversidad. 499 holdings. Filtro SRI + biodiversity footprint. Acumulación. Primer ETF biodiversidad.',
    category: 'World Biodiversity Screened',
    risk: 'Alto',
    recommended_for: ['biodiversidad', 'tematico', 'avanzado', 'sostenible']
  },

  // XTRACKERS BIODIVERSITY FOCUS - MEJOR TER
  'XBIO': {
    name: 'Xtrackers World Biodiversity Focus SRI UCITS ETF 1C',
    ticker: 'XBIO',
    isin: 'IE000E0V65D8',
    ter: '0.30%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Biodiversity Focus SRI World: global biodiversidad + SRI. Low TER (0.30%). 400+ holdings. Solactive index. Accumulación. Biodiversidad global diversa.',
    category: 'World Biodiversity Focus SRI',
    risk: 'Alto',
    recommended_for: ['biodiversidad', 'tematico', 'avanzado', 'sostenible']
  },
  // ROBECO CLIMATE EURO GOVERNMENT BOND - GESTIÓN ACTIVA
  'RCEGB': {
    name: 'Robeco Climate Euro Government Bond ETF',
    ticker: 'RCEGB',
    isin: 'IE00BLRPQE59',
    ter: '0.30%',
    type: 'RENTA_FIJA',
    description: 'GESTIÓN ACTIVA: EUR gov bonds climate transition. Clima scores + green bonds. Propósito: financiar transición climática. Manteniendo características bonos gov. Acumulación.',
    category: 'EUR Gov Climate Active',
    risk: 'Bajo-Medio',
    recommended_for: ['climatico', 'verde', 'bonos', 'conservador', 'moderado']
  },

  // ABERDEEN CLIMATE TRANSITION BOND - GESTIÓN ACTIVA GLOBAL
  'ABDR': {
    name: 'Aberdeen Standard UCITS ETF - Climate Transition Bond',
    ticker: 'ABDR',
    isin: 'IE00BXD4P854',
    ter: '0.45%',
    type: 'RENTA_FIJA',
    description: 'GESTIÓN ACTIVA: Climate transition bonds - investment grade global. Mín. 3 pilares: Leaders, Solutions, Adaptors. Yield 5%+. BBB- mínimo. Acumulación. Impacto climate.',
    category: 'Global Corp Climate Active',
    risk: 'Bajo-Medio',
    recommended_for: ['climatico', 'verde', 'bonos', 'conservador', 'impacto']
  },

  // ISHARES GLOBAL GOVERNMENT CLIMATE
  'CGGD': {
    name: 'iShares Global Government Bond Climate UCITS ETF USD (Dist)',
    ticker: 'CGGD',
    isin: 'IE00BJBK1M64',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'FTSE Advanced Climate Risk-Adjusted World Government: global gov bonds climate-adjusted. Países menos expuestos clima. Distribución. Riesgo bajo.',
    category: 'Global Gov Climate',
    risk: 'Bajo-Medio',
    recommended_for: ['climatico', 'verde', 'bonos', 'conservador', 'moderado']
  },

  // FIDELITY GLOBAL GOVERNMENT CLIMATE AWARE
  'FGCA': {
    name: 'Fidelity Global Government Bond Climate Aware UCITS ETF USD Inc',
    ticker: 'FGCA',
    isin: 'IE000IF0HTJ9',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Solactive Paris Aware Global Government: global gov bonds climate aware. 14% carbon intensity reduction. Decarbonización 7% anual. 240 holdings. Distribución trimestral.',
    category: 'Global Gov Climate Aware',
    risk: 'Bajo-Medio',
    recommended_for: ['climatico', 'verde', 'bonos', 'conservador', 'moderado']
  },

  // ISHARES EUR GOVERNMENT CLIMATE - MÁS GRANDE + MEJOR TER
  'SECA': {
    name: 'iShares EUR Government Bond Climate UCITS ETF EUR (Acc)',
    ticker: 'SECA',
    isin: 'IE00BLDGH553',
    ter: '0.09%',
    type: 'RENTA_FIJA',
    description: 'FTSE Advanced Climate Risk-Adjusted EMU Government: EUR gov bonds climate-adjusted. 406 holdings. 2.194M EUR. MÁS GRANDE. BAJO TER (0.09%). Acumulación. Puro bonos gobierno.',
    category: 'EUR Gov Climate',
    risk: 'Bajo-Medio',
    recommended_for: ['climatico', 'verde', 'bonos', 'conservador', 'moderado']
  },

  // ISHARES EUR GOVERNMENT CLIMATE DISTRIBUCIÓN
  'SECD': {
    name: 'iShares EUR Government Bond Climate UCITS ETF EUR (Dist)',
    ticker: 'SECD',
    isin: 'IE00BLDGH447',
    ter: '0.09%',
    type: 'RENTA_FIJA',
    description: 'FTSE Advanced Climate Risk-Adjusted EMU Government: EUR gov bonds climate-adjusted distribución. 406 holdings. 117M EUR. BAJO TER (0.09%). Distribución semestral.',
    category: 'EUR Gov Climate Dist',
    risk: 'Bajo-Medio',
    recommended_for: ['climatico', 'verde', 'bonos', 'conservador', 'moderado']
  },

  // BNP PARIBAS PARIS ALIGNED - FOSSIL FREE
  'BNPR': {
    name: 'BNP Paribas Easy EUR Corporate Bond SRI PAB UCITS ETF Dist',
    ticker: 'BNPR',
    isin: 'LU1953136287',
    ter: '0.15%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Corporate SRI PAB ex Fossil Fuel: Paris Aligned Bonds. 1.675 holdings. 277M EUR. Excluye fossil fuels. Distribución anual. ESG + Climate.',
    category: 'EUR Corp PAB ex-Fossil',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'bonos', 'europa', 'conservador', 'moderado']
  },

  // BNP PARIBAS ACTIVE ESG ENHANCED
  'BNPE': {
    name: 'BNP Paribas Easy ESG Enhanced EUR Corporate Bond UCITS ETF Acc',
    ticker: 'BNPE',
    isin: 'LU2697596745',
    ter: '0.18%',
    type: 'RENTA_FIJA',
    description: 'GESTIÓN ACTIVA: EUR corporativos ESG Enhanced. 455 holdings. ESG criteria + ESG scoring mejorado. Acumulación. Enfoque activo sostenible.',
    category: 'EUR Corp ESG Active',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'bonos', 'europa', 'conservador', 'moderado']
  },

  // ISHARES SHORT DURATION 0-3Y - MÁS GRANDE + MEJOR TER
  'QDVL': {
    name: 'iShares EUR Corporate Bond 0-3yr ESG SRI UCITS ETF EUR (Dist)',
    ticker: 'QDVL',
    isin: 'IE00BYZTVV78',
    ter: '0.12%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Corporate 0-3Y ESG SRI: bonos corto plazo (0-3 años) ESG. 1.322 holdings. 2.517M EUR. Distribución semestral.',
    category: 'EUR Corp Short 0-3Y ESG',
    risk: 'Bajo',
    recommended_for: ['esg', 'bonos', 'europa', 'conservador', 'moderado']
  },

  // VANGUARD ESG EUR CORPORATE - BAJO TER
  'V3CE': {
    name: 'Vanguard ESG EUR Corporate Bond UCITS ETF (EUR) Accumulating',
    ticker: 'V3CE',
    isin: 'IE00BF4RYP35',
    ter: '0.12%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Corporate ESG: Vanguard low cost ESG corporativos EUR. Acumulación. Simple y eficiente.',
    category: 'Vanguard EUR Corp ESG',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'bonos', 'europa', 'conservador', 'moderado']
  },
  // ISHARES EUR CORPORATE ESG - MÁS GRANDE DIVERSIFICADO
  'SUA0': {
    name: 'iShares EUR Corporate Bond ESG SRI UCITS ETF EUR (Acc)',
    ticker: 'SUA0',
    isin: 'IE000L2TO2T2',
    ter: '0.14%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Corporate ESG SRI: EUR corporativos ESG. 2.976 holdings. 1.195M EUR. MÁS GRANDE. Investment Grade. BAJO TER (0.14%). Acumulación.',
    category: 'EUR Corporate ESG SRI',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'bonos', 'europa', 'conservador', 'moderado']
  },

  // AMUNDI EUR CORPORATE ESG
  'LYCC': {
    name: 'Amundi EUR Corporate Bond ESG UCITS ETF DR (C)',
    ticker: 'LYCC',
    isin: 'LU1681039647',
    ter: '0.14%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Corporate ESG: EUR corporativos ESG. 1.000+ holdings. ESG screening. Investment Grade. BAJO TER (0.14%). Acumulación.',
    category: 'EUR Corporate ESG',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'bonos', 'europa', 'conservador', 'moderado']
  },

  // NUVEEN GLOBAL SUSTAINABLE - GESTIÓN ACTIVA + IMPACTO
  'NSB': {
    name: 'Nuveen Global Sustainable Bond Fund',
    ticker: 'NSB',
    isin: 'IE00B50R2T99',
    ter: '0.65%',
    type: 'RENTA_FIJA',
    description: 'GESTIÓN ACTIVA: ESG Leaders + Impact investing. Global fixed income. ESG leadership + medible impacto ambiental/social. 4.5M EUR. Article 9 SFDR. Acumulación.',
    category: 'Global Sustainable Active',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'sostenible', 'bonos', 'conservador', 'impacto']
  },
  // NUVEEN US SUSTAINABLE - GESTIÓN ACTIVA USA
  'NUSB': {
    name: 'Nuveen U.S. Sustainable Bond Fund',
    ticker: 'NUSB',
    isin: 'IE000P0NB7Q0',
    ter: '0.65%',
    type: 'RENTA_FIJA',
    description: 'GESTIÓN ACTIVA: US ESG Leaders + Impact. US investment grade. ESG leadership + measurable impact. 2.3M EUR. Article 9 SFDR. Acumulación.',
    category: 'US Sustainable Active',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'sostenible', 'bonos', 'conservador', 'impacto', 'usa']
  },
  // AMUNDI GLOBAL GREEN BONDS - MÁS GRANDE
  'KLMT': {
    name: 'Amundi Global Aggregate Green Bond UCITS ETF Acc',
    ticker: 'KLMT',
    isin: 'LU1563454310',
    ter: '0.25%',
    type: 'RENTA_FIJA',
    description: 'Solactive Green Bond EUR/USD IG: global bonos verdes. 988 holdings corporativos + soberanos + desarrollo. MÁS GRANDE (241M EUR). Replicación completa. Investment Grade. Acumulación.',
    category: 'Global Green Bonds',
    risk: 'Bajo-Medio',
    recommended_for: ['verde', 'bonos', 'conservador', 'moderado', 'ingresos', 'global']
  },

  // AMUNDI GLOBAL GREEN BONDS EUR HEDGED
  'KLMH': {
    name: 'Amundi Global Aggregate Green Bond UCITS ETF EUR Hedged Acc',
    ticker: 'KLMH',
    isin: 'LU1563454823',
    ter: '0.30%',
    type: 'RENTA_FIJA',
    description: 'Solactive Green Bond EUR Hedged: misma estrategia con cobertura EUR. 988 holdings. 116M EUR. EUR Hedged. Sin riesgo divisa. Acumulación.',
    category: 'Global Green Bonds EUR Hedged',
    risk: 'Bajo-Medio',
    recommended_for: ['verde', 'bonos', 'conservador', 'moderado', 'ingresos', 'global']
  },
  // HSBC GLOBAL AGGREGATE ESG - MEJOR TER
  'HGAE': {
    name: 'HSBC Global Aggregate Bond ESG UCITS ETF Acc',
    ticker: 'HGAE',
    isin: 'IE000Q0X08R9',
    ter: '0.09%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Global Aggregate SRI Carbon ESG-Weighted: global agregado ESG. Govs, corporativos, securitizados. ESG + bajo carbono. BAJO TER (0.09%). Acumulación.',
    category: 'Global Aggregate ESG',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'sostenible', 'bonos', 'conservador', 'ingresos']
  },
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

  'XAIX': {
    name: 'Xtrackers Artificial Intelligence & Big Data UCITS ETF',
    ticker: 'XAIX',
    isin: 'IE00BGV5VN51',
    ter: '0.35%',
    type: 'RENTA_VARIABLE',
    description: 'ETF global con exposición a empresas de IA, big data e infraestructura tecnológica',
    category: 'Temático Inteligencia Artificial',
    risk: 'Alto',
    recommended_for: ['tematico', 'tecnologia', 'avanzado', 'crecimiento']
  },
  'XMLD': {
    name: 'L&G Artificial Intelligence UCITS ETF',
    ticker: 'XMLD',
    isin: 'IE00BK5BCD43',
    ter: '0.49%',
    type: 'RENTA_VARIABLE',
    description: 'ETF centrado en empresas líderes en IA',
    category: 'Temático Inteligencia Artificial',
    risk: 'Alto',
    recommended_for: ['tematico', 'tecnologia', 'crecimiento', 'avanzado']
  },
  'WTI2': {
    name: 'WisdomTree Artificial Intelligence UCITS ETF',
    ticker: 'WTI2',
    isin: 'IE00BDVPNG13',
    ter: '0.40%',
    type: 'RENTA_VARIABLE',
    description: 'ETF temático IA internacional',
    category: 'Temático Inteligencia Artificial',
    risk: 'Alto',
    recommended_for: ['tematico', 'tecnologia', 'crecimiento', 'avanzado']
  },
  'RBOT': {
    name: 'iShares Automation & Robotics UCITS ETF',
    ticker: 'RBOT',
    isin: 'IE00BYZK4552',
    ter: '0.40%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de empresas de automatización y robótica',
    category: 'Temático Robótica',
    risk: 'Alto',
    recommended_for: ['tematico', 'tecnologia', 'crecimiento', 'avanzado']
  },
  'GOAI': {
    name: 'Amundi MSCI Robotics & AI UCITS ETF Acc',
    ticker: 'GOAI',
    isin: 'LU1861132840',
    ter: '0.40%',
    type: 'RENTA_VARIABLE',
    description: 'ETF global robótica e IA',
    category: 'Temático Robótica',
    risk: 'Alto',
    recommended_for: ['tematico', 'tecnologia', 'crecimiento', 'avanzado']
  },
  'BKCH': {
    name: 'Global X Blockchain UCITS ETF',
    ticker: 'BKCH',
    isin: 'IE000N6XMR83',
    ter: '0.50%',
    type: 'RENTA_VARIABLE',
    description: 'ETF centrado en tecnología blockchain',
    category: 'Temático Blockchain',
    risk: 'Alto',
    recommended_for: ['tematico', 'tecnologia', 'crecimiento', 'avanzado']
  },
  'BNXG': {
    name: 'Invesco CoinShares Global Blockchain UCITS ETF',
    ticker: 'BNXG',
    isin: 'IE00BGBN6P67',
    ter: '0.65%',
    type: 'RENTA_VARIABLE',
    description: 'ETF global de blockchain',
    category: 'Temático Blockchain',
    risk: 'Alto',
    recommended_for: ['tematico', 'tecnologia', 'crecimiento', 'avanzado']
  },
  'DFEN': {
    name: 'VanEck Defense UCITS ETF',
    ticker: 'DFEN',
    isin: 'IE000YYE6WK5',
    ter: '0.55%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de defensa global',
    category: 'Temático Defensa',
    risk: 'Alto',
    recommended_for: ['tematico', 'defensa', 'avanzado', 'crecimiento']
  },
  'EUDF': {
    name: 'WisdomTree Europe Defence UCITS ETF',
    ticker: 'EUDF',
    isin: 'IE0002Y8CX98',
    ter: '0.40%',
    type: 'RENTA_VARIABLE',
    description: 'ETF defensa europea',
    category: 'Temático Defensa',
    risk: 'Alto',
    recommended_for: ['tematico', 'defensa', 'avanzado', 'crecimiento']
  },
  'ASWC': {
    name: 'HANetf Future of Defence UCITS ETF',
    ticker: 'ASWC',
    isin: 'IE000OJ5TQP4',
    ter: '0.49%',
    type: 'RENTA_VARIABLE',
    description: 'ETF temático de defensa',
    category: 'Temático Defensa',
    risk: 'Alto',
    recommended_for: ['tematico', 'defensa', 'avanzado', 'crecimiento']
  },
  'LOCK': {
    name: 'iShares Digital Security UCITS ETF',
    ticker: 'LOCK',
    isin: 'IE00BG0J4C88',
    ter: '0.40%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de seguridad digital',
    category: 'Temático Ciberseguridad',
    risk: 'Alto',
    recommended_for: ['tematico', 'ciberseguridad', 'avanzado', 'crecimiento']
  },
  'IH2O': {
    name: 'iShares Global Water UCITS ETF',
    ticker: 'IH2O',
    isin: 'IE00B1TXK627',
    ter: '0.65%',
    type: 'RENTA_VARIABLE',
    description: 'ETF global de infraestructura hídrica',
    category: 'Temático Agua',
    risk: 'Medio',
    recommended_for: ['tematico', 'agua', 'sostenible', 'crecimiento']
  },
  // ISHARES GLOBAL WATER ACC - VERSIÓN ACUMULACIÓN
  'IH2O ACC': {
    name: 'iShares Global Water UCITS ETF USD (Acc)',
    ticker: 'IH2O ACC',
    isin: 'IE00B1TXLD11',
    ter: '0.65%',
    type: 'RENTA_VARIABLE',
    description: 'S&P Global Water Index versión acumulación. Misma estrategia que IH2O pero reinversión dividendos. 50 holdings. Acumulación.',
    category: 'Water Global Acumulación',
    risk: 'Medio-Alto',
    recommended_for: ['agua', 'tematico', 'avanzado', 'sostenible', 'global']
  },
  'LYM8': {
    name: 'Amundi MSCI Water UCITS ETF Dist',
    ticker: 'LYM8',
    isin: 'FR0010527275',
    ter: '0.60%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI ACWI IMI Water Filtered: global agua + ESG. 37 holdings. 2º MÁS GRANDE (1.568M EUR). Distribución anual. ESG filtrado. TER bajo.',
    category: 'Water MSCI ESG',
    risk: 'Medio-Alto',
    recommended_for: ['agua', 'tematico', 'avanzado', 'sostenible', 'dividendos', 'esg', 'global']
  },
  // L&G CLEAN WATER - TECNOLOGÍA AGUA LIMPIA
  'GLGG': {
    name: 'L&G Clean Water UCITS ETF',
    ticker: 'GLGG',
    isin: 'IE00BK5BC891',
    ter: '0.49%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Clean Water: tecnología, digital, ingeniería agua limpia. 57 holdings. MEJOR TER (0.49%). Acumulación. Enfoque tecnología agua limpia.',
    category: 'Clean Water Tecnología',
    risk: 'Medio-Alto',
    recommended_for: ['agua', 'tematico', 'avanzado', 'sostenible', 'global']
  },

  // XTRACKERS SDG 6 - ONU SUSTAINABLE + MÁS BAJO TER
  'XDG6': {
    name: 'Xtrackers MSCI Global SDG 6 Clean Water & Sanitation UCITS ETF 1C',
    ticker: 'XDG6',
    isin: 'IE0007WJ6B10',
    ter: '0.35%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI ACWI IMI SDG 6 Clean Water & Sanitation: alineado ONU SDG 6. 76 holdings. BAJO TER (0.35%). ESG robusto. Agua + Saneamiento.',
    category: 'SDG 6 Clean Water Sanitation',
    risk: 'Medio-Alto',
    recommended_for: ['agua', 'tematico', 'avanzado', 'sostenible', 'impacto', 'global']
  },

  // GLOBAL X CLEAN WATER - TRATAMIENTO ESPECIALIZADO
  'AQWA': {
    name: 'Global X Clean Water UCITS ETF',
    ticker: 'AQWA',
    isin: 'IE00B8B4H277',
    ter: '0.60%',
    type: 'RENTA_VARIABLE',
    description: 'Global X Clean Water: tratamiento agua industrial. Enfoque específico purificación + gestión agua. Acumulación. Temático especializado.',
    category: 'Clean Water Treatment',
    risk: 'Medio-Alto',
    recommended_for: ['agua', 'tematico', 'avanzado', 'sostenible', 'global']
  },

  'AQUA': {
    name: 'L&G Clean Water UCITS ETF',
    ticker: 'AQUA',
    isin: 'IE00BK5BC891',
    ter: '0.49%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de agua limpia con exposición global al sector hídrico',
    category: 'Temático Agua',
    risk: 'Medio',
    recommended_for: ['tematico', 'sostenible', 'agua', 'intermedio']
  },

  'AWAT': {
    name: 'Amundi MSCI Water UCITS ETF',
    ticker: 'AWAT',
    isin: 'FR0011882364',
    ter: '0.60%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de agua MSCI con distribución',
    category: 'Temático Agua',
    risk: 'Medio',
    recommended_for: ['tematico', 'sostenible', 'agua', 'intermedio']
  },

  // ===== ETFs SECTORIALES - SALUD Y BIOTECNOLOGÍA =====

  'XDWH': {
    name: 'Xtrackers MSCI World Health Care UCITS ETF',
    ticker: 'XDWH',
    isin: 'IE00BM67HK77',
    ter: '0.25%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de salud mundial con TER muy competitivo',
    category: 'Sectorial Salud',
    risk: 'Medio',
    recommended_for: ['sectorial', 'salud', 'defensivo', 'principiante', 'intermedio']
  },

  'EXV4': {
    name: 'iShares STOXX Europe 600 Health Care UCITS ETF',
    ticker: 'EXV4',
    isin: 'DE000A0Q4R36',
    ter: '0.46%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de salud europea con distribución, incluye AstraZeneca, Novartis, Roche, Novo Nordisk',
    category: 'Sectorial Salud',
    risk: 'Medio',
    recommended_for: ['sectorial', 'salud', 'europa', 'defensivo', 'intermedio']
  },

  'BTEC': {
    name: 'iShares Nasdaq US Biotechnology UCITS ETF',
    ticker: 'BTEC',
    isin: 'IE00BYXG2H39',
    ter: '0.35%',
    type: 'RENTA_VARIABLE',
    description: 'ETF enfocado en biotecnología del Nasdaq',
    category: 'Sectorial Biotecnología',
    risk: 'Alto',
    recommended_for: ['sectorial', 'biotecnologia', 'salud', 'crecimiento', 'avanzado']
  },

  'NBTK': {
    name: 'Invesco Nasdaq Biotech UCITS ETF',
    ticker: 'NBTK',
    isin: 'IE00BQ70R696',
    ter: '0.40%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de biotecnología con replicación por swap',
    category: 'Sectorial Biotecnología',
    risk: 'Alto',
    recommended_for: ['sectorial', 'biotecnologia', 'salud', 'crecimiento', 'avanzado']
  },

  // ===== ETFs SECTORIALES - SEMICONDUCTORES =====

  'SMH': {
    name: 'VanEck Semiconductor ETF',
    ticker: 'SMH',
    isin: 'US92189F8607',
    ter: '0.35%',
    type: 'RENTA_VARIABLE',
    description: 'ETF líder de semiconductores, casi 20% en Nvidia',
    category: 'Sectorial Semiconductores',
    risk: 'Alto',
    recommended_for: ['sectorial', 'tecnologia', 'semiconductores', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'SOXX': {
    name: 'iShares Semiconductor ETF',
    ticker: 'SOXX',
    isin: 'US4642873255',
    ter: '0.34%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de semiconductores más balanceado entre Nvidia, Broadcom y AMD',
    category: 'Sectorial Semiconductores',
    risk: 'Alto',
    recommended_for: ['sectorial', 'tecnologia', 'semiconductores', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'SOXQ': {
    name: 'Invesco PHLX Semiconductor ETF',
    ticker: 'SOXQ',
    isin: 'US46138G7286',
    ter: '0.19%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de semiconductores con TER bajo y buena diversificación',
    category: 'Sectorial Semiconductores',
    risk: 'Alto',
    recommended_for: ['sectorial', 'tecnologia', 'semiconductores', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },
  // INVESCO SOLAR - PURO SOLAR
  'RAYS': {
    name: 'Invesco Solar Energy UCITS ETF Acc',
    ticker: 'RAYS',
    isin: 'IE00BM8QRZ79',
    ter: '0.69%',
    type: 'RENTA_VARIABLE',
    description: 'MAC Global Solar Energy Index: especialización en solar. 29 holdings puros de solar. Única opción de inversión solar pura en UCITS. Acumulación. Altamente temático.',
    category: 'Solar Energy Puro',
    risk: 'Alto',
    recommended_for: ['verde', 'renovables', 'avanzado', 'crecimiento', 'tematico', 'solar']
  },

  // ===== ETFs SECTORIALES - ENERGÍA LIMPIA =====

  'INRG': {
    name: 'iShares Global Clean Energy UCITS ETF',
    ticker: 'INRG',
    isin: 'IE00B1XNHC34',
    ter: '0.65%',
    type: 'RENTA_VARIABLE',
    description: 'ETF global de energía limpia, el más grande del sector',
    category: 'Sectorial Energía Limpia',
    risk: 'Alto',
    recommended_for: ['sectorial', 'sostenible', 'energia', 'crecimiento', 'avanzado']
  },

  'RENG': {
    name: 'L&G Clean Energy UCITS ETF',
    ticker: 'RENG',
    isin: 'IE00BK5BCH80',
    ter: '0.49%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Clean Energy Index: empresas globales energía limpia. 55 holdings. Buen TER (0.49%) con amplia diversificación. Acumulación. Enfoque integral en transición energética.',
    category: 'Clean Energy Global Integral',
    risk: 'Alto',
    recommended_for: ['verde', 'renovables', 'avanzado', 'crecimiento', 'tematico', 'global']
  },
  // AMUNDI NEW ENERGY + ESG
  'LYM9': {
    name: 'Amundi MSCI New Energy UCITS ETF Dist',
    ticker: 'LYM9',
    isin: 'FR0010524777',
    ter: '0.60%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI ACWI IMI New Energy Filtered: empresas energía nueva global con ESG. 79 holdings. 2º más grande (574M EUR). Distribución anual. Top holdings: Siemens Energy, GE Vernova, Schneider Electric.',
    category: 'New Energy ESG - Global',
    risk: 'Alto',
    recommended_for: ['verde', 'renovables', 'avanzado', 'crecimiento', 'tematico', 'global', 'esg']
  },
  // WISDOMTREE RENEWABLE + ESG
  'WRNW': {
    name: 'WisdomTree Renewable Energy UCITS ETF USD Acc',
    ticker: 'WRNW',
    isin: 'IE000P3D0W60',
    ter: '0.45%',
    type: 'RENTA_VARIABLE',
    description: 'WisdomTree Renewable Energy Index: energía renovable diversificada con ESG. 64 holdings. Excelente TER (0.45%). Selección experta en cadena valor renovable. Acumulación.',
    category: 'Renewable Energy ESG',
    risk: 'Alto',
    recommended_for: ['verde', 'renovables', 'avanzado', 'crecimiento', 'tematico', 'global', 'esg']
  },
  // INVESCO INNOVACIÓN ENERGÍA LIMPIA
  'GCLX': {
    name: 'Invesco Global Clean Energy UCITS ETF Acc',
    ticker: 'GCLX',
    isin: 'IE00BLRB0242',
    ter: '0.60%',
    type: 'RENTA_VARIABLE',
    description: 'WilderHill New Energy Global Innovation Index: innovación global energía limpia. 111 holdings. Enfoque en tecnologías emergentes. Acumulación. Top: Bloom Energy, Plug Power, Solaria.',
    category: 'Clean Energy Innovación Global',
    risk: 'Alto',
    recommended_for: ['verde', 'renovables', 'avanzado', 'crecimiento', 'tematico', 'global']
  },

  'ISUN': {
    name: 'Invesco Solar Energy UCITS ETF',
    ticker: 'ISUN',
    isin: 'IE00BM8QRZ79',
    ter: '0.69%',
    type: 'RENTA_VARIABLE',
    description: 'ETF especializado en energía solar',
    category: 'Sectorial Energía Solar',
    risk: 'Alto',
    recommended_for: ['sectorial', 'sostenible', 'energia', 'solar', 'crecimiento', 'avanzado']
  },

  'RENW': {
    name: 'L&G Clean Energy UCITS ETF',
    ticker: 'RENW',
    isin: 'IE00BK5BCH80',
    ter: '0.49%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de energía renovable con TER competitivo',
    category: 'Sectorial Energía Limpia',
    risk: 'Alto',
    recommended_for: ['sectorial', 'sostenible', 'energia', 'crecimiento', 'avanzado']
  },

  // ===== ETFs MERCADOS EMERGENTES - GLOBALES =====

  'VWO': {
    name: 'Vanguard FTSE Emerging Markets ETF',
    ticker: 'VWO',
    isin: 'US9220428588',
    ter: '0.07%',
    type: 'RENTA_VARIABLE',
    description: 'ETF emergentes de ultra bajo coste, exposición a China, India y Taiwan',
    category: 'Emergentes Global',
    risk: 'Alto',
    recommended_for: ['emergentes', 'diversificacion', 'crecimiento', 'intermedio'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'IEEM': {
    name: 'iShares MSCI Emerging Markets UCITS ETF',
    ticker: 'IEEM',
    isin: 'IE00B0M63177',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'ETF líder de mercados emergentes',
    category: 'Emergentes Global',
    risk: 'Alto',
    recommended_for: ['emergentes', 'diversificacion', 'crecimiento', 'intermedio']
  },

  'AEEM': {
    name: 'Amundi MSCI Emerging Markets UCITS ETF',
    ticker: 'AEEM',
    isin: 'LU1681045370',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de mercados emergentes alternativa europea',
    category: 'Emergentes Global',
    risk: 'Alto',
    recommended_for: ['emergentes', 'diversificacion', 'crecimiento', 'intermedio']
  },

  // ===== ETFs MERCADOS EMERGENTES - CHINA =====

  'KWEB': {
    name: 'KraneShares CSI China Internet ETF',
    ticker: 'KWEB',
    isin: 'US50077C8681',
    ter: '0.70%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de internet chino, exposición a Alibaba, Tencent, Baidu',
    category: 'Emergentes China',
    risk: 'Muy Alto',
    recommended_for: ['emergentes', 'china', 'tecnologia', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'MCHI': {
    name: 'iShares MSCI China ETF',
    ticker: 'MCHI',
    isin: 'US4642872349',
    ter: '0.59%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de acciones chinas',
    category: 'Emergentes China',
    risk: 'Muy Alto',
    recommended_for: ['emergentes', 'china', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'ASHR': {
    name: 'Xtrackers Harvest CSI 300 China A-Shares ETF',
    ticker: 'ASHR',
    isin: 'US68236W1018',
    ter: '0.65%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de A-Shares chinas',
    category: 'Emergentes China',
    risk: 'Muy Alto',
    recommended_for: ['emergentes', 'china', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  // ===== ETFs MERCADOS EMERGENTES - INDIA =====

  'INDA': {
    name: 'iShares MSCI India ETF',
    ticker: 'INDA',
    isin: 'US46434G1031',
    ter: '0.65%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de acciones indias',
    category: 'Emergentes India',
    risk: 'Alto',
    recommended_for: ['emergentes', 'india', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'FLIN': {
    name: 'Franklin FTSE India ETF',
    ticker: 'FLIN',
    isin: 'US35473P6372',
    ter: '0.19%',
    type: 'RENTA_VARIABLE',
    description: 'ETF India de bajo coste',
    category: 'Emergentes India',
    risk: 'Alto',
    recommended_for: ['emergentes', 'india', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'EPI': {
    name: 'WisdomTree India Earnings Fund',
    ticker: 'EPI',
    isin: 'US97717X7561',
    ter: '0.84%',
    type: 'RENTA_VARIABLE',
    description: 'ETF enfocado en empresas indias con ganancias sólidas',
    category: 'Emergentes India',
    risk: 'Alto',
    recommended_for: ['emergentes', 'india', 'crecimiento', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  // ===== ETFs MERCADOS EMERGENTES - ASIA PACÍFICO =====

  'EWJ': {
    name: 'iShares MSCI Japan ETF',
    ticker: 'EWJ',
    isin: 'US4642872265',
    ter: '0.50%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de Japón',
    category: 'Asia Pacífico',
    risk: 'Medio',
    recommended_for: ['asia', 'japon', 'diversificacion', 'intermedio'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'VPL': {
    name: 'Vanguard FTSE Pacific ETF',
    ticker: 'VPL',
    isin: 'US92204A7001',
    ter: '0.08%',
    type: 'RENTA_VARIABLE',
    description: 'ETF del Pacífico',
    category: 'Asia Pacífico',
    risk: 'Medio',
    recommended_for: ['asia', 'diversificacion', 'intermedio'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'IPAC': {
    name: 'iShares Core MSCI Pacific ETF',
    ticker: 'IPAC',
    isin: 'US46434V8680',
    ter: '0.13%',
    type: 'RENTA_VARIABLE',
    description: 'ETF Pacífico core',
    category: 'Asia Pacífico',
    risk: 'Medio',
    recommended_for: ['asia', 'diversificacion', 'intermedio'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  // ===== MATERIAS PRIMAS - ORO Y METALES =====

  'GLD': {
    name: 'SPDR Gold Shares',
    ticker: 'GLD',
    isin: 'US78463V1070',
    ter: '0.40%',
    type: 'MATERIA_PRIMA',
    description: 'ETF de oro físico',
    category: 'Oro',
    risk: 'Medio',
    recommended_for: ['materias_primas', 'oro', 'cobertura', 'defensivo', 'conservador'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'IAU': {
    name: 'iShares Gold Trust',
    ticker: 'IAU',
    isin: 'US4642851053',
    ter: '0.25%',
    type: 'MATERIA_PRIMA',
    description: 'ETF de oro de bajo coste',
    category: 'Oro',
    risk: 'Medio',
    recommended_for: ['materias_primas', 'oro', 'cobertura', 'defensivo', 'conservador'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'SLV': {
    name: 'iShares Silver Trust',
    ticker: 'SLV',
    isin: 'US4642858586',
    ter: '0.50%',
    type: 'MATERIA_PRIMA',
    description: 'ETF de plata física',
    category: 'Plata',
    risk: 'Alto',
    recommended_for: ['materias_primas', 'plata', 'cobertura', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'REMX': {
    name: 'VanEck Rare Earth and Strategic Metals UCITS ETF',
    ticker: 'REMX',
    isin: 'NL0012002275',
    ter: '0.55%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de tierras raras y metales estratégicos',
    category: 'Metales Estratégicos',
    risk: 'Muy Alto',
    recommended_for: ['materias_primas', 'metales', 'crecimiento', 'avanzado']
  },

  // ===== MATERIAS PRIMAS - DIVERSIFICADAS =====

  'DBC': {
    name: 'Invesco DB Commodity Index',
    ticker: 'DBC',
    isin: 'US73935B1008',
    ter: '0.85%',
    type: 'MATERIA_PRIMA',
    description: 'ETF de commodities amplias',
    category: 'Commodities Diversificadas',
    risk: 'Alto',
    recommended_for: ['materias_primas', 'diversificacion', 'cobertura', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'USCI': {
    name: 'United States Commodity Index Fund',
    ticker: 'USCI',
    isin: 'US91289B1017',
    ter: '0.95%',
    type: 'MATERIA_PRIMA',
    description: 'ETF de commodities diversificadas',
    category: 'Commodities Diversificadas',
    risk: 'Alto',
    recommended_for: ['materias_primas', 'diversificacion', 'cobertura', 'avanzado'],
    warning: 'Producto estadounidense - puede tener restricciones fiscales'
  },

  'COCO': {
    name: 'WisdomTree Cocoa',
    ticker: 'COCO',
    isin: 'JE00B6W88J18',
    ter: '0.49%',
    type: 'MATERIA_PRIMA',
    description: 'ETF de cacao',
    category: 'Commodities Agrícolas',
    risk: 'Muy Alto',
    recommended_for: ['materias_primas', 'especifico', 'avanzado']
  },
  // ETFs de Dividendos
  'SPYW': {
    name: 'SPDR S&P Euro Dividend Aristocrats UCITS ETF',
    ticker: 'SPYW',
    isin: 'IE00B5M1WJ87',
    ter: '0.30%',
    type: 'RENTA_VARIABLE',
    description: 'ETF aristócratas dividendo eurozona con yield ~3%',
    category: 'Dividendos Aristócratas',
    risk: 'Bajo',
    recommended_for: ['dividendos', 'renta', 'aristocratas', 'conservador', 'intermedio']
  },

  'ZPRG': {
    name: 'SPDR S&P Global Dividend Aristocrats UCITS ETF',
    ticker: 'ZPRG',
    isin: 'IE00B9CQXS71',
    ter: '0.45%',
    type: 'RENTA_VARIABLE',
    description: 'ETF aristócratas dividendo global con yield ~3%',
    category: 'Dividendos Aristócratas',
    risk: 'Bajo',
    recommended_for: ['dividendos', 'renta', 'aristocratas', 'global', 'conservador', 'intermedio']
  },

  'ZPRA': {
    name: 'SPDR S&P Pan Asia Dividend Aristocrats UCITS ETF',
    ticker: 'ZPRA',
    isin: 'IE00B9KNR769',
    ter: '0.55%',
    type: 'RENTA_VARIABLE',
    description: 'ETF aristócratas dividendo Asia',
    category: 'Dividendos Aristócratas',
    risk: 'Medio',
    recommended_for: ['dividendos', 'renta', 'aristocratas', 'asia', 'intermedio']
  },
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
  },
  // ESG EUROPA
  'LEAD': {
    name: 'Amundi MSCI Europe ESG Selection UCITS ETF Acc',
    ticker: 'LEAD',
    isin: 'LU1940199711',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'ETF de renta variable europea que replica el MSCI Europe ESG Leaders Select 5% Issuer Capped Index, seleccionando solo compañías europeas líderes en criterios ESG. Inversión diversificada en grandes y medianas empresas. Acumulación de dividendos. Domicilio en Luxemburgo.',
    category: 'ESG Leaders - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'IUSK': {
    name: 'iShares MSCI Europe SRI UCITS ETF (Acc)',
    ticker: 'IUSK',
    isin: 'IE00B52VJ196',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que replica el índice MSCI Europe SRI Select Reduced Fossil Fuels. Selecciona compañías europeas con muy altas puntuaciones ESG y excluye empresas con exposición a combustibles fósiles. Ponderación máxima por empresa 5%. Uno de los más grandes de Europa en su categoría.',
    category: 'SRI Leaders - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'SLMC': {
    name: 'iShares MSCI Europe Screened UCITS ETF EUR (Acc)',
    ticker: 'SLMC',
    isin: 'IE00BFNM3D14',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que replica el índice MSCI Europe Screened. Excluye compañías involucradas en carbón térmico, armas controvertidas, tabaco y otras industrias controvertidas. Enfoque ESG mediante exclusiones. Excelente relación TER.',
    category: 'ESG Screened - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'V3DL': {
    name: 'Vanguard ESG Developed Europe All Cap UCITS ETF (EUR) Distributing',
    ticker: 'V3DL',
    isin: 'IE000NRGX9M3',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que replica el índice FTSE Developed Europe All Cap Choice. Cubre large, mid y small cap stocks europeos filtrados por criterios ESG. Distribución trimestral de dividendos. Bajo TER de Vanguard. Excelente diversificación.',
    category: 'ESG All Cap - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'dividendos']
  },
  'XZEU': {
    name: 'Xtrackers MSCI Europe ESG UCITS ETF 1C (Distributing)',
    ticker: 'XZEU',
    isin: 'IE00BFMNHK08',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que replica el índice MSCI Europe Low Carbon SRI Leaders. Selecciona large y mid-cap con bajas emisiones de carbono y altas puntuaciones ESG. Distribución anual de dividendos. De DWS/Xtrackers.',
    category: 'Low Carbon ESG - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'climatico']
  },
  'EMNU': {
    name: 'iShares MSCI Europe ESG Enhanced CTB UCITS ETF EUR (Dist)',
    ticker: 'EMNU',
    isin: 'IE00BHZPJ676',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que implementa la estrategia MSCI ESG Enhanced CTB (Climate Transition Benchmark). Combinación de selección ESG y métricas de transición climática. Distribución semestral. Una de las mayores opciones europeas en su categoría.',
    category: 'ESG Enhanced CTB - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'climatico']
  },
  'LYY9': {
    name: 'Lyxor MSCI Europe ESG Climate Transition CTB UCITS ETF - Acc',
    ticker: 'LYY9',
    isin: 'LU2056738490',
    ter: '0.15%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que replica el índice MSCI Europe ESG Climate Transition CTB Select. Enfocado en transición climática según directivas europeas. Selecciona securities según criterios de sostenibilidad y directrices UE sobre protección climática. 15 países europeos.',
    category: 'Climate Transition CTB - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'climatico']
  },
  'LESE': {
    name: 'Lyxor MSCI EMU ESG Trend Leaders (DR) UCITS ETF - Acc',
    ticker: 'LESE',
    isin: 'LU1792117340',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que replica el índice MSCI EMU Select ESG Rating and Trend Leaders. Selecciona empresas con perfil ESG robusto y tendencia positiva a mejorar. Cubre large y mid-cap de 10 países de la Eurozona. Excluye sectores ESG sensibles.',
    category: 'ESG Trend Leaders - Eurozona',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'DXDV': {
    name: 'SPDR S&P Euro Dividend Aristocrats Screened UCITS ETF EUR (Dist)',
    ticker: 'DXDV',
    isin: 'IE00BYTH5T38',
    ter: '0.30%',
    type: 'RENTA_VARIABLE',
    description: 'ETF que replica el índice S&P Euro High Yield Dividend Aristocrats Screened. Compañías de la Eurozona con dividendos crecientes en 10 años consecutivos, filtrados por criterios ESG. Enfoque en generación de ingresos. Distribución semestral.',
    category: 'Dividendos ESG - Eurozona',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'dividendos', 'ingresos']
  },
  'XDG7': {
    name: 'Xtrackers MSCI Global SDG 7 Affordable and Clean Energy UCITS ETF',
    ticker: 'XDG7',
    isin: 'IE000JZYIUN0',
    ter: '0.35%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI ACWI IMI SDG 7 Affordable Clean Energy Select: alineado ONU SDG 7. Selecciona empresas contribuyen energía asequible y limpia. 84 holdings. MÁS BAJO TER (0.35%). ESG filtrado.',
    category: 'SDG 7 Energía Limpia Asequible',
    risk: 'Alto',
    recommended_for: ['verde', 'renovables', 'avanzado', 'crecimiento', 'tematico', 'global', 'impacto']
  },
  'CEUG': {
    name: 'Amundi MSCI Europe ESG Broad Transition UCITS ETF - EUR (C)',
    ticker: 'CEUG',
    isin: 'LU1681042609',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe ESG Broad CTB Select: ESG Broad Transition. Enfoque amplio de transición climática según directivas UE. Large, mid y small-cap. 374 holdings. Acumulación.',
    category: 'Climate Transition CTB - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'climatico']
  },
  'ES50': {
    name: 'iShares EURO STOXX 50 ESG UCITS ETF',
    ticker: 'ES50',
    isin: 'IE00BF4G6T16',
    ter: '0.10%',
    type: 'RENTA_VARIABLE',
    description: 'EURO STOXX 50 ESG variant de iShares. Top 50 grandes empresas de Eurozona con ESG. Acumulación de dividendos. TER ultra competitivo (0.10%).',
    category: 'Large Cap ESG - Eurozona',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'V3EA': {
    name: 'Vanguard ESG Developed Europe All Cap UCITS ETF (EUR) Accumulating',
    ticker: 'V3EA',
    isin: 'IE000NRGX9M3',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'Versión acumulación de V3DL. Misma estrategia: FTSE All Cap Choice. 982 holdings. Large, mid y small-cap. Acumulación. Máxima diversificación ESG.',
    category: 'ESG All Cap - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'LGEU': {
    name: 'L&G Europe ex UK Equity UCITS ETF',
    ticker: 'LGEU',
    isin: 'IE00BFXR5V83',
    ter: '0.10%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Core Developed Europe ex UK. ESG mediante exclusiones: sin carbón, armas, incumplientes UN Global Compact. 328 holdings.',
    category: 'ESG Screened Ex-UK - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'ZPDX': {
    name: 'SPDR STOXX Europe 600 SRI UCITS ETF',
    ticker: 'ZPDX',
    isin: 'IE00BN6J8L32',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'STOXX Europe 600 SRI: 200 empresas de 600 base. Exclusiones amplias (alcohol, juego, armas) + emission intensity. Best-in-class ESG por sector. Amplia cobertura (2.500M EUR).',
    category: 'SRI Screened - Europa Amplia',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  'IEPX': {
    name: 'Invesco MSCI Europe ESG Climate Paris Aligned UCITS ETF Acc',
    ticker: 'IEPX',
    isin: 'IE000TI21P14',
    ter: '0.16%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe ESG Climate PARIS ALIGNED Benchmark. Alineado Acuerdo de París. Criterios ESG + directrices climáticas UE. 226 holdings. Acumulación.',
    category: 'Paris Aligned - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'climatico']
  },
  'JPUE': {
    name: 'JPMorgan Europe Research Enhanced Index Equity (ESG) UCITS ETF EUR',
    ticker: 'JPUE',
    isin: 'IE00BF4G7183',
    ter: '0.23%',
    type: 'RENTA_VARIABLE',
    description: 'GESTIÓN ACTIVA: sobrepondera empresas European con fuerte ESG. 146 holdings selectos. Objetivo: superar MSCI Europe. Acumulación.',
    category: 'ESG Enhanced Activo - Europa',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible', 'crecimiento']
  },
  'LGEE': {
    name: 'L&G Europe Equity (Responsible Exclusions) UCITS ETF EUR',
    ticker: 'LGEE',
    isin: 'DE000A2PWZC9',
    ter: '0.16%',
    type: 'RENTA_VARIABLE',
    description: 'Foxberry Sustainability Consensus Europe. ESG mediante exclusiones según directivas clima UE. Acumulación. Muestreo. Enfoque sostenibilidad integral.',
    category: 'ESG Responsible Exclusions',
    risk: 'Medio',
    recommended_for: ['esg', 'europa', 'moderado', 'sostenible']
  },
  // ISHARES MSCI USA ESG ENHANCED CTB - EL MÁS GRANDE
  'EDMU': {
    name: 'iShares MSCI USA ESG Enhanced CTB UCITS ETF USD (Acc)',
    ticker: 'EDMU',
    isin: 'IE00BHZPJ908',
    ter: '0.07%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI USA ESG Enhanced Focus CTB: máxima exposición ESG + bajo carbono. 494 holdings. El SEGUNDO MÁS GRANDE (7.461M EUR). TER ultra bajo (0.07%). Acumulación.',
    category: 'ESG Enhanced CTB USA',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible', 'climatico']
  },

  // AMUNDI S&P 500 SCREENED
  'F500': {
    name: 'Amundi S&P 500 Screened UCITS ETF Acc',
    ticker: 'F500',
    isin: 'IE000KXCEXR3',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 Scored & Screened+: ESG Screened S&P 500. 312 holdings. MÁS GRANDE (3.924M EUR). Replicación completa. Buen TER (0.12%). Acumulación.',
    category: 'S&P 500 ESG Screened',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },

  // ISHARES MSCI USA ESG SCREENED
  'GPSA': {
    name: 'iShares MSCI USA ESG Screened UCITS ETF USD (Acc)',
    ticker: 'GPSA',
    isin: 'IE00BFNM3G45',
    ter: '0.07%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI USA ESG Screened: Russell 1000 ESG filtrado. 400+ holdings. Ultra bajo TER (0.07%). EL MÁS BARATO. Large-cap USA puro con ESG. Acumulación.',
    category: 'MSCI USA ESG Screened',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },

  // ISHARES S&P 500 SCORED & SCREENED
  'ESPX': {
    name: 'iShares S&P 500 Scored and Screened UCITS ETF USD (Acc)',
    ticker: 'ESPX',
    isin: 'IE000R9FA4A0',
    ter: '0.07%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 Scored & Screened: ESG Leaders de S&P 500. 319 holdings. Ultra bajo TER (0.07%). Sector allocation alineado S&P 500. Acumulación.',
    category: 'S&P 500 Scored & Screened',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },
  // XTRACKERS S&P 500 SCORED & SCREENED
  'XZSP': {
    name: 'Xtrackers S&P 500 Scored & Screened UCITS ETF 1C',
    ticker: 'XZSP',
    isin: 'IE0007ULOZS8',
    ter: '0.08%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 Scored & Screened: 321 holdings. TER bajo (0.08%). DWS/Xtrackers. Sector allocation alineado. Acumulación. Alternativa Xtrackers a iShares/Amundi.',
    category: 'S&P 500 ESG Screened',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },

  // BNP PARIBAS EASY S&P 500 SCREENED
  'SPEA': {
    name: 'BNP Paribas Easy S&P 500 Scored and Screened UCITS ETF EUR Acc',
    ticker: 'SPEA',
    isin: 'IE0004J37T45',
    ter: '0.13%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 Scored & Screened EUR Hedged: 319 holdings. TER moderado (0.13%). Cobertura EUR. Acumulación. Opción con cobertura de divisas.',
    category: 'S&P 500 ESG Hedged EUR',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },

  // XTRACKERS S&P 500 EQUAL WEIGHT ESG
  'XZEW': {
    name: 'Xtrackers S&P 500 Equal Weight Scored & Screened UCITS ETF 1C',
    ticker: 'XZEW',
    isin: 'IE0004MFRED4',
    ter: '0.17%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 Equal Weight Scored & Screened: ponderación IGUAL todos holdings (no market-cap). 288 holdings. ESG + Estrategia Value. Acumulación.Todas las acciones con el mismo peso',
    category: 'S&P 500 Equal Weight ESG',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible', 'valor']
  },

  // VANGUARD ESG NORTH AMERICA ALL CAP
  'V3YA': {
    name: 'Vanguard ESG North America All Cap UCITS ETF (USD) Accumulating',
    ticker: 'V3YA',
    isin: 'IE000O58J820',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'FTSE North America All Cap Choice: large, mid y small-cap USA + Canadá con ESG. 1.432 holdings. MÁXIMA DIVERSIFICACIÓN. Acumulación.',
    category: 'North America All Cap ESG',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },
  // AMUNDI S&P 500 SCREENED EUR HEDGED
  'S500H': {
    name: 'Amundi S&P 500 Screened UCITS ETF Acc EUR Hedged',
    ticker: 'S500H',
    isin: 'IE00058MW3M8',
    ter: '0.28%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 Scored & Screened EUR Hedged: 312 holdings. TER más alto (0.28%) por cobertura EUR. Para inversores que quieren riesgo de divisa cero.',
    category: 'S&P 500 ESG Hedged EUR',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },
  // ISHARES EURO GREEN BONDS DISTRIBUCIÓN
  'GRON': {
    name: 'iShares EUR Green Bond UCITS ETF EUR (Dist)',
    ticker: 'GRON',
    isin: 'IE00BMDBMN04',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Green Bond SRI: EUR bonos verdes. 690 holdings. 92M EUR. MEJOR TER (0.20%). Distribución semestral. Investment Grade EUR.',
    category: 'Euro Green Bonds Dist',
    risk: 'Bajo-Medio',
    recommended_for: ['verde', 'bonos', 'conservador', 'moderado', 'ingresos']
  },

  // ISHARES EURO GREEN BONDS ACUMULACIÓN
  'CBUP': {
    name: 'iShares EUR Green Bond UCITS ETF EUR (Acc)',
    ticker: 'CBUP',
    isin: 'IE000IZO7033',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Green Bond SRI: EUR bonos verdes acumulación. 690 holdings. 35M EUR. BAJO TER (0.20%). Acumulación. Reinversión dividendos.',
    category: 'Euro Green Bonds Acc',
    risk: 'Bajo-Medio',
    recommended_for: ['verde', 'bonos', 'conservador', 'moderado', 'ingresos']
  },

  // ISHARES S&P 500 SCORED & SCREENED EUR HEDGED
  'CBUM': {
    name: 'iShares S&P 500 Scored and Screened UCITS ETF EUR Hedged (Acc)',
    ticker: 'CBUM',
    isin: 'IE000CR7DJI8',
    ter: '0.10%',
    type: 'RENTA_VARIABLE',
    description: 'S&P 500 Scored & Screened EUR Hedged: 319 holdings. TER bajo (0.10%) con cobertura EUR. Alternativa iShares hedged. Acumulación.',
    category: 'S&P 500 ESG Hedged EUR',
    risk: 'Medio',
    recommended_for: ['esg', 'usa', 'moderado', 'sostenible']
  },
  // ISHARES MSCI EM ESG ENHANCED CTB - 2º MÁS GRANDE
  'EMGC': {
    name: 'iShares MSCI EM ESG Enhanced CTB UCITS ETF USD (Acc)',
    ticker: 'EMGC',
    isin: 'IE00BHZPJ239',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM ESG Enhanced Focus CTB: máxima exposición ESG + bajo carbono emergentes. 1.038 holdings. 2º MÁS GRANDE (6.007M EUR). ESG + Climate transition. Acumulación.',
    category: 'EM ESG Enhanced CTB',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento', 'climatico']
  },

  // AMUNDI MSCI EMERGING ESG LEADERS
  'SADM': {
    name: 'Amundi MSCI Emerging ESG Leaders - UCITS ETF DR (C)',
    ticker: 'SADM',
    isin: 'LU2109787551',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM Extended ESG Leaders 5% Cap: ESG Leaders puros de EM. 412 holdings. Ponderación máxima 5% por empresa. Acumulación.',
    category: 'EM ESG Leaders',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento']
  },

  // XTRACKERS MSCI EMERGING MARKETS ESG
  'XZEM': {
    name: 'Xtrackers MSCI Emerging Markets ESG UCITS ETF 1C',
    ticker: 'XZEM',
    isin: 'IE00BG370F43',
    ter: '0.25%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM Low Carbon SRI Selection: ESG + bajo carbono EM. 333 holdings. 3º más grande (1.442M EUR). Enfoque Low Carbon SRI. Acumulación.',
    category: 'EM Low Carbon SRI',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento', 'climatico']
  },
  // AMUNDI MSCI EMERGING MARKETS ESG BROAD TRANSITION
  'EAMB': {
    name: 'Amundi MSCI Emerging Markets ESG Broad Transition UCITS ETF DR',
    ticker: 'EAMB',
    isin: 'LU2109787049',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM ESG Broad CTB Select: ESG Broad Transition Climate. Transición climática EM según directivas UE. Acumulación. ESG transición completa.',
    category: 'EM ESG Broad CTB',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento', 'climatico']
  },
  // HSBC GLOBAL ESG SHORT DURATION 1-3 AÑOS
  'HSUE': {
    name: 'HSBC Bloomberg Global ESG Aggregate 1-3 Year Bond UCITS ETF USD',
    ticker: 'HSUE',
    isin: 'IE000XGNMWE1',
    ter: '0.18%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Global Aggregate 1-3 SRI: bonos corto plazo (1-3Y) ESG. Bajo riesgo duración. Acumulación. ESG + Bajo Carbono.',
    category: 'Global ESG Bonds Short Duration',
    risk: 'Bajo',
    recommended_for: ['verde', 'bonos', 'conservador', 'moderado', 'ingresos', 'global']
  },

  // HSBC DEVELOPMENT BANK BONDS - ULTRA SEGURO (AAA)
  'HDBA': {
    name: 'HSBC Global Sustainable Development Bank Bonds UCITS ETF',
    ticker: 'HDBA',
    isin: 'IE000L6BRPZ8',
    ter: '0.15%',
    type: 'RENTA_FIJA',
    description: 'FTSE Dev Bank Bonds: bonos bancos de desarrollo multilaterales (ADB, IADB, World Bank). 95 holdings. Desarrollo sostenible. Acumulación.',
    category: 'Development Bank Bonds',
    risk: 'Bajo',
    recommended_for: ['verde', 'bonos', 'conservador', 'moderado', 'ingresos', 'impacto']
  },

  // FRANKLIN SUSTAINABLE EURO GREEN BONDS
  'NV5': {
    name: 'Franklin Sustainable Euro Green Bond UCITS ETF',
    ticker: 'NV5',
    isin: 'IE0001JJF0Q9',
    ter: '0.25%',
    type: 'RENTA_FIJA',
    description: 'Empresas + gobiernos EUR bonos verdes. Mínimo 75% verde + bonos sostenibles. Acumulación. Franklin enfoque activo-pasivo. EUR naturales.',
    category: 'Sustainable Euro Green Bonds',
    risk: 'Bajo-Medio',
    recommended_for: ['verde', 'bonos', 'conservador', 'moderado', 'ingresos']
  },
  // BNP PARIBAS JPM GREEN SOCIAL & SUSTAINABILITY
  'GSSBD': {
    name: 'BNP Paribas Easy JPM ESG Green Social & Sustainability IG EUR Bond UCITS ETF Acc',
    ticker: 'GSSBD',
    isin: 'LU2365458814',
    ter: '0.25%',
    type: 'RENTA_FIJA',
    description: 'JPMorgan ESG Green Social & Sustainability IG EUR: EUR bonos verdes + sociales. Paris Aligned focus. Full replication. Acumulación.',
    category: 'ESG Green Social Bonds EUR',
    risk: 'Bajo-Medio',
    recommended_for: ['social', 'bonos', 'conservador', 'moderado', 'impacto']
  },
  // AMUNDI EUR CORPORATE BOND ESG 1-5Y - MÁS GRANDE
  'A4H7': {
    name: 'Amundi EUR Corporate Bond 1-5Y ESG UCITS ETF DR',
    ticker: 'A4H7',
    isin: 'LU1525418643',
    ter: '0.20%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Euro Corporate 1-5Y ESG: bonos corporativos EUR ESG. MÁS GRANDE. Duración 1-5 años. Acumulación.',
    category: 'Corporate ESG EUR 1-5Y',
    risk: 'Bajo-Medio',
    recommended_for: ['social', 'bonos', 'conservador', 'moderado', 'ingresos']
  },
  // AMUNDI EX-FINANCIALS
  'LYBF': {
    name: 'Amundi EUR Corporate Bond ex-Financials ESG UCITS ETF Acc',
    ticker: 'LYBF',
    isin: 'LU1829218822',
    ter: '0.14%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI EUR Corporate ex-Financials ESG: excluye sector financiero. 776 holdings. ESG Leaders. BAJO TER (0.14%). Acumulación.',
    category: 'EUR Corp ex-Financials ESG',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'bonos', 'europa', 'conservador', 'moderado']
  },
  // ISHARES USD CORPORATE SHORT DURATION 0-3Y
  'SNAV': {
    name: 'iShares USD Corporate Bond 0-3yr ESG SRI UCITS ETF USD (Dist)',
    ticker: 'SNAV',
    isin: 'IE00BZ048579',
    ter: '0.12%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI US Corporate 0-3Y ESG: USD bonos corporativos corto plazo ESG. Distribución semestral.',
    category: 'US Corporate ESG Short 0-3Y',
    risk: 'Bajo',
    recommended_for: ['social', 'bonos', 'conservador', 'moderado', 'ingresos']
  },

  // HSBC SUSTAINABLE GOVERNMENT BONDS
  'HGVT': {
    name: 'HSBC Global Sustainable Government Bond UCITS ETF C EUR Hedged',
    ticker: 'HGVT',
    isin: 'IE000389GTC0',
    ter: '0.15%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Global Treasury ESG Weighted EUR Hedged: bonos gubernamentales sostenibles. Bonos soberanos, supranacionales. EUR Hedged. Acumulación.',
    category: 'Sustainable Government Bonds',
    risk: 'Bajo',
    recommended_for: ['social', 'bonos', 'conservador', 'moderado', 'impacto']
  },

  // UMWELTBANK GREEN & SOCIAL BONDS 0-5Y
  'FJ7E': {
    name: 'UmweltBank UCITS ETF - Green & Social Bonds Euro 0-5Y',
    ticker: 'FJ7E',
    isin: 'LU3093383670',
    ter: '0.50%',
    type: 'RENTA_FIJA',
    description: 'Solactive UmweltBank Green & Social Bond EUR IG 0-5Y: EUR bonos verdes + sociales. 0-5 años duración. 103M EUR. Distribución anual. ESG + Desarrollo sostenible.',
    category: 'Green & Social Bonds 0-5Y',
    risk: 'Bajo',
    recommended_for: ['social', 'bonos', 'conservador', 'moderado', 'impacto']
  },

  // HSBC GLOBAL AGGREGATE BOND ESG
  'HGAB': {
    name: 'HSBC Global Aggregate Bond ESG UCITS ETF Acc',
    ticker: 'HGAB',
    isin: 'IE000Q0X08R9',
    ter: '0.12%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Global Aggregate SRI Carbon ESG-Weighted: global agregado ESG. Govs, corporativos, securitizados. ESG + bajo carbono. 12M EUR. Acumulación.',
    category: 'Global Aggregate ESG',
    risk: 'Bajo-Medio',
    recommended_for: ['social', 'bonos', 'conservador', 'moderado', 'ingresos', 'impacto']
  },
  // BNP PARIBAS EUR CORPORATE SUSTAINABLE
  'BPSE': {
    name: 'BNP Paribas Easy Sustainable EUR Corporate Bond UCITS ETF Distribution',
    ticker: 'BPSE',
    isin: 'LU2697596828',
    ter: '0.18%',
    type: 'RENTA_FIJA',
    description: 'GESTIÓN ACTIVA: EUR corporativos sostenibles. ESG filtered corporativos EUR. 455 holdings. 2M EUR. Distribución anual. Paris Aligned focus.',
    category: 'EUR Corporate Sustainable',
    risk: 'Bajo-Medio',
    recommended_for: ['esg', 'sostenible', 'bonos', 'conservador', 'ingresos']
  },

  // UBS DEVELOPMENT BANK SUSTAINABLE - ULTRA SEGURO (AAA)
  'USDB': {
    name: 'UBS Sustainable Development Bank Bonds UCITS ETF hEUR dis',
    ticker: 'USDB',
    isin: 'LU1852211645',
    ter: '0.18%',
    type: 'RENTA_FIJA',
    description: 'Solactive Development Bank Bond: bonos bancos desarrollo. Multilateral dev banks (World Bank, ADB, IADB). SDG oriented. AAA rating. EUR Hedged. Distribución semestral.',
    category: 'Dev Bank Sustainable',
    risk: 'Bajo',
    recommended_for: ['esg', 'sostenible', 'bonos', 'conservador', 'ingresos', 'impacto']
  },

  // VANGUARD GLOBAL ESG CORPORATE HEDGED EUR
  'V3GF': {
    name: 'Vanguard ESG Global Corporate Bond UCITS ETF EUR Hedged Acc',
    ticker: 'V3GF',
    isin: 'IE00BNDS1P30',
    ter: '0.15%',
    type: 'RENTA_FIJA',
    description: 'Bloomberg MSCI Global Corporate ESG Screened EUR Hedged: global corporativos ESG con cobertura EUR. 4.811 holdings. 360M EUR. BAJO TER (0.15%). Acumulación.',
    category: 'Global ESG Corp Hedged EUR',
    risk: 'Bajo-Medio',
    recommended_for: ['social', 'bonos', 'conservador', 'moderado', 'impacto']
  },
  // INVESCO MSCI EMERGING MARKETS ESG CLIMATE PARIS ALIGNED
  'EMPA': {
    name: 'Invesco MSCI Emerging Markets ESG Climate Paris Aligned UCITS ETF Acc',
    ticker: 'EMPA',
    isin: 'IE000PJL7R74',
    ter: '0.19%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM ESG Climate Paris Aligned: alineado Acuerdo de París EM. 278 holdings. Métricas climáticas UE. ESG + Paris Aligned. Acumulación.',
    category: 'EM Paris Aligned Climate',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento', 'climatico']
  },

  // L&G EMERGING MARKETS ESG EXCLUSIONS PARIS ALIGNED - MEJOR TER
  'EMEA': {
    name: 'L&G Emerging Markets ESG Exclusions Paris Aligned UCITS ETF',
    ticker: 'EMEA',
    isin: 'IE000XJQPEY2',
    ter: '0.15%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive L&G ESG Exclusions EM Paris Aligned: bajo carbono EM con exclusiones ESG. Aligned Paris. Acumulación. Excelente TER (0.15%).',
    category: 'EM Paris Aligned ESG',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento', 'climatico']
  },

  // VANGUARD ESG EMERGING MARKETS ALL CAP - MÁXIMA DIVERSIFICACIÓN
  'V3MA': {
    name: 'Vanguard ESG Emerging Markets All Cap UCITS ETF (USD) Accumulating',
    ticker: 'V3MA',
    isin: 'IE000KPJJWM6',
    ter: '0.19%',
    type: 'RENTA_VARIABLE',
    description: 'FTSE Emerging All Cap Choice: large, mid y small-cap EM con ESG. 3.727 holdings. MÁXIMA DIVERSIFICACIÓN. Cobertura completa EM. Acumulación.',
    category: 'EM All Cap ESG',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento']
  },

  // ISHARES MSCI EM IMI ESG SCREENED
  'SAEM': {
    name: 'iShares MSCI EM IMI ESG Screened UCITS ETF USD (Acc)',
    ticker: 'SAEM',
    isin: 'IE000IFO5MZ0',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM IMI ESG Screened: IMI (Index Market Index) incluye large, mid, small-cap EM ESG. ESG Screened mediante exclusiones. Acumulación.',
    category: 'EM IMI ESG Screened',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento']
  },

  // ISHARES MSCI EM ESG ENHANCED INC - MÁS GRANDE + DISTRIBUCIÓN
  'EGDM': {
    name: 'iShares MSCI EM ESG Enhanced UCITS ETF Inc',
    ticker: 'EGDM',
    isin: 'IE00BHZPJ122',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM ESG Enhanced: ESG Enhanced EM version distribución. 1.084 holdings. Muy similar a EMGC pero con distribución de dividendos. Distribución anual.',
    category: 'EM ESG Enhanced',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento', 'dividendos']
  },

  // AMUNDI CORE MSCI EMERGING MARKETS
  'EMIM': {
    name: 'Amundi Core MSCI Emerging Markets UCITS ETF Acc',
    ticker: 'EMIM',
    isin: 'LU1437017350',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI EM: core sin tanto filtrado ESG pero con opciones de ESG. 914 holdings. Core EM con opcionalidad. Acumulación. Más tradicional.',
    category: 'EM Core',
    risk: 'Alto',
    recommended_for: ['esg', 'emergentes', 'avanzado', 'crecimiento']
  },
  // AMUNDI WORLD CLIMATE PARIS ALIGNED - MÁS GRANDE
  'PABW': {
    name: 'Amundi MSCI World Climate Paris Aligned UCITS ETF Acc',
    ticker: 'PABW',
    isin: 'IE000CL68Z69',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI World Climate Paris Aligned: alineado Acuerdo de París. Empresas beneficiadas transición bajo carbono. EU Climate directives. 502 holdings. EL MÁS GRANDE (1.816M EUR). Acumulación.',
    category: 'World Climate Paris Aligned',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'global']
  },

  // ISHARES MSCI WORLD CLIMATE TRANSITION AWARE ACC
  'WCTA': {
    name: 'iShares MSCI World Climate Transition Aware UCITS ETF USD (Acc)',
    ticker: 'WCTA',
    isin: 'IE0001YGXFO5',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI World Transition Aware Select: empresas contribuyendo transición climática. ESG filtered. 770 holdings. Cobertura global desarrollados. Acumulación.',
    category: 'World Climate Transition Aware',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'global']
  },

  // ISHARES MSCI WORLD CLIMATE TRANSITION AWARE DIST
  'WCTD': {
    name: 'iShares MSCI World Climate Transition Aware UCITS ETF USD (Dist)',
    ticker: 'WCTD',
    isin: 'IE000YNE6S57',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI World Transition Aware Select versión distribución. 768 holdings. Misma estrategia que WCTA pero con dividendos semestrales. Distribución semestral.',
    category: 'World Climate Transition Aware',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'global', 'dividendos']
  },

  // AMUNDI MSCI WORLD CLIMATE TRANSITION CTB
  'LWCR': {
    name: 'Amundi MSCI World Climate Transition CTB UCITS ETF DR EUR (C)',
    ticker: 'LWCR',
    isin: 'LU1602144229',
    ter: '0.25%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI World Climate Change CTB Select: transición bajo carbono global. Empresas beneficiadas economía baja carbono. 1.223 holdings. Máxima diversificación. Acumulación.',
    category: 'World Climate Transition CTB',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'global']
  },
  // JPMORGAN CARBON TRANSITION GLOBAL EQUITY
  'JPTC': {
    name: 'JPMorgan Carbon Transition Global Equity (CTB) UCITS ETF EUR (acc)',
    ticker: 'JPTC',
    isin: 'IE0009TJ5T70',
    ter: '0.19%',
    type: 'RENTA_VARIABLE',
    description: 'JPMorgan Carbon Transition: compañías beneficiadas transición bajo carbono. 370 holdings. Solactive JPM Asset Management index. ESG + Carbono. Acumulación.',
    category: 'JPM Carbon Transition Global',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'global']
  },

  // JPMORGAN CARBON TRANSITION EUR HEDGED
  'JPHC': {
    name: 'JPMorgan Carbon Transition Global Equity (CTB) UCITS ETF EUR Hedged (acc)',
    ticker: 'JPHC',
    isin: 'IE000W95TAE6',
    ter: '0.19%',
    type: 'RENTA_VARIABLE',
    description: 'JPMorgan Carbon Transition EUR Hedged: misma estrategia con cobertura EUR. 370 holdings. Sin riesgo divisa USD. Acumulación.',
    category: 'JPM Carbon Transition Hedged',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'global']
  },
  // XTRACKERS MSCI USA CLIMATE ACTION
  'USCA': {
    name: 'MSCI USA Climate Action UCITS ETF (Xtrackers)',
    ticker: 'USCA',
    isin: 'IE000O58FNXA',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI USA Climate Action: empresas USA líderes transición climática. 220 holdings. Enfoque USA puro. Acumulación. Top 50% cada sector por readiness.',
    category: 'USA Climate Action',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'usa']
  },

  // JPMORGAN CLIMATE CHANGE SOLUTIONS - GESTIÓN ACTIVA
  'ZCSA': {
    name: 'JPMorgan Climate Change Solutions UCITS ETF USD (Acc)',
    ticker: 'ZCSA',
    isin: 'IE000O8S1EX4',
    ter: '0.55%',
    type: 'RENTA_VARIABLE',
    description: 'GESTIÓN ACTIVA: JPMorgan selecciona empresas globales soluciones cambio climático. 63 holdings. Enfoque activo temático. TER más alto. Acumulación.',
    category: 'Climate Change Solutions',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'avanzado', 'crecimiento', 'tematico']
  },

  // HSBC NASDAQ GLOBAL CLIMATE TECH
  'CLMT': {
    name: 'HSBC NASDAQ Global Climate Tech UCITS ETF USD (Acc)',
    ticker: 'CLMT',
    isin: 'IE000XC6EVL9',
    ter: '0.50%',
    type: 'RENTA_VARIABLE',
    description: 'NASDAQ CTA Global Climate Technology: empresas tecnología global soluciones climáticas. 122 holdings. Enfoque innovación tecnológica. TER moderado. Acumulación.',
    category: 'Climate Tech Innovation',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'avanzado', 'crecimiento', 'tematico']
  },
  // AMUNDI MSCI WORLD SRI CLIMATE PARIS ALIGNED
  'CSRD': {
    name: 'Amundi MSCI World SRI Climate Paris Aligned UCITS ETF Dist',
    ticker: 'CSRD',
    isin: 'IE000004V778',
    ter: '0.25%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI World SRI Climate Paris Aligned: combinación SRI + Clima + Paris Aligned. Empresas líderes sostenibilidad + transición. Distribución anual. Acumulación.',
    category: 'World SRI Climate Paris',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'esg', 'dividendos']
  },

  // INVESCO MSCI USA ESG CLIMATE PARIS ALIGNED - MEJOR TER
  'IPCA': {
    name: 'Invesco MSCI USA ESG Climate Paris Aligned UCITS ETF Acc',
    ticker: 'IPCA',
    isin: 'IE000RLUE8E9',
    ter: '0.09%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI USA ESG Climate Paris Aligned: USA empresas Paris Aligned. 162 holdings. MUY BAJO TER (0.09%). ESG + Climate + USA. Acumulación.',
    category: 'USA Paris Aligned ESG',
    risk: 'Medio-Alto',
    recommended_for: ['climatico', 'verde', 'moderado', 'avanzado', 'tematico', 'usa']
  },
  // ISHARES MSCI EUROPE PARIS ALIGNED - MEJOR RELACIÓN TAMAÑO/TER
  'CBUA': {
    name: 'iShares MSCI Europe Paris-Aligned Climate UCITS ETF EUR (Acc)',
    ticker: 'CBUA',
    isin: 'IE00BL6K8C82',
    ter: '0.15%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe Climate Paris Aligned Benchmark Select: alineado París. MEJOR RELACIÓN TAMAÑO/TER. Acumulación. Blue chips PAB europeas.',
    category: 'Europe Paris Aligned',
    risk: 'Medio',
    recommended_for: ['climatico', 'europa', 'moderado', 'sostenible']
  },

  // ISHARES MSCI EUROPE PARIS ALIGNED DIST
  '6RF0': {
    name: 'iShares MSCI Europe Paris-Aligned Climate UCITS ETF EUR (Dist)',
    ticker: '6RF0',
    isin: 'IE000HH3SU50',
    ter: '0.15%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe Climate Paris Aligned versión distribución. 269 holdings. Distribución semestral. Dividendos. Acumulación/Dist alternativa.',
    category: 'Europe Paris Aligned Dist',
    risk: 'Medio',
    recommended_for: ['climatico', 'europa', 'moderado', 'sostenible', 'dividendos']
  },
  // AMUNDI MSCI EUROPE SRI CLIMATE PARIS ALIGNED - MÁS GRANDE
  'MIVB': {
    name: 'Amundi MSCI Europe SRI Climate Paris Aligned UCITS ETF DR (C)',
    ticker: 'MIVB',
    isin: 'LU1861137484',
    ter: '0.18%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe SRI Filtered PAB: SRI + Paris Aligned + ESG. 116 holdings ESG Leaders. Acumulación. SRI + PAB combinado.',
    category: 'Europe SRI Paris Aligned',
    risk: 'Medio',
    recommended_for: ['climatico', 'europa', 'moderado', 'sostenible', 'esg']
  },
  // XTRACKERS EUROPE NET ZERO PATHWAY
  'XEPA': {
    name: 'Xtrackers Europe Net Zero Pathway Paris Aligned UCITS ETF 1C',
    ticker: 'XEPA',
    isin: 'IE0001JH5CB4',
    ter: '0.15%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive ISS ESG Europe Net Zero Pathway: Net Zero pathways. Solactive index. Acumulación. Enfoque Net Zero específico.',
    category: 'Europe Net Zero Pathway',
    risk: 'Medio',
    recommended_for: ['climatico', 'europa', 'moderado', 'sostenible']
  },

  // XTRACKERS EMU NET ZERO PATHWAY - EUROZONA PURO
  'XNZE': {
    name: 'Xtrackers EMU Net Zero Pathway Paris Aligned UCITS ETF 1C',
    ticker: 'XNZE',
    isin: 'IE000Y6L6LE6',
    ter: '0.15%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive ISS ESG Eurozone Net Zero Pathway: Net Zero Eurozona puro. Eurozona solamente. Acumulación. Más enfocado.',
    category: 'EMU Net Zero Pathway',
    risk: 'Medio',
    recommended_for: ['climatico', 'europa', 'moderado', 'sostenible']
  },

  // ISHARES MSCI EUROPE CLIMATE TRANSITION AWARE ACC - MEJOR TER
  'ECTA': {
    name: 'iShares MSCI Europe Climate Transition Aware UCITS ETF EUR (Acc)',
    ticker: 'ECTA',
    isin: 'IE000U3XZQN5',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe Transition Aware Select: enfoque transición (no solo PAB). Acumulación. Alternativa menos restrictiva a PAB.',
    category: 'Europe Climate Transition',
    risk: 'Medio',
    recommended_for: ['climatico', 'europa', 'moderado', 'sostenible']
  },

  // ISHARES MSCI EUROPE CLIMATE TRANSITION AWARE DIST
  'ECTD': {
    name: 'iShares MSCI Europe Climate Transition Aware UCITS ETF EUR (Dist)',
    ticker: 'ECTD',
    isin: 'IE000ZQF1PE1',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe Transition Aware versión distribución. 279 holdings. Dividendos + Transición.',
    category: 'Europe Climate Transition Dist',
    risk: 'Medio',
    recommended_for: ['climatico', 'europa', 'moderado', 'sostenible', 'dividendos']
  },
  // UBS GLOBAL GENDER EQUALITY - MEJOR TER + TAMAÑO
  'EGFA': {
    name: 'UBS Global Gender Equality UCITS ETF USD acc',
    ticker: 'EGFA',
    isin: 'IE00BDR5GV14',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Equileap Global Gender Equality 100 Leaders: 100 empresas líderes igualdad género. Ponderación IGUAL. EL MÁS ANTIGUO (desde 2017) Acumulación. ESG + Género.',
    category: 'Gender Equality Leaders',
    risk: 'Medio',
    recommended_for: ['genero', 'social', 'tematico', 'moderado', 'impacto', 'global']
  },

  // AMUNDI GLOBAL GENDER EQUALITY - MÁS HOLDINGS
  'VOOM': {
    name: 'Amundi Global Gender Equality UCITS ETF Acc',
    ticker: 'VOOM',
    isin: 'LU1691909508',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Equileap Global Gender Equality: 155 holdings. ESG + Exclusiones (armas, apuestas, tabaco). Acumulación. Misma filosofía que UBS pero más holdings.',
    category: 'Gender Equality Global',
    risk: 'Medio',
    recommended_for: ['genero', 'social', 'tematico', 'moderado', 'impacto', 'global']
  },
  // MACKENZIE GLOBAL WOMEN'S LEADERSHIP - MÁXIMA DIVERSIFICACIÓN
  'MWMN': {
    name: 'Mackenzie Global Women\'s Leadership ETF',
    ticker: 'MWMN',
    isin: 'CA5649212046',
    ter: '0.50%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Women\'s Leadership Index: liderazgo femenino. Mujeres en puestos directivos + CEO + Junta. Selección cuantitativa + ESG. Global diverso.',
    category: 'Women\'s Leadership',
    risk: 'Medio',
    recommended_for: ['genero', 'social', 'tematico', 'moderado', 'impacto', 'global']
  },

  // IMPACT SHARES WOMEN'S EMPOWERMENT - ENFOQUE USA
  'WOMN': {
    name: 'Impact Shares YWCA Women\'s Empowerment ETF (WOMN)',
    ticker: 'WOMN',
    isin: 'US4525921004',
    ter: '0.75%',
    type: 'RENTA_VARIABLE',
    description: 'Morningstar Women\'s Empowerment Index: empoderamiento femenino. US Large & Mid-cap. Enfoque políticas apoyo mujeres. Impacto social.',
    category: 'Women\'s Empowerment USA',
    risk: 'Medio',
    recommended_for: ['genero', 'social', 'tematico', 'moderado', 'impacto', 'usa']
  },
  // UBS GENDER EQUALITY EUR HEDGED
  'GENEG': {
    name: 'UBS Global Gender Equality UCITS ETF hEUR acc',
    ticker: 'GENEG',
    isin: 'IE00BDR5H073',
    ter: '0.23%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Equileap Gender Equality EUR Hedged: cobertura EUR. 100 holdings. Sin riesgo divisa USD. Acumulación. Para inversores EUR.',
    category: 'Gender Equality Hedged',
    risk: 'Medio',
    recommended_for: ['genero', 'social', 'tematico', 'moderado', 'impacto', 'global']
  },

  // UBS GENDER EQUALITY CHF HEDGED ACC
  'GENDES': {
    name: 'UBS Global Gender Equality UCITS ETF hCHF acc',
    ticker: 'GENDES',
    isin: 'IE00BDR5H412',
    ter: '0.23%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Equileap Gender Equality CHF Hedged: cobertura CHF. 100 holdings. Alineación suiza. Acumulación. Para inversores CHF.',
    category: 'Gender Equality CHF Hedged',
    risk: 'Medio',
    recommended_for: ['genero', 'social', 'tematico', 'moderado', 'impacto', 'global']
  },

  // UBS GENDER EQUALITY CHF HEDGED DIST
  'GENDIS': {
    name: 'UBS Global Gender Equality UCITS ETF hCHF dis',
    ticker: 'GENDIS',
    isin: 'IE00BDR5H305',
    ter: '0.23%',
    type: 'RENTA_VARIABLE',
    description: 'Solactive Equileap Gender Equality CHF Hedged versión distribución. 100 holdings. Distribución semestral. CHF Hedged. Dividendos.',
    category: 'Gender Equality CHF Dist',
    risk: 'Medio',
    recommended_for: ['genero', 'social', 'tematico', 'moderado', 'impacto', 'global', 'dividendos']
  },
  // BNP PARIBAS ECPI CIRCULAR LEADERS - MÁS GRANDE + MEJOR TER
  'ECEL': {
    name: 'BNP Paribas Easy ECPI Circular Economy Leaders UCITS ETF EUR',
    ticker: 'ECEL',
    isin: 'LU1953136527',
    ter: '0.30%',
    type: 'RENTA_VARIABLE',
    description: 'ECPI Circular Economy Leaders Equity: 50 empresas líderes economía circular global. MÁS GRANDE (477M EUR). ECPI rating ponderado igual. BAJO TER (0.30%). Acumulación. Full replication.',
    category: 'Circular Economy Leaders',
    risk: 'Medio-Alto',
    recommended_for: ['tematico', 'verde', 'europa', 'avanzado']
  },
  // XTRACKERS GLOBAL CIRCULAR SDG 12 - UN SUSTAINABLE DEVELOPMENT GOAL
  'XG12': {
    name: 'Xtrackers MSCI Global Circular Economy UCITS ETF 1C',
    ticker: 'XG12',
    isin: 'IE000Y6ZXZ48',
    ter: '0.35%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI ACWI IMI SDG 12 Responsible Consumption: global large/mid/small cap circular. 222 holdings. SDG 12 (Consumo Responsable). ESG filtered. BAJO TER (0.35%). Acumulación.',
    category: 'Global Circular SDG 12',
    risk: 'Medio-Alto',
    recommended_for: ['tematico', 'verde', 'europa', 'avanzado']
  },

  // VANECK CIRCULAR ECONOMY - CONCENTRATED
  'REUS': {
    name: 'VanEck Circular Economy UCITS ETF A',
    ticker: 'REUS',
    isin: 'IE0001J5A2T9',
    ter: '0.40%',
    type: 'RENTA_VARIABLE',
    description: 'MVIS Global Circular Economy ESG Index: global 25 empresas economía circular. ESG filtered. Cap 8% máximo por compañía. BAJO TER (0.40%). Acumulación. Concentrated selection.',
    category: 'VanEck Circular Economy',
    risk: 'Medio-Alto',
    recommended_for: ['tematico', 'verde', 'europa', 'avanzado']
  },
  // WISDOMTREE RECYCLING DECARBONISATION
  'RECY': {
    name: 'WisdomTree Recycling Decarbonisation UCITS ETF USD Acc',
    ticker: 'RECY',
    isin: 'IE000LG4J7E7',
    ter: '0.45%',
    type: 'RENTA_VARIABLE',
    description: 'Tortoise Recycling Decarbonisation Index: reciclaje + gestión residuos + decarbonización. Mín. 20% revenues reciclaje/waste o 20% inversión. Renewable energy from waste. Acumulación.',
    category: 'Recycling & Decarbonisation',
    risk: 'Medio-Alto',
    recommended_for: ['tematico', 'verde', 'europa', 'avanzado']
  },

  // RIZE CIRCULAR ECONOMY ENABLERS - ART. 9 SFDR
  'CYCL': {
    name: 'Rize Circular Economy Enablers UCITS ETF',
    ticker: 'CYCL',
    isin: 'IE000RMSPY39',
    ter: '0.45%',
    type: 'RENTA_VARIABLE',
    description: 'Foxberry SMS Circular Economy Enablers: 100+ empresas que HABILITAN economía circular. EU Taxonomy "Transition to Circular Economy". Products + Services de circularidad. ART. 9 SFDR. MSCI ESG A.',
    category: 'Circular Economy Enablers',
    risk: 'Medio-Alto',
    recommended_for: ['tematico', 'verde', 'europa', 'avanzado']
  },
  // ISHARES MSCI EUROPE SRI DISTRIBUCIÓN
  'IESG': {
    name: 'iShares MSCI Europe SRI UCITS ETF (Dist)',
    ticker: 'IESG',
    isin: 'IE00BGDPWW94',
    ter: '0.20%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe SRI Select Reduced Fossil Fuels distribución: misma estrategia con distribución. 121 holdings. 1.200M EUR. BAJO TER (0.20%). Distribución trimestral (yield 2.26%).',
    category: 'MSCI Europe SRI Dist',
    risk: 'Medio',
    recommended_for: ['esg', 'sostenible', 'europa', 'moderado']
  },
  // VANGUARD ESG EUROPE - FTSE4GOOD
  'VESM': {
    name: 'Vanguard ESG Europe UCITS ETF EUR Accumulating',
    ticker: 'VESM',
    isin: 'IE00B8F5NB52',
    ter: '0.12%',
    type: 'RENTA_VARIABLE',
    description: 'FTSE4Good Europe: Europa líderes ESG FTSE. Bajo TER (0.12%). 150+ holdings. Acumulación. Vanguard low cost approach. ESG universal.',
    category: 'FTSE4Good Europe',
    risk: 'Medio',
    recommended_for: ['esg', 'sostenible', 'europa', 'moderado']
  },
  // AMUNDI MSCI EUROPE ESG UNIVERSAL
  'AEMS': {
    name: 'Amundi MSCI Europe ESG Universal UCITS ETF',
    ticker: 'AEMS',
    isin: 'LU1681042174',
    ter: '0.15%',
    type: 'RENTA_VARIABLE',
    description: 'MSCI Europe ESG Universal: Europa ESG universal (no sectores excluidos). 300+ holdings. Bajo TER (0.15%). Full replication. Mejor cobertura mercado.',
    category: 'MSCI Europe ESG Universal',
    risk: 'Medio',
    recommended_for: ['esg', 'sostenible', 'europa', 'moderado']
  },
  'IB1T.L': {
    name: 'iShares Bitcoin ETP',
    ticker: 'IB1T.L',
    isin: 'XS2940466316',
    ter: '0.15%',
    type: 'CRIPTO',
    description: 'Bitcoin con respaldo físico',
    category: 'Criptomoneda BTC',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'WBIT.DE': {
    name: 'WisdomTree Physical Bitcoin',
    ticker: 'WBIT.DE',
    isin: 'GB00BJYDH287',
    ter: '0.35%',
    type: 'CRIPTO',
    description: 'Bitcoin con respaldo físico',
    category: 'Criptomoneda BTC',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'BTCE.DE': {
    name: 'Bitwise Physical Bitcoin ETP',
    ticker: 'BTCE.DE',
    isin: 'DE000A27Z304',
    ter: '2.00%',
    type: 'CRIPTO',
    description: 'Bitcoin con respaldo físico',
    category: 'Criptomoneda BTC',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  '2BTC.SW': {
    name: '21shares Bitcoin ETP',
    ticker: '2BTC.SW',
    isin: 'CH0454664001',
    ter: '1.49%',
    type: 'CRIPTO',
    description: 'Bitcoin con respaldo físico',
    category: 'Criptomoneda BTC',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'WETH.L': {
    name: 'WisdomTree Physical Ethereum',
    ticker: 'WETH.L',
    isin: 'GB00BJYDH394',
    ter: '0.35%',
    type: 'CRIPTO',
    description: 'Ethereum con respaldo físico y staking',
    category: 'Criptomoneda ETH',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'ETHA.SW': {
    name: '21shares Ethereum Staking ETP',
    ticker: 'ETHA.SW',
    isin: 'CH0454664027',
    ter: '1.49%',
    type: 'CRIPTO',
    description: 'Ethereum con respaldo físico y staking',
    category: 'Criptomoneda ETH',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'ET0X.L': {
    name: 'Global X Ethereum ETP',
    ticker: 'ET0X.L',
    isin: 'GB00BLBDZW12',
    ter: '0.29%',
    type: 'CRIPTO',
    description: 'Ethereum con respaldo físico',
    category: 'Criptomoneda ETH',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'ASOL.SW': {
    name: '21shares Solana Staking ETP',
    ticker: 'ASOL.SW',
    isin: 'CH1114873776',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'Solana con respaldo físico y staking',
    category: 'Criptomoneda SOL',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'BSOL.DE': {
    name: 'Bitwise Solana Staking ETP',
    ticker: 'BSOL.DE',
    isin: 'DE000A4A59D2',
    ter: '0.85%',
    type: 'CRIPTO',
    description: 'Solana con respaldo físico y staking',
    category: 'Criptomoneda SOL',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'AADA.SW': {
    name: '21shares Cardano ETP',
    ticker: 'AADA.SW',
    isin: 'CH1102728750',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'Cardano (ADA) con respaldo físico',
    category: 'Criptomoneda ADA',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'RDAN.DE': {
    name: 'Bitwise Physical Cardano ETP',
    ticker: 'RDAN.DE',
    isin: 'DE000A3GVKY4',
    ter: '2.00%',
    type: 'CRIPTO',
    description: 'Cardano (ADA) con respaldo físico',
    category: 'Criptomoneda ADA',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'ADOT.SW': {
    name: '21shares Polkadot ETP',
    ticker: 'ADOT.SW',
    isin: 'CH0593331561',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'Polkadot (DOT) con respaldo físico',
    category: 'Criptomoneda DOT',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'CDOT.SW': {
    name: 'CoinShares Polkadot Staking ETP',
    ticker: 'CDOT.SW',
    isin: 'GB00BMTP3063',
    ter: '0.00%',
    type: 'CRIPTO',
    description: 'Polkadot con respaldo físico, staking y 0% comisión',
    category: 'Criptomoneda DOT',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  '21XP.SW': {
    name: '21shares XRP ETP',
    ticker: '21XP.SW',
    isin: 'CH0454664043',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'XRP (Ripple) con respaldo físico',
    category: 'Criptomoneda XRP',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'GXRP.DE': {
    name: 'Bitwise Physical XRP ETP',
    ticker: 'GXRP.DE',
    isin: 'DE000A3GYNB0',
    ter: '2.00%',
    type: 'CRIPTO',
    description: 'XRP (Ripple) con respaldo físico',
    category: 'Criptomoneda XRP',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'AVAX.SW': {
    name: '21shares Avalanche Staking ETP',
    ticker: 'AVAX.SW',
    isin: 'CH1135202088',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'Avalanche (AVAX) con respaldo físico y staking',
    category: 'Criptomoneda AVAX',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'AVNB.DE': {
    name: 'Bitwise Avalanche Staking ETP',
    ticker: 'AVNB.DE',
    isin: 'DE000A4APQX6',
    ter: '0.95%',
    type: 'CRIPTO',
    description: 'Avalanche (AVAX) con respaldo físico y staking',
    category: 'Criptomoneda AVAX',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'ALINK.SW': {
    name: '21shares Chainlink ETP',
    ticker: 'ALINK.SW',
    isin: 'CH1100083471',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'Chainlink (LINK) con respaldo físico',
    category: 'Criptomoneda LINK',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'CLTC.DE': {
    name: 'CoinShares Physical Litecoin',
    ticker: 'CLTC.DE',
    isin: 'GB00BLD4ZP54',
    ter: '1.50%',
    type: 'CRIPTO',
    description: 'Litecoin (LTC) con respaldo físico',
    category: 'Criptomoneda LTC',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'ELTC.DE': {
    name: 'Bitwise Physical Litecoin ETP',
    ticker: 'ELTC.DE',
    isin: 'DE000A3GN5J9',
    ter: '2.00%',
    type: 'CRIPTO',
    description: 'Litecoin (LTC) con respaldo físico',
    category: 'Criptomoneda LTC',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'AUNI.SW': {
    name: '21shares Uniswap ETP',
    ticker: 'AUNI.SW',
    isin: 'CH1100083497',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'Uniswap (UNI) con respaldo físico',
    category: 'Criptomoneda UNI',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'POLY.SW': {
    name: '21shares Polygon ETP',
    ticker: 'POLY.SW',
    isin: 'CH1129538448',
    ter: '2.50%',
    type: 'CRIPTO',
    description: 'Polygon (MATIC) con respaldo físico',
    category: 'Criptomoneda MATIC',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'alto_riesgo']
  },
  'HODLV.SW': {
    name: 'WisdomTree Physical Crypto Market ETP',
    ticker: 'HODLV.SW',
    isin: 'GB00BMTP1626',
    ter: '0.70%',
    type: 'CRIPTO',
    description: 'Cesta diversificada de criptomonedas principales',
    category: 'Criptomoneda Diversificado',
    risk: 'Muy Alto',
    recommended_for: ['cripto', 'avanzado', 'diversificacion']
  },


  // ACCIONES POPULARES
  'PLTR': {
    name: 'Palantir Technologies Inc.',
    ticker: 'PLTR',
    isin: 'US69608A1088',
    type: 'STOCK',
    category: 'RENTA_VARIABLE',
    description: 'Palantir Technologies Inc. builds and deploys software platforms for the intelligence community in the United States to assist in counterterrorism investigations and operations.',
    risk: 'Alto',
    recommended_for: ['tecnologia', 'crecimiento', 'avanzado', 'ia']
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
