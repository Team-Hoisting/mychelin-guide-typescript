import { useQuery } from '@tanstack/react-query';
import { storeQueryKey } from '../constants/index';
import { fetchStore } from '../api/stores';

const storeQuery = storeid => ({
  queryKey: [...storeQueryKey, storeid],
  queryFn: fetchStore(storeid),
  onError: error => console.error(error),
});

const useStore = id => useQuery(storeQuery(id));

export default useStore;
