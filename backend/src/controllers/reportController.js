const reportService = require('../services/reportService');

/**
 * Controller para reportes guardados
 */
class ReportController {
  /**
   * Obtener reporte por sessionId
   */
  async getReport(req, res) {
    try {
      const { sessionId } = req.params;
      const report = await reportService.getReportBySession(sessionId);

      if (!report) {
        return res.status(404).json({
          error: 'Reporte no encontrado'
        });
      }

      res.json({
        success: true,
        report
      });
    } catch (error) {
      console.error('Error getting report:', error);
      res.status(500).json({
        error: 'Error obteniendo reporte',
        message: error.message
      });
    }
  }

  /**
   * Obtener todos los reportes del usuario
   */
  async getUserReports(req, res) {
    try {
      const reports = await reportService.getUserReports(req.user.id);
      
      res.json({
        success: true,
        count: reports.length,
        reports
      });
    } catch (error) {
      console.error('Error getting user reports:', error);
      res.status(500).json({
        error: 'Error obteniendo reportes',
        message: error.message
      });
    }
  }

  /**
   * Eliminar reporte
   */
  async deleteReport(req, res) {
    try {
      const { sessionId } = req.params;
      const result = await reportService.deleteReport(sessionId, req.user.id);
      
      res.json(result);
    } catch (error) {
      console.error('Error deleting report:', error);
      res.status(500).json({
        error: 'Error eliminando reporte',
        message: error.message
      });
    }
  }

  /**
   * Obtener reporte del usuario autenticado
   */
  async getMyReport(req, res) {
    try {
      const { sessionId } = req.params;
      const report = await reportService.getReportBySession(sessionId);

      if (!report) {
        return res.status(404).json({
          error: 'Reporte no encontrado'
        });
      }

      // Verificar que el reporte pertenece al usuario autenticado
      if (report.userId !== req.user.id) {
        return res.status(403).json({
          error: 'No tienes permiso para ver este reporte'
        });
      }

      res.json({
        success: true,
        report
      });
    } catch (error) {
      console.error('Error getting my report:', error);
      res.status(500).json({
        error: 'Error obteniendo reporte',
        message: error.message
      });
    }
  }
}

module.exports = new ReportController();
