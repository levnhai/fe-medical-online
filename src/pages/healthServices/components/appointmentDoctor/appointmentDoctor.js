import React from 'react';
import className from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import Sidebar from '../../components/sidebar';
import { useBooking } from '~/context/bookingContext';
import Button from '~/components/Button';
import { SlideInFromBottom } from '~/components/animation';
import { updateBooking } from '~/redux/booking/bookingSlice';
import { fetchDoctorbyHospital } from '~/redux/doctor/doctorSlice';
import DoctorSkeleton from './doctorSkeleton';
import '~/translation/i18n';

//icon
import { MdKeyboardArrowRight, MdPhoneCallback } from 'react-icons/md';
import { CiSearch, CiMedicalCross } from 'react-icons/ci';
import { FaCircleXmark, FaUserDoctor } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { HiOutlineArrowUturnLeft } from 'react-icons/hi2';

import styles from './appointmentDoctor.module.scss';
const cx = className.bind(styles);

const AppointmentDoctor = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { updateBookingData } = useBooking();
  const [loading, setLoading] = useState(true);

  const [doctorData, setDoctorData] = useState([]);
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [filterParam, setFilterParam] = useState('All');

  const handleClear = () => {
    setValueInputSearch('');
    inputRef.current.focus();
  };

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'mango', label: 'Mango' },
  ];

  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const searchInput = (items) => {
    return items.filter((item) => {
      if (item.gender === filterParam.value) {
        return item?.fullName?.toString().toLowerCase().indexOf(valueInputSearch.toLowerCase()) > -1;
      } else if (filterParam === 'All' || filterParam.value === 'All') {
        return (
          removeAccents(item?.fullName)
            ?.toString()
            .toLowerCase()
            .indexOf(removeAccents(valueInputSearch).toLowerCase()) > -1
        );
      }
      return null;
    });
  };

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
      try {
        setLoading(true);
        const partnerId = queryParams.get('partnerId');
        const res = await dispatch(fetchDoctorbyHospital({ hospitalId: partnerId }));
        const result = unwrapResult(res);
        updateBookingData('hospital', {
          fullName: result.data[0]?.hospital.fullName,
          address: result.data[0]?.hospital.address,
          id: result.data[0]?.hospital._id,
        });

        setDoctorData(result?.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu bác sĩ:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctordata();
  }, []);

  return (
    <div className={cx('appointment-doctor')}>
      <div className="max-w-screen-lg m-auto">
        <div className={cx('-mt-20 ms-8 mb-8 md:mt-8')}>
          <ul className={cx('flex flex-col sm:flex-row text-xl')}>
            <li className={cx('flex items-center ')}>
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
        <div className={cx('grid grid-cols-1 md:grid-cols-4 gap-10 px-4 pb-18')}>
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="md:col-span-3">
            <div className="rounded-lg overflow-hidden">
              <div className={cx('bg-white')}>
                <div className={cx('title')}>{t('appointments.doctor.title')}</div>
                <div className={cx('content')}>
                  <div className={cx('card-body')}>
                    <div>
                      <div className={cx('search')}>
                        <div className={cx('search-wrapper')}>
                          <div className={cx('search-input')}>
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
                      <div
                        className={cx('select-filter', 'grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 ')}
                      >
                        <div className={cx('filter-item')}>
                          <Select
                            className={cx('filter-item')}
                            placeholder={t('appointments.doctor.edu')}
                            options={options}
                          />
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
                              { value: 'male', label: 'Nam' },
                              { value: 'female', label: 'Nữ' },
                            ]}
                          />
                        </div>
                      </div>
                      <div className={cx('listDocter')}>
                      {loading ? (
                          <DoctorSkeleton count={3} />
                        ) : (
                          <>
                            {doctorData && doctorData.length > 0 ? (
                              searchInput(doctorData)?.map((item, index) => {
                                return (
                                  <SlideInFromBottom key={index}>
                                    <div className={cx('docter-infor')} onClick={() => handleNext(item)}>
                                      <div>
                                        <div className={cx('highlight', 'flex items-center gap-2.5 leading-10')}>
                                          <FaUserDoctor />
                                          {item?.fullName}
                                        </div>
                                        <div className={cx('flex items-center gap-2.5 leading-10')}>
                                          <BsGenderAmbiguous />
                                          {t('appointments.doctor.sex')}: {item?.gender === 'male' ? 'Nam' : 'Nữ'}
                                        </div>
                                        <div className={cx('flex items-center gap-2.5 leading-10')}>
                                          <CiMedicalCross />
                                          {t('appointments.doctor.specialist')}: {item?.specialty?.fullName}
                                        </div>
                                        <div className={cx('flex items-center gap-2.5 leading-10')}>
                                          <GrSchedules />
                                          {t('appointments.doctor.date')}: Thứ 2, 3, 6, 7
                                        </div>
                                        <div className={cx('flex items-center gap-2.5 leading-10')}>
                                          <MdPhoneCallback />
                                          {t('footer.phone')}: {item?.phoneNumber}
                                        </div>
                                      </div>
                                    </div>
                                  </SlideInFromBottom>
                                );
                              })
                            ) : (
                              <div className={cx('no-doctors-message', 'p-4 text-center border rounded-lg')}>
                                <div className="text-gray-600">{'Không có bác sĩ nào tại bệnh viện này'}</div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
};

export default AppointmentDoctor;
