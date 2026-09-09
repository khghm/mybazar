import { useState } from 'react';
import { Page } from '../App';
import { Icons } from '../components/Icons';
import { useApp } from '../context/AppContext';

interface AdDetailPageProps {
  navigate: (page: Page, adId?: string) => void;
  adId: string | null;
}

export default function AdDetailPage({ navigate, adId }: AdDetailPageProps) {
  const [showPhone, setShowPhone] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { ads } = useApp();

  const ad = ads.find(a => a.id === adId) || ads[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button onClick={() => navigate('home')} className="hover:text-emerald-600 transition-colors">خانه</button>
        <Icons.ChevronLeft size={14} />
        <button onClick={() => navigate('search')} className="hover:text-emerald-600 transition-colors">جستجو</button>
        <Icons.ChevronLeft size={14} />
        <span className="text-gray-800 font-medium truncate max-w-[200px]">{ad.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-72 md:h-96 bg-gray-100 relative overflow-hidden">
              <img src={ad.images[selectedImage]} alt={ad.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {ad.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === selectedImage ? 'bg-white scale-125' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
            <div className="p-3 flex gap-2 overflow-x-auto">
              {ad.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    i === selectedImage ? 'border-emerald-500' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-3">{ad.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Icons.Location size={14} />
                    {ad.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Clock size={14} />
                    {ad.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Eye size={14} />
                    ۲۳۴ بازدید
                  </span>
                </div>
              </div>
              {ad.featured && (
                <span className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg">
                  <Icons.Star size={12} />
                  آگهی ویژه
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-emerald-600 mb-5 pb-5 border-b border-gray-100">{ad.price}</div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">توضیحات</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{ad.description}</p>
            </div>
          </div>

          {/* Attributes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icons.Layers size={18} className="text-emerald-600" />
              مشخصات فنی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(ad.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2.5 px-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-500">{key}</span>
                  <span className="text-sm font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icons.Map size={18} className="text-emerald-600" />
              موقعیت تقریبی
            </h2>
            <div className="h-48 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
              <div className="relative text-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/30">
                  <Icons.Location size={20} className="text-white" />
                </div>
                <p className="text-sm text-gray-700 font-medium">{ad.location}</p>
                <button onClick={() => navigate('map')} className="mt-2 text-xs text-emerald-600 hover:underline font-medium">
                  مشاهده در نقشه بزرگ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Seller Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <img src={ad.seller.avatar} alt={ad.seller.name} className="w-14 h-14 rounded-full object-cover border-2 border-emerald-100" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{ad.seller.name}</span>
                  {ad.seller.verified && (
                    <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Icons.Check size={12} className="text-white" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <div className="flex items-center gap-0.5">
                    <Icons.Star size={12} className="text-amber-400" />
                    <span>{ad.seller.rating}</span>
                  </div>
                  <span>•</span>
                  <span>عضو {ad.seller.joinDate}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">{ad.seller.ads} آگهی فعال</p>

            <div className="space-y-2.5">
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Icons.Phone size={16} />
                {showPhone ? '۰۹۱۲-۱۲۳-۴۵۶۷' : 'مشاهده شماره تماس'}
              </button>
              <button
                onClick={() => navigate('chat')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <Icons.Message size={16} />
                چت در بازارِ من
              </button>
              <button
                onClick={() => setShowReport(!showReport)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <Icons.Flag size={16} />
                گزارش تخلف
              </button>
            </div>

            {showReport && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-fadeIn">
                <p className="text-sm text-red-700 mb-3 font-medium">علت گزارش:</p>
                <div className="space-y-2">
                  {['آگهی تکراری', 'محتوای نامناسب', 'اطلاعات نادرست', 'کلاهبرداری', 'سایر'].map((reason) => (
                    <label key={reason} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-red-700">
                      <input type="radio" name="report" className="accent-red-500" />
                      {reason}
                    </label>
                  ))}
                </div>
                <button className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  ارسال گزارش
                </button>
              </div>
            )}
          </div>

          {/* Safety Tips */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-sm">
              <Icons.AlertTriangle size={16} />
              نکات ایمنی معامله
            </h3>
            <ul className="space-y-2 text-xs text-amber-700">
              <li className="flex items-start gap-2">
                <Icons.Check size={12} className="mt-0.5 flex-shrink-0" />
                قبل از پرداخت، کالا را حضوری بررسی کنید
              </li>
              <li className="flex items-start gap-2">
                <Icons.Check size={12} className="mt-0.5 flex-shrink-0" />
                اطلاعات بانکی خود را به اشتراک نگذارید
              </li>
              <li className="flex items-start gap-2">
                <Icons.Check size={12} className="mt-0.5 flex-shrink-0" />
                معامله در مکان عمومی انجام شود
              </li>
              <li className="flex items-start gap-2">
                <Icons.Check size={12} className="mt-0.5 flex-shrink-0" />
                از چت داخلی بازارِ من استفاده کنید
              </li>
            </ul>
          </div>

          {/* Price Analysis */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
            <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2 text-sm">
              <Icons.TrendingUp size={16} />
              تحلیل قیمت بازار
            </h3>
            <p className="text-xs text-emerald-700 mb-2">میانگین قیمت مشابه (۷ روز اخیر):</p>
            <p className="text-lg font-black text-emerald-800">{ad.price}</p>
            <div className="mt-3 h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '72%' }}></div>
            </div>
            <p className="text-[10px] text-emerald-600 mt-1.5">قیمت مناسب (۷۲٪ آگهی‌های مشابه بالاتر هستند)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
