import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

// icon
import { MdKeyboardArrowRight } from 'react-icons/md';

import Sidebar from '../sidebar';
import Appointment from '../appointments';
import Notification from '../notification';
import PatientRecord from '../patientRecords';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import styles from './user.module.scss';

const cx = classNames.bind(styles);

function User() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');

  const renderView = () => {
    switch (key) {
      case 'records':
        return <PatientRecord />;
      case 'bills':
        return <Appointment />;
      case 'notifications':
        return <Notification />;

      default:
        return null;
    }
  };
  return (
    <div className={cx('user')}>
      <div className={cx('', 'py-6')}>
        <ul className="flex">
          <li className="flex items-center">
            <a href="#/" className="font-semibold">
              {t('header.home')}
            </a>
            <MdKeyboardArrowRight />
          </li>

          <li className="flex items-center">
            <a href="#/" className="text-sky-500 font-semibold">
            {t('header.profile')}
            </a>
          </li>
        </ul>
      </div>
        <div className={cx('grid grid-cols-1 md:grid-cols-4 gap-4')}>
          <div className={cx('md:col-span-1')}>
            <Sidebar />
          </div>
        <div div className={cx('md:col-span-3')}>{renderView()}</div>
      </div>
    </div>
  );
}

export default User;
