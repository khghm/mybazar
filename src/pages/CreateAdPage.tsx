import { useState, useRef } from 'react';
import { Page } from '../App';
import { Icons } from '../components/Icons';
import { useApp } from '../context/AppContext';

interface CreateAdPageProps {
  navigate: (page: Page) => void;
}

export default function CreateAdPage({ navigate }: CreateAdPageProps) {
  const { createAd, categories } = useApp();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: 'تهران',
    condition: 'در حد نو',
  });
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { num: 1, title: 'دسته‌بندی', icon: Icons.Grid },
    { num: 2, title: 'مشخصات', icon: Icons.Edit },
    { num: 3, title: 'تصاویر', icon: Icons.Camera },
    { num: 4, title: 'بازبینی', icon: Icons.Check },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم فایل نباید بیشتر از ۵ مگابایت باشد');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setImages(prev => [...prev, result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const rootCategory = categories.find(c => c.id === selectedCategory);
    const adId = createAd({
      title: formData.title,
      description: formData.description,
      price: formData.price ? `${Number(formData.price).toLocaleString('fa-IR')} تومان` : 'توافقی',
      location: formData.city,
      image: images[0] || 'https://image.qwenlm.ai/generated-images/db150bb3-6f63-403f-aaa3-1bca0fd24e28/_result.png',
      images: images,
      category: rootCategory?.name || 'کالای دیجیتال',
      subcategory: 'سایر',
      attributes: {
        'وضعیت': formData.condition,
      },
    });

    alert(`آگهی شما با شناسه ${adId} ثبت شد و در انتظار بررسی مدیر است.`);
    navigate('home');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 mb-1">درج آگهی جدید</h1>
        <p className="text-sm text-gray-500">آگهی خود را در ۴ مرحله ساده ثبت کنید</p>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  step >= s.num ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.num ? <Icons.Check size={18} /> : <s.icon size={18} />}
                </div>
                <span className={`text-[10px] mt-1.5 font-medium ${step >= s.num ? 'text-emerald-600' : 'text-gray-400'}`}>{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded ${step > s.num ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {step === 1 && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-4">دسته‌بندی آگهی</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categories.filter(c => !c.parentId).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setStep(2);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-right group ${
                    selectedCategory === cat.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-100 hover:border-emerald-500 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Icons.Package size={22} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{cat.adCount.toLocaleString('fa-IR')} آگهی</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeIn space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">اطلاعات آگهی</h2>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">عنوان آگهی *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثلاً: آیفون ۱۵ پرو مکس ۲۵۶ گیگ"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">توضیحات *</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="توضیحات کامل و دقیق..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">قیمت (تومان)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="۵۰۰۰۰۰۰۰"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
                <div className="mt-2 p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-[11px] text-blue-700 flex items-center gap-1.5">
                    <Icons.TrendingUp size={12} />
                    پیشنهاد هوشمند: میانگین ۴۵,۰۰۰,۰۰۰ تومان
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">شهر *</label>
                <select
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option>تهران</option>
                  <option>اصفهان</option>
                  <option>شیراز</option>
                  <option>مشهد</option>
                  <option>تبریز</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">وضعیت کالا</label>
              <div className="flex gap-2">
                {['نو', 'در حد نو', 'دست دوم'].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setFormData({ ...formData, condition: cond })}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      formData.condition === cond
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                <Icons.ChevronRight size={16} />
                مرحله قبل
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.title || !formData.description}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                مرحله بعد
                <Icons.ChevronLeft size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-2">افزودن تصاویر</h2>
            <p className="text-sm text-gray-500 mb-4">حداقل ۱ و حداکثر ۸ تصویر. فرمت JPG/PNG تا ۵ مگابایت</p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors"
              >
                <Icons.Camera size={24} className="text-emerald-500 mb-1" />
                <span className="text-[10px] text-emerald-600 font-medium">افزودن تصویر</span>
              </button>
              {images.map((img, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl relative group overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <Icons.Trash size={20} className="text-white" />
                  </button>
                </div>
              ))}
            </div>

            {images.length > 0 && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-700 flex items-center gap-2">
                  <Icons.Check size={14} />
                  {images.length} تصویر بارگذاری شد
                </p>
              </div>
            )}

            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Icons.Zap size={14} />
                پردازش هوشمند تصاویر
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• تغییر اندازه و فشرده‌سازی خودکار</li>
                <li>• استخراج تگ ALT برای سئو</li>
                <li>• تشخیص تصاویر نامرتبط</li>
              </ul>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                <Icons.ChevronRight size={16} />
                مرحله قبل
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={images.length === 0}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                مرحله بعد
                <Icons.ChevronLeft size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-4">بازبینی و انتشار</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">عنوان</span>
                <span className="text-sm font-medium text-gray-800">{formData.title}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">قیمت</span>
                <span className="text-sm font-medium text-gray-800">
                  {formData.price ? `${Number(formData.price).toLocaleString('fa-IR')} تومان` : 'توافقی'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">دسته‌بندی</span>
                <span className="text-sm font-medium text-gray-800">
                  {categories.find(c => c.id === selectedCategory)?.name || 'کالای دیجیتال'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">شهر</span>
                <span className="text-sm font-medium text-gray-800">{formData.city}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">وضعیت</span>
                <span className="text-sm font-medium text-gray-800">{formData.condition}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">تعداد تصاویر</span>
                <span className="text-sm font-medium text-gray-800">{images.length}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-700 flex items-start gap-2">
                <Icons.AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                <span>آگهی شما پس از ثبت، در حالت "در انتظار بررسی" قرار می‌گیرد و پس از تأیید مدیر منتشر خواهد شد.</span>
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(3)} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200">
                ویرایش
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Icons.Check size={16} />
                ثبت آگهی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
