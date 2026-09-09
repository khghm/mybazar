import { createContext, useContext, useState, ReactNode } from 'react';
import { Ad, mockAds, chatConversations } from '../data/mockData';

// ===== Types =====
export type AdStatus = 'active' | 'pending' | 'rejected' | 'expired' | 'sold';
export type UserStatus = 'active' | 'blocked' | 'suspended';
export type UserLevel = 'guest' | 'verified' | 'trusted';
export type ReportStatus = 'pending' | 'reviewed' | 'dismissed';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  status: UserStatus;
  level: UserLevel;
  rating: number;
  totalReviews: number;
  adsCount: number;
  joinDate: string;
  lastActive: string;
  nationalVerified: boolean;
}

export interface Report {
  id: string;
  adId: string;
  adTitle: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'featured_ad' | 'subscription' | 'refund';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'system';
  createdAt: string;
  read: boolean;
}

export interface SiteSettings {
  siteName: string;
  maintenanceMode: boolean;
  registrationOpen: boolean;
  maxAdsPerUser: number;
  adExpiryDays: number;
  featuredAdPrice: number;
  supportEmail: string;
  supportPhone: string;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  icon: string;
  adCount: number;
  active: boolean;
}

// ===== Initial Data =====
const initialUsers: User[] = [
  { id: 'u1', name: 'علی محمدی', phone: '۰۹۱۲۱۲۳۴۵۶۷', email: 'ali@mail.com', avatar: 'https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png', status: 'active', level: 'trusted', rating: 4.8, totalReviews: 23, adsCount: 12, joinDate: '۱۴۰۱/۰۷/۱۵', lastActive: '۲ ساعت پیش', nationalVerified: true },
  { id: 'u2', name: 'مشاور املاک آرمان', phone: '۰۹۱۳۹۸۷۶۵۴۳', email: 'arman@mail.com', avatar: 'https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png', status: 'active', level: 'verified', rating: 4.5, totalReviews: 45, adsCount: 45, joinDate: '۱۳۹۹/۰۳/۲۰', lastActive: '۱ ساعت پیش', nationalVerified: true },
  { id: 'u3', name: 'رضا کریمی', phone: '۰۹۱۴۵۵۵۶۶۷۷', email: 'reza@mail.com', avatar: 'https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png', status: 'active', level: 'verified', rating: 4.9, totalReviews: 8, adsCount: 3, joinDate: '۱۴۰۰/۱۱/۰۵', lastActive: '۳ ساعت پیش', nationalVerified: true },
  { id: 'u4', name: 'فروشگاه مبل آریا', phone: '۰۹۱۵۷۷۸۸۹۹۰', email: 'arya@mail.com', avatar: 'https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png', status: 'active', level: 'trusted', rating: 4.7, totalReviews: 67, adsCount: 28, joinDate: '۱۳۹۸/۰۶/۱۰', lastActive: '۳۰ دقیقه پیش', nationalVerified: true },
  { id: 'u5', name: 'حسین نوری', phone: '۰۹۱۶۳۳۴۴۵۵۶', email: 'hossein@mail.com', avatar: 'https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png', status: 'blocked', level: 'guest', rating: 2.1, totalReviews: 3, adsCount: 1, joinDate: '۱۴۰۳/۰۱/۲۰', lastActive: '۱ هفته پیش', nationalVerified: false },
  { id: 'u6', name: 'دیجیتال‌شاپ', phone: '۰۹۱۷۱۱۲۲۳۳۴', email: 'digi@mail.com', avatar: 'https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png', status: 'active', level: 'trusted', rating: 4.6, totalReviews: 89, adsCount: 67, joinDate: '۱۴۰۰/۰۹/۱۲', lastActive: '۵ دقیقه پیش', nationalVerified: true },
];

const initialReports: Report[] = [
  { id: 'r1', adId: '3', adTitle: 'تویوتا کمری ۲۰۲۴ فول', reporterId: 'u2', reporterName: 'مشاور املاک آرمان', reason: 'کلاهبرداری', description: 'قیمت بسیار پایین‌تر از عرف بازار', status: 'pending', createdAt: '۱۴۰۳/۰۹/۱۵' },
  { id: 'r2', adId: '6', adTitle: 'خدمات طراحی سایت حرفه‌ای', reporterId: 'u3', reporterName: 'رضا کریمی', reason: 'محتوای نامناسب', description: 'لینک‌های تبلیغاتی مشکوک در توضیحات', status: 'pending', createdAt: '۱۴۰۳/۰۹/۱۴' },
  { id: 'r3', adId: '1', adTitle: 'آیفون ۱۵ پرو مکس ۲۵۶ گیگابایت', reporterId: 'u4', reporterName: 'فروشگاه مبل آریا', reason: 'آگهی تکراری', description: 'این آگهی قبلاً ثبت شده بود', status: 'reviewed', createdAt: '۱۴۰۳/۰۹/۱۰' },
];

