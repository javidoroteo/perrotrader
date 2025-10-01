const express = require('express');
const router = express.Router();
const { getFinancialDetails } = require('../controllers/financialDetailsController');

// Middleware simple de validación
const validateSymbol = (req, res, next) => {
  const { symbol } = req.params;
  if (!symbol || symbol.length > 20) {
    return res.status(400).json({
      success: false,
      error: 'Símbolo no válido'
    });
  }
  next();
};

// GET /api/financial-details/:symbol
router.get('/:symbol', validateSymbol, getFinancialDetails);

module.exports = router;
