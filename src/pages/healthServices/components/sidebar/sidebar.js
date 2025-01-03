import classNames from 'classnames/bind';
import style from './sidebar.module.scss';
import { useSelector } from 'react-redux';

import { extractTime } from '~/utils/time';
import { useBooking } from '~/context/bookingContext';

//icon
import { FaHospitalAlt } from 'react-icons/fa';
import { GiHospitalCross } from 'react-icons/gi';
import { FaUserDoctor } from 'react-icons/fa6';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { TbClockHour4 } from 'react-icons/tb';

const cx = classNames.bind(style);

function Sidebar() {
  // const { bookingData } = useBooking();
  const bookingData = useSelector((state) => state.booking);
  return (
    <div className=" rounded-lg bg-white overflow-hidden">
      <div className={cx('title')}>Thông tin cơ sở y tế</div>
      <div className={cx('body', 'p-5 mb-6')}>
        <div className={cx('hospital-info', 'flex mt-4')}>
          <div className={cx('icon', 'pr-4')}>
            <FaHospitalAlt />
          </div>
          <div>
            <div className={cx('name', 'text-zinc-600 text-2xl capitalize')}>{bookingData?.hospital?.fullName}</div>
            <div className={cx('des', 'text-neutral-400 text-xl')}>{bookingData?.hospital?.address}</div>
          </div>
        </div>
        {bookingData?.doctor?.specialty && (
          <div className={cx('specialty-info', 'flex mt-4')}>
            <div className={cx('icon', 'pr-4')}>
              <GiHospitalCross />
            </div>
            <div className={cx('name', 'text-zinc-500 text-2xl')}>Chuyên khoa: {bookingData?.doctor?.specialty}</div>
          </div>
        )}
        {bookingData?.doctor?.fullName && (
          <div className={cx('docter-info', 'flex mt-4')}>
            <div className={cx('icon', 'pr-4')}>
              <FaUserDoctor />
            </div>
            <div className={cx('name', 'text-zinc-500 text-2xl')}>Bác sĩ: {bookingData?.doctor?.fullName}</div>
          </div>
        )}

        {bookingData?.date && (
          <div className={cx('service-info', 'flex mt-6')}>
            <div className={cx('icon', 'pr-4')}>
              <BsFillCalendarDateFill />
            </div>
            <div>
              <div className={cx('name', 'text-zinc-500 text-2xl')}>Ngày khám: {bookingData?.date}</div>
            </div>
          </div>
        )}
        {bookingData?.time?.start && (
          <div className={cx('service-info', 'flex mt-6')}>
            <div className={cx('icon', 'pr-4')}>
              <TbClockHour4 />
            </div>
            <div>
              <div className={cx('name', 'text-zinc-500 text-2xl')}>
                Giờ khám :{extractTime(bookingData?.time.start)} - {extractTime(bookingData?.time.end)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
