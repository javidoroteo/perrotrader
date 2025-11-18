# backend/Dockerfile
FROM node:20-alpine AS builder

# Rompe cache cada vez que cambie el commit (para que nunca más te pase lo de Prisma viejo)
ARG CACHEBUST
ENV CACHEBUST=${CACHEBUST}

WORKDIR /app

# Copiar package.json + lockfile
COPY package*.json ./
COPY prisma ./prisma/

# Instalación limpia y rápida
RUN npm ci && \
    npm cache clean --force

# Generar cliente Prisma (ahora siempre será 5.22.0+)
RUN npx prisma generate

# Copiar el resto del código
COPY . .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Seguridad + tamaño mínimo
USER node

CMD ["npm", "start"]