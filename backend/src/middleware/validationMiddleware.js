// backend/src/middleware/validationMiddleware.js

const rateLimit = require('express-rate-limit');

/**
 * Rate limiting específico para endpoints de email
 * Previene spam y abuso del servicio de email
 */
const emailRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 emails por IP cada 15 minutos
  message: {
    error: 'Demasiados intentos de envío de email',
    message: 'Has excedido el límite de envío. Intenta nuevamente en 15 minutos.',
    retryAfter: 900 // 15 minutos en segundos
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Identificador personalizado para tracking
  keyGenerator: (req) => {
    // Combinar IP + email para rate limiting más preciso
    const email = req.body?.email || 'unknown';
    return `${req.ip}_${email}`;
  }
});

/**
 * Rate limiting para generación de PDFs
 * Previene abuso de recursos del servidor
 */
const pdfRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 10, // Máximo 10 PDFs por IP cada 5 minutos
  message: {
    error: 'Demasiadas solicitudes de PDF',
    message: 'Has excedido el límite de generación de PDFs. Intenta nuevamente en 5 minutos.',
    retryAfter: 300
  }
});

/**
 * Middleware para logging de validaciones exitosas
 */
const logValidation = (req, res, next) => {
  const originalJson = res.json;
  
  res.json = function(data) {
    // Log solo si la respuesta es exitosa
    if (res.statusCode < 400) {
      console.log(`✅ Validación exitosa - ${req.method} ${req.path}`, {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        sessionId: req.params.sessionId || req.body.sessionId,
        email: req.body.email ? `${req.body.email.substring(0, 3)}***` : undefined,
        userAgent: req.get('user-agent')?.substring(0, 50)
      });
    }
    
    return originalJson.call(this, data);
  };
  
  next();
};

/**
 * Middleware para sanitizar datos sensibles en logs
 */
const sanitizeLogging = (req, res, next) => {
  // Crear copia sanitizada del body para logging
  if (req.body && req.body.email) {
    req.sanitizedBody = {
      ...req.body,
      email: req.body.email.replace(/(.{3}).*@/, '$1***@') // Ocultar parte del email
    };
  }
  
  next();
};

/**
 * Middleware para detectar emails sospechosos
 */
const detectSuspiciousEmails = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) return next();
  
  const suspiciousPatterns = [
    /test@test\./,
    /admin@/,
    /noreply@/,
    /postmaster@/,
    /@localhost/,
    /@example\./,
    /@test\./,
    /(.)\1{5,}/, // Caracteres repetidos excesivamente
  ];
  
  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(email.toLowerCase()));
  
  if (isSuspicious) {
    console.warn(`🚨 Email sospechoso detectado: ${email} desde IP: ${req.ip}`);
    
    return res.status(400).json({
      error: 'Email no válido',
      message: 'El email proporcionado no es válido para este servicio',
      code: 'SUSPICIOUS_EMAIL'
    });
  }
  
  next();
};

/**
 * Middleware para validar que la sesión esté completada
 */
const validateCompletedSession = async (req, res, next) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const sessionId = req.params.sessionId || req.body.sessionId;
    
    if (!sessionId) return next();
    
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        isCompleted: true,
        expiresAt: true
      }
    });
    
    if (!session) {
      return res.status(404).json({
        error: 'Sesión no encontrada',
        message: 'La sesión especificada no existe o ha expirado'
      });
    }
    
    if (!session.isCompleted) {
      return res.status(400).json({
        error: 'Sesión no completada',
        message: 'Debes completar el test antes de generar el reporte'
      });
    }
    
    // Verificar si la sesión ha expirado
    if (session.expiresAt && new Date() > session.expiresAt) {
      return res.status(410).json({
        error: 'Sesión expirada',
        message: 'Esta sesión ha expirado. Debes realizar el test nuevamente.'
      });
    }
    
    // Agregar session al request para uso posterior
    req.validatedSession = session;
    next();
    
  } catch (error) {
    console.error('Error validando sesión:', error);
    res.status(500).json({
      error: 'Error interno',
      message: 'No se pudo validar la sesión'
    });
  }
};

/**
 * Middleware para logging de errores de validación
 */
const logValidationErrors = (err, req, res, next) => {
  if (err.isJoi || (err.details && Array.isArray(err.details))) {
    console.warn(`⚠️ Error de validación - ${req.method} ${req.path}`, {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      errors: err.details?.map(d => d.message) || [err.message],
      body: req.sanitizedBody || 'N/A'
    });
  }
  
  next(err);
};

module.exports = {
  emailRateLimit,
  pdfRateLimit,
  logValidation,
  sanitizeLogging,
  detectSuspiciousEmails,
  validateCompletedSession,
  logValidationErrors
};