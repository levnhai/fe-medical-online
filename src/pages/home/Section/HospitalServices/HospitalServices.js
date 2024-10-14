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
  const settings = {
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

  console.log('check HospitalData', HospitalData);

  const Loading = () => <div className={cx('loader')}></div>;

  return (
    <div className="home_listHospital">
      <Slider {...settings}>
        {HospitalData.map((hopital, index) => {
          return (
            <LazyLoad key={hopital._id} placeholder={<Loading />}>
              <div key={index} className="hopital_sliderItem">
                <a href={hopital.link} key={index} rel="noreferrer" target="_blank">
                  <div className="hopital_card">
                    <div className="hopital_cardImage">
                      <img src={hopital.image} key={index} alt="" className="sliderItem_img" />
                    </div>
                    <Button className="sliderItem_btn" rounded>
                      {hopital.name}
                    </Button>
                    <p className="sliderItem_des">{hopital.des}</p>
                  </div>
                </a>
              </div>
            </LazyLoad>
          );
        })}
      </Slider>
    </div>
  );
}

export default HospitalServices;
