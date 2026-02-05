import { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import Modal from '~/components/modal';
import { fetchRecordUser } from '~/redux/user/authSlice';
import { useBooking } from '~/context/bookingContext';
import { updateBooking } from '~/redux/booking/bookingSlice';
import { useTranslation } from 'react-i18next';
import { fetchDeleteRecord } from '~/redux/record/recordSlice';
import { formatDate } from '~/utils/time';
import '~/translation/i18n';
import EditRecord from '~/pages/user/patientRecords/modal/editRecord';

// icon
import { MdKeyboardArrowRight, MdOutlineMail } from 'react-icons/md';
import { FaUserCircle, FaBirthdayCake, FaPhoneAlt, FaRegEdit, FaLongArrowAltRight, FaUserPlus } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import { BsGenderTrans } from 'react-icons/bs';
import { HiOutlineUserGroup, HiOutlineArrowUturnLeft } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';

const initialState = {
  records: [],
  selectedItem: null,
  showModalDelete: false,
  showModalEdit: false,
  editRecord: null,
  selectedRecordId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RECORDS':
      return { ...state, records: action.payload };
    case 'DELETE_RECORD':
      return { ...state, records: state?.records.filter((record) => record?._id !== action?.payload) };
    case 'SELECTED_ITEM':
      return { ...state, selectedItem: state?.selectedItem === action?.payload ? null : action?.payload };
    case 'SHOW_MODAL_DELETE':
      return { ...state, showModalDelete: action.payload };
    case 'SHOW_MODAL_EDIT':
      return { ...state, showModalEdit: action.payload };
    case 'EDIT_RECORD':
      return { ...state, editRecord: action.payload };
    default:
      return state;
  }
};

