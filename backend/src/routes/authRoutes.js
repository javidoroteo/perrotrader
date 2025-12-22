//AuthRoutes.js

const express = require('express');
const passport = require('../config/passport');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Iniciar autenticación con Google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Callback de Google OAuth
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/auth/error`,
    session: true
  }),
  authController.googleCallback
);

// Obtener perfil del usuario autenticado
router.get('/profile', isAuthenticated, authController.getProfile);

// Actualizar perfil del usuario
router.put('/profile', isAuthenticated, authController.updateProfile);

// Cerrar sesión
router.post('/logout', authController.logout);

// Verificar autenticación
router.get('/check', authController.checkAuth);

// PUT /api/auth/preferences - Actualizar preferencias
router.put('/preferences', isAuthenticated, authController.updatePreferences);

// PUT /api/auth/investor-profile - Actualizar perfil de inversor
router.put('/investor-profile', isAuthenticated, authController.updateInvestorProfile);

// GET /api/auth/export-data - Exportar datos del usuario (GDPR)
router.get('/export-data', isAuthenticated, authController.exportUserData);

// DELETE /api/auth/account - Eliminar cuenta y todos los datos
router.delete('/account', isAuthenticated, authController.deleteAccount);




module.exports = router;
