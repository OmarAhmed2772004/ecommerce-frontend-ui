'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'إزاي أقدر أتابع طلبي بعد ما أشتري؟',
    a: 'تقدر تروح لصفحة "طلباتي" من القائمة العلوية، وهتلاقي كل طلباتك وحالتها الحالية (قيد الانتظار، جاري التجهيز، تم الشحن، تم التوصيل).',
  },
  {
    q: 'هل ممكن أرجع منتج بعد الشراء؟',
    a: 'أيوه، عندك 14 يوم من تاريخ الاستلام لطلب استرجاع أو استبدال، بشرط إن المنتج يكون في حالته الأصلية.',
  },
  {
    q: 'إيه طرق الدفع المتاحة؟',
    a: 'حاليًا الدفع عند الاستلام متاح لكل الطلبات. الدفع الإلكتروني هيتوفر قريبًا.',
  },
  {
    q: 'كام الوقت اللي هياخده التوصيل؟',
    a: 'التوصيل بياخد من يومين لخمس أيام عمل حسب المحافظة.',
  },
  {
    q: 'هل المنتجات عليها ضمان؟',
    a: 'كل المنتجات بتيجي بضمان الوكيل، والمدة موضحة في صفحة كل منتج على حدة.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white">الأسئلة الشائعة</h1>
        <p className="text-slate-400 mt-2">كل حاجة محتاج تعرفها قبل وبعد الشراء</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-5 text-right"
            >
              <span className="font-semibold text-white">{item.q}</span>
              <span className={`text-indigo-400 transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-slate-400 leading-relaxed">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}