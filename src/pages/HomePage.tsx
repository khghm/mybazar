import { useState } from 'react';
import { Page } from '../App';
import { categories } from '../data/mockData';
import { Icons } from '../components/Icons';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  navigate: (page: Page, adId?: string) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('تهران');
  const { ads } = useApp();

  const featuredAds = ads.filter(ad => ad.featured);
  const latestAds = ads.slice(0, 6);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900">
        <div className="absolute inset-0 bg-[url('https://image.qwenlm.ai/generated-images/db150bb3-6f63-403f-aaa3-1bca0fd24e28/_result.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Icons.Zap size={14} className="text-emerald-400" />
              <span className="text-sm text-emerald-100">بیش از ۵۰۰,۰۰۰ آگهی فعال</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              بازارِ من
              <span className="block text-emerald-400 mt-2">هر آنچه نیاز دارید، اینجاست</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
              خرید، فروش و ارائه خدمات در بزرگ‌ترین بازار آنلاین ایران. امن، سریع و هوشمند.
            </p>

            {/* Search Box */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Icons.Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="چه چیزی نیاز دارید؟"
                    className="w-full pr-12 pl-4 py-4 bg-white rounded-xl text-gray-800 outline-none text-sm shadow-sm"
                    onKeyDown={(e) => e.key === 'Enter' && navigate('search')}
                  />
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-4 bg-white rounded-xl text-gray-700 outline-none text-sm shadow-sm cursor-pointer"
                >
                  <option>تهران</option>
                  <option>اصفهان</option>
                  <option>شیراز</option>
                  <option>مشهد</option>
                  <option>تبریز</option>
                  <option>مازندران</option>
                </select>
                <button
                  onClick={() => navigate('search')}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <Icons.Search size={18} />
                  جستجو
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-10">
              {[
                { label: 'آگهی فعال', value: '۵۰۰K+' },
                { label: 'کاربر ثبت‌نامی', value: '۲M+' },
                { label: 'معامله موفق', value: '۱.۵M+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const IconComp = Icons[cat.icon as keyof typeof Icons] as React.FC<{ className?: string; size?: number }>;
            return (
              <button
                key={cat.id}
                onClick={() => navigate('search')}
                className="group bg-white rounded-2xl p-4 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  {IconComp && <IconComp className="text-white" size={22} />}
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-0.5">{cat.title}</h3>
                <p className="text-xs text-gray-400">{cat.count} آگهی</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Ads */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">آگهی‌های ویژه</h2>
            <p className="text-sm text-gray-500 mt-1">بهترین فرصت‌ها برای شما</p>
          </div>
          <button onClick={() => navigate('search')} className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
            مشاهده همه
            <Icons.ChevronLeft size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredAds.map((ad) => (
            <div
              key={ad.id}
              onClick={() => navigate('detail', ad.id)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-lg flex items-center gap-1">
                    <Icons.Star size={12} />
                    ویژه
                  </span>
                </div>
                <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Icons.Heart size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">{ad.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <Icons.Location size={12} />
                  <span>{ad.location}</span>
                  <span className="mx-1">•</span>
                  <Icons.Clock size={12} />
                  <span>{ad.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-600 text-sm">{ad.price}</span>
                  {ad.seller.verified && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Icons.Shield size={10} />
                      معتبر
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Ads */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">جدیدترین آگهی‌ها</h2>
            <p className="text-sm text-gray-500 mt-1">تازه‌ترین آگهی‌های ثبت‌شده</p>
          </div>
          <button onClick={() => navigate('search')} className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
            مشاهده همه
            <Icons.ChevronLeft size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestAds.map((ad) => (
            <div
              key={ad.id}
              onClick={() => navigate('detail', ad.id)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex"
            >
              <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{ad.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Icons.Location size={12} />
                    <span className="truncate">{ad.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-black text-emerald-600 text-sm">{ad.price}</span>
                  <span className="text-xs text-gray-400">{ad.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-gray-900 mb-3">چرا بازارِ من؟</h2>
            <p className="text-gray-500">امنیت، سرعت و اعتماد در هر معامله</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Icons.Shield,
                title: 'امنیت تضمین‌شده',
                desc: 'احراز هویت دو مرحله‌ای، چت رمزنگاری‌شده و سیستم امتیازدهی برای اعتماد حداکثری',
                color: 'bg-emerald-100 text-emerald-600',
              },
              {
                icon: Icons.Zap,
                title: 'سرعت بی‌نظیر',
                desc: 'موتور جستجوی هوشمند با فیلترهای ترکیبی و نقشه‌یابی GPS برای یافتن سریع‌ترین نتیجه',
                color: 'bg-amber-100 text-amber-600',
              },
              {
                icon: Icons.Award,
                title: 'تضمین کیفیت',
                desc: 'بررسی هوشمند آگهی‌ها، حذف خودکار محتوای تکراری و سیستم گزارش تخلف ۲۴ ساعته',
                color: 'bg-blue-100 text-blue-600',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon size={26} />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
