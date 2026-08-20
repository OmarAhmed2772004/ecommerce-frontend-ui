'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  category?: string;
  stock: number;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 🔒 حماية الصفحة: أدمن بس
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [authLoading, user, router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch {
      setError('فشل تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchProducts();
  }, [user]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`متأكد إنك عايز تحذف "${name}"؟`)) return;
    setDeletingId(id);
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'فشل الحذف');
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">لوحة التحكم</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة المنتجات والمخزون</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/50 transition-all text-center"
        >
          + إضافة منتج جديد
        </Link>
      </div>

      {/* بطاقات إحصائية */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <span className="text-slate-400 text-sm">إجمالي المنتجات</span>
          <p className="text-3xl font-black text-white mt-1">{products.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <span className="text-slate-400 text-sm">قيمة المخزون</span>
          <p className="text-3xl font-black text-white mt-1">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <span className="text-slate-400 text-sm">منتجات نفدت</span>
          <p className="text-3xl font-black text-red-400 mt-1">{outOfStock}</p>
        </div>
      </div>

      {/* جدول المنتجات */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center py-16 text-red-400">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center py-16 text-slate-400">مفيش منتجات لسه، ابدأ ضيف واحد.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-right">
                  <th className="px-6 py-4 font-semibold">المنتج</th>
                  <th className="px-6 py-4 font-semibold">الفئة</th>
                  <th className="px-6 py-4 font-semibold">السعر</th>
                  <th className="px-6 py-4 font-semibold">المخزون</th>
                  <th className="px-6 py-4 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white font-semibold">{p.name}</td>
                    <td className="px-6 py-4 text-slate-400">{p.category || '—'}</td>
                    <td className="px-6 py-4 text-white">${p.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          p.stock === 0
                            ? 'bg-red-500/10 text-red-400'
                            : p.stock < 5
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {p.stock} قطعة
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 transition-all"
                        >
                          تعديل
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          disabled={deletingId === p._id}
                          className="text-red-400 hover:text-red-300 font-semibold text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all disabled:opacity-50"
                        >
                          {deletingId === p._id ? '...' : 'حذف'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}