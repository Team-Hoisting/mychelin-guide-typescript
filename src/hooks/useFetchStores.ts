import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStores } from '../api/stores';
import { categoryState, searchInputState } from '../recoil/atoms';
import { storesQueryKey, STORES_FETCH_SIZE } from '../constants';

const useFetchStores = () => {
  const category = useRecoilValue(categoryState);
  const keyword = useRecoilValue(searchInputState);

  const storeFetcher = async pageParams => {
    const url = `/api/stores?keyword=${keyword}&categoryCode=${
      category === 'AL00' ? '' : category
    }&page=${pageParams}&page_size=${STORES_FETCH_SIZE}`;

    const stores = await fetchStores(url);

    return stores;
  };

  // prettier-ignore
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [...storesQueryKey, category, keyword], 
    queryFn: ({ pageParam = 1 }) => storeFetcher(pageParam),
    getNextPageParam: (lastPage, allPages) =>
    lastPage.length === STORES_FETCH_SIZE ? allPages.length + 1 : undefined,
  });

  return { data, isLoading, fetchNextPage, hasNextPage };
};

export default useFetchStores;
