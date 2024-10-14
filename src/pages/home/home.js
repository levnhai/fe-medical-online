import classNames from 'classnames/bind';

import HospitalServices from './Section/HospitalServices';
import HealthServices from './Section/HealthServices';
import Button from '~/components/Button';
import Support from '~/layouts/components/support';
import OutStandingDocter from './Section/OutStandingDocter';
import { ImageMedia } from './Section/ImageMediaData';

import {
  VisitsIcon,
  HospitalIcon,
  DocterServiceIcon,
  DocterIcon,
  HealthIcon,
  EyeIcon,
  ArowIcon,
} from '~/components/Icon';
import { GoArrowRight } from 'react-icons/go';
import { PiCaretDoubleRightThin } from 'react-icons/pi';

import style from './home.module.scss';
const cx = classNames.bind(style);

function Home() {
  return (
    <div className={cx('home')}>
      <div className={cx('home_header')}>
        <div className={cx('home_header_banner')}>
          <div className={cx('banner_wrapper')}>
            <div className={cx('banner_content')}>
              <div className={cx('content_tag')}>Nền tảng công nghệ</div>
              <div className={cx('content_title')}>
                <div>Kết nối người dân với </div>
                <div>Cơ sở - dịch vụ y tế</div>
              </div>
              <div className={cx('content_des')}>
                Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn khám sức khỏe từ xa
              </div>
              <div>
                <Button className={cx('content_btn')} rounded>
                  Đặt khám ngay
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className={cx('healthServices')}>
          <HealthServices />
        </div>
      </div>
      <div className={cx('home_container')}>
        <div className={cx('home_info')}>
          <div className={cx('info_header')}>
            <div className={cx('info_header_title')}>
              <div className={cx('info_header_text')}>MEDICAL</div>
              <div className={cx('info_header_tag')}>Đặt lịch khám bệnh</div>
            </div>
            <div className={cx('info_header_des')}>
              <b>Medical </b>
              cung cấp dịch vụ đặt khám nhan, lấy số thứ tự trực tuyến và tư vấn sức khỏe từ xa tại các cơ sở hàng đầu
              Việt Nam như bệnh viện đại học y dưỡng Tp. Hồ Chí Minh, bệnh viện Chợ Rẩy, bệnh viện Nhi Đồng...
            </div>
          </div>
          <div className={cx('home_card')}>
            <div className={cx('home_cardTitle')}>
              <div className={cx('cardTitle_img')}></div>
              <div className={cx('cardTitle_title')}>Đặt khám nhanh</div>
              <div className={cx('cardTitle_des')}>
                Đặt khám nhanh, thanh toán, lấy số thứ tự trực tuyến tiết kiệm thời gian và công sức
              </div>
              <div className={cx('cardTitle_btn')}>
                <Button
                  rounded
                  rightIcon={<GoArrowRight style={{ width: '1.8rem', height: '1.8rem' }} />}
                  className={cx('seeMore_btn')}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
            <div className={cx('home_cardTitle')}>
              <div className={cx('cardTitle_img')}></div>
              <div className={cx('cardTitle_title')}>Đặt khám nhanh</div>
              <div className={cx('cardTitle_des')}>
                Đặt khám nhanh, thanh toán, lấy số thứ tự trực tuyến tiết kiệm thời gian và công sức
              </div>
              <div className={cx('cardTitle_btn')}>
                <Button
                  rounded
                  rightIcon={<GoArrowRight style={{ width: '1.8rem', height: '1.8rem' }} />}
                  className={cx('seeMore_btn')}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
            <div className={cx('home_cardTitle')}>
              <div className={cx('cardTitle_img')}></div>
              <div className={cx('cardTitle_title')}>Đặt khám nhanh</div>
              <div className={cx('cardTitle_des')}>
                Đặt khám nhanh, thanh toán, lấy số thứ tự trực tuyến tiết kiệm thời gian và công sức
              </div>
              <div className={cx('cardTitle_btn')}>
                <Button
                  rounded
                  rightIcon={<GoArrowRight style={{ width: '1.8rem', height: '1.8rem' }} />}
                  className={cx('seeMore_btn')}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('home_statistic')}>
          <h1 className={cx('statistic_title')}>Số liệu thống kê</h1>
          <ul className={cx('statistic_list')}>
            <li className={cx('statistic_item')}>
              <div className={cx('statistic_image')}>
                <VisitsIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>2.2M+</div>
                <div className={cx('statistic_tag')}>Lượt khám</div>
              </div>
            </li>

            <li className={cx('statistic_item')}>
              <div className={cx('statistic_image')}>
                <HospitalIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>30+</div>
                <div className={cx('statistic_tag')}>Bệnh viện</div>
              </div>
            </li>

            <li className={cx('statistic_item')}>
              <div className={cx('statistic_image')}>
                <HealthIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>50+</div>
                <div className={cx('statistic_tag')}>Cơ sở y tế</div>
              </div>
            </li>

            <li className={cx('statistic_item')}>
              <div className={cx('statistic_image')}>
                <DocterIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>200+</div>
                <div className={cx('statistic_tag')}>Bác sĩ</div>
              </div>
            </li>

            <li className={cx('statistic_item')}>
              <div className={cx('statistic_image')}>
                <ArowIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>25.4k+</div>
                <div className={cx('statistic_tag')}>Lượt truy cập tháng</div>
              </div>
            </li>

            <li className={cx('statistic_item')}>
              <div className={cx('statistic_image')}>
                <EyeIcon />
              </div>
              <div className={cx('statistic_content')}>
                <div className={cx('statistic_number')}>823</div>
                <div className={cx('statistic_tag')}>Lượt truy cập ngày</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx('home_hospitalDeloy')}>
        <div className={cx('home_hospotalContent')}>
          <h1 className={cx('hospotalContent_title')}>Hệ thống bệnh viện triển khai</h1>
          <span className={cx('hospotalContent_des')}>Đặt lịch khám với hơn 50 bệnh nhân trên khắp cả nước</span>
        </div>
        <HospitalServices />
      </div>
      <div className={cx('home_bookingInfo')}>
        <div className={cx('bookingInfo_image')}></div>
        <div className={cx('bookingInfo_content')}>
          <div className={cx('bookingInfo_title')}>Đặt khám nhanh - lấy số thứ tự trực tuyến</div>
          <div className={cx('bookingInfo_des')}>
            Bệnh nhân chủ động chọn thông tin đặt khám nhanh(ngày tháng, giờ khám và cơ sở y tế) . Bệnh nhân sẽ nhận số
            thứ tự trực tuyến ngay trên phần mềm
          </div>
          <Button className={cx('bookingInfo_btn')} rounded>
            Đặt khám ngay
          </Button>
        </div>
      </div>
      <div id="downloadBtn" className={cx('home_download')}>
        <div className={cx('download_header')}>
          <h1 className={cx('download_title')}>
            Tải ứng dụng đặt khám nhanh <span>MEDICAL</span>
          </h1>
          <div className={cx('download_groupBtn')}>
            <div>
              <a href="https://apps.apple.com/us/app/id1481561748" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.appsessment.com/img/apple_app_store.png"
                  alt="download-btnIOs"
                  className={cx('download_btn')}
                />
              </a>
            </div>
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=vn.com.medpro"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.appsessment.com/img/google_play_store.png"
                  alt="download-btnGooglePlay"
                  className={cx('download_btn')}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={cx('download_service')}>
          <div className={cx('download_serviceInfo')}>
            <ul className={cx('serviceInfo_list')}>
              <li className={cx('service_item')}>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>lấy số thứ tự khám nhanh trực tuyến</h3>
                  <div className={cx('service_des')}>
                    <p> Đăng ký khám/ Tái khám nhanh theo ngày đăng ký</p>
                    <p> Theo bác sĩ chuyên khoa</p>
                    <p>Tái khám theo lịch hẹn</p>
                  </div>
                </div>
                <div className={cx('service_image')}>
                  <DocterServiceIcon />
                </div>
              </li>
              <li className={cx('service_item')}>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>lấy số thứ tự khám nhanh trực tuyến</h3>
                  <div className={cx('service_des')}>
                    <p> Đăng ký khám/ Tái khám nhanh theo ngày đăng ký</p>
                    <p> Theo bác sĩ chuyên khoa</p>
                    <p>Tái khám theo lịch hẹn</p>
                  </div>
                </div>
                <div className={cx('service_image')}>
                  <DocterServiceIcon />
                </div>
              </li>
              <li className={cx('service_item')}>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>lấy số thứ tự khám nhanh trực tuyến</h3>
                  <div className={cx('service_des')}>
                    <p> Đăng ký khám/ Tái khám nhanh theo ngày đăng ký</p>
                    <p> Theo bác sĩ chuyên khoa</p>
                    <p>Tái khám theo lịch hẹn</p>
                  </div>
                </div>
                <div className={cx('service_image')}>
                  <DocterServiceIcon />
                </div>
              </li>
            </ul>
          </div>
          <div className={cx('serviceInfo_backgroundCenter')}>
            <div className={cx('backgroundCenter_circle')}></div>
            <div className={cx('backgroundCenter_phone')}></div>
          </div>
          <div className={cx('download_serviceInfo')}>
            <ul className={cx('serviceInfo_list')}>
              <li className={cx('service_item', 'service_itemRight')}>
                <div className={cx('service_image')}>
                  <DocterServiceIcon />
                </div>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>lấy số thứ tự khám nhanh trực tuyến</h3>
                  <div className={cx('service_des')}>
                    <p> Đăng ký khám/ Tái khám nhanh theo ngày đăng ký</p>
                    <p> Theo bác sĩ chuyên khoa</p>
                    <p>Tái khám theo lịch hẹn</p>
                  </div>
                </div>
              </li>
              <li className={cx('service_item', 'service_itemRight')}>
                <div className={cx('service_image')}>
                  <DocterServiceIcon />
                </div>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>lấy số thứ tự khám nhanh trực tuyến</h3>
                  <div className={cx('service_des')}>
                    <p> Đăng ký khám/ Tái khám nhanh theo ngày đăng ký</p>
                    <p> Theo bác sĩ chuyên khoa</p>
                    <p>Tái khám theo lịch hẹn</p>
                  </div>
                </div>
              </li>
              <li className={cx('service_item', 'service_itemRight')}>
                <div className={cx('service_image')}>
                  <DocterServiceIcon />
                </div>
                <div className={cx('service_content')}>
                  <h3 className={cx('service_title')}>lấy số thứ tự khám nhanh trực tuyến</h3>
                  <div className={cx('service_des')}>
                    <p> Đăng ký khám/ Tái khám nhanh theo ngày đăng ký</p>
                    <p> Theo bác sĩ chuyên khoa</p>
                    <p>Tái khám theo lịch hẹn</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('home_media')}>
        <div className={cx('media_header')}>
          <h2>Ghi nhận từ truyền thông</h2>
          <span>Sự lợi ích của ứng dụng đặt khám nhanh Medpro đã được ghi nhận rộng rãi</span>
        </div>
        <div className={cx('media_listLogo')}>
          {ImageMedia &&
            ImageMedia.map((item, index) => {
              return (
                <div key={index}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <img key={index} src={item.imageUrl} alt="item.alt" className={cx('media_logo')} />
                  </a>
                </div>
              );
            })}
        </div>
        <div>
          <iframe
            width="760"
            height="415"
            src="https://www.youtube.com/embed/zfmhCJgWx8Y?si=QLz1NFw-RFvjrFqO"
            title="YouTube video player"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={cx('media_video')}
          ></iframe>
        </div>
      </div>
      <div className={cx('outstanding-doctor')}>
        <OutStandingDocter />
      </div>
      <div className={cx('home_news')}>
        <h2 className={cx('new_title')}>Tin tức y tế</h2>
        <div className={cx('new_card')}>
          <div className={cx('new_cardLeft')}>
            <div className={cx('cardLeft_image')}></div>
            <div className={cx('cardLeft_title')}>
              Khám bệnh tâm thần online - hỗ trợ tâm lý chất lượng không lo quá tải
            </div>
            <div className={cx('cardLeft_tag')}>05/09/2023, 17:50 - Hải lê </div>
            <div className={cx('cardLeft_des')}>
              Tự động hóa và tiến bộ công nghệ đã mang lại sự phát triển đáng kể trong nhiều lĩnh vực , và lĩnh vực y tế
              không phải là ngoại lệ. Ứng dụng công nghệ trong hoạt động khám chữa bệnh tâm thần, tâm lý trực tuyến ,
              trung tâm y khoa Vạn Hạnh thu hút nhiều bệnh nhân ở xa, không tiện dị chuyển tới cở sở y tế đăng ký thăm
              khám.
            </div>
          </div>
          <div className={cx('new_cardRight')}>
            <div className={cx('cardRight_item')}>
              <div className={cx('cardRight_image')}></div>
              <div className={cx('cardRight_title')}>Sổ tay đăng ký khám bệnh viện Từ Dủ</div>
              <div className={cx('cardRight_tag')}>12/9/2023 - 12:00</div>
            </div>
            <div className={cx('cardRight_item')}>
              <div className={cx('cardRight_image')}></div>
              <div className={cx('cardRight_title')}>Sổ tay đăng ký khám bệnh viện Từ Dủ</div>
              <div className={cx('cardRight_tag')}>12/9/2023 - 12:00</div>
            </div>
            <div className={cx('cardRight_item')}>
              <div className={cx('cardRight_image')}></div>
              <div className={cx('cardRight_title')}>Sổ tay đăng ký khám bệnh viện Từ Dủ</div>
              <div className={cx('cardRight_tag')}>12/9/2023 - 12:00</div>
            </div>
            <div className={cx('cardRight_item')}>
              <div className={cx('cardRight_image')}></div>
              <div className={cx('cardRight_title')}>Sổ tay đăng ký khám bệnh viện Từ Dủ</div>
              <div className={cx('cardRight_tag')}>12/9/2023 - 12:00</div>
            </div>
          </div>
        </div>
        <div className={cx('new_viewMore')}>
          <Button rounded rightIcon={<PiCaretDoubleRightThin />}>
            Xem thêm
          </Button>
        </div>
      </div>
      <div className={cx('home-support')}>
        <Support />
      </div>
    </div>
  );
}

export default Home;
