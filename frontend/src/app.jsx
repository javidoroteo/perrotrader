import React from 'react';
import Quiz from './components/quiz';
import Report from './components/report';
// import Report from './components/report'; // ← Comentado temporalmente

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Quiz />,
      <Report />
    </div>
  );
}

export default App;