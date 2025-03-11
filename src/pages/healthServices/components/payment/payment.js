import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';

import { fetchClinicPayment, fetchPayment, fetchCreateUrlMomo } from '~/redux/payment/paymentSlice';
import Sidebar from '../sidebar';
import { extractTime } from '~/utils/time';
import Modal from '~/components/modal';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
// icon
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaUserDoctor } from 'react-icons/fa6';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdAccessTime, MdOutlineDateRange, MdAlternateEmail } from 'react-icons/md';
import { HiOutlineArrowUturnLeft } from 'react-icons/hi2';

import styles from '../appointmentDoctor/appointmentDoctor.module.scss';
import Button from '~/components/Button';
const cx = className.bind(styles);

function PaymentMethod() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { bookingData, updateBookingData } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookingData = useSelector((state) => state.booking);
  console.log('check booking data', selectedMethod);

  // phương thức thanh toán
  const paymentMethods = [
    // {
    //   id: 'vietqr',
    //   name: 'VietQR',
    //   description: 'Thanh toán chuyển khoản bằng ứng dụng ngân hàng/ Ví điện tử.',
    //   image: 'https://play.thinkmay.net/img/icon/payment.png',
    //   link: 'https://payment.example.com/vietqr',
    // },
    {
      id: 'vnpay',
      name: 'VNPAY QR',
      description: t('appointments.payment.vnpay'),
      image: 'https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg',
      link: 'https://payment.example.com/vnpay',
    },
    {
      id: 'momo',
      name: t('appointments.payment.momo'),
      description: t('appointments.payment.momodes'),
      image: 'https://developers.momo.vn/v3/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png',
      link: 'https://payment.example.com/momo',
    },

    // {
    //   id: 'atm',
    //   name: 'Thẻ ATM nội địa/Internet Banking',
    //   description: 'Thanh toán bằng ATM hoặc internet banking.',
    //   image: 'https://example.com/atm.png',
    //   link: 'https://payment.example.com/atm',
    // },
    {
      id: 'cash',
      name: t('appointments.payment.cash'),
      description: t('appointments.payment.cashdes'),
      image: 'https://medpro.vn/_next/static/media/payment.94293b0e.gif?w=128&q=75',
      link: 'https://payment.example.com/atm',
    },
  ];

  const goToPreviousStep = () => {
    // updateBookingData('doctor', { fullName: null, id: null, specialty: null });
    // navigate(`/chon-lich-kham?feature=booking.doctor&partnerId=${partnerId}&stepName=doctor`);
  };

  // Xử lý mở Modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Xử lý xác nhận thanh toán
  const handleConfirmPayment = async () => {
    setIsModalOpen(false); // Đóng Modal
    const formData = {
      patientId: bookingData.patientProfile,
      doctor: bookingData.doctor,
      hospital: bookingData.hospital,
      date: bookingData.date,
      price: bookingData.price,
      status: 'pending',
      hours: bookingData.time,
      paymentMethod: selectedMethod,
      orderId: `ORDER_${Date.now()}`,
    };

    switch (selectedMethod) {
      case 'cash': {
        const res = await dispatch(fetchClinicPayment({ formData }));
        const result = unwrapResult(res);

        if (result?.status) {
          navigate(`/chi-tiet-phieu-kham-benh?transactionId=${result?.appointment?.orderId}`);
        }
        break;
      }
      case 'vnpay': {
        const res = await dispatch(fetchPayment({ formData }));
        if (res.payload) {
          window.location.href = res.payload; // Chuyển hướng đến trang thanh toán VNPay
        }
        break;
      }

      case 'momo': {
        const res = await dispatch(fetchCreateUrlMomo({ formData }));
        if (res?.payload?.payUrl) {
          window.location.href = res?.payload?.payUrl; // Chuyển hướng đến trang thanh toán VNPay
        }
        console.log('Thanh toán với ví momo');
        break;
      }
      default: {
      }
    }
  };

  return (
    <div className={cx('appointment-doctor')}>
      <div className="max-w-screen-lg m-auto">
        <div className={cx('-mt-20 mb-8 ms-8 md:mt-8')}>
          <ul className={cx('flex flex-col sm:flex-row')}>
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
              {t('appointments.payment.path')}
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('grid grid-cols-1 md:grid-cols-4 gap-4 px-4')}>
          <div className={cx('md:col-span-1')}>
            <Sidebar />
          </div>
          <div className="flex gap-10 flex-col md:col-span-3 rounded-lg overflow-hidden">
            <div className={cx('bg-white', 'rounded-lg')}>
              <div>
                <div className={cx('title')}>{t('appointments.payment.title')}</div>
                <div className={cx('content')}>
                  <div className="grid grid-cols-9 p-6 gap-8">
                    <div className="col-span-9 md:col-span-5">
                      {paymentMethods.map((method) => (
                        <div onClick={() => setSelectedMethod(method.id)} key={method.id} className="mb-4">
                          <label className="flex items-baseline gap-4 cursor-pointer">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={selectedMethod === method.id}
                              // onChange={() => setSelectedMethod(method.id)}
                            />
                            <div className="flex flex-col">
                              <span>{method.name}</span>
                              <span className="text-xl leading-none">{method.description}</span>
                            </div>
                          </label>
                          {selectedMethod === method.id && (
                            <div className="mt-2">
                              {method.image && (
                                <img
                                  src={method.image}
                                  alt={method.name}
                                  className="w-32 h-auto cursor-pointer"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="col-span-9 md:col-span-4">
                      <div className="flex items-center gap-4 py-4">
                        <CiCreditCard1 />
                        <h2 className="text-sky-500 text-4xl font-semibold">
                          {t('appointments.payment.subTitle')}
                        </h2>
                      </div>
                      <div className="border border-cyan-400 rounded-lg">
                        <ul className="p-4">
                          <li className="flex p-3 justify-between">
                            <div className="flex items-center gap-4">
                              <MdAlternateEmail className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950 font-medium">
                                {t('appointments.payment.specialist')}:
                              </span>
                            </div>
                            <div>{bookingData?.doctor?.specialty}</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <FaUserDoctor className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">
                                {t('appointments.payment.doctor')}:
                              </span>
                            </div>
                            <div>{bookingData?.doctor?.fullName}</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <MdAlternateEmail className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">
                                {t('appointments.payment.service')}:
                              </span>
                            </div>
                            <div>Khám dịch vụ</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <MdOutlineDateRange className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">
                                {t('appointments.payment.date')}:
                              </span>
                            </div>
                            <div>{bookingData?.date}</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <MdAccessTime className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">
                                {t('appointments.payment.time')}:
                              </span>
                            </div>
                            <div>
                              {extractTime(bookingData?.time.start)} - {extractTime(bookingData?.time.end)}
                            </div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-2xl text-gray-950">
                                {t('appointments.payment.price')}:
                              </span>
                            </div>
                            <div>{bookingData?.price.toLocaleString('en-US')}</div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between my-6">
                          <span className="text-2xl font-medium">{t('appointments.payment.fee')}:</span>
                          <span>1.000 đ</span>
                        </div>
                        <div className="flex justify-between mb-6">
                          <span className="text-3xl font-medium">{t('appointments.payment.sum')}:</span>
                          <span className="text-sky-500 text-3xl font-semibold">
                            {bookingData?.price.toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end w-full">
                        <Button className="bg-sky-400 text-white" disabled={!selectedMethod} onClick={handleOpenModal}>
                          {t('appointments.payment.payment')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={'mb-4 mt-0'}>
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
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('appointments.payment.confirm')}
        // paymentName={paymentMethods.find((method) => method.id === selectedMethod).name}
      >
        <div>
          <div className="">
            <div className="p-8">
              <div>
                Thanh toán số tiền
                <strong className="font-semibold"> {bookingData?.price.toLocaleString('en-US')}</strong>
                <strong className="font-semibold">
                  {selectedMethod === 'cash' ? 'tại phòng khám' : selectedMethod === 'momo' ? 'Với Momo' : 'VnPay'}
                </strong>
              </div>
              <div className="rounded-lg p-8 mt-6 text-2xl" style={{ backgroundColor: '#cce5ff' }}>
              {t('appointments.payment.q3')} <span className="font-semibold">{t('appointments.payment.q4')} </span>.
              {t('appointments.payment.q5')}
                <span className="font-semibold"> 1800 1234</span>
              </div>
            </div>
            <div className="border-t flex justify-end py-4">
              <div className="pr-6">
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="font-medium text-xl"
                >
                  {t('appointments.payment.quit')}
                </Button>
                <Button
                  style={{
                    background: 'linear-gradient(36deg, var(--blue-color), #00e0ff)',
                  }}
                  className="text-white p-4 text-xl"
                  onClick={handleConfirmPayment}
                >
                  {t('appointments.payment.ok')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PaymentMethod;
