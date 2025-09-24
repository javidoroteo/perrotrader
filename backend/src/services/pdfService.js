// backend/src/services/pdfService.js

const puppeteer = require('puppeteer');
const path = require('path');

class PDFService {
  
  /**
   * Obtiene la configuración correcta de Puppeteer según el entorno
   */
  getPuppeteerConfig() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isRender = process.env.RENDER === 'true' || process.env.RENDER_SERVICE_ID;
    
    console.log(`🔍 Entorno detectado - Production: ${isProduction}, Render: ${isRender}`);
    
    if (isProduction || isRender) {
      // Configuración específica para Render
      const config = {
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-extensions',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ]
      };

      // Configurar executable path según las variables de entorno
      if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        config.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
        console.log(`📍 Usando executablePath desde env: ${config.executablePath}`);
      } else {
        // Fallback - buscar Chrome en ubicaciones comunes de Render
        const possiblePaths = [
          '/opt/render/.cache/puppeteer/chrome/linux-140.0.7339.185/chrome-linux64/chrome',
          puppeteer.executablePath()
        ];
        
        for (const execPath of possiblePaths) {
          try {
            const fs = require('fs');
            if (fs.existsSync(execPath)) {
              config.executablePath = execPath;
              console.log(`📍 Chrome encontrado en: ${execPath}`);
              break;
            }
          } catch (e) {
            console.log(`⚠️ No se pudo verificar: ${execPath}`);
          }
        }
        
        if (!config.executablePath) {
          console.log('⚠️ No se especificó executablePath, usando por defecto de Puppeteer');
        }
      }

