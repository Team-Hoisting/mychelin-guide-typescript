import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../recoil/atoms';
import { categoryInfo, categoryCodes } from '../../constants';
import { CategoryBox } from '../common';

const Container = styled.div`
  height: 80px;
  margin: 20px 0 20px 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  position: relative;
  align-items: center;
`;

const fullCategoryCodes = ['AL00', ...categoryCodes];

const Categories = () => {
  const [category, setCategory] = useRecoilState(categoryState);

  return (
    <Container>
      {fullCategoryCodes.map(code => (
        <CategoryBox
          categoryName={categoryInfo[code].ko}
          categoryImgFile={categoryInfo[code].imgFile}
          colored
          key={categoryInfo[code].ko}
          clickHandler={() => setCategory(code)}
          selected={category === code}
          iconWidth="35%"
        />
      ))}
    </Container>
  );
};

export default Categories;
