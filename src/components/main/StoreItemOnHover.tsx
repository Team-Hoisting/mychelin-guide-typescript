import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, ModalBox } from '../common';

const Container = styled.main`
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HoverItemIcon = styled.img.attrs({
  src: '/images/fork-spoon.png',
})`
  width: 60px;
  display: none;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  width: 250px;
  display: none;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const RoundedButton = styled(Button)`
  width: 200px;
  height: 44px;
  margin: 6px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
`;

const StoreItemOnHover = ({ storeId }) => (
  <Container>
    <HoverItemIcon />
    <ButtonContainer>
      <Link to={`/store/${storeId}`}>
        <RoundedButton gray>상세보기</RoundedButton>
      </Link>
      <ModalBox storeId={storeId} />
    </ButtonContainer>
  </Container>
);

export default StoreItemOnHover;
