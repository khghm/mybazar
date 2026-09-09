import { useState } from 'react';
import { Page } from '../App';

interface ProfilePageProps {
  navigate: (page: Page) => void;
}

export default function ProfilePage({ navigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('ads');

  const userLevel = 'trusted'; // guest, verified, trusted

  const levelInfo = {
    guest: { name: 'مهمان', icon: '👤', color: 'gray', desc: 'فقط مشاهده' },
    verified: { name: 'تأییدشده', icon: '✓', color: 'blue', desc: 'با شماره موبایل' },
    trusted: { name: 'معتمد', icon: '🛡️', color: 'emerald', desc: 'احراز هویت کامل' },
  };

  const currentLevel = levelInfo[userLevel];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl border-4 border-white">
              👤
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800">علی احمدی</h1>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  🛡️ {currentLevel.name}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">عضو از مهر ۱۴۰۱ • تهران</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-600">⭐ ۴.۸ (۲۳ نظر)</span>
                <span className="text-sm text-gray-600">📦 ۱۵ آگهی فعال</span>
                <span className="text-sm text-gray-600">✅ ۴۲ معامله موفق</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200">
              ✏️ ویرایش پروفایل
            </button>
          </div>
        </div>
      </div>

      {/* User Level Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">سطح کاربری و اعتماد</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(levelInfo).map(([key, info]) => (
            <div key={key} className={`p-4 rounded-xl border-2 text-center ${
              key === userLevel ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
            }`}>
              <div className="text-2xl mb-2">{info.icon}</div>
              <h3 className="font-bold text-gray-800 text-sm">{info.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{info.desc}</p>
              {key === userLevel && (
                <span className="inline-block mt-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">فعال</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            📌 برای ارتقاء به سطح «معتمد»: احراز هویت ملی ✓ | اتصال درگاه بانکی ✓ | حداقل ۵ نظر مثبت ✓
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {[
            { id: 'ads', label: 'آگهی‌های من', icon: '📦' },
            { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: '❤️' },
            { id: 'reviews', label: 'نظرات', icon: '⭐' },
            { id: 'settings', label: 'تنظیمات', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Ads Tab */}
          {activeTab === 'ads' && (
            <div className="space-y-3">
              {[
                { title: 'آیفون ۱۵ پرو مکس', status: 'فعال', views: 234, time: '۲ روز پیش' },
                { title: 'لپ‌تاپ ایسوس ROG', status: 'فعال', views: 156, time: '۵ روز پیش' },
                { title: 'دوچرخه کوهستان', status: 'فروخته شد', views: 89, time: '۲ هفته پیش' },
              ].map((ad, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xl">📱</div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">{ad.title}</h3>
                      <p className="text-xs text-gray-500">{ad.time} • {ad.views} بازدید</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ad.status === 'فعال' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'
                    }`}>{ad.status}</span>
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500">✏️</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500">🗑️</button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate('create')}
                className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
              >
                ➕ درج آگهی جدید
              </button>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-3">
              {[
                { title: 'پژو ۲۰۶ - مدل ۱۴۰۰', price: '۵۲۰,۰۰۰,۰۰۰ تومان', location: 'تهران' },
                { title: 'آپارتمان ۸۵ متری - پونک', price: '۶,۸۰۰,۰۰۰,۰۰۰ تومان', location: 'تهران' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xl">❤️</div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.location} • {item.price}</p>
                    </div>
                  </div>
                  <button className="text-red-400 hover:text-red-500">❤️</button>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                <div className="text-4xl font-bold text-emerald-600">۴.۸</div>
                <div>
                  <div className="flex text-amber-400 text-lg">⭐⭐⭐⭐⭐</div>
                  <p className="text-sm text-gray-600">از مجموع ۲۳ نظر</p>
                </div>
              </div>
              {[
                { user: 'محمد رضایی', rating: 5, text: 'معامله عالی بود. فروشنده بسیار خوش‌برخورد و صادق.', time: '۱ هفته پیش' },
                { user: 'سارا احمدی', rating: 4, text: 'کالا مطابق توضیحات بود. ارسال سریع.', time: '۲ هفته پیش' },
                { user: 'حسین کریمی', rating: 5, text: 'بهترین تجربه خرید آنلاین. کاملاً راضی هستم.', time: '۳ هفته پیش' },
              ].map((review, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 text-sm">{review.user}</span>
                      <span className="text-amber-400 text-sm">{'⭐'.repeat(review.rating)}</span>
                    </div>
                    <span className="text-xs text-gray-400">{review.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-3">🔐 امنیت حساب</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">تأیید دو مرحله‌ای</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">فعال ✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">احراز هویت ملی</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">تأیید شده ✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">اتصال درگاه بانکی</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">متصل ✓</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-3">🔔 اعلان‌ها</h3>
                <div className="space-y-3">
                  {['پیام جدید', 'هشدار قیمت', 'آگهی ویژه', 'ایمیل خبرنامه'].map((item) => (
                    <div key={item} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{item}</span>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border border-red-100 rounded-xl bg-red-50">
                <h3 className="font-medium text-red-800 mb-2">🗑️ حریم خصوصی</h3>
                <p className="text-xs text-red-700 mb-3">درخواست حذف کامل حساب کاربری و تمام داده‌ها (GDPR)</p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                  درخواست حذف حساب
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
