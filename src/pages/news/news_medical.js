import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import '~/translation/i18n';
import { Link, useLocation } from 'react-router-dom';
import styles from './news.module.scss';
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaBars } from 'react-icons/fa';
const cx = classNames.bind(styles);

function NewsMedical() {
  const { t } = useTranslation();
  const location = useLocation();
  
  // State for different news sections
  const [mainNews, setMainNews] = useState([]);
  const [sideNews, setSideNews] = useState([]);
  const [serviceNews, setServiceNews] = useState([]);
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

  useEffect(() => {
    document.title = 'Tin tức y tế || Medical';
    
    const fetchAllNews = async () => {
      try {
        setLoading(true);

        // Fetch service news (category = dich-vu)
        const mainResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/category/tin-y-te?_sort=createdAt:DESC&_limit=1`);
        const mainData = await mainResponse.json();
        setMainNews(mainData);

       // Fetch side news (exactly 6 articles after the first 1)
       const sideResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/category/tin-y-te?_sort=createdAt:DESC&_start=1&_limit=6`);
       const sideData = await sideResponse.json();
       setSideNews(sideData);

       // Fetch service news (category = dich-vu)
       const serviceResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/category/tin-y-te`);
       const serviceData = await serviceResponse.json();
       setServiceNews(serviceData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchAllNews();
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
                  <a href="#" className={cx('news_link')}>Xem tiếp →</a>
                </div>
              </>
            )}
          </div>

          {/* Side articles */}
        <div className="space-y-12">
          {sideNews.slice(0, 6).map((article) => (
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
      {/* Service News Section */}
      <div className="hidden md:block">
        <div className={cx('news_wapper', 'overflow-hidden')}>
          <div className="grid grid-cols-3 gap-4">
            {serviceNews.map((item) => (
              <div
                key={item.id}
                className="relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg p-5"
              >
            <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
            <div className="p-2 bg-white transition-transform duration-300 transform hover:-translate-y-1">
              <span className="text-gray-500">{item.category?.name}</span>
              <h3 className={cx('article_title', 'text-3xl')}>{item.title}</h3>
              <p className={cx('article_content')}>{item.content}</p>
              <p className="text-sm text-gray-400 inline-flex">
                <FaCalendarAlt />&nbsp;{new Date(item.createdAt).toLocaleDateString()}
              </p>
              <a href="#" className="text-blue-500">
                <p>Xem tiếp →</p>
              </a>
            </div>
          </div>
        ))}
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
</div>
  );
}

export default NewsMedical;