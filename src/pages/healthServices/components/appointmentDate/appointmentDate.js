import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, useLocation } from 'react-router-dom';
import className from 'classnames/bind';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Sidebar from '../sidebar';
import '~/components/calendar/calendar.css';
import Button from '~/components/Button';
import { extractTime } from '~/utils/time';
import { fetchScheduleByDoctor } from '~/redux/schedule/scheduleSlice';
import { updateBooking } from '~/redux/booking/bookingSlice';

import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

//icon
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { HiOutlineArrowUturnLeft } from 'react-icons/hi2';

import styles from '../appointmentDoctor/appointmentDoctor.module.scss';
const cx = className.bind(styles);

function AppointmentDate() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const partnerId = queryParams.get('partnerId');
  const bookingData = useSelector((state) => state.booking);

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Ngày đang chọn
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Tháng đang hiển thị
  const [hours, setHours] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true);

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString('en-CA'); // Format yyyy-mm-dd
    setSelectedDate(formattedDate);
    setShowCalendar(false);
    const result = dates.filter((item) => item.date.startsWith(formattedDate));
    const hours = result.flatMap((item) => item.hours);
    setHours(hours);
    dispatch(
      updateBooking({
        key: 'date',
        value: formattedDate,
      }),
    );
  };

  // Hàm chuyển đổi tháng
  const handleMonthChange = (offset) => {
    const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + offset));
    setCurrentMonth(newMonth);
  };

  // Lấy danh sách các ngày có lịch hẹn
  const enabledDates = dates?.map((appointment) => {
    const date = new Date(appointment.date);
    return date.toISOString().split('T')[0]; // Định dạng 'YYYY-MM-DD'
  });

  const goToPreviousStep = () => {
    dispatch(
      updateBooking({
        key: 'doctor',
        value: { fullName: null, id: null, specialty: null },
      }),
    );

    if (showCalendar) {
      navigate(`/chon-lich-kham?feature=booking.doctor&partnerId=${partnerId}&stepName=doctor`);
    } else {
      setShowCalendar(true);
    }
  };

  // Hàm kiểm tra disable
  const isDisabled = (date) => {
    const dateString = date.toLocaleDateString('en-CA'); // Định dạng 'YYYY-MM-DD'
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !enabledDates.includes(dateString) || date < today; // Disable nếu không có trong danh sách
  };

  // lấy dữ liệu bác sĩ
  useEffect(() => {
    const fetchScheduleData = async () => {
      const doctorId = queryParams.get('doctorId');
      const res = await dispatch(fetchScheduleByDoctor({ doctorId }));
      const result = unwrapResult(res);
      setDates(result?.data);
    };
    fetchScheduleData();
  }, []);

  return (
    <div className={cx('appointment-doctor')}>
      <div className="max-w-screen-lg m-auto">
      <div className={cx('-mt-20 mb-8 ms-8 md:mt-8')}>
        <ul className={cx('flex flex-col sm:flex-row text-xl')}>
          <li className={cx('flex items-center')}>
              <a href="#/" className="font-semibold">
              {t('header.home')}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className="flex items-center">
              <a href="#/" className="font-semibold">
                {bookingData?.hospital?.fullName || 'Không thể tìm thấy bệnh viện'}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className="flex items-center">
              <a href="#/" className="text-sky-500 font-semibold">
              {t('appointments.date.path')}
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('grid grid-cols-1 md:grid-cols-4 gap-10 px-4 pb-18')}>
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="md:col-span-3 rounded-lg overflow-hidden">
            <div className={cx('bg-white', 'rounded-lg')}>
              <div className={cx('title')}>{showCalendar ?  t('appointments.date.title') :  t('appointments.date.time')}</div>
              <div className="calendar-container mb-6">
                {/* Thanh điều hướng tháng */}
                {showCalendar && (
                  <div className="calendar-navigation">
                    <div
                      className="nav-button"
                      onClick={() => handleMonthChange(-1)}
                      disabled={currentMonth.getFullYear() === 2024 && currentMonth.getMonth() === 11} // Disable nút trái cho tháng 12-2024
                    >
                      <FaArrowAltCircleLeft />
                    </div>
                    <span className="current-month">
                      THÁNG {currentMonth.getMonth() + 1 < 10 ? '0' : ''}
                      {currentMonth.getMonth() + 1}-{currentMonth.getFullYear()}
                    </span>
                    <div
                      className="nav-button"
                      onClick={() => handleMonthChange(1)}
                      disabled={currentMonth.getFullYear() === 2025 && currentMonth.getMonth() === 0} // Disable nút phải cho tháng 1-2025
                    >
                      <FaArrowAltCircleRight />
                    </div>
                  </div>
                )}
                {!showCalendar && selectedDate && (
                  <div className="selected-date flex mb-6">
                    <h2 className="font-semibold"> {t('appointments.date.date')}:&nbsp;&nbsp; </h2>
                    <span className="text-sky-500 font-semibold">
                      {new Date(selectedDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                )}
                {/* Hiển thị lịch */}
                {showCalendar && (
                  <Calendar
                    className="w-full border-none"
                    onChange={handleDateChange}
                    value={selectedDate}
                    activeStartDate={currentMonth}
                    locale="vi-VN"
                    showNavigation={false}
                    tileDisabled={({ date }) => isDisabled(date)}
                  />
                )}
                {/* Hiển thị khung giờ */}
                {!showCalendar && selectedDate && (
                  <div className="time-slots w-full">
                    {hours && (
                      <>
                        <div className="slot-container flex gap-10 border-t-2 border-sky-400 mx-8 py-10">
                          {hours.map((hour, index) => (
                            <div key={index}>
                              {console.log('check hour: ', hour)}
                              <Button
                                outline
                                key={index}
                                className="time-slot border-sky-300 text-slate-700"
                                onClick={() => {
                                  // updateBookingData('time', { start: hour.start, end: hour.end });
                                  dispatch(
                                    updateBooking({
                                      key: 'time',
                                      value: {
                                        start: hour.start,
                                        end: hour.end,
                                      },
                                    }),
                                  );
                                  dispatch(
                                    updateBooking({
                                      key: 'price',
                                      value: hour.price,
                                    }),
                                  );
                                  // updateBookingData('price', hour.price);
                                  navigate('/chon-lich-kham?feature=booking.doctor&stepName=record');
                                }}
                              >
                                {extractTime(hour.start)} - {extractTime(hour.end)}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="md:hidden mt-6">
              <Sidebar />
            </div>
            <div className={'my-6'}>
              <Button
                rightIcon={<HiOutlineArrowUturnLeft />}
                onClick={goToPreviousStep}
                className="bg-transparent font-medium
                hover:bg-zinc-100"
              >
                {t('appointments.form.back')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDate;
