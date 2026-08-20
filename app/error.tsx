'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-4xl border border-red-500/30 mb-6">
        ⚠️
      </div>
      <h1 className="text-2xl font-black text-white mb-2">حصل خطأ غير متوقع</h1>
      <p className="text-slate-400 mb-8 max-w-md">
        حصلت مشكلة أثناء تحميل الصفحة دي. جرب تاني أو ارجع للرئيسية.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/50 transition-all"
        >
          حاول تاني
        </button>
        <Link
          href="/"
          className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold border border-white/10 transition-all"
        >
          الرئيسية
        </Link>
      </div>
    </div>
  );
}