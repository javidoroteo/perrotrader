// backend/utils/prismaClient.js
const { PrismaClient } = require('@prisma/client');

// Inicializa PrismaClient UNA SOLA VEZ
const prisma = new PrismaClient();

// Exporta la instancia para que otros módulos puedan usarla
module.exports = prisma;