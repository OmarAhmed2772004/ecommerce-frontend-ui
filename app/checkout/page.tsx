'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { apiFetch } from '@/lib/api';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: cart.map((item) => ({
            product: item._id,
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
          shippingAddress: { address, phone },
        }),
      });
      setPlaced(true);
      clearCart();
      setTimeout(() => router.push('/orders'), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل تأكيد الطلب، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !placed) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-slate-400 text-lg">السلة فارغة، ضيف منتجات الأول.</p>
        <button
          onClick={() => router.push('/')}
          className="text-indigo-400 font-semibold hover:text-indigo-300"
        >
          العودة للمنتجات
        </button>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-4xl border border-emerald-500/30">
          ✓
        </div>
        <h1 className="text-2xl font-black text-white">تم تأكيد طلبك بنجاح!</h1>
        <p className="text-slate-400">جاري تحويلك لصفحة طلباتك...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-white mb-8">إتمام الطلب</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl p-3 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleConfirm} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white mb-2">بيانات التوصيل</h2>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1.5">العنوان</label>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
              placeholder="العنوان بالتفصيل"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1.5">رقم الهاتف</label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
              placeholder="01xxxxxxxxx"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-900/50 transition-all mt-4"
          >
            {loading ? 'جاري التأكيد...' : 'تأكيد الطلب'}
          </button>
        </form>

        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 h-fit">
          <h2 className="text-lg font-bold text-white mb-4">ملخص الطلب</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-slate-300">{item.name} × {item.qty}</span>
                <span className="text-white font-semibold">${item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
            <span className="text-slate-400 font-medium">الإجمالي</span>
            <span className="text-2xl font-black text-white">${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}