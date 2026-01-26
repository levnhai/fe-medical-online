import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

//icon
import { FaCalendarAlt, FaBars } from 'react-icons/fa';

import NewsSkeleton from './loading/news_skeleton';
import Pagination from '~/components/paination';
import '~/translation/i18n';
import { useGetNewsKnowlageQuery } from '~/services/new.api';

import classNames from 'classnames/bind';
import styles from './news.module.scss';
const cx = classNames.bind(styles);

function NewsKnowlage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useGetNewsKnowlageQuery({});
  const newData = data?.data;

  useEffect(() => {
    if (location.pathname === '/tin-tuc/thuong-thu-y-te') {
      navigate('/tin-tuc/y-hoc-thuong-thuc', { replace: true });
    }
  }, [location, navigate]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const [desktopCurrentPage, setDesktopCurrentPage] = useState(1);
  const [mobileCurrentPage, setMobileCurrentPage] = useState(1);
  const desktopPageSize = 3;
  const mobilePageSize = 3;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item.title);
    setIsMenuOpen(false);
  };
  const menuItems = [
    { title: 'Tin dịch vụ', path: '/tin-tuc/dich-vu' },
    { title: 'Tin y tế', path: '/tin-tuc/y-te' },
    { title: 'Y học thường thức', path: '/tin-tuc/y-hoc-thuong-thuc' },
  ];

  useEffect(() => {
    document.title = 'Tin dịch vụ || Medical';
  }, []);

  const currentDesktopNewsItems = useMemo(() => {
    if (!newData?.news) return [];
    const firstPageIndex = (desktopCurrentPage - 1) * desktopPageSize;
    const lastPageIndex = firstPageIndex + desktopPageSize;
    return newData.news.slice(firstPageIndex, lastPageIndex);
  }, [desktopCurrentPage, newData?.news, desktopPageSize]);

  const currentMobileNewsItems = useMemo(() => {
    if (!newData?.news) return [];
    const firstPageIndex = (mobileCurrentPage - 1) * mobilePageSize;
    const lastPageIndex = firstPageIndex + mobilePageSize;
    return newData.news.slice(firstPageIndex, lastPageIndex);
  }, [mobileCurrentPage, newData?.news, mobilePageSize]);

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

          <div className="hidden md:flex">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <h2 className={cx('header_menu', { active: location.pathname === item.path })}>{item.title}</h2>
              </Link>
            ))}
          </div>

          <div className="block md:hidden flex items-center">
            <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
            {selectedMenuItem && <span className="ml-2">{selectedMenuItem}</span>} {/* Hiển thị lựa chọn bên cạnh */}
          </div>

          {isMenuOpen && (
            <div className="absolute bg-white shadow-lg rounded-lg z-10 mt-2 md:hidden">
              {menuItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => handleMenuItemClick(item)}>
                  <h2
                    className={`${cx('header_menu', {
                      active: location.pathname === item.path,
                    })} p-2 hover:bg-gray-200`}
                  >
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
                <Link to={`/tin-tuc/${newData?.news[0]._id}`} className="block" style={{ textDecoration: 'none' }}>
                  <img
                    src={newData?.news[0].imageUrl}
                    alt={newData?.news[0].title}
                    className="w-full h-58 object-cover"
                  />
                  <div className="p-4 mb-20">
                    <h2 className={cx('article_title')}>{newData?.news[0].title}</h2>
                    <p className={cx('article_content')}>{newData?.news[0]?.content.replace(/<\/?[^>]+(>|$)/g, '')}</p>
                    <p className={cx('article_meta', 'inline-flex')}>
                      <FaCalendarAlt />
                      &nbsp;{new Date(newData?.news[0].createdAt).toLocaleDateString()} -{' '}
                      {newData?.news[0]?.author?.fullName}
                    </p>
                    <p className={cx('article_excerpt')}>{newData?.news[0].excerpt}</p>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Side articles */}
          <div className="space-y-12">
            {newData?.news?.slice(1, 7).map((article) => (
              <Link to={`/tin-tuc/${article._id}`} className={cx('news_link')} key={article.id}>
                <div key={article.id} className={cx('side_article')}>
                  <img src={article.imageUrl} alt={article.title} className="w-1/3 h-32 object-cover" />
                  <div className="w-2/3 p-4 flex flex-col">
                    <span className="text-lg">{article.category?.name}</span>
                    <h3 className={cx('side_article_title')}>{article.title}</h3>
                    <p className={cx('side_article_excerpt', 'text-xs')}>{article.excerpt}</p>
                    <p className="text-sm text-gray-400 inline-flex">
                      <FaCalendarAlt />
                      &nbsp;{new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className={cx('news_wapper', 'overflow-hidden')}>
          <div className="grid grid-cols-3 gap-4">
            {currentDesktopNewsItems.map((item) => (
              <Link to={`/tin-tuc/${item._id}`} key={item.id}>
                <div
                  key={item.id}
                  className="relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg p-5"
                >
                  <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                  <div className="p-2 bg-white transition-transform duration-300 transform hover:-translate-y-1">
                    <span className="text-gray-500">{item.category?.name}</span>
                    <h3 className={cx('article_title', 'text-3xl')}>{item.title}</h3>
                    <p className={cx('article_content')}>{item.content.replace(/<\/?[^>]+(>|$)/g, '')}</p>
                    <p className="text-sm text-gray-400 inline-flex">
                      <FaCalendarAlt />
                      &nbsp;{new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={desktopCurrentPage}
              totalCount={newData?.news?.length || 0}
              pageSize={desktopPageSize}
              onPageChange={(page) => setDesktopCurrentPage(page)}
              siblingCount={1}
            />
          </div>
        </div>
      </div>

      <div className="block md:hidden space-y-6 mt-8">
        <div class="border-t-2 border-blue-600 opacity-50 my-4 mt-8"></div>
        <h2 className={cx('title-category')}>Y học thường thức</h2>
        {currentMobileNewsItems.map((article) => (
          <Link to={`/tin-tuc/${article._id}`} key={article.id} className="block relative mx-2">
            <div key={article.id} className={cx('side_article')}>
              <img src={article.imageUrl} alt={article.title} className="w-1/3 h-32 object-cover" />
              <div className="w-2/3 p-4 flex flex-col">
                <span className="text-lg">{article.category?.name}</span>
                <h3 className={cx('side_article_title')}>{article.title}</h3>
                <p className={cx('side_article_excerpt', 'text-xs')}>{article.excerpt}</p>
                <p className="text-sm text-gray-400 inline-flex">
                  <FaCalendarAlt />
                  &nbsp;{new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
        <div className="mt-6 flex justify-center pb-6">
          <Pagination
            currentPage={mobileCurrentPage}
            totalCount={newData?.news?.length || 0}
            pageSize={mobilePageSize}
            onPageChange={(page) => setMobileCurrentPage(page)}
            siblingCount={1}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsKnowlage;
