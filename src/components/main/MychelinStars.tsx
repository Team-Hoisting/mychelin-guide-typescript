import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/atoms';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.img`
  width: 28px;
  margin: 1.2px;
`;

const MychelinStars = ({ starCount, propsTheme }) => {
  const globalTheme = useRecoilValue(themeState);
  const theme = !propsTheme ? globalTheme : propsTheme;

  return (
    <Container>
      {[...Array(starCount).keys()].map(val => (
        <Star key={val} src={`/images/star-${theme}.png`} />
      ))}
    </Container>
  );
};

export default MychelinStars;
