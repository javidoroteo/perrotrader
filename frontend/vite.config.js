import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Soporte para JSX sin importar React
      babel: {
        plugins: [],
      },
    }),
  ],
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  esbuild: {
    // Configura esbuild para manejar JSX en archivos .js
    include: /\.(js|jsx)$/,
    loader: 'jsx', // Esto especifica que los archivos .js y .jsx se traten como JSX
  },
  css: {
    postcss: './postcss.config.js', // Vincula explícitamente el archivo de PostCSS
  },
});