import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import menuEN from '~/locales/en/menu.json';
import menuVI from '~/locales/vn/menu.json';
import footerEN from '~/locales/en/footer.json';
import footerVI from '~/locales/vn/footer.json';
import translationEN from '~/locales/en/translation.json';
import translationVI from '~/locales/vn/translation.json';
import commonEN from '~/locales/en/common.json';
import commonVI from '~/locales/vn/common.json';
import buttonsEN from '~/locales/en/button.json';
import buttonsVI from '~/locales/vn/button.json';
import languageVI from '~/locales/vn/language.json';
import languageEN from '~/locales/en/language.json';
import notificationVI from '~/locales/vn/notification.json';
import notificationEN from '~/locales/en/notification.json';
import patientEN from '~/locales/en/patient.json';
import patientVI from '~/locales/vn/patient.json';
import hospitalEN from '~/locales/en/hospital.json';
import hospitalVI from '~/locales/vn/hospital.json';
import visitEN from '~/locales/en/visit.json';
import visitVI from '~/locales/vn/visit.json';
import doctorEN from '~/locales/en/doctor.json';
import doctorVI from '~/locales/vn/doctor.json';
import aboutEN from '~/locales/en/about.json';
import aboutVI from '~/locales/vn/about.json';
import homeEN from '~/locales/en/home.json';
import homeVI from '~/locales/vn/home.json';
import authEN from '~/locales/en/auth.json';
import authVI from '~/locales/vn/auth.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',

  ns: [
    'common',
    'menu',
    'footer',
    'translation',
    'button',
    'language',
    'notification',
    'patient',
    'hospital',
    'visit',
    'doctor',
    'about',
    'home',
    'auth',
  ],
  defaultNS: 'common',

  resources: {
    en: {
      common: commonEN,
      menu: menuEN,
      footer: footerEN,
      translation: translationEN,
      button: buttonsEN,
      language: languageEN,
      notification: notificationEN,
      patient: patientEN,
      hospital: hospitalEN,
      visit: visitEN,
      doctor: doctorEN,
      about: aboutEN,
      home: homeEN,
      auth: authEN,
    },
    vi: {
      common: commonVI,
      menu: menuVI,
      footer: footerVI,
      translation: translationVI,
      button: buttonsVI,
      language: languageVI,
      notification: notificationVI,
      patient: patientVI,
      hospital: hospitalVI,
      visit: visitVI,
      doctor: doctorVI,
      about: aboutVI,
      home: homeVI,
      auth: authVI,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
