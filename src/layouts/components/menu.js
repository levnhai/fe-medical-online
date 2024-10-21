export const menu = [
  {
    labelKey: 'medical_facilities',
    href: '/co-so-y-te',
    children: [
      { labelKey: 'public_hospitals', href: '/' },
      { labelKey: 'private_hospitals', href: '/' },
      { labelKey: 'clinics', href: '/' },
      { labelKey: 'medical_offices', href: '/' },
      { labelKey: 'laboratory', href: '/' },
    ],
  },
  {
    labelKey: 'medical_services',
    href: '/#',
    children: [
      { labelKey: 'book_at_facility', href: '/dich-vu-y-te/dat-kham-tai-co-so' },
      { labelKey: 'book_with_doctor', href: '/dich-vu-y-te/dat-kham-theo-bac-si' },
    ],
  },
  {
    labelKey: 'news',
    href: '/news',
    children: [
      { labelKey: 'service_news', href: '/news/news-service' },
      { labelKey: 'medical_news', href: '/news/news-medical' },
      { labelKey: 'health_knowledge', href: '/news/news-knowlage' },
    ],
  },
  {
    labelKey: 'guide',
    href: '/huong-dan/cai-dat-ung-dung',
    children: [
      { labelKey: 'app_installation', href: '/huong-dan/cai-dat-ung-dung' },
      { labelKey: 'appointment_booking', href: '/huong-dan/dat-lich-kham' },
      { labelKey: 'refund_process', href: '/huong-dan/quy-trinh-hoan-phi' },
      { labelKey: 'faq', href: '/huong-dan/cau-hoi-thuong-gap' },
    ],
  },
  {
    labelKey: 'about_us',
    href: '/about',
    children: [
      { labelKey: 'about_us', href: '/about' },
      { labelKey: 'recruitment', href: '/#' },
    ],
  },
];
