export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-white mb-8">سياسة الخصوصية</h1>
      <div className="space-y-6 text-slate-400 leading-relaxed">
        <p>
          نحن في Omar Store نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. السياسة دي بتوضح إزاي بنجمع
          ونستخدم ونحافظ على بياناتك.
        </p>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">المعلومات اللي بنجمعها</h2>
          <p>بنجمع الاسم، البريد الإلكتروني، رقم الهاتف، والعنوان وقت التسجيل وإتمام الطلبات.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">استخدام المعلومات</h2>
          <p>بنستخدم بياناتك لمعالجة طلباتك، التواصل معاك بخصوص حالة الطلب، وتحسين تجربتك في الموقع.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">حماية البيانات</h2>
          <p>بياناتك محفوظة بتشفير آمن، وكلمات المرور متخزنش أبدًا كنص عادي (بنستخدم bcrypt hashing).</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">حقوقك</h2>
          <p>ليك الحق في الوصول لبياناتك أو تعديلها أو طلب حذفها في أي وقت عن طريق التواصل معانا.</p>
        </div>
      </div>
    </div>
  );
}