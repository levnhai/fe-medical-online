import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '~/components/Button';
import '~/translation/i18n';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

function Header({ title, des }) {
  const location = useLocation();
  const path = location.pathname;
  const [sliderMode, setSliderMode] = useState('full');
  const sliderRef = useRef(null);

  const { t } = useTranslation();
  
  const menus = [
  { title: t('guide.set_app'), href: '/huong-dan/cai-dat-ung-dung' },
  { title: t('guide.appointment'), href: '/huong-dan/dat-lich-kham' },
  { title: t('guide.refund_process'), href: '/huong-dan/quy-trinh-hoan-phi' },
  { title: t('guide.faq'), href: '/huong-dan/cau-hoi-thuong-gap' },
];


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 320) setSliderMode('one');
      else if (width < 425) setSliderMode('two');
      else if (width < 768) setSliderMode('three');
      else if (width < 1024) setSliderMode('slider');
      else setSliderMode('full');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (sliderMode !== 'full' && sliderRef.current) {
      let isDown = false;
      let startX;
      let scrollLeft;

      const slider = sliderRef.current;

      const onMouseDown = (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };

      const onMouseLeave = () => {
        isDown = false;
        slider.classList.remove('active');
      };

      const onMouseUp = () => {
        isDown = false;
        slider.classList.remove('active');
      };

      const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.addEventListener('mousedown', onMouseDown);
      slider.addEventListener('mouseleave', onMouseLeave);
      slider.addEventListener('mouseup', onMouseUp);
      slider.addEventListener('mousemove', onMouseMove);

      return () => {
        slider.removeEventListener('mousedown', onMouseDown);
        slider.removeEventListener('mouseleave', onMouseLeave);
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, [sliderMode]);

  return (
    <div className={cx('guide_header')}>
      <div className={cx('content')}>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('description')}>{des}</p>
      </div>
      <div className={cx('btnGroup', sliderMode)} ref={sliderRef}>
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
      <div className={cx('btnGroup', sliderMode)} ref={sliderRef}>
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
    </div>
  );
}

export default Header;