import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';

import userState from '../../recoil/atoms/userState';

import categoryCodes from '../../constants/categoryCodes';

import VotedCategoryItem from '../sidebanner/VotedCategoryItem';

const PAGEITEMNUM = 4;

const Container = styled.div`
  position: fixed;
  margin: 0;
  padding: 5px;
  top: 140px;
  right: 50px;
  width: 100px;
  height: fit-content;

  border-radius: 10px;
  text-align: center;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  background-color: var(--bg-secondary-color);
  color: var(--font-color);
`;
const Title = styled.h4`
  margin: 8px auto;
  width: 60px;
  font-size: 15px;
  text-align: center;
`;

const CarouselContainer = styled(Carousel)`
  margin: 5px;
`;

const Slide = styled(Carousel.Slide)`
  display: flex;
  height: 100%;
  line-height: 100%;
`;

const SlideContainer = styled.div`
  margin: auto;
`;

const NextPageBtn = styled(RiArrowDownSLine)`
  width: 30px;
  height: 30px;
`;

const PrevPageBtn = styled(RiArrowUpSLine)`
  width: 30px;
  height: 30px;
`;

const SideBanner = () => {
  const { voteStatus } = useRecoilValue(userState);

  const { pathname } = useLocation();
  const { id } = useParams();
  const hasSideBanner = pathname === '/' || pathname === `/store/${id}`;

  const voteStoreId = voteStatus.reduce((acc, { storeId, categoryCode }) => {
    acc[categoryCode] = storeId;
    return acc;
  }, {});

  return (
    <>
      {hasSideBanner && (
        <Container>
          <Title>투표 현황</Title>
          <Divider size="sm" />
          <CarouselContainer
            slideSize="100%"
            height="500"
            align="center"
            orientation="vertical"
            controlsOffset="xl"
            controlSize={30}
            loop
            draggable={false}
            previousControlIcon={<PrevPageBtn />}
            nextControlIcon={<NextPageBtn />}
            styles={{
              control: {
                color: 'var(--font-color)',
                background: 'none',
                border: 'none',
              },
            }}>
            {Array.from({ length: categoryCodes.length / PAGEITEMNUM }, (_, i) => i).map(pageIdx => (
              <Slide key={pageIdx} size="100%">
                <SlideContainer>
                  {Array.from({ length: PAGEITEMNUM }, (_, i) => PAGEITEMNUM * pageIdx + i).map(categoryIdx => (
                    <VotedCategoryItem
                      key={categoryCodes[categoryIdx]}
                      categoryCode={categoryCodes[categoryIdx]}
                      storeId={voteStoreId[categoryCodes[categoryIdx]]}
                    />
                  ))}
                </SlideContainer>
              </Slide>
            ))}
          </CarouselContainer>
        </Container>
      )}
    </>
  );
};
export default SideBanner;
