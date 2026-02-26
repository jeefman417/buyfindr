export default async function handler(req, res) {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const params = new URLSearchParams({
      engine: "google_shopping",
      q: q,
      api_key: "cd2ed408a8a0318701182da685490ac70fdc10a1d794228cb6f04d225a26985c",
      gl: "us",
      hl: "en",
      num: "10",
      tbs: "p_ord:p",
    });

    const response = await fetch(`https://serpapi.com/search?${params}`);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}