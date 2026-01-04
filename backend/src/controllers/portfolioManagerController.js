// backend/src/controllers/portfolioManagerController.js
// ✅ VERSIÓN COMPLETA - Todos los métodos (existentes + nuevos de compartir)

const prisma = require('../utils/prisma');
const portfolioManagerService = require('../services/portfolioManagerService');
const reportService = require('../services/reportService');
const crypto = require('crypto');

/**
 * Controller para gestión de portfolios del usuario
 */
class PortfolioManagerController {

  /**
   * Crear portfolio desde quiz
   */
  async createFromQuiz(req, res) {
    try {
      const { sessionId, name, totalSavings } = req.body;

      if (!sessionId) {
        return res.status(400).json({
          error: 'sessionId es requerido'
        });
      }

      const portfolio = await portfolioManagerService.createFromQuiz(
        req.user.id,
        sessionId,
        name,
        parseFloat(totalSavings)
      );

      res.json({
        success: true,
        message: 'Portfolio creado correctamente',
        portfolio
      });
    } catch (error) {
      console.error('Error creating portfolio:', error);
      res.status(500).json({
        error: 'Error creando portfolio',
        message: error.message
      });
    }
  }

  /**
   * Listar portfolios del usuario
   */
  async listPortfolios(req, res) {
    try {
      const portfolios = await portfolioManagerService.getUserPortfolios(req.user.id);

      res.json({
        success: true,
        count: portfolios.length,
        portfolios
      });
    } catch (error) {
      console.error('Error listing portfolios:', error);
      res.status(500).json({
        error: 'Error obteniendo portfolios',
        message: error.message
      });
    }
  }

  /**
   * Obtener detalles de un portfolio
   */
  async getPortfolio(req, res) {
    try {
      const { portfolioId } = req.params;

      const portfolio = await portfolioManagerService.getPortfolioDetails(
        portfolioId,
        req.user.id
      );

      res.json({
        success: true,
        portfolio
      });
    } catch (error) {
      console.error('Error getting portfolio:', error);
      res.status(500).json({
        error: 'Error obteniendo portfolio',
        message: error.message
      });
    }
  }

  /**
   * Agregar holding a portfolio
   */
  async addHolding(req, res) {
    try {
      const { portfolioId } = req.params;
      const { ticker, quantity, purchasePrice } = req.body;

      if (!ticker || !quantity || !purchasePrice) {
        return res.status(400).json({
          error: 'ticker, quantity y purchasePrice son requeridos'
        });
      }

      const holding = await portfolioManagerService.addHolding(
        portfolioId,
        req.user.id,
        ticker,
        quantity,
        purchasePrice
      );

      res.json({
        success: true,
        message: 'Asset agregado correctamente',
        holding
      });
    } catch (error) {
      console.error('Error adding holding:', error);
      res.status(500).json({
        error: 'Error agregando asset',
        message: error.message
      });
    }
  }

  /**
   * Obtener sugerencias de inversión
   */
  async getInvestmentSuggestions(req, res) {
    try {
      const { portfolioId } = req.params;

      const suggestions = await portfolioManagerService.getInvestmentSuggestions(
        portfolioId,
        req.user.id
      );

      res.json({
        success: true,
        suggestions
      });
    } catch (error) {
      console.error('Error getting suggestions:', error);
      res.status(500).json({
        error: 'Error obteniendo sugerencias',
        message: error.message
      });
    }
  }

  /**
   * Actualizar portfolio
   */
  async updatePortfolio(req, res) {
    try {
      const { portfolioId } = req.params;
      const { name, totalSavings, recommended } = req.body;

      const portfolio = await portfolioManagerService.updatePortfolio(
        portfolioId,
        req.user.id,
        { name, totalSavings, recommended }
      );

      res.json({
        success: true,
        portfolio
      });
    } catch (error) {
      console.error('Error updating portfolio:', error);
      res.status(500).json({
        error: 'Error actualizando portfolio',
        message: error.message
      });
    }
  }

  /**
   * Eliminar portfolio
   */
  async deletePortfolio(req, res) {
    try {
      const { portfolioId } = req.params;

      await portfolioManagerService.deletePortfolio(portfolioId, req.user.id);

      res.json({
        success: true,
        message: 'Portfolio eliminado correctamente'
      });
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      res.status(500).json({
        error: 'Error eliminando portfolio',
        message: error.message
      });
    }
  }

  // ===== 🆕 NUEVOS MÉTODOS: COMPARTIR PORTFOLIO =====

