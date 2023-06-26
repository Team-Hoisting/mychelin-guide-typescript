import styled from 'styled-components';

const Button = styled.button`
  padding: 0.4rem 0.7rem;
  border: 1px solid #d3d3d3;
  color: rgba(34, 34, 34, 0.8);
  border-radius: 10px;
  background: #fff;
  cursor: pointer;

  & + & {
    margin-left: 0.3rem;
  }
`;

export default Button;
