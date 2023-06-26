import { useQuery } from '@tanstack/react-query';
import { fetchUserProfileInfoByNickname } from '../api/users';
import userQueryKey from '../constants/userQueryKey';
import categoryCodes from '../constants/categoryCodes';

const useUserProfile = nickname => {
  const { data } = useQuery({
    queryKey: [...userQueryKey, nickname, 'profile'],
    queryFn: fetchUserProfileInfoByNickname(nickname),
    select(userInfo) {
      const { user, voteStores } = { ...userInfo };

      const emptyCategories = voteStores.reduce(
        (acc, { categoryCode }) => {
          const codeIdx = acc.findIndex(code => code === categoryCode);

          return [...acc.slice(0, codeIdx), ...acc.slice(codeIdx + 1)];
        },
        [...categoryCodes]
      );

      const newVoteStores = [...user.votedCategoryOrder].reverse().reduce(
        (acc, categoryCode) => {
          const idx = acc.findIndex(res => res.categoryCode === categoryCode);
          const result = idx !== -1 ? [acc[idx], ...acc.slice(0, idx), ...acc.slice(idx + 1)] : acc;

          return result;
        },
        [...voteStores].sort((a, b) => a.votedAt - b.votedAt)
      );

      return { ...userInfo, voteStores: newVoteStores, emptyCategories };
    },
  });

  return data;
};

export default useUserProfile;
