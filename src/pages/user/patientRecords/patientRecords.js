import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
import { fetchDeleteRecord } from '~/redux/record/recordSlice';
import { formatDate } from '~/utils/time';

function PatientRecord() {
  const dispatch = useDispatch();
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [recordData, setRecordData] = useState([]);
  console.log('check recordData', recordData);

  const partnerId = useSelector((state) => state.auth?.user.payload?.userData?._id);

  const fetchRecords = async () => {
    const res = await dispatch(fetchRecordUser({ recordId: partnerId }));
    const result = unwrapResult(res);
    setRecordData(result);
  };

  const handleDeleteRecord = async () => {
    const res = await dispatch(fetchDeleteRecord({ recordId: selectedPatientId }));
    const result = unwrapResult(res);
    fetchRecords();
    setIsModalDeleteOpen(false);
    toast.success(result?.message);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="mx-10 mb-20">
      <h1 className="font-bold text-3xl">Danh sách hồ sơ bệnh nhân </h1>

      {recordData?.data?.length > 0 ? (
        <div>
          {recordData?.data?.map((item, index) => {
            const address = `
                ${item?.address[0]?.street}, 
                ${item?.address[0]?.wardName}, 
                ${item?.address[0]?.provinceName}, 
                ${item?.address[0]?.wardName}`;
            return (
              <div className="mt-8">
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
                      <span className="font-semibold text-gray-600">{formatDate(item?.birthdate)}</span>
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
                        setIsModalDeleteOpen(true);
                        setSelectedPatientId(item._id);
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
                        setIsModalDetailOpen(true);
                      }}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
                <Modal isOpen={isModalDetailOpen} onClose={() => setIsModalDetailOpen(false)} title="Chi tiết hồ sơ">
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
                <Modal isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} title="Thông báo">
                  <p className="px-10 py-10 text-2xl ">Bạn có muốn chắc chắn xóa bệnh nhân này không?</p>
                  <div className="flex justify-end border-t py-2 pr-6 gap-4">
                    <Button onClick={() => setIsModalDeleteOpen(false)}>Đóng</Button>
                    <Button className="bg-red-400" onClick={handleDeleteRecord}>
                      Đồng ý
                    </Button>
                  </div>
                </Modal>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center my-12 ">
          <p className="mb-6 text-4xl font-semibold text-neutral-400">
            Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.
          </p>
          <img
            alt="empty"
            width="302px"
            height="298px"
            src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnull-data.b105c645.png&w=384&q=75"
          />
        </div>
      )}
    </div>
  );
}

export default PatientRecord;