      return config;
    } else {
      // Configuración para desarrollo local
      return {
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage'
        ]
      };
    }
  }

  /**
   * Verifica que Chrome esté disponible antes de usarlo
   */
  async verifyChrome() {
    try {
      const config = this.getPuppeteerConfig();
      
      if (config.executablePath) {
        const fs = require('fs');
        if (!fs.existsSync(config.executablePath)) {
          throw new Error(`Chrome no encontrado en: ${config.executablePath}`);
        }
        console.log(`✅ Chrome verificado en: ${config.executablePath}`);
      }

      // Test de lanzamiento rápido
      const browser = await puppeteer.launch({
        ...config,
        timeout: 10000 // 10 segundos timeout
      });
      
      await browser.close();
      console.log('✅ Chrome funciona correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error verificando Chrome:', error.message);
      return false;
    }
  }

  /**
   * Genera un PDF del reporte completo del usuario
   */
  async generateReportPDF(reportData, sessionData) {
    let browser = null;
    
    try {
      console.log('🚀 Iniciando generación de PDF...');
      console.log('📊 ReportData keys:', Object.keys(reportData));
      console.log('🔧 Entorno:', process.env.NODE_ENV);
      console.log('🌐 Render:', process.env.RENDER || 'false');
      
      // Verificar Chrome primero
      const chromeOk = await this.verifyChrome();
      if (!chromeOk) {
        throw new Error('Chrome no está disponible o no funciona correctamente');
      }
      
      // Obtener configuración según entorno
      const config = this.getPuppeteerConfig();
      console.log('⚙️ Configuración Puppeteer:', {
        headless: config.headless,
        argsCount: config.args.length,
        hasExecutablePath: !!config.executablePath,
        executablePath: config.executablePath ? config.executablePath.substring(0, 50) + '...' : 'default'
      });
      
      // Lanzar browser con timeout más largo
      browser = await puppeteer.launch({
        ...config,
        timeout: 30000 // 30 segundos
      });
      console.log('✅ Browser lanzado exitosamente');
      
      const page = await browser.newPage();
      console.log('✅ Nueva página creada');
      
      // Configurar página
      await page.setViewport({ width: 1200, height: 800 });
      
      // Generar HTML del reporte
      const htmlContent = this.generateReportHTML(reportData, sessionData);
      console.log('✅ HTML generado, longitud:', htmlContent.length);
      
      await page.setContent(htmlContent, { 
        waitUntil: ['networkidle0', 'domcontentloaded'],
        timeout: 30000 
      });
      console.log('✅ Contenido HTML cargado en la página');
      
      // Generar PDF con configuración optimizada para Render
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          bottom: '20px',
          left: '20px',
          right: '20px'
        },
        timeout: 30000
      });
      
      console.log('✅ PDF generado exitosamente, tamaño:', pdfBuffer.length, 'bytes');
      return pdfBuffer;
      
    } catch (error) {
      console.error('❌ Error detallado generando PDF:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code
      });
      
      // Mensajes de error más específicos
      if (error.message.includes('Could not find Chrome') || error.message.includes('Browser was not found')) {
        throw new Error('Chrome no está disponible en el servidor. El administrador debe revisar la configuración.');
      } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        throw new Error('Timeout generando el PDF. El servidor está ocupado, intenta más tarde.');
      } else if (error.message.includes('Navigation failed') || error.message.includes('ERR_')) {
        throw new Error('Error cargando el contenido del reporte. Intenta nuevamente.');
      } else {
        throw new Error(`Error generando PDF: ${error.message}`);
      }
    } finally {
      if (browser) {
        try {
          await browser.close();
          console.log('✅ Browser cerrado correctamente');
        } catch (closeError) {
          console.error('⚠️ Error cerrando browser:', closeError.message);
        }
      }
    }
  }

  /**
   * Genera el HTML del reporte con la estética del frontend
   */
  generateReportHTML(reportData, sessionData) {
    const { portfolio, riskProfile, investorProfile, report, educationalGuide } = reportData;
    const today = new Date().toLocaleDateString('es-ES');
    
    // Convertir portfolio a array para gráficos
    const portfolioArray = Object.entries(portfolio || {}).map(([asset, percentage]) => ({
      name: this.getAssetDisplayName(asset),
      value: parseFloat(percentage.toFixed(1)),
      color: this.getAssetColor(asset),
      emoji: this.getAssetEmoji(asset)
    })).filter(item => item.value > 0);

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Inversión - IsFinz</title>
        <style>
            ${this.getStyles()}
        </style>
    </head>
    <body>
        <div class="container">
            ${this.generateHeader()}
            ${this.generateInvestorProfile(investorProfile)}
            ${this.generatePortfolioSection(portfolioArray, riskProfile)}
            ${this.generateReportSection(report)}
            ${this.generateEducationalSection(educationalGuide)}
            ${this.generateFooter(today)}
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Estilos CSS con la estética del frontend
   */
  getStyles() {
    return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #1f2937;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }
    
    .container {
        max-width: 900px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }
    
    .header {
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        padding: 40px;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .header-content {
        position: relative;
        z-index: 1;
    }
    
    .logo {
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 10px;
    }
    
    .subtitle {
        font-size: 1.1rem;
        opacity: 0.9;
        font-weight: 300;
    }
    
    .date {
        margin-top: 15px;
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    .section {
        margin: 30px;
        padding: 25px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #e5e7eb;
    }
    
    .section-icon {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
    }
    
    .portfolio-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        align-items: start;
    }
    
    @media (max-width: 768px) {
        .portfolio-grid {
            grid-template-columns: 1fr;
        }
    }
    
    .chart-container {
        position: relative;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 12px;
        color: #666;
        font-weight: 500;
    }
    
    .asset-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .asset-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .asset-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .asset-emoji {
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .asset-name {
        font-weight: 600;
        color: #374151;
    }
    
    .asset-percentage {
        font-size: 1.2rem;
        font-weight: 700;
        padding: 6px 12px;
        border-radius: 20px;
        color: white;
    }
    
    .profile-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }
    
    .profile-card {
        padding: 20px;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border-radius: 12px;
        border-left: 4px solid #2563eb;
    }
    
    .profile-label {
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 5px;
        font-weight: 500;
    }
    
    .profile-value {
        font-size: 1.1rem;
        font-weight: 600;
        color: #1f2937;
    }
    
    .content-block {
        margin: 20px 0;
        padding: 20px;
        background: rgba(249, 250, 251, 0.8);
        border-radius: 12px;
        border-left: 4px solid #10b981;
    }
    
    .content-block h4 {
        color: #065f46;
        font-weight: 600;
        margin-bottom: 10px;
    }
    
    .content-block p {
        color: #374151;
        line-height: 1.6;
    }
    
    .footer {
        text-align: center;
        padding: 30px;
        background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
        color: white;
    }
    
    .footer-logo {
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 10px;
    }
    
    .footer-text {
        opacity: 0.8;
        font-size: 0.9rem;
    }
    
    @media print {
        body { -webkit-print-color-adjust: exact; }
        .section { break-inside: avoid; }
        .portfolio-grid { break-inside: avoid; }
    }
    `;
  }

  /**
   * Header del PDF
   */
  generateHeader() {
    return `
    <div class="header">
        <div class="header-content">
            <div class="logo">IsFinz</div>
            <div class="subtitle">Tu Reporte de Inversión Personalizado</div>
            <div class="date">Generado el ${new Date().toLocaleDateString('es-ES')}</div>
        </div>
    </div>
    `;
  }

  /**
   * Sección del perfil del inversor
   */
  generateInvestorProfile(profile) {
    if (!profile) return '';
    
    return `
    <div class="section">
        <h2 class="section-title">
            <div class="section-icon">👤</div>
            Tu Perfil de Inversor
        </h2>
        <div class="profile-grid">
            <div class="profile-card">
                <div class="profile-label">Tipo de Inversor</div>
                <div class="profile-value">${profile.investorType || 'No definido'}</div>
            </div>
            <div class="profile-card">
                <div class="profile-label">Tolerancia al Riesgo</div>
                <div class="profile-value">${profile.riskTolerance || 'No definida'}</div>
            </div>
            <div class="profile-card">
                <div class="profile-label">Horizonte Temporal</div>
                <div class="profile-value">${profile.timeHorizon || 'No definido'}</div>
            </div>
            <div class="profile-card">
                <div class="profile-label">Experiencia</div>
                <div class="profile-value">${profile.experienceLevel || 'No definida'}</div>
            </div>
            ${profile.mainObjective ? `
            <div class="profile-card">
                <div class="profile-label">Objetivo Principal</div>
                <div class="profile-value">${profile.mainObjective}</div>
            </div>
            ` : ''}
            ${profile.esgSensitivity ? `
            <div class="profile-card">
                <div class="profile-label">Inversión Sostenible</div>
                <div class="profile-value">${profile.esgSensitivity}</div>
            </div>
            ` : ''}
        </div>
    </div>
    `;
  }

  /**
   * Sección de la cartera recomendada
   */
  generatePortfolioSection(portfolioArray, riskProfile) {
    return `
    <div class="section">
        <h2 class="section-title">
            <div class="section-icon">📊</div>
            Tu Cartera Recomendada - ${riskProfile}
        </h2>
        <div class="portfolio-grid">
            <div class="chart-container">
                Gráfico de distribución de cartera
            </div>
            <div class="asset-list">
                ${portfolioArray.map(asset => `
                <div class="asset-item">
                    <div class="asset-info">
                        <div class="asset-emoji" style="background: ${asset.color}20;">
                            ${asset.emoji}
                        </div>
                        <div class="asset-name">${asset.name}</div>
                    </div>
                    <div class="asset-percentage" style="background: ${asset.color};">
                        ${asset.value}%
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </div>
    `;
  }

  /**
   * Sección del reporte detallado
   */
  generateReportSection(report) {
    if (!report) return '';
    
    return `
    <div class="section">
        <h2 class="section-title">
            <div class="section-icon">📋</div>
            Análisis y Recomendaciones
        </h2>
        <div class="content-block">
            <h4>Análisis de tu Perfil</h4>
            <div>${report}</div>
        </div>
    </div>
    `;
  }

  /**
   * Sección educativa
   */
  generateEducationalSection(educationalGuide) {
    if (!educationalGuide || !educationalGuide.assets) return '';
    
    return `
    <div class="section">
        <h2 class="section-title">
            <div class="section-icon">🎓</div>
            Guía Educativa de tus Activos
        </h2>
        ${educationalGuide.assets.map(asset => `
        <div class="content-block">
            <h4>${asset.name}</h4>
            <p><strong>¿Qué es?</strong> ${asset.description}</p>
            <p><strong>Riesgo:</strong> ${asset.riskLevel}</p>
            <p><strong>Ventajas:</strong> ${asset.advantages}</p>
            <p><strong>Desventajas:</strong> ${asset.disadvantages}</p>
        </div>
        `).join('')}
    </div>
    `;
  }

  /**
   * Footer del PDF
   */
  generateFooter(date) {
    return `
    <div class="footer">
        <div class="footer-logo">IsFinz</div>
        <div class="footer-text">
            Este reporte ha sido generado automáticamente el ${date}<br>
            Para más información, visita www.isfinz.com
        </div>
    </div>
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

  getAssetColor(asset) {
    const colors = {
      acciones: '#3B82F6',
      bonos: '#10B981',
      criptomonedas: '#F59E0B',
      oro: '#FFD700',
      efectivo: '#8B5CF6'
    };
    return colors[asset] || '#6B7280';
  }

  getAssetEmoji(asset) {
    const emojis = {
      acciones: '📈',
      bonos: '🏛️',
      criptomonedas: '₿',
      oro: '🥇',
      efectivo: '💎'
    };
    return emojis[asset] || '💰';
  }

  /**
   * Genera un preview HTML sin PDF (para debug)
   */
  async generatePreviewHTML(reportData, sessionData) {
    return this.generateReportHTML(reportData, sessionData);
  }

  /**
   * Health check para verificar que Puppeteer funciona
   */
  async healthCheck() {
    try {
      console.log('🔍 Iniciando health check de PDF service...');
      
      const chromeOk = await this.verifyChrome();
      if (!chromeOk) {
        return { status: 'error', message: 'Chrome no disponible' };
      }
      
      return { 
        status: 'ok', 
        message: 'PDF service funcionando correctamente',
        chrome: 'disponible'
      };
    } catch (error) {
      return { 
        status: 'error', 
        message: error.message 
      };
    }
  }
}

module.exports = new PDFService();