export interface Ad {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  time: string;
  image: string;
  category: string;
  subcategory: string;
  featured: boolean;
  seller: {
    name: string;
    verified: boolean;
    rating: number;
    joinDate: string;
    ads: number;
  };
  attributes: Record<string, string>;
  images: string[];
  status: string;
}

export const mockAds: Ad[] = [
  {
    id: '1',
    title: 'آیفون ۱۵ پرو مکس ۲۵۶ گیگابایت',
    description: 'گوشی آیفون ۱۵ پرو مکس، رنگ تیتانیوم طبیعی، کاملاً سالم با جعبه و لوازم. بدون خط و خش، با گارانتی معتبر ۱۸ ماهه.',
    price: '۸۵,۰۰۰,۰۰۰ تومان',
    location: 'تهران، ونک',
    time: '۲ ساعت پیش',
    image: '📱',
    category: 'goods',
    subcategory: 'mobile',
    featured: true,
    seller: { name: 'محمد رضایی', verified: true, rating: 4.8, joinDate: '۱۴۰۱', ads: 23 },
    attributes: { 'برند': 'Apple', 'مدل': 'iPhone 15 Pro Max', 'حافظه': '256GB', 'رنگ': 'تیتانیوم طبیعی', 'وضعیت': 'در حد نو' },
    images: ['📱', '📱', '📱'],
    status: 'فعال'
  },
  {
    id: '2',
    title: 'آپارتمان ۱۲۰ متری - سعادت‌آباد',
    description: 'آپارتمان ۱۲۰ متری، ۳ خواب، طبقه ۵ از ۸، نوساز، پارکینگ اختصاصی، آسانسور، انباری. محله آرام و دسترسی عالی.',
    price: '۱۲,۵۰۰,۰۰۰,۰۰۰ تومان',
    location: 'تهران، سعادت‌آباد',
    time: '۵ ساعت پیش',
    image: '🏢',
    category: 'realestate',
    subcategory: 'apartment',
    featured: true,
    seller: { name: 'علی محمدی', verified: true, rating: 4.5, joinDate: '۱۴۰۰', ads: 8 },
    attributes: { 'متراژ': '۱۲۰ متر', 'اتاق': '۳', 'طبقه': '۵', 'سن بنا': 'نوساز', 'پارکینگ': 'دارد' },
    images: ['🏢', '🏢', '🏢'],
    status: 'فعال'
  },
  {
    id: '3',
    title: 'پژو ۲۰۶ تیپ ۵ - مدل ۱۳۹۸',
    description: 'پژو ۲۰۶ تیپ ۵، مدل ۱۳۹۸، کارکرد ۶۵,۰۰۰ کیلومتر، رنگ سفید، بیمه تمام، بدون رنگ‌شدگی. سرویس‌های به‌موقع انجام شده.',
    price: '۴۸۰,۰۰۰,۰۰۰ تومان',
    location: 'اصفهان',
    time: '۱ روز پیش',
    image: '🚗',
    category: 'goods',
    subcategory: 'car',
    featured: true,
    seller: { name: 'حسین کریمی', verified: true, rating: 4.9, joinDate: '۱۳۹۹', ads: 5 },
    attributes: { 'برند': 'پژو', 'مدل': '206 تیپ ۵', 'سال': '۱۳۹۸', 'کارکرد': '۶۵,۰۰۰ کیلومتر', 'رنگ': 'سفید' },
    images: ['🚗', '🚗', '🚗'],
    status: 'فعال'
  },
  {
    id: '4',
    title: 'تدریس خصوصی ریاضی کنکور',
    description: 'مدرس با ۱۰ سال سابقه تدریس ریاضی کنکور. تضمین افزایش ۳۰ درصدی نمره. کلاس حضوری و آنلاین.',
    price: 'ساعتی ۳۵۰,۰۰۰ تومان',
    location: 'تهران، تهرانپارس',
    time: '۳ ساعت پیش',
    image: '📚',
    category: 'services',
    subcategory: 'education',
    featured: false,
    seller: { name: 'دکتر سارا احمدی', verified: true, rating: 5.0, joinDate: '۱۴۰۰', ads: 3 },
    attributes: { 'نوع خدمت': 'تدریس خصوصی', 'درس': 'ریاضیات', 'مقطع': 'کنکور', 'سابقه': '۱۰ سال', 'حضوری/آنلاین': 'هر دو' },
    images: ['📚'],
    status: 'فعال'
  },
  {
    id: '5',
    title: 'استخدام برنامه‌نویس React',
    description: 'شرکت فناوری اطلاعات به دنبال برنامه‌نویس React با حداقل ۳ سال سابقه. حقوق ۲۵ تا ۴۰ میلیون. بیمه، ناهار و دورکاری.',
    price: '۲۵,۰۰۰,۰۰۰ - ۴۰,۰۰۰,۰۰۰ تومان',
    location: 'تهران، جردن',
    time: '۶ ساعت پیش',
    image: '💻',
    category: 'jobs',
    subcategory: 'tech',
    featured: true,
    seller: { name: 'شرکت فناوری نوین', verified: true, rating: 4.7, joinDate: '۱۳۹۸', ads: 12 },
    attributes: { 'عنوان شغلی': 'برنامه‌نویس React', 'سابقه مورد نیاز': '۳+ سال', 'نوع همکاری': 'تمام‌وقت', 'محل کار': 'تهران', 'دورکاری': 'بله' },
    images: ['💻'],
    status: 'فعال'
  },
  {
    id: '6',
    title: 'لپ‌تاپ مک‌بوک پرو M3',
    description: 'مک‌بوک پرو ۱۴ اینچ، تراشه M3 Pro، رم ۱۸ گیگ، حافظه ۵۱۲ SSD. کاملاً نو، پلمپ، با فاکتور رسمی.',
    price: '۱۲۰,۰۰۰,۰۰۰ تومان',
    location: 'تهران، پاساژ ایران',
    time: '۴ ساعت پیش',
    image: '💻',
    category: 'goods',
    subcategory: 'laptop',
    featured: true,
    seller: { name: 'فروشگاه دیجی‌تک', verified: true, rating: 4.6, joinDate: '۱۴۰۱', ads: 45 },
    attributes: { 'برند': 'Apple', 'مدل': 'MacBook Pro 14"', 'تراشه': 'M3 Pro', 'رم': '18GB', 'حافظه': '512GB SSD' },
    images: ['💻', '💻'],
    status: 'فعال'
  },
  {
    id: '7',
    title: 'ویلا دوبلکس - شمال، متل‌قو',
    description: 'ویلا دوبلکس ۳۵۰ متری با حیاط ۲۰۰ متری، استخر اختصاصی، ۴ خواب، فاصله ۵۰۰ متر تا دریا. سند تک‌برگ.',
    price: '۲۸,۰۰۰,۰۰۰,۰۰۰ تومان',
    location: 'مازندران، متل‌قو',
    time: '۱ روز پیش',
    image: '🏡',
    category: 'realestate',
    subcategory: 'villa',
    featured: false,
    seller: { name: 'املاک ساحل', verified: true, rating: 4.3, joinDate: '۱۳۹۹', ads: 34 },
    attributes: { 'نوع': 'ویلا دوبلکس', 'متراژ بنا': '۳۵۰ متر', 'متراژ زمین': '۵۵۰ متر', 'اتاق': '۴', 'امکانات': 'استخر، حیاط' },
    images: ['🏡', '🏡'],
    status: 'فعال'
  },
  {
    id: '8',
    title: 'خدمات نقاشی ساختمان',
    description: 'اجرای انواع رنگ‌آمیزی ساختمان با بهترین کیفیت. رنگ پلاستیک، اکریلیک، روغنی. قیمت منصفانه و ضمانت کار.',
    price: 'متری ۸۵,۰۰۰ تومان',
    location: 'تهران',
    time: '۲ روز پیش',
    image: '🎨',
    category: 'services',
    subcategory: 'repair',
    featured: false,
    seller: { name: 'استاد رحیمی', verified: false, rating: 4.4, joinDate: '۱۴۰۲', ads: 7 },
    attributes: { 'نوع خدمت': 'نقاشی ساختمان', 'نوع رنگ': 'پلاستیک/اکریلیک/روغنی', 'ضمانت': '۶ ماه', 'سابقه': '۱۵ سال' },
    images: ['🎨'],
    status: 'فعال'
  },
  {
    id: '9',
    title: 'مبل راحتی ۷ نفره - چستر',
    description: 'ست مبل راحتی ۷ نفره مدل چستر، پارچه ترک، اسکلت چوب راش. رنگ کرم-طلایی. تحویل ۲۰ روزه.',
    price: '۴۵,۰۰۰,۰۰۰ تومان',
    location: 'تهران، یافت‌آباد',
    time: '۸ ساعت پیش',
    image: '🛋️',
    category: 'goods',
    subcategory: 'furniture',
    featured: false,
    seller: { name: 'مبلمان پارسه', verified: true, rating: 4.8, joinDate: '۱۴۰۰', ads: 18 },
    attributes: { 'تعداد نفر': '۷', 'مدل': 'چستر', 'جنس پارچه': 'ترک', 'اسکلت': 'چوب راش', 'زمان تحویل': '۲۰ روز' },
    images: ['🛋️', '🛋️'],
    status: 'فعال'
  },
  {
    id: '10',
    title: 'استخدام حسابدار ارشد',
    description: 'شرکت بازرگانی به دنبال حسابدار ارشد مسلط به نرم‌افزار هلو و اکسل پیشرفته. حقوق توافقی + پاداش.',
    price: 'توافقی',
    location: 'تهران، میرداماد',
    time: '۱۲ ساعت پیش',
    image: '📊',
    category: 'jobs',
    subcategory: 'finance',
    featured: false,
    seller: { name: 'گروه بازرگانی آریا', verified: true, rating: 4.2, joinDate: '۱۴۰۱', ads: 6 },
    attributes: { 'عنوان شغلی': 'حسابدار ارشد', 'سابقه': '۵+ سال', 'نرم‌افزار': 'هلو، اکسل', 'نوع همکاری': 'تمام‌وقت', 'بیمه': 'دارد' },
    images: ['📊'],
    status: 'فعال'
  },
  {
    id: '11',
    title: 'دوچرخه کوهستان جاینت',
    description: 'دوچرخه کوهستان جاینت مدل ۲۰۲۳، ۲۷ دنده، ترمز دیسکی هیدرولیک. استفاده کم، در حد نو.',
    price: '۱۸,۵۰۰,۰۰۰ تومان',
    location: 'کرج',
    time: '۱ روز پیش',
    image: '🚲',
    category: 'goods',
    subcategory: 'sports',
    featured: false,
    seller: { name: 'امیر حسینی', verified: false, rating: 4.1, joinDate: '۱۴۰۲', ads: 3 },
    attributes: { 'برند': 'Giant', 'مدل': '2023', 'دنده': '۲۷', 'ترمز': 'دیسکی هیدرولیک', 'وضعیت': 'در حد نو' },
    images: ['🚲'],
    status: 'فعال'
  },
  {
    id: '12',
    title: 'خدمات حمل‌ونقل بار - وانت',
    description: 'حمل‌ونقل بار با وانت نیسان و ایسوزو در سطح شهر و بین‌شهری. بسته‌بندی و بارگیری رایگان. قیمت مناسب.',
    price: 'از ۲۰۰,۰۰۰ تومان',
    location: 'تهران و حومه',
    time: '۵ ساعت پیش',
    image: '🚚',
    category: 'services',
    subcategory: 'transport',
    featured: false,
    seller: { name: 'باربری سریع', verified: true, rating: 4.5, joinDate: '۱۴۰۰', ads: 2 },
    attributes: { 'نوع خدمت': 'حمل‌ونقل بار', 'خودرو': 'وانت/ایسوزو', 'محدوده': 'شهری و بین‌شهری', 'بسته‌بندی': 'رایگان', 'بیمه بار': 'دارد' },
    images: ['🚚'],
    status: 'فعال'
  },
];

export const chatConversations = [
  {
    id: '1',
    user: 'محمد رضایی',
    lastMessage: 'سلام، هنوز موجوده؟',
    time: '۱۰:۳۰',
    unread: 2,
    avatar: '👤',
    adTitle: 'آیفون ۱۵ پرو مکس'
  },
  {
    id: '2',
    user: 'سارا احمدی',
    lastMessage: 'قیمت رو میشه کمتر کنید؟',
    time: '۰۹:۱۵',
    unread: 0,
    avatar: '👩',
    adTitle: 'تدریس ریاضی'
  },
  {
    id: '3',
    user: 'علی محمدی',
    lastMessage: 'بازدید فردا ساعت ۵ مناسبه؟',
    time: 'دیروز',
    unread: 1,
    avatar: '👨',
    adTitle: 'آپارتمان سعادت‌آباد'
  },
  {
    id: '4',
    user: 'حسین کریمی',
    lastMessage: 'عکس‌های بیشتری دارید؟',
    time: '۲ روز پیش',
    unread: 0,
    avatar: '🧔',
    adTitle: 'پژو ۲۰۶'
  },
];
