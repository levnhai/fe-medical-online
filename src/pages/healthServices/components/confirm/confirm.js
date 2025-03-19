import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import className from 'classnames/bind';
import { useSelector } from 'react-redux';

import Sidebar from '../../components/sidebar';
import Button from '~/components/Button';
import { extractTime } from '~/utils/time';

// icon
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaUserCircle, FaBirthdayCake, FaPhoneAlt } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import { BsGenderTrans } from 'react-icons/bs';
import { HiOutlineUserGroup, HiOutlineArrowUturnLeft } from 'react-icons/hi2';
import { PiWarningCircle } from 'react-icons/pi';
import { FaIdCard } from 'react-icons/fa';
import { MdAlternateEmail, MdDelete } from 'react-icons/md';
import { CiCreditCard1 } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

import styles from '../appointmentDoctor/appointmentDoctor.module.scss';
const cx = className.bind(styles);

function Confirm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const bookingData = useSelector((state) => state.booking);

  console.log('check bookingData', bookingData);

  const goToPreviousStep = () => {
    navigate(`/chon-lich-kham?feature=booking.doctor&stepName=record`);
  };

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
                {t('appointments.confirm.path')}
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('grid grid-cols-1 md:grid-cols-4 gap-10 px-4 pb-18')}>
          <div className=" rounded-lg">
            <Sidebar />
          </div>
          <div className="flex gap-8 flex-col md:col-span-3 rounded-lg overflow-hidden">
            <div className={cx('bg-white rounded-lg')}>
              <div>
                <div className={cx('title')}>{t('appointments.confirm.title')}</div>
                <div className={cx('content')}>
                  <div className="p-6">
                    <div>
                      <ul className="flex w-full">
                        <li className="w-1/12 text-left font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                          #
                        </li>
                        <li className="w-1/5 text-left font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                          {t('appointments.confirm.specialist')}
                        </li>
                        <li className="w-1/5 text-left font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                          {t('appointments.confirm.doctor')}
                        </li>
                        <li className="w-1/5 text-left font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                          {t('appointments.confirm.time')}
                        </li>
                        <li className="w-1/5 text-left font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                          {t('appointments.confirm.price')}
                        </li>
                        <li className="w-1/12 text-left font-semibold"></li>
                      </ul>
                    </div>
                    <div className="border-t pt-6 mt-6">
                      <ul className="flex w-full">
                        <li className="w-1/12 text-left text-base sm:text-lg md:text-xl lg:text-2xl">1</li>
                        <li className="w-1/5 text-left text-base sm:text-lg md:text-xl lg:text-2xl">
                          {bookingData?.doctor?.specialty}
                        </li>
                        <li className="w-1/5 text-left text-base sm:text-lg md:text-xl lg:text-2xl">
                          {bookingData?.doctor?.fullName}
                        </li>
                        <li className="w-1/5 text-left text-base sm:text-lg md:text-xl lg:text-2xl">
                          {extractTime(bookingData?.time.start)} - {extractTime(bookingData?.time.end)} <br />{' '}
                          {bookingData?.date}
                        </li>
                        <li className="w-1/5 text-left text-base sm:text-lg md:text-xl lg:text-2xl">
                          {bookingData?.price?.toLocaleString('en-US', { style: 'currency', currency: 'VND' })} Vnđ
                        </li>
                        <li className="w-1/12 text-left">
                          <MdDelete style={{}} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('bg-white rounded-lg  overflow-hidden')}>
              <div className="rounded-lg">
                <div className={cx('title')}>{t('appointments.confirm.title2')}</div>
                <div className={cx('content')}>
                  <div className="p-6">
                    <div>
                      <ul className="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 col-span-2 items-center">
                              <FaUserCircle className="text-2xl  text-zinc-500" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.name')}:{' '}
                              </span>
                            </div>
                            <div className="col-span-3 text-2xl text-sky-500 ">
                              {bookingData?.patientProfile?.fullName.toUpperCase()}
                            </div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <FaBirthdayCake className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.date')}:{' '}
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">16-02-03</div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <FaPhoneAlt className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.phone')}:
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                              {' '}
                              {bookingData?.patientProfile?.phoneNumber}
                            </div>
                          </li>

                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 col-span-2 items-center">
                              <MdAlternateEmail className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.email')}:
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                              {bookingData?.patientProfile?.email}
                            </div>
                          </li>
                          <li className="grid grid-cols-5 gap-4 ">
                            <div className="flex gap-4 items-center col-span-2">
                              <CiCreditCard1 className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.idbhyt')}:
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">0801503677</div>
                          </li>
                        </div>

                        <div className="col-span-1">
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <BsGenderTrans className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.sex')}:{' '}
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                              {' '}
                              {bookingData?.patientProfile?.gender}
                            </div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <FaIdCard className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.CCCD')}:{' '}
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                              {' '}
                              {bookingData?.patientProfile?.cccd}
                            </div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <HiOutlineUserGroup className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.nation')}:{' '}
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                              {bookingData?.patientProfile?.ethnic}
                            </div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <GiPositionMarker className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl" />
                              <span className="text-2xl text-zinc-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                                {t('patientRecords.list.address')}:{' '}
                              </span>
                            </div>
                            <div className="col-span-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                              {`${bookingData?.patientProfile?.address[0]?.street}, ${bookingData?.patientProfile?.address[0]?.wardName}, ${bookingData?.patientProfile?.address[0]?.districtName}, ${bookingData?.patientProfile?.address[0]?.provinceName}`}
                            </div>
                          </li>
                        </div>
                      </ul>
                    </div>
                    <div className="flex bg-red-100 text-rose-600 p-2 rounded-xl mt-6 text-2xl text-base sm:text-lg md:text-xl lg:text-2xl">
                      <PiWarningCircle className="min-w-10" />
                      {t('appointments.confirm.note')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={'mb-8 flex justify-between'}>
              <Button
                rightIcon={<HiOutlineArrowUturnLeft />}
                onClick={goToPreviousStep}
                className="bg-transparent font-medium
                hover:bg-zinc-100"
              >
                {t('appointments.form.back')}
              </Button>
              <Button
                onClick={() => {
                  navigate('/chon-lich-kham?feature=booking.doctor&stepName=payment');
                }}
                className="text-white bg-cyan-400"
              >
                {t('appointments.action.continue')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
