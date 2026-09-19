import { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Heart, ChevronDown } from 'lucide-react';
import { getProductBySlug, products } from '../data/products';
import { useCart, formatPrice } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import ImageGallery from '../components/ImageGallery';
import ProductGrid from '../components/ProductGrid';
import Reveal from '../components/Reveal';

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[11px] uppercase tracking-widest2 text-ink">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-500 ease-lux ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.25}
        />
      </button>
      <div
        className={[
          'grid transition-all duration-500 ease-lux',
          open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0',
        ].join(' ')}
      >
        <div className="overflow-hidden text-sm text-charcoal">{children}</div>
      </div>
    </div>
  );
}

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { openCart, openSizeGuide } = useUI();

  const [color, setColor] = useState(product?.colors?.[0]?.name);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [error, setError] = useState('');

  const related = useMemo(
    () =>
      products
        .filter((p) => p.id !== product?.id && p.category === product?.category)
        .slice(0, 4),
    [product]
  );

  if (!product) {
    return (
      <div className="container-lux pt-40 pb-32 text-center">
        <p className="eyebrow">Unavailable</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">This piece is no longer available.</h1>
        <p className="mt-4 text-sm text-muted">Explore the current collection instead.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex text-[11px] uppercase tracking-widest2 link-underline"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const onAdd = () => {
    if (!size) {
      setError('Please select a size.');
      return;
    }
    setError('');
    addItem({ product, size, color, quantity: qty });
    openCart();
  };

  const onBuy = () => {
    if (!size) {
      setError('Please select a size.');
      return;
    }
    addItem({ product, size, color, quantity: qty });
    navigate('/checkout');
  };

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container-lux">
        {/* Breadcrumb */}
        <nav className="mb-8 text-[10px] uppercase tracking-widest2 text-muted" aria-label="Breadcrumb">
          <Link to="/" className="link-underline">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="link-underline">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ImageGallery images={product.images} alt={product.name} />

          <div className="lg:pt-2">
            <p className="eyebrow">{product.collection}</p>
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ink">
              {product.name}
            </h1>
            <p className="mt-4 text-lg tabular-nums text-ink">{formatPrice(product.price)}</p>

            <p className="mt-8 text-sm leading-relaxed text-charcoal">{product.description}</p>

            {/* Color */}
            <div className="mt-10">
              <p className="eyebrow">Color — {color}</p>
              <div className="mt-4 flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={[
                      'h-8 w-8 rounded-full border transition-all duration-300',
                      color === c.name ? 'ring-1 ring-ink ring-offset-2 ring-offset-ivory' : 'border-line',
                    ].join(' ')}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Size</p>
                <button
                  onClick={openSizeGuide}
                  className="text-[10px] uppercase tracking-widest2 text-muted link-underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setError(''); }}
                    className={[
                      'min-w-[48px] border px-4 py-3 text-[11px] uppercase tracking-widest2 transition-all duration-300',
                      size === s
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-line text-ink hover:border-ink',
                    ].join(' ')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mt-8">
              <p className="eyebrow">Quantity</p>
              <div className="mt-4 inline-flex items-center border border-line">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-sm"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {error && <p className="mt-6 text-xs text-maroon">{error}</p>}

            {/* CTAs */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={onAdd}
                className="bg-ink text-ivory py-4 text-[11px] uppercase tracking-widest2 transition-colors duration-500 hover:bg-charcoal"
              >
                Add to Bag
              </button>
              <button
                onClick={onBuy}
                className="border border-ink py-4 text-[11px] uppercase tracking-widest2 text-ink transition-all duration-500 hover:bg-ink hover:text-ivory"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={() => setWish((v) => !v)}
              className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-muted"
            >
              <Heart
                className={`h-4 w-4 ${wish ? 'fill-maroon stroke-maroon' : ''}`}
                strokeWidth={1.25}
              />
              {wish ? 'Saved' : 'Add to Wishlist'}
            </button>

            {/* Accordions */}
            <div className="mt-12 border-t border-line">
              <Accordion title="Description" defaultOpen>
                {product.description}
              </Accordion>
              <Accordion title="Details">
                {product.details || 'Designed and finished in the avé atelier. Subtle avé branding at the interior back neck.'}
              </Accordion>
              <Accordion title="Material & Care">
                <p>{product.material}</p>
                <p className="mt-2">{product.care}</p>
              </Accordion>
              <Accordion title="Shipping & Returns">
                Complimentary shipping on orders over ₹5,000. Returns accepted within 14
                days of delivery, unworn and with tags intact.
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-lux mt-24 sm:mt-32 pb-24">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink">You May Also Like</h2>
              <Link to="/shop" className="link-underline text-[11px] uppercase tracking-widest2">
                View All
              </Link>
            </div>
            <div className="mt-10">
              <ProductGrid products={related} priorityCount={0} />
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}