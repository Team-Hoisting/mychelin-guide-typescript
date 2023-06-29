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

interface MychelinStarsProps {
  starsCount: number;
  propsTheme?: string;
}

const MychelinStars = ({ starsCount, propsTheme }: MychelinStarsProps) => {
  const globalTheme = useRecoilValue(themeState);
  const theme = !propsTheme ? globalTheme : propsTheme;

  /**
   * @tsconfig "downlevelIteration: true"
   * 참고: https://stackoverflow.com/questions/74246843/type-iterableiteratornumber-can-only-be-iterated-through-when-using-the-d
   */
  return (
    <Container>
      {[...Array.from({ length: starsCount }).keys()].map(val => (
        <Star key={val} src={`/images/star-${theme}.png`} />
      ))}
    </Container>
  );
};

export default MychelinStars;
