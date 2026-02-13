import { Link } from 'react-router-dom';
import ArticleMeta from './articleMeta';

function SideArticle({ article }) {
  return (
    <Link to={`/tin-tuc/${article._id}`}>
      <div className="flex gap-4 bg-white shadow rounded p-3">
        <img loading="lazy" src={article.imageUrl} alt={article.title} className="w-32 h-24 object-cover" />
        <div>
          <h4 className="font-semibold">{article.title}</h4>
          <ArticleMeta date={article.createdAt} />
        </div>
      </div>
    </Link>
  );
}

export default SideArticle;
