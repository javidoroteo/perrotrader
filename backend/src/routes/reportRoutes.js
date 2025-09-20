// backend/src/routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const PDFService = require('../services/pdfService');
const EmailService = require('../services/emailService');
const PortfolioService = require('../services/portfolioServices');
const { PrismaClient } = require('@prisma/client');

// Importar validadores de Joi
const {
  validateSendEmail,
  validateUpdateEmail,
  validateTestEmail,
  validateSessionIdParam,
  validateTemporaryEmail
} = require('../validators/reportValidators');

// Importar middlewares adicionales
const {
  emailRateLimit,
  pdfRateLimit,
  logValidation,
  sanitizeLogging,
  detectSuspiciousEmails,
  validateCompletedSession
} = require('../middleware/validationMiddleware');

const prisma = new PrismaClient();

/**
 * POST /api/report/generate-pdf/:sessionId
 * Genera y descarga el PDF del reporte
 */
router.post('/generate-pdf/:sessionId', 
  pdfRateLimit, // Rate limiting para PDFs
  validateSessionIdParam, // Validar sessionId con Joi
  validateCompletedSession, // Validar que la sesión esté completada
  logValidation, // Log de validaciones exitosas
  async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // 1. Obtener datos de la sesión
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: true,
        personalityTest: true
      }
    });

    if (!session) {
      return res.status(404).json({
        error: 'Sesión no encontrada',
        message: 'No se pudo encontrar la sesión especificada'
      });
    }

    if (!session.isCompleted) {
      return res.status(400).json({
        error: 'Sesión no completada',
        message: 'El test debe estar completado para generar el reporte'
      });
    }

    // 2. Generar reporte completo usando PortfolioService
    const reportData = await PortfolioService.completeFinalResult(session);
    
    // 3. Generar PDF
    const pdfBuffer = await PDFService.generateReportPDF(reportData, session);
    
    // 4. Configurar headers para descarga
    const fileName = `IsFinz_Reporte_${new Date().toISOString().split('T')[0]}.pdf`;
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': pdfBuffer.length
    });
    
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo generar el PDF del reporte',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/report/send-email
 * Envía el reporte por email con PDF adjunto
 */
router.post('/send-email', 
  emailRateLimit, // Rate limiting específico para emails
  sanitizeLogging, // Sanitizar datos sensibles
  validateSendEmail, // Validar body con Joi
  detectSuspiciousEmails, // Detectar emails sospechosos
  validateTemporaryEmail, // Opcional: rechazar emails temporales
  validateCompletedSession, // Validar que la sesión esté completada
  logValidation, // Log de validaciones exitosas
  async (req, res) => {
  try {
    const { sessionId, email } = req.body;
    
    // Nota: Joi ya validó el formato del email y sessionId

    // 1. Obtener datos de la sesión
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: true,
        personalityTest: true
      }
    });

    if (!session) {
      return res.status(404).json({
        error: 'Sesión no encontrada',
        message: 'No se pudo encontrar la sesión especificada'
      });
    }

    if (!session.isCompleted) {
      return res.status(400).json({
        error: 'Sesión no completada',
        message: 'El test debe estar completado para enviar el reporte'
      });
    }

    // 2. Actualizar email en la sesión si no existe
    if (!session.email || session.email !== email) {
      await prisma.quizSession.update({
        where: { id: sessionId },
        data: { email: email }
      });
    }

    // 3. Generar reporte completo
    const reportData = await PortfolioService.completeFinalResult(session);
    
    // 4. Enviar email con PDF adjunto
    const emailResult = await EmailService.sendReportEmail(email, reportData, session);
    
    res.json({
      success: true,
      message: 'Email enviado correctamente',
      messageId: emailResult.messageId,
      email: email
    });
    
  } catch (error) {
    console.error('Error enviando email:', error);
    
    // Manejar diferentes tipos de errores
    if (error.message.includes('API')) {
      res.status(502).json({
        error: 'Error del servicio de email',
        message: 'Problema temporal con el servicio de envío. Inténtalo más tarde.'
      });
    } else {
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message || 'No se pudo enviar el email',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
});

/**
 * GET /api/report/preview/:sessionId
 * Genera una vista previa HTML del reporte (para debug/testing)
 */
