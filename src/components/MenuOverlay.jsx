import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useScrollLock } from '../hooks/useScrollLock';

const sections = [
  { label: 'New Arrivals', to: '/shop?sort=newest' },
  { label: 'Collection', to: '/shop' },
  { label: 'Men', to: '/shop?category=men' },
  { label: 'Women', to: '/shop?category=women' },
  { label: 'Essentials', to: '/shop?category=accessories' },
  { label: 'About avé', to: '/about' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
];

export default function MenuOverlay() {
  const { menuOpen, closeMenu } = useUI();
  useScrollLock(menuOpen);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeMenu();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeMenu]);

  if (!menuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ivory animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <div className="container-lux flex h-16 items-center justify-between sm:h-20">
        <span className="nav-link text-ink">Menu</span>
        <span className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl sm:text-3xl tracking-widest2 text-ink">
          avé
        </span>
        <button
          onClick={closeMenu}
          className="nav-link inline-flex items-center gap-2 text-ink"
          aria-label="Close menu"
        >
          Close <X className="h-4 w-4" strokeWidth={1.25} />
        </button>
      </div>

      <nav className="container-lux mt-10 sm:mt-20" aria-label="Primary">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-6">
          {sections.map((s, i) => (
            <li key={s.to} style={{ animationDelay: `${i * 40}ms` }} className="animate-fadeUp">
              <Link
                to={s.to}
                onClick={closeMenu}
                className="group inline-flex items-baseline gap-4 font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-ink"
              >
                <span className="text-[10px] font-sans tracking-widest3 text-muted tabular-nums">
                  0{i + 1}
                </span>
                <span className="link-underline">{s.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-lux mt-16 sm:mt-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-16">
        <div>
          <p className="eyebrow">Newsletter</p>
          <p className="mt-2 text-sm text-charcoal max-w-sm">
            Private access to upcoming releases and editorial stories.
          </p>
        </div>
        <div className="flex gap-6 text-[11px] uppercase tracking-widest2 text-muted">
          <a href="#" className="link-underline">Instagram</a>
          <a href="#" className="link-underline">YouTube</a>
          <a href="#" className="link-underline">Pinterest</a>
        </div>
      </div>
    </div>
  );
}