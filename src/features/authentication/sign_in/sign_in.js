import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt } from 'react-icons/bi';

// icon
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { loginUser, fetchLoginUser, fetchOtpInput, clearRedirectPath } from '~/redux/user/authSlice';
import Button from '~/components/Button';
import { Input } from '~/components/input/input';
import '~/translation/i18n';
import { password_validation } from '~/utils/inputValidations';

import style from './sign_in.module.scss';
import Auth from '../auth';

const cx = classNames.bind(style);

function SingIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const redirectPath = useSelector((state) => state.auth.redirectPath);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const password = data.password;
      const res = await dispatch(fetchLoginUser({ phoneNumber, password }));
      const user = unwrapResult(res);
      if (user?.status) {
        navigator('/');
        dispatch(loginUser(res));
        if (redirectPath) {
          navigate(`/${redirectPath}`);
          dispatch(clearRedirectPath());
        } else {
          navigate('/');
        }
      } else {
        toast.warning('Thông tin đăng nhập không chính xác');
      }
    } catch (error) {
      toast.error('lỗi r bạn ơi ');
    } finally {
      setIsSubmitting(false);
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
                <img src={require('~/assets/images/flag/Vn.png')} alt="vietnamese" />
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <BiLoaderAlt className="animate-spin mr-2" />
                Đang xử lý...
              </div>
            ) : (
              t('check-phone.continu')
            )}
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
