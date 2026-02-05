import classNames from 'classnames/bind';
import Header from '../component/header';

import { BsCheckLg } from 'react-icons/bs';

import Support from '~/layouts/components/support';
import styles from './downloadApp.module.scss';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

const cx = classNames.bind(styles);

function DownApp() {
  const { t } = useTranslation('translation');
  return (
    <div className={cx('guide_downApp')}>
      <Header title={t('download_app.header.title')} des={t('download_app.header.description')} />
      <div className={cx('downApp_container')}>
        <div className={cx('downApp_install')}>
          <div className={cx('install_content')}>
            <ul className={cx('content_list')}>
              <li className={cx('content_item')}>
                <strong>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  {t('download_app.steps.title.0')}
                </strong>
                <h3>{t('download_app.steps.item.0')}</h3>
              </li>
              <li className={cx('content_item')}>
                <strong>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  {t('download_app.steps.title.1')}
                </strong>
                <h3>{t('download_app.steps.item.1')}</h3>
              </li>
              <li className={cx('content_item')}>
                <strong>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  {t('download_app.steps.title.2')}
                </strong>
                <div className={cx('content_Qr')}>
                  <h3>{t('download_app.steps.item.2')}</h3>
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
