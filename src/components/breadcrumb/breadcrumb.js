import React from 'react';
import className from 'classnames/bind';

import styles from './breadcrumb.module.scss';

const cx = className.bind(styles);

function Breadcrumb({ items, separator = '/' }) {
  return (
    <nav className={cx('breadcrumb')}>
      {items.map((item, index) => (
        <span key={index} className={cx('breadcrumb-item')}>
          {item.href ? (
            <a href={item.href} className={cx('breadcrumb-link')}>
              {item.label}
            </a>
          ) : (
            <span className={cx('breadcrumb-label')}>{item.label}</span>
          )}
          {index < items.length - 1 && <span className={cx('breadcrumb-separator')}>{separator}</span>}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
