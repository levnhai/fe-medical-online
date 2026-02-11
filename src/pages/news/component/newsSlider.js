import NewsCard from '~/pages/news/component/newsCard';
export default function NewsSlider({ items }) {
  console.log('🚀 ~ NewsSlider ~ items:', items);
  return (
    <div className="news-slider">
      {items?.news.slice(0, 5).map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
