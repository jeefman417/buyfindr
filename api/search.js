export default async function handler(req, res) {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const baseParams = {
      api_key: "cd2ed408a8a0318701182da685490ac70fdc10a1d794228cb6f04d225a26985c",
      gl: "us",
      hl: "en",
    };

    // Run both searches in parallel
    const [shoppingRes, amazonRes] = await Promise.all([
      fetch(`https://serpapi.com/search?${new URLSearchParams({
        ...baseParams,
        engine: "google_shopping",
        q,
        num: "10",
        tbs: "p_ord:p",
      })}`),
      fetch(`https://serpapi.com/search?${new URLSearchParams({
        ...baseParams,
        engine: "google",
        q: `${q} site:amazon.com`,
        num: "5",
      })}`)
    ]);

    const [shoppingData, amazonData] = await Promise.all([
      shoppingRes.json(),
      amazonRes.json()
    ]);

    // Extract Amazon organic results
    const amazonResults = (amazonData.organic_results || [])
      .filter(r => r.link?.includes("amazon.com/dp") || r.link?.includes("amazon.com/gp"))
      .slice(0, 2)
      .map(r => ({
        title: r.title,
        source: "Amazon",
        price: r.price || "Check Amazon",
        extracted_price: r.extracted_price || 0,
        link: r.link,
        thumbnail: r.thumbnail,
        delivery: "Prime eligible",
      }));

    const shoppingResults = shoppingData.shopping_results || [];

    // Merge and sort by price
    const combined = [...amazonResults, ...shoppingResults]
      .filter(r => r.extracted_price > 0)
      .sort((a, b) => a.extracted_price - b.extracted_price);

    // Add back items without prices at the end
    const noPriceItems = [...amazonResults, ...shoppingResults]
      .filter(r => !r.extracted_price || r.extracted_price === 0);

    res.status(200).json({
      shopping_results: [...combined, ...noPriceItems]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

Save, then:
```
git add .
git commit -m "add amazon results"
git push