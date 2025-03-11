import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './appointment.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

// icon
import { FaHospitalAlt } from 'react-icons/fa';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { RiServiceLine } from 'react-icons/ri';

import Button from '~/components/Button';
import { formatDate, extractTime } from '~/utils/time';
import { fetchGetAppointment } from '~/redux/payment/paymentSlice';

import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import PatientRecordSkeleton from '../patientRecords/skeleton';

const cx = classNames.bind(styles);
function Appointment() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientId = useSelector((state) => state.auth?.user.payload?.userData?._id);

  const [activeTab, setActiveTab] = useState('pending');
  const [appointmentData, setAppointmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabContent = {
    pending: (
      <>
        {appointmentData?.pending?.length > 0 ? (
          <div>
            {appointmentData?.pending?.map((item, index) => {
              return (
                <div
                  className={cx('tab-content', 'grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6')}
                  key={index}
                  onClick={() => navigate(`/chi-tiet-phieu-kham-benh?transactionId=${item.orderId}`)}
                >
                  <div className="md:col-span-4 col-span-1">
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      <span className="text-base md:text-xl">{t('appointments.details.code')}</span>
                      <span className="font-bold text-lg md:text-2xl">{item.orderId}</span>
                    </div>
                    <div className="font-bold text-lg md:text-2xl mt-2 md:mt-4">
                      {item?.doctor?.fullName || t('appointments.details.doctor')}
                    </div>
                    <hr className="mt-2 md:mt-4 border-b border-dashed border-black" />
                    <div className="mt-2 md:mt-4 flex items-center gap-2 md:gap-4">
                      <FaHospitalAlt className="text-cyan-500 text-lg md:text-2xl" />
                      <span className="font-medium text-lg md:text-3xl text-cyan-500">
                        {item.hospital?.fullName || t('appointments.details.hospital')}
                      </span>
                    </div>
                    <div className="mt-2 md:mt-4 grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                          <div className="flex items-center gap-2 md:gap-4">
                            <RiServiceLine />
                            <span className="text-sm md:text-base">{t('appointments.details.service')}</span>
                          </div>
                          <div className="text-sm md:text-base">Nội tổng quát</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 mt-2 md:mt-4">
                          <div className="flex items-center gap-2 md:gap-4">
                            <MdCalendarMonth />
                            <span className="text-sm md:text-base">{t('appointments.details.date')}</span>
                          </div>
                          <div className="text-cyan-500 text-sm md:text-base">{formatDate(item.date)}</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 mt-2 md:mt-4">
                          <div className="flex items-center gap-2 md:gap-4">
                            <MdOutlineAccessTimeFilled />
                            <span className="text-sm md:text-base">{t('appointments.details.time')}</span>
                          </div>
                          <div className="text-cyan-500 text-sm md:text-base">{extractTime(item?.hours[0]?.start)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-center md:justify-end flex-col col-span-1 md:col-span-2">
                    <Button className="bg-green-500 text-white text-sm md:text-xl font-bold py-1 md:py-2">
                      {t('appointments.details.success')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center my-6 md:my-12">
            <p className="mb-4 md:mb-6 text-lg md:text-4xl font-semibold text-neutral-400">
              Bạn chưa có phiếu khám nào
            </p>
            <img
              alt="empty"
              className="w-40 md:w-72"
              src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnull-data.b105c645.png&w=384&q=75"
            />
          </div>
        )}
      </>
    ),
    paid: (
      <>
        {appointmentData?.paid?.length > 0 ? (
          <div>
            {appointmentData?.paid?.map((item, index) => {
              return (
                <div
                  className={cx('tab-content', 'grid grid-cols-6 gap-6')}
                  key={index}
                  onClick={() => navigate(`/chi-tiet-phieu-kham-benh?transactionId=${item.orderId}`)}
                >
                  <div className="col-span-4">
                    <div className="flex gap-4">
                      <span className="text-xl">Mã phiếu:</span>
                      <span className="font-bold text-2xl">{item.orderId}</span>
                    </div>
                    <div className="font-bold text-2xl toUpperCase mt-4 ">
                      {item?.doctor?.fullName || 'Đang cập nhật'}
                    </div>
                    <hr className="mt-4 border-b border-dashed border-black" />
                    <div className="mt-4 flex items-center gap-4">
                      <FaHospitalAlt className="text-cyan-500" />
                      <span className="font-medium text-3xl text-cyan-500 toUpperCase">
                        {item.hospital?.fullName || 'Đang cập nhật'}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3">
                      <div className="col-span-2">
                        <div className="items-center grid grid-cols-2">
                          <div className="flex items-center gap-4">
                            <RiServiceLine />
                            <span>Dịch vụ:</span>
                          </div>
                          <div>Nội tổng quát</div>
                        </div>
                        <div className="items-center grid grid-cols-2 mt-4 ">
                          <div className="flex items-center gap-4">
                            <MdCalendarMonth />
                            <span>Ngày khám:</span>
                          </div>
                          <div className="text-cyan-500">{formatDate(item.date)}</div>
                        </div>
                        <div className="items-center grid grid-cols-2 mt-4 ">
                          <div className="flex items-center gap-4">
                            <MdOutlineAccessTimeFilled />
                            <span>Giờ khám dự kiến:</span>
                          </div>
                          <div className="text-cyan-500">{extractTime(item?.hours[0]?.start)}</div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="flex items-end flex-col col-span-2">
                    <Button className="bg-green-500 text-white text-xl font-bold py-2">Đặt khám thành công</Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center my-6 md:my-12">
            <p className="mb-4 md:mb-6 text-lg md:text-4xl font-semibold text-neutral-400">
              Bạn chưa có phiếu khám nào
            </p>
            <img
              alt="empty"
              className="w-40 md:w-72"
              src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnull-data.b105c645.png&w=384&q=75"
            />
          </div>
        )}
      </>
    ),
    completed: (
      <>
        {appointmentData?.completed?.length > 0 ? (
          <div className="text-center">Đã khám</div>
        ) : (
          <div className="flex flex-col items-center my-6 md:my-12">
            <p className="mb-4 md:mb-6 text-lg md:text-4xl font-semibold text-neutral-400">
              Bạn chưa có phiếu khám nào
            </p>
            <img
              alt="empty"
              className="w-40 md:w-72"
              src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnull-data.b105c645.png&w=384&q=75"
            />
          </div>
        )}
      </>
    ),
    canceled: (
      <>
        {appointmentData?.canceled?.length > 0 ? (
          <div className="text-center">Đã hủy</div>
        ) : (
          <div className="flex flex-col items-center my-6 md:my-12">
            <p className="mb-4 md:mb-6 text-lg md:text-4xl font-semibold text-neutral-400">
              Bạn chưa có phiếu khám nào
            </p>
            <img
              alt="empty"
              className="w-40 md:w-72"
              src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnull-data.b105c645.png&w=384&q=75"
            />
          </div>
        )}
      </>
    ),
  };

  useEffect(() => {
    const fetchDoctordata = async () => {
      const res = await dispatch(fetchGetAppointment(patientId));
      const result = unwrapResult(res);
      setAppointmentData(result.data);
    };
    fetchDoctordata();
  }, [dispatch, patientId]);
  return (
    <div className="mx-6">
      <h1 className="font-bold text-3xl mb-6">Danh sách phiếu khám bệnh</h1>
      <div className="flex gap-4">
        <Button
          className={activeTab === 'paid' ? cx('tab-btn', 'active') : cx('tab-btn')}
          onClick={() => setActiveTab('paid')}
        >
          Đã thanh toán
        </Button>
        <Button
          className={activeTab === 'pending' ? cx('tab-btn', 'active') : cx('tab-btn')}
          onClick={() => setActiveTab('pending')}
        >
          Chưa thanh toán
        </Button>
        <Button
          className={activeTab === 'completed' ? cx('tab-btn', 'active') : cx('tab-btn')}
          onClick={() => setActiveTab('completed')}
        >
          Đã khám
        </Button>
        <Button
          className={activeTab === 'canceled' ? cx('tab-btn', 'active') : cx('tab-btn')}
          onClick={() => setActiveTab('canceled')}
        >
          Đã hủy
        </Button>
      </div>
      <div className="max-h-[500px] overflow-scroll">{tabContent[activeTab]}</div>
    </div>
  );
}

export default Appointment;
