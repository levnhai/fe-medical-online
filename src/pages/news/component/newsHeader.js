import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import styles from '../news.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const menuItems = [
  { title: 'Tin dịch vụ', path: '/tin-tuc/dich-vu' },
  { title: 'Tin y tế', path: '/tin-tuc/y-te' },
  { title: 'Y học thường thức', path: '/tin-tuc/y-hoc-thuong-thuc' },
];

function NewsHeader() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx('news_header')}>
      <Link to="/tin-tuc">
        <h1 className={cx('header_title')}>TIN TỨC Y KHOA</h1>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex gap-6">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <h2 className={cx('header_menu', { active: location.pathname === item.path })}>{item.title}</h2>
          </Link>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <FaBars className="text-xl cursor-pointer" onClick={() => setIsOpen((prev) => !prev)} />

        {isOpen && (
          <div className="absolute bg-white shadow-md rounded mt-2 p-3 z-50">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <div className="py-2">{item.title}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsHeader;
