export interface KakaoResultType {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

export interface StoreType {
  storeId: string;
  storeName: string;
  address: string;
  phoneNumber: string;
  x: string;
  y: string;
}

export interface ResultItemType {
  store: KakaoResultType;
  isRegistered: boolean;
}
