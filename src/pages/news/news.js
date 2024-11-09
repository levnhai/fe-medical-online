import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt , FaBars} from 'react-icons/fa';
import { unwrapResult } from '@reduxjs/toolkit';
import NewsSkeleton from './loading/news_skeleton';
import { useDispatch, useSelector } from 'react-redux';

// import { newsSlice } from '~/redux/news/newsSlice';
import { fetchGetAllNew } from '~/redux/news/newsSlice';
import '~/translation/i18n';

import styles from './news.module.scss';
const cx = classNames.bind(styles);

function News() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  const newData = useSelector((state) => state.new.newData);
  const isLoading = useSelector((state) => state.new.loading);
  console.log('check newData', newData)

  
  // State for different news sections
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item.title);
    setIsMenuOpen(false); // Đóng menu khi đã chọn
  };

  const menuItems = [
    { title: 'Tin dịch vụ', path: '/tin-tuc/dich-vu' },
    { title: 'Tin y tế', path: '/tin-tuc/y-te' },
    { title: 'Y học thường thức', path: '/tin-tuc/y-hoc-thuong-thuc' }
  ];


  useEffect(() => {
    document.title = 'Tin tức y khoa || Medical';
    dispatch(fetchGetAllNew());

  }, []);

  if (isLoading) {
    return <NewsSkeleton />;
  }

  return (
    <div className={cx('news', 'w-full overflow-x-hidden')}>
      <div className={cx('news_main')}>
        <div className={cx('news_header')}>
        <Link to="/tin-tuc">
          <h1 className={cx('header_title')}>TIN TỨC Y KHOA</h1>
        </Link>

         {/* Hiển thị cho màn hình lớn hơn 768px  */}
        <div className="hidden md:flex">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <h2 className={cx('header_menu', { active: location.pathname === item.path })}>
                {item.title}
              </h2>
            </Link>
          ))}
        </div>

        {/* Hiển thị icon menu khi màn hình nhỏ hơn 768px */}
        <div className="block md:hidden flex items-center">
          <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
          {selectedMenuItem && <span className="ml-2">{selectedMenuItem}</span>} {/* Hiển thị lựa chọn bên cạnh */}
        </div>

        {/* Nếu muốn menu sổ xuống có nền trắng, thêm vào một div chứa */}
        {isMenuOpen && (
          <div className="absolute bg-white shadow-lg rounded-lg z-10 mt-2 md:hidden">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => handleMenuItemClick(item)}>
                <h2 className={`${cx('header_menu', { active: location.pathname === item.path })} p-2 hover:bg-gray-200`}>
                  {item.title}
                </h2>
              </Link>
            ))}
          </div>
        )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main news article */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            {newData && newData?.news?.length > 0 && (
              <>
                <img src={newData?.news[0].imageUrl} alt={newData?.news[0].title} className="w-full h-58 object-cover" />
                <div className="p-4 mb-20">
                  <h2 className={cx('article_title')}>{newData?.news[0].title}</h2>
                  <p className={cx('article_content')}>{newData?.news[0].content}</p>
                  <p className={cx('article_meta', 'inline-flex')}><FaCalendarAlt />&nbsp;{new Date(newData?.news[0].createdAt).toLocaleDateString()} - {newData?.news[0].author}</p>
                  <p className={cx('article_excerpt')}>{newData?.news[0].excerpt}</p>
                  <a href="/#" className={cx('news_link')}>Xem tiếp →</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newData?.news?.slice(1, 3).map((item, index) => (
                    <div 
                      key={index} 
                      className={cx('news_item', 'relative h-80 bg-cover bg-center')}
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                      <span className="text-lg">{item.category?.name}</span>
                        <h1 font-bold>{item.title}</h1>
                        <p className="text-sm">{item.content}</p>s
                        <a href="/#" className={cx('news_link', 'text-sm')}>Xem tiếp →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Side articles */}
        <div className="space-y-12">
          {newData?.news?.slice(3, 10).map((article) => (
            <div key={article.id} className={cx('side_article')}>
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-1/3 h-32 object-cover" 
              />
              <div className="w-2/3 p-4 flex flex-col">
              <span className="text-lg">{article.category?.name}</span>
                <h3 className={cx('side_article_title')}>
                  {article.title}
                </h3>
                <p className={cx('side_article_excerpt', 'text-xs')}>
                  {article.excerpt}
                </p>
                <p className="text-sm text-gray-400 inline-flex"><FaCalendarAlt />&nbsp;{new Date(article.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Service News Section */}
      <div className="hidden md:block">
      <div className={cx('news_service')}>
        <div className={cx('news_wapper')}>
          <div>
            <h2 className={cx('service_title')}>Tin dịch vụ</h2>
            <Slider {...settings}>
              {newData?.news?.filter((article) => article.category?.slug === 'tin-dich-vu').map((item) => (
                <div key={item.id} className="relative mx-2 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg px-5">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                  <div className="p-2 bg-white transition-transform duration-300 transform hover:-translate-y-1">
                    <span className="text-gray-500">{item.category?.name}</span>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-400 inline-flex"><FaCalendarAlt />&nbsp;{new Date(item.createdAt).toLocaleDateString()}</p>
                    <a href="/#" className="text-blue-500"><p>Xem tiếp →</p></a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        
      </div>
      </div>
      <div className="block md:hidden space-y-12">
      <h2 className={cx('service_title')}>Tin dịch vụ</h2>
        {newData?.news?.filter((article) => article.category?.slug === 'tin-dich-vu').slice(0, 8).map((article) => (
          <div key={article.id} className={cx('side_article')}>
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-1/3 h-32 object-cover" 
            />
            <div className="w-2/3 p-4 flex flex-col">
              <span className="text-lg">{article.category?.name}</span>
              <h3 className={cx('side_article_title')}>
                {article.title}
              </h3>
              <p className={cx('side_article_excerpt', 'text-xs')}>
                {article.excerpt}
              </p>
              <p className="text-sm text-gray-400 inline-flex">
                <FaCalendarAlt />&nbsp;{new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={cx('view-all')}>
      <Link to="/tin-tuc/y-hoc-thuong-thuc">
          <a className={cx('view-all-button')}> Xem tất cả »</a>
        </Link>
      </div> 

      {/* Medical News Section */}
      <div className="hidden md:block">
      <div className={cx('medical_service')}>
        <div className={cx('news_medical')}>
          <h2 className={cx('service_title')}>Tin Y tế</h2>
          <div className={cx('news_container')}>
            {newData?.news?.filter((article) => article.category?.slug === 'tin-y-te').map((item) => (
              <div key={item.id} className={cx('news_item')}>
                <img src={item.imageUrl} alt={item.title} />
                <div className={cx('news_content')}>
                  <span className={cx('news_category')}>{item.category?.name}</span>
                  <h3 className={cx('news_title')}>{item.title}</h3>
                  <p className={cx('article_content')}>{item.content}</p>
                  <span className={cx('news_date','inline-flex')}><FaCalendarAlt />&nbsp;{new Date(item.createdAt).toLocaleDateString()}</span>
                  <a href="/#" className={cx('news_link')}>Xem tiếp →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      </div>
      <div className="block md:hidden space-y-12">
      <h2 className={cx('service_title')}>Tin Y tế</h2>
        {newData?.news?.filter((article) => article.category?.slug === 'tin-y-te').slice(0, 8).map((article) => (
          <div key={article.id} className={cx('side_article')}>
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-1/3 h-32 object-cover" 
            />
            <div className="w-2/3 p-4 flex flex-col">
              <span className="text-lg">{article.category?.name}</span>
              <h3 className={cx('side_article_title')}>
                {article.title}
              </h3>
              <p className={cx('side_article_excerpt', 'text-xs')}>
                {article.excerpt}
              </p>
              <p className="text-sm text-gray-400 inline-flex">
                <FaCalendarAlt />&nbsp;{new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={cx('view-all')}>
      <Link to="/tin-tuc/y-hoc-thuong-thuc">
          <a className={cx('view-all-button')}> Xem tất cả »</a>
        </Link>
      </div>

      {/* Common Medical Knowledge Section */}
      <div className={cx('medical_service')}>
        <div className={cx('news_medical')}>
          <h2 className={cx('service_title')}>Y học thường thức</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 ">
            {newData?.news?.filter((article) => article.category?.slug === 'thuong-thuc-y-te').length > 0 && (
              <>
                <div className="col-span-12 hidden md:grid md:col-span-8 relative h-auto">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${newData?.news[0].imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                    <span className="text-lg">{newData?.news[0].category?.name}</span>
                    <h2 className={cx('article_title','text-white')}>{newData?.news[0].title}</h2>
                    <p className={cx('article_content')}>{newData?.news[0].content}</p>
                    <a href="/#" className={cx('news_link')}>Xem tiếp →</a>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 space-y-4">
                  {newData?.news?.filter((article) => article.category?.slug === 'thuong-thuc-y-te').slice(0, 6).map((news) => (
                    <div 
                      key={news.id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden flex h-32"
                    >
                      <img 
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-1/3 h-full object-cover"
                      />
                      <div className="w-2/3 p-4 flex flex-col justify-center">
                      <h3 className={cx('side_article_title')}>
                      {news.title}
                        </h3>
                        <p className={cx('side_article_excerpt', 'text-xs')}>
                          {news.excerpt}
                        </p>
                        <p className="text-sm text-gray-400 inline-flex"><FaCalendarAlt />&nbsp;{new Date(news.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={cx('view-all')}>
          <Link to="/tin-tuc/y-hoc-thuong-thuc">
          <a className={cx('view-all-button')}> Xem tất cả »</a>
        </Link>
      </div>
    </div>
  );
}

export default News;