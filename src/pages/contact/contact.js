import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './contact.module.scss';
import Button from '~/components/Button';

const cx = className.bind(styles);

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Mobile button */}
      <div className={cx('mobile-contact')}>
        <Button 
          rounded 
          className={cx('mobile-contact-btn')}
          onClick={toggleModal}
        >
          Liên hệ hợp tác
        </Button>
      </div>

      {/* Contact form - desktop and modal */}
      <div className={cx('facilitie__contact', { 'is-modal': isModalOpen })}>
        <div className={cx('facilitie__contact--card')}>
          {isModalOpen && (
            <button 
              className={cx('modal-close')}
              onClick={toggleModal}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
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
                <textarea placeholder="Ghi chú" />
              </div>
              <Button rounded className={cx('facilitie__contact--btn')}>
                Gửi
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div 
          className={cx('modal-overlay')}
          onClick={toggleModal}
        />
      )}
    </>
  );
}

export default Contact;