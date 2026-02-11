import { Link } from 'react-router-dom';

export default function NewsCard({ item }) {
  console.log('🚀 ~ NewsCard ~ item:', item);
  return (
    <article className="news-card">
      {/* <img src={item.thumbnail} alt={item.title} /> */}

      <span className="news-category">• {item?.category?.name}</span>

      <h3 className="news-title">{item.title}</h3>

      <div className="news-meta">
        {/* <span>{item.date}</span> */}
        <span>– {item?.author?.fullName}</span>
      </div>

      <Link to={`/tin-tuc/${item.slug}`} className="read-more">
        Xem tiếp →
      </Link>
    </article>
  );
}
