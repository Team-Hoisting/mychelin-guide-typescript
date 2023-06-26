import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchArchivedStoreByNickname } from '../api/stores';
import { storesQueryKey, ARCHIVED_STORES_FETCH_SIZE } from '../constants';

const useArchivedInfiniteQuery = nickname => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [...storesQueryKey, 'archived', nickname],
    queryFn: ({ pageParam = 1 }) => fetchArchivedStoreByNickname(nickname, pageParam, ARCHIVED_STORES_FETCH_SIZE)(),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === ARCHIVED_STORES_FETCH_SIZE ? allPages.length + 1 : undefined,
  });

  return { data, fetchNextPage, hasNextPage };
};

export default useArchivedInfiniteQuery;
