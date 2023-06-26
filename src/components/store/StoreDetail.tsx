import React from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useStore } from '../../hooks/index.js';
import { Title, Votes, Main } from './index';

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

const StoreDetail = ({ archivedCntState, setArchiveCntState, addBookMark, deleteBookMark }) => {
  const { storeId } = useParams();
  const { data: storeData } = useStore(storeId);
  const { firstVoteUser, totalVotesCnt, voteCnt } = storeData;

  React.useEffect(() => {
    setArchiveCntState(storeData?.archivesCount);
  }, []);

  return (
    <Container>
      <Title storeData={storeData} addBookMark={addBookMark} deleteBookMark={deleteBookMark} />
      <SubTitle>
        <FirstVoteUser>
          최초 투표자 : <UserName>{firstVoteUser}</UserName>
        </FirstVoteUser>
        <VerticalHr />
        <VoteCntMsg>
          투표 <span>{totalVotesCnt}</span>개
        </VoteCntMsg>
        <VerticalHr />
        <ArchivedCntMsg>
          저장 <span>{archivedCntState}</span>개
        </ArchivedCntMsg>
      </SubTitle>
      <Main store={storeData} />
      <Votes voteCnt={voteCnt} />
    </Container>
  );
};

export default StoreDetail;
