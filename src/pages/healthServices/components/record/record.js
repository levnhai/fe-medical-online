import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import { fetchRecordUser } from '~/redux/user/authSlice';
import { useBooking } from '~/context/bookingContext';
import { updateBooking } from '~/redux/booking/bookingSlice';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

// icon
import { MdKeyboardArrowRight, MdOutlineMail } from 'react-icons/md';
import { FaUserCircle, FaBirthdayCake, FaPhoneAlt, FaRegEdit, FaLongArrowAltRight, FaUserPlus } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import { BsGenderTrans } from 'react-icons/bs';
import { HiOutlineUserGroup, HiOutlineArrowUturnLeft } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';

function ChooseRecord() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user?.payload);
  const userId = user?.userData._id;
  const { updateBookingData } = useBooking();
  const [records, setRecords] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const bookingData = useSelector((state) => state.booking);

  const goToPreviousStep = () => {
    updateBookingData('doctor', { fullName: null, id: null, specialty: null });
    navigate(
      `/chon-lich-kham?feature=booking.doctor&partnerId=${userId}&stepName=date&doctorId=${bookingData?.doctor?.id}`,
    );
  };

  useEffect(() => {
    const fetchScheduleData = async () => {
      const res = await dispatch(fetchRecordUser({ recordId: userId }));
      const result = unwrapResult(res);
      setRecords(result);
      console.log('check schedule data', result);
    };
    fetchScheduleData();
  }, []);
  return (
    <div className="">
      <div className="max-w-screen-lg m-auto">
        <div className={'py-6'}>
        <ul className={'flex flex-col sm:flex-row'}>
          <li className={'flex items-center'}>
              <a href="#/" className="font-semibold">
              {t('header.home')}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className="flex items-center text-sky-500 font-semibold">{t('appointments.date.chooseProfile')}</li>
          </ul>
        </div>
        <div className="flex justify-center items-center flex-col pb-20">
          <h1 className="text-5xl font-bold text-sky-500">{t('appointments.date.chooseProfile')}</h1>
          <div className="mt-8 max-w-2xl">
            <div className="rounded-xl bg-white ">
              {records?.data?.map((item, index) => {
                let address = `${item.address[0].street}, ${item.address[0].wardName}, ${item.address[0].districtName}, ${item.address[0].provinceName}`;
                return (
                  <ul
                    key={index}
                    className="flex flex-col gap-2 p-8 cursor-pointer"
                    onClick={() => {
                      setShowMore(!showMore);
                    }}
                  >
                    <li className="grid grid-cols-3 gap-4">
                      <div className="flex gap-4 items-center">
                        <FaUserCircle className="text-2xl  text-zinc-500" />
                        <span className="text-2xl text-sky-500">{item?.fullName.toUpperCase()}</span>
                      </div>
                      <div></div>
                    </li>
                    <li className="grid grid-cols-3 gap-4">
                      <div className="flex gap-4 items-center">
                        <FaBirthdayCake className="text-2xl text-zinc-500" />
                        <span className="text-2xl text-zinc-500">{t('patientRecords.list.date')}: </span>
                      </div>
                      <div className="col-span-2">16-02-03</div>
                    </li>
                    <li className="grid grid-cols-3 gap-4">
                      <div className="flex gap-4 items-center">
                        <FaPhoneAlt className="text-2xl text-zinc-500" />
                        <span className="text-2xl text-zinc-500">{t('patientRecords.list.phone')}:</span>
                      </div>
                      <div className="col-span-2 ">{item?.phoneNumber}</div>
                    </li>
                    <li className="grid grid-cols-3 gap-4">
                      <div className="flex gap-4 items-center">
                        <GiPositionMarker className="text-2xl text-zinc-500" />
                        <span className="text-2xl text-zinc-500">{t('patientRecords.list.address')}: </span>
                      </div>
                      <div className="col-span-2">{address}</div>
                    </li>

                    {showMore && (
                      <li className="grid grid-cols-3 gap-4">
                        <div className="flex gap-4 items-center">
                          <BsGenderTrans className="text-2xl text-zinc-500" />
                          <span className="text-2xl text-zinc-500">{t('patientRecords.list.sex')}: </span>
                        </div>
                        <div className="col-span-2">{item?.gender}</div>
                      </li>
                    )}
                    {showMore && (
                      <li className="grid grid-cols-3 gap-4">
                        <div className="flex gap-4 items-center">
                          <HiOutlineUserGroup className="text-2xl text-zinc-500" />
                          <span className="text-2xl text-zinc-500">{t('patientRecords.list.nation')}: </span>
                        </div>
                        <div className="col-span-2">{item?.ethnic}</div>
                      </li>
                    )}
                    <li className="grid grid-cols-3 gap-4 pb-4">
                      <div className="flex gap-4 items-center">
                        <MdOutlineMail className="text-2xl text-zinc-500" />
                        <span className="text-2xl text-zinc-500">{t('patientRecords.list.email')}:</span>
                      </div>
                      <div className="col-span-2">{item?.email}</div>
                    </li>
                    {showMore && (
                      <li className=" border-t border-slate-300 pt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                          <div className="flex flex-wrap sm:col-span-3 gap-4 w-full">
                            <Button leftIcon={<RiDeleteBin6Line />} className="bg-red-100 text-rose-500 p-0 text-lg sm:text-xl">
                              {t('appointments.action.delete')}
                            </Button>
                            <Button leftIcon={<FaRegEdit />} className="bg-cyan-100 text-sky-500 text-lg sm:text-xl">
                              {t('appointments.action.edit')}
                            </Button>
                          </div>
                          <Button
                            rightIcon={<FaLongArrowAltRight />}
                            className="w-full sm:w-auto text-lg sm:text-xl text-white bg-cyan-400"
                            onClick={() => {
                              dispatch(updateBooking({ key: 'patientProfile', value: item }));
                              navigate('/chon-lich-kham?feature=booking.doctor&stepName=confirm');
                            }}
                          >
                            {t('appointments.action.continue')}
                          </Button>
                        </div>

                      </li>
                    )}
                  </ul>
                );
              })}
            </div>

            <div className="flex justify-between pt-12">
              <Button
                rightIcon={<HiOutlineArrowUturnLeft />}
                onClick={goToPreviousStep}
                className="bg-transparent font-medium
                  hover:bg-zinc-100"
              >
                {t('appointments.form.back')}
              </Button>
              <Button
                leftIcon={<FaUserPlus />}
                onClick={() => {
                  toast.warning('Tính năng này đang phát triển!');
                }}
                className="bg-transparent font-medium
                  hover:bg-zinc-100"
              >
                {t('patientRecords.sidebar.add')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseRecord;
