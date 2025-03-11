export default async function handler(req, res) {
    const baseUrl = 'https://prod.sellina.io/v2/orders';
    const token = process.env.BEARER_TOKEN;
  
    const pageSize = 100; // Adjust if you can go higher
    let page = 0;
    let allOrders = [];
    let isLastPage = false;
  
    try {
      while (!isLastPage) {
        const apiUrl = `${baseUrl}?size=${pageSize}&page=${page}`;
  
        console.log(`Fetching page ${page}...`);
  
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch page ${page}, status ${response.status}`);
        }
  
        const data = await response.json();
        const features = data.features || [];
  
        console.log(`Page ${page}: ${features.length} orders fetched.`);
  
        allOrders = allOrders.concat(features);
  
        // If returned results are less than pageSize, it’s the last page!
        if (features.length < pageSize) {
          isLastPage = true;
        } else {
          page++; // Move to next page
        }
      }
  
      // ✅ CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      res.status(200).json({
        totalOrders: allOrders.length,
        orders: allOrders
      });
  
    } catch (error) {
      console.error('API Error:', error);
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      res.status(500).json({ error: 'Failed to fetch all orders' });
    }
  }