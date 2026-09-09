import { useState } from 'react';
import { Page } from '../App';
import { Icons } from './Icons';

interface NavbarProps {
  navigate: (page: Page) => void;
  currentPage: Page;
}

export default function Navbar({ navigate, currentPage }: NavbarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems: { page: Page; label: string; icon: React.FC<{ className?: string; size?: number }> }[] = [
    { page: 'home', label: 'خانه', icon: Icons.Home },
    { page: 'search', label: 'جستجو', icon: Icons.Search },
    { page: 'map', label: 'نقشه', icon: Icons.Map },
    { page: 'chat', label: 'پیام‌ها', icon: Icons.Message },
    { page: 'profile', label: 'حساب من', icon: Icons.User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Icons.Package className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-900 leading-tight">بازارِ من</h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">بازار آنلاین هوشمند</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در میلیون‌ها آگهی..."
                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && navigate('search')}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('create')}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
            >
              <Icons.Plus size={16} />
              ثبت آگهی
            </button>
            <button
              onClick={() => navigate('admin')}
              className="flex items-center gap-2 px-3 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all"
              title="پنل مدیریت"
            >
              <Icons.Settings size={16} />
            </button>
            <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
              <Icons.Bell size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigate('create')}
              className="p-2.5 bg-emerald-600 text-white rounded-xl"
            >
              <Icons.Plus size={18} />
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="p-2.5 hover:bg-gray-100 rounded-xl"
            >
              {mobileMenu ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fadeIn">
          <div className="px-4 py-3">
            <div className="relative mb-3">
              <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500"
                onKeyDown={(e) => { e.key === 'Enter' && navigate('search'); setMobileMenu(false); }}
              />
            </div>
            <nav className="space-y-1">
              {navItems.map(({ page, label, icon: Icon }) => (
                <button
                  key={page}
                  onClick={() => { navigate(page); setMobileMenu(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
              <button
                onClick={() => { navigate('admin'); setMobileMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Icons.Settings size={18} />
                پنل مدیریت
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                currentPage === page ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px]">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
