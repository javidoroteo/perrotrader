import React, { useState } from 'react';
import Quiz from './components/quiz';
import Report from './components/report';

function App() {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Botones para alternar */}
      <div className="p-4 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto flex gap-4 justify-center">
          <button 
            onClick={() => setShowReport(false)}
            className={`px-4 py-2 rounded ${!showReport ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Quiz
          </button>
          <button 
            onClick={() => setShowReport(true)}
            className={`px-4 py-2 rounded ${showReport ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Report
          </button>
        </div>
      </div>
      
      {/* Mostrar solo uno a la vez */}
      {showReport ? <Report /> : <Quiz />}
    </div>
  );
}

export default App;