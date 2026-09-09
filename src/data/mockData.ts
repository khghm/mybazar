export interface Ad {
  id: string;
  title: string;
  price: string;
  location: string;
  time: string;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  description: string;
  attributes: Record<string, string>;
  featured: boolean;
  status?: 'active' | 'pending' | 'rejected' | 'expired' | 'sold';
  seller: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
    joinDate: string;
    ads: number;
  };
}

const IMG = {
  iphone: 'https://image.qwenlm.ai/generated-images/c4ac74f5-b03b-4f23-b65f-4945503e1d79/_result.png',
  apartment: 'https://image.qwenlm.ai/generated-images/8ae2ac56-b06b-4162-bdbb-d4e9b3d79db0/_result.png',
  car: 'https://image.qwenlm.ai/generated-images/c0547c98-dd42-47a5-ac1a-e47c726674a7/_result.png',
  furniture: 'https://image.qwenlm.ai/generated-images/93c1518f-f50b-4346-bb99-4e0be6aa23f9/_result.png',
  laptop: 'https://image.qwenlm.ai/generated-images/eec5e300-300b-44b6-810b-293d61848c57/_result.png',
  hero: 'https://image.qwenlm.ai/generated-images/db150bb3-6f63-403f-aaa3-1bca0fd24e28/_result.png',
  seller: 'https://image.qwenlm.ai/generated-images/9a529771-cf48-4bd4-b0f4-99ccdc794c0b/_result.png',
};

