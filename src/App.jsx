import { useState } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SERP_API_KEY = "cd2ed408a8a0318701182da685490ac70fdc10a1d794228cb6f04d225a26985c";
const AMAZON_TAG = "Buyfindr-20";

// Affiliate tag injectors per retailer
function affiliateUrl(url, source) {
  if (!url) return url;
  try {
    const lower = (source || "").toLowerCase();
    const urlLower = url.toLowerCase();

    // Amazon
    if (lower.includes("amazon") || urlLower.includes("amazon.com")) {
      const u = new URL(url);
      u.searchParams.set("tag", AMAZON_TAG);
      return u.toString();
    }
    // Walmart — affiliate via Impact, just pass through with utm for now
    if (lower.includes("walmart") || urlLower.includes("walmart.com")) {
      return url; // add Walmart affiliate params when you join their program
    }
    // Default — return as-is
    return url;
  } catch {
    return url;
  }
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f2eb;
    --bg2: #ede9e0;
    --ink: #1a1612;
    --ink2: #6b6560;
    --ink3: #a8a29c;
    --accent: #e8440a;
    --accent2: #ff6b35;
    --gold: #c8960a;
    --card: #ffffff;
    --border: rgba(26,22,18,0.1);
  }

  body { background: var(--bg); }

  .app {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Outfit', sans-serif;
    color: var(--ink);
    position: relative;
    overflow-x: hidden;
  }

  /* ── HEADER ── */
  .header {
    padding: 0 40px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.05em;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .logo span { color: var(--accent); }
  .header-tagline {
    font-size: 11px;
    color: var(--ink3);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .affiliate-badge {
    font-size: 10px;
    color: var(--ink3);
    border: 1px solid var(--border);
    padding: 3px 8px;
    letter-spacing: 0.05em;
  }

  /* ── HERO ── */
  .hero {
    padding: 64px 40px 48px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .hero-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: var(--accent);
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(56px, 8vw, 96px);
    line-height: 0.95;
    letter-spacing: 0.02em;
    color: var(--ink);
    margin-bottom: 24px;
  }
  .hero-title em {
    font-style: normal;
    color: var(--accent);
    position: relative;
  }
  .hero-sub {
    font-size: 15px;
    color: var(--ink2);
    font-weight: 300;
    max-width: 480px;
    line-height: 1.6;
    margin-bottom: 40px;
  }

  /* ── SEARCH ── */
  .search-wrap {
    display: flex;
    max-width: 640px;
    border: 2px solid var(--ink);
    background: var(--card);
    transition: border-color 0.2s;
    box-shadow: 4px 4px 0 var(--ink);
  }
  .search-wrap:focus-within {
    border-color: var(--accent);
    box-shadow: 4px 4px 0 var(--accent);
  }
  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 16px 20px;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    color: var(--ink);
    font-weight: 400;
  }
  .search-input::placeholder { color: var(--ink3); }
  .search-btn {
    background: var(--accent);
    border: none;
    border-left: 2px solid var(--ink);
    padding: 0 28px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 0.1em;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s;
  }
  .search-btn:hover:not(:disabled) { background: var(--accent2); }
  .search-btn:disabled { background: var(--ink3); cursor: not-allowed; border-left-color: var(--ink3); }

  .popular-tags {
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .popular-label { font-size: 11px; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.1em; }
  .tag-pill {
    font-size: 12px;
    color: var(--ink2);
    border: 1px solid var(--border);
    padding: 4px 10px;
    background: var(--card);
    cursor: pointer;
    transition: all 0.15s;
    font-weight: 500;
  }
  .tag-pill:hover { border-color: var(--accent); color: var(--accent); background: rgba(232,68,10,0.04); }

  /* ── LOADING ── */
  .loading-wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px 40px;
  }
  .loading-bar-track {
    height: 2px;
    background: var(--border);
    margin-bottom: 32px;
    overflow: hidden;
  }
  .loading-bar-fill {
    height: 100%;
    background: var(--accent);
    animation: loadbar 2s ease-in-out infinite;
  }
  @keyframes loadbar {
    0% { width: 0; margin-left: 0; }
    50% { width: 60%; margin-left: 20%; }
    100% { width: 0; margin-left: 100%; }
  }
  .loading-skeletons { display: grid; gap: 12px; }
  .skeleton {
    height: 100px;
    background: linear-gradient(90deg, var(--bg2) 25%, var(--bg) 50%, var(--bg2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer { to { background-position: -200% 0; } }

  /* ── RESULTS ── */
  .results-wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px 80px;
  }
  .results-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-top: 2px solid var(--ink);
    border-bottom: 1px solid var(--border);
    margin-bottom: 20px;
  }
  .results-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: var(--ink);
  }
  .results-title span { color: var(--accent); }
  .results-count { font-size: 12px; color: var(--ink3); }
  .results-speed { font-size: 12px; color: var(--gold); font-weight: 600; }

  .savings-banner {
    background: var(--ink);
    color: white;
    padding: 12px 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
  }
  .savings-banner strong { color: #6dde8a; font-size: 15px; }
  .savings-icon { font-size: 18px; }

  /* ── RESULT CARDS ── */
  .result-grid { display: grid; gap: 10px; }

  .result-card {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 20px 24px;
    display: grid;
    grid-template-columns: 64px 1fr auto;
    gap: 20px;
    align-items: center;
    opacity: 0;
    animation: fadeIn 0.35s ease forwards;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
  .result-card:hover {
    border-color: var(--accent);
    box-shadow: 3px 3px 0 var(--accent);
    transform: translate(-1px, -1px);
  }
  .result-card.winner {
    border: 2px solid var(--accent);
    background: #fff8f5;
  }
  @keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform:none; } }

  .result-thumb {
    width: 64px;
    height: 64px;
    object-fit: contain;
    background: var(--bg2);
    border: 1px solid var(--border);
    flex-shrink: 0;
  }
  .thumb-placeholder {
    width: 64px;
    height: 64px;
    background: var(--bg2);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .result-body {}
  .result-rank {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink3);
    margin-bottom: 4px;
  }
  .result-rank.winner { color: var(--accent); }
  .result-title-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    line-height: 1.4;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .result-source { font-size: 12px; color: var(--ink3); }
  .result-delivery { font-size: 11px; color: #2a9d4a; font-weight: 500; margin-top: 2px; }
  .result-rating { font-size: 11px; color: var(--gold); margin-top: 2px; }

  .result-right { text-align: right; flex-shrink: 0; min-width: 120px; }
  .result-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.02em;
    color: var(--ink);
    line-height: 1;
    margin-bottom: 6px;
  }
  .result-price.winner { color: var(--accent); }
  .result-price.dim { color: var(--ink3); font-size: 22px; }
  .buy-btn {
    display: inline-block;
    background: var(--accent);
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    letter-spacing: 0.1em;
    padding: 6px 14px;
    text-decoration: none;
    transition: background 0.15s;
    border: none;
    cursor: pointer;
  }
  .buy-btn:hover { background: var(--accent2); }
  .buy-btn.secondary {
    background: transparent;
    color: var(--ink2);
    border: 1px solid var(--border);
  }
  .buy-btn.secondary:hover { border-color: var(--ink); color: var(--ink); background: var(--bg2); }

  /* ── EMPTY ── */
  .empty {
    text-align: center;
    padding: 80px 40px;
    color: var(--ink3);
  }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    letter-spacing: 0.05em;
    color: var(--ink2);
    margin-bottom: 8px;
  }
  .empty-sub { font-size: 14px; }

  /* ── ERROR ── */
  .error-box {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px 40px;
  }
  .error-inner {
    border: 2px solid #e8440a;
    background: #fff5f2;
    padding: 16px 20px;
    font-size: 13px;
    color: #c03000;
    line-height: 1.6;
  }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 24px 40px;
    background: var(--bg2);
    font-size: 11px;
    color: var(--ink3);
    line-height: 1.7;
    text-align: center;
  }
  .footer a { color: var(--accent); text-decoration: none; }

  @media (max-width: 640px) {
    .header { padding: 0 20px; }
    .hero { padding: 40px 20px 32px; }
    .results-wrap, .loading-wrap, .error-box { padding-left: 20px; padding-right: 20px; }
    .result-card { grid-template-columns: 1fr auto; }
    .result-thumb, .thumb-placeholder { display: none; }
    .hero-title { font-size: 52px; }
  }
