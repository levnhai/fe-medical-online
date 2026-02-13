import { Link } from 'react-router-dom';
import ArticleMeta from './articleMeta';
import { stripHtml } from '~/utils/string';

function FeaturedArticle({ article }) {
  if (!article) return null;

  return (
    <Link to={`/tin-tuc/${article._id}`}>
      <div className="bg-white shadow rounded overflow-hidden">
        <img loading="lazy" src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover" />

        <div className="p-4">
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p>{stripHtml(article.content)}</p>

          <ArticleMeta date={article.createdAt} author={article.author?.fullName} />
        </div>
      </div>
    </Link>
  );
}

export default FeaturedArticle;
