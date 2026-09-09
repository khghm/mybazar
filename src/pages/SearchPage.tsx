import { useState } from 'react';
import { Page } from '../App';
import { mockAds } from '../data/mockData';

interface SearchPageProps {
  navigate: (page: Page, adId?: string) => void;
}

export default function SearchPage({ navigate }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'همه', icon: '📋' },
    { id: 'goods', name: 'کالاهای فیزیکی', icon: '📦' },
    { id: 'realestate', name: 'املاک', icon: '🏠' },
    { id: 'services', name: 'خدمات', icon: '🔧' },
    { id: 'jobs', name: 'استخدام', icon: '💼' },
  ];

  const filteredAds = mockAds.filter(ad => {
    if (selectedCategory !== 'all' && ad.category !== selectedCategory) return false;
    if (searchQuery && !ad.title.includes(searchQuery) && !ad.description.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Search Header */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در آگهی‌ها..."
              className="w-full px-4 py-3 pr-10 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              showFilters ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            ⚙️ فیلترها
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">بازه قیمت</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm outline-none"
              >
                <option value="all">همه قیمت‌ها</option>
                <option value="low">تا ۱۰ میلیون</option>
                <option value="mid">۱۰ تا ۱۰۰ میلیون</option>
                <option value="high">بالای ۱۰۰ میلیون</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">شهر</label>
              <select className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm outline-none">
                <option>همه شهرها</option>
                <option>تهران</option>
                <option>اصفهان</option>
                <option>شیراز</option>
                <option>مشهد</option>
                <option>تبریز</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">وضعیت</label>
              <select className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm outline-none">
                <option>همه</option>
                <option>نو</option>
                <option>در حد نو</option>
                <option>دست دوم</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">مرتب‌سازی</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm outline-none"
              >
                <option value="newest">جدیدترین</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
                <option value="nearest">نزدیک‌ترین</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-800">{filteredAds.length}</span> آگهی یافت شد
        </p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50">
            ☷
          </button>
          <button className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600">
            ▤
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            onClick={() => navigate('detail', ad.id)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-emerald-200"
          >
            <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
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
              {ad.seller.verified && (
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                  ✓ تأییدشده
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {ad.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{ad.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-600 text-sm">{ad.price}</span>
                <span className="text-xs text-gray-400">{ad.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-colors">
          بارگذاری بیشتر
        </button>
      </div>
    </div>
  );
}
