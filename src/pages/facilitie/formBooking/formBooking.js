import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './formBooking.module.scss';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// icon
import { MdKeyboardArrowRight } from 'react-icons/md';
import { VscCalendar } from 'react-icons/vsc';
import { FaUserDoctor } from 'react-icons/fa6';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function FormBooking() {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const partnerId = queryParams.get('partnerId');
  const hospitalData = location?.state?.hospital;

  const formBooking = [
    {
      title: t('appointments.form.specialist'),
      href: '',
      icon: <VscCalendar />,
    },
    {
      title: t('appointments.form.doctor'),
      href: `/chon-lich-kham?feature=booking.doctor&partnerId=${partnerId}&stepName=doctor`,
      icon: <FaUserDoctor />,
    },
  ];

  return (
    <div className={cx('AppointmentBooking')}>
      <div className="max-w-screen-lg m-auto pb-20">
        <div className={cx('-mt-20 ms-8 md:mt-8')}>
          <ul className={cx('flex flex-col sm:flex-row text-xl')}>
            <li className={cx('flex items-center')}>
              <a href="#/" className="font-semibold">
                {t('header.home')}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className={cx('flex items-center')}>
              <a href="#/" className="font-semibold">
                {hospitalData?.fullName}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className={cx('flex items-center')}>
              <a href="#/" className="text-sky-500 font-semibold">
                {t('appointments.form.path')}
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('flex justify-center flex-col items-center')}>
          <div className="py-10">
            <div className={cx('text-center text-sky-500 font-bold text-4xl sm:text-4xl lg:text-5xl')}>
              {t('appointments.form.title')}
            </div>
            <div className="text-slate-500 py-2 text-lg md:text-lg lg:text-xl text-center">
              {t('appointments.form.subTitle')}
            </div>
          </div>
          <div className="max-w-4xl m-auto">
            <div>
              <ul className={cx('grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10')}>
                {formBooking &&
                  formBooking?.map((item, index) => {
                    return (
                      <li
                        className={cx(
                          'flex gap-4 items-center bg-white p-4 sm:p-7 rounded-lg border border-solid border-white hover:text-sky-500 hover:border-cyan-400 cursor-pointer',
                        )}
                        onClick={() => {
                          item.href
                            ? navigate(`/chon-lich-kham?feature=booking.doctor&partnerId=${partnerId}&stepName=doctor`)
                            : toast.warning('Tính năng này đang phát triển!');
                        }}
                        key={index}
                      >
                        {item.icon}
                        <div className="">{item.title}</div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 w-100 pt-8">
              <Button
                rightIcon={<RiArrowGoBackFill />}
                className="flex items-center justify-start bg-transparent p-4 hover:bg-slate-100"
                to={'/co-so-y-te'}
              >
                {t('appointments.form.back')}
              </Button>
              <div className="row-span-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormBooking;
