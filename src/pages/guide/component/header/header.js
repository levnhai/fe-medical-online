import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '~/components/Button';
import '~/translation/i18n';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

function Header({ title, des }) {
  const location = useLocation('translation');
  const path = location.pathname;
  const sliderRef = useRef(null);
  const { t } = useTranslation('translation');

  const menus = [
    { title: t('translation:guide.set_app'), href: '/huong-dan/cai-dat-ung-dung' },
    { title: t('translation:guide.appointment'), href: '/huong-dan/dat-lich-kham' },
    { title: t('translation:guide.refund_process'), href: '/huong-dan/quy-trinh-hoan-phi' },
    { title: t('translation:guide.faq'), href: '/huong-dan/cau-hoi-thuong-gap' },
  ];
  return (
    <div className={cx('guide_header')}>
      <div className={cx('content')}>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('description')}>{des}</p>
      </div>
      <div className={cx('btnGroup')} ref={sliderRef}>
        {menus.map((item) => (
          <Button
            key={item.href}
            className={cx('guide_btn', { active: item.href === path })}
            rounded
            to={item.href}
            end
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Header;
