'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export default function ProductCard({ product }) {
  const { addToCart, getQtyInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(false);

  const qtyInCart = getQtyInCart(product._id);
  const isMaxed = qtyInCart >= product.stock;
  const wishlisted = isWishlisted(product._id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = addToCart(product, 1);
    if (added > 0) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleWishlist(product._id);
  };

  return (
    <Link
      href={`/products/${product._id}`}
      className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-sm hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1"
    >
      <div className="relative h-48 bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center overflow-hidden">
        <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
          {product.category || 'تكنولوجيا'}
        </span>

        {user && (
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-9 h-9 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
          >
            <span className={wishlisted ? 'text-red-500' : 'text-white/70'}>
              {wishlisted ? '❤️' : '🤍'}
            </span>
          </button>
        )}

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
            💻
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          {product.numReviews > 0 && (
            <div className="flex items-center gap-1 mt-2 text-amber-400 text-xs">
              ★ {product.rating.toFixed(1)} <span className="text-slate-500">({product.numReviews})</span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block font-medium">السعر</span>
            <span className="text-2xl font-black text-white">${product.price}</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isMaxed}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md ${
              isMaxed
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-indigo-900/50 hover:shadow-lg active:scale-95'
            }`}
          >
            {isMaxed ? 'الحد الأقصى' : isAdded ? 'تمت الإضافة! ✓' : 'أضف للسلة 🛒'}
          </button>
        </div>
      </div>
    </Link>
  );
}