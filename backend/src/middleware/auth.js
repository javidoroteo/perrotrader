const jwt = require('jsonwebtoken');

// Middleware para verificar autenticación
const isAuthenticated = (req, res, next) => {
  // Verificar si el usuario está autenticado vía sesión
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // Verificar si hay token JWT en el header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }
  }

  // No autenticado
  return res.status(401).json({
    success: false,
    message: 'No autenticado. Por favor, inicia sesión.'
  });
};

// Middleware opcional: verificar si está autenticado sin bloquear
const checkAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      // Token inválido pero no bloqueamos
      req.user = null;
    }
  }

  next();
};

module.exports = {
  isAuthenticated,
  checkAuth
};
