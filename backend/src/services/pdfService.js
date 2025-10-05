// backend/src/services/pdfService.js

const puppeteer = require('puppeteer');
const path = require('path');

class PDFService {
  
  /**
   * Instala Chrome dinámicamente si no está disponible
   */
  async ensureChromeInstalled() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isRender = process.env.RENDER === 'true' || process.env.RENDER_SERVICE_ID;
    
    if (!isProduction && !isRender) {
      return true;
    }

    try {
      console.log('🔍 Verificando instalación de Chrome...');
      
      const defaultPath = puppeteer.executablePath();
      console.log('📍 Ruta por defecto de Chrome:', defaultPath);
      
      const fs = require('fs');
      if (fs.existsSync(defaultPath)) {
        console.log('✅ Chrome encontrado en ruta por defecto');
        return true;
      }

      console.log('⚠️ Chrome no encontrado, intentando instalación dinámica...');
      
      const { execSync } = require('child_process');
      
      await execSync('npx puppeteer browsers install chrome', { 
        stdio: 'inherit',
        timeout: 60000
      });
      
      console.log('✅ Chrome instalado dinámicamente');
      return true;

    } catch (error) {
      console.error('❌ Error instalando Chrome:', error.message);
      return false;
    }
  }

  /**
   * Obtiene la configuración correcta de Puppeteer según el entorno
   */
  getPuppeteerConfig() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isRender = process.env.RENDER === 'true' || process.env.RENDER_SERVICE_ID;
    
    console.log(`🔍 Entorno detectado - Production: ${isProduction}, Render: ${isRender}`);
    
    if (isProduction || isRender) {
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

      console.log('📍 Usando Chrome automático de Puppeteer');
      
      return config;
    } else {
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
      await this.ensureChromeInstalled();
      
      const config = this.getPuppeteerConfig();
      
      console.log(`✅ Configuración Puppeteer: ${JSON.stringify({
        headless: config.headless,
        argsCount: config.args.length
      })}`);

      const browser = await puppeteer.launch({
        ...config,
        timeout: 15000
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
      
      const chromeInstalled = await this.ensureChromeInstalled();
      if (!chromeInstalled) {
        throw new Error('No se pudo instalar Chrome');
      }
      
      const config = this.getPuppeteerConfig();
      console.log('⚙️ Configuración Puppeteer:', {
        headless: config.headless,
        argsCount: config.args.length,
        hasExecutablePath: !!config.executablePath,
        executablePath: config.executablePath ? config.executablePath.substring(0, 50) + '...' : 'default'
      });
      
      browser = await puppeteer.launch({
        ...config,
        timeout: 30000
      });
      console.log('✅ Browser lanzado exitosamente');
      
      const page = await browser.newPage();
      console.log('✅ Nueva página creada');
      
      await page.setViewport({ width: 1200, height: 1600 });
      
      const htmlContent = this.generateReportHTML(reportData, sessionData);
      console.log('✅ HTML generado, longitud:', htmlContent.length);
      
      await page.setContent(htmlContent, { 
        waitUntil: ['domcontentloaded'],
        timeout: 60000
      });
      console.log('✅ Contenido HTML cargado en la página');
      
      // Esperar a que las fuentes se carguen
      await page.evaluateHandle('document.fonts.ready');
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        margin: {
          top: '15mm',
          bottom: '15mm',
          left: '15mm',
          right: '15mm'
        },
        timeout: 60000
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
    const { portfolio, riskProfile, investorProfile, report, rentaFijaAdvice, rentaVariableAdvice, educationalGuide } = reportData;
    const today = new Date().toLocaleDateString('es-ES');
    
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap" rel="stylesheet">
        <style>
            ${this.getStyles()}
        </style>
    </head>
    <body>
        <div class="page-wrapper">
            ${this.generateHeader()}
            
            <div class="container">
                ${this.generateInvestorProfile(investorProfile)}
                ${this.generatePortfolioSection(portfolioArray, riskProfile)}
                ${this.generateReportSection(report)}
                ${rentaFijaAdvice ? this.generateRentaFijaSection(rentaFijaAdvice) : ''}
                ${rentaVariableAdvice ? this.generateRentaVariableSection(rentaVariableAdvice) : ''}
                ${this.generateEducationalSection(educationalGuide)}
            </div>
            
            ${this.generateFooter(today)}
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Estilos CSS mejorados y corregidos
   */
  getStyles() {
    return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #1f2937;
        background: #ffffff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    
    .page-wrapper {
        width: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }
    
    .container {
        max-width: 100%;
        margin: 0 auto;
        background: #ffffff;
        padding: 0;
    }
    
    /* ============================================
       HEADER
       ============================================ */
    .header {
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        padding: 35px 40px;
        text-align: center;
        position: relative;
        page-break-after: avoid;
        break-after: avoid;
    }
    
    .header-content {
        position: relative;
        z-index: 1;
    }
    
    .logo {
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
    }
    
    .subtitle {
        font-size: 1.1rem;
        opacity: 0.95;
        font-weight: 400;
    }
    
    .date {
        margin-top: 12px;
        font-size: 0.9rem;
        opacity: 0.85;
    }
    
    /* ============================================
       SECTIONS
       ============================================ */
    .section {
        margin: 25px 30px;
        padding: 25px;
        background: #ffffff;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .section:first-of-type {
        margin-top: 30px;
    }
    
    .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid #e5e7eb;
        page-break-after: avoid;
        break-after: avoid;
    }
    
    .section-icon {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        font-family: 'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
        flex-shrink: 0;
    }
    
    /* ============================================
       INVESTOR PROFILE
       ============================================ */
    .profile-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 15px;
    }
    
    .profile-card {
        padding: 18px 20px;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 10px;
        border-left: 4px solid #2563eb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        min-height: 85px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .profile-label {
        font-size: 0.8rem;
        color: #6b7280;
        margin-bottom: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .profile-value {
        font-size: 1.15rem;
        font-weight: 700;
        color: #1f2937;
        line-height: 1.3;
    }
    
    /* ============================================
       PORTFOLIO SECTION
       ============================================ */
    .portfolio-content {
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .chart-visualization {
        margin: 20px 0;
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .chart-bar {
        margin-bottom: 15px;
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .chart-label {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
        font-weight: 600;
        font-size: 0.95rem;
        color: #374151;
    }
    
    .chart-emoji {
        font-size: 1.3rem;
        font-family: 'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        flex-shrink: 0;
    }
    
    .chart-bar-container {
        height: 35px;
        background: #f3f4f6;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
    }
    
    .chart-bar-fill {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 12px;
        color: white;
        font-weight: 700;
        font-size: 0.95rem;
        transition: width 0.3s ease;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    /* ============================================
       CONTENT BLOCKS
       ============================================ */
    .content-block {
        margin: 20px 0;
        padding: 20px;
        background: #f9fafb;
        border-radius: 10px;
        border-left: 4px solid #10b981;
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .content-block:first-of-type {
        margin-top: 0;
    }
    
    .content-block h3 {
        color: #065f46;
        font-weight: 700;
        margin-bottom: 12px;
        font-size: 1.15rem;
        page-break-after: avoid;
        break-after: avoid;
    }
    
    .content-block h4 {
        color: #047857;
        font-weight: 600;
        margin-bottom: 10px;
        margin-top: 15px;
        font-size: 1.05rem;
        page-break-after: avoid;
        break-after: avoid;
    }
    
    .content-block p {
        color: #374151;
        line-height: 1.7;
        margin-bottom: 12px;
        orphans: 3;
        widows: 3;
    }
    
    .content-block ul {
        margin: 12px 0;
        padding-left: 25px;
    }
    
    .content-block li {
        color: #374151;
        line-height: 1.7;
        margin-bottom: 8px;
        orphans: 2;
        widows: 2;
    }
    
    /* ============================================
       SUBSECTIONS
       ============================================ */
    .subsection {
        margin: 18px 0;
        padding: 18px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        border-left: 3px solid #3b82f6;
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .subsection-title {
        color: #1e40af;
        font-weight: 600;
        margin-bottom: 10px;
        font-size: 1.05rem;
        page-break-after: avoid;
        break-after: avoid;
    }
    
    .product-list {
        margin-top: 12px;
    }
    
    .product-item {
        margin-bottom: 12px;
        padding: 10px 12px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 6px;
        page-break-inside: avoid;
        break-inside: avoid;
    }
    
    .product-name {
        font-weight: 700;
        color: #1f2937;
        display: block;
        margin-bottom: 4px;
    }
    
    .product-description {
        color: #6b7280;
        font-size: 0.95rem;
        line-height: 1.5;
    }
    
    /* ============================================
       FOOTER
       ============================================ */
    .footer {
        text-align: center;
        padding: 30px 40px;
        background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
        color: white;
        margin-top: 40px;
        page-break-before: avoid;
        break-before: avoid;
    }
    
    .footer-logo {
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
    }
    
    .footer-text {
        opacity: 0.85;
        font-size: 0.9rem;
        line-height: 1.6;
    }
    
    /* ============================================
       PRINT-SPECIFIC STYLES
       ============================================ */
    @media print {
        body { 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .section { 
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        .content-block { 
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        .subsection { 
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        .portfolio-content {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        .profile-grid {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        .chart-bar {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        h2, h3, h4 {
            page-break-after: avoid;
            break-after: avoid;
        }
        
        p {
            orphans: 3;
            widows: 3;
        }
        
        li {
            orphans: 2;
            widows: 2;
        }
    }
    
    @page {
        margin: 15mm;
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
            <div class="date">Generado el ${new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
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
        </div>
    </div>
    `;
  }

  /**
   * Sección de la cartera recomendada con gráfico de barras
   */
  generatePortfolioSection(portfolioArray, riskProfile) {
    return `
    <div class="section">
        <h2 class="section-title">
            <div class="section-icon">📊</div>
            Tu Cartera Recomendada - ${riskProfile}
        </h2>
        <div class="portfolio-content">
            <div class="chart-visualization">
                ${portfolioArray.map(asset => `
                <div class="chart-bar">
                    <div class="chart-label">
                        <div class="chart-emoji" style="background: ${asset.color}20;">
                            ${asset.emoji}
                        </div>
                        <span>${asset.name}</span>
                    </div>
                    <div class="chart-bar-container">
                        <div class="chart-bar-fill" style="width: ${asset.value}%; background: ${asset.color};">
                            ${asset.value}%
                        </div>
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
            Análisis de tu Perfil
        </h2>
        <div class="content-block">
            ${report}
        </div>
    </div>
    `;
  }

  /**
   * Sección de Renta Fija
   */
  generateRentaFijaSection(rentaFijaAdvice) {
    if (!rentaFijaAdvice) return '';

    let html = `
    <div class="section">
        <h2 class="section-title">
            <div class="section-icon">🏛️</div>
            ${rentaFijaAdvice.title || 'Renta Fija - Guía Personalizada'}
        </h2>
    `;

    if (rentaFijaAdvice.description) {
      html += `
        <div class="content-block">
            <p><strong>${rentaFijaAdvice.description}</strong></p>
        </div>
      `;
    }

    // Main Content
    if (rentaFijaAdvice.mainContent) {
      html += `
        <div class="content-block">
            <h3>${rentaFijaAdvice.mainContent.title}</h3>
            <p>${rentaFijaAdvice.mainContent.content}</p>
            
            ${rentaFijaAdvice.mainContent.tips && rentaFijaAdvice.mainContent.tips.length > 0 ? `
            <h4>Consejos Clave:</h4>
            <ul>
                ${rentaFijaAdvice.mainContent.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
            ` : ''}
            
            ${rentaFijaAdvice.mainContent.products && rentaFijaAdvice.mainContent.products.length > 0 ? `
            <h4>Productos Recomendados:</h4>
            <div class="product-list">
                ${rentaFijaAdvice.mainContent.products.map(product => `
                <div class="product-item">
                    <span class="product-name">${product.name}</span>
                    <div class="product-description">${product.description}</div>
                </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
      `;
    }

    // Additional Blocks
    if (rentaFijaAdvice.additionalBlocks && rentaFijaAdvice.additionalBlocks.length > 0) {
      rentaFijaAdvice.additionalBlocks.forEach(block => {
        html += `
        <div class="subsection">
            <h3 class="subsection-title">${block.title}</h3>
            <p>${block.content}</p>
        </div>
        `;
      });
    }

    html += `</div>`;
    return html;
  }

  /**
   * Sección de Renta Variable
   */
  generateRentaVariableSection(rentaVariableAdvice) {
    if (!rentaVariableAdvice) return '';

    let html = `
    <div class="section">
        <h2 class="section-title">
            <div class="section-icon">📈</div>
            ${rentaVariableAdvice.title || 'Renta Variable - Guía Personalizada'}
        </h2>
    `;

    if (rentaVariableAdvice.description) {
      html += `
        <div class="content-block">
            <p><strong>${rentaVariableAdvice.description}</strong></p>
        </div>
      `;
    }

    // Main Content
    if (rentaVariableAdvice.mainContent) {
      html += `
        <div class="content-block">
            <h3>${rentaVariableAdvice.mainContent.title}</h3>
            <p>${rentaVariableAdvice.mainContent.content}</p>
            
            ${rentaVariableAdvice.mainContent.tips && rentaVariableAdvice.mainContent.tips.length > 0 ? `
            <h4>Consejos Clave:</h4>
            <ul>
                ${rentaVariableAdvice.mainContent.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
            ` : ''}
            
            ${rentaVariableAdvice.mainContent.products && rentaVariableAdvice.mainContent.products.length > 0 ? `
            <h4>Productos Recomendados:</h4>
            <div class="product-list">
                ${rentaVariableAdvice.mainContent.products.map(product => `
                <div class="product-item">
                    <span class="product-name">${product.name}</span>
                    <div class="product-description">${product.description}</div>
                </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
      `;
    }

    // Additional Blocks
    if (rentaVariableAdvice.additionalBlocks && rentaVariableAdvice.additionalBlocks.length > 0) {
      rentaVariableAdvice.additionalBlocks.forEach(block => {
        html += `
        <div class="subsection">
            <h3 class="subsection-title">${block.title}</h3>
            <p>${block.content}</p>
        </div>
        `;
      });
    }

    html += `</div>`;
    return html;
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
        ${educationalGuide.assets.map((asset, index) => `
        <div class="content-block">
            <h3>${asset.title}</h3>
            <p><strong>¿Qué es?</strong> ${asset.description}</p>
            <p><strong>Función en tu cartera:</strong> ${asset.role}</p>
            <p><strong>Rentabilidad esperada:</strong> ${asset.expectedReturn}</p>
            <p><strong>Comportamiento:</strong> ${asset.behavior}</p>
            <p><strong>Ventajas:</strong> ${asset.pros}</p>
            <p><strong>Desventajas:</strong> ${asset.cons}</p>
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
            Diseñado para ayudarte a tomar mejores decisiones de inversión
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
