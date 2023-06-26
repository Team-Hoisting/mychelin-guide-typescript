import axios from 'axios';
import useDataMutation from './useDataMutaiton';
import { commentQueryKey } from '../constants/index';

const url = `/api/comments`;

const useCommentsMutation = ({ storeId, currentPage }) => {
  const { mutate: addComment } = useDataMutation({
    mutationFn: newComment => axios.post(url, newComment),
    onMutate: newComment => comments => [newComment, ...comments.data],
    queryKey: [...commentQueryKey, storeId, currentPage],
  });

  const { mutate: deleteComment } = useDataMutation({
    mutationFn: commentId => axios.delete(`${url}/${commentId}`),
    onMutate: id => comments => comments.data.filter(comment => comment.commentId !== id),
    queryKey: [...commentQueryKey, storeId, currentPage],
  });

  return { addComment, deleteComment };
};

export default useCommentsMutation;
