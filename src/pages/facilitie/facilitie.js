import classNames from 'classnames/bind';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// icon
import { MdKeyboardArrowRight } from 'react-icons/md';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { LuClock7 } from 'react-icons/lu';

import Button from '~/components/Button';
import Pagination from '~/components/paination';
import Contact from '../contact';
import ResultEmpty from '../resultEmpty';
import { createSlugName } from '~/utils/createSlug';
import FacilitieSkeleton from './loading/facilitie_skeleton';
import Skeleton from './loading/skeleton';
import { convertImage } from '~/utils/convertImage';
import { SlideInFromBottom } from '~/components/animation';
import { fetchGetHospitalByType, fetchGetCountHospitalByType } from '~/redux/hospital/hospitalSlice';
import { updateBooking, clearBooking } from '~/redux/booking/bookingSlice';

import style from './facilitie.module.scss';
const cx = classNames.bind(style);

let PageSize = 2;

function Facilitie() {
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [tabCounts, setTabCounts] = useState({});

  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [labelTitle, setLabelTitle] = useState('Cơ sở y tế');
  const [subLableTitle, setSubLableTitle] = useState(
    'Với những cơ sở Y Tế hàng đầu sẽ giúp trải nghiệm khám, chữa bệnh của bạn tốt hơn',
  );
  const [sliderMode, setSliderMode] = useState('full');

  const hospitalDataByType = useSelector((state) => state.hospital.hospitalDataByType);

  const countHospitalByType = useSelector((state) => state.hospital.countHospitalByType);
  const isLoading = useSelector((state) => state.hospital.loading);

  const handleHospitalClick = (hospital) => {
    setSelectedHospitalId(hospital._id);
  };
  const tabMenus = [
    {
      label: t('facilities.publicHospital.label'),
      href: 'benh-vien-cong',
      subTitle: t(
        'facilities.publicHospital.subTitle',
        'Đặt khám dễ dàng, không lo chờ đợi tại các bệnh viện công hàng đầu Việt Nam',
      ),
    },
    {
      label: t('facilities.privateHospital.label'),
      href: 'benh-vien-tu',
      subTitle: t(
        'facilities.privateHospital.subTitle',
        'Tận hưởng dịch vụ y tế tư nhân, chăm sóc sức khỏe chuyên nghiệp',
      ),
    },
    {
      label: t('facilities.clinic.label'),
      href: 'phong-kham',
      subTitle: t(
        'facilities.clinic.subTitle',
        'Trải nghiệm chăm sóc y tế tập trung và gần gũi tại phòng khám chuyên khoa',
      ),
    },
    {
      label: t('facilities.medicalOffice.label'),
      href: 'phong-mach',
      subTitle: t(
        'facilities.medicalOffice.subTitle',
        'Chẩn đoán và điều trị chất lượng với bác sĩ chuyên khoa được nhiều người tin tưởng',
      ),
    },
    {
      label: t('facilities.laboratory.label'),
      href: 'xet-nghiem',
      subTitle: t(
        'facilities.laboratory.subTitle',
        'Xét nghiệm chính xác, nhanh chóng và hỗ trợ chẩn đoán hiệu quả với các cơ sở uy tín hàng đầu',
      ),
    },
  ];

  const countHospitalType = () => {
    const counts = {};
    tabMenus.forEach((item) => {
      counts[item.href] = countHospitalByType?.typeCounts?.[item.href] || 0;
    });
    setTabCounts(counts);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return hospitalDataByType && hospitalDataByType?.data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, hospitalDataByType?.data]);

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
      ? hospitalDataByType?.data.find((item) => item._id === selectedHospitalId)
      : hospitalDataByType?.data?.length > 0
      ? hospitalDataByType?.data[0]
      : null;
  }, [selectedHospitalId, hospitalDataByType?.data]);

  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const searchInput = (items) => {
    return items?.filter((item) => {
      console.log('check item', item);
      return removeAccents(item?.fullName)?.toString().toLowerCase().indexOf(removeAccents(search).toLowerCase()) > -1;
    });
  };

  useEffect(() => {
    document.title = 'Cơ sở y tế || Medpro';
  }, []);

  useEffect(() => {
    dispatch(fetchGetHospitalByType({ type, search }));
  }, [type, search, dispatch]);

  // count hospital types
  useEffect(() => {
    dispatch(fetchGetCountHospitalByType(search));
    countHospitalType();
  }, [search, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 320) setSliderMode('one');
      else if (width < 425) setSliderMode('two');
      else if (width < 768) setSliderMode('three');
      else if (width < 1024) setSliderMode('slider');
      else setSliderMode('full');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (sliderMode !== 'full' && sliderRef.current) {
      let isDown = false;
      let startX;
      let scrollLeft;

      const slider = sliderRef.current;

      const onMouseDown = (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };

      const onMouseLeave = () => {
        isDown = false;
        slider.classList.remove('active');
      };

      const onMouseUp = () => {
        isDown = false;
        slider.classList.remove('active');
      };

      const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.addEventListener('mousedown', onMouseDown);
      slider.addEventListener('mouseleave', onMouseLeave);
      slider.addEventListener('mouseup', onMouseUp);
      slider.addEventListener('mousemove', onMouseMove);

      return () => {
        slider.removeEventListener('mousedown', onMouseDown);
        slider.removeEventListener('mouseleave', onMouseLeave);
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, [sliderMode]);

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
                <a href="/">Trang chủ</a>
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
              <div className={cx('facilitie__header--des')}>{subLableTitle}</div>
            </div>
            <div className={cx('facilitie__body')}>
              <div className={cx('facilitie__formcontent')}>
                <div className={cx('facilitie__formcontent--item')}>
                  <div className={cx('facilitie__formcontent--icon')}>
                    <CiSearch style={{ width: '2rem', height: '2rem' }} />
                  </div>
                  <div className={cx('facilitie__formcontent--input')}>
                    <input
                      placeholder="Tìm kiếm cơ sở y tế ..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className={cx('facilitie__formcontent--item')}>
                  <div className={cx('facilitie__formcontent--icon')}>
                    <CiLocationOn style={{ width: '2rem', height: '2rem' }} />
                  </div>
                  <div className={cx('facilitie__formcontent--input')}>
                    <input placeholder="Chọn tỉnh thành ..." />
                  </div>
                </div> */}
              </div>
            </div>
            <div className={cx('btnGroup', sliderMode)} ref={sliderRef}>
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
                                  // style={{"backgroundImage: url('https://www.citypng.com/public/')"}}
                                ></div>
                                <div className={cx('content-title-ini')}>
                                  <div className={cx('content-name', 'capitalize')}>{item.fullName}</div>
                                  <div className={cx('content-address')}>{address}</div>
                                  <div className={cx('content-groupBtn')}>
                                    <Button
                                      className={cx('content-btn')}
                                      // to={
                                      //   (`/${createSlugName(item.fullName)}?hptId=${item._id}`,
                                      //   { state: { hospital: item } })
                                      // }
                                      to={`/${createSlugName(item.fullName)}?hptId=${item._id}`}
                                      state={{ hospital: item }}
                                    >
                                      Xem chi tiết
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
                                      Đặt khám ngay
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
              totalCount={hospitalDataByType && hospitalDataByType?.data?.length}
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
