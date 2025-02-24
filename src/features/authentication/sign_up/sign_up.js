import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';

// icon
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { loginUser, fetchCreateUser } from '~/redux/user/authSlice';
import Button from '~/components/Button';
import Auth from '../auth';
import { Input } from '~/components/input/input';
import { password_validation, name_validation } from '~/utils/inputValidations';
import { useTranslation } from 'react-i18next';

import '~/translation/i18n';
import styles from './sign_up.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SingUp() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm();

  const [showHidePassword, setShowHidePassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);

  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleShowHideReEnterPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleSubmitCreateUser = methods.handleSubmit(async (data) => {
    try {
      const formData = { ...data, phoneNumber };
      const res = await dispatch(fetchCreateUser(formData));
      const userSelector = unwrapResult(res);
      if (userSelector.userData) {
        toast.success(userSelector.message);
        navigate('/');
        dispatch(loginUser(res));
      } else {
        toast.error(userSelector.message);
      }
    } catch (error) {
      toast.error(error);
    }
  });

  return (
    <>
      <Auth>
        <div className={cx('register-body')}>
          <div className={cx('register-form_content')}>
            <div className={cx('content-title_section')}>{t('register.title')}</div>
            <div className={cx('wrapper-input')}>
              <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()} noValidate className="container">
                  <div className={cx('input')}>
                    <div className={cx('react--tel__input')}>
                      <input type="text" className={cx('customInput')} value={phoneNumber} disabled />
                    </div>

                    <div className={cx('input-item')}>
                      <Input {...name_validation} />
                    </div>
                    <div className={cx('input-item')}>
                      <Input type={showHidePassword ? 'password' : ' text'} {...password_validation} />
                      <span
                        onMouseDown={handleShowHidePassword}
                        onMouseUp={() => setShowHidePassword(true)}
                        onMouseLeave={() => setShowHidePassword(true)}
                        className={cx('password-icon')}
                      >
                        {showHidePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    <div className={cx('input-item')}>
                      <Input
                        validation={{
                          required: {
                            value: true,
                            message: 'required',
                          },
                        }}
                        label=""
                        type={confirmPassword ? 'password' : ' text'}
                        id="reEnterPassword"
                        placeholder="Please enter your reEnterPassword..."
                        name="reEnterPassword"
                      />
                      <span
                        onMouseDown={handleShowHideReEnterPassword}
                        onMouseUp={() => setConfirmPassword(true)}
                        onMouseLeave={() => setConfirmPassword(true)}
                        className={cx('password-icon')}
                      >
                        {confirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '30px' }}>
                      <Input
                        label=""
                        type="text"
                        id="referralCode"
                        placeholder="Please enter your referralCode..."
                        name="referralCode"
                      />
                    </div>
                  </div>
                </form>
              </FormProvider>
              <p className={cx('customFont')}>
                {t('register.des')}
                <br />
                <a href="https://medpro.vn/quy-dinh-su-dung" target="_blank" rel="noreferrer">
                  {t('register.des1')}
                </a>
                &nbsp; {t('register.and')} &nbsp;
                <a href="https://medpro.vn/chinh-sach-bao-mat" target="_blank" rel="noreferrer">
                  {t('register.des2')}
                </a>
              </p>
              <div>
                <Button type="submit" onClick={handleSubmitCreateUser} className={cx('register-btn')}>
                  {t('register.comlate')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
}

export default SingUp;
