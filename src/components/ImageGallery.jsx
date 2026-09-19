import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery({ images = [], alt = '' }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const touchStart = useRef(null);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStart.current = null;
  };

  if (!images.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[88px_1fr] gap-4 lg:gap-6">
      {/* Thumbnails */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto no-scrollbar">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={[
              'relative shrink-0 h-24 w-20 lg:h-28 lg:w-full overflow-hidden bg-line/40',
              'transition-all duration-500 ease-lux',
              active === i ? 'ring-1 ring-ink' : 'opacity-60 hover:opacity-100',
            ].join(' ')}
            aria-label={`View image ${i + 1}`}
            aria-current={active === i}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="order-1 lg:order-2 relative aspect-[3/4] overflow-hidden bg-line/40 group">
        <img
          src={images[active]}
          alt={alt}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={onMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="h-full w-full object-cover transition-transform duration-700 ease-lux"
          style={{
            transform: zoom ? 'scale(1.6)' : 'scale(1)',
            transformOrigin: `${pos.x}% ${pos.y}%`,
          }}
        />

        {/* Mobile arrows */}
        {images.length > 1 && (
          <div className="lg:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3">
            <button
              onClick={prev}
              className="bg-white/85 p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.25} />
            </button>
            <button
              onClick={next}
              className="bg-white/85 p-2"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-white/85 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-ink tabular-nums">
          {active + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}