import React from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import Button from '~/components/Button';
import style from './header.module.scss';

const cx = classNames.bind(style);

function Header({ title, des }) {
  const location = useLocation();

  const path = location.pathname;
  console.log('check path', path);

  const menus = [
    { title: 'Cài đặt ứng dụng', href: '/huong-dan/cai-dat-ung-dung' },
    { title: 'Đặt lịch khám', href: '/huong-dan/dat-lich-kham' },
    { title: 'Quy trình hoàn phí', href: '/huong-dan/quy-trinh-hoan-phi' },
    { title: 'Câu hỏi thường gặp', href: '/huong-dan/cau-hoi-thuong-gap' },
  ];

  return (
    <div className={cx('guide_header')}>
      <div className={cx('content')}>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('description')}>{des}</p>
      </div>
      <div className={cx('btnGroup')}>
        {menus &&
          menus.map((item) => {
            return (
              <Button key={item.href} className={cx('giude_btn')} rounded to={item.href} end>
                {item.title}
              </Button>
            );
          })}
      </div>
    </div>
  );
}

export default Header;
