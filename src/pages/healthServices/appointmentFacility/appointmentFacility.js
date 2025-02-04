import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Buffer } from 'buffer';
import { useEffect, useState, useMemo } from 'react';

import Header from '../components/header';
import Search from '~/components/search';
import Button from '~/components/Button';
import Pagination from '~/components/paination';
import { fetchGetALlHospital } from '~/redux/hospital/hospitalSilder';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';

import style from './appointmentFacility.module.scss';
const cx = classNames.bind(style);
let PageSize = 4;

function AppointmentFacility() {
  const { t, i18n } = useTranslation();
  const [currentLanguages, setCurrentLanguages] = useState(i18n.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hospitalData = useSelector((state) => state.hospital.hospitalData);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    console.log('check', hospitalData?.data?.slice(firstPageIndex, lastPageIndex));
    return hospitalData && hospitalData?.data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, hospitalData]);

  console.log('check currentTableData', currentTableData);

  const handleDetailAppointmentDoctor = (item) => {
    navigate(`/chon-lich-kham/${item._id}`);
  };

  useEffect(() => {
    dispatch(fetchGetALlHospital());
  }, [dispatch]);

  return (
    <div className={cx('main')}>
      <Header
        bannerImage="https://cdn-pkh.longvan.net/prod-partner/9cef9b69-60d6-4456-8c41-888198b7a81a-dna-genetic-biotechnology-science-with-scientist-rsquo-s-hands-disruptive-technology-remix_1.png"
        title={t('appointments.facility.title')}
        contentSpan={t('appointments.facility.subTitle')}
      />
      <div className={cx('body')}>
        <Search />
        <ul className={cx('tag')}>
          <li>
            <Button className={cx('tag-Btn', { active: activeTab === 0 })} rounded onClick={() => setActiveTab(0)}>
            {t('appointments.facility.all')}
            </Button>
          </li>
          <li>
            <Button className={cx('tag-Btn', { active: activeTab === 1 })} rounded onClick={() => setActiveTab(1)}>
            {t('appointments.facility.hospital')}
            </Button>
          </li>
          <li>
            <Button className={cx('tag-Btn', { active: activeTab === 2 })} rounded onClick={() => setActiveTab(2)}>
            {t('appointments.facility.other')}
            </Button>
          </li>
        </ul>
        <div className={cx('container')}>
          {currentTableData &&
            currentTableData.map((item, index) => {
              let image = '';
              let address = `${item.address[0].street}, ${item.address[0].wardName}, ${item.address[0].districtName}, ${item.address[0].provinceName}`;
              if (item.image) {
                image = Buffer.from(item.image.data, 'base64').toString('binary');
              }
              return (
                <div key={index} className={cx('content')} onClick={() => handleDetailAppointmentDoctor(item)}>
                  <div className={cx('content-title')}>
                    <div className={cx('content-image')} style={{ backgroundImage: `url(${image})` }}></div>
                    <div className={cx('content-title-ini')}>
                      <div className={cx('content-name')}>{item.fullName}</div>
                      <div className={cx('content-address')}>{address}</div>
                      <div className={cx('content-groupBtn')}>
                        <Button className={cx('content-btn', 'text-lg')}>{t('appointments.facility.detail')}</Button>
                        <Button className={cx('content-btn', 'text-lg')}>{t('appointments.facility.booking')}</Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={hospitalData && hospitalData.data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default AppointmentFacility;
