'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  stock: number;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        const data = await res.json();
        if (data.success) setProduct(data.data);
        else setError('المنتج غير موجود');
      } catch {
        setError('حدث خطأ في تحميل المنتج');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    // TODO: يتوصل بالـ CartContext لما نبنيه في الخطوة الجاية
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-slate-500 text-lg">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="text-indigo-600 font-semibold hover:underline"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-6">
          ← العودة للمنتجات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10">
          <div className="relative h-80 lg:h-full min-h-[320px] bg-gradient-to-tr from-slate-900 to-indigo-900 rounded-2xl flex items-center justify-center">
            <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
              {product.category}
            </span>
            <div className="text-8xl">💻</div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>
            <p className="text-slate-500 leading-relaxed mt-4">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  product.stock > 0
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'غير متوفر'}
              </span>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="text-4xl font-black text-slate-900">${product.price}</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-xl">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-r-xl"
                >
                  −
                </button>
                <span className="px-4 font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-l-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3.5 rounded-xl font-bold shadow-lg transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white shadow-indigo-200'
                }`}
              >
                {added ? 'تمت الإضافة! ✓' : 'أضف إلى السلة 🛒'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}