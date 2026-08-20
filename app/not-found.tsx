import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        404
      </span>
      <h1 className="text-2xl font-black text-white mt-4 mb-2">الصفحة غير موجودة</h1>
      <p className="text-slate-400 mb-8 max-w-md">
        الصفحة اللي بتدور عليها مش موجودة أو اتشالت.
      </p>
      <Link
        href="/"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/50 transition-all"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}