// backend/src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener datos completos de un producto (batch)
router.post('/batch', productController.getProductsBatch);

// Obtener datos de un producto individual
router.get('/:ticker', productController.getProductDetails);

module.exports = router;
