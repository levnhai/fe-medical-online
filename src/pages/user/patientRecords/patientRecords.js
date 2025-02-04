import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

//icon
import { FaUser, FaBirthdayCake, FaPhoneAlt, FaAddressCard } from 'react-icons/fa';
import { PiGenderIntersexBold, PiWarningCircle } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { MdMarkEmailUnread } from 'react-icons/md';
import { RxCardStackMinus } from 'react-icons/rx';

import Button from '~/components/Button';
import Modal from '~/components/modal';
import { fetchRecordUser } from '~/redux/user/authSlice';

import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

import PatientRecordSkeleton from './skeleton';

function PatientRecord() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordData, setRecordData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const partnerId = useSelector((state) => state.auth?.user.payload?.userData?._id);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await dispatch(fetchRecordUser({ recordId: partnerId }));
        const result = unwrapResult(res);
        setRecordData(result);
      } catch (error) {
        console.error('Failed to fetch records:', error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchRecords();
  }, [dispatch, partnerId]);

  if (isLoading) {
    return <PatientRecordSkeleton />; 
  }

  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 mb-10 sm:mb-16 md:mb-20">
    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">{t('patientRecords.title.label')}</h1>

      {recordData?.data?.map((item, index) => {
        const address = `
            ${item?.address[0]?.street}, 
            ${item?.address[0]?.wardName}, 
            ${item?.address[0]?.provinceName}, 
            ${item?.address[0]?.wardName}`;
        return (
          <div>
            <div key={index} className="border rounded-3xl border-cyan-400 overflow-hidden mb-6 sm:mb-8">
              <ul className={'flex flex-col sm:flex-row'}>
                <li className={'flex items-center'}>
                  <span className="">
                    <FaUser className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">{t('patientRecords.list.name')}</span>
                  <span className=" font-bold text-cyan-500">{item?.fullName || 'Bổ sung sau '}</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span>
                    <FaBirthdayCake className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">{t('patientRecords.list.date')}:</span>
                  <span className="font-semibold text-gray-600">{t('patientRecords.note.q3')} </span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span>
                    <FaPhoneAlt className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">{t('patientRecords.list.phone')}:</span>
                  <span className="font-semibold text-gray-600">{item?.phoneNumber}</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span>
                    <PiGenderIntersexBold className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">{t('patientRecords.list.sex')}:</span>
                  <span className="font-semibold text-gray-600">{item?.gender === 'female' ? t('patientRecords.note.q2') : t('patientRecords.note.q1')}</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span>
                    <FaLocationDot className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">{t('patientRecords.list.address')}:</span>
                  <span className="font-semibold text-gray-600">{address}</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span>
                    <HiMiniUserGroup className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">{t('patientRecords.list.nation')}:</span>
                  <span className="font-semibold text-gray-600">{item?.ethnic}</span>
                </li>
              </ul>
              <div className="flex flex-wrap sm:flex-nowrap justify-end bg-zinc-200 px-2 sm:px-3 gap-2">
                <Button
                  className="text-red-500 py-4 px-1 font-semibold text-xl hover:bg-zinc-200 flex items-center gap-1 w-full sm:w-auto"
                  text
                  leftIcon={<AiOutlineDelete />}
                  onClick={() => {
                    alert('Tính năng này đang phát triển, vui lòng thử lại sau');
                  }}
                >
                  {t('patientRecords.action.delete')}
                </Button>
                
                <Button
                  className="text-red-500 py-4 px-1 font-semibold text-xl hover:bg-zinc-200 flex items-center gap-1 w-full sm:w-auto"
                  text
                  leftIcon={<FiEdit />}
                  onClick={() => {
                    alert('Tính năng này đang phát triển, vui lòng thử lại sau');
                  }}
                >
                  {t('patientRecords.action.edit')}
                </Button>
                
                <Button
                  className="text-red-500 py-4 px-1 font-semibold text-xl hover:bg-zinc-200 flex items-center gap-1 w-full sm:w-auto"
                  text
                  leftIcon={<PiWarningCircle />}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  {t('patientRecords.action.more')}
                </Button>
              </div>

            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('patientRecords.modalTitle')}>
              <ul className="p-8">
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaUser className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.name')}:</div>
                  </div>
                  <div className="col-span-5 font-bold text-cyan-500">{item?.fullName || 'Bổ sung sau '}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaBirthdayCake className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.date')}:</div>
                  </div>
                  <div className="col-span-5 font-semibold text-gray-600">{t('patientRecords.note.q3')} </div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaPhoneAlt className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.phone')}:</div>
                  </div>
                  <div className="col-span-5 font-semibold text-gray-600">{item?.phoneNumber}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <PiGenderIntersexBold className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.sex')}:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">
                    {item?.gender === 'female' ? t('patientRecords.note.q2') : t('patientRecords.note.q1')}
                  </div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaAddressCard className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.CCCD')}:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">{item?.cccd}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <MdMarkEmailUnread className="text-zinc-400" />
                    <div className="text-zinc-700">Email:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">{item?.email}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <RxCardStackMinus className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.job')}:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">{t('patientRecords.note.q3')}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaLocationDot className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.address')}:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">{address}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <HiMiniUserGroup className="text-zinc-400" />
                    <div className="text-zinc-700">{t('patientRecords.list.nation')}:</div>
                  </div>
                  <div className="col-span-5 font-semibold text-gray-600">{item?.ethnic}</div>
                </li>
              </ul>
            </Modal>
          </div>
        );
      })}
    </div>
  );
}

export default PatientRecord;
