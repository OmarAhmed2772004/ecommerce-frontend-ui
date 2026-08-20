'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  category?: string;
  stock: number;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => number; // بترجع الكمية اللي اتضافت فعليًا
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getQtyInCart: (id: string) => number;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, hydrated]);

  const getQtyInCart = (id: string) => {
    return cart.find((i) => i._id === id)?.qty || 0;
  };

  // 🔒 الكمية النهائية في السلة متعديش الـ stock المتاح للمنتج أبدًا
  const addToCart = (item: Omit<CartItem, 'qty'>, qty: number = 1) => {
    const maxStock = item.stock ?? Infinity;
    const currentQty = getQtyInCart(item._id);
    const availableToAdd = Math.max(0, maxStock - currentQty);
    const actualQtyAdded = Math.min(qty, availableToAdd);

    if (actualQtyAdded <= 0) return 0;

    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + actualQtyAdded } : i
        );
      }
      return [...prev, { ...item, qty: actualQtyAdded }];
    });

    return actualQtyAdded;
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getQtyInCart, totalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}