import {
  useQueryClient,
  useMutation,
  MutationFunction,
  UseMutationResult,
  QueryKey,
  Updater,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface MutationPropsType<TVariables, TData> {
  mutationFn: MutationFunction<TData, TVariables>;
  onMutate: (variables: TVariables) => Updater<TData | undefined, TData | undefined>;
  queryKey: Array<string | number>;
}

const useDataMutation = <TVariables, TData>({
  mutationFn,
  onMutate: expected,
  queryKey,
}: MutationPropsType<TVariables, TData>) => {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError, TVariables, TData>({
    mutationFn,
    onMutate(variable: TVariables) {
      // 낙관적 업데이트를 덮어쓰지 않도록 refetch 모두 취소
      queryClient.cancelQueries();
      // 롤백 위한 이전 상태 저장
      const previousData = queryClient.getQueryData<TData>(queryKey);
      console.log('previous: ', queryClient.getQueryData(queryKey));
      // 낙관적 업데이트
      queryClient.setQueryData<TData>(queryKey, expected(variable));
      // 반환값은 onError의 context로 사용
      return previousData;
    },

    onError(error: AxiosError, variables: TVariables, context?: TData) {
      // 서버 요청 실패 시 롤백
      if (context !== undefined) {
        queryClient.setQueryData<TData>(queryKey, context);
      }
    },

    onSuccess(data: TData, variables: TVariables, context?: TData) {
      // 서버 요청 실패 또는 성공 시 refetch하기
      // 관련 업데이트가 되는 동안 loading 상태 유지
      return queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useDataMutation;
