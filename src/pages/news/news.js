import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import { Link, useLocation } from 'react-router-dom';
import styles from './news.module.scss';
import { useState, useEffect } from 'react';
import { FaCalendarAlt , FaBars} from 'react-icons/fa';
import { newsSlice } from '~/redux/news/newsSlice';
const cx = classNames.bind(styles);

function News() {
  const { t } = useTranslation();
  
  // State for different news sections
  const [mainNews, setMainNews] = useState([]);
  const [sideNews, setSideNews] = useState([]);
  const [serviceNews, setServiceNews] = useState([]);
  const [medicalNews, setMedicalNews] = useState([]);
  const [commonMedicalNews, setCommonMedicalNews] = useState([]);
  const [loading, setLoading] = useState(true);
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
    { title: 'Tin dịch vụ', path: '/news/news-service' },
    { title: 'Tin y tế', path: '/news/news-medical' },
    { title: 'Y học thường thức', path: '/news/news-knowlage' }
  ];
  const location = useLocation();
  useEffect(() => {
    document.title = 'Tin tức y khoa || Medical';

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await newsSlice.getAllNews();
        
        setMainNews(data.mainNews);
        setSideNews(data.sideNews);
        setServiceNews(data.serviceNews);
        setMedicalNews(data.medicalNews);
        setCommonMedicalNews(data.commonMedicalNews);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={cx('news', 'w-full overflow-x-hidden')}>
      <div className={cx('news_main')}>
      <div className={cx('news_header')}>
      <Link to="/news">
        <h1 className={cx('header_title')}>TIN TỨC Y KHOA</h1>
      </Link>

      {/* Hiển thị cho màn hình lớn hơn 768px */}
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
            {mainNews.length > 0 && (
              <>
                <img src={mainNews[0].imageUrl} alt={mainNews[0].title} className="w-full h-58 object-cover" />
                <div className="p-4 mb-20">
                  <h2 className={cx('article_title')}>{mainNews[0].title}</h2>
                  <p className={cx('article_content')}>{mainNews[0].content}</p>
                  <p className={cx('article_meta', 'inline-flex')}><FaCalendarAlt />&nbsp;{new Date(mainNews[0].createdAt).toLocaleDateString()} - {mainNews[0].author}</p>
                  <p className={cx('article_excerpt')}>{mainNews[0].excerpt}</p>
                  <a href="/#" className={cx('news_link')}>Xem tiếp →</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mainNews.slice(1, 3).map((news, index) => (
                    <div 
                      key={news.id} 
                      className={cx('news_item', 'relative h-80 bg-cover bg-center')}
                      style={{ backgroundImage: `url(${news.imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                      <span className="text-lg">{news.category?.name}</span>
                        <h1 font-bold>{news.title}</h1>
                        <p className="text-sm">{news.content}</p>
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
          {sideNews.slice(3, 10).map((article) => (
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
              {serviceNews.map((item) => (
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
      <h2 className={cx('service_title')}>Tin Y tế</h2>
        {serviceNews.slice(0, 8).map((article) => (
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
          <a href="/news/news-service" className={cx('view-all-button')}>
            Xem tất cả »
          </a>
        </div>
      {/* Medical News Section */}
      <div className="block md:hidden space-y-12">
      <h2 className={cx('service_title')}>Tin dịch vụ</h2>
        {medicalNews.slice(0, 8).map((article) => (
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
      <div className="hidden md:block">
      <div className={cx('medical_service')}>
        <div className={cx('news_medical')}>
          <h2 className={cx('service_title')}>Tin Y tế</h2>
          <div className={cx('news_container')}>
            {medicalNews.map((item) => (
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
      <div className={cx('view-all')}>
          <a href="/news/news_medical" className={cx('view-all-button')}>
            Xem tất cả »
          </a>
        </div>

      {/* Common Medical Knowledge Section */}
      <div className={cx('medical_service')}>
        <div className={cx('news_medical')}>
          <h2 className={cx('service_title')}>Y học thường thức</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 ">
            {commonMedicalNews.length > 0 && (
              <>
                <div className="col-span-12 hidden md:grid md:col-span-8 relative h-auto">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${commonMedicalNews[0].imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                    <span className="text-lg">{commonMedicalNews[0].category?.name}</span>
                    <h2 className={cx('article_title','text-white')}>{commonMedicalNews[0].title}</h2>
                    <p className={cx('article_content')}>{commonMedicalNews[0].content}</p>
                    <a href="/#" className={cx('news_link')}>Xem tiếp →</a>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 space-y-4">
                  {commonMedicalNews.slice(1, 5).map((news) => (
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
          <a href="/news/news_knowlage" className={cx('view-all-button')}>
            Xem tất cả »
          </a>
      </div>
    </div>
  );
}

export default News;