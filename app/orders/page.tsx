'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';

interface OrderItem {
  name: string;
  price: number;
  qty: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  processing: { label: 'جاري التجهيز', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  shipped: { label: 'تم الشحن', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
  delivered: { label: 'تم التوصيل', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  cancelled: { label: 'ملغي', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      apiFetch('/orders/myorders')
        .then((res) => setOrders(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-white mb-8">طلباتي</h1>

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
            <div
              key={order._id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <div className="flex flex-wrap justify-between items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs text-slate-500 block">رقم الطلب</span>
                  <span className="text-white font-mono text-sm">{order._id.slice(-8)}</span>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                    STATUS_LABELS[order.status]?.color
                  }`}
                >
                  {STATUS_LABELS[order.status]?.label || order.status}
                </span>
              </div>

              <div className="space-y-2">
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