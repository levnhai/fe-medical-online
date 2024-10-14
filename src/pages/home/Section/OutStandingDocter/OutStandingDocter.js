import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { useEffect } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Buffer } from 'buffer';
import LazyLoad from 'react-lazyload';

import Button from '~/components/Button';
import { fetchTopDoctors } from '~/redux/docter/docterSlice';
import style from './OutStandingDocter.module.scss';

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

function OutStandingDocter() {
  const dispatch = useDispatch();
  const topDoctors = useSelector((state) => state.docter.topDoctors);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Select data from store
  useEffect(() => {
    dispatch(fetchTopDoctors(10));
  }, [dispatch]);

  return (
    <div className={cx('wapper')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <div className={cx('header-title')}>Bác sỹ nổi bật trong tuần qua</div>
          <div className={cx('header-seeMoreBtn')}>
            <Button>Xem thêm</Button>
          </div>
        </div>

        <div>
          <div>
            <Slider {...settings}>
              {topDoctors?.map((item, index) => {
                let base64String = '';
                if (item.image) {
                  base64String = Buffer.from(item.image, 'base64').toString('binary');
                }
                return (
                  <LazyLoad key={item._id} placeholder={<Loading />}>
                    <div key={item._id} className={cx('profile')}>
                      {/* <LazyLoad key={item._id} placeholder={<Loading />}> */}
                      <div>
                        <img className={cx('avata')} src={base64String} alt="" />
                      </div>
                      {/* </LazyLoad> */}
                      <div className={cx('position')}>
                        <div>{`${item.positionIdData[0].valueVi}, ${item.fullName}`}</div>
                        <span>tai mũi họng</span>
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

export default OutStandingDocter;
