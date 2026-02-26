export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing query" });

  try {
    const key = "cd2ed408a8a0318701182da685490ac70fdc10a1d794228cb6f04d225a26985c";
    
    const url = `https://serpapi.com/search?engine=google_shopping&q=${encodeURIComponent(q)}&api_key=${key}&gl=us&hl=en&num=10&tbs=p_ord:p`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) return res.status(400).json({ error: data.error });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}