  /**
   * Crear link para compartir portfolio
   * POST /api/portfolio/:portfolioId/share
   */
  async createShareLink(req, res) {
    try {
      const { portfolioId } = req.params;
      const userId = req.user.id;

      // Verificar que el portfolio pertenece al usuario
      const portfolio = await prisma.portfolio.findFirst({
        where: {
          id: portfolioId,
          userId: userId
        }
      });

      if (!portfolio) {
        return res.status(404).json({
          success: false,
          error: 'Portfolio no encontrado o no autorizado'
        });
      }

      // Generar token único
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 días

      // Crear registro en BD
      const shareLink = await prisma.sharedPortfolio.create({
        data: {
          token,
          portfolioId,
          userId,
          createdBy: userId, // Required field
          expiresAt,
          viewCount: 0
        }
      });

      // Construir URL completa
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const shareUrl = `${baseUrl}/portfolio/shared/${token}`;

      res.json({
        success: true,
        token: shareLink.token,
        shareUrl,
        expiresAt: shareLink.expiresAt,
        portfolioName: portfolio.name
      });

    } catch (error) {
      console.error('Error creating share link:', error);
      res.status(500).json({
        success: false,
        error: 'Error generando link de compartir',
        message: error.message
      });
    }
  }

  /**
   * Obtener portfolio compartido (PÚBLICO)
   * GET /api/portfolio/shared/:token
   */
  async getSharedPortfolio(req, res) {
    try {
      const { token } = req.params;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      // Buscar link compartido
      const shareLink = await prisma.sharedPortfolio.findUnique({
        where: { token },
        include: {
          portfolio: {
            include: {
              holdings: {
                include: {
                  asset: true
                }
              }
            }
          }
        }
      });

      if (!shareLink) {
        return res.status(404).json({
          success: false,
          error: 'Link no encontrado'
        });
      }

      // Verificar expiración
      if (new Date() > new Date(shareLink.expiresAt)) {
        return res.status(410).json({
          success: false,
          error: 'Link expirado',
          expiresAt: shareLink.expiresAt
        });
      }

      // Registrar visualización (analytics)
      const ipHash = crypto.createHash('sha256').update(ipAddress).digest('hex');

      await prisma.sharedPortfolioView.create({
        data: {
          sharedLinkId: shareLink.id,
          ipHash,
          userAgent
        }
      });

      // Incrementar contador
      await prisma.sharedPortfolio.update({
        where: { id: shareLink.id },
        data: {
          viewCount: {
            increment: 1
          }
        }
      });

      // Preparar datos del portfolio (SIN datos personales del usuario)
      const portfolioData = {
        name: shareLink.portfolio.name,
        totalValue: shareLink.portfolio.currentValue || 0,
        totalInvested: shareLink.portfolio.totalInvested || 0,
        totalGain: (shareLink.portfolio.currentValue || 0) - (shareLink.portfolio.totalInvested || 0),
        totalGainPercentage: shareLink.portfolio.totalInvested > 0
          ? ((shareLink.portfolio.currentValue - shareLink.portfolio.totalInvested) / shareLink.portfolio.totalInvested) * 100
          : 0,
        allocation: {
          actualRentaFija: shareLink.portfolio.actualRentaFija || 0,
          actualRentaVariable: shareLink.portfolio.actualRentaVariable || 0,
          actualCrypto: shareLink.portfolio.actualCrypto || 0,
          actualCommodities: shareLink.portfolio.actualCommodities || 0,
          actualCash: shareLink.portfolio.actualCash || 0
        },
        recommendedAllocation: {
          rentaFija: shareLink.portfolio.recommendedRentaFija || 0,
          rentaVariable: shareLink.portfolio.recommendedRentaVariable || 0,
          crypto: shareLink.portfolio.recommendedCrypto || 0,
          commodities: shareLink.portfolio.recommendedCommodities || 0,
          cash: shareLink.portfolio.recommendedCash || 0
        },
        holdings: shareLink.portfolio.holdings.map(h => ({
          ticker: h.asset.ticker,
          name: h.asset.name,
          type: h.asset.type,
          category: h.asset.category,
          quantity: h.quantity,
          averagePrice: h.averagePrice,
          currentPrice: h.currentPrice,
          currentValue: h.currentValue,
          gain: h.currentValue - (h.quantity * h.averagePrice),
          gainPercentage: h.averagePrice > 0
            ? ((h.currentPrice - h.averagePrice) / h.averagePrice) * 100
            : 0
        })),
        sharedAt: shareLink.createdAt,
        expiresAt: shareLink.expiresAt,
        viewCount: shareLink.viewCount
      };

      res.json({
        success: true,
        portfolio: portfolioData,
        isShared: true
      });

    } catch (error) {
      console.error('Error getting shared portfolio:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo portfolio compartido',
        message: error.message
      });
    }
  }

  /**
   * Listar mis links compartidos con analytics
   * GET /api/portfolio/my-share-links
   */
  async getMyShareLinks(req, res) {
    try {
      const userId = req.user.id;

      const shareLinks = await prisma.sharedPortfolio.findMany({
        where: {
          userId,
          expiresAt: {
            gte: new Date() // Solo links activos
          }
        },
        include: {
          portfolio: {
            select: {
              name: true,
              currentValue: true
            }
          },
          views: {
            orderBy: {
              viewedAt: 'desc'
            },
            take: 1 // Solo la última vista
          },
          _count: {
            select: {
              views: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

      const linksWithData = shareLinks.map(link => ({
        id: link.id,
        token: link.token,
        shareUrl: `${baseUrl}/portfolio/shared/${link.token}`,
        portfolioName: link.portfolio.name,
        portfolioValue: link.portfolio.currentValue,
        viewCount: link._count.views,
        lastViewedAt: link.views[0]?.viewedAt || null,
        createdAt: link.createdAt,
        expiresAt: link.expiresAt,
        daysUntilExpiration: Math.ceil(
          (new Date(link.expiresAt) - new Date()) / (1000 * 60 * 60 * 24)
        )
      }));

      res.json({
        success: true,
        count: linksWithData.length,
        shareLinks: linksWithData
      });

    } catch (error) {
      console.error('Error getting share links:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo links compartidos',
        message: error.message
      });
    }
  }

  /**
   * Eliminar/revocar link compartido
   * DELETE /api/portfolio/share-links/:token
   */
  async deleteShareLink(req, res) {
    try {
      const { token } = req.params;
      const userId = req.user.id;

      // Verificar que el link pertenece al usuario
      const shareLink = await prisma.sharedPortfolio.findFirst({
        where: {
          token,
          userId
        }
      });

      if (!shareLink) {
        return res.status(404).json({
          success: false,
          error: 'Link no encontrado o no autorizado'
        });
      }

      // Eliminar link y sus views (cascade)
      await prisma.sharedPortfolio.delete({
        where: { id: shareLink.id }
      });

      res.json({
        success: true,
        message: 'Link eliminado correctamente'
      });

    } catch (error) {
      console.error('Error deleting share link:', error);
      res.status(500).json({
        success: false,
        error: 'Error eliminando link',
        message: error.message
      });
    }
  }
  /**
 * ⭐ NUEVO: Crear portfolio manual (sin quiz)
 * POST /api/portfolio/create-manual
 */
  async createManualPortfolio(req, res) {
    try {
      const { name, totalSavings, manualProfile } = req.body;

      if (!name || !totalSavings) {
        return res.status(400).json({
          error: 'name y capital inicial son requeridos'
        });
      }
      const savingsAmount = parseFloat(totalSavings);
      const portfolio = await portfolioManagerService.createManualPortfolio(
        req.user.id,
        name,
        savingsAmount,
        manualProfile // opcional: { riskTolerance, education, timeHorizon }
      );

      res.json({
        success: true,
        message: 'Portfolio creado correctamente',
        portfolio,
        isManual: true
      });
    } catch (error) {
      console.error('Error creating manual portfolio:', error);
      res.status(500).json({
        error: 'Error creando portfolio manual',
        message: error.message
      });
    }
  }

  /**
   * ⭐ NUEVO: Convertir portfolio manual a portfolio con quiz
   * PUT /api/portfolio/:portfolioId/convert-to-quiz
   */
  async convertToQuizPortfolio(req, res) {
    try {
      const { portfolioId } = req.params;
      const { sessionId } = req.body;

      if (!sessionId) {
        return res.status(400).json({
          error: 'sessionId es requerido'
        });
      }

      const portfolio = await portfolioManagerService.convertToQuizPortfolio(
        portfolioId,
        req.user.id,
        sessionId
      );

      res.json({
        success: true,
        message: 'Portfolio actualizado con datos del quiz',
        portfolio
      });
    } catch (error) {
      console.error('Error converting portfolio:', error);
      res.status(500).json({
        error: 'Error convirtiendo portfolio',
        message: error.message
      });
    }
  }
}

module.exports = new PortfolioManagerController();
