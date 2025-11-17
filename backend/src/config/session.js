const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

// Crear pool de conexiones PostgreSQL para sesiones
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const sessionConfig = {
  store: new pgSession({
    pool: pgPool,
    tableName: 'session', // Nombre de la tabla de sesiones
    createTableIfMissing: true // Crea la tabla automáticamente
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
};

module.exports = sessionConfig;
