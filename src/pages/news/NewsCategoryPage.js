import { useParams } from 'react-router-dom';
import NewsHeader from '../../components/news/NewsHeader';
import NewsGrid from '../../components/news/NewsGrid';
import NewsPagination from '../../components/news/NewsPagination';

export default function NewsCategoryPage() {
  const { slug } = useParams();

  return (
    <>
      <NewsHeader title="Tin dịch vụ" />

      <NewsGrid category={slug} />

      <NewsPagination />
    </>
  );
}
