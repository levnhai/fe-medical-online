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
    href: '/tin-tuc',
    children: [
      { labelKey: 'service_news', href: '/tin-tuc/tin-dich-vu' },
      { labelKey: 'medical_news', href: '/tin-tuc/tin-y-te' },
      { labelKey: 'health_knowledge', href: '/tin-tuc/y-hoc-thuong-thuc' },
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
  },
];