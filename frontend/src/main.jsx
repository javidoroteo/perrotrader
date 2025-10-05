import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './styles.css'
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <App />
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
)