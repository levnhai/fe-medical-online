import classNames from 'classnames/bind';
import Header from '../component/header';

import Support from '~/layouts/components/support';
import { BsCheckLg } from 'react-icons/bs';

import styles from './refunds.module.scss';

const cx = classNames.bind(styles);
function Refunds() {
  return (
    <div className={cx('guide_refunds')}>
      <Header
        title={'Quy trình hoàn phí an toàn & minh bạch'}
        des={'Chi tiết về cách chúng tôi đảm bảo quyền lợi khách hàng'}
      />
      <div className={cx('refunds_wapper')}>
        <div className={cx('refunds_container')}>
          <div className={cx('refunds_card')}>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>ĐIỀU KIỆN ĐỂ ĐƯỢC HOÀN TIỀN</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Bạn chỉ được hoàn tiền khi thực hiện thành công yêu cầu hủy phiếu khám bệnh trên phần mềm
                    theo yêu cầu quy định
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>CÁC BƯỚC HOÀN TIỀN</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Khi bạn thực hiện việc thanh toán bằng phương thức nào, thì phần mềm hoàn tiền cho bạn bằng
                    đúng phương thức và đúng số tiền đã thanh toán trước đó.
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>THỜI GIAN HOÀN TIỀN</h3>
                </div>
                <ul>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Thẻ khám bệnh: 1 - 30 ngày làm việc.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Thẻ ATM nội địa: 1 - 30 ngày làm việc.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Thẻ tín dụng VISA, MasterCard: 1 - 45 ngày làm việc.
                  </li>
                  <li>
                    <BsCheckLg className={cx('check-icon')} />
                    &nbsp; Tính từ thời điểm bạn thực hiện hủy phiếu khám bệnh thành công, nếu quá thời gian công trên
                    bạn vẫn chưa nhận được tiền hoàn, vui lòng liên hệ tổng đài 1900 2115 chúng tôi sẽ hổ trợ bạn.
                  </li>
                </ul>
              </div>
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

export default Refunds;
