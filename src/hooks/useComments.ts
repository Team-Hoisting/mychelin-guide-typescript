import { useQuery } from '@tanstack/react-query';
import commentQueryKey from '../constants/commentQueryKey';
import { fetchComments } from '../api/comment';
import { AxiosError } from 'axios';

interface CommentsQueryProps {
  storeId: string | undefined;
  currentPage: number;
}

const commentsQuery = ({ storeId, currentPage }: CommentsQueryProps) => ({
  queryKey: [...commentQueryKey, storeId, currentPage],
  queryFn: fetchComments(storeId, currentPage),
  onError: (error: AxiosError) => console.error(error),
  keepPreviousData: true,
});

const useComments = ({ storeId, currentPage }: CommentsQueryProps) => useQuery(commentsQuery({ storeId, currentPage }));

export default useComments;
