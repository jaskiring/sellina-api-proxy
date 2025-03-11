export default async function handler(req, res) {
    const baseUrl = 'https://prod.sellina.io/v2/orders';
    const token = process.env.BEARER_TOKEN;
  
    const pageSize = 100; // Set this to the maximum page size allowed by Sellina API
    let page = 0;
    let allOrders = [];
    let keepGoing = true;
  
    try {
      while (keepGoing) {
        const apiUrl = `${baseUrl}?size=${pageSize}&page=${page}`;
  
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
        const orders = data.features || [];
  
        // Combine this page's orders into the full list
        allOrders = allOrders.concat(orders);
  
        console.log(`Fetched page ${page}, got ${orders.length} orders`);
  
        // Check if we should continue: if fewer records than pageSize, we're done
        if (orders.length < pageSize) {
          keepGoing = false; // No more pages to fetch
        } else {
          page += 1; // Move to next page
        }
      }
  
      // ✅ CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      // Return the combined order list
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