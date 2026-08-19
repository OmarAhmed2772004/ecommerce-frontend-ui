'use client';
import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    // 🛡️ التأكد من أن الدالة تم تمريرها بنجاح قبل التنفيذ
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    }
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-tr from-slate-900 to-indigo-900 flex items-center justify-center overflow-hidden">
        <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
          {product.category || 'تكنولوجيا'}
        </span>
        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
          💻
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">السعر</span>
            <span className="text-2xl font-black text-gray-900">${product.price}</span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md ${
              isAdded
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200 hover:shadow-lg active:scale-95'
            }`}
          >
            {isAdded ? 'تمت الإضافة! ✓' : 'أضف للسلة 🛒'}
          </button>
        </div>
      </div>
    </div>
  );
}