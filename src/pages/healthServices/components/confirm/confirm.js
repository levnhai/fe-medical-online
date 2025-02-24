import { useNavigate } from 'react-router-dom';
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

import styles from '../appointmentDoctor/appointmentDoctor.module.scss';
const cx = className.bind(styles);

function Confirm() {
  const navigate = useNavigate();
  const bookingData = useSelector((state) => state.booking);

  const goToPreviousStep = () => {
    navigate(`/chon-lich-kham?feature=booking.doctor&stepName=record`);
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
                Xác nhận thông tin
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('grid grid-cols-4 gap-10 px-10')}>
          <div className=" rounded-lg">
            <Sidebar />
          </div>
          <div className="flex gap-8 flex-col col-span-3 rounded-lg overflow-hidden">
            <div className={cx('bg-white rounded-lg')}>
              <div>
                <div className={cx('title')}>Xác nhận thông tin khám</div>
                <div className={cx('content')}>
                  <div className="p-6">
                    <div>
                      <ul className="flex w-full">
                        <li className="w-1/12 text-left font-semibold"> #</li>
                        <li className="w-1/5 text-left font-semibold">Chuyên khoa</li>
                        <li className="w-1/5 text-left font-semibold">Bác sĩ</li>
                        <li className="w-1/5 text-left font-semibold">Thời gian khám</li>
                        <li className="w-1/5 text-left font-semibold">Tiền khám</li>
                        <li className="w-1/12 text-left font-semibold"></li>
                      </ul>
                    </div>
                    <div className="border-t pt-6 mt-6">
                      <ul className="flex w-full">
                        <li className="w-1/12 text-left">1</li>
                        <li className="w-1/5 text-left">{bookingData?.doctor?.specialty}</li>
                        <li className="w-1/5 text-left">{bookingData?.doctor?.fullName}</li>
                        <li className="w-1/5 text-left">
                          {extractTime(bookingData?.time.start)} - {extractTime(bookingData?.time.end)} <br />{' '}
                          {bookingData?.date}
                        </li>
                        <li className="w-1/5 text-left">
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
                <div className={cx('title')}>Thông tin bệnh nhân</div>
                <div className={cx('content')}>
                  <div className="p-6">
                    <div>
                      <ul className="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 col-span-2 items-center">
                              <FaUserCircle className="text-2xl  text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Họ và tên: </span>
                            </div>
                            <div className="col-span-3 text-2xl text-sky-500">
                              {bookingData?.patientProfile?.fullName.toUpperCase()}
                            </div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <FaBirthdayCake className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Ngày sinh: </span>
                            </div>
                            <div className="col-span-3">16-02-03</div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <FaPhoneAlt className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Số điện thoại:</span>
                            </div>
                            <div className="col-span-3"> {bookingData?.patientProfile?.phoneNumber}</div>
                          </li>

                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 col-span-2 items-center">
                              <MdAlternateEmail className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Địa chỉ email:</span>
                            </div>
                            <div className="col-span-3"> {bookingData?.patientProfile?.email}</div>
                          </li>
                          <li className="grid grid-cols-5 gap-4 ">
                            <div className="flex gap-4 items-center col-span-2">
                              <CiCreditCard1 className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Mã số BHYT:</span>
                            </div>
                            <div className="col-span-3">Cập nhật sau </div>
                          </li>
                        </div>

                        <div className="col-span-1">
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <BsGenderTrans className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Giới tính: </span>
                            </div>
                            <div className="col-span-3"> {bookingData?.patientProfile?.gender}</div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <FaIdCard className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">CCCD: </span>
                            </div>
                            <div className="col-span-3"> {bookingData?.patientProfile?.cccd}</div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <HiOutlineUserGroup className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Dân tộc: </span>
                            </div>
                            <div className="col-span-3">{bookingData?.patientProfile?.ethnic}</div>
                          </li>
                          <li className="grid grid-cols-5 gap-4">
                            <div className="flex gap-4 items-center col-span-2">
                              <GiPositionMarker className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Địa chỉ: </span>
                            </div>
                            <div className="col-span-3">Cập nhật sau</div>
                          </li>
                        </div>
                      </ul>
                    </div>
                    <div className="flex bg-red-100 text-rose-600 p-2 rounded-xl mt-6 text-2xl">
                      <PiWarningCircle className="min-w-10" />
                      Trong thời gian quy định, nếu quý khách hàng hủy phiếu khám sẽ được hoàn lại tiền khám và các dịch
                      vụ đặt thêm (không bao gồm phí tiện ích).
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
                Quay lại
              </Button>
              <Button
                onClick={() => {
                  navigate('/chon-lich-kham?feature=booking.doctor&stepName=payment');
                }}
                className="text-white bg-cyan-400"
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
