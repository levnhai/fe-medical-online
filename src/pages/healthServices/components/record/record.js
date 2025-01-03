import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import { fetchRecordUser } from '~/redux/user/authSlice';
import { useBooking } from '~/context/bookingContext';
import { updateBooking } from '~/redux/booking/bookingSlice';

// icon
import { MdKeyboardArrowRight, MdOutlineMail } from 'react-icons/md';
import { FaUserCircle, FaBirthdayCake, FaPhoneAlt, FaRegEdit, FaLongArrowAltRight, FaUserPlus } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import { BsGenderTrans } from 'react-icons/bs';
import { HiOutlineUserGroup, HiOutlineArrowUturnLeft } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';

function ChooseRecord() {
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
          <ul className="flex">
            <li className="flex items-center">
              <a href="#/" className="font-semibold">
                Trang chủ
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className="flex items-center text-sky-500 font-semibold">Chọn hồ sơ bệnh nhân</li>
          </ul>
        </div>
        <div className="flex justify-center items-center flex-col pb-20">
          <h1 className="text-5xl font-bold text-sky-500">Chọn hồ sơ bệnh nhân</h1>
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
                        <span className="text-2xl text-zinc-500">Ngày sinh: </span>
                      </div>
                      <div className="col-span-2">16-02-03</div>
                    </li>
                    <li className="grid grid-cols-3 gap-4">
                      <div className="flex gap-4 items-center">
                        <FaPhoneAlt className="text-2xl text-zinc-500" />
                        <span className="text-2xl text-zinc-500">Số điện thoại:</span>
                      </div>
                      <div className="col-span-2 ">{item?.phoneNumber}</div>
                    </li>
                    <li className="grid grid-cols-3 gap-4">
                      <div className="flex gap-4 items-center">
                        <GiPositionMarker className="text-2xl text-zinc-500" />
                        <span className="text-2xl text-zinc-500">Địa chỉ: </span>
                      </div>
                      <div className="col-span-2">{address}</div>
                    </li>

                    {showMore && (
                      <li className="grid grid-cols-3 gap-4">
                        <div className="flex gap-4 items-center">
                          <BsGenderTrans className="text-2xl text-zinc-500" />
                          <span className="text-2xl text-zinc-500">Giới tính: </span>
                        </div>
                        <div className="col-span-2">{item?.gender}</div>
                      </li>
                    )}
                    {showMore && (
                      <li className="grid grid-cols-3 gap-4">
                        <div className="flex gap-4 items-center">
                          <HiOutlineUserGroup className="text-2xl text-zinc-500" />
                          <span className="text-2xl text-zinc-500">Dân tộc: </span>
                        </div>
                        <div className="col-span-2">{item?.ethnic}</div>
                      </li>
                    )}
                    <li className="grid grid-cols-3 gap-4 pb-4">
                      <div className="flex gap-4 items-center">
                        <MdOutlineMail className="text-2xl text-zinc-500" />
                        <span className="text-2xl text-zinc-500">Địa chỉ email:</span>
                      </div>
                      <div className="col-span-2">{item?.email}</div>
                    </li>
                    {showMore && (
                      <li className=" border-t border-slate-300 pt-10">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="flex col-span-3 gap-6">
                            <Button leftIcon={<RiDeleteBin6Line />} className="bg-red-100 text-rose-500 p-0 text-xl">
                              Xóa
                            </Button>
                            <Button leftIcon={<FaRegEdit />} className="bg-cyan-100 text-sky-500 text-xl">
                              Sửa
                            </Button>
                            <div></div>
                          </div>
                          <Button
                            rightIcon={<FaLongArrowAltRight />}
                            className="col-span-2 text-xl text-white bg-cyan-400"
                            onClick={() => {
                              // updateBookingData('patientProfile', item);
                              dispatch(updateBooking({ key: 'patientProfile', value: item }));
                              navigate('/chon-lich-kham?feature=booking.doctor&stepName=confirm');
                            }}
                          >
                            Tiếp tục
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
                Quay lại
              </Button>
              <Button
                leftIcon={<FaUserPlus />}
                onClick={() => {
                  toast.warning('Tính năng này đang phát triển!');
                }}
                className="bg-transparent font-medium
                  hover:bg-zinc-100"
              >
                Thêm hồ sơ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseRecord;
