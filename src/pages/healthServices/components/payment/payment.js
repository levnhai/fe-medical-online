import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';

import { fetchPayment, fetchClinicPayment } from '~/redux/payment/paymentSlice';
import Sidebar from '../sidebar';
import { extractTime } from '~/utils/time';
import Modal from '~/components/modal';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { bookingData, updateBookingData } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookingData = useSelector((state) => state.booking);

  // phương thức thanh toán
  const paymentMethods = [
    {
      id: 'vietqr',
      name: 'VietQR',
      description: 'Thanh toán chuyển khoản bằng ứng dụng ngân hàng/ Ví điện tử.',
      image: 'https://play.thinkmay.net/img/icon/payment.png',
      link: 'https://payment.example.com/vietqr',
    },
    {
      id: 'vnpay',
      name: 'VNPAY QR',
      description: 'Ngân hàng có hỗ trợ VNPAY QR.',
      image: 'https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg',
      link: 'https://payment.example.com/vnpay',
    },
    {
      id: 'momo',
      name: 'Ví Momo',
      description: 'Thanh toán tiện lợi qua ví Momo.',
      image: 'https://developers.momo.vn/v3/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png',
      link: 'https://payment.example.com/momo',
    },

    {
      id: 'atm',
      name: 'Thẻ ATM nội địa/Internet Banking',
      description: 'Thanh toán bằng ATM hoặc internet banking.',
      image: 'https://example.com/atm.png',
      link: 'https://payment.example.com/atm',
    },
    {
      id: 'cash',
      name: 'Thanh toán tại phòng khám',
      description: 'Thanh toán khi tới khám bệnh',
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
    // const selectedPayment = paymentMethods.find((method) => method.id === selectedMethod);
    setIsModalOpen(false); // Đóng Modal
    const formData = {
      patientId: bookingData.patientProfile.userId,
      doctorId: bookingData.doctor.id,
      hospitalId: bookingData.hospital.id,
      date: bookingData.date,
      price: bookingData.price,
      status: bookingData.hospital.id,
      hours: bookingData.time,
      paymentMethod: selectedMethod,
      orderId: `ORDER_${Date.now()}`,
    };
    console.log('check form data', formData);
    const res = await dispatch(fetchClinicPayment({ formData }));
    const result = unwrapResult(res);

    if (result?.status) {
      console.log('hải kê');
      navigate(`/chi-tiet-phieu-kham-benh?transactionId=${result?.appointment?.orderId}`);
    }
    console.log('chekc hair kee', result);
    // if (result?.vnpUrl) {
    //   window.location.href = result?.vnpUrl; // Redirect đến VNPay
    // }
  };

  return (
    <div className={cx('appointment-doctor')}>
      <div className="max-w-screen-lg m-auto">
        <div className={cx('', 'py-4')}>
          <ul className="flex">
            <li className="flex items-center">
              <a href="#/" className="font-semibold">
                Trang chủ
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
                Thanh toán
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('grid grid-cols-4 gap-10 px-10')}>
          <div className="rounded-lg">
            <Sidebar />
          </div>
          <div className="flex gap-10 flex-col col-span-3 rounded-lg overflow-hidden">
            <div className={cx('bg-white', 'rounded-lg')}>
              <div>
                <div className={cx('title')}>Chọn phương thức thanh toán</div>
                <div className={cx('content')}>
                  <div className="grid grid-cols-9 p-6 gap-8">
                    <div className="col-span-5">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="mb-4">
                          <label className="flex items-baseline gap-4 cursor-pointer">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={selectedMethod === method.id}
                              onChange={() => setSelectedMethod(method.id)}
                            />
                            <div className="flex flex-col">
                              <span>{method.name}</span>
                              <span className="text-xl leading-none">{method.description}</span>
                            </div>
                          </label>

                          {/* Hiển thị description và image */}
                          {selectedMethod === method.id && (
                            <div style={{ marginTop: '10px' }}>
                              {method.image && (
                                <img
                                  src={method.image}
                                  alt={method.name}
                                  style={{ width: '120px', height: 'auto', cursor: 'pointer' }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="col-span-4">
                      <div className="flex items-center gap-4 py-4">
                        <CiCreditCard1 />
                        <h2 className="text-sky-500 text-4xl font-semibold">Thông tin thanh toán</h2>
                      </div>
                      <div className="border border-cyan-400 rounded-lg">
                        <ul className="p-4">
                          <li className="flex p-3 justify-between">
                            <div className="flex items-center gap-4">
                              <MdAlternateEmail className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950 font-medium">Chuyên khoa:</span>
                            </div>
                            <div>{bookingData?.doctor?.specialty}</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <FaUserDoctor className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">Bác sĩ:</span>
                            </div>
                            <div> {bookingData?.doctor?.fullName}</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <MdAlternateEmail className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">Dịch vụ:</span>
                            </div>
                            <div>Khám dịch vụ</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <MdOutlineDateRange className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">Ngày khám:</span>
                            </div>
                            <div> {bookingData?.date}</div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <MdAccessTime className="text-2xl text-gray-950" />
                              <span className="text-2xl text-gray-950">Giờ khám:</span>
                            </div>
                            <div>
                              {extractTime(bookingData?.time.start)} - {extractTime(bookingData?.time.end)}
                            </div>
                          </li>
                          <li className="flex p-3 border-t justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-2xl text-gray-950">Tiền khám:</span>
                            </div>
                            <div> {bookingData?.price.toLocaleString('en-US')}</div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between my-6">
                          <span className="text-2xl font-medium">Phí tiện ích + Phí TGTT :</span>
                          <span>1.000 đ</span>
                        </div>
                        <div className="flex justify-between mb-6">
                          <span className="text-3xl font-medium">Tổng cộng:</span>
                          <span className="text-sky-500 text-3xl font-semibold">
                            {bookingData?.price.toLocaleString('en-US')}
                          </span>
                        </div>
                        {/* <div>
                          <p>
                            <input type="checkbox" checked readOnly />
                            Tôi đồng ý với Phí tiện ích Medical để sử dụng dịch vụ đặt khám, thanh toán viện phí, tra
                            cứu kết quả khám và các tính năng tiện lợi khác trên nền tảng Medical.
                          </p>
                        </div> */}
                      </div>
                      <div className="flex justify-end w-full">
                        <Button className="bg-sky-400 text-white" disabled={!selectedMethod} onClick={handleOpenModal}>
                          Thanh toán
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
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Xác nhận thanh toán"
        // paymentName={paymentMethods.find((method) => method.id === selectedMethod).name}
      >
        <div>
          <div className="">
            <div className="p-8">
              <div>
                Thanh toán số tiền
                <strong className="font-semibold"> {bookingData?.price.toLocaleString('en-US')}</strong> bằng
                <strong className="font-semibold"> Thanh toán tại Phòng Khám</strong>
              </div>
              <div className="rounded-lg p-8 mt-6 text-2xl" style={{ backgroundColor: '#cce5ff' }}>
                Bạn sẽ nhận được phiếu khám bệnh ngay khi <span className="font-semibold">Thanh toán thành công </span>.
                Trong trường hợp không nhận được phiếu khám bệnh, vui lòng liên hệ
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
                  Hủy
                </Button>
                <Button
                  style={{
                    background: 'linear-gradient(36deg, var(--blue-color), #00e0ff)',
                  }}
                  className="text-white p-4 text-xl"
                  onClick={handleConfirmPayment}
                >
                  Xác nhận
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
