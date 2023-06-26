import { useQuery } from '@tanstack/react-query';
import commentQueryKey from '../constants/commentQueryKey';
import { fetchComments } from '../api/comment';

const commentsQuery = ({ storeId, currentPage }) => ({
  queryKey: [...commentQueryKey, storeId, currentPage],
  queryFn: fetchComments(storeId, currentPage),
  onError: error => console.error(error),
  keepPreviousData: true,
});

const useComments = ({ storeId, currentPage }) => useQuery(commentsQuery({ storeId, currentPage }));

export default useComments;
