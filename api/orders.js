export default async function handler(req, res) {
    const apiUrl = 'https://prod.sellina.io/v2/orders?size=10';
  
    // Replace with your real Bearer token
    const token = 'ckt-ic94GSgQ9249vU1vRc83L-HUCOemmhpBRoFFnrvlkYCWYf15-rJTLKj3_T5EiJq_9ij0LopIcLFBT7PplrNUxrQdwCLoXeCR74Bx6KWqZt4_CGCc4fNx2GgIgfMt-VXqCTtQe9V9Tg7NfudmCyRhlxZRpNcYIGwkJApcvZew8uL4svf2_UYxVxw1lxmmFeK7BLNwxsfsI5qPt9t1ehPg_vH80U7BDOtthil88P_DZcORgAcFsk505hycg6p2phIQYojYaAXdU4-Fg10oGTcXsVMnAXHjaUr4VQG_CZYxkz5zO2kaPW5JN_KcGStDmKufSJiR3CGtM05h0RRHsSa4t2hsdbtcFqre9RvKRNbM0II7kS4i3bQdQRPMQs6ZvvT0EXZF74qURrKHFkRdEbD9Cz7xcevSbBbQsPnVDvvaS1-N1pIjU5PAfNP_xmjGbgzACh1sIjT2CM-d-aATACg1qWvDw5QtvbEVH74q-LpITKr__GBGW02O5v9h0xeFxT8GyTag5X3fSITIvs0_91KT54Nt0Oms5iRSSEz6utTc5AeTSlmIJiggTsFnj5JdzN9eGy8EsJuUl1OtlDqClVCe_lfUElC0AoUc-1hs8EaK624YWvKnFlDBWB-lOQeKAq40vvIx__hHa9sQLQ1BuYvK6VMpKfKAJHOtmhCYx8mZO0F39Bsk71UqszyB8bhxpjR2OX2hVKbjOyYMb9-wHbf1QXxTcopMfzXpAH_yAEnpU2FooZNboPuwZMLFLGu1uMCdrOdXP-saADFp7RNLPyE-z7ii1opuNCU9LC_4XVd2L4k5rl5TWMJoeXNUX-yQS_2A6u2LW4LA1kTR02vPVjSSJF3KRBsL-h5Z-t2OuhZ_vWMijrZc9w_XZbkI0HgPp9FZfQUThT4rbPI82zH3sempo4nEhzsKy9eI4PGkRWxDGEXSPA0Qx3BMgi9NHqj87hl6B3axji0H-qRCwt0DqzuchzhVE0yDjlrRXiewUfr-rkGYzAub07AI8WrbczHZNoprfQ3QDXzfBbUjinZY0aoFb3Qei13V56HNvz6Zf3A4CsZdKTiEQ1KmnCsKYKO_rqOkbd0lwVWIXoq65ReYt8f1JrDobcCs58L-2rHN9c4SydQg_h2NhnG0MSbA8BltHFitp1pxwUPNkubJKluwA7bhSwmMqdSFLHAgtZTzkifIVLG3kS5ruBX5GTGZ8tX4kDDCKOHsntA-mjMfwM_q8dBIuj4zxJiTJdwuh5N2drPpN0oK9rm0u2pXzJAXUXMVOXpOJtySwVYAWbTf7KNFxOtV_L_uPNEDvvpMETqqJGrcIqmak7Xi5qhKue2srvtYygRo3tGHdco3D8zx9l1GTCvCZg==';
  
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }