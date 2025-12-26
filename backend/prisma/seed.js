// backend/prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const FINANCIAL_PRODUCTS = require('../src/config/productsConfig_v2');
const { INDIVIDUAL_STOCKS, CRYPTOCURRENCIES } = require('../src/data/individualAssets');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos...\n');

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  // ========================================
  // 1. POBLAR ETFs desde productsConfig_v2.js
  // ========================================
  
  for (const [ticker, product] of Object.entries(FINANCIAL_PRODUCTS)) {
    try {
      // Verificar si ya existe
      const existing = await prisma.asset.findUnique({
        where: { ticker }
      });

      if (existing) {
        console.log(`  ⏭️  ${ticker} ya existe, saltando...`);
        totalSkipped++;
        continue;
      }

      // Crear asset
      await prisma.asset.create({
        data: {
          ticker: product.ticker,
          name: product.name,
          type: product.type || 'ETF',
          category: product.category || 'RENTA_VARIABLE',
          description: product.description || '',
          currentPrice: 0, // Se actualizará con el cron job
          currency: 'USD',
          baseTicker: extractBaseTicker(product.ticker),
          exchange: extractExchange(product.ticker),
          isin: product.isin || null,
          ter: product.ter || null,
          riskLevel: mapRiskLevel(product.risk),
          expenseRatio: product.ter ? parseFloat(product.ter.replace('%', '')) : null,
          isRecommended: product.recommended_for?.length > 0 || false,
          recommendedFor: JSON.stringify(product.recommended_for || [])
        }
      });

      console.log(`  ✅ ${ticker} - ${product.name}`);
      totalCreated++;

    } catch (error) {
      console.error(`  ❌ Error con ${ticker}:`, error.message);
      totalErrors++;
    }
  }

  // ========================================
  // 2. POBLAR ACCIONES INDIVIDUALES
  // ========================================
  console.log('\n📈 Poblando acciones individuales...');
  
  for (const [ticker, stock] of Object.entries(INDIVIDUAL_STOCKS)) {
    try {
      const existing = await prisma.asset.findUnique({
        where: { ticker }
      });

      if (existing) {
        console.log(`  ⏭️  ${ticker} ya existe, saltando...`);
        totalSkipped++;
        continue;
      }

      await prisma.asset.create({
        data: {
          ticker: stock.ticker,
          name: stock.name,
          type: stock.type,
          category: stock.category,
          description: stock.description,
          currentPrice: 0,
          currency: 'USD',
          baseTicker: stock.ticker,
          exchange: stock.exchange,
          riskLevel: stock.risk,
          isRecommended: stock.recommended_for?.length > 0 || false,
          recommendedFor: JSON.stringify(stock.recommended_for || [])
        }
      });

      console.log(`  ✅ ${ticker} - ${stock.name}`);
      totalCreated++;

    } catch (error) {
      console.error(`  ❌ Error con ${ticker}:`, error.message);
      totalErrors++;
    }
  }

  // ========================================
  // 3. POBLAR CRIPTOMONEDAS
  // ========================================
  console.log('\n₿ Poblando criptomonedas...');
  
  for (const [ticker, crypto] of Object.entries(CRYPTOCURRENCIES)) {
    try {
      const existing = await prisma.asset.findUnique({
        where: { ticker }
      });

      if (existing) {
        console.log(`  ⏭️  ${ticker} ya existe, saltando...`);
        totalSkipped++;
        continue;
      }

      await prisma.asset.create({
        data: {
          ticker: crypto.ticker,
          name: crypto.name,
          type: crypto.type,
          category: crypto.category,
          description: crypto.description,
          currentPrice: 0,
          currency: 'USD',
          baseTicker: crypto.ticker.split('-')[0], // BTC-USD -> BTC
          exchange: 'CRYPTO',
          riskLevel: crypto.risk,
          isRecommended: crypto.recommended_for?.length > 0 || false,
          recommendedFor: JSON.stringify(crypto.recommended_for || [])
        }
      });

      console.log(`  ✅ ${ticker} - ${crypto.name}`);
      totalCreated++;

    } catch (error) {
      console.error(`  ❌ Error con ${ticker}:`, error.message);
      totalErrors++;
    }
  }

  // ========================================
  // RESUMEN
  // ========================================
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN DEL SEED:');
  console.log('='.repeat(50));
  console.log(`✅ Activos creados: ${totalCreated}`);
  console.log(`⏭️  Activos saltados: ${totalSkipped}`);
  console.log(`❌ Errores: ${totalErrors}`);
  console.log('='.repeat(50));

  // Mostrar estadísticas por categoría
  const stats = await prisma.asset.groupBy({
    by: ['type'],
    _count: true
  });

  console.log('\n📈 Activos por tipo:');
  stats.forEach(stat => {
    console.log(`  ${stat.type}: ${stat._count} activos`);
  });

  console.log('\n✨ Seed completado!\n');
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function extractBaseTicker(ticker) {
  // WQDV.L -> WQDV
  // BTC-USD -> BTC
  return ticker.split('.')[0].split('-')[0];
}

function extractExchange(ticker) {
  if (ticker.includes('.L')) return 'LSE';
  if (ticker.includes('.AS')) return 'EURONEXT';
  if (ticker.includes('.MI')) return 'MILAN';
  if (ticker.includes('-USD')) return 'CRYPTO';
  return 'NYSE'; // default
}

function mapRiskLevel(risk) {
  if (!risk) return 'MEDIUM';
  const riskLower = risk.toLowerCase();
  if (riskLower.includes('bajo') || riskLower.includes('low')) return 'LOW';
  if (riskLower.includes('alto') || riskLower.includes('high')) return 'HIGH';
  return 'MEDIUM';
}

// ========================================
// EJECUTAR SEED
// ========================================
main()
  .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
