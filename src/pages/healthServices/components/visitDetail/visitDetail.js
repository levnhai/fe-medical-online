import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// icon
import { MdKeyboardArrowRight, MdClear } from 'react-icons/md';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { PiWarningCircle } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

import Button from '~/components/Button';
import { extractTime } from '~/utils/time';
import '~/translation/i18n';
import { formatPrice } from '~/utils/common';
import { fetchUpdateStatus } from '~/redux/appointment/appointmentSlice';

function VisitDetail() {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const location = useLocation();
  const appointmentData = location.state?.result;
  const appointmentId = appointmentData?._id;
  // const statusAppointment = appointmentData?.appointment?.status;
  const bookingData = useSelector((state) => state.booking);

  const [statusAppointment, setStatusAppointment] = useState(appointmentData?.status);

  const handleUpdateStatus = async () => {
    const res = await dispatch(fetchUpdateStatus({ status: 'canceled', id: appointmentId }));
    const result = unwrapResult(res);

    if (result?.status) {
      toast.success('Hủy lịch hẹn thành công');
      setStatusAppointment('canceled');
    } else {
      toast.warning('Bạn k thể hủy');
    }
  };

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
            <li className="flex items-center text-sky-500 font-semibold">{t('appointments.visit.path')}</li>
          </ul>
        </div>
        <div>
          <Button to="/user?key=bills" leftIcon={<MdOutlineStickyNote2 />} className=" text-sky-500 font-semibold">
            Danh sách phiếu khám
          </Button>
        </div>
        <div className="mx-auto max-w-xl ">
          <div className="flex flex-col items-center">
            <div className="pb-10">
              <div className="flex flex-col items-center">
                <div className="bg-white p-6 flex flex-col items-center rounded-xl">
                  <div className="">
                    <div className="pb-6">
                      <div className="text-center text-4xl py-6 text-sky-500 font-semibold">
                        Chúc mừng đặt khám thành công
                      </div>
                      <div className="text-center text-lg">{t('appointments.visit.subTitle')}</div>
                    </div>
                    <div className="flex flex-col items-center relative border-t border-dashed border-slate-300 pt-4">
                      <div className="text-2xl font-semibold pt-4 pb-2">Phiếu khám bệnh</div>
                      <div className="text-3xl font-semibold text-sky-500 pt-6 pb-4 capitalize">
                        {bookingData?.hospital?.fullName}
                      </div>
                      <span className="text-xl text-stone-400 text-center">{bookingData?.hospital?.address}</span>
                    </div>

                    <div className="pt-10 pb-10 flex justify-center">
                      <div className="text-xl bg-orange-500 rounded-full text-center w-2/4 py-3 text-white">
                        {statusAppointment === 'Booked'
                          ? 'Đặt khám thành công'
                          : statusAppointment === 'Completed'
                            ? 'Đã khám'
                            : 'Đã hủy'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-orange-500 text-center">
                        {t('appointments.visit.fee')}: {formatPrice(bookingData?.price)}
                      </div>
                      <div className="text-orange-500 text-lg text-center pt-2 pb-4">
                        (Đã bao gồm phí khám + phí tiện ích)
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-t border-dashed border-slate-300 pt-4">
                    <ul className="mx-4">
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">{t('appointments.visit.code')}:</span>
                        <span className="col-span-3 text-xl font-semibold">T241223U4C1UE</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">{t('appointments.visit.doctor')}:</span>
                        <span className="col-span-3 text-xl font-semibold">{bookingData?.doctor?.fullName}</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">Chuyên khoa:</span>
                        <span className="col-span-3 text-xl font-semibold">{bookingData?.doctor?.specialty}</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">{t('appointments.visit.method')}:</span>
                        <span className="col-span-3 text-xl font-semibold">Không có BHYT</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">{t('appointments.visit.time')}:</span>
                        <span className="col-span-3 text-xl font-semibold">
                          {extractTime(bookingData?.time?.start)} - {bookingData?.date?.replace(/-/g, '/')}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full border-t border-dashed border-slate-300 pt-4">
                    <div>
                      <p>
                        <strong className="text-2xl font-semibold">{t('appointments.visit.note2')}:</strong>
                      </p>
                      <p className="text-lg pt-2">{t('appointments.visit.q1')}</p>
                      <p className="text-lg pt-2">{t('appointments.visit.q2')}</p>
                      <p className="text-lg pt-2">{t('appointments.visit.q3')}</p>
                      <p className="text-lg pt-2">{t('appointments.visit.q4')}</p>
                      <p className="text-lg pt-2">{t('appointments.visit.q5')}</p>
                    </div>
                    <div className="text-2xl text-center pt-6 text-sky-500">
                      {t('appointments.visit.q6')}&nbsp;
                      <strong className="font-semibold">Medical</strong>
                    </div>
                    <div className="text-center text-lg pt-2">{t('appointments.visit.q7')}</div>
                  </div>
                </div>
              </div>
            </div>
            {statusAppointment === 'Booked' && (
              <div className="w-full  overflow-hidden">
                <Button
                  className="w-full rounded-xl bg-red-200 font-medium text-2xl py-6"
                  leftIcon={<MdClear style={{ fontSize: '20px', color: 'red' }} />}
                  onClick={handleUpdateStatus}
                >
                  {t('appointments.visit.quit')}
                </Button>
              </div>
            )}

            {statusAppointment === 'Booked' && (
              <div className="flex gap-2 text-xl pt-6 mb-20">
                <PiWarningCircle className="text-red-600" />
                <p className="text-rose-600">{t('appointments.visit.note3')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitDetail;
