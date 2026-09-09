import { useState } from 'react';
import { Page } from '../App';
import { Icons } from '../components/Icons';

interface ProfilePageProps {
  navigate: (page: Page) => void;
}

export default function ProfilePage({ navigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('ads');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="h-28 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"></div>
        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            <img src="https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png" alt="Profile" className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg" />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-black text-gray-900">علی احمدی</h1>
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                  <Icons.Shield size={12} />
                  کاربر معتبر
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">عضو از مهر ۱۴۰۱ • تهران</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Icons.Star size={14} className="text-amber-400" />
                  ۴.۸ (۲۳ نظر)
                </span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Icons.Package size={14} />
                  ۱۵ آگهی فعال
                </span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Icons.Check size={14} className="text-emerald-500" />
                  ۴۲ معامله موفق
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
              <Icons.Edit size={14} />
              ویرایش پروفایل
            </button>
          </div>
        </div>
      </div>

      {/* User Level */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Icons.Award size={18} className="text-emerald-600" />
          سطح کاربری
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'عادی', icon: Icons.User, active: false },
            { name: 'تأییدشده', icon: Icons.Check, active: false },
            { name: 'معتبر', icon: Icons.Shield, active: true },
          ].map((level) => (
            <div key={level.name} className={`p-3 rounded-xl border-2 text-center ${level.active ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
              <level.icon size={20} className={`mx-auto mb-1 ${level.active ? 'text-emerald-600' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${level.active ? 'text-emerald-700' : 'text-gray-500'}`}>{level.name}</span>
              {level.active && <span className="block mt-1 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full mx-auto w-fit">فعال</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {[
            { id: 'ads', label: 'آگهی‌های من', icon: Icons.Package },
            { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Icons.Heart },
            { id: 'reviews', label: 'نظرات', icon: Icons.Star },
            { id: 'settings', label: 'تنظیمات', icon: Icons.Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3.5 text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === tab.id ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={16} />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'ads' && (
            <div className="space-y-3">
              {[
                { title: 'آیفون ۱۵ پرو مکس', status: 'active', views: 234, time: '۲ روز پیش' },
                { title: 'لپ‌تاپ ایسوس ROG', status: 'active', views: 156, time: '۵ روز پیش' },
                { title: 'دوچرخه کوهستان', status: 'sold', views: 89, time: '۲ هفته پیش' },
              ].map((ad, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      <img src="/images/iphone.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">{ad.title}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="flex items-center gap-1"><Icons.Eye size={10} />{ad.views}</span>
                        <span>{ad.time}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ad.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                      {ad.status === 'active' ? 'فعال' : 'فروخته شد'}
                    </span>
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400"><Icons.Edit size={14} /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Icons.Trash size={14} /></button>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('create')} className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-50 flex items-center justify-center gap-2">
                <Icons.Plus size={16} />
                درج آگهی جدید
              </button>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                <div className="text-3xl font-black text-emerald-600">۴.۸</div>
                <div>
                  <div className="flex text-amber-400">
                    {[1,2,3,4,5].map(i => <Icons.Star key={i} size={16} />)}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">از مجموع ۲۳ نظر</p>
                </div>
              </div>
              {[
                { user: 'محمد رضایی', rating: 5, text: 'معامله عالی بود. فروشنده بسیار خوش‌برخورد و صادق.', time: '۱ هفته پیش' },
                { user: 'سارا احمدی', rating: 4, text: 'کالا مطابق توضیحات بود. ارسال سریع.', time: '۲ هفته پیش' },
              ].map((review, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 text-sm">{review.user}</span>
                      <div className="flex text-amber-400">
                        {Array.from({ length: review.rating }).map((_, j) => <Icons.Star key={j} size={12} />)}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{review.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Icons.Lock size={16} className="text-emerald-600" />
                  امنیت حساب
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'تأیید دو مرحله‌ای', active: true },
                    { label: 'احراز هویت ملی', active: true },
                    { label: 'اتصال درگاه بانکی', active: true },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Icons.Check size={10} />
                        فعال
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border border-red-100 rounded-xl bg-red-50">
                <h3 className="font-medium text-red-800 mb-2 text-sm flex items-center gap-2">
                  <Icons.AlertTriangle size={16} />
                  حریم خصوصی (GDPR)
                </h3>
                <p className="text-xs text-red-700 mb-3">درخواست حذف کامل حساب کاربری و تمام داده‌ها</p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700">
                  درخواست حذف حساب
                </button>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 text-center py-8">هنوز آگهی مورد علاقه‌ای ثبت نکرده‌اید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
