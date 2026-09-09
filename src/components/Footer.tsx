import { Page } from '../App';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                ب
              </div>
              <h3 className="text-white font-bold text-lg">بازارِ من</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              بازارِ من، پلتفرم آنلاین خرید و فروش کالاهای فیزیکی، املاک، خدمات و استخدام.
              بازاری امن، سریع و هوشمند برای همه.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => navigate('search')}>کالاهای فیزیکی</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => navigate('search')}>املاک و مسکن</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => navigate('search')}>خدمات</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => navigate('search')}>استخدام</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">خدمات</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">آگهی ویژه</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">هشدار قیمت</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">پشتیبانی ۲۴/۷</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => navigate('architecture')}>مستندات فنی</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">ارتباط با ما</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span> support@bazaareman.ir
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> ۰۲۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> تهران، خیابان ولیعصر
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">📱</div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">📷</div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">🐦</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© ۱۴۰۵ بازارِ من. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="hover:text-emerald-400 cursor-pointer">قوانین و مقررات</span>
            <span className="hover:text-emerald-400 cursor-pointer">حریم خصوصی</span>
            <span className="hover:text-emerald-400 cursor-pointer">درباره ما</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
