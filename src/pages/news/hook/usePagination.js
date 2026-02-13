import { useMemo } from 'react';

export const usePagination = (data = [], currentPage, pageSize) => {
  return useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);
};
