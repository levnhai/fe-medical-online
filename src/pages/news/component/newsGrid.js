import { useNews } from '../../hooks/useNews';
import NewsCard from './newsCard';

export default function NewsGrid({ category }) {
  const { news, loading } = useNews(category);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="news-grid">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
