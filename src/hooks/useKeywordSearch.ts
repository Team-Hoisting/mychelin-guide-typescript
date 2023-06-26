import React from 'react';

const { kakao } = window;

const useKeywordSearch = (size = 4, page = 1) => {
  const [result, setResult] = React.useState(null);
  const paginationRef = React.useRef(null);

  const ps = new kakao.maps.services.Places();

  const keywordSearch = keyword => {
    ps.keywordSearch(
      keyword,
      (result, status, pagination) => {
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
