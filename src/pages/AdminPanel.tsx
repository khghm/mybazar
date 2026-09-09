import { useState } from 'react';
import { Page } from '../App';
import { Icons } from '../components/Icons';
import { useApp, AdStatus, UserLevel } from '../context/AppContext';

interface AdminPanelProps { navigate: (page: Page) => void; }
type Section = 'dashboard' | 'ads' | 'users' | 'reports' | 'categories' | 'finance' | 'notifications' | 'settings';

export default function AdminPanel({ navigate }: AdminPanelProps) {
  const [section, setSection] = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { notifications } = useApp();
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const menu: { id: Section; label: string; icon: React.FC<{ className?: string; size?: number }>; badge?: number }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: Icons.Layout },
    { id: 'ads', label: 'آگهی‌ها', icon: Icons.Package },
    { id: 'users', label: 'کاربران', icon: Icons.Users },
    { id: 'reports', label: 'گزارش‌ها', icon: Icons.Flag, badge: notifications.filter(n => n.type === 'warning' && !n.read).length },
    { id: 'categories', label: 'دسته‌بندی‌ها', icon: Icons.Grid },
    { id: 'finance', label: 'مالی', icon: Icons.DollarSign },
    { id: 'notifications', label: 'اعلان‌ها', icon: Icons.Bell, badge: unreadNotifs },
    { id: 'settings', label: 'تنظیمات', icon: Icons.Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col fixed h-full z-50`}>
        <div className="p-3 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Icons.Settings size={16} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm">پنل مدیریت</h2>
                <p className="text-[9px] text-gray-400">بازارِ من</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-gray-800 rounded-lg">
            {sidebarOpen ? <Icons.ChevronRight size={16} /> : <Icons.ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                section === item.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon size={16} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full font-bold min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-800">
          <button onClick={() => navigate('home')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
            <Icons.Globe size={16} />
            {sidebarOpen && <span>بازگشت به سایت</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 ${sidebarOpen ? 'mr-64' : 'mr-16'} transition-all duration-300`}>
        <header className="bg-white border-b border-gray-100 px-6 py-3 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{menu.find(m => m.id === section)?.label}</h1>
              <p className="text-[11px] text-gray-400">مدیریت و کنترل کامل پلتفرم</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.Bell size={18} className="text-gray-600" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">م</div>
                {sidebarOpen && <span className="text-sm font-medium text-gray-800">مدیر سیستم</span>}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {section === 'dashboard' && <Dashboard />}
          {section === 'ads' && <AdsManager />}
          {section === 'users' && <UsersManager />}
          {section === 'reports' && <ReportsManager />}
          {section === 'categories' && <CategoriesManager />}
          {section === 'finance' && <FinanceManager />}
          {section === 'notifications' && <NotificationsManager />}
          {section === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  );
}

