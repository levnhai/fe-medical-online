import classNames from 'classnames/bind';
import '~/translation/i18n';
import { Link, useLocation } from 'react-router-dom';
import styles from './news.module.scss';
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceNews } from '~/redux/news/newsSlice';
import NewsSkeleton from './loading/news_skeleton';
const cx = classNames.bind(styles);

function NewsService() {
  const location = useLocation();
  const dispatch = useDispatch();

  const newData = useSelector((state) => state.new.newData);
  const isLoading = useSelector((state) => state.new.loading);
  console.log('check newData', newData)
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  
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
    document.title = 'Tin dịch vụ || Medical';
    dispatch(fetchServiceNews());

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
              </>
            )}
          </div>

          {/* Side articles */}
        <div className="space-y-12">
          {newData?.news?.slice(1, 7).map((article) => (
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
        <div className={cx('news_wapper', 'overflow-hidden')}>
          <div className="grid grid-cols-3 gap-4">
            {newData?.news?.map((item) => (
              <div
                key={item.id}
                className="relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg p-5"
              >
            <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
            <div className="p-2 bg-white transition-transform duration-300 transform hover:-translate-y-1">
              <span className="text-gray-500">{item.category?.name}</span>
              <h3 className={cx('article_title')}>{item.title}</h3>
              <p className={cx('article_content')}>{item.content}</p>
              <p className="text-sm text-gray-400 inline-flex">
                <FaCalendarAlt />&nbsp;{new Date(item.createdAt).toLocaleDateString()}
              </p>
              <a href="/#" className="text-blue-500">
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
        {newData?.news?.slice(0, 8).map((article) => (
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

export default NewsService;

