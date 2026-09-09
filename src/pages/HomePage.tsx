import { Page } from '../App';
import { mockAds } from '../data/mockData';

interface HomePageProps {
  navigate: (page: Page, adId?: string) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  const categories = [
    { id: 'goods', name: 'کالاهای فیزیکی', icon: '📦', count: '۱۲,۳۴۵', color: 'from-blue-500 to-indigo-600' },
    { id: 'realestate', name: 'املاک و مسکن', icon: '🏠', count: '۸,۹۱۲', color: 'from-emerald-500 to-teal-600' },
    { id: 'services', name: 'خدمات', icon: '🔧', count: '۵,۶۷۸', color: 'from-orange-500 to-amber-600' },
    { id: 'jobs', name: 'استخدام', icon: '💼', count: '۳,۴۵۶', color: 'from-purple-500 to-violet-600' },
  ];

  const featuredAds = mockAds.slice(0, 6);
  const recentAds = mockAds.slice(3, 9);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-black mb-4">بازارِ من</h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-2">بزرگ‌ترین بازار آنلاین ایران</p>
            <p className="text-sm text-emerald-200">خرید، فروش، اجاره و استخدام — همه در یکجا</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="جستجو در میلیون‌ها آگهی..."
                className="flex-1 px-4 py-3 text-gray-700 text-right bg-transparent outline-none text-sm md:text-base"
              />
              <select className="hidden md:block px-3 py-2 bg-gray-50 rounded-xl text-gray-600 text-sm border-0 outline-none">
                <option>همه دسته‌ها</option>
                <option>کالاهای فیزیکی</option>
                <option>املاک و مسکن</option>
                <option>خدمات</option>
                <option>استخدام</option>
              </select>
              <button
                onClick={() => navigate('search')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <span>🔍</span>
                <span className="hidden md:inline">جستجو</span>
              </button>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-sm text-emerald-200">
              <span className="cursor-pointer hover:text-white transition-colors">📱 موبایل</span>
              <span className="cursor-pointer hover:text-white transition-colors">🚗 خودرو</span>
              <span className="cursor-pointer hover:text-white transition-colors">🏠 آپارتمان</span>
              <span className="cursor-pointer hover:text-white transition-colors">💻 لپ‌تاپ</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
            {[
              { label: 'آگهی فعال', value: '۳۰,۳۹۱' },
              { label: 'کاربر ثبت‌نام‌شده', value: '۱.۲M' },
              { label: 'معامله موفق', value: '۸۵۰K' },
              { label: 'شهر تحت پوشش', value: '۳۲۰' },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-emerald-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">دسته‌بندی‌های اصلی</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('search')}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-emerald-200"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.count} آگهی</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ads */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🌟 آگهی‌های ویژه</h2>
          <button onClick={() => navigate('search')} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            مشاهده همه ←
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredAds.map((ad) => (
            <div
              key={ad.id}
              onClick={() => navigate('detail', ad.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100"
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                  {ad.image}
                </div>
                {ad.featured && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    ⭐ ویژه
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-gray-600">
                  📍 {ad.location}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {ad.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{ad.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-600">{ad.price}</span>
                  <span className="text-xs text-gray-400">{ad.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Ads */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🕐 آخرین آگهی‌ها</h2>
          <button onClick={() => navigate('search')} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            مشاهده همه ←
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAds.map((ad) => (
            <div
              key={ad.id}
              onClick={() => navigate('detail', ad.id)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex gap-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                {ad.image}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm mb-1 truncate">{ad.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{ad.location}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-600 text-sm">{ad.price}</span>
                  <span className="text-xs text-gray-400">{ad.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">چرا بازارِ من؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔒', title: 'امنیت بالا', desc: 'احراز هویت دو مرحله‌ای، شماره‌های موقت و سیستم اعتماد چندلایه' },
              { icon: '⚡', title: 'سرعت و سادگی', desc: 'درج آگهی در کمتر از ۲ دقیقه با راهنمای هوشمند گام‌به‌گام' },
              { icon: '🎯', title: 'هوش مصنوعی', desc: 'پیشنهاد قیمت خودکار، تشخیص تصاویر و جستجوی فازی هوشمند' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-emerald-50 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
