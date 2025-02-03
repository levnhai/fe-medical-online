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

function PatientRecord() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordData, setRecordData] = useState([]);

  const partnerId = useSelector((state) => state.auth?.user.payload?.userData?._id);

  useEffect(() => {
    const fetchRecords = async () => {
      const res = await dispatch(fetchRecordUser(partnerId));
      const result = unwrapResult(res);
      setRecordData(result);
    };
    fetchRecords();
  }, [dispatch, partnerId]);

  return (
    <div className="mx-10 mb-20">
      <h1 className="font-bold text-3xl mb-8 ">Danh sách hồ sơ bệnh nhân </h1>

      {recordData?.data?.map((item, index) => {
        const address = `
            ${item?.address[0]?.street}, 
            ${item?.address[0]?.wardName}, 
            ${item?.address[0]?.provinceName}, 
            ${item?.address[0]?.wardName}`;
        return (
          <div>
            <div className="border rounded-3xl border-cyan-400 overflow-hidden" key={index}>
              <ul className="p-8">
                <li className="flex items-center gap-3">
                  <span className="">
                    <FaUser className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">Họ và tên:</span>
                  <span className=" font-bold text-cyan-500">{item?.fullName || 'Bổ sung sau '}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <FaBirthdayCake className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">Ngày sinh:</span>
                  <span className="font-semibold text-gray-600">Bổ sung sau </span>
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <FaPhoneAlt className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">Số điện thoại:</span>
                  <span className="font-semibold text-gray-600">{item?.phoneNumber}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <PiGenderIntersexBold className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">Giới tính:</span>
                  <span className="font-semibold text-gray-600">{item?.gender === 'female' ? 'Nữ' : 'Nam'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <FaLocationDot className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">Địa chỉ:</span>
                  <span className="font-semibold text-gray-600">{address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <HiMiniUserGroup className="text-zinc-400" />
                  </span>
                  <span className="text-zinc-700">Dân tộc:</span>
                  <span className="font-semibold text-gray-600">{item?.ethnic}</span>
                </li>
              </ul>
              <div className="flex justify-end bg-zinc-200 px-3 gap-2">
                <Button
                  className="text-red-500 mr-3 py-6 px-2 font-semiboldm text-2xl hover:bg-zinc-200"
                  text
                  leftIcon={<AiOutlineDelete />}
                  onClick={() => {
                    alert('Tính năng này đang phát triển, vui lòng thử lại sau');
                  }}
                >
                  Xóa hồ sơ
                </Button>
                <Button
                  className="text-cyan-400 mr-3 px-2 text-2xl hover:bg-zinc-200"
                  text
                  leftIcon={<FiEdit />}
                  onClick={() => {
                    alert('Tính năng này đang phát triển, vui lòng thử lại sau');
                  }}
                >
                  Sửa hồ sơ
                </Button>
                <Button
                  className="px-2 text-2xl hover:bg-zinc-200"
                  text
                  leftIcon={<PiWarningCircle />}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Chi tiết
                </Button>
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Chi tiết hồ sơ">
              <ul className="p-8">
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaUser className="text-zinc-400" />
                    <div className="text-zinc-700">Họ và tên:</div>
                  </div>
                  <div className="col-span-5 font-bold text-cyan-500">{item?.fullName || 'Bổ sung sau '}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaBirthdayCake className="text-zinc-400" />
                    <div className="text-zinc-700">Ngày sinh:</div>
                  </div>
                  <div className="col-span-5 font-semibold text-gray-600">Bổ sung sau </div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaPhoneAlt className="text-zinc-400" />
                    <div className="text-zinc-700">Số điện thoại:</div>
                  </div>
                  <div className="col-span-5 font-semibold text-gray-600">{item?.phoneNumber}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <PiGenderIntersexBold className="text-zinc-400" />
                    <div className="text-zinc-700">Giới tính:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">
                    {item?.gender === 'female' ? 'Nữ' : 'Nam'}
                  </div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaAddressCard className="text-zinc-400" />
                    <div className="text-zinc-700">CMND:</div>
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
                    <div className="text-zinc-700">Nghề nghiệp:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">Bổ sung sau</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <FaLocationDot className="text-zinc-400" />
                    <div className="text-zinc-700">Địa chỉ:</div>
                  </div>
                  <div className=" col-span-5 font-semibold text-gray-600">{address}</div>
                </li>
                <li className="grid grid-cols-8 py-4">
                  <div className="col-span-3 flex items-center gap-4">
                    <HiMiniUserGroup className="text-zinc-400" />
                    <div className="text-zinc-700">Dân tộc:</div>
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
