import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useArchivesMutation } from '../hooks/index';
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
  const { storeId } = useParams();

  const { addArchive, deleteArchive } = useArchivesMutation(storeId!);

  return (
    <SkinnyContainer>
      <Container>
        <Center>
          <StoreDetail addArchive={addArchive} deleteArchive={deleteArchive} />
          <CommentsList />
        </Center>
      </Container>
    </SkinnyContainer>
  );
};

export default StoreDetailPage;
