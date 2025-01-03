import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import { fetchRecordUser } from '~/redux/user/authSlice';
import { useBooking } from '~/context/bookingContext';
import { extractTime } from '~/utils/time';

// icon
import { MdKeyboardArrowRight, MdClear } from 'react-icons/md';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { PiWarningCircle } from 'react-icons/pi';

function VisitDetail() {
  const bookingData = useSelector((state) => state.booking);
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
            <li className="flex items-center text-sky-500 font-semibold">Thông tin phiếu khám bệnh</li>
          </ul>
        </div>
        <div>
          <Button leftIcon={<MdOutlineStickyNote2 />} className=" text-sky-500 font-semibold">
            Danh sách phiếu khám
          </Button>
        </div>
        <div className="mx-auto max-w-xl ">
          <div className="flex flex-col items-center relative">
            <div
              className=" before:bg-black before:content-[''] before:absolute before:top-3 before:w-10 before:h-10 before:left-2 before:rounded-full 

              "
              // style={{ backgroundColor: '#e8f2f7' }}
            >
              <div className="flex flex-col items-center m-6">
                <div className="bg-white p-6 flex flex-col items-center ">
                  <div className="">
                    <div className="pb-6">
                      <div className="text-center text-4xl text-sky-500 font-semibold">
                        Chúc mừng đặt khám thành công
                      </div>
                      <div className="text-center text-lg">
                        Quý khách vui lòng cài đặt ứng dụng để xem chi tiết hướng dẫn và quản lý hồ sơ khám bệnh
                      </div>
                    </div>
                    <div className="flex flex-col items-center relative border-t border-dashed border-slate-300 pt-4">
                      <div className="text-2xl font-semibold">Phiếu khám bệnh</div>
                      <div className="text-2xl font-semibold pt-6">{bookingData?.hospital?.fullName.toUpperCase()}</div>
                      <span className="text-xl text-stone-400 text-center">{bookingData?.hospital?.address}</span>
                    </div>

                    <div className="pt-10 pb-10 flex justify-center">
                      <div className="text-xl bg-orange-500 rounded-full text-center w-2/4 py-3 text-white">
                        Đặt khám thành công
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-orange-500 text-center">
                        Số tiền phải thanh toán: {bookingData?.price}
                      </div>
                      <div className="text-orange-500 text-lg text-center py-4">
                        (Đã bao gồm phí khám + phí tiện ích)
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-t border-dashed border-slate-300 pt-4">
                    <ul className="mx-4">
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">Mã phiếu:</span>
                        <span className="col-span-3 text-xl font-semibold">T241223U4C1UE</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">Bác sĩ:</span>
                        <span className="col-span-3 text-xl font-semibold">{bookingData?.doctor?.fullName}</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">Chuyên khoa:</span>
                        <span className="col-span-3 text-xl font-semibold">{bookingData?.hospital?.specialty}</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">Hình thức khám:</span>
                        <span className="col-span-3 text-xl font-semibold">Không có BHYT</span>
                      </li>
                      <li className="grid grid-cols-5 py-2 ">
                        <span className="col-span-2 text-lg">Thời gian khám:</span>
                        <span className="col-span-3 text-xl font-semibold">
                          {extractTime(bookingData?.time?.start)} - {bookingData?.date.replace(/-/g, '/')}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full border-t border-dashed border-slate-300 pt-4">
                    <div>
                      <p>
                        <strong className="text-2xl font-semibold">Lưu ý:</strong>
                      </p>
                      <p className="text-lg pt-2">
                        Cắt giảm thủ tục, Lấy số trước, Thanh toán trước, Giảm xếp hàng chờ đợi
                      </p>
                      <p className="text-lg pt-2">
                        1. Quý khách vui lòng giữ lại hoá đơn thanh toán tại Phòng khám Đa khoa Pháp Anh để tham gia
                        chương trình ưu đãi hoàn tiền của Medical.
                      </p>
                      <p className="text-lg pt-2">
                        2. Medical sẽ gửi thông báo về ưu đãi hoàn tiền qua App hoặc Zalo ngay sau khi quý khách sử dụng
                        dịch vụ tại Phòng khám Đa khoa Pháp Anh
                      </p>
                      <p className="text-lg pt-2">
                        3. Quý khách vui lòng đến trước 15 phút tại Quầy Tiếp Nhận để được kiểm tra thông tin đặt khám
                        và hướng dẫn
                      </p>
                      <p className="text-lg pt-2">
                        5. Vui lòng liên hệ 1900-2115 để được hỗ trợ thay đổi lịch hẹn hoặc giải đáp về các chương trình
                        khuyến mãi trên Medical.
                      </p>
                    </div>
                    <div className="text-2xl text-center pt-6 text-sky-500">
                      Bản quyền thuộc&nbsp;
                      <strong className="font-semibold">Medical</strong>
                    </div>
                    <div className="text-center text-lg pt-2">
                      Đặt lịch khám tại bệnh viện-phòng khám hang đầu việt nam
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full pt-10 overflow-hidden">
              <Button
                className="w-full rounded-xl bg-red-100 font-medium text-2xl py-6"
                leftIcon={<MdClear style={{ fontSize: '20px', color: 'red' }} />}
              >
                Hủy phiếu
              </Button>
            </div>
            <div className="flex gap-2 text-xl pt-6">
              <PiWarningCircle style={{ fontSize: '24px', backgroundColor: 'bg-red-500' }} />
              <p className="text-rose-600">
                Trong thời gian quy định, nếu quý khách hủy phiếu khám sẽ được hoàn lại tiền khám và các dịch vụ đặt
                thêm (không bao gồm phí tiện ích).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitDetail;
