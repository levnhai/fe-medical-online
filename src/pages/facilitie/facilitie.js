import classNames from 'classnames/bind';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// icon
import { MdKeyboardArrowRight } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { LuClock7 } from 'react-icons/lu';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import Pagination from '~/components/paination';
import Contact from '../contact';
import ResultEmpty from '../resultEmpty';
import { createSlugName } from '~/utils/createSlug';
import FacilitieSkeleton from './loading/facilitie_skeleton';
import Skeleton from './loading/skeleton';
import { getTabMenus } from './data/tabMenus';
import { convertImage } from '~/utils/convertImage';
import { SlideInFromBottom } from '~/components/animation';
import { updateBooking, clearBooking } from '~/redux/booking/bookingSlice';
import { useGetHospitalsByTypeQuery, useGetCountHospitalsByTypeQuery } from '~/services/hospital.api';

import style from './facilitie.module.scss';
const cx = classNames.bind(style);

let PageSize = 5;

function Facilitie() {
  const { t } = useTranslation();
  const tabMenus = getTabMenus(t);
  const { type } = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [tabCounts, setTabCounts] = useState({});

  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [labelTitle, setLabelTitle] = useState('Cơ sở y tế');
  const [subLableTitle, setSubLableTitle] = useState(
    'Với những cơ sở Y Tế hàng đầu sẽ giúp trải nghiệm khám, chữa bệnh của bạn tốt hơn',
  );

  const { data, isLoading } = useGetHospitalsByTypeQuery({ type, search });
  const { data: typeCountData } = useGetCountHospitalsByTypeQuery({ search });

  const hospitalDataByType = data?.data;
  const hospitalDataTotal = data?.total || 0;

  const handleHospitalClick = (hospital) => {
    setSelectedHospitalId(hospital._id);
  };

  const countHospitalType = () => {
    const counts = {};
    tabMenus.forEach((item) => {
      counts[item.href] = typeCountData?.data?.typeCounts[item.href] || 0;
    });
    setTabCounts(counts);
  };

  const currentTableData = useMemo(() => {
    if (!hospitalDataByType) return [];
    const start = (currentPage - 1) * PageSize;
    return hospitalDataByType.slice(start, start + PageSize);
  }, [hospitalDataByType, currentPage]);

  const handleClickType = (tab, index) => {
    setLabelTitle(t(tab.label));
    setSubLableTitle(t(tab.subTitle));
    if (activeMenu === index) {
      setActiveMenu(null);
      navigate('/co-so-y-te');
    } else {
      setActiveMenu(index);
      navigate(`/co-so-y-te/${tab.href}`);
    }
  };

  const hospitalDetail = useMemo(() => {
    return selectedHospitalId
      ? hospitalDataByType.find((item) => item._id === selectedHospitalId)
      : hospitalDataByType?.length > 0
        ? hospitalDataByType[0]
        : null;
  }, [selectedHospitalId, hospitalDataByType]);

  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const searchInput = (items) => {
    console.log('🚀 ~ searchInput ~ items:', items);
    return items?.filter((item) => {
      return removeAccents(item?.fullName)?.toString().toLowerCase().indexOf(removeAccents(search).toLowerCase()) > -1;
    });
  };

  useEffect(() => {
    document.title = 'Cơ sở y tế || Medpro';
  }, []);

  useEffect(() => {
    countHospitalType();
  }, []);

  useEffect(() => {
    dispatch(clearBooking());
  }, []);
  return (
    <>
      <div className={cx('facilitie')}>
        <div className={cx('breadcrumb')}>
          <div className={cx('breadcrumb__container')}>
            <ul>
              <li>
                <a href="/" className="font-semibold md: ms-8">
                  Trang chủ
                </a>
              </li>
              <li>
                <MdKeyboardArrowRight style={{ width: '1.8rem', height: '1.8rem', color: '#999' }} />
                <span>{labelTitle}</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className={cx('facilitie__content')}>
            <div className={cx('facilitie__header')}>
              <div className={cx('facilitie__header--title')}>{labelTitle}</div>
              <div className={cx('facilitie__header--des', 'md: px-8')}>{subLableTitle}</div>
            </div>
            <div className={cx('facilitie__body', 'md: me-10')}>
              <div className={cx('facilitie__formcontent')}>
                <div className={cx('facilitie__formcontent--item')}>
                  <div className={cx('facilitie__formcontent--icon')}>
                    <CiSearch style={{ width: '2rem', height: '2rem' }} />
                  </div>
                  <div className={cx('facilitie__formcontent--input')}>
                    <input placeholder={t('home.search')} value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('btnGroup')} ref={sliderRef}>
              {tabMenus.map((tab, index) => {
                return (
                  <Button
                    key={index}
                    rounded
                    className={cx('guide_btn', { active: activeMenu === index || tab.href === type })}
                    onClick={() => {
                      handleClickType(tab, index);
                    }}
                  >
                    {tab.label}
                    <span> ( {tabCounts[tab.href] || 0} )</span>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className={cx('facilitie__container')}>
            <div className={cx('list_hospital')}>
              <div className="w-full grid lg:grid-cols-3 gap-6">
                <div className="col-span-2">
                  {isLoading === true ? (
                    <>
                      <FacilitieSkeleton />
                    </>
                  ) : currentTableData?.length > 0 ? (
                    <SlideInFromBottom>
                      {currentTableData &&
                        searchInput(currentTableData).map((item, index) => {
                          let address = `${item.address[0].street}, ${item.address[0].wardName}, ${item.address[0].districtName}, ${item.address[0].provinceName}`;
                          return (
                            <div
                              key={index}
                              className={cx('content')}
                              onClick={() => {
                                handleHospitalClick(item);
                              }}
                            >
                              <div className={cx('content-title')}>
                                <div
                                  className={cx('content-image')}
                                  style={{
                                    backgroundImage:
                                      item.image.data.length > 0
                                        ? `url(${convertImage(item.image)})`
                                        : "url('https://img.freepik.com/premium-vector/drawing-building-with-bird-it_1065891-1524.jpg?semt=ais_hybrid')",
                                  }}
                                ></div>
                                <div className={cx('content-title-ini')}>
                                  <div className={cx('content-name', 'capitalize')}>{item.fullName}</div>
                                  <div className={cx('content-address')}>{address}</div>
                                  <div className={cx('content-groupBtn')}>
                                    <Button
                                      className={cx('content-btn')}
                                      to={`/${createSlugName(item.fullName)}?hptId=${item._id}`}
                                      state={{ hospital: item }}
                                    >
                                      {t('home.show_detail')}
                                    </Button>
                                    <Button
                                      className={cx('content-btn')}
                                      onClick={() => {
                                        dispatch(
                                          updateBooking({
                                            key: 'hospital',
                                            value: {
                                              fullName: item.fullName,
                                              id: item._id,
                                              address,
                                            },
                                          }),
                                        );
                                        navigate(
                                          `/${createSlugName(item.fullName)}/hinh-thuc-dat-kham?partnerId=${item._id}`,
                                          {
                                            state: { hospital: item },
                                          },
                                        );
                                      }}
                                    >
                                      {t('home.book_appointment')}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </SlideInFromBottom>
                  ) : (
                    <ResultEmpty />
                  )}
                </div>
                <div className="col-span-1">
                  {currentTableData?.length > 0 && (
                    <div>
                      {isLoading === true ? (
                        <>
                          <Skeleton />
                        </>
                      ) : (
                        <>
                          {hospitalDetail && (
                            <div className={cx('hospitalIntroduce')}>
                              <div className={cx('header')}>
                                <div
                                  className={cx('logo')}
                                  style={{ backgroundImage: `url(${convertImage(hospitalDetail?.image)})` }}
                                  // style={{
                                  //   backgroundImage:
                                  //     hospitalDetail?.image.length > 0
                                  //       ? `url(${hospitalDetail?.image})`
                                  //       : "url('https://img.freepik.com/premium-vector/drawing-building-with-bird-it_1065891-1524.jpg?semt=ais_hybrid')",
                                  // }}
                                ></div>
                                <div className={cx('title')}>{hospitalDetail?.fullName}</div>
                                <div className={cx('workingTime')}>
                                  <LuClock7 className={cx('icon_clock')} />
                                  {hospitalDetail?.workingTime
                                    ? hospitalDetail?.workingTime
                                    : 'Thứ 2 - Chủ Nhật (07:00-16:00)'}
                                </div>
                              </div>
                              <div className={cx('body')}>
                                <div className={cx('subject')}>{hospitalDetail?.description}</div>
                                {/* <div className={cx('map')}>
                                  <Map selectedHospital={hospitalDetail} />
                                </div> */}
                                <div className={cx('images')}></div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <div className={cx('download_app')}>
                        <div className={cx('body')}>
                          <div className={cx('title')}>Tải áp để đặt lịch nhanh chóng</div>
                          <div className={cx('button_wapper')}>
                            <Button className={cx('button')}></Button>
                            <Button className={cx('button')}></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={hospitalDataTotal && hospitalDataTotal}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

export default Facilitie;
