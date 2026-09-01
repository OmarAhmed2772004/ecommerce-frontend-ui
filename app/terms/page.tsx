export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-white mb-8">الشروط والأحكام</h1>
      <div className="space-y-6 text-slate-400 leading-relaxed">
        <p>باستخدامك لموقع Omar Store، أنت بتوافق على الشروط والأحكام الموضحة تحت.</p>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">الحسابات</h2>
          <p>إنت مسؤول عن الحفاظ على سرية بيانات حسابك، وأي نشاط بيحصل من حسابك.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">الطلبات والأسعار</h2>
          <p>كل الأسعار موضحة بالدولار وممكن تتغير من غير إشعار مسبق. تأكيد الطلب مش معناه ضمان توفر المنتج 100%.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">الاسترجاع والاستبدال</h2>
          <p>يحق لك طلب استرجاع خلال 14 يوم من الاستلام، بشرط إن المنتج يكون في حالته الأصلية وبدون استخدام.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">حدود المسؤولية</h2>
          <p>Omar Store مش مسؤول عن أي أضرار غير مباشرة ناتجة عن استخدام الموقع أو المنتجات.</p>
        </div>
      </div>
    </div>
  );
}