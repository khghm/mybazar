import { useState } from 'react';
import { Page } from '../App';
import { mockAds } from '../data/mockData';

interface MapPageProps {
  navigate: (page: Page, adId?: string) => void;
}

export default function MapPage({ navigate }: MapPageProps) {
  const [mapView, setMapView] = useState<'map' | 'list'>('map');
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Simulated map markers
  const markers = [
    { id: '1', x: 30, y: 40, ad: mockAds[0] },
    { id: '2', x: 55, y: 25, ad: mockAds[1] },
    { id: '3', x: 70, y: 55, ad: mockAds[2] },
    { id: '4', x: 20, y: 65, ad: mockAds[3] },
    { id: '5', x: 80, y: 35, ad: mockAds[4] },
    { id: '6', x: 45, y: 70, ad: mockAds[5] },
    { id: '7', x: 60, y: 80, ad: mockAds[6] },
    { id: '8', x: 35, y: 20, ad: mockAds[7] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🗺️ نقشه آگهی‌ها</h1>
          <p className="text-sm text-gray-500">آگهی‌های نزدیک خود را روی نقشه پیدا کنید</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMapView('map')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              mapView === 'map' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            🗺️ نقشه
          </button>
          <button
            onClick={() => setMapView('list')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              mapView === 'list' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            📋 لیست
          </button>
        </div>
      </div>

      {/* Map Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="🔍 جستجوی محله یا منطقه..."
              className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 outline-none focus:border-emerald-500"
            />
          </div>
          <select className="px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 outline-none">
            <option>همه دسته‌ها</option>
            <option>کالاهای فیزیکی</option>
            <option>املاک</option>
            <option>خدمات</option>
          </select>
          <select className="px-3 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 outline-none">
            <option>شعاع ۵ کیلومتر</option>
            <option>شعاع ۱۰ کیلومتر</option>
            <option>شعاع ۲۰ کیلومتر</option>
            <option>کل شهر</option>
          </select>
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center gap-1">
            📍 موقعیت من
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '500px' }}>
            <div className="map-container h-full relative">
              <div className="absolute inset-0 map-grid"></div>
              
              {/* Simulated roads */}
              <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-300/50"></div>
              <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-300/50"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-gray-300/50"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-300/50"></div>
              
              {/* User location */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg transition-transform group-hover:scale-125 ${
                    selectedMarker === marker.id ? 'bg-emerald-600 scale-125' : 'bg-white border-2 border-emerald-500'
                  }`}>
                    {marker.ad.image}
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {marker.ad.title}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 -mt-1"></div>
                  </div>
                </div>
              ))}

              {/* Clustering indicator */}
              <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/50">
                <span className="text-emerald-700 font-bold text-sm">۵+</span>
              </div>

              {/* Map controls */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-600 hover:bg-gray-50">+</button>
                <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-600 hover:bg-gray-50">−</button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>موقعیت شما</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>آگهی‌ها</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Listings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '500px' }}>
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">📍 آگهی‌های نزدیک</h3>
            <p className="text-xs text-gray-500 mt-1">{markers.length} آگهی در محدوده شما</p>
          </div>
          <div className="overflow-y-auto h-[calc(100%-70px)]">
            {markers.map((marker) => (
              <div
                key={marker.id}
                onClick={() => navigate('detail', marker.ad.id)}
                className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMarker === marker.id ? 'bg-emerald-50' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {marker.ad.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm truncate">{marker.ad.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{marker.ad.location}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-bold text-emerald-600">{marker.ad.price}</span>
                      <span className="text-xs text-gray-400">{Math.floor(Math.random() * 5 + 1)} km</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Alert */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mt-6 border border-purple-100">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="text-3xl">🔔</div>
          <div className="flex-1 text-center md:text-right">
            <h3 className="font-bold text-purple-800">هشدار قیمت</h3>
            <p className="text-sm text-purple-600 mt-1">
              برای دسته‌بندی و بازه قیمتی مورد نظر خود اعلان تنظیم کنید
            </p>
          </div>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 whitespace-nowrap">
            تنظیم هشدار جدید
          </button>
        </div>
      </div>
    </div>
  );
}
