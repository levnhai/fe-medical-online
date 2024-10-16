import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import '~/translation/i18n';
// icon
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { loginUser, fetchLoginUser, fetchOtpInput } from '~/redux/user/authSlice';
import Button from '~/components/Button';
import { Input } from '~/components/input/input';
import { password_validation } from '~/utils/inputValidations';

import style from './sign_in.module.scss';
import Auth from '../auth';

const cx = classNames.bind(style);

function SingIn() {
  const { t } = useTranslation();
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  const methods = useForm();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { setFocus } = methods;

  // use state
  const [passwordShowHide, setPasswordShowHide] = useState(true);

  // handle action onChange show hide password
  const handleShowHidePassword = (e) => {
    e.preventDefault();
    setPasswordShowHide(!passwordShowHide);
  };

  // handle Login
  const handleLogin = methods.handleSubmit(async (data) => {
    try {
      const password = data.password;
      const res = await dispatch(fetchLoginUser({ phoneNumber, password }));
      const user = unwrapResult(res);
      if (user?.status) {
        navigator('/');
        dispatch(loginUser(res));
      } else {
        toast.warning('Thông tin đăng nhập không chính xác');
      }
    } catch (error) {
      toast.error('lỗi r bạn ơi ');
    }
  });

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  return (
    <>
      <Auth>
        <div className={cx('login-wrapper')}>
          <p className={cx('text-center')}>{t('login.title')}</p>
          <div className={cx('wrapper-input')}>
            <div className={cx('tel-input')}>
              <input onDoubleClick={null} className={cx('form-control')} value={phoneNumber} disabled />
              <div className={cx('selected-flag')}>
                <img
                  src="https://cdn.icon-icons.com/icons2/4023/PNG/512/vietnam_vn_vnm_vietnamese_flag_icon_255804.png"
                  alt="vietnamese"
                />
              </div>
            </div>
            <div className={cx('tel-input')}>
              <FormProvider {...methods}>
                <Input
                  type={passwordShowHide ? 'password' : ' text'}
                  {...password_validation}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin();
                    }
                  }}
                />
                <span
                  onMouseDown={handleShowHidePassword}
                  onMouseUp={() => setPasswordShowHide(true)}
                  onMouseLeave={() => setPasswordShowHide(true)}
                  className={cx('passwordIcon')}
                >
                  {passwordShowHide ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </FormProvider>
            </div>
          </div>
          <Button
            className={cx('loginBtn')}
            onClick={() => {
              handleLogin();
            }}
          >
            {t('check-phone.continu')}
          </Button>
          <div className={cx('text-right')}>
            <p
              onClick={async () => {
                navigator('/otp-input-forgot');
                await dispatch(fetchOtpInput(phoneNumber));
              }}
              className={cx('forgot-password')}
            >
             {t('login.fogot_pas')}
            </p>
          </div>
        </div>
      </Auth>
    </>
  );
}

export default SingIn;
