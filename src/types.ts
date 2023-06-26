type CategoryCode =
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

interface StoreDataType {
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
}

export { CategoryCode, StoreDataType };
