import { useGetNewsQuery } from '~/services/new.api';
import NewsHeader from '~/pages/news/component/newsHeader';
import FeaturedArticle from '~/pages/news/component/featuredArticle';
import SideArticle from '~/pages/news/component/sideArticle';
import NewsSkeleton from './loading/news_skeleton';
import { useNewsData } from '~/pages/news/hook/useNewsData';

import classNames from 'classnames/bind';
import styles from './news.module.scss';
const cx = classNames.bind(styles);

function News() {
  const { data, isLoading } = useGetNewsQuery();
  const news = useNewsData(data);

  if (isLoading) return <NewsSkeleton />;

  return (
    <div className={cx('news', 'w-full overflow-x-hidden')}>
      <div className={cx('news_main')}>
        <NewsHeader />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <FeaturedArticle article={news[0]} />
          </div>

          <div className="space-y-4">
            {news.slice(1, 6).map((article) => (
              <SideArticle key={article._id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
