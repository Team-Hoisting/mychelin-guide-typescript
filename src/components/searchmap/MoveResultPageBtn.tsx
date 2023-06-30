import { MouseEvent } from 'react';
import styled from 'styled-components';

interface MoveResultPageBtnProps {
  hasPage: boolean | undefined;
  clickHandler: (e: MouseEvent) => void;
  children: JSX.Element;
}

const MoveResultPageBtn = ({ hasPage, clickHandler, children }: MoveResultPageBtnProps) => (
  <Container onClick={clickHandler} hidden={!hasPage}>
    {children}
  </Container>
);

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

export default MoveResultPageBtn;
