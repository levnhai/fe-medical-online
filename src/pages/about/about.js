import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import '~/translation/i18n';

import styles from './about.module.scss';
import { SliderData1, SliderData2 } from './sliderData';
import { PhoneIcon } from '~/components/Icon';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function About() {
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // change title document
  useEffect(() => {
    document.title = 'Về chúng tôi || Medpro';
  }, []);

  return ( 
    <div className={cx('about','container mx-auto w-full px-4 md:px-6 lg:px-8 overflow-x-hidden')}>
      <div className={cx('about_body')}>
        <div className={cx('bannerWrapper')}>
          <div className={cx('banner_container')}>
            <div className={cx('banner_content')}>
              <div className={cx('banner_img')}></div>
              <div className={cx('banner_title')}>
                <span>{t('about.about_title')}</span>
                <h1>{t('about.about_name')}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('introduct')}>
          <div className={cx('introduct_container')}>
            <div className={cx('introduct_introduce')}>
              <div className={cx('introduce_left', 'w-full')}>
                <div className={cx('introduce_Content')}>
                  <h1>{t('about.about')}</h1>
                  <p>
                    {t('about.about_description')}
                  </p>
                </div>
                <div className={cx('introduce_Service')}>
                  <div className={cx('Service_item')}>
                    <h2> 1 </h2>
                    <p>
                      <strong>{t('about.option.0')}</strong>
                      {t('about.option.1')}
                    </p>
                  </div>
                  <div className={cx('Service_item')}>
                    <h2> 2 </h2>
                    <p>
                      <strong>{t('about.option.2')}</strong>
                      {t('about.option.3')}
                    </p>
                  </div>
                  <div className={cx('Service_item')}>
                    <h2> 3 </h2>
                    <p>
                      <strong>{t('about.option.4')} </strong>
                      {t('about.option.5')}
                    </p>
                  </div>
                  <div className={cx('Service_item')}>
                    <h2> 4 </h2>
                    <p>
                      <strong>{t('about.option.6')}</strong>
                      {t('about.option.7')}
                    </p>
                  </div>
                </div>
              </div>
              <div className={cx('introduce_right')}>
                <div className={cx('introduce_rightImage')}> </div>
              </div>
            </div>
            <div className={cx('introduct_culture')}>
              <div className={cx('culture_img')}></div>
              <div className={cx('culture_content')}>
                <div className={cx('culture_contentItem')}>
                  <h1 className={cx('culture_title')}>{t('about.vision')}</h1>
                  <p className={cx('culture_des')}>
                  {t('about.vision_description')}
                  </p>
                </div>
                <div className={cx('culture_contentItem')}>
                  <h1 className={cx('culture_title')}>{t('about.mission')}</h1>
                  <p className={cx('culture_des')}>
                  {t('about.mission_description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('philosophy')}>
          <div className={cx('philosophy_img')}></div>
          <div className={cx('philosophy_content')}>
            <div className={cx('philosophy_title')}>{t('about.product_service')}</div>
            <div className={cx('philosophy_des')}>
            {t('about.product_service_description')}
            </div>
          </div>
          <div className={cx('philosophy_introduct')}>
            <div className={cx('philosophy_introductBg')}></div>
            <div className={cx('philosophy_introductImgPhone')}></div>
            <div className={cx('philosophy_introductLocation1')}>
              <div className={cx('philosophy_detail')}>
                <h2> 1 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>{t('about.app_option.0')}</div>
                  <div className={cx('philosophy_detail_des')}>
                  {t('about.app_option.1')}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('philosophy_introductLocation2')}>
              <div className={cx('philosophy_detail')}>
                <h2> 2 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>{t('about.app_option.2')}</div>
                  <div className={cx('philosophy_detail_des')}>
                  {t('about.app_option.3')}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('philosophy_introductLocation3')}>
              <div className={cx('philosophy_detail')}>
                <h2> 3 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>{t('about.app_option.4')}</div>
                  <div className={cx('philosophy_detail_des')}>
                  {t('about.app_option.5')}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('philosophy_introductLocation4')}>
              <div className={cx('philosophy_detail')}>
                <h2> 4 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>{t('about.app_option.6')}</div>
                  <div className={cx('philosophy_detail_des')}>
                  {t('about.app_option.7')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('hopital')}>
          <div className={cx('hopital_wapper')}>
            <div>
              <h2 className={cx('hopital_title')}>{t('about.hospital')}</h2>
              <div className={cx('hopital_Listlogo')}>
                <Slider {...settings}>
                  <div className={cx('hopital_sliderItem')}>
                    {SliderData1.map((slide) => {
                      return (
                        <div className={cx('hopital_logo')}>
                          <img src={slide.image} alt="" className={cx('hopital_img')} />
                        </div>
                      );
                    })}
                  </div>
                  <div className={cx('hopital_sliderItem')}>
                    {SliderData2.map((slide) => {
                      return (
                        <div className={cx('hopital_logo')}>
                          <img src={slide.image} alt="" className={cx('hopital_img')} />
                        </div>
                      );
                    })}
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('support')}>
          <div className={cx('support_image')}></div>
          <div className={cx('support_method')}>
            <div></div>
            <div className={cx('support_info')}>
              <div className={cx('info_phoneIcon')}>
                <PhoneIcon />
              </div>
              <div>
                <div className={cx('support_infoTitle')}>{t('about.hotline')}</div>
                <div className={cx('support_infoPhone')}>1900-2115</div>
              </div>
            </div>
            <div className={cx('support_qrCard')}>
              <div className={cx('support_qr')}>
                <img
                  alt=""
                  src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F038be8dc-47bd-43a8-a1a4-fb5e5e804b1a-zalo.png&w=1920&q=75"
                />
                Zalo
              </div>
              <div className={cx('support_qr')}>
                <img
                  alt=""
                  src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F038be8dc-47bd-43a8-a1a4-fb5e5e804b1a-zalo.png&w=1920&q=75"
                />
                Facebook
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
