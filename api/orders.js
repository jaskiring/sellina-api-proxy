export default async function handler(req, res) {
    const baseUrl = 'https://prod.sellina.io/v2/orders';
    const token = process.env.BEARER_TOKEN;
  
    // Get page and size from query params, with default values
    const page = req.query.page || 0;
    const pageSize = req.query.size || 100;
  
    const apiUrl = `${baseUrl}?size=${pageSize}&page=${page}`;
  
    try {
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
  
      // ✅ Add CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      res.status(200).json({
        page: page,
        pageSize: pageSize,
        orderCount: data.features ? data.features.length : 0,
        orders: data.features || []
      });
  
    } catch (error) {
      console.error('API Error:', error);
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }