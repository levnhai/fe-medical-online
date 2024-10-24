import classNames from 'classnames/bind';
import Header from '../component/header';

import { BsCheckLg } from 'react-icons/bs';

import Support from '~/layouts/components/support';
import styles from './appointment.module.scss';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

const cx = classNames.bind(styles);
function Appointment() {
  const { t } = useTranslation();
  
  return (
    <div className={cx('guide_refunds')}>
      <Header
        title={t('appointment.header.title')}
        des={t('appointment.header.description')}
      />
      <div className={cx('refunds_wapper')}>
        <div className={cx('refunds_container')}>
          <div className={cx('refunds_card')}>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>{t('appointment.step1.title')}</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} /> &nbsp; {t('appointment.step1.items.0')}
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step1.items.1')}
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step1.items.2')}
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step1.items.3')}
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>{t('appointment.step2.title')}</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step2.items.0')}
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step2.items.1')}
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step2.items.2')}
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>{t('appointment.step3.title')}</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step3.items.0')}
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step3.items.1')}
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step3.items.2')}
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>{t('appointment.step4.title')}</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('appointment.step4.items.0')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={cx('refunds_cardBottom')}>
            <div className={cx('refunds__cardBottom--title')}>{t('appointment.examination.title')}</div>
            <div className={cx('refunds__cardBottom--content')}>
              <ul>
                <li>
                {t('appointment.examination.items.0')}
                </li>
                <li>{t('appointment.examination.items.1')}</li>
                <li>
                {t('appointment.examination.items.2')}
                </li>
                <li>
                {t('appointment.examination.items.3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('refunds_support')}>
        <Support />
      </div>
    </div>
  );
}

export default Appointment;
