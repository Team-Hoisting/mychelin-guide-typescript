import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { searchInputState } from '../../recoil/atoms';
import { ScrollObserver } from '../common';
import { useFetchStores } from '../../hooks/index.js';
import { TopThreeStores, UnrankedStores, NoResultMessage } from '.';

const StoresContainer = styled.div`
  padding: 20px;
`;

const InfiniteStoreList = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchStores();
  const searchedStores = data.pages.flat();
  const [topThree, remaining] = [searchedStores.slice(0, 3), searchedStores.slice(3)];
  const searchedInput = useRecoilValue(searchInputState);

  return searchedInput && !searchedStores.length ? (
    <NoResultMessage />
  ) : (
    <StoresContainer>
      {!searchedInput && <TopThreeStores stores={topThree} />}
      <UnrankedStores stores={searchedInput ? searchedStores : remaining} />
      {hasNextPage && <ScrollObserver fetchNextPage={fetchNextPage} />}
    </StoresContainer>
  );
};

export default InfiniteStoreList;
