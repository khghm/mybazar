import { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const navItems: { page: Page; label: string; icon: string }[] = [
    { page: 'home', label: 'خانه', icon: '🏠' },
    { page: 'search', label: 'جستجو', icon: '🔍' },
    { page: 'map', label: 'نقشه', icon: '🗺️' },
    { page: 'chat', label: 'پیام‌ها', icon: '💬' },
    { page: 'create', label: 'درج آگهی', icon: '➕' },
    { page: 'profile', label: 'پروفایل', icon: '👤' },
    { page: 'architecture', label: 'معماری', icon: '🏗️' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              ب
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-tight">بازارِ من</h1>
              <p className="text-[10px] text-gray-400 -mt-1">بازار آنلاین بزرگ</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="ml-1">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className={`flex flex-col items-center p-1 rounded-lg text-xs ${
                currentPage === item.page ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="mt-0.5">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
