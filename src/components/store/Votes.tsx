import React from 'react';
import styled from 'styled-components';
import { CategoryTag } from '../common/index';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const Votes = ({ voteCnt }) => (
  <Container>
    {voteCnt.map((ctg, idx) => (
      <CategoryTag key={idx} categoryCode={Object.keys(ctg)[0]} votedCnt={Object.values(ctg)[0]} renderName={true} />
    ))}
  </Container>
);

export default Votes;
