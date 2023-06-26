import React from 'react';
import { Loader, SkinnyContainer } from '../components/common';
import { Categories, InfiniteStoreList } from '../components/main';

const MainPage = () => (
  <SkinnyContainer>
    <Categories />
    <React.Suspense fallback={<Loader />}>
      <InfiniteStoreList />
    </React.Suspense>
  </SkinnyContainer>
);

export default MainPage;
