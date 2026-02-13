import { useMemo } from 'react';

export const useNewsData = (data, categorySlug) => {
  return useMemo(() => {
    const news = data?.data?.news || [];

    if (!categorySlug) return news;

    return news.filter((item) => item.category?.slug === categorySlug);
  }, [data, categorySlug]);
};
