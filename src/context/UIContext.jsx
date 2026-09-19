import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openSizeGuide = useCallback(() => setSizeGuideOpen(true), []);
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), []);

  const value = useMemo(
    () => ({
      menuOpen, openMenu, closeMenu,
      searchOpen, openSearch, closeSearch,
      cartOpen, openCart, closeCart,
      sizeGuideOpen, openSizeGuide, closeSizeGuide,
    }),
    [menuOpen, searchOpen, cartOpen, sizeGuideOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};