# 1. CAMBIO CLAVE: Usamos 'slim' en vez de 'alpine'.
# Esto tiene mejor compatibilidad con Prisma y Node.
FROM node:20-slim AS builder

# Instalamos OpenSSL (Prisma lo necesita obligatoriamente en Linux)
RUN apt-get update -y && apt-get install -y openssl

ARG CACHEBUST
ENV CACHEBUST=${CACHEBUST}

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Instalación limpia
RUN npm ci && npm cache clean --force

# 2. CAMBIO CLAVE: Quitamos la versión inventada (@6.19.0).
# Usamos el prisma que está en tu package.json.
# Al correr esto DENTRO de Linux, genera el cliente correcto automáticamente.
RUN npx prisma generate

COPY . .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

USER node

CMD ["npm", "start"]