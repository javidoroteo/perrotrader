import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './styles.css' // ¡Aquí se usa tu archivo de estilos!

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)