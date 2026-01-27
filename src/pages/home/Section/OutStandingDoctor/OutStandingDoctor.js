import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { Buffer } from 'buffer';
import LazyLoad from 'react-lazyload';

//icon
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import { useGetTopDoctorQuery } from '~/services/doctor.api';

import style from './OutStandingDoctor.module.scss';
const cx = classNames.bind(style);

const Loading = () => <div className={cx('loader')}></div>;

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

function OutStandingDoctor() {
  const { t } = useTranslation();

  const { data } = useGetTopDoctorQuery({ limit: 10 });
  const doctorData = data?.data || [];
  console.log('🚀 ~ OutStandingDoctor ~ data:', data);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // small tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <div className={cx('header-title')}>{t('doctor.featured_doctor')}</div>
          <div></div>
        </div>

        <div>
          <div>
            <Slider {...settings}>
              {doctorData?.map((item, index) => {
                let base64String = '';
                if (item.image) {
                  base64String = Buffer.from(item.image, 'base64').toString('binary');
                }
                return (
                  <LazyLoad key={item._id} placeholder={<Loading />}>
                    <div key={item._id} className={cx('profile')}>
                      <div>
                        <img className={cx('avata')} src={base64String} alt="" />
                      </div>
                      <div className={cx('position')}>
                        <div>{`${
                          item.positionId === 'doctor'
                            ? 'Bác sĩ'
                            : item.positionId === 'mater'
                              ? 'Thạc sĩ'
                              : item.positionId === 'associate professor'
                                ? 'Phó giáo sư'
                                : 'Giáo sư'
                        }, ${item.fullName}`}</div>
                        <span>{item?.specialty?.fullName}</span>
                      </div>
                    </div>
                  </LazyLoad>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutStandingDoctor;
