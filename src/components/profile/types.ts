import { CategoryCode, StoreDataType, UserDataType } from 'types';

export interface VoteStore {
  categoryCode: CategoryCode;
  store: StoreDataType;
  votedAt: number;
}

export interface UserProfileInfoByNicknameReturnType {
  user: UserDataType;
  voteStores: Array<VoteStore>;
}

export interface SortedStoresProps {
  profileUserNickname: string;
  voteStores: Array<VoteStore>;
  emptyCategories: Array<CategoryCode>;
}
