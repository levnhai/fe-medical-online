import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin, facebookLogin } from '~/redux/user/authSlice';
import ReactFacebookLogin from 'react-facebook-login';
import { BiLoaderAlt } from 'react-icons/bi';

import Button from '~/components/Button';
import { Input } from '~/components/input/input';
import { phone_validation } from '~/utils/inputValidations';
import { phoneNumber } from '~/redux/user/authSlice';
import { fetchCheckPhone, fetchOtpInput } from '~/redux/user/authSlice';
import { useTranslation } from 'react-i18next';

import '~/translation/i18n';

import style from './checkPhone.module.scss';
import Auth from '../auth';

const cx = classNames.bind(style);

function CheckPhone() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm();
  const { setFocus } = methods;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleBtnLogin = methods.handleSubmit(async (data) => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const res = await dispatch(fetchCheckPhone(data.phoneNumber));
      const checkPhone = unwrapResult(res);

      dispatch(phoneNumber(data.phoneNumber));
      if (checkPhone.exists) {
        navigate('/login');
      } else {
        await dispatch(fetchOtpInput(data.phoneNumber));
        navigate('/otp-input');
      }
    } catch (error) {
      console.log(error);
    }finally {
      setIsSubmitting(false);
    }
  });

  // handle oncick button login with Google
  const handleBtnLoginGoogle = async (credentialResponse) => {
    try {
      console.log('Google credential response:', credentialResponse);
      const token = credentialResponse.credential;
      console.log('Token being sent to backend:', token);
      await dispatch(googleLogin(token)).unwrap();
      navigate('/');
    } catch (error) {
      console.log('Google login error', error);
    }
  };

  // handle oncick button login with Google
  const handleBtnLoginFacebook = () => {
    alert('Tính năng này đang phát triển');
  };
  const handleResponseFacebook = async (response) => {
    try {
      console.log('Facebook response:', response);
      await dispatch(facebookLogin(response.accessToken)).unwrap();
      navigate('/');
    } catch (error) {
      console.log('Facebook login error', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);

  // forcus input phone number
  useEffect(() => {
    setFocus('phoneNumber');
  }, [setFocus]);

  return (
    <div>
      <Auth>
        <div className={cx('checkPhone-wrapper')}>
          <p className={cx('text-center')}>{t('check-phone.title')}</p>
          <FormProvider {...methods}>
            <div className={cx('wrapper-input')}>
              <div className={cx('tel-input')}>
                <Input
                  {...phone_validation}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleBtnLogin();
                    }
                  }}
                />
              </div>
            </div>
          </FormProvider>
          <Button
            className={cx('loginBtn')}
            onClick={() => {
              handleBtnLogin();
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

          <div className={cx('text-center')}>{t('check-phone.login_title')}</div>
          <div className={cx('socialBtn')}>
            <ul className={cx('socialBtn-group')}>
              <li className={cx('socialBtn-item')}>
                <div
                  className={cx(
                    'socialBtn--btn__title',
                    'flex items-center justify-center mt-4 w-full px-4 py-2 text-white bg-[#1877F2] hover:bg-[#166fe5] transition-colors duration-300 rounded-md shadow-md',
                  )}
                >
                  <GoogleLogin onSuccess={handleBtnLoginGoogle}>
                    <div className={cx('socialBtn--btn__item')}>
                      <div>
                        <img
                          src="data:image/png;base64,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"
                          alt=""
                          className={cx('socialBtn--img')}
                        />
                      </div>
                      <div className={cx('socialBtn--btn__title')}>{t('check-phone.btn_gg_login')}</div>
                    </div>
                  </GoogleLogin>
                </div>
              </li>
              <li className={cx('socialBtn-item')}>
              <div
                  className={cx(
                    'socialBtn--btn__title',
                    'flex items-center justify-center mt-8 w-full px-4 py-2 text-white bg-[#1877F2] hover:bg-[#166fe5] transition-colors duration-300 rounded-md shadow-md',
                  )}
                >
                <ReactFacebookLogin
                  appId={process.env.REACT_APP_FB_CLIENT_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={handleResponseFacebook}
                  cssClass={cx(
                    'socialBtn-btn',
                    'flex items-center justify-center w-full px-4 py-2 text-white bg-[#1877F2] hover:bg-[#166fe5] transition-colors duration-300 rounded-md shadow-md',
                  )}
                  icon={
                    <img
                      alt=""
                      src="data:image/png;base64,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"
                      className={cx('socialBtn--img')}
                    />
                  }
                  textButton={t('check-phone.btn_fb_login')}
                />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Auth>
    </div>
  );
}

export default CheckPhone;
