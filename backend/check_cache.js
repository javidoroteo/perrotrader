const assetService = require('./src/services/assetService');

async function testCache() {
    console.log('Testing Caching Logic and Error Handling...');

    const ticker = 'AAPL'; // Safe, robust ticker

    try {
        console.log(`\n--- First Call for ${ticker} (Should hit API or recent cache) ---`);
        const start1 = Date.now();
        const asset1 = await assetService.getOrCreateAsset(ticker);
        console.log(`Price: ${asset1.currentPrice}`);
        console.log(`Time taken: ${Date.now() - start1}ms`);

        console.log(`\n--- Second Call for ${ticker} (Should use Cache - FAST) ---`);
        const start2 = Date.now();
        const asset2 = await assetService.getOrCreateAsset(ticker);
        console.log(`Price: ${asset2.currentPrice}`);
        console.log(`Time taken: ${Date.now() - start2}ms`);

        if ((Date.now() - start2) < 200) {
            console.log('✅ Cache appears to be working (response was very fast)');
        } else {
            console.warn('⚠️ Response took longer than expected for cache hit');
        }

    } catch (error) {
        console.error('Test failed:', error);
    }
}

testCache();
