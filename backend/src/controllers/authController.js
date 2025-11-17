// backend/src/controllers/authController.js
const passport = require('passport');
const prisma = require('../utils/prisma');
const jwt = require('jsonwebtoken');

googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

googleCallback = (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true
  }, (err, user) => {
    if (err || !user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=login_failed`);
      }
      
      // Redirigir al frontend con token JWT
      const token = generateToken(user);
      return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    });
  })(req, res, next);
};

getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        dateOfBirth: true,
        createdAt: true,
        lastLoginAt: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

logout = (req, res) => {
  req.logout();
  res.json({ success: true });
};

// ===== NUEVAS FUNCIONES PARA SETTINGS =====

// Obtener perfil completo del usuario
getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        portfolios: {
          include: {
            holdings: true
          }
        }
      }
    });

    // Obtener perfil de inversor del último reporte guardado
    const lastReport = await prisma.savedReport.findFirst({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        session: true
      }
    });

    let investorProfile = null;
    if (lastReport) {
      investorProfile = {
        riskProfile: lastReport.riskProfile,
        experienceLevel: lastReport.experienceLevel,
        age: lastReport.session?.age,
        investmentHorizon: lastReport.session?.timeValue ? 
          (lastReport.session.timeValue > 7 ? 'Largo plazo' : 'Corto plazo') : null
      };
    }

    res.json({
      profile: investorProfile,
      preferences: {} // Por ahora vacío, preparado para futuro
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

// Actualizar preferencias de notificaciones (preparado para futuro)
updatePreferences = async (req, res) => {
  try {
    const { notifications } = req.body;

    // Por ahora solo guardamos en memoria, en futuro crear tabla UserPreferences
    // await prisma.userPreferences.upsert({
    //   where: { userId: req.user.id },
    //   update: { notifications },
    //   create: { userId: req.user.id, notifications }
    // });

    res.json({ 
      success: true, 
      message: 'Preferencias guardadas (funcionalidad en desarrollo)' 
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ error: 'Error al actualizar preferencias' });
  }
};

// Actualizar perfil de inversor manualmente
updateInvestorProfile = async (req, res) => {
  try {
    const { riskProfile } = req.body;

    // Actualizar en todos los portfolios del usuario
    await prisma.portfolio.updateMany({
      where: { userId: req.user.id },
      data: { riskProfile }
    });

    // Actualizar en el último reporte guardado
    const lastReport = await prisma.savedReport.findFirst({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    if (lastReport) {
      await prisma.savedReport.update({
        where: { id: lastReport.id },
        data: { riskProfile }
      });
    }

    res.json({ 
      success: true, 
      profile: { riskProfile } 
    });
  } catch (error) {
    console.error('Error updating investor profile:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

// Exportar datos del usuario (GDPR)
exportUserData = async (req, res) => {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        portfolios: {
          include: {
            holdings: {
              include: {
                asset: true
              }
            },
            transactions: true
          }
        },
        quizSessions: {
          include: {
            answers: true,
            personalityTest: true,
            savedReport: true
          }
        }
      }
    });

    // Generar JSON limpio sin campos sensibles
    const exportData = {
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        createdAt: userData.createdAt,
        lastLoginAt: userData.lastLoginAt
      },
      portfolios: userData.portfolios.map(p => ({
        id: p.id,
        name: p.name,
        riskProfile: p.riskProfile,
        totalSavings: p.totalSavings,
        currentValue: p.currentValue,
        createdAt: p.createdAt,
        holdings: p.holdings.map(h => ({
          asset: h.asset.name,
          ticker: h.asset.ticker,
          quantity: h.quantity,
          averagePrice: h.averagePrice,
          currentValue: h.currentValue
        })),
        transactions: p.transactions.map(t => ({
          type: t.type,
          quantity: t.quantity,
          pricePerUnit: t.pricePerUnit,
          totalAmount: t.totalAmount,
          createdAt: t.createdAt
        }))
      })),
      quizSessions: userData.quizSessions.map(s => ({
        completedAt: s.createdAt,
        riskProfile: s.riskProfile,
        totalScore: s.totalScore,
        hasReport: !!s.savedReport
      })),
      exportedAt: new Date().toISOString(),
      exportedBy: 'IsFinz Platform'
    };

    res.json(exportData);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Error al exportar datos' });
  }
};

// Eliminar cuenta y todos los datos
deleteAccount = async (req, res) => {
  try {
    // Prisma eliminará en cascada gracias a onDelete: Cascade en las relaciones
    await prisma.user.delete({
      where: { id: req.user.id }
    });

    // Invalidar sesión
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al invalidar sesión' });
      }
      res.json({ 
        success: true, 
        message: 'Cuenta eliminada correctamente' 
      });
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Error al eliminar cuenta' });
  }
};

// Función auxiliar para generar JWT
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      name: user.name 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Actualizar perfil básico del usuario
updateProfile = async (req, res) => {
  try {
    const { name, dateOfBirth } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name || req.user.name,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : req.user.dateOfBirth
      },
      select: {
        id: true,
        email: true,
        name: true,
        dateOfBirth: true,
        createdAt: true,
        lastLoginAt: true
      }
    });

    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

// Verificar si el usuario está autenticado
checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ 
        authenticated: false 
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        lastLoginAt: true
      }
    });

    res.json({
      authenticated: true,
      user
    });
  } catch (error) {
    console.error('Error checking auth:', error);
    res.status(500).json({ error: 'Error al verificar autenticación' });
  }
};


module.exports = {
  googleAuth,
  googleCallback,
  getCurrentUser,
  logout,
  getProfile,
  updatePreferences,
  updateInvestorProfile,
  exportUserData,
  deleteAccount,
  updateProfile,
  checkAuth
};
