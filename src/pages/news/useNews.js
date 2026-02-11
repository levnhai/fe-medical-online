import { useEffect, useState } from 'react';
import { fetchNews } from '../services/newsApi';

export function useNews(category) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchNews(category).then((data) => {
      setNews(data);
      setLoading(false);
    });
  }, [category]);

  return { news, loading };
}
