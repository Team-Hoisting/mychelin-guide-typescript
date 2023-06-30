import React from 'react';
import styled from 'styled-components';
import { CategoryTag } from '../common/index';
import { CategoryCode } from 'types';

interface VotesProps {
  votesCount?: [CategoryCode, number][];
}

const Votes = ({ votesCount }: VotesProps) => {
  return (
    <Container>
      {votesCount?.map(([code, count]) => (
        <CategoryTag key={code} categoryCode={code} totalVotes={count} renderName={true} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

export default Votes;
