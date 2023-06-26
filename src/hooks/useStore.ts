import { useQuery } from '@tanstack/react-query';
import { storeQueryKey } from '../constants/index';
import { fetchStore } from '../api/stores';
import { AxiosError } from 'axios';

const storeQuery = (storeid: string) => ({
  queryKey: [...storeQueryKey, storeid],
  queryFn: fetchStore(storeid),
  onError: (error: AxiosError) => console.error(error),
});

const useStore = (id: string) => useQuery(storeQuery(id));

export default useStore;
