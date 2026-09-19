import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, formatPrice } from '../context/CartContext';

function Field({ label, id, type = 'text', ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow">{label}</label>
      <input
        id={id}
        type={type}
        {...rest}
        className="mt-2 w-full border-b border-line bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors duration-300"
      />
    </div>
  );
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [method, setMethod] = useState('standard');

  const shipping = method === 'express' ? 690 : subtotal >= 5000 ? 0 : 290;
  const total = subtotal + shipping;

  const submit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clear();
  };

  if (placed) {
    return (
      <div className="container-lux pt-40 pb-32 text-center">
        <p className="eyebrow">Order Confirmed</p>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl text-ink">Thank you.</h1>
        <p className="mt-6 max-w-md mx-auto text-sm text-charcoal">
          Your order has been received. A confirmation will be sent to your email shortly.
        </p>
        <div className="mt-10">
          <Link to="/shop" className="btn-secondary inline-block">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container-lux pt-40 pb-32 text-center">
        <p className="eyebrow">Bag</p>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl text-ink">Your bag is empty.</h1>
        <p className="mt-4 text-sm text-muted">Discover the latest collection.</p>
        <div className="mt-10">
          <Link to="/shop" className="btn-secondary inline-block">Explore Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 pb-24">
      <div className="container-lux">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl text-ink">Complete your order</h1>
      </div>

      <form onSubmit={submit} className="container-lux mt-16 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20">
        <div className="space-y-12">
          {/* Contact */}
          <section>
            <h2 className="font-serif text-2xl text-ink">Contact</h2>
            <div className="mt-6 grid grid-cols-1 gap-6">
              <Field label="Email" id="email" type="email" required autoComplete="email" />
              <Field label="Phone" id="phone" type="tel" autoComplete="tel" />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="font-serif text-2xl text-ink">Shipping address</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="First name" id="fn" required autoComplete="given-name" />
              <Field label="Last name" id="ln" required autoComplete="family-name" />
              <div className="sm:col-span-2">
                <Field label="Address" id="addr" required autoComplete="street-address" />
              </div>
              <Field label="City" id="city" required autoComplete="address-level2" />
              <Field label="Postal code" id="zip" required autoComplete="postal-code" />
              <Field label="Country" id="country" required autoComplete="country-name" />
              <Field label="State" id="state" required autoComplete="address-level1" />
            </div>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="font-serif text-2xl text-ink">Delivery method</h2>
            <div className="mt-6 space-y-3">
              {[
                ['standard', 'Standard', '3–5 business days', subtotal >= 5000 ? 'Free' : '₹290'],
                ['express', 'Express', '1–2 business days', '₹690'],
              ].map(([v, title, eta, price]) => (
                <label
                  key={v}
                  className={[
                    'flex items-center justify-between border p-5 cursor-pointer transition-colors duration-300',
                    method === v ? 'border-ink' : 'border-line hover:border-ink',
                  ].join(' ')}
                >
                  <span className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="delivery"
                      checked={method === v}
                      onChange={() => setMethod(v)}
                      className="accent-ink"
                    />
                    <span>
                      <span className="block text-sm text-ink">{title}</span>
                      <span className="block text-xs text-muted">{eta}</span>
                    </span>
                  </span>
                  <span className="text-sm tabular-nums">{price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-serif text-2xl text-ink">Payment</h2>
            <div className="mt-6 grid grid-cols-1 gap-6">
              <Field label="Card number" id="card" required inputMode="numeric" placeholder="0000 0000 0000 0000" />
              <div className="grid grid-cols-2 gap-6">
                <Field label="Expiry" id="exp" required placeholder="MM / YY" />
                <Field label="CVC" id="cvc" required inputMode="numeric" placeholder="•••" />
              </div>
              <Field label="Name on card" id="cname" required />
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 h-fit border-t border-line lg:border-t-0 lg:border-l lg:pl-10 pt-8 lg:pt-0">
          <h2 className="font-serif text-2xl text-ink">Order summary</h2>
          <ul className="mt-6 divide-y divide-line">
            {items.map((i) => (
              <li key={i.key} className="flex gap-4 py-4">
                <img src={i.image} alt={i.name} className="h-24 w-20 object-cover" loading="lazy" />
                <div className="flex-1">
                  <p className="font-serif text-base text-ink">{i.name}</p>
                  <p className="eyebrow mt-1">{i.color} · {i.size} · ×{i.quantity}</p>
                </div>
                <p className="text-sm tabular-nums">{formatPrice(i.price * i.quantity)}</p>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="tabular-nums">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-base text-ink">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPrice(total)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-8 w-full bg-ink py-4 text-[11px] uppercase tracking-widest2 text-ivory transition-colors duration-500 hover:bg-charcoal"
          >
            Place Order
          </button>
          <Link to="/shop" className="mt-4 block text-center text-[11px] uppercase tracking-widest2 text-muted link-underline">
            Continue Shopping
          </Link>
        </aside>
      </form>
    </div>
  );
}