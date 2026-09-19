import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../context/CartContext';

export default function ProductCard({ product, priority = false }) {
  const [hovered, setHovered] = useState(false);
  const primary = product.images[0];
  const secondary = product.images[1] || primary;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-line/40 aspect-[3/4]">
        <img
          src={primary}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className={[
            'absolute inset-0 h-full w-full object-cover',
            'transition-all duration-[900ms] ease-lux',
            hovered ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100',
          ].join(' ')}
        />
        <img
          src={secondary}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={[
            'absolute inset-0 h-full w-full object-cover',
            'transition-all duration-[900ms] ease-lux',
            hovered ? 'opacity-100 scale-[1.03]' : 'opacity-0 scale-100',
          ].join(' ')}
        />
        <div
          className={[
            'absolute inset-x-0 bottom-0 flex justify-center pb-4',
            'transition-all duration-500 ease-lux',
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
          ].join(' ')}
        >
          <span className="bg-white/95 px-5 py-2.5 text-[10px] uppercase tracking-widest2 text-ink">
            Quick View
          </span>
        </div>
      </div>

      <div
        className={[
          'pt-4 transition-transform duration-500 ease-lux',
          hovered ? '-translate-y-0.5' : 'translate-y-0',
        ].join(' ')}
      >
        <h3 className="font-serif text-base sm:text-lg leading-tight text-ink">
          {product.name}
        </h3>
        <p className="eyebrow mt-1.5">{product.collection}</p>
        <p className="mt-2 text-sm tabular-nums text-ink">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}