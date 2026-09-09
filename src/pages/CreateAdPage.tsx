import { useState } from 'react';
import { Page } from '../App';

interface CreateAdPageProps {
  navigate: (page: Page) => void;
}

export default function CreateAdPage({ navigate }: CreateAdPageProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    condition: '',
    images: [] as string[]
  });

  const steps = [
    { num: 1, title: 'دسته‌بندی', icon: '📋' },
    { num: 2, title: 'مشخصات', icon: '📝' },
    { num: 3, title: 'تصاویر', icon: '📸' },
    { num: 4, title: 'بازبینی', icon: '✅' },
  ];

  const mainCategories = [
    { id: 'goods', name: 'کالاهای فیزیکی', icon: '📦', subcats: ['موبایل', 'خودرو', 'لوازم خانگی', 'پوشاک', 'لوازم الکترونیکی', 'کتاب'] },
    { id: 'realestate', name: 'املاک و مسکن', icon: '🏠', subcats: ['آپارتمان', 'ویلا', 'زمین', 'دفتر کار', 'اجاره', 'رهن'] },
    { id: 'services', name: 'خدمات', icon: '🔧', subcats: ['تعمیرات', 'تدریس', 'حمل‌ونقل', 'پذیرایی', 'زیبایی', 'مشاوره'] },
    { id: 'jobs', name: 'استخدام', icon: '💼', subcats: ['فناوری', 'مالی', 'فروش', 'آموزش', 'پزشکی', 'صنعتی'] },
  ];

  const suggestedPrice = '۴۵,۰۰۰,۰۰۰ تومان';

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">درج آگهی جدید</h1>
      <p className="text-gray-500 text-sm mb-8">آگهی خود را در ۴ مرحله ساده ثبت کنید</p>

      {/* Stepper */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all ${
                  step >= s.num
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.num ? '✓' : s.icon}
                </div>
                <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 md:w-20 h-1 mx-2 rounded ${step > s.num ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* Step 1: Category */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-4">دسته‌بندی آگهی را انتخاب کنید</h2>
            <div className="grid grid-cols-2 gap-4">
              {mainCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setStep(2); }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === cat.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-bold text-gray-800">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cat.subcats.join('، ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="animate-fadeIn space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">مشخصات آگهی</h2>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">عنوان آگهی *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="مثلاً: آیفون ۱۵ پرو مکس ۲۵۶ گیگ"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">توضیحات *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="توضیحات کامل و دقیق درباره آگهی خود بنویسید..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">قیمت (تومان) *</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="مثلاً: ۵۰,۰۰۰,۰۰۰"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm"
                />
                {/* Price Suggestion */}
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-700 flex items-center gap-1">
                    💡 پیشنهاد هوشمند: میانگین قیمت مشابه <span className="font-bold">{suggestedPrice}</span>
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">شهر *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none text-sm"
                >
                  <option value="">انتخاب شهر</option>
                  <option value="tehran">تهران</option>
                  <option value="isfahan">اصفهان</option>
                  <option value="shiraz">شیراز</option>
                  <option value="mashhad">مشهد</option>
                  <option value="tabriz">تبریز</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">وضعیت کالا</label>
              <div className="flex gap-3">
                {['نو', 'در حد نو', 'دست دوم'].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setFormData({...formData, condition: cond})}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      formData.condition === cond
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Attributes based on category */}
            {selectedCategory === 'goods' && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">مشخصات فنی (اختیاری)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="برند" className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm outline-none" />
                  <input placeholder="مدل" className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm outline-none" />
                  <input placeholder="رنگ" className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm outline-none" />
                  <input placeholder="گارانتی" className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm outline-none" />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                ← مرحله قبل
              </button>
              <button onClick={() => setStep(3)} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700">
                مرحله بعد →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Images */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-4">افزودن تصاویر</h2>
            <p className="text-sm text-gray-500 mb-4">حداقل ۱ تصویر و حداکثر ۸ تصویر اضافه کنید. فرمت‌های مجاز: JPG, PNG (حداکثر ۵ مگابایت)</p>
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              <div className="aspect-square bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors">
                <span className="text-3xl mb-1">📸</span>
                <span className="text-xs text-emerald-600 font-medium">افزودن تصویر</span>
              </div>
              {['📱', '📱', '📱'].map((img, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-4xl relative group">
                  {img}
                  <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm">حذف</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">🤖 پردازش هوشمند تصاویر</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>✓ تغییر اندازه و فشرده‌سازی خودکار</li>
                <li>✓ استخراج تگ ALT برای سئو</li>
                <li>✓ تشخیص تصاویر نامرتبط یا نامناسب</li>
                <li>✓ حذف پس‌زمینه (اختیاری)</li>
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                ← مرحله قبل
              </button>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                  💾 ذخیره پیش‌نویس
                </button>
                <button onClick={() => setStep(4)} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700">
                  مرحله بعد →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-4">بازبینی و انتشار</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 mb-1">عنوان</h3>
                <p className="font-medium text-gray-800">{formData.title || 'آیفون ۱۵ پرو مکس ۲۵۶ گیگابایت'}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 mb-1">قیمت</h3>
                <p className="font-bold text-emerald-600">{formData.price || '۸۵,۰۰۰,۰۰۰ تومان'}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 mb-1">دسته‌بندی</h3>
                <p className="font-medium text-gray-800">کالاهای فیزیکی &gt; موبایل</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 mb-1">تصاویر</h3>
                <div className="flex gap-2">
                  {['📱', '📱', '📱'].map((img, i) => (
                    <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">{img}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Ad Option */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-amber-800">⭐ ارتقاء به آگهی ویژه</h4>
                  <p className="text-xs text-amber-700 mt-1">نمایش در بالای نتایج جستجو + برچسب ویژه</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-amber-800">۱۵,۰۰۰ تومان</p>
                  <p className="text-xs text-amber-600">۷ روز</p>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">
                افزودن آگهی ویژه
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(3)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                ← ویرایش
              </button>
              <button
                onClick={() => navigate('home')}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
              >
                ✅ انتشار آگهی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
