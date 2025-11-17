/**
 * Script de migración de productos existentes a la base de datos vectorizada
 * Migra productos desde productsConfig_v2.js e individualAssets.js
 */

const prisma = require('../utils/prismaClients.js');
const { generateProductEmbedding } = require('../services/embeddingService.js');
require('dotenv').config();

// Importar los datos estáticos
const { FINANCIAL_PRODUCTS } = require('../config/productsConfig_v2.js');
const { INDIVIDUAL_STOCKS } = require('../data/individualAssets.js');
/**
 * Mapea productos de productsConfig_v2.js al schema de FinancialProduct
 */
function mapFinancialProduct(ticker, product) {
  // Mapear tipo
  const typeMap = {
    'RENTA_FIJA': 'BOND_ETF',
    'RENTA_VARIABLE': 'EQUITY_ETF',
    'MATERIA_PRIMA': 'COMMODITY_ETF'
  };

  // Mapear riesgo a recommendedFor
  const riskMap = {
    'Muy Bajo': ['Bajo Riesgo'],
    'Bajo': ['Bajo Riesgo', 'Riesgo Moderado'],
    'Bajo-Medio': ['Bajo Riesgo', 'Riesgo Moderado'],
    'Medio': ['Riesgo Moderado'],
    'Medio-Alto': ['Riesgo Moderado', 'Alto Riesgo'],
    'Alto': ['Alto Riesgo'],
    'Muy Alto': ['Alto Riesgo']
  };

  return {
    ticker: ticker,
    name: product.name,
    description: product.description || '',
    type: typeMap[product.type] || 'ETF',
    category: product.category || 'Diversificado',
    marketcap: product.type === 'RENTA_VARIABLE' ? 'LARGE' : null,
    recommendedFor: riskMap[product.risk] || ['Riesgo Moderado'],
    assetClass: product.type === 'RENTA_FIJA' ? 'Bonos' : 'Acciones',
    geography: extractGeography(product),
    sector: product.category || null,
    expense_ratio: parseFloat(product.ter) || null
  };
}

/**
 * Mapea acciones individuales de individualAssets.js al schema
 */
function mapIndividualStock(ticker, stock) {
  // Mapear riesgo
  const riskMap = {
    'LOW': ['Bajo Riesgo', 'Riesgo Moderado'],
    'MEDIUM': ['Riesgo Moderado'],
    'HIGH': ['Alto Riesgo']
  };

  // Determinar marketcap por sector
  const largecapSectors = [
    'Information Technology', 
    'Financials', 
    'Healthcare', 
    'Communication Services',
    'Consumer Staples'
  ];

  return {
    ticker: stock.ticker,
    name: stock.name,
    description: stock.description || '',
    type: 'STOCK',
    category: stock.sector || 'Diversificado',
    marketcap: largecapSectors.includes(stock.sector) ? 'LARGE' : 'MID',
    recommendedFor: riskMap[stock.risk] || ['Riesgo Moderado'],
    assetClass: 'Acciones',
    geography: stock.exchange === 'BME' ? 'España' : 'Estados Unidos',
    sector: stock.sector,
    expense_ratio: null
  };
}

/**
 * Extrae geografía del producto
 */
function extractGeography(product) {
  const name = product.name.toLowerCase();
  const description = (product.description || '').toLowerCase();
  
  if (name.includes('global') || description.includes('global')) return 'Global';
  if (name.includes('world') || description.includes('world')) return 'Global';
  if (name.includes('euro') || description.includes('europeo')) return 'Europa';
  if (name.includes('usa') || name.includes('s&p')) return 'Estados Unidos';
  if (name.includes('emerging') || description.includes('emergentes')) return 'Emergentes';
  if (name.includes('asia') || description.includes('asiático')) return 'Asia';
  
  return 'Internacional';
}

/**
 * Migra todos los productos financieros (ETFs)
 */
async function migrateFinancialProducts() {
  console.log('\n📊 Migrando ETFs desde productsConfig_v2.js...');
  
  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  const products = Object.entries(FINANCIAL_PRODUCTS);
  
  for (const [ticker, product] of products) {
    try {
      // Verificar si ya existe
      const existing = await prisma.financialProduct.findUnique({
        where: { ticker }
      });

      if (existing) {
        console.log(`⏭️  Ya existe: ${ticker} - ${product.name}`);
        skipped++;
        continue;
      }

      // Mapear producto
      const mappedProduct = mapFinancialProduct(ticker, product);

      // Crear en base de datos
      const created = await prisma.financialProduct.create({
        data: mappedProduct
      });

      console.log(`✓ Migrado: ${ticker} - ${product.name}`);
      migrated++;

      // Pequeña pausa para no saturar
      await new Promise(resolve => setTimeout(resolve, 50));

    } catch (error) {
      console.error(`✗ Error migrando ${ticker}:`, error.message);
      failed++;
    }
  }

  return { migrated, skipped, failed };
}

