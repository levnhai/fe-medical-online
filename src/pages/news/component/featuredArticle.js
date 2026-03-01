import { Link } from 'react-router-dom';
import ArticleMeta from './articleMeta';
import { stripHtml } from '~/utils/string';

import classNames from 'classnames/bind';
import styles from '../news.module.scss';
const cx = classNames.bind(styles);

function FeaturedArticle({ article }) {
  if (!article) return null;

  return (
    <Link to={`/tin-tuc/${article._id}`}>
      <div className="bg-white shadow rounded overflow-hidden">
        <img loading="lazy" src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover" />

        <div className="p-4">
          <h2 className={cx('article_title')}>{article.title}</h2>
          <p className={cx('article_content')}>{stripHtml(article.content)}</p>

          <ArticleMeta date={article.createdAt} author={article.author?.fullName} />
        </div>
      </div>
    </Link>
  );
}

export default FeaturedArticle;
