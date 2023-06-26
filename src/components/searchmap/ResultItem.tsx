import styled from 'styled-components';

const Container = styled.div`
  padding: 10px 0 10px 20px;
  height: 130px;
  border-bottom: 1px solid var(--border-primary);
  color: var(--font-color);
`;

const Number = styled.span`
  color: var(--primary-color);
`;

const StoreName = styled.h5`
  margin: 5px 0;
  font-size: 18px;
`;

const AdditionalInfoWrapper = styled.div`
  margin: 5px 0 10px 25px;
  font-size: 14px;
`;

const AdditionalInfo = styled.span`
  display: block;
  margin: 5px 0;
`;

const ResultItem = ({ storeName, address, phoneNumber, currentIdx }) => (
  <Container>
    <StoreName>
      <Number>{`${currentIdx}. `}</Number>
      {storeName}
    </StoreName>
    <AdditionalInfoWrapper>
      <AdditionalInfo>{address}</AdditionalInfo>
      <AdditionalInfo>{phoneNumber}</AdditionalInfo>
    </AdditionalInfoWrapper>
  </Container>
);

export default ResultItem;
