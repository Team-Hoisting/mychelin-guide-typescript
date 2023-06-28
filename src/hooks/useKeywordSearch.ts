import React from 'react';
import { KakaoResultType } from 'components/searchmap/types';

const { kakao } = window as any;

interface KakaoPaginationType {
  nextPage: () => void;
  prevPage: () => void;
  gotoPage: (page: number) => void;
  gotoFirst: () => void;
  gotoLast: () => void;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  current: number;
}

const useKeywordSearch = (size = 4, page = 1) => {
  const [result, setResult] = React.useState<Array<KakaoResultType>>();
  const paginationRef = React.useRef<KakaoPaginationType>();

  const ps = new kakao.maps.services.Places();

  const keywordSearch = (keyword: string) => {
    ps.keywordSearch(
      keyword,
      (result: Array<KakaoResultType>, status: any, pagination: KakaoPaginationType) => {
        // kakao.maps.services.Status.ERROR 일 때
        if (status === kakao.maps.services.Status.ERROR) return;

        paginationRef.current = pagination;
        setResult([...result]);
      },
      {
        category_group_code: ['FD6', 'CE7'],
        size,
        page,
      }
    );
  };

  return { keywordSearch, result, paginationRef };
};

export default useKeywordSearch;
