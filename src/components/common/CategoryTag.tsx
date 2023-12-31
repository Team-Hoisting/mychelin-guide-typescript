import styled from 'styled-components';
import { CategoryCode } from 'types';
import { categoryInfo } from '../../constants';

interface CategoryTagProps {
  categoryCode: string;
  totalVotes: number;
  renderName: boolean | undefined;
}

const CategoryTag = ({ categoryCode, totalVotes, renderName = true }: CategoryTagProps) => {
  const imgSrc = `/categoryIcons/${categoryInfo[categoryCode as CategoryCode].imgFile}.png`;

  return (
    <Container>
      <CategoryIcon src={imgSrc} alt="" />
      {renderName && <CatagoryName>{categoryInfo[categoryCode as CategoryCode].ko}</CatagoryName>}
      <TotalVotes>{totalVotes}</TotalVotes>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 10px;
  min-width: 70px;
  border-radius: 20px;
  opacity: 0.8;
  background-color: var(--border-secondary);
  color: var(--font-color);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  scale: 0.8;
`;

const CategoryIcon = styled.img`
  margin: auto 2px;
  width: 20x;
  height: 20px;
`;

const CatagoryName = styled.span`
  margin: 3px;
  font-size: 18px;
  font-weight: 700;
`;

const TotalVotes = styled.span`
  margin: 3px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
`;

export default CategoryTag;
