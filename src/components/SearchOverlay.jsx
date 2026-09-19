import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useScrollLock } from '../hooks/useScrollLock';
import { products } from '../data/products';
import { formatPrice } from '../context/CartContext';

const POPULAR = ['Signature Tee', 'Tailored Trouser', 'Silk Shirt', 'Drop 001'];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useScrollLock(searchOpen);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeSearch();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ivory animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="container-lux flex h-16 items-center justify-between sm:h-20">
        <span className="nav-link text-ink">Search</span>
        <span className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl sm:text-3xl tracking-widest2 text-ink">
          avé
        </span>
        <button
          onClick={closeSearch}
          className="nav-link inline-flex items-center gap-2 text-ink"
          aria-label="Close search"
        >
          Close <X className="h-4 w-4" strokeWidth={1.25} />
        </button>
      </div>

      <div className="container-lux mt-12 sm:mt-20">
        <label htmlFor="ave-search" className="sr-only">Search avé</label>
        <div className="flex items-center gap-4 border-b border-ink pb-4">
          <Search className="h-5 w-5 text-muted" strokeWidth={1.25} />
          <input
            id="ave-search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH avé"
            className="w-full bg-transparent font-serif text-3xl sm:text-5xl outline-none placeholder:text-muted/60"
          />
        </div>

        {!query && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <p className="eyebrow">Popular searches</p>
              <ul className="mt-4 space-y-2">
                {POPULAR.map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => setQuery(p)}
                      className="link-underline font-serif text-2xl text-ink"
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Recent searches</p>
              <p className="mt-4 text-sm text-muted">No recent searches.</p>
            </div>
          </div>
        )}

        {query && (
          <div className="mt-10">
            <p className="eyebrow">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
            {results.length === 0 ? (
              <p className="mt-6 text-sm text-muted">
                No results for “{query}”. Try a different term.
              </p>
            ) : (
              <ul className="mt-6 divide-y divide-line border-t border-line">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/products/${p.slug}`}
                      onClick={closeSearch}
                      className="group flex items-center gap-6 py-5 transition-colors duration-500 hover:bg-ivory/60"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        className="h-24 w-20 object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-serif text-xl text-ink">{p.name}</p>
                        <p className="eyebrow mt-1">{p.collection}</p>
                      </div>
                      <p className="text-sm tabular-nums text-ink">{formatPrice(p.price)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}