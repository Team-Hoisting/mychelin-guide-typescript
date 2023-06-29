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
  votesCount: [CategoryCode, number][] | undefined;
}

const Votes = ({ votesCount }: VotesProps) => {
  return (
    <Container>
      {votesCount?.map(([code, cnt]) => (
        <CategoryTag key={code} categoryCode={code} votedCnt={cnt} renderName={true} />
      ))}
    </Container>
  );
};

export default Votes;
