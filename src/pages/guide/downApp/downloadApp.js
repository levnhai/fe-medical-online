import classNames from 'classnames/bind';
import Header from '../component/header';

import { BsCheckLg } from 'react-icons/bs';

import Support from '~/layouts/components/support';
import styles from './downloadApp.module.scss';

const cx = classNames.bind(styles);

function DownApp() {
  return (
    <div className={cx('guide_downApp')}>
      <Header
        title={'Hướng dẫn cài đặt ứng dụng'}
        des={'Khám phá đơn giản và nhanh chóng để cài đặt ứng dụng y tế, trải nghiệm ngay những lợi ích việt.'}
      />
      <div className={cx('downApp_container')}>
        <div className={cx('downApp_install')}>
          <div className={cx('install_content')}>
            <ul className={cx('content_list')}>
              <li className={cx('content_item')}>
                <strong>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  Cách 1:
                </strong>
                <h3> Tải ứng dụng:</h3>
              </li>
              <li className={cx('content_item')}>
                <strong>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  Cách 2:
                </strong>
                <h3> Tìm kiếm theo từ khóa "Medical" trên App Store(IOS) hoặc Google Play(Android)</h3>
              </li>
              <li className={cx('content_item')}>
                <strong>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  Cách 3:
                </strong>
                <div className={cx('content_Qr')}>
                  <h3> Quét mã QR:</h3>
                  <img src={require('~/assets/images/qr_code.png')} alt="qr download app" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('downApp_support')}>
        <Support />
      </div>
    </div>
  );
}

export default DownApp;
