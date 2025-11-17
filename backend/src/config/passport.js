const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('../utils/prismaClient');

// Serializar usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Estrategia de Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Buscar usuario existente por Google ID
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id }
        });

        // Si no existe, buscar por email
        if (!user && profile.emails && profile.emails.length > 0) {
          user = await prisma.user.findUnique({
            where: { email: profile.emails[0].value }
          });

          // Si existe con ese email pero sin Google ID, actualizar
          if (user) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                googleId: profile.id,
                provider: 'google',
                lastLoginAt: new Date()
              }
            });
          }
        }

        // Si no existe ningún usuario, crear uno nuevo
        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              provider: 'google',
              lastLoginAt: new Date()
            }
          });
        } else {
          // Actualizar última fecha de login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
          });
        }

        return done(null, user);
      } catch (error) {
        console.error('Error en Google OAuth:', error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
