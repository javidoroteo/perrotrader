// backend/src/validators/reportValidators.js

const Joi = require('joi');

// Schema para validar el envío de email
const sendEmailSchema = Joi.object({
  sessionId: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required()
    .messages({
      'string.empty': 'El ID de sesión es requerido',
      'string.guid': 'El ID de sesión debe ser un UUID válido',
      'any.required': 'El ID de sesión es obligatorio'
    }),
  
  email: Joi.string()
    .min(6) // mínimo razonable para emails
    .email({ 
      minDomainSegments: 2,
      tlds: { allow: true }
    })
    .lowercase()
    .trim()
    .max(254) // RFC 5321 limit
    .required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'El formato del email no es válido',
      'string.max': 'El email no puede tener más de 254 caracteres',
      'any.required': 'El email es obligatorio'
    })
});

// Schema para validar actualización de email
const updateEmailSchema = Joi.object({
  email: Joi.string()
  .min(6) // mínimo razonable para emails
    .email({ 
      minDomainSegments: 2,
      tlds: { allow: true }
    })
    .lowercase()
    .trim()
    .max(254)
    .required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'El formato del email no es válido',
      'string.max': 'El email no puede tener más de 254 caracteres',
      'any.required': 'El email es obligatorio'
    })
});

// Schema para validar email de prueba
const testEmailSchema = Joi.object({
  email: Joi.string()
  .min(6) // mínimo razonable para emails
    .email({ 
      minDomainSegments: 2,
      tlds: { allow: true }
    })
    .lowercase()
    .trim()
    .max(254)
    .required()
    .messages({
      'string.empty': 'El email es requerido para la prueba',
      'string.email': 'El formato del email no es válido',
      'string.max': 'El email no puede tener más de 254 caracteres',
      'any.required': 'El email es obligatorio para realizar la prueba'
    })
});

// Schema para validar parámetros de sessionId
const sessionIdParamSchema = Joi.object({
  sessionId: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required()
    .messages({
      'string.empty': 'El ID de sesión es requerido',
      'string.guid': 'El ID de sesión debe ser un UUID válido',
      'any.required': 'El ID de sesión es obligatorio'
    })
});

// Middleware para validar schemas
const validateSchema = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Retorna todos los errores, no solo el primero
      stripUnknown: true, // Remueve campos no definidos en el schema
      convert: true // Convierte tipos automáticamente (ej: strings a lowercase)
    });

    if (error) {
      const errorMessages = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        error: 'Error de validación',
        message: 'Los datos proporcionados no son válidos',
        details: errorMessages,
        timestamp: new Date().toISOString()
      });
    }

    // Reemplazar el objeto original con el valor validado y normalizado
    req[property] = value;
    next();
  };
};

// Validador personalizado para emails con dominios específicos (opcional)
const validateEmailDomain = (allowedDomains = []) => {
  return (req, res, next) => {
    if (allowedDomains.length === 0) {
      return next(); // No hay restricción de dominios
    }

    const { email } = req.body;
    const emailDomain = email.split('@')[1];
    
    if (!allowedDomains.includes(emailDomain)) {
      return res.status(400).json({
        error: 'Dominio de email no permitido',
        message: `Solo se permiten emails de los siguientes dominios: ${allowedDomains.join(', ')}`,
        allowedDomains
      });
    }

    next();
  };
};

// Validador para detectar emails temporales/desechables (opcional)
const temporaryEmailDomains = [
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.org',
  'throaway.email',
  'yopmail.com',
  'temp-mail.org'
  // Agregar más según necesidad
];

const validateTemporaryEmail = (req, res, next) => {
  const { email } = req.body;
  const emailDomain = email.split('@')[1];
  
  if (temporaryEmailDomains.includes(emailDomain)) {
    return res.status(400).json({
      error: 'Email temporal no permitido',
      message: 'No se permiten direcciones de email temporales o desechables',
      domain: emailDomain
    });
  }

  next();
};

// Exportar schemas y middlewares
module.exports = {
  // Schemas
  sendEmailSchema,
  updateEmailSchema,
  testEmailSchema,
  sessionIdParamSchema,
  
  // Middlewares
  validateSchema,
  validateEmailDomain,
  validateTemporaryEmail,
  
  // Middlewares específicos (shortcuts)
  validateSendEmail: validateSchema(sendEmailSchema),
  validateUpdateEmail: validateSchema(updateEmailSchema),
  validateTestEmail: validateSchema(testEmailSchema),
  validateSessionIdParam: validateSchema(sessionIdParamSchema, 'params')
};