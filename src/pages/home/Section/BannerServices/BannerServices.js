import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
// import { HospitalData } from '../HospitalServices/HospitalData';
import LazyLoad from 'react-lazyload';

import '../../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';

import './BannerServices.scss';
import style from '../HospitalServices/HospitalServices.module.scss';

const cx = classNames.bind(style);

export const HospitalData = [
  {
    image: 'https://byvn.net/4yRs',
  },
  {
    image: 'https://byvn.net/DAGe',
  },
  {
    image: 'https://byvn.net/ChvL',
  },
];

function BannerServices() {
  const desktopSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
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
    <div className="banner">
      <div className="hidden md:block">
        <Slider {...desktopSettings}>
          {HospitalData.map((hospital, index) => (
            <LazyLoad key={hospital._id} placeholder={<Loading />}>
              <div key={index} className="banner_sliderItem">
                <a href={hospital.link} rel="noreferrer" target="_blank">
                  <div className="banner_card">
                    <div className="Banner_cardImage">
                      <img src={hospital.image} alt="" className="sliderItem_img" />
                    </div>
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
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default BannerServices;
