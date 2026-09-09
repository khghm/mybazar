import { useState } from 'react';
import { Page } from '../App';
import { mockAds } from '../data/mockData';
import { Icons } from '../components/Icons';

interface SearchPageProps {
  navigate: (page: Page, adId?: string) => void;
}

export default function SearchPage({ navigate }: SearchPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="جستجو در عنوان و توضیحات..."
              className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>
          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
            <option>همه دسته‌بندی‌ها</option>
            <option>کالای دیجیتال</option>
            <option>وسایل نقلیه</option>
            <option>املاک و مسکن</option>
            <option>لوازم خانگی</option>
            <option>خدمات</option>
            <option>استخدام</option>
          </select>
          <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
            <option>تهران</option>
            <option>اصفهان</option>
            <option>شیراز</option>
            <option>مشهد</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${
              showFilters ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icons.Filter size={16} />
            فیلترها
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-3 animate-fadeIn">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">قیمت از (تومان)</label>
              <input type="text" placeholder="۰" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">قیمت تا (تومان)</label>
              <input type="text" placeholder="نامحدود" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">وضعیت</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                <option>همه</option>
                <option>نو</option>
                <option>در حد نو</option>
                <option>دست دوم</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">نوع معامله</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                <option>همه</option>
                <option>نقدی</option>
                <option>اقساطی</option>
                <option>معاوضه</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-800">۵۲۳,۴۱۲</span> آگهی یافت شد
        </p>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none cursor-pointer"
          >
            <option value="newest">جدیدترین</option>
            <option value="cheapest">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
            <option value="popular">پربازدیدترین</option>
          </select>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}>
              <Icons.Grid size={16} className="text-gray-600" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}>
              <Icons.List size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {mockAds.map((ad) => (
          <div
            key={ad.id}
            onClick={() => navigate('detail', ad.id)}
            className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-36 flex-shrink-0' : 'h-48'}`}>
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {ad.featured && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-amber-400 text-amber-900 text-[10px] font-bold rounded-md flex items-center gap-1">
                    <Icons.Star size={10} />
                    ویژه
                  </span>
                </div>
              )}
              <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icons.Heart size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">{ad.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                <Icons.Location size={12} />
                <span>{ad.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-600">{ad.price}</span>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Icons.Clock size={12} />
                  <span>{ad.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
          <Icons.ChevronRight size={16} />
          قبلی
        </button>
        {[1, 2, 3, 4, 5].map((p) => (
          <button key={p} className={`w-9 h-9 rounded-lg text-sm font-medium ${p === 1 ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {p}
          </button>
        ))}
        <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
          بعدی
          <Icons.ChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
}
