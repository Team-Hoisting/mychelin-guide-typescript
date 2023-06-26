import React from 'react';
import styled from 'styled-components';
import { BsBookmark } from 'react-icons/bs';
import { MdOutlineWhereToVote } from 'react-icons/md';
import { Loader } from '../common';
import { SortedStores, ArchivedStores } from '.';

const Tabs = styled.div`
  border-top: 1px solid #ababab;
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 30px;
`;

const Tab = styled.div`
  width: 250px;
  border-top: ${({ selected }) => (selected ? '2px solid var(--border-tertiary)' : '2px solid rgba(0,0,0,0)')};
  color: ${({ selected }) => (selected ? 'var(--font-color)' : '#ababab')};
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const ArchiveIcon = styled(BsBookmark)`
  width: 30px;
`;

const VoteIcon = styled(MdOutlineWhereToVote)`
  width: 30px;
`;

const TabName = styled.p`
  margin: 0;
`;

const StoresViewer = ({ profileUserNickname, voteStores, emptyCategories }) => {
  const [isVotedStoresTab, setIsVotedStoresTab] = React.useState(true);

  return (
    <>
      <Tabs>
        <Tab onClick={() => setIsVotedStoresTab(true)} selected={isVotedStoresTab}>
          <VoteIcon />
          <TabName>Voted Stores</TabName>
        </Tab>
        <Tab onClick={() => setIsVotedStoresTab(false)} selected={!isVotedStoresTab}>
          <ArchiveIcon />
          <TabName>Archived Stores</TabName>
        </Tab>
      </Tabs>
      {isVotedStoresTab ? (
        <SortedStores
          profileUserNickname={profileUserNickname}
          voteStores={voteStores}
          emptyCategories={emptyCategories}
        />
      ) : (
        <React.Suspense fallback={<Loader />}>
          <ArchivedStores profileUserNickname={profileUserNickname} />
        </React.Suspense>
      )}
    </>
  );
};

export default StoresViewer;
