const routes = {
  home: '/',
  about: '/about',
  checkPhone: '/check-phone',
  otpInput: '/otp-input',
  otpInputForgot: '/otp-input-forgot',
  singIn: '/login',
  singUp: '/register-account',
  newPassword: '/new-password',

  //facilitie
  facilitie: '/co-so-y-te',
  facilitieType: '/co-so-y-te/:type/',

  // health
  appointmentDoctor: '/dich-vu-y-te/dat-kham-theo-bac-si',
  appointmentFacility: '/dich-vu-y-te/dat-kham-tai-co-so',

  // guide
  question: '/huong-dan/cau-hoi-thuong-gap',
  downLoadApp: '/huong-dan/cai-dat-ung-dung',
  appointment: '/huong-dan/dat-lich-kham',
  refunds: '/huong-dan/quy-trinh-hoan-phi',

  // new
  news: '/tin-tuc',
  newsService: '/tin-tuc/dich-vu',
  newsMedical: '/tin-tuc/y-te',
  newsKnowlage: '/tin-tuc/y-hoc-thuong-thuc',
};
export default routes;
