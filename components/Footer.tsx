import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-950/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              O
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              OMAR STORE
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            متجرك التقني المتكامل لأحدث الأجهزة والإلكترونيات بأفضل الأسعار.
          </p>
        </div>

                <div>
          <h4 className="text-white font-bold mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-slate-400 hover:text-indigo-400">الرئيسية</Link></li>
            <li><Link href="/faq" className="text-slate-400 hover:text-indigo-400">الأسئلة الشائعة</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-indigo-400">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">قانوني</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="text-slate-400 hover:text-indigo-400">سياسة الخصوصية</Link></li>
            <li><Link href="/terms" className="text-slate-400 hover:text-indigo-400">الشروط والأحكام</Link></li>
          </ul>
        </div>
      <div className="border-t border-white/10 py-4 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} Omar Store. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}