`;

const POPULAR = ["RTX 5070", "MacBook Air M3", "iPhone 16", "PS5", "AirPods Pro", "Samsung 4K TV"];

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [elapsed, setElapsed] = useState(null);

  async function search(q) {
    const term = (q || query).trim();
    if (!term || loading) return;
    if (q) setQuery(q);
    setLoading(true);
    setError("");
    setResults(null);
    setLastQuery(term);
    const start = Date.now();

    try {
      

      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const items = (data.shopping_results || []).slice(0, 8).map(r => ({
        ...r,
        affiliate_url: affiliateUrl(r.link || r.product_link, r.source),
      }));

      if (items.length === 0) throw new Error("No results found. Try a different search term.");

      setElapsed(((Date.now() - start) / 1000).toFixed(1));
      setResults(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const prices = results ? results.map(r => r.extracted_price).filter(p => p > 0) : [];
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const savings = maxPrice > minPrice ? (maxPrice - minPrice).toFixed(2) : null;

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* HEADER */}
        <header className="header">
          <div className="logo">BUY<span>FINDR</span></div>
          <div className="header-tagline">Price Comparison Engine</div>
          <div className="affiliate-badge">Affiliate Disclosure</div>
        </header>

        {/* HERO + SEARCH */}
        <section className="hero">
          <div className="hero-eyebrow">Stop Overpaying Online</div>
          <h1 className="hero-title">
            Find The<br />
            <em>Cheapest</em><br />
            Price.
          </h1>
          <p className="hero-sub">
            We scan Google Shopping in real-time to find you the lowest price across all major retailers.
          </p>

          <div className="search-wrap">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()}
              placeholder="Search any product, e.g. RTX 5070..."
              disabled={loading}
            />
            <button className="search-btn" onClick={() => search()} disabled={loading || !query.trim()}>
              {loading ? "..." : "SEARCH"}
            </button>
          </div>

          <div className="popular-tags">
            <span className="popular-label">Popular:</span>
            {POPULAR.map(p => (
              <button key={p} className="tag-pill" onClick={() => search(p)}>{p}</button>
            ))}
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <div className="loading-wrap">
            <div className="loading-bar-track"><div className="loading-bar-fill" /></div>
            <div className="loading-skeletons">
              {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{animationDelay:`${i*0.1}s`}} />)}
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="error-box">
            <div className="error-inner">⚠ {error}</div>
          </div>
        )}

        {/* RESULTS */}
        {results && (
          <div className="results-wrap">
            <div className="results-meta">
              <div className="results-title">
                Results for <span>"{lastQuery}"</span>
              </div>
              <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
                <span className="results-count">{results.length} stores compared</span>
                {elapsed && <span className="results-speed">⚡ {elapsed}s</span>}
              </div>
            </div>

            {savings && (
              <div className="savings-banner">
                <span className="savings-icon">💰</span>
                <span>Best deal saves you <strong>${savings}</strong> compared to the most expensive listing</span>
              </div>
            )}

            <div className="result-grid">
              {results.map((r, i) => (
                <a
                  key={i}
                  className={`result-card ${i === 0 ? 'winner' : ''}`}
                  href={r.affiliate_url || r.link || r.product_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {r.thumbnail
                    ? <img className="result-thumb" src={r.thumbnail} alt={r.title} />
                    : <div className="thumb-placeholder">🛍</div>
                  }

                  <div className="result-body">
                    <div className={`result-rank ${i === 0 ? 'winner' : ''}`}>
                      {i === 0 ? '★ Lowest Price' : `#${i + 1}`}
                    </div>
                    <div className="result-title-text">{r.title}</div>
                    <div className="result-source">{r.source}</div>
                    {r.delivery && <div className="result-delivery">{r.delivery}</div>}
                    {r.rating && (
                      <div className="result-rating">
                        {"★".repeat(Math.round(r.rating))}{"☆".repeat(5 - Math.round(r.rating))}
                        {r.reviews ? ` (${r.reviews.toLocaleString()})` : ""}
                      </div>
                    )}
                  </div>

                  <div className="result-right">
                    <div className={`result-price ${i === 0 ? 'winner' : i > 2 ? 'dim' : ''}`}>
                      {r.price}
                    </div>
                    <span className={`buy-btn ${i === 0 ? '' : 'secondary'}`}>
                      {i === 0 ? 'BUY NOW →' : 'VIEW DEAL'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !results && !error && (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">Search Any Product</div>
            <div className="empty-sub">We'll find you the cheapest price across all major retailers instantly.</div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <p>
            © 2025 Buyfindr · <a href="#">Affiliate Disclosure</a> · As an Amazon Associate I earn from qualifying purchases. 
            Prices shown are sourced from Google Shopping and may vary. Always verify on the retailer's site before purchasing.
          </p>
        </footer>

      </div>
    </>
  );
}