const initialTransactions: Transaction[] = [
  { id: 't1', userId: 'u1', userName: 'علی محمدی', type: 'featured_ad', amount: 15000, status: 'completed', date: '۱۴۰۳/۰۹/۱۵', description: 'ارتقاء آگهی آیفون ۱۵ پرو مکس' },
  { id: 't2', userId: 'u4', userName: 'فروشگاه مبل آریا', type: 'featured_ad', amount: 15000, status: 'completed', date: '۱۴۰۳/۰۹/۱۴', description: 'ارتقاء آگهی مبل ال شکل' },
  { id: 't3', userId: 'u6', userName: 'دیجیتال‌شاپ', type: 'subscription', amount: 250000, status: 'completed', date: '۱۴۰۳/۰۹/۱۲', description: 'اشتراک فروشگاه - ۱ ماهه' },
  { id: 't4', userId: 'u2', userName: 'مشاور املاک آرمان', type: 'featured_ad', amount: 30000, status: 'pending', date: '۱۴۰۳/۰۹/۱۵', description: 'ارتقاء آگهی آپارتمان پونک' },
];

const initialNotifications: Notification[] = [
  { id: 'n1', title: 'آگهی جدید در انتظار بررسی', message: '۳ آگهی جدید نیاز به بررسی دارند', type: 'warning', createdAt: '۱۰ دقیقه پیش', read: false },
  { id: 'n2', title: 'گزارش تخلف جدید', message: 'گزارش کلاهبرداری برای آگهی تویوتا کمری', type: 'warning', createdAt: '۱ ساعت پیش', read: false },
  { id: 'n3', title: 'پرداخت موفق', message: 'اشتراک فروشگاه دیجیتال‌شاپ فعال شد', type: 'success', createdAt: '۳ ساعت پیش', read: true },
];

const initialSettings: SiteSettings = {
  siteName: 'بازارِ من',
  maintenanceMode: false,
  registrationOpen: true,
  maxAdsPerUser: 20,
  adExpiryDays: 60,
  featuredAdPrice: 15000,
  supportEmail: 'support@bazaareman.ir',
  supportPhone: '۰۲۱-۱۲۳۴۵۶۷۸',
};

const initialCategories: Category[] = [
  { id: 'c1', name: 'کالای دیجیتال', parentId: null, icon: 'Package', adCount: 125000, active: true },
  { id: 'c2', name: 'وسایل نقلیه', parentId: null, icon: 'Activity', adCount: 85000, active: true },
  { id: 'c3', name: 'املاک و مسکن', parentId: null, icon: 'Building', adCount: 62000, active: true },
  { id: 'c4', name: 'لوازم خانگی', parentId: null, icon: 'Home', adCount: 98000, active: true },
  { id: 'c5', name: 'خدمات', parentId: null, icon: 'Wrench', adCount: 45000, active: true },
  { id: 'c6', name: 'استخدام و کاریابی', parentId: null, icon: 'Briefcase', adCount: 32000, active: true },
  { id: 'c7', name: 'گوشی موبایل', parentId: 'c1', icon: 'Smartphone', adCount: 45000, active: true },
  { id: 'c8', name: 'لپ‌تاپ', parentId: 'c1', icon: 'Laptop', adCount: 28000, active: true },
  { id: 'c9', name: 'فروش آپارتمان', parentId: 'c3', icon: 'Building', adCount: 35000, active: true },
  { id: 'c10', name: 'اجاره آپارتمان', parentId: 'c3', icon: 'Building', adCount: 27000, active: true },
];

// ===== Context =====
interface AppContextType {
  // Data
  ads: Ad[];
  users: User[];
  reports: Report[];
  transactions: Transaction[];
  notifications: Notification[];
  settings: SiteSettings;
  categories: Category[];
  chats: typeof chatConversations;

  // Ad operations
  deleteAd: (id: string) => void;
  updateAdStatus: (id: string, status: AdStatus) => void;
  toggleAdFeatured: (id: string) => void;
  updateAd: (id: string, data: Partial<Ad>) => void;

  // User operations
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
  updateUserLevel: (id: string, level: UserLevel) => void;

  // Report operations
  reviewReport: (id: string, action: 'reject_ad' | 'dismiss') => void;

