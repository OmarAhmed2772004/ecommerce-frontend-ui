'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  stock: number;
  createdAt?: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, getQtyInCart } = useCart();

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

  // 🔒 لازم كل الـ hooks تتنادى قبل أي return شرطي (قاعدة React)
  const qtyInCart = product ? getQtyInCart(product._id) : 0;
  const availableToAdd = product ? Math.max(0, product.stock - qtyInCart) : 0;

  const handleAddToCart = () => {
    if (!product) return;
    const addedQty = addToCart(
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
      },
      qty
    );
    if (addedQty > 0) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
      setQty(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-slate-400 text-lg">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="text-indigo-400 font-semibold hover:text-indigo-300"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  const specs = [
    { label: 'الفئة', value: product.category || 'غير محدد' },
    { label: 'الكمية المتاحة', value: `${product.stock} قطعة` },
    { label: 'الضمان', value: 'سنة واحدة ضمان الوكيل' },
    { label: 'الشحن', value: 'شحن خلال 2-5 أيام عمل' },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="text-sm text-slate-400 hover:text-indigo-400 flex items-center gap-1 mb-6">
          ← العودة للمنتجات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10">
          <div className="relative h-80 lg:h-full min-h-[320px] bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-950 rounded-2xl flex items-center justify-center">
            <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
              {product.category}
            </span>
            <div className="text-8xl">💻</div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-amber-400 text-sm mb-2">
              ★★★★☆ <span className="text-slate-500 ml-2">(4.0 · 128 تقييم)</span>
            </div>
            <h1 className="text-3xl font-black text-white">{product.name}</h1>
            <p className="text-slate-400 leading-relaxed mt-4">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  product.stock > 0
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'غير متوفر'}
              </span>
              {qtyInCart > 0 && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  {qtyInCart} في السلة بالفعل
                </span>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-4xl font-black text-white">${product.price}</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-white/10 rounded-xl">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={availableToAdd === 0}
                  className="px-4 py-3 text-slate-300 hover:bg-white/5 rounded-r-xl disabled:opacity-30"
                >
                  −
                </button>
                <span className="px-4 font-semibold text-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(availableToAdd, q + 1))}
                  disabled={availableToAdd === 0}
                  className="px-4 py-3 text-slate-300 hover:bg-white/5 rounded-l-xl disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={availableToAdd === 0}
                className={`flex-1 py-3.5 rounded-xl font-bold shadow-lg transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : availableToAdd === 0
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-900/50'
                }`}
              >
                {added
                  ? 'تمت الإضافة! ✓'
                  : availableToAdd === 0
                  ? 'وصلت للحد الأقصى المتاح'
                  : 'أضف إلى السلة 🛒'}
              </button>
            </div>

            {/* مواصفات المنتج */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">المواصفات</h3>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-xs text-slate-500 block">{spec.label}</span>
                    <span className="text-sm font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}