import classNames from 'classnames/bind';
import style from './appointmentDoctor.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// icon
import { CiLocationOn } from 'react-icons/ci';

import Header from '../components/header/header';
import Search from '~/components/search';
import Button from '~/components/Button';
import { useEffect, useState, useMemo } from 'react';
import { Buffer } from 'buffer';
import Pagination from '~/components/paination';
import { fetchAllDoctors } from '~/redux/doctor/doctorSlice';

const cx = classNames.bind(style);
let PageSize = 4;

function AppointmentDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Lấy giá trị tabType từ URL
  const typeParam = searchParams.get('tabType');

  const docterData = useSelector((state) => state.doctor.docterData);

  console.log('check docterData, docterData');

  const isLoading = useSelector((state) => state.hospital.loading);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return docterData && docterData?.result?.data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, docterData]);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [typeParam, dispatch]);

  return (
    <div className={cx('main')}>
      <Header
        bannerImage="https://cdn-pkh.longvan.net/prod-partner/5723a272-a318-4b67-ba8d-af9d1d3d69b4-young-asian-female-dentist-white-coat-posing-clinic-equipment_1.png"
        title="Đặt khám theo bác sỹ"
        contentSpan="Chủ động chọn bác sỹ mà bạn tin tưởng nhất"
      />
      <Search />
      <div className={cx('body')}>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {docterData &&
              docterData?.result?.data.map((item, index) => {
                let image =
                  Array.isArray(item.image?.data) && item.image.data.length > 0
                    ? Buffer.from(item.image, 'base64').toString('binary')
                    : item.gender === 'male'
                    ? 'https://cdn.medpro.vn/medpro-production/default/avatar/BSNam.png'
                    : 'https://cdn.medpro.vn/medpro-production/default/avatar/BSNu.png';

                let address = `${item.address[0].street}, ${item.address[0].wardName}, ${item.address[0].districtName}, ${item.address[0].provinceName}`;
                return (
                  <div className="mb-6 rounded-lg border border-slate-200">
                    <div key={index} className={cx('content', 'bg-white rounded-t-2xl')}>
                      <div className="flex gap-5 w-100 h-100">
                        <div className={cx('image')} style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="h-100">
                          <div className={cx('name')}>
                            <h4>{item.fullName} | Tổng quát</h4>
                          </div>
                          <div className={cx('treatment')}>
                            <strong>Chuyên trị: </strong>
                            {item?.specialtyData?.fullName}
                          </div>
                          <div className={cx('treatment')}>
                            <strong>Lịch khám: </strong>
                            Thứ 2 3 4z
                          </div>
                          <div className={cx('treatment')}>
                            <strong>Giá khám: </strong>
                            {Number(item.price).toLocaleString('en-US')} đ
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('frame', 'rounded-b-2xl')}>
                      <div className="flex gap-4">
                        <div className="text-4xl font-semibold">
                          <CiLocationOn />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{item?.hospitalData?.fullName}</span>
                          <span className={cx('frame-left-address', 'font-semibold text-xl')}>{address}</span>
                        </div>
                      </div>
                      <div className={cx('frame-right')}>
                        <Button
                          className={cx('content-btn')}
                          onClick={() => navigate('/chon-lich-kham', { state: { doctorId: item._id } })}
                        >
                          Đặt khám ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={cx('banner', 'col-span-1 rounded-t-2xl')}></div>
        </div>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={docterData && docterData?.result?.data?.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default AppointmentDoctor;
