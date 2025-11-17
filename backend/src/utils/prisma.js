const { PrismaClient } = require('@prisma/client');

// Singleton pattern para evitar múltiples instancias en Cloud Run
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn'] 
      : ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
};

// Crear instancia global en desarrollo, nueva en producción
const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Solo en desarrollo, guardar en global para hot-reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
