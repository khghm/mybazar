import { useState } from 'react';
import { Page } from '../App';
import { mockAds } from '../data/mockData';

interface AdDetailPageProps {
  navigate: (page: Page, adId?: string) => void;
  adId: string | null;
}

export default function AdDetailPage({ navigate, adId }: AdDetailPageProps) {
  const [showPhone, setShowPhone] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const ad = mockAds.find(a => a.id === adId) || mockAds[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('home')} className="hover:text-emerald-600">خانه</button>
        <span>/</span>
        <button onClick={() => navigate('search')} className="hover:text-emerald-600">جستجو</button>
        <span>/</span>
        <span className="text-gray-800">{ad.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-72 md:h-96 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-8xl relative">
              {ad.image}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {ad.images.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                ))}
              </div>
            </div>
            <div className="p-4 flex gap-2 overflow-x-auto">
              {ad.images.map((img, i) => (
                <div key={i} className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border-2 border-emerald-500">
                  {img}
                </div>
              ))}
            </div>
          </div>

          {/* Title & Price */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{ad.title}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>📍 {ad.location}</span>
                  <span>🕐 {ad.time}</span>
                  <span>👁️ ۲۳۴ بازدید</span>
                </div>
              </div>
              {ad.featured && (
                <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">⭐ ویژه</span>
              )}
            </div>
            <div className="text-2xl font-black text-emerald-600 mb-4">{ad.price}</div>
            <p className="text-gray-600 leading-relaxed">{ad.description}</p>
          </div>

          {/* Attributes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> مشخصات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(ad.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">{key}</span>
                  <span className="text-sm font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Location */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📍</span> موقعیت روی نقشه
            </h2>
            <div className="h-48 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 map-grid opacity-50"></div>
              <div className="relative text-center">
                <div className="text-4xl mb-2">📍</div>
                <p className="text-sm text-gray-600 font-medium">{ad.location}</p>
                <button onClick={() => navigate('map')} className="mt-2 text-xs text-emerald-600 hover:underline">
                  مشاهده در نقشه بزرگ ←
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">اطلاعات فروشنده</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{ad.seller.name}</span>
                  {ad.seller.verified && (
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">✓</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⭐ {ad.seller.rating}</span>
                  <span>•</span>
                  <span>عضو {ad.seller.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <span>{ad.seller.ads} آگهی فعال</span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {showPhone ? '📞 ۰۹۱۲-۱۲۳-۴۵۶۷' : '📞 مشاهده شماره تماس'}
              </button>
              <button
                onClick={() => navigate('chat')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                💬 چت در بازارِ من
              </button>
              <button
                onClick={() => setShowReport(!showReport)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                🚩 گزارش تخلف
              </button>
            </div>

            {showReport && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-fadeIn">
                <p className="text-sm text-red-700 mb-3">علت گزارش را انتخاب کنید:</p>
                <div className="space-y-2">
                  {['آگهی تکراری', 'محتوای نامناسب', 'اطلاعات نادرست', 'کلاهبرداری', 'سایر'].map((reason) => (
                    <label key={reason} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="radio" name="report" className="text-red-500" />
                      {reason}
                    </label>
                  ))}
                </div>
                <button className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                  ارسال گزارش
                </button>
              </div>
            )}
          </div>

          {/* Safety Tips */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <span>⚠️</span> نکات ایمنی
            </h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• قبل از پرداخت، کالا را حضوری بررسی کنید</li>
              <li>• هرگز اطلاعات بانکی خود را به اشتراک نگذارید</li>
              <li>• معامله در مکان عمومی انجام دهید</li>
              <li>• از چت داخلی بازارِ من استفاده کنید</li>
            </ul>
          </div>

          {/* Price Suggestion */}
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
              <span>💡</span> تحلیل قیمت
            </h3>
            <p className="text-sm text-emerald-700 mb-2">
              میانگین قیمت مشابه در ۷ روز اخیر:
            </p>
            <p className="text-lg font-bold text-emerald-800">{ad.price}</p>
            <div className="mt-3 h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
            </div>
            <p className="text-xs text-emerald-600 mt-1">قیمت مناسب (۷۲٪ آگهی‌های مشابه بالاتر هستند)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
