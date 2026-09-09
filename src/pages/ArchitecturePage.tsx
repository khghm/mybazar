import { useState } from 'react';
import { Page } from '../App';

interface ArchitecturePageProps {
  navigate: (page: Page) => void;
}

export default function ArchitecturePage({ navigate }: ArchitecturePageProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'نمای کلی', icon: '🏗️' },
    { id: 'data', label: 'مدلسازی داده', icon: '🗄️' },
    { id: 'components', label: 'مؤلفه‌ها', icon: '⚙️' },
    { id: 'wireframes', label: 'وایرفریم', icon: '📐' },
    { id: 'phases', label: 'فازبندی', icon: '📅' },
    { id: 'security', label: 'امنیت', icon: '🔒' },
    { id: 'scale', label: 'مقیاس‌پذیری', icon: '📈' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">📋 سند معماری جامع «بازارِ من»</h1>
        <p className="text-gray-500">مستندات فنی و معماری سیستم — نسخه ۱.۰</p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSection === s.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🏗️ نمای کلی معماری
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                پلتفرم «بازارِ من» یک سیستم غیرمتمرکز بازار آنلاین است که بر پایه معماری میکروسرویس و رویدادمحور طراحی شده.
                این سیستم قادر به مدیریت میلیون‌ها آگهی و کاربر همزمان بوده و از ترکیب پایگاه‌داده‌های SQL و NoSQL برای بهینه‌سازی عملکرد استفاده می‌کند.
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="font-bold text-gray-800 mb-6 text-center">🔀 دیاگرام معماری کلی سیستم</h3>
              <div className="space-y-6">
                {/* Client Layer */}
                <div className="bg-blue-100 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-bold text-blue-800 text-sm mb-2">🖥️ لایه کلاینت (Client Layer)</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Web App (React)', 'PWA', 'Mobile App (React Native)', 'Admin Panel'].map((item) => (
                      <span key={item} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-lg text-xs font-medium">{item}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center text-2xl text-gray-400">↕️</div>

                {/* API Gateway */}
                <div className="bg-emerald-100 rounded-xl p-4 border border-emerald-200">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2">🚪 API Gateway & Load Balancer</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Nginx', 'Rate Limiting', 'SSL Termination', 'Authentication', 'WebSocket Hub'].map((item) => (
                      <span key={item} className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-lg text-xs font-medium">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="text-center text-2xl text-gray-400">↕️</div>

                {/* Microservices */}
                <div className="bg-purple-100 rounded-xl p-4 border border-purple-200">
                  <h4 className="font-bold text-purple-800 text-sm mb-2">⚙️ میکروسرویس‌ها (Microservices)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      'User Service', 'Ad Service', 'Search Service', 'Chat Service',
                      'Payment Service', 'Notification Service', 'Media Service', 'Analytics Service'
                    ].map((item) => (
                      <span key={item} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-lg text-xs font-medium text-center">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="text-center text-2xl text-gray-400">↕️</div>

                {/* Data Layer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-100 rounded-xl p-4 border border-amber-200">
                    <h4 className="font-bold text-amber-800 text-sm mb-2">🗄️ لایه داده (Data Layer)</h4>
                    <div className="space-y-1">
                      {['PostgreSQL (Users, Transactions)', 'MongoDB (Ads, History)', 'Elasticsearch (Search Index)', 'Redis (Cache, Sessions)', 'S3/CDN (Media)'].map((item) => (
                        <span key={item} className="block px-3 py-1 bg-amber-200 text-amber-800 rounded-lg text-xs font-medium">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-orange-100 rounded-xl p-4 border border-orange-200">
                    <h4 className="font-bold text-orange-800 text-sm mb-2">📨 لایه پیام (Message Layer)</h4>
                    <div className="space-y-1">
                      {['RabbitMQ / Kafka', 'Push Notifications', 'Email Queue', 'SMS Gateway', 'Event Bus'].map((item) => (
                        <span key={item} className="block px-3 py-1 bg-orange-200 text-orange-800 rounded-lg text-xs font-medium">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '🔄', title: 'Event-Driven', desc: 'ارتباط بین سرویس‌ها از طریق صف پیام و رویدادها' },
                { icon: '📦', title: 'Domain-Driven', desc: 'تفکیک دامنه‌ها: کاربران، آگهی‌ها، معاملات، چت' },
                { icon: '🌐', title: 'Cloud-Native', desc: 'استقرار روی Kubernetes با Auto-Scaling' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Modeling */}
        {activeSection === 'data' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🗄️ مدلسازی داده</h2>
            
            {/* ER Diagram */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">📊 نمودار موجودیت-رابطه (ER Diagram)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Users */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
                  <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-t-lg -mx-4 -mt-4 mb-3">👤 Users</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-blue-600 font-mono">🔑 id</span><span className="text-gray-500">UUID</span></div>
                    <div className="flex justify-between"><span className="font-mono">phone</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">email</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">name</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">level</span><span className="text-gray-500">ENUM</span></div>
                    <div className="flex justify-between"><span className="font-mono">national_id_hash</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">rating</span><span className="text-gray-500">DECIMAL</span></div>
                    <div className="flex justify-between"><span className="font-mono">created_at</span><span className="text-gray-500">TIMESTAMP</span></div>
                  </div>
                </div>

                {/* Ads */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-200">
                  <div className="bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-t-lg -mx-4 -mt-4 mb-3">📦 Ads</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-emerald-600 font-mono">🔑 id</span><span className="text-gray-500">UUID</span></div>
                    <div className="flex justify-between"><span className="text-emerald-600 font-mono">🔗 user_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="text-emerald-600 font-mono">🔗 category_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="font-mono">title</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">description</span><span className="text-gray-500">TEXT</span></div>
                    <div className="flex justify-between"><span className="font-mono">price</span><span className="text-gray-500">BIGINT</span></div>
                    <div className="flex justify-between"><span className="font-mono">location</span><span className="text-gray-500">GEO_POINT</span></div>
                    <div className="flex justify-between"><span className="font-mono">status</span><span className="text-gray-500">ENUM</span></div>
                    <div className="flex justify-between"><span className="font-mono">content_hash</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">expires_at</span><span className="text-gray-500">TIMESTAMP</span></div>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-200">
                  <div className="bg-purple-500 text-white text-sm font-bold px-3 py-1 rounded-t-lg -mx-4 -mt-4 mb-3">📋 Categories</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-purple-600 font-mono">🔑 id</span><span className="text-gray-500">INT</span></div>
                    <div className="flex justify-between"><span className="text-purple-600 font-mono">🔗 parent_id</span><span className="text-gray-500">FK (self)</span></div>
                    <div className="flex justify-between"><span className="font-mono">name</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">slug</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">attributes</span><span className="text-gray-500">JSONB</span></div>
                    <div className="flex justify-between"><span className="font-mono">level</span><span className="text-gray-500">INT</span></div>
                    <div className="flex justify-between"><span className="font-mono">sort_order</span><span className="text-gray-500">INT</span></div>
                  </div>
                </div>
              </div>

              {/* Relationships */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-200">
                  <div className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-t-lg -mx-4 -mt-4 mb-3">💬 Messages</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-orange-600 font-mono">🔑 id</span><span className="text-gray-500">UUID</span></div>
                    <div className="flex justify-between"><span className="text-orange-600 font-mono">🔗 sender_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="text-orange-600 font-mono">🔗 receiver_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="text-orange-600 font-mono">🔗 ad_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="font-mono">content</span><span className="text-gray-500">TEXT</span></div>
                    <div className="flex justify-between"><span className="font-mono">media_url</span><span className="text-gray-500">VARCHAR</span></div>
                    <div className="flex justify-between"><span className="font-mono">is_read</span><span className="text-gray-500">BOOLEAN</span></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200">
                  <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-t-lg -mx-4 -mt-4 mb-3">⭐ Reviews</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-red-600 font-mono">🔑 id</span><span className="text-gray-500">UUID</span></div>
                    <div className="flex justify-between"><span className="text-red-600 font-mono">🔗 reviewer_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="text-red-600 font-mono">🔗 reviewee_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="text-red-600 font-mono">🔗 ad_id</span><span className="text-gray-500">FK</span></div>
                    <div className="flex justify-between"><span className="font-mono">rating</span><span className="text-gray-500">INT (1-5)</span></div>
                    <div className="flex justify-between"><span className="font-mono">comment</span><span className="text-gray-500">TEXT</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Taxonomy */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="font-bold text-emerald-800 mb-4">🌳 درخت دسته‌بندی پویا (Dynamic Taxonomy)</h3>
              <div className="font-mono text-sm text-emerald-700 space-y-1 bg-white rounded-xl p-4">
                <div>├── 📦 کالاهای فیزیکی</div>
                <div>│   ├── 📱 موبایل → [برند, مدل, حافظه, رنگ, وضعیت]</div>
                <div>│   ├── 🚗 خودرو → [برند, مدل, سال, کارکرد, سوخت, رنگ]</div>
                <div>│   ├── 💻 لپ‌تاپ → [برند, CPU, RAM, GPU, حافظه]</div>
                <div>│   └── 📚 کتاب → [نویسنده, ناشر, سال چاپ, شابک]</div>
                <div>├── 🏠 املاک</div>
                <div>│   ├── 🏢 آپارتمان → [متراژ, اتاق, طبقه, سن بنا]</div>
                <div>│   ├── 🏡 ویلا → [متراژ, زمین, امکانات, فاصله دریا]</div>
                <div>│   └── 🏗️ زمین → [متراژ, کاربری, سند]</div>
                <div>├── 🔧 خدمات</div>
                <div>│   ├── 🎓 تدریس → [درس, مقطع, حضوری/آنلاین]</div>
                <div>│   ├── 🔨 تعمیرات → [نوع, محدوده, ضمانت]</div>
                <div>│   └── 🚚 حمل‌ونقل → [نوع خودرو, محدوده]</div>
                <div>└── 💼 استخدام</div>
                <div>    ├── 💻 فناوری → [عنوان, سابقه, مهارت‌ها]</div>
                <div>    └── 📊 مالی → [عنوان, مدرک, نرم‌افزار]</div>
              </div>
            </div>
          </div>
        )}

        {/* Components */}
        {activeSection === 'components' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">⚙️ دیاگرام مؤلفه‌ها</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'سرویس کاربران (User Service)',
                  icon: '👤',
                  color: 'blue',
                  items: ['ثبت‌نام و ورود (OTP + Email)', 'احراز هویت دو مرحله‌ای', 'مدیریت پروفایل و سطح کاربری', 'احراز هویت ملی (KYC)', 'مدیریت جلسات (JWT + Refresh Token)']
                },
                {
                  title: 'سرویس آگهی (Ad Service)',
                  icon: '📦',
                  color: 'emerald',
                  items: ['CRUD آگهی با درخت دسته‌بندی پویا', 'تشخیص آگهی تکراری (Content Hash + Image Hash)', 'پیشنهاد قیمت هوشمند', 'مدیریت وضعیت و انقضا', 'سیستم آگهی ویژه و ارتقاء']
                },
                {
                  title: 'سرویس جستجو (Search Service)',
                  icon: '🔍',
                  color: 'purple',
                  items: ['Elasticsearch برای ایندکس‌گذاری', 'Fuzzy Search (تایپو و املای مشابه)', 'فیلترهای ترکیبی پیشرفته', 'جستجوی جغرافیایی معکوس', 'بازنمایی خودکار ایندکس']
                },
                {
                  title: 'سرویس چت (Chat Service)',
                  icon: '💬',
                  color: 'orange',
                  items: ['WebSocket برای ارتباط لحظه‌ای', 'ارسال تصویر و موقعیت مکانی', 'مخفی‌سازی شماره تماس', 'VoIP داخلی (اختیاری)', 'تاریخچه و آرشیو پیام‌ها']
                },
                {
                  title: 'سرویس پرداخت (Payment Service)',
                  icon: '💳',
                  color: 'amber',
                  items: ['اتصال به درگاه‌های بانکی', 'مدیریت تراکنش‌های مالی', 'سیستم کیف پول داخلی', 'فاکتور و رسید', 'بازگشت وجه']
                },
                {
                  title: 'سرویس اعلان (Notification Service)',
                  icon: '🔔',
                  color: 'red',
                  items: ['Push Notification (FCM/APNs)', 'ارسال پیامک (SMS Gateway)', 'ارسال ایمیل', 'صف‌بندی رویدادها (Kafka)', 'هشدار قیمت و آگهی جدید']
                },
                {
                  title: 'سرویس رسانه (Media Service)',
                  icon: '📸',
                  color: 'teal',
                  items: ['آپلود و فشرده‌سازی تصاویر', 'استخراج تگ ALT با AI', 'تشخیص محتوای نامناسب', 'ذخیره در S3 + CDN', 'تولید Thumbnail']
                },
                {
                  title: 'سرویس تحلیل (Analytics Service)',
                  icon: '📊',
                  color: 'indigo',
                  items: ['آمار بازدید آگهی', 'تحلیل رفتار کاربران', 'گزارش‌های مدیریتی', 'پیشنهاد هوشمند', 'A/B Testing']
                },
              ].map((comp, i) => (
                <div key={i} className={`bg-${comp.color}-50 rounded-xl p-5 border border-${comp.color}-200`}>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-xl">{comp.icon}</span>
                    {comp.title}
                  </h3>
                  <ul className="space-y-2">
                    {comp.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wireframes */}
        {activeSection === 'wireframes' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📐 وایرفریم کلیدی</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Wireframe */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                <h4 className="font-bold text-gray-700 text-sm mb-3">🏠 صفحه اصلی</h4>
                <div className="space-y-2">
                  <div className="h-8 bg-emerald-100 rounded flex items-center justify-center text-xs text-emerald-700">Navigation Bar</div>
                  <div className="h-24 bg-gradient-to-r from-emerald-200 to-teal-200 rounded flex items-center justify-center text-xs text-emerald-800">Hero + Search Bar</div>
                  <div className="grid grid-cols-4 gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="h-12 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">Cat {i}</div>)}
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="h-20 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">Ad {i}</div>)}
                  </div>
                  <div className="h-6 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Footer</div>
                </div>
              </div>

              {/* Search Wireframe */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                <h4 className="font-bold text-gray-700 text-sm mb-3">🔍 صفحه جستجو</h4>
                <div className="space-y-2">
                  <div className="h-8 bg-emerald-100 rounded flex items-center justify-center text-xs text-emerald-700">Navigation Bar</div>
                  <div className="h-10 bg-gray-100 rounded flex items-center px-2 text-xs text-gray-500">Search Input + Filters</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-6 bg-blue-50 rounded-full flex-1 text-xs flex items-center justify-center text-blue-600">Tag</div>)}
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/4 space-y-1">
                      <div className="h-6 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">Filter</div>
                      <div className="h-6 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">Price</div>
                      <div className="h-6 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">City</div>
                      <div className="h-6 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">Status</div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-1">
                      {[1,2,3,4].map(i => <div key={i} className="h-16 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500">Ad {i}</div>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Ad Wireframe */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                <h4 className="font-bold text-gray-700 text-sm mb-3">➕ درج آگهی (Stepper)</h4>
                <div className="space-y-2">
                  <div className="h-8 bg-emerald-100 rounded flex items-center justify-center text-xs text-emerald-700">Navigation Bar</div>
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className={`h-8 rounded flex-1 flex items-center justify-center text-xs ${i <= 2 ? 'bg-emerald-200 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>Step {i}</div>)}
                  </div>
                  <div className="h-8 bg-gray-100 rounded text-xs flex items-center px-2 text-gray-500">Title Input</div>
                  <div className="h-16 bg-gray-100 rounded text-xs flex items-center px-2 text-gray-500">Description Textarea</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-8 bg-gray-100 rounded text-xs flex items-center px-2 text-gray-500">Price</div>
                    <div className="h-8 bg-gray-100 rounded text-xs flex items-center px-2 text-gray-500">City</div>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded flex-1 text-xs flex items-center justify-center text-gray-500">📷</div>)}
                    <div className="h-12 bg-emerald-50 rounded flex-1 text-xs flex items-center justify-center text-emerald-600 border border-dashed border-emerald-300">+</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-8 bg-gray-200 rounded flex-1 text-xs flex items-center justify-center text-gray-600">← Back</div>
                    <div className="h-8 bg-emerald-500 rounded flex-1 text-xs flex items-center justify-center text-white">Next →</div>
                  </div>
                </div>
              </div>

              {/* Chat Wireframe */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                <h4 className="font-bold text-gray-700 text-sm mb-3">💬 چت داخلی</h4>
                <div className="space-y-2">
                  <div className="h-8 bg-emerald-100 rounded flex items-center justify-center text-xs text-emerald-700">Navigation Bar</div>
                  <div className="flex gap-2 h-48">
                    <div className="w-1/3 border border-gray-200 rounded overflow-hidden">
                      <div className="h-6 bg-gray-50 text-xs flex items-center px-1 text-gray-500">Search</div>
                      {[1,2,3,4].map(i => <div key={i} className="h-8 border-b border-gray-100 text-xs flex items-center px-1 text-gray-500">User {i}</div>)}
                    </div>
                    <div className="flex-1 border border-gray-200 rounded flex flex-col">
                      <div className="h-6 bg-gray-50 text-xs flex items-center px-1 text-gray-500">Chat Header</div>
                      <div className="flex-1 p-1 space-y-1">
                        <div className="h-4 bg-blue-100 rounded w-2/3 self-start text-xs flex items-center px-1 text-blue-700">Msg</div>
                        <div className="h-4 bg-emerald-100 rounded w-1/2 self-end mr-auto text-xs flex items-center px-1 text-emerald-700">Msg</div>
                        <div className="h-4 bg-blue-100 rounded w-3/4 self-start text-xs flex items-center px-1 text-blue-700">Msg</div>
                      </div>
                      <div className="h-6 bg-gray-50 text-xs flex items-center px-1 text-gray-500">Input + Send</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phases */}
        {activeSection === 'phases' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 برنامه فازبندی پروژه</h2>
            
            <div className="space-y-6">
              {[
                {
                  phase: 'فاز ۱',
                  title: 'MVP (Minimum Viable Product)',
                  duration: '۳ ماه',
                  color: 'emerald',
                  items: ['ثبت‌نام و احراز هویت پایه (OTP)', 'درج آگهی ساده با دسته‌بندی ثابت', 'جستجوی پایه با فیلترهای اصلی', 'نمایش آگهی و جزئیات', 'سیستم گزارش تخلف ساده']
                },
                {
                  phase: 'فاز ۲',
                  title: 'تعاملات و اعتماد',
                  duration: '۲ ماه',
                  color: 'blue',
                  items: ['چت داخلی با WebSocket', 'سیستم امتیازدهی و نظرات', 'سطح‌بندی کاربران', 'نمایش شماره با رضایت طرفین', 'تشخیص آگهی تکراری']
                },
                {
                  phase: 'فاز ۳',
                  title: 'هوشمندی و جستجوی پیشرفته',
                  duration: '۲ ماه',
                  color: 'purple',
                  items: ['Elasticsearch و Fuzzy Search', 'پیشنهاد قیمت هوشمند', 'درخت دسته‌بندی پویا', 'جستجوی جغرافیایی', 'هشدار قیمت']
                },
                {
                  phase: 'فاز ۴',
                  title: 'مقیاس‌پذیری و بهینه‌سازی',
                  duration: '۲ ماه',
                  color: 'amber',
                  items: ['معماری میکروسرویس کامل', 'CDN و ذخیره‌سازی ابری', 'صف پیام (Kafka)', 'Auto-Scaling', 'بهینه‌سازی عملکرد']
                },
                {
                  phase: 'فاز ۵',
                  title: 'ماژول‌های پیشرفته',
                  duration: '۲ ماه',
                  color: 'red',
                  items: ['نقشه و خوشه‌بندی', 'آگهی ویژه و پرداخت', 'VoIP داخلی', 'اپلود هوشمند تصاویر با AI', 'اپلیکیشن موبایل']
                },
                {
                  phase: 'فاز ۶',
                  title: 'بلوغ و توسعه',
                  duration: 'ادامه‌دار',
                  color: 'teal',
                  items: ['مدل‌های ML برای تشخیص محتوا', 'تحلیل داده و داشبورد مدیریتی', 'API عمومی برای توسعه‌دهندگان', 'بین‌المللی‌سازی', 'بهینه‌سازی مداوم']
                },
              ].map((phase, i) => (
                <div key={i} className={`bg-${phase.color}-50 rounded-xl p-6 border border-${phase.color}-200`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`bg-${phase.color}-500 text-white px-3 py-1 rounded-full text-sm font-bold`}>{phase.phase}</span>
                      <h3 className="font-bold text-gray-800">{phase.title}</h3>
                    </div>
                    <span className={`text-sm font-medium text-${phase.color}-600`}>⏱️ {phase.duration}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">📊 خط زمانی کلی (۱۱ ماه تا نسخه کامل)</h3>
              <div className="relative">
                <div className="absolute top-4 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
                <div className="absolute top-4 left-0 h-2 bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                <div className="flex justify-between relative">
                  {['MVP', 'تعاملات', 'هوشمندی', 'مقیاس', 'پیشرفته', 'بلوغ'].map((label, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow mt-2"></div>
                      <span className="text-xs text-gray-600 mt-2">{label}</span>
                      <span className="text-xs text-gray-400">ماه {i * 2 + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        {activeSection === 'security' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔒 معماری امنیتی</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="font-bold text-red-800 mb-4">🛡️ احراز هویت و مجوزها</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• JWT + Refresh Token با زمان انقضای کوتاه</li>
                  <li>• OTP دو مرحله‌ای (SMS + Email)</li>
                  <li>• Rate Limiting برای جلوگیری از Brute Force</li>
                  <li>• CSRF Protection و XSS Prevention</li>
                  <li>• RBAC (Role-Based Access Control)</li>
                  <li>• Session Management با Redis</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4">🔐 رمزنگاری داده‌ها</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• رمزنگاری AES-256 برای داده‌های حساس</li>
                  <li>• Hashing با bcrypt برای رمز عبور</li>
                  <li>• TLS 1.3 برای ارتباطات</li>
                  <li>• رمزنگاری شماره تماس در پایگاه داده</li>
                  <li>• امضای دیجیتال برای تراکنش‌ها</li>
                  <li>• Key Rotation خودکار</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-4">📋 حریم خصوصی (GDPR)</h3>
                <ul className="space-y-2 text-sm text-emerald-700">
                  <li>• حق دسترسی به داده‌ها</li>
                  <li>• حق اصلاح و به‌روزرسانی</li>
                  <li>• حق حذف کامل (Right to be Forgotten)</li>
                  <li>• عدم ذخیره بدون رضایت</li>
                  <li>• Cookie Consent Management</li>
                  <li>• Data Portability (خروجی JSON)</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-4">🚫 جلوگیری از تخلف</h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Content Hashing برای تشخیص تکرار</li>
                  <li>• Image Similarity Detection (pHash)</li>
                  <li>• فیلتر کلمات سیاه‌لیست</li>
                  <li>• ML Model برای تشخیص محتوای نامناسب</li>
                  <li>• Captcha برای فرم‌های حساس</li>
                  <li>• IP Fingerprinting و Device Fingerprint</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Scalability */}
        {activeSection === 'scale' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 استراتژی مقیاس‌پذیری</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">🎯 اهداف عملکردی</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Response Time', value: '< 200ms', icon: '⚡' },
                    { label: 'Concurrent Users', value: '1M+', icon: '👥' },
                    { label: 'Ads Indexed', value: '10M+', icon: '📦' },
                    { label: 'Uptime', value: '99.99%', icon: '🟢' },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="font-bold text-gray-800">{item.value}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-4">🏗️ استراتژی‌های مقیاس‌پذیری</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Horizontal Scaling', desc: 'افزودن سرورهای بیشتر با Kubernetes HPA' },
                    { title: 'Database Sharding', desc: 'تقسیم پایگاه داده بر اساس جغرافیا' },
                    { title: 'Read Replicas', desc: 'نسخه‌های خواندنی برای کاهش بار PostgreSQL' },
                    { title: 'CDN & Caching', desc: 'CloudFront + Redis برای کاهش latency' },
                    { title: 'Async Processing', desc: 'پردازش غیرهمزمان با Kafka/RabbitMQ' },
                    { title: 'Auto-Scaling', desc: 'مقیاس خودکار بر اساس ترافیک' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-3">
                      <h4 className="font-medium text-gray-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4">🗂️ استراتژی پایگاه داده</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-200">
                        <th className="text-right py-2 text-blue-800">نوع داده</th>
                        <th className="text-right py-2 text-blue-800">پایگاه داده</th>
                        <th className="text-right py-2 text-blue-800">دلیل انتخاب</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-blue-100">
                        <td className="py-2">کاربران و تراکنش‌ها</td>
                        <td className="py-2 font-mono text-xs">PostgreSQL</td>
                        <td className="py-2">ACID, Relational Integrity</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2">آگهی‌ها و تاریخچه</td>
                        <td className="py-2 font-mono text-xs">MongoDB</td>
                        <td className="py-2">Schema Flexibility, Horizontal Scale</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2">ایندکس جستجو</td>
                        <td className="py-2 font-mono text-xs">Elasticsearch</td>
                        <td className="py-2">Full-Text Search, Geo Queries</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2">Cache و Sessions</td>
                        <td className="py-2 font-mono text-xs">Redis</td>
                        <td className="py-2">In-Memory Speed, Pub/Sub</td>
                      </tr>
                      <tr>
                        <td className="py-2">تصاویر و فایل‌ها</td>
                        <td className="py-2 font-mono text-xs">S3 + CDN</td>
                        <td className="py-2">Scalable Storage, Global Delivery</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
