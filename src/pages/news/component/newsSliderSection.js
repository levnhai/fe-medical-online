import { Link } from 'react-router-dom';
import NewsSection from '~/pages/news/component/newsSection';
import NewsSlider from '~/pages/news/component/newsSlider';
import { useGetNewsQuery } from '~/services/new.api';

export default function NewsSliderSection({ title, category }) {
  const { data, isLoading } = useGetNewsQuery(category);
  const newData = data?.data;

  if (isLoading) return null;

  return (
    <NewsSection title={title}>
      <NewsSlider items={newData || []} />

      <div className="view-all-wrapper">
        <Link to={`/tin-tuc/${category}`} className="view-all">
          Xem tất cả →
        </Link>
      </div>
    </NewsSection>
  );
}
