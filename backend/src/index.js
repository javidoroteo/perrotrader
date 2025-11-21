require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const quizRoutes = require('./routes/quizRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const personalityRoutes = require('./routes/personalityRoutes');
const financialDetailsRoutes = require('./routes/financialDetailsRoutes');
const productRoutes = require('./routes/productRoutes');
const session = require('express-session');
const passport = require('./config/passport');
const sessionConfig = require('./config/session');
const authRoutes = require('./routes/authRoutes');
const assetRoutes = require('./routes/assetRoutes');
const rebalanceRoutes = require('./routes/rebalanceRoutes');
const priceUpdater = require('./jobs/priceUpdater');
const recommendationRoutes = require('./routes/recommendationRoutes');

console.log('Iniciando conexión con la base de datos...');
let prisma;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
  console.log('Base de datos conectada y lista');
} catch (error) {
  console.error('ERROR CRÍTICO: no se pudo inicializar Prisma Client');
  console.error(error);
  process.exit(1);
}

const getPrisma = () => prisma;

const app = express();
const PORT = process.env.PORT || 8080;
app.set('trust proxy', 1); 

// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production'
    ? {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      }
    : false
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use(limiter);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://www.isfinz.com',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// RUTAS
app.use('/api/quiz', quizRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/personality', personalityRoutes);
app.use('/api/financial-details', financialDetailsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/rebalance', rebalanceRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check robusto y rápido
app.get(['/', '/health', '/ready', '/live'], async (req, res) => {
  try {
    // Prueba rápida a la DB (muy importante para Cloud Run)
    await getPrisma().$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'OK',
      message: 'IsFinz backend vivo y funcionando',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      database: 'connected'
    });
  } catch (error) {
    // Si la DB falla, AÚN devolvemos 200 (Cloud Run solo quiere saber que el server vive)
    console.warn('Health check: DB no responde todavía');
    res.status(200).json({
      status: 'STARTING',
      message: 'Server vivo, base de datos inicializando...',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }
});

// Endpoints adicionales
app.get("/sessions", async (req, res) => {
  try {
    const sessions = await getPrisma().quizSession.findMany({
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

app.get("/stats", async (req, res) => {
  try {
    const stats = await getPrisma().quizStats.findMany();
    res.json(stats);
  } catch (error) {
    console.error("Error obteniendo stats:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
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

//Guardar la referencia del servidor
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 IsFinz Server Started Successfully!
📊 Port: ${PORT}
🕒 Time: ${new Date().toISOString()}
🌐 Environment: ${process.env.NODE_ENV || 'development'}

📋 Available Services:
  • Quiz System: /api/quiz/*
  • Portfolio Analysis: /api/portfolio/*
  • Personality Test: /api/personality/*
  • Authentication: /api/auth/*
  • Assets Search: /api/assets/*
  • Portfolio Rebalance: /api/rebalance/*

💡 New Features Added:
  ✓ PDF Report Generation
  ✓ Email Service with Brevo
  ✓ Practical Investment Guide
  ✓ OAuth Authentication with Google
  ✓ Portfolio Manager [NEW]
  ✓ Asset Search & Recommendations
  ✓ Rebalancing Suggestions
  ✓ Daily Price Updates

🔧 Health Check: http://localhost:${PORT}/health
==========================================
  `);

  // Iniciar cron job de actualización de precios
  if (process.env.ENABLE_PRICE_UPDATER !== 'false') {
    priceUpdater.start();
    console.log('📊 Price updater cron job iniciado (ejecuta diariamente a las 2:00 AM)');
  } else {
    console.log('⚠️  Price updater deshabilitado (set ENABLE_PRICE_UPDATER=true to enable)');
  }
});

// ✅ CORRECCIÓN: Graceful shutdown simplificado y correcto
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} recibido, cerrando servidor gracefully...`);
  
  server.close(async () => {
    console.log('✅ Servidor HTTP cerrado');
    
    try {
      await prisma.$disconnect();
      console.log('✅ Base de datos desconectada');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error desconectando base de datos:', error);
      process.exit(1);
    }
  });

  // Timeout de seguridad: forzar cierre después de 10 segundos
  setTimeout(() => {
    console.error('⏰ Timeout: forzando cierre del proceso');
    process.exit(1);
  }, 10000);
};

// Manejo de señales de cierre
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

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
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

module.exports = app;