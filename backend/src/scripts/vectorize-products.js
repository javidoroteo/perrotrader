// src/scripts/vectorize-products.js
const { PrismaClient } = require('@prisma/client');
const embeddingService = require('../services/embeddingService.js');

const prisma = new PrismaClient();

async function vectorizeAllProducts() {
  console.log('🚀 Iniciando vectorización de productos con Vertex AI...\n');
  console.log(`📊 Modelo: ${process.env.GCP_PROJECT_ID || 'gemini-embedding-001'}`);
  console.log(`📏 Dimensiones: 1536`);
  console.log(`🌍 Región: ${process.env.GCP_LOCATION || 'europe-west1'}\n`);
  
  let processed = 0;
  let errors = 0;
  let batch = 1;
  
  while (true) {
    console.log(`\n📦 Batch ${batch}...`);
    
    // Usar $queryRaw en vez de findMany porque embedding es Unsupported()
    const products = await prisma.$queryRaw`
      SELECT id, name, description, ticker, type, category, 
             marketcap, "assetClass", sector, geography, 
             expense_ratio, "recommendedFor"
      FROM "financial_products" 
      WHERE embedding IS NULL
      LIMIT 20
    `;
    
    if (products.length === 0) {
      console.log('\n✅ ¡Todos los productos están vectorizados!');
      break;
    }
    
    console.log(`   Encontrados ${products.length} productos sin vectorizar`);
    
    for (const product of products) {
      try {
        // Generar embedding
        const embedding = await embeddingService.generateProductEmbedding(product);
        
        // Validar
        if (!embeddingService.validateEmbedding(embedding)) {
          throw new Error('Embedding inválido');
        }
        
        // Guardar en BD
        await prisma.$executeRaw`
          UPDATE "financial_products" 
          SET embedding = ${JSON.stringify(embedding)}::vector(1536)
          WHERE id = ${product.id}
        `;
        
        processed++;
        console.log(`   ✅ ${processed}: ${product.name.substring(0, 60)}`);
        
        // Pausa de 100ms
        await new Promise(r => setTimeout(r, 100));
        
      } catch (error) {
        errors++;
        console.error(`   ❌ ${product.name}: ${error.message}`);
        
        // Pausa extra si hay muchos errores
        if (errors > 3) {
          console.log('   ⏸️  Pausando 5 segundos...');
          await new Promise(r => setTimeout(r, 5000));
          errors = 0;
        }
      }
    }
    
    batch++;
    
    // Pausa entre batches
    if (products.length > 0) {
      console.log('   ⏸️  Pausando 2 segundos...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.log(`\n🎉 ¡Vectorización completada!`);
  console.log(`📊 Total procesados: ${processed} productos`);
  console.log(`❌ Errores: ${errors}`);
  
  // Estadísticas finales
  const stats = await prisma.$queryRaw`
    SELECT 
      COUNT(*) as total,
      COUNT(embedding) as con_embedding,
      COUNT(*) - COUNT(embedding) as sin_embedding
    FROM "financial_products"
  `;
  
  console.log('\n📈 Estadísticas finales:');
  console.log(`   Total productos: ${stats[0].total}`);
  console.log(`   Con embedding: ${stats[0].con_embedding}`);
  console.log(`   Sin embedding: ${stats[0].sin_embedding}`);
  
  await prisma.$disconnect();
}

vectorizeAllProducts()
  .catch(error => {
    console.error('\n❌ Error fatal:', error);
    console.error(error.stack);
    process.exit(1);
  });
