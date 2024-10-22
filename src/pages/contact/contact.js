import className from 'classnames/bind';
import styles from './contact.module.scss';
import Button from '~/components/Button';

const cx = className.bind(styles);
function Contact() {
  return (
    <div className={cx('facilitie__contact')}>
      <div className={cx('facilitie__contact--card')}>
        <div className={cx('facilitie__contact--header')}>
          <div className={cx('facilitie__contact--title')}>Liên hệ hợp tác</div>
        </div>
        <div className={cx('facilitie__contact--fromContact')}>
          <form className={cx('facilitie__contact--from')}>
            <div className={cx('facilitie__contact--fromInputItem')}>
              <input placeholder="Tên đơn vị/ Người liên hệ" />
            </div>
            <div className={cx('facilitie__contact--fromInputItem')}>
              <input placeholder="Email" />
            </div>
            <div className={cx('facilitie__contact--fromInputItem')}>
              <input placeholder="Số điện thoại" />
            </div>
            <div className={cx('facilitie__contact--fromInputItem')}>
              <textarea placeholder="ghi chú" />
            </div>
            <Button rounded className={cx('facilitie__contact--btn')}>
              Gửi
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
