const fs = require('fs');
const path = require('path');

// Requiere tu archivo de preguntas
const questions = require('../src/data/questions'); // ajusta la ruta si está en otro lado

let output = 'graph TD\n';

questions.forEach(q => {
  const from = `q${q.id}["${q.question}"]`;

  q.answers?.forEach(answer => {
    if (answer.nextQuestion !== undefined && answer.nextQuestion !== null) {
      const to = `q${answer.nextQuestion}`;
      const label = answer.text.replace(/"/g, "'"); // por si hay comillas
      output += `  q${q.id} -->|${label}| ${to}\n`;
    }
  });
});

const outputPath = path.join(__dirname, 'flujo.mmd');
fs.writeFileSync(outputPath, output);
