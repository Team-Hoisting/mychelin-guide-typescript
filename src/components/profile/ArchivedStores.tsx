import styled from 'styled-components';
import useArchivedInfiniteQuery from '../../hooks/useArchivedInfiniteQuery';
import { ScrollObserver } from '../common';
import ProfileStoreItem from './ProfileStoreItem';

const StoresGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const NoArchivedItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 500px;
`;

const ArchivedStores = ({ profileUserNickname }) => {
  const { data, fetchNextPage, hasNextPage } = useArchivedInfiniteQuery(profileUserNickname);

  return (
    <>
      {data.pages.flat().length === 0 ? (
        <>
          <NoArchivedItemContainer>
            <span>{profileUserNickname}님은 아직 저장한 식당이 없습니다.</span>
          </NoArchivedItemContainer>
        </>
      ) : (
        <>
          <StoresGrid>
            {data.pages.flat().map(({ storeId, storeName }) => (
              <ProfileStoreItem key={storeId} storeId={storeId} storeName={storeName} />
            ))}
          </StoresGrid>
          {hasNextPage && <ScrollObserver fetchNextPage={fetchNextPage} />}
        </>
      )}
    </>
  );
};

export default ArchivedStores;