export const mockAds: Ad[] = [
  {
    id: '1',
    title: 'آیفون ۱۵ پرو مکس ۲۵۶ گیگابایت',
    price: '۸۵,۰۰۰,۰۰۰ تومان',
    location: 'تهران، سعادت‌آباد',
    time: '۲ ساعت پیش',
    image: IMG.iphone,
    images: [IMG.iphone, IMG.iphone, IMG.iphone],
    category: 'کالای دیجیتال',
    subcategory: 'گوشی موبایل',
    description: 'آیفون ۱۵ پرو مکس با ظرفیت ۲۵۶ گیگابایت، رنگ تیتانیوم طبیعی. کاملاً سالم بدون خط و خش، همراه با جعبه و لوازم جانبی اورجینال. باتری ۹۸٪ سلامت. گارانتی ۶ ماهه باقی‌مانده.',
    attributes: {
      'برند': 'Apple',
      'مدل': 'iPhone 15 Pro Max',
      'حافظه': '۲۵۶ گیگابایت',
      'رنگ': 'تیتانیوم طبیعی',
      'وضعیت': 'در حد نو',
      'گارانتی': '۶ ماه باقی‌مانده',
      'سلامت باتری': '۹۸٪',
    },
    featured: true,
    seller: { name: 'علی محمدی', avatar: IMG.seller, rating: 4.8, verified: true, joinDate: '۱۴۰۱', ads: 12 },
  },
  {
    id: '2',
    title: 'آپارتمان ۱۲۰ متری نوساز',
    price: '۱۲,۵۰۰,۰۰۰,۰۰۰ تومان',
    location: 'تهران، پونک',
    time: '۵ ساعت پیش',
    image: IMG.apartment,
    images: [IMG.apartment, IMG.apartment],
    category: 'املاک',
    subcategory: 'فروش آپارتمان',
    description: 'آپارتمان نوساز ۱۲۰ متری، ۲ خواب، طبقه ۵ از ۸. پارکینگ اختصاصی، انباری، آسانسور. نمای سنگ، کابینت MDF، شیرآلات قهرمان. سند تک‌برگ آماده انتقال.',
    attributes: {
      'متراژ': '۱۲۰ متر',
      'تعداد اتاق': '۲',
      'طبقه': '۵ از ۸',
      'سن بنا': 'نوساز',
      'پارکینگ': 'دارد',
      'انباری': 'دارد',
      'سند': 'تک‌برگ',
    },
    featured: true,
    seller: { name: 'مشاور املاک آرمان', avatar: IMG.seller, rating: 4.5, verified: true, joinDate: '۱۳۹۹', ads: 45 },
  },
  {
    id: '3',
    title: 'تویوتا کمری ۲۰۲۴ فول',
    price: '۴,۲۰۰,۰۰۰,۰۰۰ تومان',
    location: 'اصفهان، چهارباغ',
    time: '۱ روز پیش',
    image: IMG.car,
    images: [IMG.car, IMG.car],
    category: 'وسایل نقلیه',
    subcategory: 'خودرو سواری',
    description: 'تویوتا کمری مدل ۲۰۲۴، فول آپشن، رنگ سفید صدفی. کارکرد ۱۵,۰۰۰ کیلومتر واقعی. بدون رنگ، بیمه تمام. سانروف، صندلی چرم، دوربین ۳۶۰ درجه.',
    attributes: {
      'مدل': '۲۰۲۴',
      'کارکرد': '۱۵,۰۰۰ کیلومتر',
      'رنگ': 'سفید صدفی',
      'سوخت': 'بنزینی',
      'گیربکس': 'اتوماتیک',
      'بیمه': 'تمام',
      'وضعیت بدنه': 'بدون رنگ',
    },
    featured: false,
    seller: { name: 'رضا کریمی', avatar: IMG.seller, rating: 4.9, verified: true, joinDate: '۱۴۰۰', ads: 3 },
  },
  {
    id: '4',
    title: 'مبل ال شکل مدرن ۷ نفره',
    price: '۴۵,۰۰۰,۰۰۰ تومان',
    location: 'شیراز، معالی‌آباد',
    time: '۳ ساعت پیش',
    image: IMG.furniture,
    images: [IMG.furniture],
    category: 'لوازم خانگی',
    subcategory: 'مبلمان',
    description: 'مبلمان ال شکل ۷ نفره، پارچه ترک درجه یک، فوم سرد ۳۵ کیلویی. اسکلت چوب راش. قابل سفارش در رنگ‌های مختلف. ارسال رایگان در شیراز.',
    attributes: {
      'نوع': 'ال شکل',
      'ظرفیت': '۷ نفر',
      'جنس پارچه': 'ترک درجه یک',
      'اسکلت': 'چوب راش',
      'وضعیت': 'نو',
      'گارانتی': '۳ سال',
    },
    featured: false,
    seller: { name: 'فروشگاه مبل آریا', avatar: IMG.seller, rating: 4.7, verified: true, joinDate: '۱۳۹۸', ads: 28 },
  },
  {
    id: '5',
    title: 'مک‌بوک پرو M3 Max ۱۶ اینچ',
    price: '۱۲۵,۰۰۰,۰۰۰ تومان',
    location: 'تهران، ونک',
    time: '۳۰ دقیقه پیش',
    image: IMG.laptop,
    images: [IMG.laptop],
    category: 'کالای دیجیتال',
    subcategory: 'لپ‌تاپ',
    description: 'مک‌بوک پرو ۱۶ اینچ با تراشه M3 Max، رم ۳۶ گیگابایت، حافظه ۱ ترابایت SSD. صفحه نمایش Liquid Retina XDR. در حد آکبند.',
    attributes: {
      'برند': 'Apple',
      'مدل': 'MacBook Pro 16"',
      'پردازنده': 'M3 Max',
      'رم': '۳۶ گیگابایت',
      'حافظه': '۱ ترابایت SSD',
      'وضعیت': 'آکبند',
    },
    featured: true,
    seller: { name: 'دیجیتال‌شاپ', avatar: IMG.seller, rating: 4.6, verified: true, joinDate: '۱۴۰۰', ads: 67 },
  },
  {
    id: '6',
    title: 'خدمات طراحی سایت حرفه‌ای',
    price: 'توافقی',
    location: 'خدمات آنلاین',
    time: '۱ ساعت پیش',
    image: IMG.hero,
    images: [IMG.hero],
    category: 'خدمات',
    subcategory: 'طراحی وب',
    description: 'طراحی سایت حرفه‌ای با React و Next.js. فروشگاه آنلاین، شرکتی، شخصی. سئو، ریسپانسیو، پنل مدیریت. پشتیبانی ۶ ماهه رایگان.',
    attributes: {
      'نوع خدمات': 'طراحی وب',
      'تکنولوژی': 'React / Next.js',
      'زمان تحویل': '۲ تا ۴ هفته',
      'پشتیبانی': '۶ ماه رایگان',
      'سئو': 'شامل می‌شود',
    },
    featured: false,
    seller: { name: 'استودیو وب‌نو', avatar: IMG.seller, rating: 4.9, verified: true, joinDate: '۱۳۹۷', ads: 8 },
  },
  {
    id: '7',
    title: 'استخدام برنامه‌نویس ارشد React',
    price: '۳۵ تا ۵۵ میلیون تومان',
    location: 'تهران، پاسداران',
    time: '۴ ساعت پیش',
    image: IMG.hero,
    images: [IMG.hero],
    category: 'استخدام',
    subcategory: 'فناوری اطلاعات',
    description: 'شرکت فناوری اطلاعات به دنبال برنامه‌نویس ارشد React با حداقل ۴ سال سابقه. حقوق ۳۵ تا ۵۵ میلیون، بیمه تکمیلی، ناهار.',
    attributes: {
      'نوع همکاری': 'تمام‌وقت',
      'سابقه مورد نیاز': '۴+ سال',
      'مهارت‌ها': 'React, TypeScript, Node.js',
      'حقوق': '۳۵ تا ۵۵ میلیون',
      'بیمه': 'تکمیلی',
      'محل کار': 'حضوری',
    },
    featured: true,
    seller: { name: 'شرکت فناوری نوآوران', avatar: IMG.seller, rating: 4.4, verified: true, joinDate: '۱۳۹۶', ads: 15 },
  },
  {
    id: '8',
    title: 'ویلا دوبلکس ۳۵۰ متری شمال',
    price: '۲۸,۰۰۰,۰۰۰,۰۰۰ تومان',
    location: 'مازندران، نوشهر',
    time: '۶ ساعت پیش',
    image: IMG.apartment,
    images: [IMG.apartment],
    category: 'املاک',
    subcategory: 'فروش ویلا',
    description: 'ویلا دوبلکس ۳۵۰ متری با زمین ۵۰۰ متری. ۴ خواب، استخر اختصاصی، حیاط‌سازی شده. فاصله تا دریا ۸۰۰ متر. سند شش‌دانگ.',
    attributes: {
      'متراژ بنا': '۳۵۰ متر',
      'متراژ زمین': '۵۰۰ متر',
      'تعداد اتاق': '۴',
      'استخر': 'دارد',
      'فاصله تا دریا': '۸۰۰ متر',
      'سند': 'شش‌دانگ',
    },
    featured: false,
    seller: { name: 'املاک ساحل شمال', avatar: IMG.seller, rating: 4.3, verified: true, joinDate: '۱۳۹۹', ads: 32 },
  },
];

