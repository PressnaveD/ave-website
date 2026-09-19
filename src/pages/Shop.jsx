import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { FilterGroup, FilterCheckbox, MobileFilterSheet } from '../components/FilterPanel';
import Reveal from '../components/Reveal';

const SORTS = [
  ['featured', 'Featured'],
  ['newest', 'Newest'],
  ['price-asc', 'Price: Low to High'],
  ['price-desc', 'Price: High to Low'],
];

const CATEGORIES = ['men', 'women', 'accessories'];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  const categoryParam = params.get('category');
  const sort = params.get('sort') || 'featured';

  const [selectedCats, setSelectedCats] = useState(categoryParam ? [categoryParam] : []);
  const [priceMax, setPriceMax] = useState(30000);

  useEffect(() => {
    setSelectedCats(categoryParam ? [categoryParam] : []);
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest': list.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [selectedCats, priceMax, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const toggleCat = (cat) => {
    const next = selectedCats.includes(cat)
      ? selectedCats.filter((c) => c !== cat)
      : [...selectedCats, cat];
    setSelectedCats(next);
    updateParam('category', next[0] || '');
  };

  const Filters = () => (
    <>
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <FilterCheckbox
            key={c}
            label={c.charAt(0).toUpperCase() + c.slice(1)}
            checked={selectedCats.includes(c)}
            onChange={() => toggleCat(c)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        <div>
          <input
            type="range"
            min="2000"
            max="30000"
            step="500"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-ink"
            aria-label="Maximum price"
          />
          <p className="mt-2 text-xs text-muted tabular-nums">Up to ₹{priceMax.toLocaleString('en-IN')}</p>
        </div>
      </FilterGroup>
      <FilterGroup title="Size">
        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
          <FilterCheckbox key={s} label={s} checked={false} onChange={() => {}} />
        ))}
      </FilterGroup>
      <FilterGroup title="Color">
        {[
          ['Black', '#111111'],
          ['Ivory', '#F7F5F0'],
          ['Beige', '#D8CFC2'],
          ['Olive', '#626653'],
          ['Maroon', '#4B1F26'],
        ].map(([name, hex]) => (
          <label key={name} className="flex items-center gap-3 cursor-pointer group">
            <span
              className="h-4 w-4 border border-line"
              style={{ background: hex }}
              aria-hidden="true"
            />
            <input type="checkbox" className="sr-only" />
            <span className="text-sm text-charcoal">{name}</span>
          </label>
        ))}
      </FilterGroup>
    </>
  );

  return (
    <div className="pt-24 sm:pt-32">
      <section className="container-lux">
        <Reveal>
          <p className="eyebrow">Shop</p>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl text-ink">
            {selectedCats.length === 1
              ? selectedCats[0].charAt(0).toUpperCase() + selectedCats[0].slice(1)
              : 'Shop All'}
          </h1>
          <p className="mt-6 max-w-xl text-sm text-muted">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}.
          </p>
        </Reveal>
      </section>

      <section className="container-lux mt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <Filters />
          </aside>

          <div>
            <div className="flex items-center justify-between border-b border-line pb-4">
              <button
                onClick={() => setSheetOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.25} />
                Filter
              </button>
              <div className="ml-auto flex items-center gap-3">
                <label htmlFor="sort" className="eyebrow">Sort</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  className="bg-transparent text-[11px] uppercase tracking-widest2 outline-none pr-2"
                >
                  {SORTS.map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-10">
              <ProductGrid products={filtered} />
            </div>
          </div>
        </div>
      </section>

      <MobileFilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <Filters />
        <button
          onClick={() => setSheetOpen(false)}
          className="mt-6 w-full bg-ink text-ivory py-4 text-[11px] uppercase tracking-widest2"
        >
          View {filtered.length} results
        </button>
      </MobileFilterSheet>
    </div>
  );
}