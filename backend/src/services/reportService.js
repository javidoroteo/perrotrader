const prisma = require('../utils/prismaClient');

/**
 * Servicio para guardar y recuperar reportes completos del quiz
 */
class ReportService {
  
  /**
   * Guardar el reporte completo generado después del quiz
   */
  async saveReport(sessionId, reportData) {
    try {
      const session = await prisma.quizSession.findUnique({
        where: { id: sessionId },
        include: { personalityTest: true }
      });

      if (!session) {
        throw new Error('Sesión no encontrada');
      }
      const finalUserId = userId || session.userId;

      // Verificar si ya existe un reporte guardado
      const existingReport = await prisma.savedReport.findUnique({
        where: { sessionId }
      });

      const reportPayload = {
        sessionId,
        userId: finalUserId,
        riskProfile: reportData.riskProfile,
        experienceLevel: reportData.experienceLevel,
        portfolioAllocation: JSON.stringify(reportData.portfolio),
        investorProfile: JSON.stringify(reportData.investorProfile),
        recommendations: JSON.stringify(reportData.report || {}),
        educationalGuide: JSON.stringify(reportData.educationalGuide || {}),
        rentaFijaAdvice: JSON.stringify(reportData.rentaFijaAdvice || {}),
        rentaVariableAdvice: JSON.stringify(reportData.rentaVariableAdvice || {}),
        investmentStrategies: JSON.stringify(reportData.investmentStrategies || {}),
        personalityProfile: session.personalityTest 
          ? JSON.stringify({
              archetype: session.personalityTest.archetype,
              archetypeName: session.personalityTest.archetypeName,
              scores: {
                planning: session.personalityTest.planningScore,
                analysis: session.personalityTest.analysisScore,
                autonomy: session.personalityTest.autonomyScore,
                ambition: session.personalityTest.ambitionScore
              }
            })
          : null
      };

      let savedReport;
      if (existingReport) {
        savedReport = await prisma.savedReport.update({
          where: { sessionId },
          data: reportPayload
        });
      } else {
        savedReport = await prisma.savedReport.create({
          data: reportPayload
        });
      }
      if (finalUserId && !session.userId) {
        await prisma.quizSession.update({
            where: { id: sessionId },
            data: { userId: finalUserId }
        });
    }

      return savedReport;
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  }

  /**
   * Obtener reporte guardado por sessionId
   */
  async getReportBySession(sessionId) {
    try {
      const report = await prisma.savedReport.findUnique({
        where: { sessionId }
      });

      if (!report) {
        return null;
      }

      return this.parseReport(report);
    } catch (error) {
      console.error('Error getting report:', error);
      throw error;
    }
  }

  /**
   * Obtener todos los reportes de un usuario
   */
  async getUserReports(userId) {
    try {
      const reports = await prisma.savedReport.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          session: {
            select: {
              id: true,
              createdAt: true,
              isCompleted: true
            }
          }
        }
      });

      return reports.map(report => this.parseReport(report));
    } catch (error) {
      console.error('Error getting user reports:', error);
      throw error;
    }
  }

  /**
   * Parsear campos JSON del reporte
   */
  parseReport(report) {
    return {
      id: report.id,
      sessionId: report.sessionId,
      userId: report.userId,
      createdAt: report.createdAt,
      riskProfile: report.riskProfile,
      experienceLevel: report.experienceLevel,
      portfolio: JSON.parse(report.portfolioAllocation),
      investorProfile: JSON.parse(report.investorProfile),
      recommendations: JSON.parse(report.recommendations),
      educationalGuide: JSON.parse(report.educationalGuide),
      rentaFijaAdvice: JSON.parse(report.rentaFijaAdvice),
      rentaVariableAdvice: JSON.parse(report.rentaVariableAdvice),
      investmentStrategies: JSON.parse(report.investmentStrategies),
      personalityProfile: report.personalityProfile 
        ? JSON.parse(report.personalityProfile) 
        : null
    };
  }
  async getLastReportByUser(userId) {
  return await prisma.savedReport.findFirst({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' }, // El más reciente
    include: { session: true } // Incluir datos de sesión si es necesario
  });
}

  /**
   * Eliminar reporte
   */
  async deleteReport(sessionId, userId) {
    try {
      const report = await prisma.savedReport.findUnique({
        where: { sessionId }
      });

      if (!report) {
        throw new Error('Reporte no encontrado');
      }

      if (report.userId !== userId) {
        throw new Error('No autorizado para eliminar este reporte');
      }

      await prisma.savedReport.delete({
        where: { sessionId }
      });

      return { success: true, message: 'Reporte eliminado' };
    } catch (error) {
      console.error('Error deleting report:', error);
      throw error;
    }
  }
}

module.exports = new ReportService();
