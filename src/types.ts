export type CategoryCode =
  | 'AL00'
  | 'KO01'
  | 'CH02'
  | 'JP03'
  | 'WE04'
  | 'BS05'
  | 'BG06'
  | 'CK07'
  | 'PZ08'
  | 'GB09'
  | 'DS10'
  | 'VG11'
  | 'PB12';

export interface StoreDataType {
  storeId: string;
  firstUserId: string;
  imgUrl?: string;
  storeName: string;
  address: string;
  phoneNumber: string;
  x: string;
  y: string;
  votesCount: [CategoryCode, number][];
  totalVotesCnt: number;
  firstVoteUser: string;
  archivesCount: number;
  starsCount: number;
}

export interface UserDataType {
  email: string;
  password: string;
  nickname: string;
  isCertified: boolean;
  votedCategoryOrder: Array<CategoryCode>;
}

export interface VoteDataType {
  storeId: string;
  email: string;
  categoryCode: CategoryCode;
  votedAt: number;
}

export type defaultValues = {
  email: string;
  password: string;
  confirmPassword?: string;
  nickname?: string;
};

export interface User {
  email: string;
  nickname: string;
  voteStatus: Array<{
    storeId: string;
    email: string;
    categoryCode: CategoryCode;
    votedAt: number;
  }>;
}

export type StoresDataType = Array<StoreDataType>;
