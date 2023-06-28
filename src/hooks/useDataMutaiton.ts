import {
  useQueryClient,
  useMutation,
  MutationFunction,
  UseMutationResult,
  QueryKey,
  Updater,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ArchiveType } from './useArchivesMutation';
import type { CommentType, CommentsType } from './useCommentsMutation';

// interface MutationPropsType<TData, TVariables> {
//   mutationFn: MutationFunction<TData, TVariables>;
//   onMutate: (variables: TVariables) => (variable?: TData) => Promise<TData>;
//   queryKey: Array<string | number>;
// }

interface MutationPropsType<A, C> {
  mutationFn: MutationFunction<C, A>;
  // onMutate: (variables: CommentType) => (variable: CommentsType) => CommentType[];
  // onMutate: <T extends CommentType, C>(variables: T) => (variable: C) => T[];
  // onMutate: (variables: A) => (variable: B) => C;
  onMutate: (variables: A) => Updater<C | undefined, C | undefined>;
  // onMutate: <T>(variables: T) => (variable: T[]) => T[];
  queryKey: QueryKey;
}

const useDataMutation = <A, C>({ mutationFn, onMutate: expected, queryKey }: MutationPropsType<A, C>) => {
  const queryClient = useQueryClient();

  return useMutation<C, AxiosError, A, C>({
    mutationFn,
    onMutate(variable: A) {
      // 낙관적 업데이트를 덮어쓰지 않도록 refetch 모두 취소
      queryClient.cancelQueries();
      // 롤백 위한 이전 상태 저장
      const previousData = queryClient.getQueryData<C>(queryKey);
      console.log('previous: ', queryClient.getQueryData(queryKey));
      // 낙관적 업데이트
      queryClient.setQueryData(queryKey, expected(variable));
      // 반환값은 onError의 context로 사용
      return previousData;
    },

    onError(error: AxiosError, variables: A, previousData: C) {
      // 서버 요청 실패 시 롤백
      if (previousData !== undefined) {
        queryClient.setQueryData(queryKey, previousData);
      }
    },

    onSuccess(data: C, variables: A, previousData: C) {
      // 서버 요청 실패 또는 성공 시 refetch하기
      // 관련 업데이트가 되는 동안 loading 상태 유지
      return queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useDataMutation;
