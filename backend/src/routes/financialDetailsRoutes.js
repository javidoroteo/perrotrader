
const express = require('express');
const router = express.Router();
const {
  getFinancialDetails,
  getMultipleProducts,
  getProductsByCategory,
  getBrokers
} = require('../controllers/financialDetailsController');

// Ruta principal - obtener detalles de un producto específico
router.get('/financial-details/:symbol', getFinancialDetails);

// Ruta para obtener múltiples productos
router.post('/financial-details/multiple', getMultipleProducts);

// Ruta para filtrar productos por categoría/tipo
router.get('/products', getProductsByCategory);

// Ruta para obtener brokers
router.get('/brokers', getBrokers);

module.exports = router;
