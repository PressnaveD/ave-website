import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openMenu, openSearch, openCart } = useUI();
  const { count } = useCart();
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-lux',
        scrolled
          ? 'h-14 sm:h-16 bg-white/85 backdrop-blur-md border-b border-line'
          : 'h-16 sm:h-20',
        transparent ? 'bg-transparent border-transparent' : '',
        !scrolled && !transparent ? 'bg-white border-b border-line' : '',
      ].join(' ')}
      role="banner"
    >
      <div className="container-lux flex h-full items-center justify-between">
        {/* Left */}
        <button
          onClick={openMenu}
          className={`nav-link link-underline ${transparent ? 'text-ivory' : 'text-ink'}`}
          aria-label="Open menu"
        >
          Menu
        </button>

        {/* Center */}
<Link 
  to="/" 
  aria-label="avé — Home" 
  className={`absolute left-1/2 -translate-x-1/2 font-light tracking-[0.12em] ${
    scrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
  } transition-all duration-500 ease-lux ${
    transparent ? 'text-ivory' : 'text-ink'
  }`}
>
  avé
</Link>
        

        {/* Right */}
        <div className={`flex items-center gap-6 ${transparent ? 'text-ivory' : 'text-ink'}`}>
          <button
            onClick={openSearch}
            className="nav-link link-underline hidden sm:inline-flex"
            aria-label="Search"
          >
            Search
          </button>
          <button
            onClick={openSearch}
            className="sm:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" strokeWidth={1.25} />
          </button>
          <Link
            to="/account"
            className="nav-link link-underline hidden sm:inline-flex"
            aria-label="Account"
          >
            Account
          </Link>
          <button
            onClick={openCart}
            className="nav-link link-underline inline-flex items-center gap-2"
            aria-label={`Bag, ${count} items`}
          >
            <span className="hidden sm:inline">Bag</span>
            <ShoppingBag className="sm:hidden h-4 w-4" strokeWidth={1.25} />
            <span className="tabular-nums">({count})</span>
          </button>
        </div>
      </div>
    </header>
  );
}