import { Link } from 'react-router-dom';
import ArticleMeta from './articleMeta';
import { memo } from 'react';
import { stripHtml } from '~/utils/string';

function ArticleCard({ article }) {
  return (
    <Link to={`/tin-tuc/${article._id}`}>
      <div className="bg-white shadow rounded p-4 hover:shadow-lg transition">
        <img loading="lazy" src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover mb-3" />
        <h3 className="font-bold">{article.title}</h3>
        <p className="text-sm">{stripHtml(article.content).slice(0, 100)}...</p>
        <ArticleMeta date={article.createdAt} />
      </div>
    </Link>
  );
}

export default memo(ArticleCard);
