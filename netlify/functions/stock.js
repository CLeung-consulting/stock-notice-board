const https = require('https');

exports.handler = async function(event, context) {
  const ticker = event.queryStringParameters.ticker || '^HSI';
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=5m&range=2d`;

  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: { 
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: data
        });
      });
    }).on('error', (err) => {
      resolve({ 
        statusCode: 500, 
        body: JSON.stringify({ error: err.message }) 
      });
    });
  });
};