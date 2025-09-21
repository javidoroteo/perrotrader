// backend/src/services/pdfService.js

const puppeteer = require('puppeteer');
const path = require('path');

class PDFService {
  
  /**
   * Genera un PDF del reporte completo del usuario
   */
  async generateReportPDF(reportData, sessionData) {
    let browser = null;
    
    try {
      // Configurar Puppeteer
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
        ]
      });
      
      const page = await browser.newPage();
      
      // Configurar página
      await page.setViewport({ width: 1200, height: 800 });
      
      // Generar HTML del reporte
      const htmlContent = this.generateReportHTML(reportData, sessionData);
      
      await page.setContent(htmlContent, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Generar PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          bottom: '20px',
          left: '20px',
          right: '20px'
        }
      });
      
      return pdfBuffer;
      
    } catch (error) {
      console.error('Error generando PDF:', error);
      throw new Error('No se pudo generar el PDF del reporte');
    } finally {
      if (browser) {
        await browser.close();
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
    const portfolioArray = Object.entries(portfolio).map(([asset, percentage]) => ({
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
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
        
        <script>
            ${this.generateChartScript(portfolioArray)}
        </script>
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
    
    .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
        opacity: 0.3;
    }
    
    .header-content {
        position: relative;
        z-index: 1;
    }
    
    .logo {
        font-size: 2.5rem;
        font-weight: 900;
        background: linear-gradient(45deg, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
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
    
    .chart-container {
        position: relative;
        height: 300px;
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
        transition: all 0.3s ease;
    }
    
    .asset-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
        border-left: 4px solid;
        border-left-color: #2563eb;
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
    
    .risk-scale {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
    }
    
    .risk-bar {
        flex: 1;
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .risk-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
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
        background: linear-gradient(45deg, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
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
                <canvas id="portfolioChart"></canvas>
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
            <h4>Fondo de Emergencia</h4>
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

  /**
   * Script para generar el gráfico circular
   */
  generateChartScript(portfolioArray) {
    return `
    document.addEventListener('DOMContentLoaded', function() {
        const ctx = document.getElementById('portfolioChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ${JSON.stringify(portfolioArray.map(asset => asset.name))},
                datasets: [{
                    data: ${JSON.stringify(portfolioArray.map(asset => asset.value))},
                    backgroundColor: ${JSON.stringify(portfolioArray.map(asset => asset.color))},
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
        
        // Esperar a que el gráfico se renderice antes de generar el PDF
        setTimeout(() => {
            if (window.chartReady) window.chartReady();
        }, 1000);
    });
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
}

module.exports = new PDFService();