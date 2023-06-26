import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  font-size: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  cursor: pointer;

  ${({ hidden }) => hidden && 'visibility: hidden;'}

  :hover {
    color: #c5c5c5;
  }
`;

const MoveResultPageBtn = ({ hasPage, clickHandler, children }) => (
  <Container onClick={clickHandler} hidden={!hasPage}>
    {children}
  </Container>
);

export default MoveResultPageBtn;
