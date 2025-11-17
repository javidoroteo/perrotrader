FROM node:18-slim

# Instalar dependencias del sistema
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Generar Prisma Client
RUN npx prisma generate

# Copiar el resto del código
COPY . .

# ✅ NO definir PORT aquí (Cloud Run lo inyecta automáticamente)
# ✅ EXPOSE es opcional, pero no hace daño
EXPOSE 8080

# Comando de inicio
CMD ["npm", "start"]
