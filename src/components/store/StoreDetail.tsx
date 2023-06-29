import React from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Title, Votes, Main } from './index';
import { archiveQueryKey, storeQueryKey } from '../../constants/index';
import { fetchStore } from '../../api/stores';
import fetchArchives from '../../api/archive';
import { ArchiveType, ArchivesType } from '../../hooks/useArchivesMutation';
import { StoreDataType } from 'types';

const Container = styled.div`
  width: 100%;
  min-width: 1000px;
  margin-bottom: 50px;
`;

const VerticalHr = styled.hr`
  width: 1px;
  height: 20px;
  margin: 0 10px;
`;

const bold = css`
  font-weight: 600;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;

  p {
    padding: 0;
  }
`;

const FirstVoteUser = styled.div``;

const UserName = styled.span`
  ${bold}
  position: relative;

  :before {
    background-color: hsla(120, 60%, 70%, 0.5);

    content: '';
    position: absolute;
    width: calc(100% + 4px);
    height: 60%;
    left: -2px;
    bottom: 0;
    z-index: -1;
    transform: rotate(-2deg);
  }
`;

const ArchivedCntMsg = styled.p`
  span {
    ${bold}
  }
`;

const VoteCntMsg = styled.span`
  span {
    ${bold}
  }
`;

export interface StoreDetailProps {
  addArchive: (newArchive: ArchiveType) => void;
  deleteArchive: (archiveToDelete: ArchiveType) => void;
}

const StoreDetail = ({ addArchive, deleteArchive }: StoreDetailProps) => {
  const { storeId } = useParams();

  const [{ data: archivesData }, { data: storeData }]: [
    { data: ArchivesType | undefined },
    { data: StoreDataType | undefined }
  ] = useQueries({
    queries: [
      { queryKey: [...archiveQueryKey, storeId], queryFn: fetchArchives(storeId) },
      { queryKey: [...storeQueryKey, storeId], queryFn: fetchStore(storeId!) },
    ],
  });

  return (
    <Container>
      <Title storeData={storeData} archivesData={archivesData} addArchive={addArchive} deleteArchive={deleteArchive} />
      <SubTitle>
        <FirstVoteUser>
          최초 투표자 : <UserName>{storeData?.firstVoteUser}</UserName>
        </FirstVoteUser>
        <VerticalHr />
        <VoteCntMsg>
          투표 <span>{storeData?.totalVotesCnt}</span>개
        </VoteCntMsg>
        <VerticalHr />
        <ArchivedCntMsg>
          저장 <span>{archivesData?.totalArchivesCnt}</span>개
        </ArchivedCntMsg>
      </SubTitle>
      <Main store={storeData} />
      <Votes votesCount={storeData?.votesCount} />
    </Container>
  );
};

export default StoreDetail;
