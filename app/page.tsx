'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  stock: number;
}

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { cart, totalPrice, totalItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ['الكل', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (activeCategory !== 'الكل') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, search, activeCategory, sortBy]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <div className="fixed top-24 right-6 z-30">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl transition-all duration-200 shadow-lg"
        >
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <section className="bg-gradient-to-b from-indigo-950/60 to-transparent text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="bg-indigo-500/20 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-indigo-500/30">
            جيل جديد من المتاجر الإلكترونية
          </span>
          <h1 className="text-5xl sm:text-6xl font-black mt-6 leading-tight">
            المتجر التقني المتكامل 🚀
          </h1>
          <p className="text-slate-300 text-lg mt-4 max-w-2xl mx-auto">
            منصة شراء متطورة مربوطة بسيرفر إنتاجي حقيقي على السحابة مع واجهة Next.js فائقة السرعة.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* شريط البحث والفلترة */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 ابحث عن منتج..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-400 outline-none transition md:w-56"
          >
            <option value="newest" className="bg-slate-900">الأحدث</option>
            <option value="price_asc" className="bg-slate-900">السعر: من الأقل للأعلى</option>
            <option value="price_desc" className="bg-slate-900">السعر: من الأعلى للأقل</option>
            <option value="name" className="bg-slate-900">الاسم أبجديًا</option>
          </select>
        </div>

        {/* فئات المنتجات */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat!)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-900/40'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <span>المنتجات المتاحة</span>
          <span className="text-xs bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-full">
            {filteredProducts.length}
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-slate-400 text-lg">
              {products.length === 0 ? 'لا توجد منتجات متاحة حاليًا.' : 'مفيش نتائج مطابقة لبحثك.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border-l border-white/10 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">سلة الشراء 🛒</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-center py-10">السلة فارغة حالياً.</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div>
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <span className="text-sm font-semibold text-indigo-400">
                          ${item.price} × {item.qty}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 font-medium">الإجمالي:</span>
                <span className="text-3xl font-black text-white">${totalPrice}</span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/checkout');
                }}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-900/50 transition-all"
              >
                إتمام الشراء الان 🔥
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}