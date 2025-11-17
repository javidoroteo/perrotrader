require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const quizRoutes = require('./routes/quizRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const personalityRoutes = require('./routes/personalityRoutes');
const reportRoutes = require('./routes/reportRoutes');
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

const app = express();
const PORT = process.env.PORT || 8080;
let prismaInstance = null;
const getPrisma = () => {
  if (!prismaInstance) {
    prismaInstance = require('./utils/prisma');
  }
  return prismaInstance;
};

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
app.use('/api/report', reportRoutes);
app.use('/api/financial-details', financialDetailsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/rebalance', rebalanceRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check
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
      auth: 'active',
      assets: 'active',
      rebalance: 'active',
      database: 'connected',
      priceUpdater: process.env.ENABLE_PRICE_UPDATER !== 'false' ? 'active' : 'disabled'
    }
  });
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
      'POST /api/report/*',
      'POST /api/auth/*',
      'GET /api/assets/*',
      'GET /api/rebalance/*'
    ]
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

// ✅ CORRECCIÓN: Guardar la referencia del servidor
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
  • Reports & Email: /api/report/*
  • Authentication: /api/auth/* [NEW]
  • Assets Search: /api/assets/* [NEW]
  • Portfolio Rebalance: /api/rebalance/* [NEW]

💡 New Features Added:
  ✓ PDF Report Generation
  ✓ Email Service with Brevo
  ✓ Practical Investment Guide
  ✓ OAuth Authentication with Google [NEW]
  ✓ Portfolio Manager [NEW]
  ✓ Asset Search & Recommendations [NEW]
  ✓ Rebalancing Suggestions [NEW]
  ✓ Daily Price Updates [NEW]

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
      await getPrisma().$disconnect();
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
