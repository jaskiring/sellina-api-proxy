export default async function handler(req, res) {
    const baseUrl = 'https://prod.sellina.io/v2/orders';
    const token = process.env.BEARER_TOKEN;
  
    // ✅ CORS Headers - Set at the top to cover all cases
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    try {
      const pageSize = 100; // ✅ Increase page size
      let currentPage = 0; // assuming the API is zero-based (if not, use 1)
      let allOrders = [];
      let totalPages = 1; // Initialize to enter the loop
  
      while (currentPage < totalPages) {
        const url = `${baseUrl}?size=${pageSize}&page=${currentPage}`;
  
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch page ${currentPage}: ${response.status}`);
        }
  
        const data = await response.json();
  
        // ✅ Combine orders
        if (data && data.content) {
          allOrders = allOrders.concat(data.content);
        }
  
        // ✅ Update totalPages from the response (adjust if your API uses a different property name)
        totalPages = data.totalPages ?? 1; // check if totalPages exists in the response
        currentPage += 1;
      }
  
      res.status(200).json(allOrders);
  
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Failed to fetch all orders' });
    }
  }