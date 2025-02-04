import React from 'react';
import className from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import Sidebar from '../../components/sidebar';
import { fetchDoctorbyHospitalAndDoctor } from '~/redux/doctor/doctorSlice';
import { useBooking } from '~/context/bookingContext';
import Button from '~/components/Button';
import { SlideInFromBottom } from '~/components/animation';
import { updateBooking } from '~/redux/booking/bookingSlice';

//icon
import { MdOutlinePriceChange, MdKeyboardArrowRight } from 'react-icons/md';
import { CiSearch, CiMedicalCross } from 'react-icons/ci';
import { FaCircleXmark, FaUserDoctor } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { HiOutlineArrowUturnLeft } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import styles from './appointmentDoctor.module.scss';
const cx = className.bind(styles);

const AppointmentDoctor = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const inputRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { updateBookingData } = useBooking();

  const [doctorData, setDoctorData] = useState([]);
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [filterParam, setFilterParam] = useState('All');

  const booking = useSelector((state) => state.booking);
  console.log('check bookign 1', booking);

  const handleClear = () => {
    setValueInputSearch('');
    inputRef.current.focus();
  };

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'mango', label: 'Mango' },
  ];

  const handleNext = (item) => {
    dispatch(
      updateBooking({
        key: 'doctor',
        value: { fullName: item.fullName, id: item._id, specialty: item.specialty.fullName },
      }),
    );
    navigate(
      `/chon-lich-kham?feature=booking.doctor&partnerId=${item?.hospital._id}&stepName=date&doctorId=${item?._id}`,
    );
  };
  const goToPreviousStep = () => {
    dispatch(
      updateBooking({
        key: 'doctor',
        value: { fullName: null, id: null, specialty: null },
      }),
    );
    navigate(`/co-so-y-te`);
  };

  useEffect(() => {
    const fetchDoctordata = async () => {
      const partnerId = queryParams.get('partnerId');
      const res = await dispatch(fetchDoctorbyHospitalAndDoctor({ data: { hospitalId: partnerId } }));
      const result = unwrapResult(res);
      console.log('check result doctor', result);
      updateBookingData('hospital', {
        fullName: result.data[0]?.hospital.fullName,
        address: result.data[0]?.hospital.address,
        id: result.data[0]?.hospital._id,
      });

      setDoctorData(result?.data);
    };
    fetchDoctordata();
  }, []);

  return (
    <div className={cx('appointment-doctor')}>
      <div className="max-w-screen-lg m-auto">
        <div className={cx('', 'py-6')}>
        <ul className={cx('flex flex-col sm:flex-row')}>
          <li className={cx('flex items-center')}>
              <a href="#/" className="font-semibold">
              {t('header.home')}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className="flex items-center">
              <a href="#/" className="font-semibold">
                {doctorData[0]?.hospital?.fullName || 'Không thể tìm thấy bệnh viện'}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className="flex items-center">
              <a href="#/" className="text-sky-500 font-semibold">
              {t('appointments.form.path2')}
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('grid grid-cols-1 md:grid-cols-4 gap-10 px-10 pb-18')}>
          <div>
            <Sidebar />
          </div>
          <div className="col-span-3">
            <div className="rounded-lg overflow-hidden">
              <div className={cx('bg-white')}>
                <div className={cx('title', 'text-base sm:text-lg md:text-xl lg:text-xl')}>{t('appointments.doctor.title')}</div>
                <div className={cx('content')}>
                  <div className={cx('card-body')}>
                    <div>
                      <div className={cx('search')}>
                        <div className={cx('search-wrapper')}>
                          <div className={cx('search-input', 'text-base sm:text-lg md:text-xl lg:text-2xl')}>
                            <input
                              ref={inputRef}
                              value={valueInputSearch}
                              onChange={(e) => setValueInputSearch(e.target.value)}
                              placeholder={t('appointments.doctor.search')}
                            />

                            {valueInputSearch && valueInputSearch.length > 0 && (
                              <button className={cx('clear')}>
                                <FaCircleXmark onClick={handleClear} />
                              </button>
                            )}
                          </div>
                          <div className={cx('search-btn')}>
                            <CiSearch />
                          </div>
                        </div>
                      </div>
                      <div className={cx('select-filter', 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6' ,'text-base sm:text-lg md:text-xl lg:text-2xl')}>
                        <div className={cx('filter-item')}>
                          <Select className={cx('filter-item')} placeholder={t('appointments.doctor.edu')} options={options} />
                        </div>
                        <div className={cx('filter-item')}>
                          <Select placeholder={t('appointments.doctor.specialist')} options={options} />
                        </div>
                        <div className={cx('filter-item')}>
                          <Select
                            value={filterParam}
                            onChange={setFilterParam}
                            placeholder={t('appointments.doctor.sex')}
                            options={[
                              { value: 'All', label: 'Tất cả' },
                              { value: 'Nam', label: 'Nam' },
                              { value: 'Nữ', label: 'Nữ' },
                            ]}
                          />
                        </div>
                      </div>
                      <div className={cx('listDocter')}>
                        <>
                          {doctorData &&
                            doctorData?.map((item, index) => {
                              return (
                                <SlideInFromBottom>
                                  <div key={index} className={cx('docter-infor', 'text-base sm:text-lg md:text-xl lg:text-2xl')} onClick={() => handleNext(item)}>
                                    <div>
                                      <div className={cx('highlight', 'flex items-center gap-2.5 leading-10')}>
                                        <FaUserDoctor />
                                        {item?.fullName}
                                      </div>
                                      <div className={cx('flex items-center gap-2.5 leading-10')}>
                                        <BsGenderAmbiguous />
                                        {t('appointments.doctor.sex')}: {item?.gender}
                                      </div>
                                      <div className={cx('flex items-center gap-2.5 leading-10')}>
                                        <CiMedicalCross />
                                        {t('appointments.doctor.specialist')}: {item?.specialty?.fullName}
                                      </div>
                                      <div className={cx('flex items-center gap-2.5 leading-10')}>
                                        <GrSchedules />
                                        {t('appointments.doctor.date')}: bổ sung sau
                                      </div>
                                      <div className={cx('flex items-center gap-2.5 leading-10')}>
                                        <MdOutlinePriceChange />
                                        {t('appointments.doctor.price')}
                                      </div>
                                    </div>
                                  </div>
                                </SlideInFromBottom>
                              );
                            })}
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
};

export default AppointmentDoctor;
