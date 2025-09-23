// backend/src/services/emailService.js

const axios = require('axios');
const PDFService = require('./pdfService');

class EmailService {
  constructor() {
    this.brevoApiKey = process.env.BREVO_API_KEY;
    this.brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';
    this.senderEmail = 'noreply@isfinz.com';
    this.senderName = 'IsFinz - Hacemos las Inversiones Simples';
  }

  /**
   * Envía el reporte completo por email con PDF adjunto y guía práctica
   */
  async sendReportEmail(userEmail, reportData, sessionData) {
    try {
      console.log('=== INICIO ENVÍO EMAIL ===');
    console.log('Usuario:', userEmail);
    console.log('ReportData keys:', Object.keys(reportData));
    console.log('SessionData keys:', Object.keys(sessionData));

      // 1. Generar el PDF del reporte
      const pdfBuffer = await PDFService.generateReportPDF(reportData, sessionData);
      console.log('✅ PDF generado exitosamente. Tamaño:', pdfBuffer.length, 'bytes');
      
      // 2. Convertir PDF a base64 para adjunto
      const pdfBase64 = pdfBuffer.toString('base64');
      console.log('✅ Base64 generado. Longitud:', pdfBase64.length);
      
      // 3. Generar contenido del email
      const emailContent = this.generateEmailContent(reportData, sessionData);
      
      // 4. Preparar email con adjunto
      const emailPayload = {
        sender: {
          email: this.senderEmail,
          name: this.senderName
        },
        to: [{
          email: userEmail,
          name: userEmail.split('@')[0] // Usar la parte antes del @ como nombre
        }],
        subject: `Tu Reporte de Inversión + Guía Práctica - IsFinz`,
        htmlContent: emailContent.html,
        textContent: emailContent.text,
        attachment: [{
          name: `IsFinz_Reporte_${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBase64,
          contentType: 'application/pdf'
        }]
      };

      // 5. Enviar email usando Brevo API
      const response = await axios.post(this.brevoApiUrl, emailPayload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': this.brevoApiKey
        },
        timeout: 30000
      });

      console.log('Email enviado exitosamente:', response.data);
      
      return {
        success: true,
        messageId: response.data.messageId,
        message: 'Email enviado correctamente'
      };

    } catch (error) {
      console.error('Error enviando email:', error.response?.data || error.message);
      console.error('❌ ERROR DETALLADO:', {
    message: error.message,
    stack: error.stack,
    response: error.response?.data,
    code: error.code
  });
      
      throw new Error(
        error.response?.data?.message || 
        'No se pudo enviar el email. Por favor, inténtalo más tarde.'
      );
    }
  }

  /**
   * Genera el contenido HTML y texto del email
   */
  generateEmailContent(reportData, sessionData) {
    const { riskProfile, portfolio } = reportData;
    const practicalGuide = this.generatePracticalGuide(reportData);

    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tu Reporte de Inversión - IsFinz</title>
        <style>
            ${this.getEmailStyles()}
        </style>
    </head>
    <body>
        <div class="email-container">
            ${this.generateEmailHeader()}
            ${this.generateWelcomeSection(riskProfile)}
            ${this.generatePortfolioSummary(portfolio)}
            ${practicalGuide}
            ${this.generateCallToAction()}
            ${this.generateEmailFooter()}
        </div>
    </body>
    </html>
    `;

    const text = this.generatePlainTextContent(reportData);

    return { html, text };
  }

  /**
   * Estilos CSS para el email (compatibles con clientes de email)
   */
  getEmailStyles() {
    return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        line-height: 1.6;
        color: #1f2937;
        background-color: #f3f4f6;
    }
    
    .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .header {
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        padding: 40px 30px;
        text-align: center;
    }
    
    .logo {
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 8px;
    }
    
    .header-subtitle {
        font-size: 1.1rem;
        opacity: 0.9;
        font-weight: 300;
    }
    
    .section {
        padding: 30px;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .section:last-child {
        border-bottom: none;
    }
    
    .section-title {
        font-size: 1.4rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .emoji {
        font-size: 1.2em;
    }
    
    .welcome-text {
        font-size: 1rem;
        color: #374151;
        margin-bottom: 20px;
    }
    
    .portfolio-summary {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        padding: 20px;
        border-radius: 12px;
        margin: 20px 0;
    }
    
    .portfolio-title {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 15px;
        text-align: center;
    }
    
    .asset-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .asset-item:last-child {
        border-bottom: none;
    }
    
    .asset-name {
        font-weight: 500;
        color: #374151;
    }
    
    .asset-percentage {
        font-weight: 700;
        color: #2563eb;
    }
    
    .guide-steps {
        background: #f0f9ff;
        border-left: 4px solid #0ea5e9;
        padding: 20px;
        border-radius: 0 8px 8px 0;
        margin: 20px 0;
    }
    
    .step {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e0f2fe;
    }
    
    .step:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
    }
    
    .step-number {
        display: inline-block;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        text-align: center;
        line-height: 28px;
        font-weight: bold;
        font-size: 0.9rem;
        margin-right: 12px;
        vertical-align: top;
    }
    
    .step-content {
        display: inline-block;
        width: calc(100% - 40px);
        vertical-align: top;
    }
    
    .step-title {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 5px;
    }
    
    .step-description {
        color: #4b5563;
        font-size: 0.95rem;
    }
    
    .cta-section {
        background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
        color: white;
        text-align: center;
        padding: 40px 30px;
    }
    
    .cta-title {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 10px;
    }
    
    .cta-text {
        opacity: 0.9;
        margin-bottom: 25px;
    }
    
    .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        padding: 12px 30px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }
    
    .footer {
        background: #f9fafb;
        padding: 25px 30px;
        text-align: center;
        color: #6b7280;
        font-size: 0.9rem;
    }
    
    .footer-logo {
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 8px;
    }
    
    .disclaimer {
        font-size: 0.8rem;
        color: #9ca3af;
        margin-top: 15px;
        line-height: 1.4;
    }
    
    @media (max-width: 600px) {
        .email-container {
            margin: 10px;
            border-radius: 8px;
        }
        
        .header {
            padding: 30px 20px;
        }
        
        .section {
            padding: 20px;
        }
        
        .logo {
            font-size: 2rem;
        }
    }
    `;
  }

  /**
   * Header del email
   */
  generateEmailHeader() {
    return `
    <div class="header">
        <div class="logo">IsFinz</div>
        <div class="header-subtitle">Tu Asesor de Inversiones Inteligente</div>
    </div>
    `;
  }

  /**
   * Sección de bienvenida
   */
  generateWelcomeSection(riskProfile) {
    return `
    <div class="section">
        <h2 class="section-title">
            <span class="emoji">👋</span>
            ¡Tu Reporte Está Listo!
        </h2>
        <div class="welcome-text">
            Hemos analizado tu perfil y hemos determinado que eres un inversor de <strong>${riskProfile}</strong>.
            En este email encontrarás un resumen de tu cartera y una guía práctica de 5 pasos
            para comenzar a invertir de manera inteligente.
        </div>
        <div class="welcome-text">
            📎 <strong>Adjunto:</strong> Tu reporte completo en PDF con análisis detallado y reporte personalizado.
        </div>
    </div>
    `;
  }

  /**
   * Resumen de la cartera en el email
   */
  generatePortfolioSummary(portfolio) {
    if (!portfolio) return '';

    const portfolioArray = Object.entries(portfolio)
      .map(([asset, percentage]) => ({
        name: this.getAssetDisplayName(asset),
        value: parseFloat(percentage.toFixed(1))
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);

    return `
    <div class="section">
        <h2 class="section-title">
            <span class="emoji">📊</span>
            Resumen de tu Cartera
        </h2>
        <div class="portfolio-summary">
            <div class="portfolio-title">Distribución de Activos</div>
            ${portfolioArray.map(asset => `
            <div class="asset-item">
                <span class="asset-name">${asset.name}</span>
                <span class="asset-percentage">${asset.value}%</span>
            </div>
            `).join('')}
        </div>
    </div>
    `;
  }

  /**
   * Genera la guía práctica de 5 pasos
   */
  generatePracticalGuide(reportData) {
    const steps = this.getPracticalSteps(reportData);

    return `
    <div class="section">
        <h2 class="section-title">
            <span class="emoji">🚀</span>
            Guía Práctica: 5 Pasos para Empezar
        </h2>
        <div class="guide-steps">
            ${steps.map((step, index) => `
            <div class="step">
                <span class="step-number">${index + 1}</span>
                <div class="step-content">
                    <div class="step-title">${step.title}</div>
                    <div class="step-description">${step.description}</div>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
    `;
  }

  /**
   * Define los 5 pasos prácticos (escalables para personalización futura)
   */
  getPracticalSteps(reportData) {
    // Pasos genéricos que se pueden personalizar según el perfil en el futuro
    return [
      {
        title: "Establece tu Fondo de Emergencia",
        description: "Antes de invertir, asegúrate de tener 3-6 meses de gastos guardados en una cuenta de fácil acceso. Este será tu colchón de seguridad."
      },
      {
        title: "Define tu Estrategia de Inversión",
        description: "Basándote en tu perfil de riesgo, establece objetivos claros y un horizonte temporal. Mantén la disciplina y evita decisiones emocionales."
      },
      {
        title: "Diversifica tu Cartera",
        description: "No pongas todos los huevos en la misma canasta. Distribuye tus inversiones según la asignación recomendada en tu reporte o modificala según tu criterio."
      },
      {
        title: "Invierte de Forma Periódica",
        description: "Considera hacer aportaciones mensuales regulares (DCA - Dollar Cost Averaging) para reducir el impacto de la volatilidad del mercado."
      },
      {
        title: "Revisa y Rebalancea",
        description: "Revisa tu cartera cada 3-6 meses y rebalancea si es necesario para mantener tu asignación objetivo. La disciplina es clave."
      }
    ];
  }

  /**
   * Sección de llamada a la acción
   */
  generateCallToAction() {
    return `
    <div class="cta-section">
        <div class="cta-title">¿Listo para Empezar?</div>
        <div class="cta-text">
            Visita nuestra plataforma para obtener más recursos y herramientas de inversión
        </div>
        <a href="https://www.isfinz.com" class="cta-button">
            Explorar IsFinz
        </a>
    </div>
    `;
  }

  /**
   * Footer del email
   */
  generateEmailFooter() {
    return `
    <div class="footer">
        <div class="footer-logo">IsFinz</div>
        <div>Tu asesor de inversiones inteligente</div>
        <div class="disclaimer">
            <strong>Aviso:</strong> Este reporte es solo para fines educativos e informativos. 
            No constituye asesoramiento financiero personalizado. Consulta con un profesional 
            antes de tomar decisiones de inversión importantes.
        </div>
    </div>
    `;
  }

  /**
   * Versión en texto plano del email
   */
  generatePlainTextContent(reportData) {
    const { riskProfile, portfolio } = reportData;
    
    const portfolioArray = Object.entries(portfolio)
      .map(([asset, percentage]) => `${this.getAssetDisplayName(asset)}: ${parseFloat(percentage.toFixed(1))}%`)
      .filter(item => !item.includes(': 0%'))
      .join('\n');

    const steps = this.getPracticalSteps(reportData);
    const stepsText = steps.map((step, index) => 
      `${index + 1}. ${step.title}\n   ${step.description}`
    ).join('\n\n');

    return `
TU REPORTE DE INVERSIÓN - ISFINZ

¡Hola! Tu reporte personalizado está listo.

PERFIL: ${riskProfile}

RESUMEN DE TU CARTERA:
${portfolioArray}

GUÍA PRÁCTICA - 5 PASOS PARA EMPEZAR:

${stepsText}

¿LISTO PARA EMPEZAR?
Visita https://www.isfinz.com para obtener más recursos.

---
IsFinz - Hacemos las Inversiones Simples

AVISO: Este reporte es solo para fines educativos. No constituye asesoramiento financiero personalizado.
    `;
  }

  // Métodos auxiliares
  getAssetDisplayName(asset) {
    const names = {
      acciones: 'Acciones & ETFs',
      bonos: 'Bonos & Renta Fija',
      criptomonedas: 'Criptomonedas',
      oro: 'Oro',
      efectivo: 'Efectivo'
    };
    return names[asset] || asset;
  }

  /**
   * Envía un email de prueba (para testing)
   */
  async sendTestEmail(userEmail) {
    try {
      const emailPayload = {
        sender: {
          email: this.senderEmail,
          name: this.senderName
        },
        to: [{
          email: userEmail,
          name: 'Usuario Test'
        }],
        subject: 'Test - Servicio de Email IsFinz',
        htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #2563eb;">¡Email de Prueba Exitoso!</h2>
            <p>El servicio de email de IsFinz está funcionando correctamente.</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
        </div>
        `,
        textContent: 'Email de prueba - IsFinz funcionando correctamente'
      };

      const response = await axios.post(this.brevoApiUrl, emailPayload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': this.brevoApiKey
        }
      });

      return {
        success: true,
        messageId: response.data.messageId
      };

    } catch (error) {
      console.error('Error enviando email de prueba:', error.response?.data || error.message);
      throw new Error('Error en el servicio de email');
    }
  }
}

module.exports = new EmailService();