/**
 * Migra todas las acciones individuales
 */
async function migrateIndividualStocks() {
  console.log('\n📈 Migrando acciones desde individualAssets.js...');
  
  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  const stocks = Object.entries(INDIVIDUAL_STOCKS);
  
  for (const [ticker, stock] of stocks) {
    try {
      // Verificar si ya existe
      const existing = await prisma.financialProduct.findUnique({
        where: { ticker: stock.ticker }
      });

      if (existing) {
        console.log(`⏭️  Ya existe: ${stock.ticker} - ${stock.name}`);
        skipped++;
        continue;
      }

      // Mapear acción
      const mappedStock = mapIndividualStock(ticker, stock);

      // Crear en base de datos
      const created = await prisma.financialProduct.create({
        data: mappedStock
      });

      console.log(`✓ Migrado: ${stock.ticker} - ${stock.name}`);
      migrated++;

      // Pequeña pausa
      await new Promise(resolve => setTimeout(resolve, 50));

    } catch (error) {
      console.error(`✗ Error migrando ${stock.ticker}:`, error.message);
      failed++;
    }
  }

  return { migrated, skipped, failed };
}

/**
 * Vectoriza todos los productos que no tienen embedding
 */
async function vectorizeProducts() {
  console.log('\n🧠 Vectorizando productos sin embedding...');
  
  const products = await prisma.financialProduct.findMany({
    where: {
      embedding: null
    }
  });

  if (products.length === 0) {
    console.log('✅ Todos los productos ya están vectorizados');
    return { vectorized: 0, failed: 0 };
  }

  console.log(`📊 Productos a vectorizar: ${products.length}\n`);

  let vectorized = 0;
  let failed = 0;

  for (const product of products) {
    try {
      console.log(`Vectorizando: ${product.name} (${product.ticker})...`);
      
      // Generar embedding
      const embedding = await generateProductEmbedding(product);
      
      // Convertir a string para PostgreSQL
      const embeddingStr = `[${embedding.join(',')}]`;
      
      // Actualizar en base de datos
      await prisma.$executeRawUnsafe(`
        UPDATE financial_products 
        SET embedding = $1::vector
        WHERE id = $2
      `, embeddingStr, product.id);
      
      vectorized++;
      console.log(`✓ Vectorizado (${vectorized}/${products.length})`);
      
      // Pausa para no saturar API de OpenAI
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      failed++;
      console.error(`✗ Error vectorizando ${product.ticker}:`, error.message);
    }
  }

  return { vectorized, failed };
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 MIGRACIÓN Y VECTORIZACIÓN DE PRODUCTOS ISFINZ');
  console.log('================================================\n');

  try {
    // 1. Migrar ETFs
    const etfResults = await migrateFinancialProducts();
    console.log('\n📊 Resumen ETFs:');
    console.log(`   ✓ Migrados: ${etfResults.migrated}`);
    console.log(`   ⏭️  Omitidos: ${etfResults.skipped}`);
    console.log(`   ✗ Fallidos: ${etfResults.failed}`);

    // 2. Migrar Acciones
    const stockResults = await migrateIndividualStocks();
    console.log('\n📈 Resumen Acciones:');
    console.log(`   ✓ Migrados: ${stockResults.migrated}`);
    console.log(`   ⏭️  Omitidos: ${stockResults.skipped}`);
    console.log(`   ✗ Fallidos: ${stockResults.failed}`);

    // 3. Vectorizar todos
    const vectorResults = await vectorizeProducts();
    console.log('\n🧠 Resumen Vectorización:');
    console.log(`   ✓ Vectorizados: ${vectorResults.vectorized}`);
    console.log(`   ✗ Fallidos: ${vectorResults.failed}`);

    console.log('\n========================================');
    console.log('✅ MIGRACIÓN COMPLETADA');
    console.log(`Total productos: ${etfResults.migrated + stockResults.migrated}`);
    console.log(`Total vectorizados: ${vectorResults.vectorized}`);
    console.log('========================================\n');

  } catch (error) {
    console.error('\n❌ Error fatal en migración:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar
main();
