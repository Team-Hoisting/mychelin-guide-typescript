import React from 'react';
import { useKeywordSearch, useMarkeredMap } from './index.js';

const useMapSearch = initialKeyword => {
  const { keywordSearch, result, paginationRef } = useKeywordSearch();
  const { mapContainerRef, drawMarkers } = useMarkeredMap(idx => setClickedIdx(idx));

  const inputRef = React.useRef(null);
  const [clickedIdx, setClickedIdx] = React.useState(null);

  React.useEffect(() => {
    if (initialKeyword) keywordSearch(initialKeyword);
  }, []);

  React.useEffect(() => {
    setClickedIdx(null);
  }, [result]);

  const gotoPreviousPage = () => {
    if (paginationRef.current.hasPrevPage) paginationRef.current.prevPage();
  };

  const gotoNextPage = () => {
    if (paginationRef.current.hasNextPage) paginationRef.current.nextPage();
  };

  const search = () => {
    keywordSearch(inputRef.current.value);
  };

  return {
    mapContainerRef,
    result,
    clickedIdx,
    curPage: paginationRef.current?.current,
    hasPrevPage: paginationRef.current?.hasPrevPage,
    hasNextPage: paginationRef.current?.hasNextPage,
    inputRef,
    search,
    gotoPreviousPage,
    gotoNextPage,
    drawMarkers,
  };
};

export default useMapSearch;
