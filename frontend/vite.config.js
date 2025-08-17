import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Configuración específica para React
      jsxRuntime: 'automatic', // Permite JSX sin importar React
      babel: {
        plugins: []
      }
    })
  ],
  server: {
    port: 5173,
    host: true
  },
  // Asegurar que se resuelvan correctamente los módulos
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})