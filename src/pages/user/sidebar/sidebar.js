import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// icon
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiUsers } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa6';
import { Shake } from '~/components/animation';

const menu = [
  {
    id: '',
    icon: <FaUserPlus />,
    title: 'Thêm hồ sơ',
    href: '/#',
  },
  {
    id: 'records',
    icon: <FiUsers />,
    title: 'Hồ sơ bệnh nhân',
    href: '/user?key=records',
  },
  {
    id: 'bills',
    icon: <FiUsers />,
    title: 'Phiếu khám bệnh',
    href: '/user?key=bills',
  },
  {
    id: 'notifications',
    icon: <IoMdNotificationsOutline />,
    title: 'Thông báo',
    href: '/user?key=notifications',
  },
];

const cx = classNames.bind(styles);
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');

  return (
    <div className={cx('sidebar')}>
      <div>
        <ul className={cx('menu')}>
          {menu &&
            menu?.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`${item?.href}`);
                  }}
                  className={key === item.id ? cx('item', 'active') : cx('item')}
                >
                  <Shake>{item?.icon}</Shake>
                  <div className={cx('title')}>{item?.title}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
