  export default async function handler(req, res) {
    const apiUrl = 'https://prod.sellina.io/v2/orders?size=10';
  
    const token = process.env.BEARER_TOKEN;
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
  
      // ✅ Add CORS headers here:
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      res.status(200).json(data);
    } catch (error) {
      console.error('API Error:', error);
  
      // ✅ Add CORS headers here too (error responses need them as well!)
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }