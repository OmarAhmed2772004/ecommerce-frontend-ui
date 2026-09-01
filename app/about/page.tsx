export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white">من نحن</h1>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
          Omar Store هو متجر إلكتروني متكامل بدأ بهدف واحد بسيط: توفير أحدث الأجهزة التقنية
          بأسعار عادلة وتجربة شراء سلسة من أول ثانية لحد استلام الطلب.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="font-bold text-white mb-2">سرعة وأداء</h3>
          <p className="text-slate-400 text-sm">منصة مبنية بأحدث التقنيات (Next.js) لضمان أسرع تجربة تصفح ممكنة.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold text-white mb-2">أمان كامل</h3>
          <p className="text-slate-400 text-sm">بياناتك محمية بتشفير حقيقي وأنظمة صلاحيات دقيقة لكل حساب.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-bold text-white mb-2">دعم مستمر</h3>
          <p className="text-slate-400 text-sm">فريقنا جاهز يساعدك في أي وقت عن طريق صفحة التواصل.</p>
        </div>
      </div>
    </div>
  );
}