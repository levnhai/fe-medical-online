import { useState } from 'react';
import { useGetNewsMedicalQuery } from '~/services/new.api';
import Pagination from '~/components/paination';
import { usePagination } from '~/pages/news/hook/usePagination';
import ArticleCard from '~/pages/news/component/articleCard';

import NewsHeader from '~/pages/news/component/newsHeader';
import NewsSkeleton from './loading/news_skeleton';
import { useNewsData } from '~/pages/news/hook/useNewsData';

import classNames from 'classnames/bind';
import styles from './news.module.scss';
const cx = classNames.bind(styles);

function NewsMedical() {
  const { data, isLoading } = useGetNewsMedicalQuery();

  const filteredNews = useNewsData(data, 'tin-y-te');

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const paginated = usePagination(filteredNews, page, pageSize);

  if (isLoading) return <NewsSkeleton />;

  return (
    <div className={cx('news', 'w-full overflow-x-hidden')}>
      <div className={cx('news_main')}>
        <NewsHeader />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {paginated.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination currentPage={page} totalCount={filteredNews.length} pageSize={pageSize} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default NewsMedical;
