import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return ctx;
};

const STORAGE_KEY = "mordyn:cart:v1";

/* Read the cart from localStorage on first render. Wrapped in a function
   so it only runs once (lazy initializer), and guarded for SSR / private
   mode where localStorage may be unavailable. */
const loadCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCart);

  /* Persist on every change. Wrapped in try/catch in case storage is full
     or disabled (e.g. Safari private mode). */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* ignore — fail silently rather than crash the page */
    }
  }, [cart]);

  /* Add a product, or +1 quantity if it's already in the cart.
     Accepts an optional `qty` so "Add 3" works in one call. */
  const addToCart = useCallback((product, qty = 1) => {
    if (!product || product.id == null) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }, []);

  const increment = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }, []);

  /* Decrement by 1. If it would hit 0, drop the line entirely instead of
     leaving a ghost item with quantity 0. */
  const decrement = useCallback((id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  /* Set a specific quantity directly. Useful for a quantity input field.
     Setting to 0 (or less) removes the line. */
  const updateQuantity = useCallback((id, qty) => {
    const next = Math.max(0, Math.floor(Number(qty) || 0));
    setCart((prev) => {
      if (next === 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: next } : item,
      );
    });
  }, []);

  /* Remove a line completely, regardless of its quantity. Replaces the
     "loop decrement" workaround the cart page was using. */
  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  /* Memoized derived values. `totalItems` now correctly means *item count*
     (sum of quantities), and `subtotal` is the price total. The old context
     conflated these — splitting them prevents the bug where the cart page
     shows item count where the price should be. */
  const { totalItems, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of cart) {
      count += item.quantity;
      sum += item.price * item.quantity;
    }
    return { totalItems: count, subtotal: sum };
  }, [cart]);

  const isInCart = useCallback(
    (id) => cart.some((item) => item.id === id),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      increment,
      decrement,
      updateQuantity,
      removeItem,
      clearCart,
      isInCart,
      totalItems, // count of items (sum of quantities)
      subtotal, // price total in your currency
    }),
    [
      cart,
      addToCart,
      increment,
      decrement,
      updateQuantity,
      removeItem,
      clearCart,
      isInCart,
      totalItems,
      subtotal,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
