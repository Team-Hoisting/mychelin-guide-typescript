import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, ModalBox } from '../common';

const Container = styled.main`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ButtonContainer = styled.div`
  display: none;
  flex-direction: column;
`;

const RoundedButton = styled(Button)`
  margin: 5px;
  width: 120px;
  height: 45px;
  border-radius: 12px;
  font-size: 16px;
`;

const InfoText = styled.p`
  font-size: 13px;
  color: white;
`;

interface ResultItemOnHoverProps {
  storeId: string;
  isRegistered: boolean;
  storeName: string;
  address: string;
  phoneNumber: string;
  x: number;
  y: number;
}

const ResultItemOnHover = ({
  storeId,
  isRegistered,
  storeName,
  address,
  phoneNumber,
  x,
  y,
}: ResultItemOnHoverProps) => (
  <Container>
    <ButtonContainer>
      {isRegistered ? (
        <Link to={`/store/${storeId}`}>
          <RoundedButton gray={true}>상세보기</RoundedButton>
        </Link>
      ) : (
        <InfoText>등록되지 않은 식당입니다.</InfoText>
      )}
      <ModalBox storeId={storeId} store={{ storeId, storeName, address, phoneNumber, x, y }} width="120px" />
    </ButtonContainer>
  </Container>
);

export default ResultItemOnHover;