/* ==================== DASHBOARD ==================== */
function Dashboard() {
  const { ads, users, reports, transactions, notifications } = useApp();
  const stats = {
    totalAds: ads.length,
    activeAds: ads.filter(a => (a as any).status !== 'rejected' && (a as any).status !== 'expired').length,
    pendingAds: ads.filter(a => (a as any).status === 'pending').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    blockedUsers: users.filter(u => u.status === 'blocked').length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    totalRevenue: transactions.filter(t => t.status === 'completed').reduce((s, t) => s + t.amount, 0),
    unreadNotifs: notifications.filter(n => !n.read).length,
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'کل آگهی‌ها', value: stats.totalAds.toLocaleString('fa-IR'), icon: Icons.Package, color: 'from-emerald-500 to-teal-600' },
          { label: 'کاربران فعال', value: stats.activeUsers.toLocaleString('fa-IR'), icon: Icons.Users, color: 'from-blue-500 to-indigo-600' },
          { label: 'درآمد کل', value: `${(stats.totalRevenue / 1000).toFixed(0)}K`, icon: Icons.DollarSign, color: 'from-amber-500 to-orange-600' },
          { label: 'گزارش‌های باز', value: stats.pendingReports.toLocaleString('fa-IR'), icon: Icons.Flag, color: 'from-red-500 to-rose-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 bg-gradient-to-br ${s.color} rounded-lg flex items-center justify-center`}>
                <s.icon size={16} className="text-white" />
              </div>
            </div>
            <div className="text-xl font-black text-gray-900">{s.value}</div>
            <div className="text-[11px] text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">اقدامات سریع</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'آگهی‌های در انتظار', count: stats.pendingAds, color: 'bg-amber-50 text-amber-700 border-amber-200' },
              { label: 'گزارش‌های جدید', count: stats.pendingReports, color: 'bg-red-50 text-red-700 border-red-200' },
              { label: 'کاربران مسدود', count: stats.blockedUsers, color: 'bg-gray-50 text-gray-700 border-gray-200' },
              { label: 'اعلان‌های خوانده‌نشده', count: stats.unreadNotifs, color: 'bg-blue-50 text-blue-700 border-blue-200' },
            ].map((a) => (
              <div key={a.label} className={`p-3 rounded-lg border ${a.color}`}>
                <div className="text-lg font-black">{a.count.toLocaleString('fa-IR')}</div>
                <div className="text-[10px]">{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">آخرین اعلان‌ها</h3>
          <div className="space-y-2">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  n.type === 'warning' ? 'bg-amber-500' : n.type === 'success' ? 'bg-emerald-500' : n.type === 'system' ? 'bg-gray-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800">{n.title}</p>
                  <p className="text-[10px] text-gray-500 truncate">{n.message}</p>
                </div>
                <span className="text-[9px] text-gray-400 flex-shrink-0">{n.createdAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Ads */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">آخرین آگهی‌ها</h3>
        <div className="space-y-2">
          {ads.slice(0, 5).map((ad) => (
            <div key={ad.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <img src={ad.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="text-xs font-medium text-gray-800">{ad.title}</p>
                  <p className="text-[10px] text-gray-500">{ad.seller.name} • {ad.location}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">{ad.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================== ADS MANAGER ==================== */
function AdsManager() {
  const { ads, deleteAd, updateAdStatus, toggleAdFeatured, updateAd } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editingAd, setEditingAd] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', price: '', location: '' });

  const filtered = ads.filter(ad => {
    if (search && !ad.title.includes(search) && !ad.seller.name.includes(search)) return false;
    if (filterStatus !== 'all' && (ad as any).status !== filterStatus) return false;
    return true;
  });

  const handleEdit = (ad: any) => {
    setEditingAd(ad.id);
    setEditData({ title: ad.title, price: ad.price, location: ad.location });
  };

  const handleSaveEdit = () => {
    if (editingAd) {
      updateAd(editingAd, editData);
      setEditingAd(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingAd(null);
  };

  const statusLabels: Record<string, string> = { active: 'فعال', pending: 'در انتظار', rejected: 'رد شده', expired: 'منقضی', sold: 'فروخته شده' };
  const statusColors: Record<string, string> = { active: 'bg-emerald-50 text-emerald-700', pending: 'bg-amber-50 text-amber-700', rejected: 'bg-red-50 text-red-700', expired: 'bg-gray-100 text-gray-600', sold: 'bg-blue-50 text-blue-700' };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Toolbar */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-wrap gap-2">
        <div className="flex-1 min-w-[200px] relative">
          <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو..." className="w-full pr-8 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none">
          <option value="all">همه وضعیت‌ها</option>
          <option value="active">فعال</option>
          <option value="pending">در انتظار</option>
          <option value="rejected">رد شده</option>
          <option value="expired">منقضی</option>
        </select>
        <span className="text-xs text-gray-500 self-center px-2">{filtered.length} آگهی</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">آگهی</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">فروشنده</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">وضعیت</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">ویژه</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(ad => {
                const isEditing = editingAd === ad.id;
                return (
                  <tr key={ad.id} className={`hover:bg-gray-50/50 ${isEditing ? 'bg-blue-50' : ''}`}>
                    <td className="px-3 py-2.5">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            value={editData.title}
                            onChange={e => setEditData({ ...editData, title: e.target.value })}
                            className="w-full px-2 py-1 bg-white border border-blue-500 rounded text-xs outline-none"
                            placeholder="عنوان"
                          />
                          <input
                            value={editData.location}
                            onChange={e => setEditData({ ...editData, location: e.target.value })}
                            className="w-full px-2 py-1 bg-white border border-blue-500 rounded text-xs outline-none"
                            placeholder="موقعیت"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <img src={ad.image} alt="" className="w-8 h-8 rounded object-cover" />
                          <div>
                            <p className="font-medium text-gray-800 truncate max-w-[200px]">{ad.title}</p>
                            <p className="text-[10px] text-gray-400">{ad.location}</p>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{ad.seller.name}</td>
                    <td className="px-3 py-2.5">
                      {isEditing ? (
                        <input
                          value={editData.price}
                          onChange={e => setEditData({ ...editData, price: e.target.value })}
                          className="w-full px-2 py-1 bg-white border border-blue-500 rounded text-xs outline-none"
                          placeholder="قیمت"
                        />
                      ) : (
                        <select
                          value={(ad as any).status || 'active'}
                          onChange={e => updateAdStatus(ad.id, e.target.value as AdStatus)}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium border-0 outline-none cursor-pointer ${statusColors[(ad as any).status || 'active']}`}
                        >
                          <option value="active">فعال</option>
                          <option value="pending">در انتظار</option>
                          <option value="rejected">رد شده</option>
                          <option value="expired">منقضی</option>
                          <option value="sold">فروخته شده</option>
                        </select>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <button onClick={() => toggleAdFeatured(ad.id)} className={`px-2 py-1 rounded text-[10px] font-medium ${ad.featured ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                        {ad.featured ? '⭐ ویژه' : 'عادی'}
                      </button>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1">
                        {isEditing ? (
                          <>
                            <button onClick={handleSaveEdit} className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-medium">ذخیره</button>
                            <button onClick={handleCancelEdit} className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-[10px]">انصراف</button>
                          </>
                        ) : confirmDelete === ad.id ? (
                          <>
                            <button onClick={() => { deleteAd(ad.id); setConfirmDelete(null); }} className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-medium">تأیید حذف</button>
                            <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-[10px]">انصراف</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(ad)} className="p-1.5 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600">
                              <Icons.Edit size={13} />
                            </button>
                            <button onClick={() => setConfirmDelete(ad.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600">
                              <Icons.Trash size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==================== USERS MANAGER ==================== */
function UsersManager() {
  const { users, blockUser, unblockUser, updateUserLevel } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = users.filter(u => {
    if (search && !u.name.includes(search) && !u.phone.includes(search)) return false;
    if (filterStatus !== 'all' && u.status !== filterStatus) return false;
    return true;
  });

  const levelLabels: Record<UserLevel, string> = { guest: 'مهمان', verified: 'تأییدشده', trusted: 'معتبر' };
  const levelColors: Record<UserLevel, string> = { guest: 'bg-gray-100 text-gray-600', verified: 'bg-blue-50 text-blue-700', trusted: 'bg-emerald-50 text-emerald-700' };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-wrap gap-2">
        <div className="flex-1 min-w-[200px] relative">
          <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجوی کاربر..." className="w-full pr-8 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none">
          <option value="all">همه</option>
          <option value="active">فعال</option>
          <option value="blocked">مسدود</option>
          <option value="suspended">معلق</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">کاربر</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">تماس</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">سطح</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">وضعیت</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">امتیاز</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-gray-50/50">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-[10px] text-gray-400">{user.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-gray-600" dir="ltr">{user.phone}</td>
                  <td className="px-3 py-2.5">
                    <select
                      value={user.level}
                      onChange={e => updateUserLevel(user.id, e.target.value as UserLevel)}
                      className={`px-2 py-1 rounded text-[10px] font-medium border-0 outline-none cursor-pointer ${levelColors[user.level]}`}
                    >
                      <option value="guest">مهمان</option>
                      <option value="verified">تأییدشده</option>
                      <option value="trusted">معتبر</option>
                    </select>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {user.status === 'active' ? 'فعال' : 'مسدود'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-0.5">
                      <Icons.Star size={11} className="text-amber-400" />
                      <span className="text-gray-700">{user.rating}</span>
                      <span className="text-gray-400 text-[10px]">({user.totalReviews})</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    {user.status === 'active' ? (
                      <button onClick={() => blockUser(user.id)} className="px-2 py-1 bg-red-50 text-red-700 rounded text-[10px] font-medium hover:bg-red-100">
                        مسدود کردن
                      </button>
                    ) : (
                      <button onClick={() => unblockUser(user.id)} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-medium hover:bg-emerald-100">
                        رفع مسدودی
                      </button>
                    )}
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

/* ==================== REPORTS MANAGER ==================== */
function ReportsManager() {
  const { reports, reviewReport, ads } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all');

  const filtered = reports.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'همه', count: reports.length },
          { id: 'pending', label: 'در انتظار', count: reports.filter(r => r.status === 'pending').length },
          { id: 'reviewed', label: 'بررسی شده', count: reports.filter(r => r.status === 'reviewed').length },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id as any)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f.id ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(report => {
          const ad = ads.find(a => a.id === report.adId);
          return (
            <div key={report.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {ad && <img src={ad.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${report.status === 'pending' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
                        {report.status === 'pending' ? 'در انتظار بررسی' : 'بررسی شده'}
                      </span>
                      <span className="text-[10px] text-gray-400">{report.createdAt}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-800">آگهی: {report.adTitle}</p>
                    <p className="text-[11px] text-gray-600 mt-1">علت: <span className="font-medium">{report.reason}</span></p>
                    <p className="text-[10px] text-gray-500 mt-0.5">توضیح: {report.description}</p>
                    <p className="text-[10px] text-gray-400 mt-1">گزارش‌دهنده: {report.reporterName}</p>
                  </div>
                </div>
                {report.status === 'pending' && (
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button onClick={() => reviewReport(report.id, 'reject_ad')} className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-[10px] font-medium hover:bg-red-700">
                      رد آگهی
                    </button>
                    <button onClick={() => reviewReport(report.id, 'dismiss')} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-medium hover:bg-gray-200">
                      بستن گزارش
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">گزارشی یافت نشد</div>
        )}
      </div>
    </div>
  );
}

/* ==================== CATEGORIES MANAGER ==================== */
function CategoriesManager() {
  const { categories, addCategory, updateCategory, deleteCategory, toggleCategoryActive } = useApp();
  const [newName, setNewName] = useState('');
  const [newParent, setNewParent] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const rootCats = categories.filter(c => !c.parentId);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addCategory(newName.trim(), newParent || null);
    setNewName('');
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      updateCategory(editingId, { name: editName.trim() });
      setEditingId(null);
      setEditName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Add Form */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">افزودن دسته‌بندی جدید</h3>
        <div className="flex gap-2">
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="نام دسته‌بندی" className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
          <select value={newParent} onChange={e => setNewParent(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none">
            <option value="">دسته اصلی</option>
            {rootCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button onClick={handleAdd} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">
            افزودن
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {rootCats.map(cat => {
          const children = categories.filter(c => c.parentId === cat.id);
          const isEditing = editingId === cat.id;
          return (
            <div key={cat.id} className="border-b border-gray-100 last:border-0">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-2 h-2 rounded-full ${cat.active ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="px-2 py-1 bg-white border border-emerald-500 rounded text-xs outline-none flex-1"
                        autoFocus
                      />
                      <button onClick={handleSaveEdit} className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px]">ذخیره</button>
                      <button onClick={handleCancelEdit} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-[10px]">انصراف</button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                      <span className="text-[10px] text-gray-400">({cat.adCount.toLocaleString('fa-IR')} آگهی)</span>
                    </>
                  )}
                </div>
                {!isEditing && (
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(cat.id, cat.name)} className="p-1.5 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600">
                      <Icons.Edit size={12} />
                    </button>
                    <button onClick={() => toggleCategoryActive(cat.id)} className={`px-2 py-1 rounded text-[10px] font-medium ${cat.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {cat.active ? 'فعال' : 'غیرفعال'}
                    </button>
                    <button onClick={() => deleteCategory(cat.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600">
                      <Icons.Trash size={12} />
                    </button>
                  </div>
                )}
              </div>
              {children.length > 0 && (
                <div className="bg-gray-50/50 px-6 py-2 border-t border-gray-50">
                  {children.map(child => {
                    const isChildEditing = editingId === child.id;
                    return (
                      <div key={child.id} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center gap-2 flex-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${child.active ? 'bg-emerald-400' : 'bg-gray-300'}`}></div>
                          {isChildEditing ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                className="px-2 py-1 bg-white border border-emerald-500 rounded text-xs outline-none flex-1"
                                autoFocus
                              />
                              <button onClick={handleSaveEdit} className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px]">ذخیره</button>
                              <button onClick={handleCancelEdit} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-[10px]">انصراف</button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-600">{child.name}</span>
                          )}
                        </div>
                        {!isChildEditing && (
                          <div className="flex gap-1">
                            <button onClick={() => handleEdit(child.id, child.name)} className="text-[10px] text-gray-400 hover:text-blue-600">
                              <Icons.Edit size={10} />
                            </button>
                            <button onClick={() => toggleCategoryActive(child.id)} className="text-[10px] text-gray-500 hover:text-emerald-600">
                              {child.active ? 'غیرفعال' : 'فعال'}
                            </button>
                            <button onClick={() => deleteCategory(child.id)} className="text-[10px] text-gray-400 hover:text-red-600">
                              <Icons.Trash size={10} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==================== FINANCE MANAGER ==================== */
function FinanceManager() {
  const { transactions } = useApp();
  const total = transactions.filter(t => t.status === 'completed').reduce((s, t) => s + t.amount, 0);
  const pending = transactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Icons.DollarSign size={18} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-black text-gray-900">{total.toLocaleString('fa-IR')}</div>
              <div className="text-[10px] text-gray-500">درآمد کل (تومان)</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Icons.Clock size={18} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-black text-gray-900">{pending.toLocaleString('fa-IR')}</div>
              <div className="text-[10px] text-gray-500">در انتظار (تومان)</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Icons.Activity size={18} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-black text-gray-900">{transactions.length.toLocaleString('fa-IR')}</div>
              <div className="text-[10px] text-gray-500">کل تراکنش‌ها</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-sm">تراکنش‌ها</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">شناسه</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">کاربر</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">نوع</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">مبلغ</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">وضعیت</th>
                <th className="text-right px-3 py-2.5 font-medium text-gray-500">تاریخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 font-mono text-gray-500">{tx.id}</td>
                  <td className="px-3 py-2.5 text-gray-700">{tx.userName}</td>
                  <td className="px-3 py-2.5 text-gray-600">{tx.type === 'featured_ad' ? 'آگهی ویژه' : tx.type === 'subscription' ? 'اشتراک' : 'بازگشت وجه'}</td>
                  <td className="px-3 py-2.5 font-medium text-gray-800">{tx.amount.toLocaleString('fa-IR')} ت</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      tx.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : tx.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>{tx.status === 'completed' ? 'موفق' : tx.status === 'pending' ? 'در انتظار' : 'ناموفق'}</span>
                  </td>
                  <td className="px-3 py-2.5 text-gray-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==================== NOTIFICATIONS MANAGER ==================== */
function NotificationsManager() {
  const { notifications, markNotificationRead, clearAllNotifications, addNotification } = useApp();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success' | 'system'>('info');

  const handleSend = () => {
    if (!title.trim()) return;
    addNotification(title, message, type);
    setTitle('');
    setMessage('');
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Send Notification */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">ارسال اعلان عمومی</h3>
        <div className="space-y-2">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان اعلان" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="متن اعلان..." rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500 resize-none" />
          <div className="flex gap-2">
            <select value={type} onChange={e => setType(e.target.value as any)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none">
              <option value="info">اطلاع‌رسانی</option>
              <option value="warning">هشدار</option>
              <option value="success">موفقیت</option>
              <option value="system">سیستمی</option>
            </select>
            <button onClick={handleSend} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">
              ارسال اعلان
            </button>
            <button onClick={clearAllNotifications} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 mr-auto">
              پاک کردن همه
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm">اعلان‌ها ({notifications.length})</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {notifications.map(n => (
            <div key={n.id} className={`p-3 flex items-start gap-3 ${!n.read ? 'bg-blue-50/30' : ''}`}>
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                n.type === 'warning' ? 'bg-amber-500' : n.type === 'success' ? 'bg-emerald-500' : n.type === 'system' ? 'bg-gray-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-800">{n.title}</p>
                  {!n.read && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>}
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-[9px] text-gray-400 mt-1">{n.createdAt}</p>
              </div>
              {!n.read && (
                <button onClick={() => markNotificationRead(n.id)} className="text-[10px] text-blue-600 hover:underline flex-shrink-0">
                  خوانده شد
                </button>
              )}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-xs">اعلانی وجود ندارد</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==================== SETTINGS MANAGER ==================== */
function SettingsManager() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 text-sm">تنظیمات عمومی سایت</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] text-gray-600 mb-1 block">نام سایت</label>
            <input value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[11px] text-gray-600 mb-1 block">ایمیل پشتیبانی</label>
            <input value={form.supportEmail} onChange={e => setForm({ ...form, supportEmail: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" dir="ltr" />
          </div>
          <div>
            <label className="text-[11px] text-gray-600 mb-1 block">تلفن پشتیبانی</label>
            <input value={form.supportPhone} onChange={e => setForm({ ...form, supportPhone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[11px] text-gray-600 mb-1 block">حداکثر آگهی هر کاربر</label>
            <input type="number" value={form.maxAdsPerUser} onChange={e => setForm({ ...form, maxAdsPerUser: +e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[11px] text-gray-600 mb-1 block">مدت انقضای آگهی (روز)</label>
            <input type="number" value={form.adExpiryDays} onChange={e => setForm({ ...form, adExpiryDays: +e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[11px] text-gray-600 mb-1 block">قیمت آگهی ویژه (تومان)</label>
            <input type="number" value={form.featuredAdPrice} onChange={e => setForm({ ...form, featuredAdPrice: +e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-500" />
          </div>
        </div>

        {/* Toggles */}
        <div className="mt-5 space-y-3">
          {[
            { key: 'maintenanceMode' as const, label: 'حالت تعمیر و نگهداری', desc: 'سایت برای کاربران عادی غیرقابل دسترس می‌شود' },
            { key: 'registrationOpen' as const, label: 'ثبت‌نام باز', desc: 'کاربران جدید می‌توانند ثبت‌نام کنند' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs font-medium text-gray-800">{item.label}</p>
                <p className="text-[10px] text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setForm({ ...form, [item.key]: !form[item.key] })}
                className={`w-10 h-5 rounded-full relative transition-colors ${form[item.key] ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form[item.key] ? 'right-0.5' : 'right-5'}`}></div>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button onClick={handleSave} className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">
            ذخیره تغییرات
          </button>
          {saved && (
            <span className="text-xs text-emerald-600 flex items-center gap-1 animate-fadeIn">
              <Icons.Check size={12} />
              تنظیمات ذخیره شد
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
