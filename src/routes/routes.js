import config from '~/config';

// layout
import HeaderOnly from '~/layouts/headerOnly';

// authentication
import CheckPhone from '~/features/authentication/check_phone';
import SingIn from '~/features/authentication/sign_in';
import OtpInput from '~/features/authentication/otp-input';
import SingUp from '~/features/authentication/sign_up';
import ForgotPassword from '~/features/authentication/forgot_password';
import News from '~/pages/news';
import NewsService from '~/pages/news/news_service';
import NewsMedical from '~/pages/news/news_medical';
import NewsKnowlage from '~/pages/news/news_knowlage';
import NewsDetails from '~/pages/news/news_details';

// user
import User from '~/pages/user/user';
import NewRecord from '~/pages/user/newRecord';

// guide
import Question from '~/pages/guide/question';
import Refunds from '~/pages/guide/refunds';
import DownApp from '~/pages/guide/downApp';
import Appointment from '~/pages/guide/appointment';

// page
import Home from '~/pages/home';
import About from '~/pages/about';
import Facilitie from '~/pages/facilitie';
import FacilitieDetail from '~/pages/facilitie/facilitieDetail';
import AppointmentDoctor from '~/pages/healthServices/appointmentDoctor';
import AppointmentFacility from '~/pages/healthServices/appointmentFacility';
import AppointmentBooking from '~/pages/healthServices/appointmentBooking';
import FormBooking from '~/pages/facilitie/formBooking/formBooking';
import VisitDetail from '~/pages/healthServices/components/visitDetail';
import NewsHomePage from '~/pages/news/NewsHomePage';

const publicRoutes = [
  { path: config.routers.home, component: Home },
  { path: config.routers.about, component: About },
  { path: config.routers.news, component: News },
  { path: config.routers.newsService, component: NewsService },
  { path: config.routers.newsMedical, component: NewsMedical },
  { path: config.routers.newsKnowlage, component: NewsKnowlage },
  { path: config.routers.newsDetails, component: NewsDetails },
  { path: config.routers.facilitie, component: Facilitie },
  { path: config.routers.facilitieDetail, component: FacilitieDetail },
  { path: config.routers.facilitieType, component: Facilitie },
  { path: config.routers.appointmentDoctor, component: AppointmentDoctor },
  { path: config.routers.appointmentFacility, component: AppointmentFacility },
  { path: '/tin-tuc/tin-dich-vu', component: NewsService },
  { path: '/tin-tuc/tin-y-te', component: NewsMedical },
  { path: '/tin-tuc/thuong-thuc-y-te', component: NewsMedical },
  { path: config.routers.appointmentBooking, component: AppointmentBooking },
  { path: config.routers.formBooking, component: FormBooking },
  { path: config.routers.visitDetail, component: VisitDetail, isPrivate: false },
  { path: config.routers.user, component: User },
  { path: config.routers.newRecord, component: NewRecord },

  // guide
  { path: config.routers.question, component: Question },
  { path: config.routers.refunds, component: Refunds },
  { path: config.routers.downLoadApp, component: DownApp },
  { path: config.routers.appointment, component: Appointment },

  // layout header only
  { path: config.routers.checkPhone, component: CheckPhone, layout: HeaderOnly },
  { path: config.routers.login, component: SingIn, layout: HeaderOnly },
  { path: config.routers.otpInput, component: OtpInput, layout: HeaderOnly },
  { path: config.routers.otpInputForgot, component: OtpInput, layout: HeaderOnly },
  { path: config.routers.singUp, component: SingUp, layout: HeaderOnly },
  { path: config.routers.singIn, component: SingIn, layout: HeaderOnly },
  { path: config.routers.newPassword, component: ForgotPassword, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
