import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import styles from './contact.module.scss';
import Button from '~/components/Button';
import { useCreateContactMutation } from '~/services/contact.api';

import className from 'classnames/bind';
const cx = className.bind(styles);

function Contact() {
  const [createContact, { isLoading, isSuccess, error, data }] = useCreateContactMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    note: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        note: '',
      });
      setFormErrors({});
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập tên';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = 'Email không hợp lệ';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await createContact(formData).unwrap();
  };

  // Handle response
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || 'Gửi thông tin thành công');
      toast.success('Gửi thông tin thành công');
      toggleModal();
    }
    if (error) {
      toast.error(error);
    }
  }, [isSuccess, error]);

  return (
    <>
      {/* Mobile button */}
      <div className={cx('mobile-contact')}>
        <Button rounded className={cx('mobile-contact-btn')} onClick={toggleModal}>
          Liên hệ hợp tác
        </Button>
      </div>

      {/* Contact form - desktop and modal */}
      <div className={cx('facilitie__contact', { 'is-modal': isModalOpen })}>
        <div className={cx('facilitie__contact--card')}>
          {isModalOpen && (
            <button className={cx('modal-close')} onClick={toggleModal} aria-label="Close modal">
              ✕
            </button>
          )}
          <div className={cx('facilitie__contact--header')}>
            <div className={cx('facilitie__contact--title')}>Liên hệ hợp tác</div>
          </div>
          <div className={cx('facilitie__contact--fromContact')}>
            <form className={cx('facilitie__contact--from')} onSubmit={handleSubmit}>
              {formErrors.fullName && <span className={cx('error-message')}>{formErrors.fullName}</span>}
              <div className={cx('facilitie__contact--fromInputItem')}>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Tên đơn vị/ Người liên hệ"
                />
              </div>
              {formErrors.email && <span className={cx('error-message')}>{formErrors.email}</span>}
              <div className={cx('facilitie__contact--fromInputItem')}>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              {formErrors.phoneNumber && <span className={cx('error-message')}>{formErrors.phoneNumber}</span>}
              <div className={cx('facilitie__contact--fromInputItem')}>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                />
              </div>
              <div className={cx('facilitie__contact--fromInputItem')}>
                <textarea name="note" value={formData.note} onChange={handleInputChange} placeholder="Ghi chú" />
              </div>
              <Button rounded className={cx('facilitie__contact--btn')} type="submit" disabled={isLoading}>
                {isLoading ? 'Đang gửi...' : 'Gửi'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {isModalOpen && <div className={cx('modal-overlay')} onClick={toggleModal} />}
    </>
  );
}

export default Contact;
