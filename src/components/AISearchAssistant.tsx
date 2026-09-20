import React, { useState } from 'react';
import { Sparkles, Search, ExternalLink, Loader2, BookOpen } from 'lucide-react';
import { DogProduct } from '../types';

interface AISearchAssistantProps {
  currentProduct?: DogProduct | null;
}

export const AISearchAssistant: React.FC<AISearchAssistantProps> = ({ currentProduct }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [sources, setSources] = useState<{ title: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (currentProduct) {
      setQuery(`${currentProduct.brand} ${currentProduct.flavor} Greek pet market official specs`);
    }
  }, [currentProduct]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setSources([]);

    try {
      const res = await fetch('/api/ai/lookup-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          brand: currentProduct?.brand || '',
        }),
      });

      if (!res.ok) {
        throw new Error(`AI Lookup error: ${res.statusText}`);
      }

      const data = await res.json();
      setResult(data.content);
      setSources(data.sources || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to query live Google Search grounding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-zinc-100">
            Gemini Search Grounding & Nutritionist Assistant
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400 font-mono">gemini-3.8-flash + googleSearch</span>
      </div>

      <p className="text-xs text-zinc-400">
        Verify manufacturer nutritional specifications, official distributor links, and allergen updates in real-time across Greek pet retailers.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Farmina N&D Cod Pumpkin Greece price official page or Acana singles..."
          className="flex-1 px-3 py-2 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold disabled:opacity-50 transition shadow"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          <span>Verify Live</span>
        </button>
      </form>

      {error && (
        <div className="p-2.5 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-800 text-xs text-zinc-200 space-y-2 mt-2">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            Nutritional & Market Grounding Analysis
          </div>
          <div className="whitespace-pre-line leading-relaxed text-zinc-300 max-h-60 overflow-y-auto">
            {result}
          </div>

          {sources.length > 0 && (
            <div className="pt-2 border-t border-zinc-800">
              <div className="text-[11px] font-semibold text-zinc-400 mb-1">
                Grounded Sources & Official Pages:
              </div>
              <div className="flex flex-wrap gap-2">
                {sources.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline max-w-[240px] truncate"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
