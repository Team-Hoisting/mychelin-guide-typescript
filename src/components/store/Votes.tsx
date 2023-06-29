import React from 'react';
import styled from 'styled-components';
import { CategoryTag } from '../common/index';
import { CategoryCode } from 'types';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

interface VotesProps {
  voteCnt: [CategoryCode, number][] | undefined;
}

const Votes = ({ voteCnt }: VotesProps) => (
  <Container>
    {voteCnt?.map(([code, cnt]) => (
      <CategoryTag key={code} categoryCode={code} votedCnt={cnt} renderName={true} />
    ))}
  </Container>
);

export default Votes;
