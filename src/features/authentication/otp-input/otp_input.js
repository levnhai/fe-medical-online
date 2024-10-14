import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

// icon
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

// redux
import { fetchVerifyOtp, fetchOtpInput } from '~/redux/user/authSlice';

import Auth from '../auth';
import Button from '~/components/Button';
import style from './otp_input.module.scss';

const cx = classNames.bind(style);

function OtpInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  console.log('check location', location.pathname);

  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  const [otpInput, setOtpInput] = useState('');
  const [showAccordion, setShowAccordion] = useState(false);
  const pathName = location.pathname;

  const handleverifyOtp = async () => {
    const res = await dispatch(fetchVerifyOtp({ phoneNumber, otpInput }));
    const verify = unwrapResult(res);
    console.log('check verifyOtp', verify);
    if (verify?.status) {
      pathName === '/otp-input' ? navigate('/register-account') : navigate('/new-password');
    } else {
      toast.warning(verify?.message);
    }
  };

  // otpInput send code
  useEffect(() => {
    const inputSendCode = document.querySelectorAll(`.${style.otpInput}`);
    const btnOTP = document.querySelector(`.${style.otpBtn}`);

    function focusNext(currentInput) {
      const maxLength = parseInt(currentInput.maxLength, 10);
      const currentInputIndex = Array.from(inputSendCode).indexOf(currentInput);

      if (currentInput.value.length === maxLength) {
        const nextInput = inputSendCode[currentInputIndex + 1];
        if (nextInput) {
          nextInput.removeAttribute('disabled');
          nextInput.focus();
        } else {
          btnOTP.classList.remove(style.disabled);
          setOtpInput(getOTP());
        }
      }
    }

    function focusPrevious(currentInput) {
      const currentInputIndex = Array.from(inputSendCode).indexOf(currentInput);
      if (currentInput.value.length === 0) {
        const previousInput = inputSendCode[currentInputIndex - 1];
        if (previousInput) {
          previousInput.focus();
          btnOTP.classList.add(style.disabled);
        }
      }
    }

    function getOTP() {
      return Array.from(inputSendCode)
        .map((input) => input.value)
        .join('');
    }

    inputSendCode.forEach((input) => {
      input.addEventListener('input', function () {
        focusNext(input);
      });

      input.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' || event.key === 'delete') {
          focusPrevious(input);
        }
      });
    });

    inputSendCode[0].focus();
  }, []);

  return (
    <Auth>
      <div className={cx('wrapper-otp')}>
        <div className={cx('otp-content')}>
          <h4 className={cx('tag-header')}>XIN CHÀO!</h4>
          <p className={cx('customFotnSize')}>Vui lòng nhập mã 6 số đã gửi cho bạn qua số điện thoại.</p>
          <div className={cx('tel-input')}>
            <input className={cx('form-control', 'disable-form')} value={phoneNumber} disabled />
            <div className={cx('selected-flag')}>
              <img
                src="https://cdn.icon-icons.com/icons2/4023/PNG/512/vietnam_vn_vnm_vietnamese_flag_icon_255804.png"
                alt="vietnamese"
              />
            </div>
          </div>
          <p className={cx('errorMessage')}></p>
          <form className={cx('otpInputWapper')}>
            <input className={cx('otpInput')} type="tel" maxLength={1} />

            <input className={cx('otpInput')} type="tel" maxLength={1} disabled />

            <input className={cx('otpInput')} type="tel" maxLength={1} disabled />

            <input className={cx('otpInput')} type="tel" maxLength={1} disabled />

            <input className={cx('otpInput')} type="tel" maxLength={1} disabled />

            <input
              className={cx('otpInput')}
              type="tel"
              maxLength={1}
              disabled={false}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleverifyOtp();
                }
              }}
            />
          </form>
          <p className={cx('errorMessage')}></p>
          <Button
            className={cx('otpBtn', 'disabled')}
            onClick={() => {
              handleverifyOtp();
            }}
          >
            Xác thực
          </Button>

          <div className={cx('card')}>
            <div>
              <div
                onClick={() => {
                  setShowAccordion(!showAccordion);
                }}
                className={cx('resendCode')}
              >
                {showAccordion ? <FaAngleDown /> : <FaAngleRight />}
                Bạn không nhận được mã xác nhận?
              </div>
            </div>
            {showAccordion && (
              <div className={cx('collapse')}>
                <div className={cx('wrapper--collapse__content')}>
                  <p className={cx('collapse--title')}>Nếu bạn không nhận được mã: </p>
                  <p className={cx('collapse--des')}>
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    Xác minh số điện thoại của bạn: <strong>{phoneNumber}</strong>
                  </p>
                  <p className={cx('collapse--des')}>
                    <i className="fa-solid fa-comment-sms"></i>
                    Kiểm tra hộp thư SMS của bạn
                  </p>
                  <div>
                    <Button
                      className={cx('collapseBtn')}
                      onClick={() => {
                        dispatch(fetchOtpInput(phoneNumber));
                      }}
                    >
                      Gửi lại mã xác nhận
                    </Button>
                    <Button className={cx('collapseBtn')} to={'/check-phone'}>
                      Đây không phải là số điện thoại của tôi
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default OtpInput;
