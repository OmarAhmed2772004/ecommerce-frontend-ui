'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';

interface OrderItem {
  name: string;
  price: number;
  qty: number;
}

interface Order {
  _id: string;
  user: { name: string; email: string };
  items: OrderItem[];
  shippingAddress: { address: string; phone: string };
  totalPrice: number;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_LABELS: Record<string, string> = {
  pending: 'قيد الانتظار',
  processing: 'جاري التجهيز',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
  cancelled: 'ملغي',
};

export default function AdminOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      apiFetch('/orders')
        .then((res) => setOrders(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await apiFetch(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch {
      alert('فشل تحديث الحالة');
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-6xl mx-auto px-4 py-10">
      <Link href="/admin" className="text-sm text-slate-400 hover:text-indigo-400 flex items-center gap-1 mb-6">
        ← العودة للوحة التحكم
      </Link>
      <h1 className="text-3xl font-black text-white mb-8">كل الطلبات</h1>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-slate-400 text-lg">مفيش طلبات لسه.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-white/10">
                <div>
                  <p className="text-white font-bold">{order.user?.name}</p>
                  <p className="text-slate-400 text-xs">{order.user?.email}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {order.shippingAddress.address} · {order.shippingAddress.phone}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  disabled={updatingId === order._id}
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-indigo-400"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-slate-900">
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.name} × {item.qty}</span>
                    <span className="text-white">${item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <span className="text-slate-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                </span>
                <span className="text-xl font-black text-white">${order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}