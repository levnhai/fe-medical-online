import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useEffect, useState, useCallback } from 'react';
// icon
import { MdKeyboardArrowRight, MdOutlinePhoneInTalk } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { IoMdTime } from 'react-icons/io';

import { convertImage } from '~/utils/convertImage';

import styles from './facilitie.module.scss';
const cx = classNames.bind(styles);
function FacilitieDetail() {
  const location = useLocation();
  const hospitalData = location.state?.hospital; // Lấy dữ liệu từ state
  let address =
    `${hospitalData?.address[0].street}, ${hospitalData?.address[0].wardName}, ${hospitalData?.address[0].districtName}, ${hospitalData?.address[0].provinceName}` ||
    'không tìm thấy';
// State cho carousel
const [currentSlide, setCurrentSlide] = useState(0);
const totalSlides = 5;

// Hàm điều khiển carousel
const moveCarousel = useCallback((direction) => {
  if (direction === 'next') {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  } else {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }
}, [totalSlides]);

const goToSlide = useCallback((index) => {
  setCurrentSlide(index);
}, []);

useEffect(() => {
  let touchStartX = 0;
  let touchEndX = 0;
  
  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  
  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) {
      moveCarousel('next');
    } else if (touchEndX > touchStartX + 50) {
      moveCarousel('prev');
    }
  };
  
  const carousel = document.getElementById('carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);
  }
  
  // Auto slide
  const interval = setInterval(() => {
    moveCarousel('next');
  }, 5000);
  
  return () => {
    clearInterval(interval);
    if (carousel) {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchend', handleTouchEnd);
    }
  };
}, [moveCarousel]);
  console.log('check hospital', hospitalData);

  return (
    <div className="max-w-screen-lg m-auto pb-20">
      <div className={cx('-mt-20 ms-8 mb-8 md:mt-8')}>
          <ul className={cx('flex text-xl')}>
          <li className={cx('flex items-center')}>
            <a href="/" className="font-semibold">
              Trang chủ
            </a>
            <MdKeyboardArrowRight />
          </li>
          <li className={cx('flex items-center')}>
            <a href="#/" className=" text-sky-500 font-semibold">
              {hospitalData?.fullName}
            </a>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
        <div className="col-span-1 pl-4">
        <div className="rounded-2xl bg-white px-6 md:px-10 py-6 mb-6 md:mb-10 ">
            <div className="flex flex-col justify-center items-center">
              <div
                className={cx('content-image')}
                style={{
                  backgroundImage:
                    hospitalData.image.data.length > 0
                      ? `url(${convertImage(hospitalData.image)})`
                      : "url('https://img.freepik.com/premium-vector/drawing-building-with-bird-it_1065891-1524.jpg?semt=ais_hybrid')",
                  width: '120px',
                  height: '120px',
                  marginTop: '20px',
                }}
              ></div>
              <h3 className="text-2xl font-bold py-4 capitalize">{hospitalData?.fullName}</h3>
            </div>
            <div>
              <div className={cx('flex items-center gap-2')}>
                <CiLocationOn className="text-yellow-900" />
                <span>{address}</span>
              </div>
              <div className={cx('flex items-center gap-2')}>
                <IoMdTime />
                <span>Thứ 2 - thứ 6</span>
              </div>
              <div className={cx('flex items-center gap-2')}>
                <MdOutlinePhoneInTalk />
                <span>Hổ trợ đặt khám: 1900 1514 </span>
              </div>
            </div>
          </div>
          
          {/* Hospital Description */}
          <div className="bg-white rounded-2xl p-6 hidden md:block">
          <img alt="Gói khám" src={require('~/assets/images/errImg.png')} />
                <div className="col-span-1 bg-white rounded-2xl p-12 mt-10">
                  <h2 className="font-bold text-3xl">Mô tả</h2>
                  <span className="text-xl">{hospitalData?.description}</span>
                </div>

          </div>
        </div>
        <div className="col-span-2 px-4">
          <div className="relative overflow-hidden rounded-lg mb-8">
            <div 
              id="carousel" 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="min-w-full relative">
                <img 
                  src="https://nld.mediacdn.vn/291774122806476800/2021/7/15/cho-ray-tai-bv-hs-covid-dem-1407-1-1626337146041189187091.jpg" 
                  alt="Khu khám bệnh ngoại trú" 
                  className="w-full h-[305px] object-cover"
                />
            </div>
              <div className="min-w-full">
                <img 
                  src="https://nld.mediacdn.vn/291774122806476800/2021/7/15/phong-benh-1-1626337306469182518251.jpg" 
                  alt="Khu khám bệnh ngoại trú" 
                  className="w-full h-[305px] object-cover"
                />
              </div>
              
              <div className="min-w-full">
                <img 
                  src="https://laichau.gov.vn/upload/2000066/fck/chanhnt/PK%20h%E1%BA%ADu%20Covid%20tr%E1%BA%BB%20em.jpg" 
                  alt="Máy chụp CT Scanner" 
                  className="w-full h-[305px] object-cover"
                />
              </div>
              
              <div className="min-w-full">
                <img 
                  src="https://nld.mediacdn.vn/291774122806476800/2021/7/15/cho-ray-tai-bv-hs-covid-dem-1407-1-1626337146041189187091.jpg" 
                  alt="Máy MRI 3 Tesla" 
                  className="w-full h-[305px] object-cover"
                />
              </div>
              
              <div className="min-w-full">
                <img 
                  src="https://vietmyclinic.com.vn/wp-content/uploads/2019/12/111.jpg" 
                  alt="Đội ngũ y bác sĩ" 
                  className="w-full h-[305px] object-cover"
                />
              </div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button 
                type="button"
                className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
                onClick={() => moveCarousel('prev')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                type="button"
                className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
                onClick={() => moveCarousel('next')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button 
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full bg-white ${currentSlide === index ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:hidden mb-8">
          <img alt="Gói khám" src={require('~/assets/images/errImg.png')} />
                <div className="col-span-1 bg-white rounded-2xl p-12 mt-10">
                  <h2 className="font-bold text-3xl">Mô tả</h2>
                  <span className="text-xl">{hospitalData?.description}</span>
                </div>

          </div>
          <div className="rounded-2xl bg-red-50 p-6">
            <p className="text-blue-500 text-4xl font-bold mb-6">Lịch sử hình thành và phát triển:</p>
            <ul className="mb-6 list-disc pl-6">
              <li>Được thành lập từ năm 1902 với tên gọi là Nhà thương thí Biên Hòa.</li>
              <li>Trải qua hơn 100 năm hình thành và phát triển, bệnh viện đã đạt được nhiều thành tích cao quý như đạt xếp loại bệnh viện hạng II (1994) và hạng I (2010), lần lượt đạt tiêu chuẩn vàng và tiêu chuẩn bạch kim của Hội đột quỵ thế giới, nhiều năm liền là bệnh viện xuất sắc toàn diện do Bộ Y tế quyết định khen thưởng, đạt danh hiệu huân chương lao động hạng 3 do Chủ tịch nước trao tặng ngày 30/09/2011 và còn rất nhiều thành tích do Bộ Y tế, Ủy ban nhân dân tỉnh Đồng Nai trao tặng…</li>
            </ul>
            
            <p className="text-blue-500 text-4xl font-bold mb-6">Cơ sở vật chất và trang thiết bị:</p>
            <ul className="mb-6 list-disc pl-6">
              <li>Bệnh viện có quy mô 1100 giường nội trú và tiếp nhận khoảng 3000 lượt khám bệnh ngoại trú mỗi ngày.</li>
              <li>Bệnh viện có trang thiết bị y tế hiện đại như máy CT 256 lát cắt 2 cấp năng lượng, máy MRI 3 Tesla, Máy DSA can thiệp mạch máu, 3 hệ thống xét nghiệm tự đồng hiện đại, máy siêu âm màu 3D, 4D, máy X-quang kỹ thuật số…</li>
            </ul>
            
            <p className="text-blue-500 text-4xl font-bold mb-6">Các dịch vụ khám chữa bệnh:</p>
            <ul className="mb-6 list-disc pl-6">
              <li>Bệnh viện cung cấp đa dạng các dịch vụ khám chữa bệnh, bao gồm:</li>
              <li>Khám bệnh nội trú</li>
              <li>Khám bệnh ngoại trú</li>
              <li>Tầm soát ung thư</li>
              <li>Điều trị theo yêu cầu</li>
              <li>Khám sức khỏe công ty</li>
              <li>Tiêm chủng vắc xin</li>
              <li>Dịch vụ bảo hiểm</li>
            </ul>
            
            <p className="mb-4">
              Trong tương lai, Bệnh viện Đa khoa Đồng Nai hướng tới trở thành một bệnh viện đa khoa, toàn diện, chuyên sâu và chất lượng cao hàng đầu khu vực phía nam, từng bước xây dựng bệnh viện đủ tiêu chuẩn xếp hạng bệnh viện đặc biệt.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default FacilitieDetail;
