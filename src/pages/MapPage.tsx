import { useState } from 'react';
import { Page } from '../App';
import { Icons } from '../components/Icons';
import { useApp } from '../context/AppContext';

interface MapPageProps {
  navigate: (page: Page, adId?: string) => void;
}

export default function MapPage({ navigate }: MapPageProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const { ads } = useApp();

  const markers = ads.slice(0, 8).map((ad, i) => ({
    id: ad.id,
    x: 20 + (i * 10) % 70,
    y: 20 + (i * 15) % 60,
    ad,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">نقشه آگهی‌ها</h1>
          <p className="text-sm text-gray-500">آگهی‌های نزدیک خود را روی نقشه پیدا کنید</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="جستجوی محله یا منطقه..." className="w-full pr-9 pl-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 outline-none focus:border-emerald-500" />
          </div>
          <select className="px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 outline-none cursor-pointer">
            <option>همه دسته‌ها</option>
            <option>کالای دیجیتال</option>
            <option>املاک</option>
            <option>خودرو</option>
          </select>
          <select className="px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 outline-none cursor-pointer">
            <option>شعاع ۵ کیلومتر</option>
            <option>شعاع ۱۰ کیلومتر</option>
            <option>شعاع ۲۰ کیلومتر</option>
          </select>
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center gap-1.5">
            <Icons.Location size={14} />
            موقعیت من
          </button>
        </div>
      </div>

      {/* Map + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '500px' }}>
            <div className="h-full relative bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
              {/* Grid */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}></div>
              
              {/* Roads */}
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-300/60"></div>
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-300/60"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-gray-300/60"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-gray-300/60"></div>
              
              {/* User location */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-blue-500 rounded-full border-[3px] border-white shadow-lg shadow-blue-500/30"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap font-medium shadow-lg">
                  موقعیت شما
                </div>
              </div>

              {/* Markers */}
              {markers.map((marker) => (
                <div
                  key={marker.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  onClick={() => setSelectedMarker(marker.id)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    selectedMarker === marker.id ? 'bg-emerald-600 scale-125 ring-4 ring-emerald-200' : 'bg-white border-2 border-emerald-500 hover:scale-110'
                  }`}>
                    <img src={marker.ad.image} alt="" className="w-7 h-7 rounded-full object-cover" />
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    {marker.ad.title}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></div>
                  </div>
                </div>
              ))}

              {/* Cluster */}
              <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/40 backdrop-blur-sm">
                <span className="text-emerald-700 font-bold text-sm">۵+</span>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
                <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold">+</button>
                <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold">−</button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2.5 text-[10px] text-gray-600 shadow-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  <span>موقعیت شما</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                  <span>آگهی‌ها</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '500px' }}>
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
              <Icons.Location size={16} className="text-emerald-600" />
              آگهی‌های نزدیک
            </h3>
            <p className="text-[11px] text-gray-500 mt-1">{markers.length} آگهی در محدوده شما</p>
          </div>
          <div className="overflow-y-auto h-[calc(100%-70px)]">
            {markers.map((marker) => (
              <div
                key={marker.id}
                onClick={() => navigate('detail', marker.ad.id)}
                className={`p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMarker === marker.id ? 'bg-emerald-50' : ''
                }`}
              >
                <div className="flex gap-3">
                  <img src={marker.ad.image} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-xs truncate">{marker.ad.title}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                      <Icons.Location size={10} />
                      {marker.ad.location}
                    </p>
                    <div className="flex justify-between items-center mt-1.5">
                      <span className="text-xs font-bold text-emerald-600">{marker.ad.price}</span>
                      <span className="text-[10px] text-gray-400">{Math.floor(Math.random() * 5 + 1)} km</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Alert */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 mt-6 border border-purple-100">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Icons.Bell size={22} className="text-purple-600" />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h3 className="font-bold text-purple-800">هشدار قیمت</h3>
            <p className="text-xs text-purple-600 mt-1">
              برای دسته‌بندی و بازه قیمتی مورد نظر خود اعلان تنظیم کنید
            </p>
          </div>
          <button className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
            تنظیم هشدار جدید
          </button>
        </div>
      </div>
    </div>
  );
}
