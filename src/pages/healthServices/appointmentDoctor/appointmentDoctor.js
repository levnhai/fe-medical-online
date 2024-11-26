import classNames from 'classnames/bind';
import style from './appointmentDoctor.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-content-loader';

// icon
import { CiLocationOn } from 'react-icons/ci';

import Header from '../components/header/header';
// import Search from '~/components/Search';
import Button from '~/components/Button';
import { useEffect, useState, useMemo } from 'react';
import { Buffer } from 'buffer';
import Pagination from '~/components/paination';
// import { fetchALlDataHospital } from '~/redux/hospital/hospitalSlider';
// import { fetchAllDoctors } from '~/redux/docter/docterSlice';
// import DocterView from '../View/Docter';
// import HospitalView from '../View/Hospital';

const cx = classNames.bind(style);
let PageSize = 4;

function AppointmentDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Lấy giá trị tabType từ URL
  const typeParam = searchParams.get('tabType');

  const selectorHospitalData = useSelector((state) => state.hospital.hospitalData);
  const selectorDocterData = useSelector((state) => state.docter.docterData);

  let hospitalData = [];
  if (typeParam === 'hospital') {
    hospitalData = selectorHospitalData;
  } else {
    hospitalData = selectorDocterData;
  }

  const isLoading = useSelector((state) => state.hospital.loading);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return hospitalData && hospitalData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, hospitalData]);

  const handleDetailAppointmentDoctor = (item) => {
    navigate(`/chon-lich-kham/${item._id}`);
  };

  const handleClickType = (tabType) => {
    const params = new URLSearchParams();
    if (tabType) {
      params.append('tabType', tabType);
    }
    navigate(`/dich-vu-y-te/dat-kham-theo-bac-sy?${params.toString()}`);
  };

  useEffect(() => {
    console.log('check hải kê');
    // dispatch(fetchALlDataHospital());
    // typeParam === 'hospital' ? dispatch(fetchALlDataHospital()) : dispatch(fetchAllDoctors());
  }, [typeParam, dispatch]);

  return (
    <div className={cx('main')}>
      <Header
        bannerImage="https://cdn-pkh.longvan.net/prod-partner/5723a272-a318-4b67-ba8d-af9d1d3d69b4-young-asian-female-dentist-white-coat-posing-clinic-equipment_1.png"
        title="Đặt khám theo bác sỹ"
        contentSpan="Chủ động chọn bác sỹ mà bạn tin tưởng nhất"
      />
      <div className={cx('body')}>
        {/* <Search /> */}
        <ul className={cx('tag')}>
          <li>
            <Button
              className={cx('tag-Btn', { active: typeParam === null })}
              rounded
              onClick={() => {
                handleClickType('');
              }}
            >
              Bác sỹ
            </Button>
          </li>
          <li>
            <Button
              className={cx('tag-Btn', { active: typeParam === 'hospital' })}
              rounded
              onClick={() => {
                handleClickType('hospital');
              }}
            >
              Cơ sơ y tế
            </Button>
          </li>
        </ul>
        <div className={cx('container')}>
          {/* {typeParam === 'hospital' ? <HospitalView data={currentTableData} /> : <DocterView data={currentTableData} />} */}
          <div className={cx('banner')}></div>
        </div>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={hospitalData && hospitalData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default AppointmentDoctor;
