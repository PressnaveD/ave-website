import { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'ave-cart-v1';

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, size, color, quantity } = action.payload;
      const key = `${product.id}-${size}-${color}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size,
            color,
            quantity,
          },
        ],
      };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.key !== action.payload) };
    case 'SET_QTY':
      return {
        items: state.items.map((i) =>
          i.key === action.payload.key
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };
    case 'CLEAR':
      return initialState;
    case 'HYDRATE':
      return action.payload ?? initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const addItem = useCallback((payload) => dispatch({ type: 'ADD', payload }), []);
  const removeItem = useCallback((key) => dispatch({ type: 'REMOVE', payload: key }), []);
  const setQuantity = useCallback(
    (key, quantity) => dispatch({ type: 'SET_QTY', payload: { key, quantity } }),
    []
  );
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const count = state.items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = state.items.reduce((n, i) => n + i.quantity * i.price, 0);

  const value = useMemo(
    () => ({ items: state.items, addItem, removeItem, setQuantity, clear, count, subtotal }),
    [state.items, addItem, removeItem, setQuantity, clear, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const formatPrice = (n) =>
  `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;