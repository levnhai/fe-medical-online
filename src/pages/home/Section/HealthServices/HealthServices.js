import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import React, { useState } from 'react';

import style from './HealthServices.module.scss';
//language
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
const cx = classNames.bind(style);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  
  let iconStyles = { width: '2rem', height: '2rem', color: '#003553' };
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        background: '#fff',
        width: 35,
        height: 35,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '-10px',
      }}
      onClick={onClick}
    >
      <MdKeyboardArrowRight style={iconStyles} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  let iconStyles = { width: '2rem', height: '2rem', color: '#003553' };
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        background: '#fff',
        width: 35,
        height: 35,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '-10px',
      }}
      onClick={onClick}
    >
      <MdKeyboardArrowLeft style={iconStyles} />
    </div>
  );
}
const services = [
  {
    img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.png&w=64&q=75",
    alt: "Đặt khám tại cơ sở",
    text: "facilityAppointment"
  },
  {
    img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75",
    alt: "Đặt khám theo bác sỉ",
    text: "doctorAppointment"
  },
  {
    img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F9fdd77eb-9baa-4f3b-a108-d91e136a0bf9-tele.png&w=64&q=75",
    alt: "Tư vấn khám bệnh từ xa",
    text: "telehealth"
  },
  {
    img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fdf388485-514d-44ef-ad7e-352c083f24e0-dkxn.png&w=64&q=75",
    alt: "Đặt lịch xét nghiệm",
    text: "labTest"
  },
  {
    img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75",
    alt: "Gói khám sức khỏe",
    text: "healthCheckup"
  },
  {
    img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ffa0b00be-d554-404a-bf9a-4a5f216ee978-chaam_saac_taaoa_i_nhaa.png&w=64&q=75",
    alt: "Y tế tại nhà",
    text: "homeHealthcare"
  },
  {
    img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F0640985d-4280-4e8c-8ec6-939f9a4cf44b-thanhtoanvp.png&w=64&q=75",
    alt: "Thanh toán viện phí",
    text: "hospitalFee"
  }
];
function HealthServices() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  
  // handle onchange language
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguages(language);
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 4, slidesToScroll: 4, infinite: false },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5, slidesToScroll: 5, infinite: false },
      },
    ],
  };
  return (
    <div className={cx('healthServices', 'w-full px-4')}>
      <div className="hidden md:block"><Slider {...settings}>
        <div className={cx('healthServices_item')}>
          <div className={cx('healthServices_card')}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.png&w=64&q=75"
              alt=""
            />
            <span>{t('services.telehealth')}</span>
          </div>
        </div>
        <div className={cx('healthServices_item')}>
          <div className={cx('healthServices_card')}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75"
              alt=" "
            />
            <span>{t('services.doctorAppointment')}</span>
          </div>
        </div>
        <div className={cx('healthServices_item')}>
          <div className={cx('healthServices_card')}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F9fdd77eb-9baa-4f3b-a108-d91e136a0bf9-tele.png&w=64&q=75"
              alt=""
            />
            <span>{t('services.telehealth')}</span>
          </div>
        </div>
        <div className={cx('healthServices_item')}>
          <div className={cx('healthServices_card')}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fdf388485-514d-44ef-ad7e-352c083f24e0-dkxn.png&w=64&q=75"
              alt=""
            />
            <span>{t('services.labTest')}</span>
          </div>
        </div>
        <div className={cx('healthServices_item')}>
          <div className={cx('healthServices_card')}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75"
              alt=""
            />
            <span>{t('services.healthCheckup')}</span>
          </div>
        </div>
        <div className={cx('healthServices_item')}>
          <div className={cx('healthServices_card')}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ffa0b00be-d554-404a-bf9a-4a5f216ee978-chaam_saac_taaoa_i_nhaa.png&w=64&q=75"
              alt=""
            />
            <span>{t('services.homeHealthcare')}</span>
          </div>
        </div>
        <div className={cx('healthServices_item')}>
          <div className={cx('healthServices_card')}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F0640985d-4280-4e8c-8ec6-939f9a4cf44b-thanhtoanvp.png&w=64&q=75"
              alt=""
            />
            <span>{t('services.hospitalFee')}</span>
          </div>
        </div>
      </Slider>
      </div>
      {/* Mobile Grid */}
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-1">
            <img
              src={service.img}
              alt={t(`services.${service.text}`)}
              className="w-10 h-10 object-contain mb-1"
            />
            <span className="text-center text-[9px] leading-tight">
              {t(`services.${service.text}`)}
            </span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default HealthServices;
