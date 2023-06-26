import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  margin: 0;
  padding: 5px;
  top: 200px;
  right: 50px;
  width: 100px;
  height: fit-content;
  border: 1px solid #d21312;
  border-radius: 10px;
  text-align: center;
  background-color: white;
  z-index: 999;
`;

const LogoImg = styled.img`
  margin: 10px auto;
  width: 80px;
`;

const Description = styled.p`
  margin: 3px auto;
  font-size: 15px;
`;

const LogInBanner = () => (
  <Container>
    <Link to="/signin">
      <LogoImg src="/images/star-light.png" alt="STAR IMG" />
    </Link>
    <Description>로그인 후</Description>
    <Description>당신의 맛집에</Description>
    <Description>투표해보세요!</Description>
  </Container>
);

export default LogInBanner;
