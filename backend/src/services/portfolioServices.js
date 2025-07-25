function asegurarPositivos(cartera) {
  Object.keys(cartera).forEach(key => {
    cartera[key] = Math.max(0, cartera[key]);
  });
}

function normalizarCartera(cartera) {
  let total = Object.values(cartera).reduce((acc, val) => acc + val, 0);
  if (total > 100) {
    Object.keys(cartera).forEach(key => {
      cartera[key] = (cartera[key] / total) * 100;
    });
  }
}

function ajustarCarteraPorTiempo(cartera, timeValueGlobal) {
  if (timeValueGlobal === 1) {
    cartera.bonos += 20;
    cartera.acciones -= 10;
  } else if (timeValueGlobal === 2) {
    cartera.bonos += 5;
    cartera.acciones -= 5;
  } else if (timeValueGlobal === 3) {
    cartera.bonos -= 10;
    cartera.acciones += 17;
  } else {
    cartera.bonos -= 15;
    cartera.acciones += 25;
  }
  asegurarPositivos(cartera);
  normalizarCartera(cartera);
}

function ajustarCarteraPorPerfil(cartera, score) {
  let perfilSeleccionado;
  if (score <= 25) {
    perfilSeleccionado = 'Bajo Riesgo';
    cartera.bonos += 20;
    cartera.acciones -= 10;
  } else if (score <= 50) {
    perfilSeleccionado = 'Riesgo Moderado';
    // No hay ajuste
  } else {
    perfilSeleccionado = 'Alto Riesgo';
    cartera.bonos -= 10;
    cartera.acciones += 20;
  }
  asegurarPositivos(cartera);
  normalizarCartera(cartera);
  return perfilSeleccionado;
}

function ajustarCarteraCriptomoneda(cartera, criptoencartera) {
  if (criptoencartera === 0) {
    // No hay ajuste
  } else if (criptoencartera === 1) {
    cartera.acciones -= 5;
    cartera.criptomonedas += 5;
  } else if (criptoencartera === 2) {
    cartera.acciones -= 7;
    cartera.criptomonedas += 7;
  } else if (criptoencartera === 3) {
    cartera.bonos -= 3;
    cartera.acciones -= 7;
    cartera.criptomonedas += 10;
  } else if (criptoencartera === 4) {
    cartera.bonos -= 5;
    cartera.acciones -= 10;
    cartera.criptomonedas += 15;
  } else {
    cartera.bonos -= 8;
    cartera.acciones -= 12;
    cartera.criptomonedas += 20;
  }
  asegurarPositivos(cartera);
  normalizarCartera(cartera);
}

function calculatePortfolio(session) {
  // Cartera base
  const cartera = {
    bonos: 50,
    acciones: 40,
    criptomonedas: 0,
    bonosVerdes: 0,
    efectivo: 10
  };

  // Ajustes según respuestas
  ajustarCarteraPorTiempo(cartera, session.timeValue);
  const perfilSeleccionado = ajustarCarteraPorPerfil(cartera, session.totalScore);
  ajustarCarteraCriptomoneda(cartera, session.cryptoScore);

  asegurarPositivos(cartera);
  normalizarCartera(cartera);

  return {
    riskProfile: perfilSeleccionado,
    allocation: cartera
  };
}

function generateReport(session) {
  let informe = `<p>El fondo de emergencia es muy importante como colchón ante imprevistos y permite al inversor invertir con mucha comodidad el resto de su dinero liquido. 
  El fondo de emergencia no es parte de la liquidez disponible dentro de la cartera.</p>`;
  if (session.emergencyFund === 0) {
    informe += `<p>Si no tienes fondo de emergencia es muy importante que generes uno con los próximos ahorros que dispongas, al menos deberías tener 6 meses de tus gastos ahorrados antes de plantearte invertir.</p>`;
  }
  if (session.emergencyFund === 1) {
    informe += `<p>Bien, tienes un pequeño fondo de emergencia disponible. Lo recomendado es tener 6 meses de gastos ahorrados, pero depende de cada uno.</p>`;
  }
  if (session.emergencyFund === 2) {
    informe += `<p>Genial, tienes alrededror de 5 meses de gastos ahorrados, lo recomendado son 6 meses así que estás listo para invertir tu excedente de ahorro.</p>`;
  }
  if (session.emergencyFund === 3) {
    informe += `<p>Genial, con más de 6 meses tienes un fondo de emergencia amplio, lo recomendable son 6 meses, pero si te sientes más cómodo puedes disponer de más fondo de emergencia. El resto está listo para ser invertido y obtener rentabilidad.</p>`;
  }
  return informe;
}

function generateRecommendations(session) {
  const portfolio = calculatePortfolio(session);
  const explicaciones = [
    `Tu perfil de riesgo es ${portfolio.riskProfile} según tus respuestas.`,
    'La asignación de activos busca equilibrar rentabilidad y seguridad.',
    'Considera revisar tu fondo de emergencia antes de invertir en activos de alto riesgo.'
  ];

  return {
    perfilRiesgo: portfolio.riskProfile,
    cartera: portfolio.allocation,
    explicaciones
  };
}
async function completeFinalResult(session) {
  const portfolio = calculatePortfolio(session);
  const result = {
    riskProfile: portfolio.riskProfile,
    portfolio: portfolio.allocation,
    report: generateReport(session),
    recommendations: generateRecommendations(session)
  };

  return result;
}

module.exports = {
  calculatePortfolio,
  generateReport,
  generateRecommendations,
  completeFinalResult
};