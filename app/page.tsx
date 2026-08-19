'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

// 🟢 تعريف نوع بيانات المنتج لتوافق TypeScript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-200">
              O
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              OMAR STORE
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl transition-all duration-200"
          >
            <span className="text-2xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="bg-gradient-to-b from-indigo-900 to-slate-900 text-white py-20 px-4 text-center">
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
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <span>المنتجات المتاحة</span>
          <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
            {products.length}
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="text-xl font-bold text-slate-900">سلة الشراء 🛒</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-slate-400 text-center py-10">السلة فارغة حالياً.</p>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <div>
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                        <span className="text-sm font-semibold text-indigo-600">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">الإجمالي:</span>
                <span className="text-3xl font-black text-slate-900">${totalPrice}</span>
              </div>
              <button
                disabled={cart.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all"
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