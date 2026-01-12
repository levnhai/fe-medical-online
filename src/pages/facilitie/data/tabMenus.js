export const getTabMenus = (t) => [
  {
    label: t('facilities.publicHospital.label'),
    href: 'benh-vien-cong',
    subTitle: t(
      'facilities.publicHospital.subTitle',
      'Đặt khám dễ dàng, không lo chờ đợi tại các bệnh viện công hàng đầu Việt Nam',
    ),
  },
  {
    label: t('facilities.privateHospital.label'),
    href: 'benh-vien-tu',
    subTitle: t(
      'facilities.privateHospital.subTitle',
      'Tận hưởng dịch vụ y tế tư nhân, chăm sóc sức khỏe chuyên nghiệp',
    ),
  },
  {
    label: t('facilities.clinic.label'),
    href: 'phong-kham',
    subTitle: t(
      'facilities.clinic.subTitle',
      'Trải nghiệm chăm sóc y tế tập trung và gần gũi tại phòng khám chuyên khoa',
    ),
  },
  {
    label: t('facilities.medicalOffice.label'),
    href: 'phong-mach',
    subTitle: t(
      'facilities.medicalOffice.subTitle',
      'Chẩn đoán và điều trị chất lượng với bác sĩ chuyên khoa được nhiều người tin tưởng',
    ),
  },
  {
    label: t('facilities.laboratory.label'),
    href: 'xet-nghiem',
    subTitle: t(
      'facilities.laboratory.subTitle',
      'Xét nghiệm chính xác, nhanh chóng và hỗ trợ chẩn đoán hiệu quả với các cơ sở uy tín hàng đầu',
    ),
  },
];
