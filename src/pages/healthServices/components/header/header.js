import classNames from 'classnames/bind';
import style from './header.module.scss';
const cx = classNames.bind(style);

function Header({ bannerImage, title, contentSpan }) {
  return (
    <div className={cx('header')}>
      <div
        className={cx('banner-wrapper')}
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className={cx('banner-container')}>
          <div className={cx('title-content')}>
            <h1>{title}</h1>
            <div className={cx('title-content_span')}>{contentSpan}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
