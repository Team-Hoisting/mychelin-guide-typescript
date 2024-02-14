import { archiveQueryKey, storeQueryKey, commentQueryKey } from '../../../constants/index';
import fetchArchives from '../../../api/archive';
import { fetchStore } from '../../../api/stores';
import { fetchComments } from '../../../api/comment';

interface CommentsQueryProps {
  storeId: string | undefined;
  currentPage: number;
}

export const archivesQuery = (storeId: string | undefined) => ({
  queryKey: [...archiveQueryKey, storeId],
  queryFn: fetchArchives(storeId!),
});

export const storeQuery = (storeId: string | undefined) => ({
  queryKey: [...storeQueryKey, storeId],
  queryFn: fetchStore(storeId!),
});

export const commentsQuery = ({ storeId = '', currentPage = 1 }: CommentsQueryProps) => ({
  queryKey: [...commentQueryKey, storeId, currentPage],
  queryFn: fetchComments(storeId, currentPage),
  keepPreviousData: true,
});
