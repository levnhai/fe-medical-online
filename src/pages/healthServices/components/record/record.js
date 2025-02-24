import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

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
  const bookingData = useSelector((state) => state.booking);
  const [selectedItem, setSelectedItem] = useState(null);

  const goToPreviousStep = () => {
    updateBookingData('doctor', { fullName: null, id: null, specialty: null });
    navigate(
      `/chon-lich-kham?feature=booking.doctor&partnerId=${userId}&stepName=date&doctorId=${bookingData?.doctor?.id}`,
    );
  };

  const handleClickShowMoreItem = (id) => {
    setSelectedItem(selectedItem === id ? null : id);
  };

  useEffect(() => {
    const fetchScheduleData = async () => {
      const res = await dispatch(fetchRecordUser({ recordId: userId }));
      const result = unwrapResult(res);
      setRecords(result);
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
          <div className="w-full">
            <div>
              {records?.data?.length > 0 ? (
                <div className="grid grid-cols-4 gap-10 mt-8">
                  {records?.data?.map((item, index) => {
                    let address = `${item.address[0].street}, ${item.address[0].wardName}, ${item.address[0].districtName}, ${item.address[0].provinceName}`;
                    return (
                      <ul
                        key={index}
                        className="col-span-2 flex flex-col gap-2 p-8 cursor-pointer bg-white rounded-xl"
                        onClick={() => {
                          handleClickShowMoreItem(index);
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

                        {selectedItem === index && (
                          <li className="grid grid-cols-3 gap-4">
                            <div className="flex gap-4 items-center">
                              <BsGenderTrans className="text-2xl text-zinc-500" />
                              <span className="text-2xl text-zinc-500">Giới tính: </span>
                            </div>
                            <div className="col-span-2">{item?.gender}</div>
                          </li>
                        )}
                        {selectedItem === index && (
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
                        {selectedItem === index && (
                          <li className=" border-t border-slate-300 pt-10">
                            <div className="grid grid-cols-5 gap-4">
                              <div className="flex col-span-3 gap-6">
                                <Button
                                  leftIcon={<RiDeleteBin6Line />}
                                  className="bg-red-100 text-rose-500 p-0 text-xl"
                                >
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
              ) : (
                <div className="flex flex-col items-center my-8">
                  <p className="mb-6 text-center text-2xl font-semibold text-neutral-400">
                    Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.
                  </p>
                  <img
                    alt="empty"
                    width="240px"
                    height="240px"
                    // src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnull-data.b105c645.png&w=384&q=75"
                    src={require('~/assets/images/Empty.webp')}
                  />
                </div>
              )}
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
                to="/tao-moi-ho-so"
                leftIcon={<FaUserPlus />}
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
