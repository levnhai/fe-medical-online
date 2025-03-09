import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

// Icons
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiUsers } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa6';
import { Shake } from '~/components/animation';

import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

const cx = classNames.bind(styles);

function Sidebar() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');

  // Menu với các key dịch
  const menu = [
    {
      id: '',
      icon: <FaUserPlus />,
      title: t('patientRecords.sidebar.add'),
      href: '/#',
    },
    {
      id: 'records',
      icon: <FiUsers />,
      title: t('patientRecords.sidebar.profile'),
      href: '/user?key=records',
    },
    {
      id: 'bills',
      icon: <FiUsers />,
      title: t('patientRecords.sidebar.form'),
      href: '/user?key=bills',
    },
    {
      id: 'notifications',
      icon: <IoMdNotificationsOutline />,
      title: t('patientRecords.sidebar.notifi'),
      href: '/user?key=notifications',
    },
  ];

  return (
    <div className={cx('sidebar')}>
      <div>
        <ul className={cx('menu')}>
          {menu.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.href)}
              className={key === item.id ? cx('item', 'active') : cx('item')}
            >
              <Shake>{item.icon}</Shake>
              <div className={cx('title', 'text-sm sm:text-base md:text-2xl')}>{item.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;