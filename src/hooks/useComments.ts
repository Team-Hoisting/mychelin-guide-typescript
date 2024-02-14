import { useQuery } from '@tanstack/react-query';
import { commentsQuery } from '../components/store/queries/queries';

interface CommentsQueryProps {
  storeId: string | undefined;
  currentPage: number;
}

const useComments = ({ storeId, currentPage }: CommentsQueryProps) => useQuery(commentsQuery({ storeId, currentPage }));

export default useComments;
