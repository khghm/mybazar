import { Page } from '../App';
import { Icons } from '../components/Icons';

interface ArchitecturePageProps {
  navigate: (page: Page) => void;
}

export default function ArchitecturePage({ navigate }: ArchitecturePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">سند معماری جامع سیستم</h1>
        <p className="text-gray-500">مستندات فنی پلتفرم «بازارِ من» — نسخه ۱.۰</p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Icons.Layers size={22} className="text-emerald-600" />
          معماری کلی سیستم
        </h2>
        <div className="space-y-4">
          {/* Client Layer */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2">
              <Icons.Globe size={16} />
              لایه کلاینت
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Web App (React)', 'PWA', 'Mobile (React Native)', 'Admin Panel'].map((item) => (
                <span key={item} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium">{item}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Icons.ArrowDown size={20} className="text-gray-300" />
          </div>

          {/* Gateway */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
              <Icons.Shield size={16} />
              API Gateway & Load Balancer
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Nginx', 'Rate Limiting', 'SSL/TLS', 'Auth', 'WebSocket'].map((item) => (
                <span key={item} className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-medium">{item}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Icons.ArrowDown size={20} className="text-gray-300" />
          </div>

          {/* Microservices */}
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <h4 className="font-bold text-purple-800 text-sm mb-3 flex items-center gap-2">
              <Icons.Database size={16} />
              میکروسرویس‌ها
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['User Service', 'Ad Service', 'Search Service', 'Chat Service', 'Payment Service', 'Notification', 'Media Service', 'Analytics'].map((item) => (
                <span key={item} className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium text-center">{item}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Icons.ArrowDown size={20} className="text-gray-300" />
          </div>

          {/* Data Layer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <h4 className="font-bold text-amber-800 text-sm mb-3">لایه داده</h4>
              <div className="space-y-1.5">
                {['PostgreSQL (Users, Transactions)', 'MongoDB (Ads, History)', 'Elasticsearch (Search)', 'Redis (Cache, Sessions)', 'S3 + CDN (Media)'].map((item) => (
                  <span key={item} className="block px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-medium">{item}</span>
                ))}
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h4 className="font-bold text-orange-800 text-sm mb-3">لایه پیام</h4>
              <div className="space-y-1.5">
                {['Kafka / RabbitMQ', 'Push Notifications (FCM)', 'Email Queue', 'SMS Gateway', 'Event Bus'].map((item) => (
                  <span key={item} className="block px-3 py-1.5 bg-orange-100 text-orange-800 rounded-lg text-xs font-medium">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Model */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Icons.Database size={22} className="text-emerald-600" />
          مدلسازی داده
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Users', color: 'blue', fields: ['id (UUID)', 'phone', 'email', 'name', 'level', 'rating', 'created_at'] },
            { name: 'Ads', color: 'emerald', fields: ['id (UUID)', 'user_id (FK)', 'category_id (FK)', 'title', 'price', 'location (GEO)', 'status', 'content_hash'] },
            { name: 'Categories', color: 'purple', fields: ['id', 'parent_id (self)', 'name', 'slug', 'attributes (JSONB)', 'level'] },
          ].map((entity) => (
            <div key={entity.name} className={`rounded-xl p-4 border border-${entity.color}-200 bg-${entity.color}-50`}>
              <h4 className={`font-bold text-${entity.color}-800 text-sm mb-3 pb-2 border-b border-${entity.color}-200`}>{entity.name}</h4>
              <div className="space-y-1">
                {entity.fields.map((field) => (
                  <div key={field} className="text-xs text-gray-700 font-mono">{field}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phases */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Icons.Calendar size={22} className="text-emerald-600" />
          فازبندی پروژه
        </h2>
        <div className="space-y-4">
          {[
            { phase: 'فاز ۱', title: 'MVP', duration: '۳ ماه', items: ['ثبت‌نام و احراز هویت', 'درج آگهی ساده', 'جستجوی پایه', 'نمایش آگهی'] },
            { phase: 'فاز ۲', title: 'تعاملات و اعتماد', duration: '۲ ماه', items: ['چت داخلی', 'سیستم امتیازدهی', 'سطح‌بندی کاربران', 'تشخیص تکرار'] },
            { phase: 'فاز ۳', title: 'هوشمندی', duration: '۲ ماه', items: ['Elasticsearch', 'پیشنهاد قیمت', 'دسته‌بندی پویا', 'هشدار قیمت'] },
            { phase: 'فاز ۴', title: 'مقیاس‌پذیری', duration: '۲ ماه', items: ['میکروسرویس', 'CDN', 'Kafka', 'Auto-Scaling'] },
            { phase: 'فاز ۵', title: 'پیشرفته', duration: '۲ ماه', items: ['نقشه و خوشه‌بندی', 'آگهی ویژه', 'VoIP', 'اپ موبایل'] },
          ].map((phase, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-16 text-center flex-shrink-0">
                <span className="inline-block px-2 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg">{phase.phase}</span>
                <p className="text-[10px] text-gray-500 mt-1">{phase.duration}</p>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm mb-2">{phase.title}</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Icons.Check size={10} className="text-emerald-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
