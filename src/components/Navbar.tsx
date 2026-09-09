import { useState } from 'react';
import { Page } from '../App';
import { Icons } from './Icons';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  navigate: (page: Page) => void;
  currentPage: Page;
}

export default function Navbar({ navigate, currentPage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { page: 'home' as Page, label: 'خانه', icon: Icons.Home },
    { page: 'search' as Page, label: 'جستجو', icon: Icons.Search },
    { page: 'map' as Page, label: 'نقشه', icon: Icons.Map },
    { page: 'chat' as Page, label: 'پیام‌ها', icon: Icons.Message },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <Icons.Package size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-gray-900 text-base leading-tight">بازارِ من</h1>
              <p className="text-[9px] text-gray-400 leading-tight">بازار آنلاین هوشمند</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={16} />
                {item.label}
                {item.page === 'chat' && unreadCount > 0 && (
                  <span className="w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('create')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
            >
              <Icons.Plus size={16} />
              ثبت آگهی
            </button>

            <button
              onClick={() => navigate('profile')}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Icons.User size={18} className="text-gray-600" />
            </button>

            <button
              onClick={() => navigate('admin')}
              className="w-9 h-9 rounded-xl bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors group"
              title="پنل مدیریت"
            >
              <Icons.Settings size={16} className="text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
            >
              {mobileOpen ? <Icons.X size={18} className="text-gray-600" /> : <Icons.Menu size={18} className="text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => { navigate(item.page); setMobileOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    currentPage === item.page ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { navigate('create'); setMobileOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium bg-emerald-50 text-emerald-700"
              >
                <Icons.Plus size={16} />
                ثبت آگهی
              </button>
              <button
                onClick={() => { navigate('admin'); setMobileOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white"
              >
                <Icons.Settings size={16} />
                پنل مدیریت
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
