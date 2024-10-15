import Button from '~/components/Button';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
//language
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import styles from './footer.module.scss';
const cx = classNames.bind(styles);

function Footer() {
  const { t, i18n } = useTranslation();
const [currentLanguages, setCurrentLanguages] = useState(i18n.language);

// handle onchange language
const handleLanguageChange = (language) => {
  i18n.changeLanguage(language);
  setCurrentLanguages(language);
}
  return (
    <div className={cx('footer')}>
      <div className={cx('footer_container')}>
        <div className={cx('footer_info')}>
          <a href="/">
            <div className={cx('footer_logo')}></div>
          </a>
          <ul>
            <li className={cx('footer_infoItem')}>
            <b>{t('footer.address')}: </b> {t('footer.addresss')}:
            </li>
            <li className={cx('footer_infoItem')}>
              <b>{t('footer.website')}: </b>
              https://pkh.vn
            </li>
            <li className={cx('footer_infoItem')}>
              <b>{t('footer.email')}: </b>
              cskh@medical.vn
            </li>
            <li className={cx('footer_infoItem')}>
              <b>{t('footer.phone')}: </b>
              (028) 710 78098
            </li>
          </ul>
        </div>
        <div className={cx('footer_menu')}>
          <div className={cx('footer_menuWapper')}>
            <h3 className={cx('footer_title')}>{t('footer.medicalServices')}</h3>
            <ul className={cx('footer_listMenu')}>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.bookAtFacility')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.bookByDoctor')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.remoteConsultation')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.bookLabTest')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.homeHealthcare')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.homePayment')}</Button>
              </li>
            </ul>
          </div>
          <div className={cx('footer_menuWapper')}>
            <h3 className={cx('footer_title')}>{t('footer.medicalFacilities')}</h3>
            <ul className={cx('footer_listMenu')}>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.publicHospital')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.privateHospital')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.clinic')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.privateClinic')}</Button>
              </li>
            </ul>
          </div>
          <div className={cx('footer_menuWapper')}>
            <h3 className={cx('footer_title')}>{t('footer.guide')}</h3>
            <ul className={cx('footer_listMenu')}>
              <li className={cx('footer_itemMenu')}>
                <Button to="/huong-dan/cai-dat-ung-dung">{t('footer.appInstallation')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="/huong-dan/dat-lich-kham">{t('footer.booking')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="/huong-dan/quy-trinh-hoan-phi">{t('footer.refundProcess')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="/huong-dan/cau-hoi-thuong-gap">{t('footer.faq')}</Button>
              </li>
            </ul>
          </div>
          <div className={cx('footer_menuWapper')}>
            <h3 className={cx('footer_title')}>{t('footer.news')}</h3>
            <ul className={cx('footer_listMenu')}>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.serviceNews')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.medicalNews')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.generalMedicine')}</Button>
              </li>
            </ul>
          </div>
          <div className={cx('footer_menuWapper')}>
            <h3 className={cx('footer_title')}>{t('footer.aboutUs')}</h3>
            <ul className={cx('footer_listMenu')}>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.introduction')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.termsOfService')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.privacyPolicy')}</Button>
              </li>
              <li className={cx('footer_itemMenu')}>
                <Button to="#">{t('footer.usagePolicy')}</Button>
              </li>
            </ul>
          </div>
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
