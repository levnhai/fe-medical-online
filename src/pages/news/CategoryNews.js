import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';

import ArticleCard from '~/pages/news/component/articleCard';
import { useGetNewsByCategoryQuery } from '~/services/new.api';
import NewsSkeleton from '~/pages/news/loading/news_skeleton';
import NewsHeader from '~/pages/news/component/newsHeader';
import FeaturedArticle from '~/pages/news/component/featuredArticle';
import SideArticle from '~/pages/news/component/sideArticle';
import Pagination from '~/components/paination';

import classNames from 'classnames/bind';
import styles from './news.module.scss';
const cx = classNames.bind(styles);

const pageSize = 3;

function CategoryNews() {
  const { slug } = useParams();

  const { data, isLoading, isFetching } = useGetNewsByCategoryQuery(slug);
  const newData = data?.data;
  const newTotal = newData?.news.length ?? 0;
  const isBusy = isLoading || isFetching;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    if (!newData) return [];
    const start = (currentPage - 1) * pageSize;
    return newData?.news.slice(start, start + pageSize);
  }, [newData, currentPage]);

  return (
    <div className={cx('news', 'w-full overflow-x-hidden')}>
      <div className={cx('news_main')}>
        <NewsHeader />

        {isBusy ? (
          <NewsSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-2">
                <FeaturedArticle article={newData?.news[0]} />
              </div>

              <div className="space-y-4">
                {newData?.news.slice(1, 6).map((article) => (
                  <SideArticle key={article._id} article={article} />
                ))}
              </div>
            </div>

            {currentTableData?.length > 0 && (
              <div>
                {isBusy ? (
                  <>Loading</>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {currentTableData.map((article) => (
                      <ArticleCard key={article._id} article={article} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-8">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={newTotal}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryNews;
