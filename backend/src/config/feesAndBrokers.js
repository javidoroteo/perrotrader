const feesAndBrokers = {
  // ETFs de Renta Variable
  'IWDA.L': {
    symbol: 'IWDA.L',
    fees: {
      ter: 0.20,
      management: 0.20,
      description: 'Comisión de gestión anual del ETF'
    },
    brokers: [
      { 
        name: 'XTB', 
        url: 'https://www.xtb.com/es',
        commission: '0% hasta €100,000/mes',
        pros: 'Sin comisiones hasta €100k, regulación española'
      },
      { 
        name: 'Interactive Brokers', 
        url: 'https://www.interactivebrokers.com/es',
        commission: '0.05% (mín. €1.25)',
        pros: 'Muy bajas comisiones, acceso global'
      },
      { 
        name: 'Trade Republic', 
        url: 'https://traderepublic.com/es',
        commission: '€1 por operación',
        pros: 'App intuitiva, cuenta remunerada'
      }
    ]
  },

  'VWCE.DE': {
    symbol: 'VWCE.DE',
    fees: {
      ter: 0.22,
      management: 0.22,
      description: 'Comisión de gestión anual del ETF'
    },
    brokers: [
      { 
        name: 'XTB', 
        url: 'https://www.xtb.com/es',
        commission: '0% hasta €100,000/mes',
        pros: 'Sin comisiones hasta €100k'
      },
      { 
        name: 'DEGIRO', 
        url: 'https://www.degiro.es',
        commission: '€2 + 0.03%',
        pros: 'Comisiones muy bajas'
      },
      { 
        name: 'eToro', 
        url: 'https://www.etoro.com/es',
        commission: '0% ETFs',
        pros: 'Sin comisiones ETFs'
      }
    ]
  },

  'WQDV.L': {
    symbol: 'WQDV.L',
    fees: {
      ter: 0.38,
      management: 0.38,
      description: 'Comisión del ETF de dividendos'
    },
    brokers: [
      { 
        name: 'Interactive Brokers', 
        url: 'https://www.interactivebrokers.com/es',
        commission: '0.05% (mín. €1.25)',
        pros: 'Acceso global, bajas comisiones'
      },
      { 
        name: 'XTB', 
        url: 'https://www.xtb.com/es',
        commission: '0% hasta €100,000/mes',
        pros: 'Sin comisiones hasta €100k'
      }
    ]
  },

  // ETFs de Renta Fija
  'AGGG.L': {
    symbol: 'AGGG.L',
    fees: {
      ter: 0.10,
      management: 0.10,
      description: 'Una de las comisiones más bajas del mercado'
    },
    brokers: [
      { 
        name: 'XTB', 
        url: 'https://www.xtb.com/es',
        commission: '0% hasta €100,000/mes',
        pros: 'Sin comisiones hasta €100k'
      },
      { 
        name: 'Interactive Brokers', 
        url: 'https://www.interactivebrokers.com/es',
        commission: '0.05% (mín. €1.25)',
        pros: 'Comisiones muy competitivas'
      }
    ]
  },

  'VAGF.L': {
    symbol: 'VAGF.L',
    fees: {
      ter: 0.10,
      management: 0.10,
      description: 'Vanguard - conocido por comisiones bajas'
    },
    brokers: [
      { 
        name: 'DEGIRO', 
        url: 'https://www.degiro.es',
        commission: 'Selección gratuita',
        pros: 'Puede estar en selección gratuita'
      },
      { 
        name: 'XTB', 
        url: 'https://www.xtb.com/es',
        commission: '0% hasta €100,000/mes',
        pros: 'Sin comisiones hasta €100k'
      }
    ]
  },

  // Productos de alto rendimiento
  'GHYG.L': {
    symbol: 'GHYG.L',
    fees: {
      ter: 0.50,
      management: 0.50,
      description: 'Comisión alta por ser alto rendimiento'
    },
    brokers: [
      { 
        name: 'Interactive Brokers', 
        url: 'https://www.interactivebrokers.com/es',
        commission: '0.05% (mín. €1.25)',
        pros: 'Amplio catálogo de productos'
      },
      { 
        name: 'Renta 4', 
        url: 'https://www.r4.com',
        commission: '€7-12',
        pros: 'Banco español, atención personalizada'
      }
    ]
  },

  // Productos por defecto para aquellos no definidos específicamente
  'default': {
    fees: {
      ter: 'Variable',
      management: 'Consultar ficha del producto',
      description: 'Las comisiones varían según el producto específico'
    },
    brokers: [
      { 
        name: 'XTB', 
        url: 'https://www.xtb.com/es',
        commission: '0% hasta €100,000/mes',
        pros: 'Regulación española, sin comisiones hasta €100k'
      },
      { 
        name: 'Interactive Brokers', 
        url: 'https://www.interactivebrokers.com/es',
        commission: '0.05% (mín. €1.25, máx. €29)',
        pros: 'Acceso global, comisiones muy bajas'
      },
      { 
        name: 'DEGIRO', 
        url: 'https://www.degiro.es',
        commission: '€1-2 por operación',
        pros: 'Comisiones bajas, amplio catálogo'
      }
    ]
  }
};

module.exports = feesAndBrokers;
