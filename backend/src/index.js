const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const quizRoutes = require('./routes/quizRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const personalityRoutes = require('./routes/personalityRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de seguridad (primero para bloquear amenazas tempranas)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Restringe recursos a tu dominio
      scriptSrc: ["'self'"],  // Evita scripts externos (ajusta si usas CDN)
    },
  },
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Parsing con límites
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware (para debug y monitoreo de errores)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/quiz', quizRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/personality', personalityRoutes);

// Health check (para monitoreo)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime() 
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error('Error general:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Cierra Prisma al salir
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;