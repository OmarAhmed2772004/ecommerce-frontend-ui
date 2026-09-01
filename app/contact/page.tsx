'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: تقدر تربطها بـ endpoint حقيقي أو خدمة إيميل زي EmailJS لاحقًا
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white">تواصل معنا</h1>
        <p className="text-slate-400 mt-2">عندك سؤال أو استفسار؟ راسلنا وهنرد عليك بأسرع وقت.</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
        {sent && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm rounded-xl p-3 mb-6">
            تم إرسال رسالتك بنجاح! هنتواصل معاك قريبًا.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">الاسم</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                placeholder="اسمك"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1.5">الرسالة</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 outline-none transition resize-none"
              placeholder="اكتب رسالتك هنا..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-900/50 transition-all"
          >
            إرسال الرسالة
          </button>
        </form>
      </div>
    </div>
  );
}