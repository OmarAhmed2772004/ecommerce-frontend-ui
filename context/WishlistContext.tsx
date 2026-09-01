'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      apiFetch('/auth/wishlist')
        .then((res) => setWishlist(res.data.map((p: { _id: string }) => p._id)))
        .catch(() => {});
    } else {
      setWishlist([]);
    }
  }, [user]);

  const toggleWishlist = async (productId: string) => {
    if (!user) return;
    const wasWishlisted = wishlist.includes(productId);
    setWishlist((prev) =>
      wasWishlisted ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    try {
      await apiFetch(`/auth/wishlist/${productId}`, { method: 'PUT' });
    } catch {
      // ارجع للحالة القديمة لو فشل الطلب
      setWishlist((prev) =>
        wasWishlisted ? [...prev, productId] : prev.filter((id) => id !== productId)
      );
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}