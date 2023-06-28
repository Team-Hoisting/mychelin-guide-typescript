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
  voteCount: [CategoryCode, number][];
  totalVotesCnt: number;
  firstVoteUser: string;
  archivesCount: number;
  starsCount: number;
  starCount?: number;
  voteCntArr?: [CategoryCode, number][] | [];
}

export interface VoteDataType {
  storeId: string,
  email: string,
  categoryCode: CategoryCode,
  votedAt: number,
}

<<<<<<< HEAD
export type defaultValues = {
  email: string;
  password: string;
  confirmPassword?: string;
  nickname?: string;
};
=======
export interface User {
  email: string;
  nickname: string;
  archived: Array<{
    archiveId: number;
    email: string;
    storeId: string;
  }>;
  voteStatus: Array<{
    storeId: string;
    email: string;
    categoryCode: CategoryCode;
    votedAt: number;
  }>;
}

export type StoresDataType = Array<StoreDataType>;
>>>>>>> 3f9b4531999feef10957643deee333cb912e39fc

