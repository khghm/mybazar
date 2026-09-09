import { Page } from '../App';
import { Icons } from './Icons';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Icons.Package size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">بازارِ من</h3>
                <p className="text-[10px] text-gray-500">بازار آنلاین هوشمند</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              بازارِ من، پلتفرم آنلاین خرید و فروش کالاهای فیزیکی، املاک، خدمات و استخدام.
              بازاری امن، سریع و هوشمند برای همه.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2.5 text-sm">
              {['کالاهای فیزیکی', 'املاک و مسکن', 'خدمات', 'استخدام'].map((item) => (
                <li key={item} className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => navigate('search')}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">خدمات</h4>
            <ul className="space-y-2.5 text-sm">
              {['آگهی ویژه', 'هشدار قیمت', 'پشتیبانی ۲۴/۷'].map((item) => (
                <li key={item} className="hover:text-emerald-400 cursor-pointer transition-colors">{item}</li>
              ))}
              <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => navigate('architecture')}>مستندات فنی</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">ارتباط با ما</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Icons.Message size={14} className="text-emerald-400" />
                support@bazaareman.ir
              </li>
              <li className="flex items-center gap-2">
                <Icons.Phone size={14} className="text-emerald-400" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center gap-2">
                <Icons.Location size={14} className="text-emerald-400" />
                تهران، خیابان ولیعصر
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© ۱۴۰۵ بازارِ من. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">قوانین و مقررات</span>
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">حریم خصوصی</span>
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">درباره ما</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
