import { useState } from 'react';
import { Page } from '../App';
import { Icons } from '../components/Icons';

interface AdminPanelProps {
  navigate: (page: Page) => void;
}

type AdminSection = 'dashboard' | 'ads' | 'users' | 'reports' | 'categories' | 'finance' | 'analytics' | 'settings';

export default function AdminPanel({ navigate }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems: { id: AdminSection; label: string; icon: React.FC<{ className?: string; size?: number }>; badge?: number }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: Icons.Layout },
    { id: 'ads', label: 'مدیریت آگهی‌ها', icon: Icons.Package, badge: 23 },
    { id: 'users', label: 'مدیریت کاربران', icon: Icons.Users },
    { id: 'reports', label: 'گزارش‌ها و تخلفات', icon: Icons.Flag, badge: 7 },
    { id: 'categories', label: 'دسته‌بندی‌ها', icon: Icons.Grid },
    { id: 'finance', label: 'مالی و پرداخت‌ها', icon: Icons.DollarSign },
    { id: 'analytics', label: 'آمار و تحلیل', icon: Icons.BarChart },
    { id: 'settings', label: 'تنظیمات سیستم', icon: Icons.Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection />;
      case 'ads': return <AdsSection />;
      case 'users': return <UsersSection />;
      case 'reports': return <ReportsSection />;
      case 'categories': return <CategoriesSection />;
      case 'finance': return <FinanceSection />;
      case 'analytics': return <AnalyticsSection />;
      case 'settings': return <SettingsSection />;
      default: return <DashboardSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white flex flex-col transition-all duration-300 fixed h-full z-50`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Icons.Package size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm">پنل مدیریت</h2>
                <p className="text-[10px] text-gray-400">بازارِ من</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-gray-800 rounded-lg">
            {sidebarOpen ? <Icons.ChevronRight size={18} /> : <Icons.ChevronLeft size={18} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeSection === item.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon size={18} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full font-bold">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          >
            <Icons.Globe size={18} />
            {sidebarOpen && <span>بازگشت به سایت</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'mr-64' : 'mr-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {menuItems.find(m => m.id === activeSection)?.label}
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">مدیریت و کنترل کامل پلتفرم</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Icons.Bell size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pr-3 border-r border-gray-200">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  م
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">مدیر سیستم</p>
                  <p className="text-[10px] text-gray-400">admin@bazaareman.ir</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

/* ========== Dashboard Section ========== */
function DashboardSection() {
  const stats = [
    { label: 'آگهی‌های فعال', value: '۵۲۳,۴۱۲', change: '+۱۲٪', up: true, icon: Icons.Package, color: 'from-emerald-500 to-teal-600' },
    { label: 'کاربران ثبت‌نامی', value: '۲,۱۴۵,۸۹۰', change: '+۸٪', up: true, icon: Icons.Users, color: 'from-blue-500 to-indigo-600' },
    { label: 'درآمد ماهانه', value: '۱.۲ میلیارد', change: '+۲۳٪', up: true, icon: Icons.DollarSign, color: 'from-amber-500 to-orange-600' },
    { label: 'گزارش‌های جدید', value: '۷', change: '-۵٪', up: false, icon: Icons.Flag, color: 'from-red-500 to-rose-600' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">درآمد هفتگی</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 outline-none">
              <option>هفته اخیر</option>
              <option>ماه اخیر</option>
              <option>سال اخیر</option>
            </select>
          </div>
          <div className="flex items-end gap-3 h-48">
            {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-1000"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400">
                  {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">فعالیت‌های اخیر</h3>
          <div className="space-y-4">
            {[
              { text: 'آگهی جدید ثبت شد', sub: 'آیفون ۱۵ پرو مکس', time: '۲ دقیقه پیش', color: 'bg-emerald-500' },
              { text: 'کاربر جدید ثبت‌نام کرد', sub: 'علی محمدی', time: '۵ دقیقه پیش', color: 'bg-blue-500' },
              { text: 'گزارش تخلف دریافت شد', sub: 'آگهی تکراری', time: '۱۲ دقیقه پیش', color: 'bg-red-500' },
              { text: 'پرداخت آگهی ویژه', sub: '۵۰,۰۰۰ تومان', time: '۲۰ دقیقه پیش', color: 'bg-amber-500' },
              { text: 'آگهی تأیید شد', sub: 'آپارتمان پونک', time: '۳۵ دقیقه پیش', color: 'bg-emerald-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 ${item.color} rounded-full mt-2 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">دسترسی سریع</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'تأیید آگهی‌های در انتظار', count: '۲۳', icon: Icons.Check, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'بررسی گزارش‌ها', count: '۷', icon: Icons.Flag, color: 'text-red-600 bg-red-50' },
            { label: 'کاربران مسدود', count: '۳', icon: Icons.Lock, color: 'text-amber-600 bg-amber-50' },
            { label: 'آگهی‌های منقضی', count: '۱۵۶', icon: Icons.Clock, color: 'text-gray-600 bg-gray-50' },
          ].map((action) => (
            <button key={action.label} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all text-right">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                <action.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{action.label}</p>
                <p className="text-xs text-gray-400">{action.count} مورد</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== Ads Management Section ========== */
function AdsSection() {
  const [filter, setFilter] = useState('all');
  const ads = [
    { id: 1, title: 'آیفون ۱۵ پرو مکس', category: 'کالای دیجیتال', status: 'active', date: '۱۴۰۳/۰۹/۱۵', views: 234, seller: 'علی محمدی' },
    { id: 2, title: 'آپارتمان ۱۲۰ متری', category: 'املاک', status: 'pending', date: '۱۴۰۳/۰۹/۱۵', views: 0, seller: 'مشاور آرمان' },
    { id: 3, title: 'تویوتا کمری ۲۰۲۴', category: 'خودرو', status: 'active', date: '۱۴۰۳/۰۹/۱۴', views: 567, seller: 'رضا کریمی' },
    { id: 4, title: 'مبل ال شکل', category: 'لوازم خانگی', status: 'reported', date: '۱۴۰۳/۰۹/۱۴', views: 89, seller: 'فروشگاه آریا' },
    { id: 5, title: 'مک‌بوک پرو M3', category: 'کالای دیجیتال', status: 'active', date: '۱۴۰۳/۰۹/۱۳', views: 345, seller: 'دیجیتال‌شاپ' },
    { id: 6, title: 'طراحی سایت', category: 'خدمات', status: 'expired', date: '۱۴۰۳/۰۸/۱۰', views: 123, seller: 'وب‌نو' },
  ];

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700',
    pending: 'bg-amber-50 text-amber-700',
    reported: 'bg-red-50 text-red-700',
    expired: 'bg-gray-100 text-gray-600',
  };
  const statusLabels: Record<string, string> = {
    active: 'فعال',
    pending: 'در انتظار تأیید',
    reported: 'گزارش شده',
    expired: 'منقضی',
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="جستجوی آگهی..." className="w-full pr-9 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500" />
          </div>
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
            <option>همه دسته‌ها</option>
            <option>کالای دیجیتال</option>
            <option>املاک</option>
            <option>خودرو</option>
          </select>
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
            <option>همه وضعیت‌ها</option>
            <option>فعال</option>
            <option>در انتظار</option>
            <option>گزارش شده</option>
          </select>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {['all', 'active', 'pending', 'reported'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${filter === f ? 'bg-white shadow-sm text-gray-800 font-medium' : 'text-gray-500'}`}
              >
                {f === 'all' ? 'همه' : f === 'active' ? 'فعال' : f === 'pending' ? 'در انتظار' : 'گزارش‌شده'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عنوان آگهی</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">دسته‌بندی</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">فروشنده</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">بازدید</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">تاریخ</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ads.filter(a => filter === 'all' || a.status === filter).map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-800">{ad.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{ad.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{ad.seller}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[ad.status]}`}>
                      {statusLabels[ad.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{ad.views.toLocaleString('fa-IR')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-400">{ad.date}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-emerald-50 rounded-lg text-gray-400 hover:text-emerald-600 transition-colors" title="مشاهده">
                        <Icons.Eye size={15} />
                      </button>
                      <button className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors" title="ویرایش">
                        <Icons.Edit size={15} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="حذف">
                        <Icons.Trash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">نمایش ۱ تا ۶ از ۵۲۳,۴۱۲</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">قبلی</button>
            <button className="px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg">۱</button>
            <button className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">۲</button>
            <button className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">۳</button>
            <button className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">بعدی</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== Users Management Section ========== */
function UsersSection() {
  const users = [
    { id: 1, name: 'علی محمدی', phone: '۰۹۱۲***۴۵۶۷', role: 'verified', status: 'active', ads: 12, rating: 4.8, joinDate: '۱۴۰۱/۰۳' },
    { id: 2, name: 'مریم حسینی', phone: '۰۹۳۵***۸۹۰۱', role: 'trusted', status: 'active', ads: 45, rating: 4.9, joinDate: '۱۳۹۹/۰۷' },
    { id: 3, name: 'رضا کریمی', phone: '۰۹۱۱***۲۳۴۵', role: 'verified', status: 'active', ads: 3, rating: 4.5, joinDate: '۱۴۰۰/۱۱' },
    { id: 4, name: 'سارا احمدی', phone: '۰۹۳۶***۶۷۸۹', role: 'basic', status: 'suspended', ads: 0, rating: 0, joinDate: '۱۴۰۳/۰۸' },
    { id: 5, name: 'محمد رضایی', phone: '۰۹۱۲***۱۱۲۲', role: 'trusted', status: 'active', ads: 28, rating: 4.7, joinDate: '۱۳۹۸/۰۵' },
  ];

  const roleLabels: Record<string, string> = { basic: 'کاربر عادی', verified: 'تأییدشده', trusted: 'معتمد' };
  const roleColors: Record<string, string> = { basic: 'bg-gray-100 text-gray-600', verified: 'bg-blue-50 text-blue-700', trusted: 'bg-emerald-50 text-emerald-700' };
  const statusLabels: Record<string, string> = { active: 'فعال', suspended: 'مسدود' };
  const statusColors: Record<string, string> = { active: 'bg-emerald-50 text-emerald-700', suspended: 'bg-red-50 text-red-700' };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'کل کاربران', value: '۲,۱۴۵,۸۹۰', icon: Icons.Users, color: 'from-blue-500 to-indigo-600' },
          { label: 'کاربران فعال', value: '۱,۸۵۶,۲۳۴', icon: Icons.Activity, color: 'from-emerald-500 to-teal-600' },
          { label: 'کاربران معتبر', value: '۴۵,۶۷۸', icon: Icons.Shield, color: 'from-amber-500 to-orange-600' },
          { label: 'مسدود شده', value: '۱۲۳', icon: Icons.Lock, color: 'from-red-500 to-rose-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={18} className="text-white" />
              </div>
              <div>
                <div className="text-lg font-black text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-64">
            <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="جستجوی کاربر..." className="w-full pr-9 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500" />
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium flex items-center gap-2">
            <Icons.Download size={14} />
            خروجی اکسل
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">کاربر</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">شماره تماس</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">سطح</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">آگهی‌ها</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">امتیاز</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-700">
                        {user.name[0]}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800">{user.name}</span>
                        <p className="text-[10px] text-gray-400">عضو {user.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[user.status]}`}>
                      {statusLabels[user.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.ads}</td>
                  <td className="px-4 py-3">
                    {user.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Icons.Star size={14} className="text-amber-400" />
                        <span className="text-sm text-gray-700">{user.rating}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600" title="مشاهده پروفایل">
                        <Icons.Eye size={15} />
                      </button>
                      <button className="p-1.5 hover:bg-amber-50 rounded-lg text-gray-400 hover:text-amber-600" title="مسدود کردن">
                        <Icons.Lock size={15} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600" title="حذف">
                        <Icons.Trash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ========== Reports Section ========== */
function ReportsSection() {
  const reports = [
    { id: 1, type: 'آگهی تکراری', ad: 'فروش لپ‌تاپ Dell', reporter: 'کاربر ۱۲۳۴', date: '۱۴۰۳/۰۹/۱۵', status: 'new', priority: 'medium' },
    { id: 2, type: 'کلاهبرداری', ad: 'فروش خودرو با قیمت غیر واقعی', reporter: 'کاربر ۵۶۷۸', date: '۱۴۰۳/۰۹/۱۵', status: 'new', priority: 'high' },
    { id: 3, type: 'محتوای نامناسب', ad: 'تصاویر نامرتبط', reporter: 'کاربر ۹۰۱۲', date: '۱۴۰۳/۰۹/۱۴', status: 'reviewing', priority: 'high' },
    { id: 4, type: 'اطلاعات نادرست', ad: 'متراژ اشتباه آپارتمان', reporter: 'کاربر ۳۴۵۶', date: '۱۴۰۳/۰۹/۱۴', status: 'resolved', priority: 'low' },
    { id: 5, type: 'آگهی تکراری', ad: 'فروش گوشی تکراری', reporter: 'کاربر ۷۸۹۰', date: '۱۴۰۳/۰۹/۱۳', status: 'resolved', priority: 'medium' },
  ];

  const statusLabels: Record<string, string> = { new: 'جدید', reviewing: 'در بررسی', resolved: 'حل شده' };
  const statusColors: Record<string, string> = { new: 'bg-red-50 text-red-700', reviewing: 'bg-amber-50 text-amber-700', resolved: 'bg-emerald-50 text-emerald-700' };
  const priorityColors: Record<string, string> = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-blue-500' };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center">
              <Icons.AlertTriangle size={20} className="text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">۷</div>
              <div className="text-xs text-gray-500">گزارش جدید</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
              <Icons.Eye size={20} className="text-amber-500" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">۱۲</div>
              <div className="text-xs text-gray-500">در حال بررسی</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Icons.Check size={20} className="text-emerald-500" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">۱,۲۳۴</div>
              <div className="text-xs text-gray-500">حل شده (این ماه)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">لیست گزارش‌ها</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {reports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${priorityColors[report.priority]} rounded-full mt-2`}></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">{report.type}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[report.status]}`}>
                        {statusLabels[report.status]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">آگهی: {report.ad}</p>
                    <p className="text-xs text-gray-400 mt-1">گزارش‌دهنده: {report.reporter} • {report.date}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 font-medium">بررسی</button>
                  <button className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium">حذف آگهی</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== Categories Section ========== */
function CategoriesSection() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-800">درخت دسته‌بندی‌ها</h3>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium flex items-center gap-2">
            <Icons.Plus size={14} />
            دسته‌بندی جدید
          </button>
        </div>
        <div className="space-y-2">
          {[
            { name: 'کالای دیجیتال', count: 125000, children: ['گوشی موبایل', 'لپ‌تاپ', 'تبلت', 'لوازم جانبی'] },
            { name: 'وسایل نقلیه', count: 85000, children: ['خودرو سواری', 'موتورسیکلت', 'قطعات یدکی'] },
            { name: 'املاک و مسکن', count: 62000, children: ['فروش آپارتمان', 'اجاره', 'ویلا', 'زمین'] },
            { name: 'لوازم خانگی', count: 98000, children: ['مبلمان', 'لوازم آشپزخانه', 'فرش'] },
            { name: 'خدمات', count: 45000, children: ['طراحی وب', 'تعمیرات', 'تدریس', 'حمل‌ونقل'] },
            { name: 'استخدام', count: 32000, children: ['فناوری اطلاعات', 'مالی', 'فروش', 'آموزش'] },
          ].map((cat) => (
            <div key={cat.name} className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icons.ChevronLeft size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-800">{cat.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{cat.count.toLocaleString('fa-IR')} آگهی</span>
                  <button className="p-1.5 hover:bg-white rounded-lg text-gray-400"><Icons.Edit size={14} /></button>
                </div>
              </div>
              <div className="p-3 pl-6 border-t border-gray-100 flex flex-wrap gap-2">
                {cat.children.map((child) => (
                  <span key={child} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-emerald-300 cursor-pointer">
                    {child}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== Finance Section ========== */
function FinanceSection() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'درآمد کل (ماه)', value: '۱,۲۰۰,۰۰۰,۰۰۰', sub: 'تومان', icon: Icons.TrendingUp, color: 'from-emerald-500 to-teal-600', change: '+۲۳٪' },
          { label: 'آگهی‌های ویژه فروخته‌شده', value: '۴,۵۶۷', sub: 'عدد', icon: Icons.Zap, color: 'from-amber-500 to-orange-600', change: '+۱۵٪' },
          { label: 'میانگین درآمد روزانه', value: '۴۰,۰۰۰,۰۰۰', sub: 'تومان', icon: Icons.BarChart, color: 'from-blue-500 to-indigo-600', change: '+۸٪' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{stat.change}</span>
            </div>
            <div className="text-xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label} ({stat.sub})</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">آخرین تراکنش‌ها</h3>
          <button className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 flex items-center gap-1">
            <Icons.Download size={12} />
            دانلود گزارش
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">شناسه</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">کاربر</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">نوع</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">مبلغ</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">تاریخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { id: 'TXN-۱۲۳۴', user: 'علی محمدی', type: 'آگهی ویژه', amount: '۵۰,۰۰۰', status: 'success', date: '۱۴۰۳/۰۹/۱۵' },
                { id: 'TXN-۱۲۳۵', user: 'مریم حسینی', type: 'ارتقاء آگهی', amount: '۱۰۰,۰۰۰', status: 'success', date: '۱۴۰۳/۰۹/۱۵' },
                { id: 'TXN-۱۲۳۶', user: 'رضا کریمی', type: 'پین آگهی', amount: '۳۰,۰۰۰', status: 'pending', date: '۱۴۰۳/۰۹/۱۴' },
                { id: 'TXN-۱۲۳۷', user: 'سارا احمدی', type: 'آگهی ویژه', amount: '۵۰,۰۰۰', status: 'failed', date: '۱۴۰۳/۰۹/۱۴' },
              ].map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{tx.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{tx.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{tx.type}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{tx.amount} تومان</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tx.status === 'success' ? 'bg-emerald-50 text-emerald-700' : tx.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {tx.status === 'success' ? 'موفق' : tx.status === 'pending' ? 'در انتظار' : 'ناموفق'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ========== Analytics Section ========== */
function AnalyticsSection() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Growth */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">رشد کاربران (۶ ماه اخیر)</h3>
          <div className="flex items-end gap-2 h-40">
            {[40, 55, 50, 65, 75, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg" style={{ height: `${h}%` }}></div>
                </div>
                <span className="text-[10px] text-gray-400">{['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">توزیع آگهی‌ها بر اساس دسته</h3>
          <div className="space-y-3">
            {[
              { name: 'کالای دیجیتال', pct: 28, color: 'bg-blue-500' },
              { name: 'املاک', pct: 22, color: 'bg-emerald-500' },
              { name: 'خودرو', pct: 18, color: 'bg-amber-500' },
              { name: 'لوازم خانگی', pct: 15, color: 'bg-purple-500' },
              { name: 'خدمات', pct: 10, color: 'bg-rose-500' },
              { name: 'استخدام', pct: 7, color: 'bg-cyan-500' },
            ].map((cat) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-24">{cat.name}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full transition-all duration-1000`} style={{ width: `${cat.pct}%` }}></div>
                </div>
                <span className="text-xs font-medium text-gray-700 w-8">{cat.pct}٪</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Trends */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">پرجستجوترین عبارات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { term: 'آیفون ۱۵', searches: '۱۲,۴۵۰' },
            { term: 'اجاره آپارتمان تهران', searches: '۹,۸۷۰' },
            { term: 'پراید', searches: '۸,۲۳۰' },
            { term: 'لپ‌تاپ ایسوس', searches: '۷,۱۵۰' },
            { term: 'استخدام برنامه‌نویس', searches: '۶,۸۹۰' },
            { term: 'مبل راحتی', searches: '۵,۴۳۰' },
          ].map((item, i) => (
            <div key={item.term} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span className="text-sm text-gray-700">{item.term}</span>
              </div>
              <span className="text-xs text-gray-500">{item.searches} جستجو</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== Settings Section ========== */
function SettingsSection() {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-100 px-4 flex gap-1 overflow-x-auto">
          {[
            { id: 'general', label: 'عمومی' },
            { id: 'security', label: 'امنیت' },
            { id: 'notifications', label: 'اعلان‌ها' },
            { id: 'content', label: 'محتوا و فیلتر' },
            { id: 'api', label: 'API و یکپارچه‌سازی' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام پلتفرم</label>
                <input type="text" defaultValue="بازارِ من" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
                <textarea defaultValue="بازار آنلاین هوشمند خرید و فروش" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 h-24 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر مدت آگهی (روز)</label>
                  <input type="number" defaultValue={60} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر تعداد تصاویر</label>
                  <input type="number" defaultValue={8} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500" />
                </div>
              </div>
              <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700">
                ذخیره تغییرات
              </button>
            </div>
          )}
          {activeTab === 'security' && (
            <div className="space-y-4">
              {[
                { label: 'احراز هویت دو مرحله‌ای', desc: 'الزامی بودن تأیید شماره موبایل برای ثبت‌نام', enabled: true },
                { label: 'فیلتر محتوای نامناسب', desc: 'استفاده از هوش مصنوعی برای تشخیص تصاویر و متون نامناسب', enabled: true },
                { label: 'تشخیص آگهی تکراری', desc: 'مقایسه هش تصاویر و متن با آگهی‌های موجود', enabled: true },
                { label: 'محدودیت ثبت آگهی روزانه', desc: 'حداکثر ۵ آگهی در روز برای کاربران عادی', enabled: false },
                { label: 'رمزنگاری پیام‌ها', desc: 'E2E encryption برای تمام پیام‌های چت', enabled: true },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{setting.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{setting.desc}</p>
                  </div>
                  <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${setting.enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${setting.enabled ? 'right-1' : 'right-6'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {[
                { label: 'اعلان ثبت آگهی جدید', channels: ['push', 'email'] },
                { label: 'اعلان پیام جدید', channels: ['push', 'sms'] },
                { label: 'اعلان گزارش تخلف', channels: ['email', 'sms'] },
                { label: 'اعلان پرداخت موفق', channels: ['push', 'email', 'sms'] },
                { label: 'هشدار قیمت', channels: ['push', 'sms'] },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-800">{notif.label}</span>
                  <div className="flex gap-2">
                    {['push', 'email', 'sms'].map((ch) => (
                      <span key={ch} className={`px-2 py-1 text-[10px] rounded-md font-medium ${
                        notif.channels.includes(ch) ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {ch === 'push' ? 'پوش' : ch === 'email' ? 'ایمیل' : 'پیامک'}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لیست سیاه کلمات</label>
                <textarea defaultValue="کلمه۱&#10;کلمه۲&#10;کلمه۳" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 h-32 resize-none font-mono" dir="ltr"></textarea>
                <p className="text-xs text-gray-400 mt-1">هر کلمه در یک خط جداگانه</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">آستانه تشخیص تشابه (درصد)</label>
                <input type="range" min="50" max="100" defaultValue="85" className="w-full" />
                <p className="text-xs text-gray-400 mt-1">آگهی‌هایی با بیش از این میزان تشابه، به‌عنوان تکراری علامت‌گذاری می‌شوند</p>
              </div>
              <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700">
                ذخیره تنظیمات محتوا
              </button>
            </div>
          )}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">API Key</span>
                  <button className="text-xs text-emerald-600 hover:underline">تولید مجدد</button>
                </div>
                <code className="text-xs bg-gray-900 text-emerald-400 px-3 py-2 rounded-lg block font-mono" dir="ltr">
                  sk_live_bazaareman_2024_xxxxxxxxxxxxxxxx
                </code>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-800 block mb-2">Webhook URL</span>
                <input type="url" defaultValue="https://api.bazaareman.ir/webhook" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono outline-none" dir="ltr" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-2xl font-black text-gray-900">۱۲.۵M</div>
                  <div className="text-xs text-gray-500">درخواست API (ماه)</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-2xl font-black text-gray-900">۹۹.۹٪</div>
                  <div className="text-xs text-gray-500">Uptime</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
