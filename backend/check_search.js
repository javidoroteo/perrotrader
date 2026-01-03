const assetService = require('./src/services/assetService');

async function testSearch() {
    console.log('Testing search functionality...');

    const tickers = ['MSFT', 'GOOGL', 'TSLA'];

    for (const ticker of tickers) {
        console.log(`\nSearching for "${ticker}"...`);
        try {
            const results = await assetService.searchAssets(ticker);
            console.log(`Results found: ${results.length}`);
            results.forEach(r => {
                console.log(`- ${r.ticker}: ${r.name} (${r.source || 'db/config'})`);
            });
        } catch (error) {
            console.error(`Search for ${ticker} failed:`, error.message);
        }
    }
    console.log('\nTest completed.');
}

testSearch();
