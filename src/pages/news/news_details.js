import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendarAlt, FaUser, FaEye } from 'react-icons/fa';
import classNames from 'classnames/bind';
import { fetchNewsById, fetchRelatedNews, fetchMostViewedNews } from '~/redux/news/newsSlice';
import NewsSkeleton from './loading/news_skeleton';
import styles from './news.module.scss';

const cx = classNames.bind(styles);

function NewsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { newData, relatedNews, mostViewedNews, loading } = useSelector((state) => state.new);

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsById(id));
      dispatch(fetchRelatedNews(id));
      dispatch(fetchMostViewedNews()).then((result) => {});
    }
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  const hasMostViewedNews = mostViewedNews && mostViewedNews.length > 0;

  if (loading || !newData) {
    return <NewsSkeleton />;
  }

  const renderMostViewedNews = () => {
    if (!hasMostViewedNews) {
      return <p className="text-gray-500">Không có tin tức xem nhiều</p>;
    }

    return (
      <div>
        <div className="hidden md:block">
          <hr class="my-4 border-t-1 border-gray-300" />
          <h3 className="text-xxl font-semibold mt-8">Tin tức xem nhiều nhất</h3>
          <div className={cx('news_wapper', 'overflow-hidden')}>
            <div className="grid grid-cols-3 gap-4">
              {mostViewedNews.map((item) => (
                <Link to={`/tin-tuc/${item._id}`} key={item.id}>
                  <div
                    key={item.id}
                    className="relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg p-5"
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                    <div className="p-2 bg-white transition-transform duration-300 transform hover:-translate-y-1">
                      <span className="text-gray-500">{item.category?.name}</span>
                      <h3 className={cx('article_title')}>{item.title}</h3>
                      <p className={cx('article_content')}>
                        {item.content.replace(/<\/?[^>]+(>|$)/g, '')
                          ? item.content.replace(/<\/?[^>]+(>|$)/g, '')
                          : 'Nội dung không có sẵn'}
                      </p>
                      <p className="text-sm text-gray-400 inline-flex">
                        <FaCalendarAlt />
                        &nbsp;{new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="block md:hidden space-y-12">
          <h3 className="text-xxl font-semibold mt-8">Tin tức xem nhiều nhất</h3>
          {mostViewedNews?.map((article) => (
            <Link
              to={`/tin-tuc/${article._id}`}
              key={article.id}
              className="block relative mx-2 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg px-5"
            >
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
    );
  };

  return (
    <div className={cx('news', 'w-full', 'overflow-x-hidden')}>
      {/* Navigation Breadcrumb */}
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center flex-wrap">
          <Link to="/tin-tuc" className="text-blue-600 hover:text-blue-800 mr-2">
            Tin tức
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <Link to={`/tin-tuc/${newData?.category?.slug || ''}`} className="text-blue-600 hover:text-blue-800 mr-2">
            {newData.category?.name || 'Danh mục không xác định'}
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <p className="text-blue-600">{newData.title}</p>
        </div>
      </div>

      <div className={cx('news_medical')}>
        <div className="flex flex-col md:flex-row">
          {/* Nội dung tin tức */}
          <div className="w-full md:w-2/3 md:pr-8">
            <h1 className={cx('header_title', 'mb-4 mt-4')}>{newData.title}</h1>

            <div className="flex items-center text-gray-600 mb-6">
              <FaCalendarAlt className="mr-2" />
              <span className="mr-4">{new Date(newData.createdAt).toLocaleDateString()}</span>
              {newData.author && (
                <>
                  <FaUser className="mr-2" />
                  <span>{newData.author.fullName}</span>
                </>
              )}
            </div>

            {/* {newData.imageUrl && (
            <div className="mb-6">
              <img
                src={newData.imageUrl}
                alt={newData.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          )} */}
            <div
              className={cx('header_subtitle', 'mb-4 mt-4')}
              dangerouslySetInnerHTML={{
                __html: newData.subtitle || 'Subtitle đang được cập nhật.',
              }}
            />

            <div
              className="news-content text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: newData.content || 'Nội dung đang được cập nhật.',
              }}
            />

            {newData.tags && newData.tags.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                <h3 className="text-xxl font-semibold">Tag:</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(newData.tags) &&
                    newData.tags[0].split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-4 py-2 rounded-full text-xl font-medium text-gray-700"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Link to="/tin-tuc" className="text-blue-600 hover:text-blue-800 transition-colors">
                ← Quay lại danh sách tin tức
              </Link>
            </div>
          </div>

          {/* Phần dành cho banner hoặc tin tức liên quan */}
          {relatedNews && relatedNews.length > 0 && (
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
              <h3 className="text-xxl font-semibold mb-4 mt-4">Tin tức liên quan</h3>
              <div className={cx('news_medical_service', 'space-y-4')}>
                {relatedNews.map((article) => (
                  <Link to={`/tin-tuc/${article._id}`} className={cx('news_link')} key={article.id}>
                    <div key={article._id} className={cx('side_article')}>
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
          )}
        </div>
      </div>
      {/* Most Viewed News Section */}
      {renderMostViewedNews()}
    </div>
  );
}

export default NewsDetails;