export const categories = [
  { id: 'digital', title: 'کالای دیجیتال', icon: 'Package', count: '۱۲۵,۰۰۰+', color: 'from-blue-500 to-indigo-600' },
  { id: 'vehicle', title: 'وسایل نقلیه', icon: 'Activity', count: '۸۵,۰۰۰+', color: 'from-amber-500 to-orange-600' },
  { id: 'realestate', title: 'املاک و مسکن', icon: 'Building', count: '۶۲,۰۰۰+', color: 'from-emerald-500 to-teal-600' },
  { id: 'home', title: 'لوازم خانگی', icon: 'Home', count: '۹۸,۰۰۰+', color: 'from-purple-500 to-violet-600' },
  { id: 'services', title: 'خدمات', icon: 'Wrench', count: '۴۵,۰۰۰+', color: 'from-rose-500 to-pink-600' },
  { id: 'jobs', title: 'استخدام و کاریابی', icon: 'Briefcase', count: '۳۲,۰۰۰+', color: 'from-cyan-500 to-blue-600' },
];

export const chatConversations = [
  {
    id: '1',
    user: 'علی محمدی',
    avatar: IMG.seller,
    adTitle: 'آیفون ۱۵ پرو مکس ۲۵۶ گیگابایت',
    lastMessage: 'بله موجوده. کاملاً سالم و با جعبه.',
    time: '۱۰:۳۱',
    unread: 2,
  },
  {
    id: '2',
    user: 'مشاور املاک آرمان',
    avatar: IMG.seller,
    adTitle: 'آپارتمان ۱۲۰ متری نوساز',
    lastMessage: 'بازدید فردا ساعت ۵ عصر مناسبه؟',
    time: '۰۹:۱۵',
    unread: 1,
  },
  {
    id: '3',
    user: 'رضا کریمی',
    avatar: IMG.seller,
    adTitle: 'تویوتا کمری ۲۰۲۴ فول',
    lastMessage: 'قیمت آخر رو بفرمایید لطفاً',
    time: 'دیروز',
    unread: 0,
  },
];
