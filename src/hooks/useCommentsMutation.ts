import axios, { AxiosResponse } from 'axios';
import useDataMutation from './useDataMutaiton';
import { commentQueryKey } from '../constants/index';

const url = `/api/comments`;

interface CommentsMutationProps {
  storeId: string | undefined;
  currentPage: number;
}

export interface CommentType {
  storeId: string | undefined;
  content: string;
  email: string;
  isCertified: boolean;
  nickname: string;
  commentId?: string;
}

export interface CommentsType {
  data: CommentType[];
  totalPages: number;
}

const useCommentsMutation = ({ storeId, currentPage }: CommentsMutationProps) => {
  const { mutate: addComment } = useDataMutation<CommentType, CommentsType>({
    mutationFn: newComment => axios.post(url, newComment),
    onMutate: newComment => comments => {
      if (comments) return { ...comments, data: [newComment, ...comments.data] };
    },
    queryKey: [...commentQueryKey, storeId, currentPage],
  });

  const { mutate: deleteComment } = useDataMutation<string, CommentsType>({
    mutationFn: commentId => axios.delete(`${url}/${commentId}`),
    onMutate: id => comments => {
      if (comments) return { ...comments, data: comments.data.filter(comment => comment.commentId !== id) };
    },
    queryKey: [...commentQueryKey, storeId, currentPage],
  });

  return { addComment, deleteComment };
};

export default useCommentsMutation;
