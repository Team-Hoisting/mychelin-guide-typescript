import { useQueryClient, useMutation } from '@tanstack/react-query';

const useDataMutation = ({ mutationFn, onMutate: expected, queryKey }) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey,
    mutationFn,
    onMutate(variable) {
      // 낙관적 업데이트를 덮어쓰지 않도록 refetch 모두 취소
      queryClient.cancelQueries();
      // 롤백 위한 이전 상태 저장
      const previousData = queryClient.getQueryData(queryKey);
      console.log('previous: ', queryClient.getQueryData(queryKey));
      // 낙관적 업데이트
      queryClient.setQueryData(queryKey, expected(variable));
      // 반환값은 onError의 context로 사용
      return { previousData };
    },
    onError(error, newComment, context) {
      // 서버 요청 실패 시 롤백
      queryClient.setQueryData(queryKey, context.previousData);
    },
    onSuccess() {
      // 서버 요청 실패 또는 성공 시 refetch하기
      // 관련 업데이트가 되는 동안 loading 상태 유지
      return queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useDataMutation;
