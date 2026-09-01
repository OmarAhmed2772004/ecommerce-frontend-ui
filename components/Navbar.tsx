'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-900/50">
            O
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            OMAR STORE
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-slate-300">
                أهلاً، <span className="font-semibold text-white">{user.name}</span>
              </span>
              <Link
                href="/orders"
                className="text-sm font-semibold text-slate-200 hover:text-white px-3 py-2"
              >
                طلباتي
              </Link>

                            <Link
                href="/wishlist"
                className="text-sm font-semibold text-slate-200 hover:text-white px-3 py-2"
              >
                المفضلة ❤️
              </Link>
              
              {user.role === 'admin' && (
                <>
                  <Link
                    href="/admin"
                    className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 px-3 py-2"
                  >
                    لوحة التحكم
                  </Link>
                  <Link
                    href="/admin/orders"
                    className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 px-3 py-2"
                  >
                    كل الطلبات
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="text-sm font-semibold bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl border border-white/10 transition-all"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-200 hover:text-white px-4 py-2.5 rounded-xl transition-all"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-900/50 transition-all"
              >
                إنشاء حساب
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}