  // Notification operations
  addNotification: (title: string, message: string, type: Notification['type']) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Category operations
  addCategory: (name: string, parentId: string | null) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryActive: (id: string) => void;

  // Settings operations
  updateSettings: (data: Partial<SiteSettings>) => void;

  // Stats
  getStats: () => {
    totalAds: number;
    activeAds: number;
    pendingAds: number;
    totalUsers: number;
    activeUsers: number;
    blockedUsers: number;
    pendingReports: number;
    totalRevenue: number;
    todayRevenue: number;
  };
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ads, setAds] = useState<Ad[]>(mockAds);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [chats] = useState(chatConversations);

  // ===== Ad Operations =====
  const deleteAd = (id: string) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
    addNotification('آگهی حذف شد', `آگهی با شناسه ${id} توسط مدیر حذف شد`, 'system');
  };

  const updateAdStatus = (id: string, status: AdStatus) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: status as any } : ad));
    const statusLabels: Record<AdStatus, string> = {
      active: 'فعال', pending: 'در انتظار بررسی', rejected: 'رد شده', expired: 'منقضی', sold: 'فروخته شده'
    };
    addNotification('تغییر وضعیت آگهی', `وضعیت آگهی ${id} به "${statusLabels[status]}" تغییر کرد`, 'info');
  };

  const toggleAdFeatured = (id: string) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, featured: !ad.featured } : ad));
  };

  const updateAd = (id: string, data: Partial<Ad>) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, ...data } : ad));
  };

  // ===== User Operations =====
  const blockUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'blocked' as UserStatus } : u));
    // Also deactivate their ads
    setAds(prev => prev.map(ad => ad.seller.name === users.find(u => u.id === id)?.name
      ? { ...ad, status: 'rejected' as any } : ad));
    addNotification('کاربر مسدود شد', `کاربر ${users.find(u => u.id === id)?.name} مسدود شد`, 'warning');
  };

  const unblockUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active' as UserStatus } : u));
    addNotification('کاربر فعال شد', `کاربر ${users.find(u => u.id === id)?.name} دوباره فعال شد`, 'success');
  };

  const updateUserLevel = (id: string, level: UserLevel) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, level } : u));
  };

  // ===== Report Operations =====
  const reviewReport = (id: string, action: 'reject_ad' | 'dismiss') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'reviewed' as ReportStatus } : r));
    if (action === 'reject_ad') {
      const report = reports.find(r => r.id === id);
      if (report) {
        updateAdStatus(report.adId, 'rejected');
      }
      addNotification('گزارش بررسی شد', 'آگهی مربوطه رد شد', 'warning');
    } else {
      addNotification('گزارش رد شد', 'گزارش بدون اقدام بسته شد', 'info');
    }
  };

  // ===== Notification Operations =====
  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: `n${Date.now()}`,
      title,
      message,
      type,
      createdAt: 'همین الان',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // ===== Category Operations =====
  const addCategory = (name: string, parentId: string | null) => {
    const newCat: Category = {
      id: `c${Date.now()}`,
      name,
      parentId,
      icon: 'Tag',
      adCount: 0,
      active: true,
    };
    setCategories(prev => [...prev, newCat]);
    addNotification('دسته‌بندی جدید', `دسته‌بندی "${name}" اضافه شد`, 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    // Also remove children
    setCategories(prev => prev.filter(c => c.parentId !== id));
  };

  const toggleCategoryActive = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  // ===== Settings Operations =====
  const updateSettings = (data: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...data }));
    addNotification('تنظیمات به‌روزرسانی شد', 'تنظیمات سایت با موفقیت ذخیره شد', 'success');
  };

  // ===== Stats =====
  const getStats = () => ({
    totalAds: ads.length,
    activeAds: ads.filter(a => (a as any).status !== 'rejected' && (a as any).status !== 'expired').length,
    pendingAds: ads.filter(a => (a as any).status === 'pending').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    blockedUsers: users.filter(u => u.status === 'blocked').length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    totalRevenue: transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
    todayRevenue: transactions.filter(t => t.status === 'completed' && t.date.includes('۱۵')).reduce((sum, t) => sum + t.amount, 0),
  });

  return (
    <AppContext.Provider value={{
      ads, users, reports, transactions, notifications, settings, categories, chats,
      deleteAd, updateAdStatus, toggleAdFeatured, updateAd,
      blockUser, unblockUser, updateUserLevel,
      reviewReport,
      addNotification, markNotificationRead, clearAllNotifications,
      addCategory, deleteCategory, toggleCategoryActive,
      updateSettings,
      getStats,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
