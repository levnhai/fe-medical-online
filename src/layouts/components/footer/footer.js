import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';

import '~/translation/i18n';
import Button from '~/components/Button';
import { menu } from '../menu';

import styles from './footer.module.scss';
const cx = classNames.bind(styles);

function Footer() {
  const { t } = useTranslation(['common', 'menu', 'footer']);

  return (
    <div className={cx('footer')}>
      <div className={cx('footer_container')}>
        <div className={cx('footer_info')}>
          <a href="/">
            <div className={cx('footer_logo')}></div>
          </a>
          <ul>
            <li className={cx('footer_infoItem')}>
              <b>{t('footer:contact.address')}: </b> {t('footer:contact.address_medical')}
            </li>
            <li className={cx('footer_infoItem')}>
              <b>{t('footer:contact.website')}: </b>
              https://pkh.vn
            </li>
            <li className={cx('footer_infoItem')}>
              <b>{t('footer:contact.email')}: </b>
              cskh@medical.vn
            </li>
            <li className={cx('footer_infoItem')}>
              <b>{t('footer:contact.phone')}: </b>
              (028) 710 78098
            </li>
          </ul>
        </div>
        <div className={cx('footer_menu')}>
          {menu &&
            menu.map((item, index) => {
              return (
                <div className={cx('footer_menuWapper')} key={index}>
                  <h3 className={cx('footer_title')}>{t(`menu:${item.labelKey}`)}</h3>
                  <ul className={cx('footer_listMenu')}>
                    {item &&
                      item.children?.map((childItem, index) => {
                        return (
                          <li className={cx('footer_itemMenu')} key={index}>
                            <Button to={childItem.href}>{t(`menu:${childItem.labelKey}`)}</Button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
      <div className={cx('footer_coppyRight')}>
        <span className={cx('coppyRight_tag')}>@2020 - Bản Quyền Thuộc Công Ty Cổ Phàn Ứng Dụng PKH</span>
        <img
          src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-06.png?ID=c40b02e0-e3fb-4099-8bfa-16900ae9bd87"
          alt=""
          width="150px"
          height="30px"
        />
      </div>
    </div>
  );
}

export default React.memo(Footer);
