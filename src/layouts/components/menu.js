export const menu = [
  {
    labelKey: 'medical_facilities',
    href: '/co-so-y-te',
    children: [
      { labelKey: 'public_hospitals', href: '/co-so-y-te/benh-vien-cong' },
      { labelKey: 'private_hospitals', href: '/co-so-y-te/benh-vien-tu' },
      { labelKey: 'clinics', href: '/co-so-y-te/phong-kham' },
      { labelKey: 'medical_offices', href: '/co-so-y-te/phong-mach' },
      { labelKey: 'laboratory', href: '/co-so-y-te/xet-nghiem' },
    ],
  },
  // {
  //   labelKey: 'medical_services',
  //   href: '/#',
  //   children: [
  //     { labelKey: 'book_at_facility', href: '/dich-vu-y-te/dat-kham-tai-co-so' },
  //     { labelKey: 'book_with_doctor', href: '/dich-vu-y-te/dat-kham-theo-bac-si' },
  //   ],
  // },
  {
    labelKey: 'news',
    href: '/tin-tuc',
    children: [
      { labelKey: 'service_news', href: '/tin-tuc/dich-vu' },
      { labelKey: 'medical_news', href: '/tin-tuc/y-te' },
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
    children: [
      { labelKey: 'about_us', href: '/about' },
      { labelKey: 'recruitment', href: '/#' },
    ],
  },
];
