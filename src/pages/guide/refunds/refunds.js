import classNames from 'classnames/bind';
import Header from '../component/header';

import Support from '~/layouts/components/support';
import { BsCheckLg } from 'react-icons/bs';

import styles from './refunds.module.scss';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

const cx = classNames.bind(styles);
function Refunds() {
  const { t } = useTranslation('translation');
  return (
    <div className={cx('guide_refunds')}>
      <Header title={t('refund_process.header.title')} des={t('refund_process.header.description')} />
      <div className={cx('refunds_wapper')}>
        <div className={cx('refunds_container')}>
          <div className={cx('refunds_card')}>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>{t('refund_process.conditions.title')}</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('refund_process.conditions.item')}
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>{t('refund_process.steps.title')}</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; {t('refund_process.steps.item')}
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>{t('refund_process.time.title')}</h3>
                </div>
                <ul>
                  {t('refund_process.time.items', { returnObjects: true }).map((item, index) => (
                    <li key={index}>
                      <BsCheckLg className={cx('check-icon')} />
                      &nbsp; {item}
                    </li>
                  ))}
                </ul>
              </div>
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

export default Refunds;