function ChooseRecord() {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  const [state, localDispatch] = useReducer(reducer, initialState);

  const user = useSelector((state) => state.auth.user?.payload);
  const userId = user?.userData._id;
  const bookingData = useSelector((state) => state.booking);
  const [editRecord, setEditRecord] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  console.log('editRecord', editRecord);

  const goToPreviousStep = () => {
    updateBookingData('doctor', { fullName: null, id: null, specialty: null });
    navigate(
      `/chon-lich-kham?feature=booking.doctor&partnerId=${userId}&stepName=date&doctorId=${bookingData?.doctor?.id}`,
    );
  };

  const handleClickShowMoreItem = (id) => {
    localDispatch({ type: 'SELECTED_ITEM', payload: id });
  };

  const handleDeleteRecord = async () => {
    try {
      const res = await dispatch(fetchDeleteRecord({ recordId: selectedRecordId }));
      const result = unwrapResult(res);
      if (result?.status) {
        localDispatch({ type: 'SHOW_MODAL_DELETE', payload: false });
        localDispatch({ type: 'DELETE_RECORD', payload: selectedRecordId });
        toast.success(result?.message);
      } else {
        toast.warning(result?.message);
      }
    } catch (error) {
      toast.error('Xóa hồ sơ thất bại');
    }
  };

  const fetchRecordData = async () => {
    try {
      const res = await dispatch(fetchRecordUser({ recordId: userId }));
      const result = unwrapResult(res);
      localDispatch({ type: 'FETCH_RECORDS', payload: result?.data });
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecordData();
  }, []);
  return (
    <div className="">
      <div className="max-w-screen-lg m-auto">
        <div className={'-mt-20 mb-8 ms-8 md:mt-8'}>
          <ul className={'flex flex-col sm:flex-row text-xl'}>
            <li className={'flex items-center'}>
              <a href="#/" className="font-semibold">
                {t('header.home')}
              </a>
              <MdKeyboardArrowRight />
            </li>
            <li className="flex items-center text-sky-500 font-semibold">{t('appointments.date.chooseProfile')}</li>
          </ul>
        </div>
        <div className="flex justify-center items-center flex-col pb-10 sm:pb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-500 text-center mb-8">
            Chọn hồ sơ bệnh nhân
          </h1>

          <div className="w-full px-4">
            <div>
              {state?.records?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
                  {state?.records?.map((item, index) => {
                    let address = `${item.address[0].street}, ${item.address[0].wardName}, ${item.address[0].districtName}, ${item.address[0].provinceName}`;
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-2 p-4 sm:p-6 md:p-8 cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        onClick={() => {
                          handleClickShowMoreItem(index);
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex gap-2 sm:gap-3 items-center">
                            <FaUserCircle className="text-xl sm:text-2xl text-zinc-500" />
                            <span className="text-xl sm:text-2xl font-medium text-sky-500">
                              {item?.fullName.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <ul className="flex flex-col gap-3 w-full">
                          <li className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                            <div className="flex gap-2 items-center">
                              <FaBirthdayCake className="text-lg sm:text-xl text-zinc-500" />
                              <span className="text-base sm:text-lg text-zinc-500">Ngày sinh: </span>
                            </div>
                            <div className="sm:col-span-2 pl-7 sm:pl-0">{formatDate(item?.birthdate)}</div>
                          </li>

                          <li className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                            <div className="flex gap-2 items-center">
                              <FaPhoneAlt className="text-lg sm:text-xl text-zinc-500" />
                              <span className="text-base sm:text-lg text-zinc-500">Số điện thoại:</span>
                            </div>
                            <div className="sm:col-span-2 pl-7 sm:pl-0">{item?.phoneNumber}</div>
                          </li>

                          <li className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                            <div className="flex gap-2 items-center">
                              <GiPositionMarker className="text-lg sm:text-xl text-zinc-500" />
                              <span className="text-base sm:text-lg text-zinc-500">Địa chỉ: </span>
                            </div>
                            <div className="sm:col-span-2 pl-7 sm:pl-0 break-words">{address}</div>
                          </li>

                          <li className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                            <div className="flex gap-2 items-center">
                              <MdOutlineMail className="text-lg sm:text-xl text-zinc-500" />
                              <span className="text-base sm:text-lg text-zinc-500">Địa chỉ email:</span>
                            </div>
                            <div className="sm:col-span-2 pl-7 sm:pl-0 break-words">{item?.email}</div>
                          </li>

                          {state?.selectedItem === index && (
                            <>
                              <li className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                                <div className="flex gap-2 items-center">
                                  <BsGenderTrans className="text-lg sm:text-xl text-zinc-500" />
                                  <span className="text-base sm:text-lg text-zinc-500">Giới tính: </span>
                                </div>
                                <div className="sm:col-span-2 pl-7 sm:pl-0">{item?.gender}</div>
                              </li>

                              <li className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                                <div className="flex gap-2 items-center">
                                  <HiOutlineUserGroup className="text-lg sm:text-xl text-zinc-500" />
                                  <span className="text-base sm:text-lg text-zinc-500">Dân tộc: </span>
                                </div>
                                <div className="sm:col-span-2 pl-7 sm:pl-0">{item?.ethnic}</div>
                              </li>
                            </>
                          )}
                        </ul>

                        {state?.selectedItem === index && (
                          <div className="border-t border-slate-300 mt-4 pt-4">
                            <div className="flex flex-row gap-3 justify-between items-center">
                              <Button
                                leftIcon={<RiDeleteBin6Line />}
                                className="bg-red-100 text-rose-500 px-2 py-3 text-sm sm:text-base"
                                onClick={() => {
                                  localDispatch({ type: 'SHOW_MODAL_DELETE', payload: true });
                                  setSelectedRecordId(item._id);
                                }}
                              >
                                Xóa
                              </Button>
                              <Button
                                leftIcon={<FaRegEdit />}
                                className="bg-cyan-100 text-sky-500 px-2 py-3 text-sm sm:text-base"
                                onClick={() => {
                                  localDispatch({ type: 'SHOW_MODAL_EDIT', payload: true });
                                  setEditRecord(item);
                                }}
                              >
                                Sửa
                              </Button>
                              <Button
                                rightIcon={<FaLongArrowAltRight />}
                                className="text-sm sm:text-base text-white bg-cyan-400 hover:bg-cyan-500 px-2 py-3 w-auto"
                                onClick={() => {
                                  dispatch(updateBooking({ key: 'patientProfile', value: item }));
                                  navigate('/chon-lich-kham?feature=booking.doctor&stepName=confirm');
                                }}
                              >
                                Tiếp tục
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center my-6 sm:my-8">
                  <p className="mb-4 sm:mb-6 text-center text-lg sm:text-xl md:text-2xl font-semibold text-neutral-400 px-2">
                    Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.
                  </p>
                  <img
                    alt="empty"
                    className="w-40 sm:w-48 md:w-60 h-auto"
                    src={require('~/assets/images/Empty.webp')}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between gap-3 mt-8 sm:mt-10 md:mt-12">
              <Button
                rightIcon={<HiOutlineArrowUturnLeft />}
                onClick={goToPreviousStep}
                className="bg-transparent font-medium hover:bg-zinc-100"
              >
                {t('appointments.form.back')}
              </Button>
              <Button
                to="/tao-moi-ho-so"
                leftIcon={<FaUserPlus />}
                className="bg-transparent font-medium hover:bg-zinc-100"
              >
                {t('patientRecords.sidebar.add')}
              </Button>
            </div>

            <Modal
              isOpen={state?.showModalDelete}
              onClose={() => localDispatch({ type: 'SHOW_MODAL_DELETE', payload: true })}
              title="Thông báo"
            >
              <p className="px-10 py-10 text-2xl ">Bạn có muốn chắc chắn xóa bệnh nhân này không?</p>
              <div className="flex justify-end border-t py-2 pr-6 gap-4">
                <Button onClick={() => localDispatch({ type: 'SHOW_MODAL_DELETE', payload: false })}>Đóng</Button>
                <Button className="bg-red-400" onClick={handleDeleteRecord}>
                  Đồng ý
                </Button>
              </div>
            </Modal>

            <div>
              {state?.showModalEdit && (
                <EditRecord localDispatch={localDispatch} editRecord={editRecord} fetchRecords={fetchRecordData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseRecord;
