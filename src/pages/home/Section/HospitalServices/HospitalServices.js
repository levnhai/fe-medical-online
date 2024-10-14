import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { HospitalData } from './HospitalData';
import LazyLoad from 'react-lazyload';

import '../../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';

import './HospitalServices.scss';
import style from './HospitalServices.module.scss';

const cx = classNames.bind(style);

function HospitalServices() {
  const desktopSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };

  const mobileSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };

  const Loading = () => <div className={cx('loader')}></div>;

  return (
    <div className="home_listHospital">
      {/* Desktop Slider */}
      <div className="hidden md:block">
        <Slider {...desktopSettings}>
          {HospitalData.map((hospital, index) => (
            <LazyLoad key={hospital._id} placeholder={<Loading />}>
              <div key={index} className="hopital_sliderItem">
                <a href={hospital.link} rel="noreferrer" target="_blank">
                  <div className="hopital_card">
                    <div className="hopital_cardImage">
                      <img src={hospital.image} alt="" className="sliderItem_img" />
                    </div>
                    <Button className="sliderItem_btn" rounded>
                      {hospital.name}
                    </Button>
                    <p className="sliderItem_des">{hospital.des}</p>
                  </div>
                </a>
              </div>
            </LazyLoad>
          ))}
        </Slider>
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden">
        <Slider {...mobileSettings}>
          {HospitalData.map((hospital, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={hospital.image} alt="" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{hospital.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{hospital.des}</p>
                  <a
                    href={hospital.link}
                    rel="noreferrer"
                    target="_blank"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Xem thêm
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default HospitalServices;