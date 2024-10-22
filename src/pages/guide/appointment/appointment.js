import classNames from 'classnames/bind';
import Header from '../component/header';

import { BsCheckLg } from 'react-icons/bs';

import Support from '~/layouts/components/support';
import styles from './appointment.module.scss';

const cx = classNames.bind(styles);
function Appointment() {
  return (
    <div className={cx('guide_refunds')}>
      <Header
        title={'Hướng dẫn đặt khám nhanh'}
        des={'Trải nghiệm dịch vụ chăm sóc sức khỏe tối ưu và đặt lịch khám một cách dễ dàng, nhanh chóng'}
      />
      <div className={cx('refunds_wapper')}>
        <div className={cx('refunds_container')}>
          <div className={cx('refunds_card')}>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>Chọn thông tin đặt khám</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} /> &nbsp; Đăng nhập phần mềm trên web hoặc ứng dụng di động.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Chọn Đặt khám tại cơ sở hoặc Đặt khám theo bác sĩ.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Chọn thông tin khám: Chuyên khoa, bác sĩ, ngày khám, giờ khám và có BHYT hay không.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Nhập thông tin bệnh nhân: Chọn hồ sơ sẵn có hoặc tạo mới hồ sơ.
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>CHỌN/ TẠO MỚI HỒ SƠ BỆNH NHÂN (Bạn được phép tạo tối đa 10 hồ sơ)</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Cách 1: Quét mã BHYT.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp;Cách 2: Nếu đã từng khám ở bệnh viện, nhập số hồ sơ.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp;Cách 3: Chưa từng khám, đăng ký mới (nhập đầy đủ các thông tin: Họ và tên; Ngày sinh; Giới
                    tính; Mã bảo hiểm y tế; CMND/Passport; Dân tộc; Nghề nghiệp; Số điện thoại; Email; Địa chỉ)
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>THANH TOÁN PHÍ KHÁM</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Chọn phương thức thanh toán: Quét mã QR, Chuyển khoản 24/7, Thẻ khám bệnh, Thẻ thanh toán
                    quốc tế hoặc thẻ ATM nội địa hoặc Ví điện tử.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Kiểm tra thông tin thanh toán (phí khám bệnh, phí tiện ích và tổng tiền) và Xác nhận thanh
                    toán.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp;Thực hiện thanh toán trên Ví điện tử hoặc Ứng dụng Ngân hàng hoặc Cổng thanh toán.
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>NHẬN PHIẾU KHÁM ĐIỆN TỬ</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Sau khi thanh toán thành công, bạn sẽ nhận được ngay phiếu khám bệnh điện tử trên ứng dụng
                    (và qua email). Trường hợp đặt khám qua Tổng đài 19002115, vui lòng xem phiếu khám được gửi qua tin
                    nhắn SMS.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={cx('refunds_cardBottom')}>
            <div className={cx('refunds__cardBottom--title')}>Khám và thực hiện cận lâm sàng</div>
            <div className={cx('refunds__cardBottom--content')}>
              <ul>
                <li>
                  Đến ngày khám, người bệnh vui lòng đến trực tiếp phòng khám hoặc quầy tiếp nhận theo như hướng dẫn
                  trên phiếu khám.
                </li>
                <li>Người bệnh được khám lâm sàng theo quy trình của Bệnh viện.</li>
                <li>
                  Nếu có chỉ định cận lâm sàng của bác sĩ, người bệnh thanh toán phí trực tuyến hoặc tại quầy thu ngân
                  của bệnh viện và vào phòng cận lâm sàng để được thực hiện.
                </li>
                <li>
                  Người bệnh quay lại phòng khám ban đầu, sau khi nhận đầy đủ kết quả cận lâm sàng, để được bác sĩ khám,
                  tư vấn và trả kết quả khám (toa thuốc, giấy hẹn khám,...).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('refunds_support')}>
        <Support />
      </div>
    </div>
  );
}

export default Appointment;
