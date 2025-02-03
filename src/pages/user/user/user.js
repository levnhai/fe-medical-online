import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

// icon
import { MdKeyboardArrowRight } from 'react-icons/md';

import Sidebar from '../sidebar';
import Appointment from '../appointments';
import Notification from '../notification';
import PatientRecord from '../patientRecords';

import styles from './user.module.scss';

const cx = classNames.bind(styles);

function User() {
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
              Trang chủ
            </a>
            <MdKeyboardArrowRight />
          </li>

          <li className="flex items-center">
            <a href="#/" className="text-sky-500 font-semibold">
              Hồ sơ bệnh nhân
            </a>
          </li>
        </ul>
      </div>
      <div className={cx('grid grid-cols-4 gap-4')}>
        <div className={cx('col-span-1')}>
          <Sidebar />
        </div>
        <div className={cx('col-span-3 ')}>{renderView()}</div>
      </div>
    </div>
  );
}

export default User;