router.get('/preview/:sessionId',
  validateSessionIdParam, // Validar sessionId con Joi
  async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // 1. Obtener datos de la sesión
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: true,
        personalityTest: true
      }
    });

    if (!session) {
      return res.status(404).json({
        error: 'Sesión no encontrada'
      });
    }

    // 2. Generar reporte completo
    const reportData = await PortfolioService.completeFinalResult(session);
    
    // 3. Generar HTML preview
    const htmlContent = await PDFService.generatePreviewHTML(reportData, session);
    
    res.set('Content-Type', 'text/html');
    res.send(htmlContent);
    
  } catch (error) {
    console.error('Error generando preview:', error);
    res.status(500).json({
      error: 'Error generando preview',
      message: error.message
    });
  }
});

/**
 * POST /api/report/test-email
 * Endpoint para probar el servicio de email
 */
router.post('/test-email',
  emailRateLimit, // Rate limiting para emails
  sanitizeLogging, // Sanitizar datos sensibles
  validateTestEmail, // Validar email con Joi
  detectSuspiciousEmails, // Detectar emails sospechosos
  validateTemporaryEmail, // Opcional: rechazar emails temporales
  logValidation, // Log de validaciones exitosas
  async (req, res) => {
  try {
    const { email } = req.body;
    
    // Joi ya validó el formato del email

    const result = await EmailService.sendTestEmail(email);
    
    res.json({
      success: true,
      message: 'Email de prueba enviado correctamente',
      messageId: result.messageId
    });
    
  } catch (error) {
    console.error('Error enviando email de prueba:', error);
    res.status(500).json({
      error: 'Error en email de prueba',
      message: error.message
    });
  }
});

/**
 * GET /api/report/session/:sessionId/summary
 * Obtiene un resumen de la sesión para verificar datos antes del envío
 */
router.get('/session/:sessionId/summary',
  validateSessionIdParam, // Validar sessionId con Joi
  async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        createdAt: true,
        isCompleted: true,
        totalScore: true,
        riskProfile: true,
        email: true,
        personalityTest: {
          select: {
            completed: true,
            archetype: true,
            archetypeName: true
          }
        }
      }
    });

    if (!session) {
      return res.status(404).json({
        error: 'Sesión no encontrada'
      });
    }

    // Generar cartera rápida para el resumen
    const portfolioData = await PortfolioService.calculatePortfolio(session);
    
    res.json({
      sessionId: session.id,
      completed: session.isCompleted,
      riskProfile: portfolioData.riskProfile,
      email: session.email,
      personalityCompleted: session.personalityTest?.completed || false,
      archetype: session.personalityTest?.archetypeName,
      createdAt: session.createdAt,
      portfolio: portfolioData.allocation
    });
    
  } catch (error) {
    console.error('Error obteniendo resumen:', error);
    res.status(500).json({
      error: 'Error obteniendo resumen',
      message: error.message
    });
  }
});

/**
 * PUT /api/report/session/:sessionId/email
 * Actualiza el email de una sesión
 */
router.put('/session/:sessionId/email',
  validateSessionIdParam, // Validar sessionId con Joi
  validateUpdateEmail, // Validar email con Joi
  validateTemporaryEmail, // Opcional: rechazar emails temporales
  async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { email } = req.body;
    
    // Joi ya validó sessionId y email

    const updatedSession = await prisma.quizSession.update({
      where: { id: sessionId },
      data: { email: email },
      select: {
        id: true,
        email: true,
        updatedAt: true
      }
    });
    
    res.json({
      success: true,
      message: 'Email actualizado correctamente',
      session: updatedSession
    });
    
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({
        error: 'Sesión no encontrada'
      });
    } else {
      console.error('Error actualizando email:', error);
      res.status(500).json({
        error: 'Error actualizando email',
        message: error.message
      });
    }
  }
});

/**
 * GET /api/report/health
 * Health check para el servicio de reportes
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'report-service',
    endpoints: {
      'POST /generate-pdf/:sessionId': 'Genera PDF del reporte',
      'POST /send-email': 'Envía reporte por email',
      'GET /preview/:sessionId': 'Vista previa HTML',
      'POST /test-email': 'Prueba de email',
      'GET /session/:sessionId/summary': 'Resumen de sesión'
    }
  });
});

module.exports = router;