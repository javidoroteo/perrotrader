require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const quizRoutes = require('./routes/quizRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const personalityRoutes = require('./routes/personalityRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT || 5432;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middlewares de seguridad (primero para bloquear amenazas tempranas)
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production'
  ?{
    directives: {
      defaultSrc: ["'self'"], // Restringe recursos a tu dominio
      scriptSrc: ["'self'"],  // Evita scripts externos (ajusta si usas CDN)
    },
  }
  : false // Desactiva CSP en desarrollo
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000 // máximo 1000 requests por IP (aumentado para generación de PDFs)
});
app.use(limiter);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://www.isfinz.com',
  credentials: true
}));

// Parsing con límites aumentados para PDFs
app.use(express.json({ limit: '10mb' })); // Aumentado para datos de reporte
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware (para debug y monitoreo de errores)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/quiz', quizRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/personality', personalityRoutes);
app.use('/api/report', reportRoutes); // Nueva ruta para PDFs y emails

// Health check (para monitoreo)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      quiz: 'active',
      portfolio: 'active', 
      personality: 'active',
      report: 'active',
      database: 'connected'
    }
  });
});

// Endpoint para obtener todas las sesiones con respuestas y test de personalidad
app.get("/sessions", async (req, res) => {
  try {
    const sessions = await prisma.quizSession.findMany({
      include: {
        answers: true,
        personalityTest: true
      }
    });
    res.json(sessions);
  } catch (error) {
    console.error("Error obteniendo sesiones:", error);
    res.status(500).json({ error: "Error al obtener sesiones" });
  }
});

// Endpoint para obtener estadísticas
app.get("/stats", async (req, res) => {
  try {
    const stats = await prisma.quizStats.findMany();
    res.json(stats);
  } catch (error) {
    console.error("Error obteniendo stats:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /health',
      'GET /sessions', 
      'GET /stats',
      'POST /api/quiz/*',
      'POST /api/portfolio/*',
      'POST /api/personality/*',
      'POST /api/report/*'
    ]
  });
});

// Manejo de errores generales con logging mejorado
app.use((err, req, res, next) => {
  // Log detallado del error
  console.error(`
=== ERROR DETAILS ===
Time: ${new Date().toISOString()}
Method: ${req.method}
Path: ${req.path}
IP: ${req.ip}
User-Agent: ${req.get('user-agent')}
Body: ${JSON.stringify(req.body, null, 2)}
Error: ${err.message}
Stack: ${err.stack}
==================
  `);
  
  res.status(500).json({ 
    error: 'Error interno del servidor',
    timestamp: new Date().toISOString(),
    path: req.path,
    ...(process.env.NODE_ENV === 'development' && { 
      details: err.message,
      stack: err.stack 
    })
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
🚀 IsFinz Server Started Successfully!
📊 Port: ${PORT}
🕒 Time: ${new Date().toISOString()}
🌐 Environment: ${process.env.NODE_ENV || 'development'}

📋 Available Services:
   • Quiz System: /api/quiz/*
   • Portfolio Analysis: /api/portfolio/*  
   • Personality Test: /api/personality/*
   • Reports & Email: /api/report/*
   
💡 New Features Added:
   ✓ PDF Report Generation
   ✓ Email Service with Brevo
   ✓ Practical Investment Guide
   
🔧 Health Check: http://localhost:${PORT}/health
==========================================
  `);
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n🔄 Cerrando servidor...');
  
  try {
    await prisma.$disconnect();
    console.log('✅ Base de datos desconectada');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el cierre:', error);
    process.exit(1);
  }
};

// Manejo de señales de cierre
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error(`
🚨 Unhandled Promise Rejection:
Promise: ${promise}
Reason: ${reason}
  `);
});

process.on('uncaughtException', (error) => {
  console.error(`
🚨 Uncaught Exception:
Error: ${error.message}
Stack: ${error.stack}
  `);
  
  // Cerrar gracefully
  gracefulShutdown();
});

module.exports = app;