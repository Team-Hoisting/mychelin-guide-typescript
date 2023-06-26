import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useArchivesMutation } from '../hooks/index.js';
import { CommentsList, StoreDetail } from '../components/store/index';
import { SkinnyContainer } from '../components/common';

const Container = styled.div`
  width: 100%;
  padding: 12px 0;
  font-size: 20px;
`;

const Center = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const StoreDetailPage = () => {
  const [archivedCntState, setArchiveCntState] = React.useState(0);
  const { storeId } = useParams();

  const { addBookMark, deleteBookMark } = useArchivesMutation({
    storeId,
    setArchiveCntState,
  });

  return (
    <SkinnyContainer>
      <Container>
        <Center>
          <StoreDetail
            addBookMark={addBookMark}
            deleteBookMark={deleteBookMark}
            archivedCntState={archivedCntState}
            setArchiveCntState={setArchiveCntState}
          />
          <CommentsList />
        </Center>
      </Container>
    </SkinnyContainer>
  );
};

export default StoreDetailPage;
