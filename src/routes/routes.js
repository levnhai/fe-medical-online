import config from '~/config';

// layout
import HeaderOnly from '~/layouts/headerOnly';

// authentication
import CheckPhone from '~/features/authentication/check_phone';
import SingIn from '~/features/authentication/sign_in';
import OtpInput from '~/features/authentication/otp-input';
import SingUp from '~/features/authentication/sign_up';
import ForgotPassword from '~/features/authentication/forgot_password';

// guide
// import Question from '~/pages/guide/question';
import Refunds from '~/pages/guide/refunds';

// page
import Home from '~/pages/home';
import About from '~/pages/about';
import Facilitie from '~/pages/facilitie';

const publicRoutes = [
  { path: config.routers.home, component: Home },
  { path: config.routers.about, component: About },
  { path: config.routers.facilitie, component: Facilitie },

  // guide
  // { path: config.routers.question, component: Question },
  { path: config.routers.refunds, component: Refunds },

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
