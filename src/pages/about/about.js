import Slider from 'react-slick';
import classNames from 'classnames/bind';

import styles from './about.module.scss';
import { SliderData1, SliderData2 } from './sliderData';
import { PhoneIcon } from '~/components/Icon';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function About() {
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
    <div className={cx('about')}>
      <div className={cx('about_body')}>
        <div className={cx('bannerWrapper')}>
          <div className={cx('banner_container')}>
            <div className={cx('banner_content')}>
              <div className={cx('banner_img')}></div>
              <div className={cx('banner_title')}>
                <span>Chào mừng bạn đến với</span>
                <h1>CÔNG TY CỔ PHẦN ỨNG DỤNG PKH</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('introduct')}>
          <div className={cx('introduct_container')}>
            <div className={cx('introduct_introduce')}>
              <div className={cx('introduce_left')}>
                <div className={cx('introduce_Content')}>
                  <h1>Giới thiệu về PKH</h1>
                  <p>
                    Ứng dụng này giúp người bệnh và thân nhân người bệnh có thể thực hiện trực tuyến quá trình đăng ký{' '}
                    khám bệnh tại bệnh viện ở mọi lúc mọi nơi mà không cần tới bệnh viện.
                  </p>
                </div>
                <div className={cx('introduce_Service')}>
                  <div className={cx('Service_item')}>
                    <h2> 1 </h2>
                    <p>
                      <strong>Đăng ký chọn ngày,</strong>
                      giờ khám bệnh
                    </p>
                  </div>
                  <div className={cx('Service_item')}>
                    <h2> 2 </h2>
                    <p>
                      <strong>Thanh toán chi phí </strong>
                      không dùng tiền mặt
                    </p>
                  </div>
                  <div className={cx('Service_item')}>
                    <h2> 3 </h2>
                    <p>
                      <strong>Quản lý cuộc hẹn </strong>
                      khám bệnh và tái khám
                    </p>
                  </div>
                  <div className={cx('Service_item')}>
                    <h2> 4 </h2>
                    <p>
                      <strong>Quản lý thông tin, </strong>
                      Dữ liệu của người bệnh
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
                  <h1 className={cx('culture_title')}>Tầm nhìn</h1>
                  <p className={cx('culture_des')}>
                    PKH trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam và khu vực Đông Nam Á giúp
                    kết nối các dịch vụ y tế đến rộng rãi người dân, mang lại hiệu quả đột phá cho đơn vị y tế, cũng như
                    những trải nghiệm tiện nghi, hài lòng cho bệnh nhân trong khám chữa bệnh và chăm sóc sức khỏe cá
                    nhân.
                  </p>
                </div>
                <div className={cx('culture_contentItem')}>
                  <h1 className={cx('culture_title')}>Sứ mệnh</h1>
                  <p className={cx('culture_des')}>
                    PKH cung cấp nền tảng Medpro - giải pháp tiếp cận y tế thông minh mang đến cho người dùng những
                    phương thức chăm sóc sức khỏe mới, ở bất cứ không gian - thời gian nào thông qua nền tảng trực tuyến
                    tương tác cao, kết nối với các cơ sở y tế hàng đầu cùng đội ngũ chuyên gia y tế đông đảo, tận tình,
                    giàu kinh nghiệm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('philosophy')}>
          <div className={cx('philosophy_img')}></div>
          <div className={cx('philosophy_content')}>
            <div className={cx('philosophy_title')}>Triết lý sản phẩm - dịch vụ</div>
            <div className={cx('philosophy_des')}>
              Với triết lý người dùng làm trung tâm, giải pháp Medpro được thiết kế mang trải nghiệm tốt nhất cho người
              dùng thông qua việc sử dụng các tài nguyên và đặc điểm nhiều công nghệ số
            </div>
          </div>
          <div className={cx('philosophy_introduct')}>
            <div className={cx('philosophy_introductBg')}></div>
            <div className={cx('philosophy_introductImgPhone')}></div>
            <div className={cx('philosophy_introductLocation1')}>
              <div className={cx('philosophy_detail')}>
                <h2> 1 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>Vì sức khỏe cộng đồng</div>
                  <div className={cx('philosophy_detail_des')}>
                    mục đích chăm sóc sức khỏe là mang lại cho mỗi người lối sống lành mạnh, sức khỏe tốt
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('philosophy_introductLocation2')}>
              <div className={cx('philosophy_detail')}>
                <h2> 2 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>Rộng mở</div>
                  <div className={cx('philosophy_detail_des')}>
                    Mọi người đều có quyền bình đẳng về tiếp cận dịch vụ chăm sóc sức khỏe
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('philosophy_introductLocation3')}>
              <div className={cx('philosophy_detail')}>
                <h2> 3 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>Thực hiện</div>
                  <div className={cx('philosophy_detail_des')}>
                    Người dùng được tiếp cận với các dịch vụ chăm sóc sức khỏe phù hợp
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('philosophy_introductLocation4')}>
              <div className={cx('philosophy_detail')}>
                <h2> 4 </h2>
                <div className={cx('philosophy_detail_content')}>
                  <div className={cx('philosophy_detail_title')}>Hợp tác</div>
                  <div className={cx('philosophy_detail_des')}>
                    Trong tiến trinh chuyển đổi số hiện nay các CSYT cần hợp tác, mở rộng dịch vụ tiện ích phục vụ người
                    dùng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('hopital')}>
          <div className={cx('hopital_wapper')}>
            <div>
              <h2 className={cx('hopital_title')}>Các bệnh viện tiêu biểu</h2>
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
                <div className={cx('support_infoTitle')}>CÁC HÌNH THỨC HỖ TRỢ</div>
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
