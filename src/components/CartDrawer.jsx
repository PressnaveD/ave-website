import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useCart, formatPrice } from '../context/CartContext';
import { useScrollLock } from '../hooks/useScrollLock';
import Button from './Button';

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { items, subtotal, setQuantity, removeItem } = useCart();
  useScrollLock(cartOpen);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeCart]);

  const empty = items.length === 0;

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/30 animate-fadeIn"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}
      <aside
        className={[
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white',
          'transition-transform duration-500 ease-lux',
          cartOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-6 sm:h-20 sm:px-8">
          <p className="nav-link text-ink">Bag</p>
          <button
            onClick={closeCart}
            className="nav-link inline-flex items-center gap-2 text-ink"
            aria-label="Close bag"
          >
            Close <X className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-serif text-3xl text-ink">Your bag is empty</p>
            <p className="mt-3 text-sm text-muted">Discover the latest collection.</p>
            <div className="mt-8">
              <Button to="/shop" variant="primary" withArrow onClick={closeCart}>
                Explore Collection
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 sm:px-8 divide-y divide-line">
              {items.map((item) => (
                <li key={item.key} className="py-6 flex gap-4">
                  <Link to={`/products/${item.slug}`} onClick={closeCart} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-24 object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-4">
                        <Link
                          to={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-lg leading-tight text-ink"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm tabular-nums text-ink">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="eyebrow mt-2">
                        {item.color} · {item.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center border border-line">
                        <button
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          className="p-2 hover:bg-line/50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          className="p-2 hover:bg-line/50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-[10px] uppercase tracking-widest2 text-muted link-underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-6 sm:px-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Subtotal</p>
                <p className="text-base tabular-nums text-ink">{formatPrice(subtotal)}</p>
              </div>
              <p className="mt-2 text-xs text-muted">
                Shipping calculated at checkout. Free shipping over ₹5,000.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button to="/bag" variant="secondary" onClick={closeCart}>
                  View Bag
                </Button>
                <Button to="/checkout" variant="primary" onClick={closeCart}>
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}