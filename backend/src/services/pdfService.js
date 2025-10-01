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
            return true; // En desarrollo local, Chrome normalmente está disponible
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

            if (process.platform === 'linux') {
                execSync('apt-get update && apt-get install -y wget gnupg');
                execSync('wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -');
                execSync('sh -c "echo \'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main\' >> /etc/apt/sources.list.d/google.list"');
                execSync('apt-get update');
                execSync('apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends');
            }

            console.log('✅ Chrome instalado exitosamente');
            return true;
        } catch (error) {
            console.error('❌ Error instalando Chrome:', error);
            return false;
        }
    }

    /**
     * Genera el PDF completo del reporte
     */
    async generateReportPDF(reportData) {
        let browser = null;

        try {
            console.log('🚀 Iniciando generación de PDF...');
            await this.ensureChromeInstalled();

            const launchOptions = {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ]
            };

            if (process.env.NODE_ENV === 'production') {
                launchOptions.executablePath = '/usr/bin/google-chrome-stable';
            }

            browser = await puppeteer.launch(launchOptions);
            const page = await browser.newPage();

            const htmlContent = this.generateFullHTML(reportData);
            await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

            const pdfOptions = {
                format: 'A4',
                printBackground: true,
                margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
                displayHeaderFooter: true,
                headerTemplate: this.getHeaderTemplate(),
                footerTemplate: this.getFooterTemplate()
            };

            const pdfBuffer = await page.pdf(pdfOptions);
            console.log('✅ PDF generado exitosamente');

            return pdfBuffer;
        } catch (error) {
            console.error('❌ Error generando PDF:', error);
            throw new Error('Error interno del servidor al generar PDF');
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }

    /**
     * Genera el HTML completo del reporte con todas las secciones
     */
    generateFullHTML(reportData) {
        const { session, portfolio, report, personalityResult, rentaFijaAdvice, rentaVariableAdvice, investmentStrategies } = reportData;

        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte de Inversión - ${session?.name || 'Usuario'}</title>
            <style>
                ${this.getCompleteCSS()}
            </style>
        </head>
        <body>
            ${this.generateHeader(session)}
            ${this.generateExecutiveSummary(report)}
            ${this.generatePersonalitySection(personalityResult)}
            ${this.generatePortfolioSection(portfolio, report)}
            ${this.generateEmergencyFundSection(report)}
            ${this.generateRentaFijaSection(rentaFijaAdvice)}
            ${this.generateRentaVariableSection(rentaVariableAdvice)}
            ${this.generateStrategiesSection(investmentStrategies)}
            ${this.generateEducationalSection()}
            ${this.generateRecommendationsSection(report)}
            ${this.generateNextStepsSection()}
            ${this.generateDisclaimerSection()}
        </body>
        </html>
        `;
    }

    /**
     * Genera la sección de encabezado
     */
    generateHeader(session) {
        const currentDate = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
        <div class="header-section">
            <div class="logo-container">
                <h1 class="logo">📊 PERROTRADER</h1>
                <p class="tagline">Tu Reporte Personalizado de Inversión</p>
            </div>
            <div class="user-info">
                <h2>Reporte para: ${session?.name || 'Usuario'}</h2>
                <p class="date">Generado el: ${currentDate}</p>
                <p class="session-id">ID Sesión: ${session?.id?.substring(0, 8)}...</p>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de resumen ejecutivo
     */
    generateExecutiveSummary(report) {
        return `
        <div class="section executive-summary">
            <h2>📈 Resumen Ejecutivo</h2>
            <div class="summary-grid">
                <div class="summary-item">
                    <h3>Perfil de Riesgo</h3>
                    <p class="highlight">${report.riskProfile || 'Moderado'}</p>
                </div>
                <div class="summary-item">
                    <h3>Tolerancia al Riesgo</h3>
                    <p class="highlight">${report.riskTolerance}/10</p>
                </div>
                <div class="summary-item">
                    <h3>Horizonte Temporal</h3>
                    <p class="highlight">${report.timeHorizon || 'Largo Plazo'}</p>
                </div>
                <div class="summary-item">
                    <h3>Capital Inicial</h3>
                    <p class="highlight">€${report.initialCapital?.toLocaleString() || 'No especificado'}</p>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de personalidad/arquetipo
     */
    generatePersonalitySection(personalityResult) {
        if (!personalityResult) return '';

        return `
        <div class="section personality-section">
            <h2>🧠 Tu Perfil de Personalidad Inversora</h2>
            <div class="personality-card">
                <h3 class="personality-title">${personalityResult.archetype}</h3>
                <p class="personality-description">${personalityResult.description}</p>
                
                <div class="personality-traits">
                    <h4>Características Principales:</h4>
                    <ul>
                        ${personalityResult.traits?.map(trait => `<li>${trait}</li>`).join('') || ''}
                    </ul>
                </div>

                <div class="personality-strengths">
                    <h4>Fortalezas:</h4>
                    <ul>
                        ${personalityResult.strengths?.map(strength => `<li>${strength}</li>`).join('') || ''}
                    </ul>
                </div>

                <div class="personality-weaknesses">
                    <h4>Áreas de Mejora:</h4>
                    <ul>
                        ${personalityResult.weaknesses?.map(weakness => `<li>${weakness}</li>`).join('') || ''}
                    </ul>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de cartera recomendada
     */
    generatePortfolioSection(portfolio, report) {
        const sortedPortfolio = Object.entries(portfolio).sort((a, b) => b[1] - a[1]);

        return `
        <div class="section portfolio-section">
            <h2>💼 Tu Cartera Recomendada</h2>
            
            <div class="portfolio-chart">
                ${this.generatePortfolioChart(portfolio)}
            </div>

            <div class="portfolio-breakdown">
                <h3>Distribución de Activos</h3>
                <div class="asset-list">
                    ${sortedPortfolio.map(([asset, percentage]) => `
                        <div class="asset-item">
                            <div class="asset-info">
                                <span class="asset-name">${this.getAssetDisplayName(asset)}</span>
                                <span class="asset-percentage">${percentage.toFixed(1)}%</span>
                            </div>
                            <div class="asset-bar">
                                <div class="asset-fill" style="width: ${percentage}%; background-color: ${this.getAssetColor(asset)};"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="portfolio-metrics">
                <h3>Métricas de la Cartera</h3>
                <div class="metrics-grid">
                    <div class="metric-item">
                        <span>Diversificación</span>
                        <span class="metric-value">${this.calculateDiversification(portfolio)}</span>
                    </div>
                    <div class="metric-item">
                        <span>Riesgo Estimado</span>
                        <span class="metric-value">${report.riskTolerance}/10</span>
                    </div>
                    <div class="metric-item">
                        <span>Rentabilidad Esperada</span>
                        <span class="metric-value">${this.calculateExpectedReturn(portfolio)}% anual</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de fondo de emergencia
     */
    generateEmergencyFundSection(report) {
        return `
        <div class="section emergency-section">
            <h2>🛡️ Fondo de Emergencia</h2>
            <div class="emergency-content">
                <div class="emergency-amount">
                    <h3>Cantidad Recomendada</h3>
                    <p class="highlight-amount">€${report.emergencyFund?.toLocaleString() || 'No calculado'}</p>
                    <p class="emergency-description">
                        Equivale a ${report.monthsOfExpenses || 6} meses de gastos mensuales
                    </p>
                </div>
                
                <div class="emergency-tips">
                    <h4>Recomendaciones:</h4>
                    <ul>
                        <li>Mantén este dinero en una cuenta de ahorro líquida</li>
                        <li>No lo inviertas en activos de riesgo</li>
                        <li>Revisa y actualiza la cantidad anualmente</li>
                        <li>Solo úsalo para verdaderas emergencias</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de renta fija
     */
    generateRentaFijaSection(rentaFijaAdvice) {
        if (!rentaFijaAdvice) return '';

        return `
        <div class="section renta-fija-section">
            <h2>🏛️ Renta Fija - Análisis Detallado</h2>
            
            <div class="rf-overview">
                <p class="section-intro">${rentaFijaAdvice.overview || 'La renta fija proporciona estabilidad y ingresos predecibles a tu cartera.'}</p>
            </div>

            <div class="rf-products">
                <h3>Productos Recomendados</h3>
                <div class="products-grid">
                    ${rentaFijaAdvice.recommendedProducts?.map(product => `
                        <div class="product-card">
                            <h4>${product.name}</h4>
                            <p class="product-yield">Rentabilidad: ${product.yield}%</p>
                            <p class="product-risk">Riesgo: ${product.riskLevel}</p>
                            <p class="product-description">${product.description}</p>
                        </div>
                    `).join('') || '<p>No hay productos específicos recomendados.</p>'}
                </div>
            </div>

            <div class="rf-strategies">
                <h3>Estrategias de Renta Fija</h3>
                <ul>
                    ${rentaFijaAdvice.strategies?.map(strategy => `<li>${strategy}</li>`).join('') || '<li>Diversificar entre diferentes emisores y plazos</li>'}
                </ul>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de renta variable
     */
    generateRentaVariableSection(rentaVariableAdvice) {
        if (!rentaVariableAdvice) return '';

        return `
        <div class="section renta-variable-section">
            <h2>📈 Renta Variable - Oportunidades de Crecimiento</h2>
            
            <div class="rv-overview">
                <p class="section-intro">${rentaVariableAdvice.overview || 'La renta variable ofrece potencial de crecimiento a largo plazo, aunque con mayor volatilidad.'}</p>
            </div>

            <div class="rv-sectors">
                <h3>Sectores Recomendados</h3>
                <div class="sectors-grid">
                    ${rentaVariableAdvice.recommendedSectors?.map(sector => `
                        <div class="sector-card">
                            <h4>${sector.name}</h4>
                            <p class="sector-weight">Peso: ${sector.weight}%</p>
                            <p class="sector-rationale">${sector.rationale}</p>
                        </div>
                    `).join('') || '<p>Diversificación amplia recomendada.</p>'}
                </div>
            </div>

            <div class="rv-etfs">
                <h3>ETFs Recomendados</h3>
                <div class="etf-list">
                    ${rentaVariableAdvice.recommendedETFs?.map(etf => `
                        <div class="etf-item">
                            <span class="etf-name">${etf.name}</span>
                            <span class="etf-ticker">${etf.ticker}</span>
                            <span class="etf-expense">${etf.expenseRatio}%</span>
                        </div>
                    `).join('') || '<p>Se recomienda investigar ETFs diversificados de bajo coste.</p>'}
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de estrategias de inversión
     */
    generateStrategiesSection(investmentStrategies) {
        if (!investmentStrategies) return '';

        return `
        <div class="section strategies-section">
            <h2>🎯 Estrategias de Inversión Recomendadas</h2>
            
            <div class="strategies-grid">
                ${investmentStrategies.map(strategy => `
                    <div class="strategy-card">
                        <h3>${strategy.name}</h3>
                        <p class="strategy-suitability">Adecuación: ${strategy.suitability}</p>
                        <p class="strategy-description">${strategy.description}</p>
                        
                        <div class="strategy-details">
                            <h4>Cómo implementarla:</h4>
                            <ul>
                                ${strategy.implementation?.map(step => `<li>${step}</li>`).join('') || ''}
                            </ul>
                        </div>

                        <div class="strategy-pros-cons">
                            <div class="pros">
                                <h5>✅ Ventajas:</h5>
                                <ul>
                                    ${strategy.pros?.map(pro => `<li>${pro}</li>`).join('') || ''}
                                </ul>
                            </div>
                            <div class="cons">
                                <h5>❌ Desventajas:</h5>
                                <ul>
                                    ${strategy.cons?.map(con => `<li>${con}</li>`).join('') || ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección educacional
     */
    generateEducationalSection() {
        return `
        <div class="section educational-section">
            <h2>📚 Guía Educativa</h2>
            
            <div class="education-topics">
                <div class="topic-card">
                    <h3>Diversificación</h3>
                    <p>No pongas todos los huevos en la misma cesta. La diversificación reduce el riesgo distribuyendo las inversiones entre diferentes activos, sectores y geografías.</p>
                </div>

                <div class="topic-card">
                    <h3>Inversión a Largo Plazo</h3>
                    <p>El tiempo es tu mejor aliado. Las inversiones a largo plazo tienden a suavizar la volatilidad y beneficiarse del interés compuesto.</p>
                </div>

                <div class="topic-card">
                    <h3>Costes de Inversión</h3>
                    <p>Los costes reducen tu rentabilidad. Busca productos con comisiones bajas y evita el trading frecuente.</p>
                </div>

                <div class="topic-card">
                    <h3>Rebalanceo</h3>
                    <p>Mantén tu asignación de activos objetivo rebalanceando periódicamente tu cartera.</p>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de recomendaciones
     */
    generateRecommendationsSection(report) {
        return `
        <div class="section recommendations-section">
            <h2>💡 Recomendaciones Personalizadas</h2>
            
            <div class="recommendations-list">
                <div class="recommendation-item">
                    <h3>🎯 Próximos Pasos</h3>
                    <ul>
                        <li>Establece tu fondo de emergencia antes de invertir</li>
                        <li>Abre una cuenta con un bróker de confianza y bajo coste</li>
                        <li>Comienza con inversiones pequeñas y regulares</li>
                        <li>Revisa tu cartera trimestralmente</li>
                    </ul>
                </div>

                <div class="recommendation-item">
                    <h3>📖 Recursos Recomendados</h3>
                    <ul>
                        <li>Libros: "Un Paseo Aleatorio por Wall Street" - Burton Malkiel</li>
                        <li>Podcast: "Finanzas para Mortales"</li>
                        <li>Blogs: Invertir Joven, Ciudadano Eco</li>
                        <li>Cursos: CNMV - Portal del Inversor</li>
                    </ul>
                </div>

                <div class="recommendation-item">
                    <h3>⚠️ Errores a Evitar</h3>
                    <ul>
                        <li>No invertir dinero que necesitas a corto plazo</li>
                        <li>Evitar el pánico durante las caídas del mercado</li>
                        <li>No intentar timing del mercado</li>
                        <li>Diversificar siempre tus inversiones</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de próximos pasos
     */
    generateNextStepsSection() {
        return `
        <div class="section next-steps-section">
            <h2>🚀 Plan de Acción</h2>
            
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-marker">1</div>
                    <div class="timeline-content">
                        <h3>Esta Semana</h3>
                        <ul>
                            <li>Calcula tus gastos mensuales exactos</li>
                            <li>Abre una cuenta de ahorro para emergencias</li>
                            <li>Investiga brokers recomendados</li>
                        </ul>
                    </div>
                </div>

                <div class="timeline-item">
                    <div class="timeline-marker">2</div>
                    <div class="timeline-content">
                        <h3>Este Mes</h3>
                        <ul>
                            <li>Completa tu fondo de emergencia</li>
                            <li>Abre cuenta con un bróker</li>
                            <li>Realiza tu primera inversión pequeña</li>
                        </ul>
                    </div>
                </div>

                <div class="timeline-item">
                    <div class="timeline-marker">3</div>
                    <div class="timeline-content">
                        <h3>Próximos 3 Meses</h3>
                        <ul>
                            <li>Establece inversiones automáticas mensuales</li>
                            <li>Aprende sobre los productos que has comprado</li>
                            <li>Revisa y ajusta tu estrategia</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Genera la sección de disclaimer
     */
    generateDisclaimerSection() {
        return `
        <div class="section disclaimer-section">
            <h2>⚖️ Aviso Legal</h2>
            <div class="disclaimer-content">
                <p><strong>Este reporte es únicamente informativo y educativo.</strong> No constituye asesoramiento financiero personalizado ni recomendación de inversión.</p>
                
                <ul class="disclaimer-list">
                    <li>Las inversiones conllevan riesgo de pérdida del capital.</li>
                    <li>Los rendimientos pasados no garantizan resultados futuros.</li>
                    <li>Consulta con un asesor financiero cualificado antes de tomar decisiones de inversión.</li>
                    <li>Diversifica siempre tus inversiones y no inviertas más de lo que puedas permitirte perder.</li>
                    <li>Este análisis se basa en información general y puede no ser adecuado para tu situación específica.</li>
                </ul>

                <p class="disclaimer-footer">
                    Perrotrader - Hacemos más fácil la inversión a través de la educación financiera.
                    <br>Generado el ${new Date().toLocaleString('es-ES')}
                </p>
            </div>
        </div>
        `;
    }

    /**
     * CSS completo para el reporte
     */
    getCompleteCSS() {
        return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #f8f9fa;
        }

        .header-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            margin-bottom: 2rem;
            border-radius: 10px;
        }

        .logo {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .tagline {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 1rem;
        }

        .user-info h2 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        .date, .session-id {
            opacity: 0.8;
            font-size: 0.9rem;
        }

        .section {
            background: white;
            padding: 2rem;
            margin-bottom: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            page-break-inside: avoid;
        }

        .section h2 {
            color: #2c3e50;
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            border-bottom: 3px solid #3498db;
            padding-bottom: 0.5rem;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .summary-item {
            text-align: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }

        .summary-item h3 {
            color: #2c3e50;
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }

        .highlight {
            font-size: 1.5rem;
            font-weight: bold;
            color: #3498db;
        }

        .highlight-amount {
            font-size: 2rem;
            font-weight: bold;
            color: #27ae60;
            text-align: center;
        }

        .personality-card {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 10px;
            border-left: 5px solid #9b59b6;
        }

        .personality-title {
            font-size: 1.8rem;
            color: #9b59b6;
            margin-bottom: 1rem;
        }

        .personality-description {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            color: #555;
        }

        .personality-traits, .personality-strengths, .personality-weaknesses {
            margin-bottom: 1rem;
        }

        .personality-traits h4, .personality-strengths h4, .personality-weaknesses h4 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }

        .personality-traits ul, .personality-strengths ul, .personality-weaknesses ul {
            list-style-type: none;
            padding-left: 0;
        }

        .personality-traits li, .personality-strengths li, .personality-weaknesses li {
            padding: 0.3rem 0;
            border-left: 3px solid #3498db;
            padding-left: 1rem;
            margin-bottom: 0.3rem;
        }

        .portfolio-chart {
            margin: 2rem 0;
            text-align: center;
        }

        .asset-list {
            margin-top: 1rem;
        }

        .asset-item {
            margin-bottom: 1rem;
        }

        .asset-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.3rem;
        }

        .asset-name {
            font-weight: bold;
        }

        .asset-percentage {
            color: #3498db;
            font-weight: bold;
        }

        .asset-bar {
            height: 8px;
            background: #ecf0f1;
            border-radius: 4px;
            overflow: hidden;
        }

        .asset-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .metric-item {
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #e74c3c;
        }

        .metric-value {
            font-weight: bold;
            color: #e74c3c;
        }

        .emergency-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-top: 1rem;
        }

        .emergency-amount {
            text-align: center;
            padding: 2rem;
            background: #f8f9fa;
            border-radius: 10px;
            border: 2px solid #27ae60;
        }

        .emergency-description {
            color: #555;
            font-style: italic;
            margin-top: 0.5rem;
        }

        .emergency-tips ul {
            list-style-type: none;
            padding-left: 0;
        }

        .emergency-tips li {
            padding: 0.5rem 0;
            border-left: 3px solid #27ae60;
            padding-left: 1rem;
            margin-bottom: 0.5rem;
        }

        .products-grid, .sectors-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .product-card, .sector-card, .strategy-card {
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }

        .product-card h4, .sector-card h4 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }

        .product-yield, .sector-weight {
            font-weight: bold;
            color: #27ae60;
            margin-bottom: 0.5rem;
        }

        .product-risk {
            color: #e74c3c;
            margin-bottom: 0.5rem;
        }

        .etf-list {
            margin-top: 1rem;
        }

        .etf-item {
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }

        .strategies-grid {
            display: grid;
            gap: 2rem;
            margin-top: 1rem;
        }

        .strategy-card {
            border-left-color: #9b59b6;
        }

        .strategy-suitability {
            color: #9b59b6;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        .strategy-details, .strategy-pros-cons {
            margin-top: 1rem;
        }

        .strategy-pros-cons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .pros, .cons {
            padding: 1rem;
            border-radius: 8px;
        }

        .pros {
            background: #d5e8d4;
            border-left: 4px solid #27ae60;
        }

        .cons {
            background: #f8cecc;
            border-left: 4px solid #e74c3c;
        }

        .education-topics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .topic-card {
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #f39c12;
        }

        .topic-card h3 {
            color: #f39c12;
            margin-bottom: 1rem;
        }

        .recommendations-list {
            margin-top: 1rem;
        }

        .recommendation-item {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }

        .recommendation-item h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }

        .timeline {
            margin-top: 1rem;
        }

        .timeline-item {
            display: flex;
            margin-bottom: 2rem;
            align-items: flex-start;
        }

        .timeline-marker {
            background: #3498db;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 1rem;
            flex-shrink: 0;
        }

        .timeline-content {
            flex: 1;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .timeline-content h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }

        .disclaimer-content {
            background: #fff3cd;
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid #ffeaa7;
        }

        .disclaimer-list {
            margin: 1rem 0;
            padding-left: 2rem;
        }

        .disclaimer-list li {
            margin-bottom: 0.5rem;
        }

        .disclaimer-footer {
            margin-top: 2rem;
            text-align: center;
            font-style: italic;
            color: #666;
        }

        .section-intro {
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 1.5rem;
            font-style: italic;
        }

        @media print {
            .section {
                page-break-inside: avoid;
            }
            
            .header-section {
                page-break-after: avoid;
            }
        }
        `;
    }

    /**
     * Plantilla del header para PDF
     */
    getHeaderTemplate() {
        return `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666; margin-top: 10px;">
            <span>PERROTRADER - Reporte de Inversión Personalizado</span>
        </div>
        `;
    }

    /**
     * Plantilla del footer para PDF
     */
    getFooterTemplate() {
        return `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666; margin-bottom: 10px;">
            <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span> | Generado por Perrotrader</span>
        </div>
        `;
    }

    /**
     * Genera un gráfico simple de la cartera en HTML/CSS
     */
    generatePortfolioChart(portfolio) {
        const sortedPortfolio = Object.entries(portfolio).sort((a, b) => b[1] - a[1]);
        
        return `
        <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; min-height: 200px; gap: 10px;">
            ${sortedPortfolio.map(([asset, percentage]) => `
                <div style="
                    background: ${this.getAssetColor(asset)};
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    min-width: 120px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                ">
                    <div style="font-weight: bold; font-size: 1.2rem;">${percentage.toFixed(1)}%</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">${this.getAssetDisplayName(asset)}</div>
                </div>
            `).join('')}
        </div>
        `;
    }

    /**
     * Obtiene el nombre de visualización para un activo
     */
    getAssetDisplayName(asset) {
        const assetNames = {
            'stocks': 'Acciones',
            'bonds': 'Bonos',
            'gold': 'Oro',
            'crypto': 'Criptomonedas',
            'cash': 'Efectivo',
            'reits': 'REITs',
            'commodities': 'Materias Primas',
            'international': 'Internacional'
        };
        return assetNames[asset] || asset.charAt(0).toUpperCase() + asset.slice(1);
    }

    /**
     * Obtiene el color para un activo
     */
    getAssetColor(asset) {
        const assetColors = {
            'stocks': '#3498db',
            'bonds': '#27ae60',
            'gold': '#f39c12',
            'crypto': '#9b59b6',
            'cash': '#95a5a6',
            'reits': '#e74c3c',
            'commodities': '#34495e',
            'international': '#16a085'
        };
        return assetColors[asset] || '#7f8c8d';
    }

    /**
     * Calcula la diversificación de la cartera
     */
    calculateDiversification(portfolio) {
        const assets = Object.keys(portfolio);
        const nonZeroAssets = assets.filter(asset => portfolio[asset] > 0);
        
        if (nonZeroAssets.length <= 2) return 'Baja';
        if (nonZeroAssets.length <= 4) return 'Media';
        return 'Alta';
    }

    /**
     * Calcula la rentabilidad esperada de la cartera
     */
    calculateExpectedReturn(portfolio) {
        const expectedReturns = {
            'stocks': 7,
            'bonds': 3,
            'gold': 2,
            'crypto': 15,
            'cash': 0.5,
            'reits': 6,
            'commodities': 4,
            'international': 6
        };

        let totalReturn = 0;
        Object.entries(portfolio).forEach(([asset, percentage]) => {
            totalReturn += (percentage / 100) * (expectedReturns[asset] || 5);
        });

        return totalReturn.toFixed(1);
    }
}

module.exports = PDFService;
