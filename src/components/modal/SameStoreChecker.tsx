import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import userState from '../../recoil/atoms/userState';
import { fetchStore } from '../../api/stores';
import { removeVote } from '../../api/votes';
import categoryInfo from '../../constants/categoryInfo';
import Controller from './Controller';

const Container = styled.div`
  background-color: var(--bg-color);
  color: var(--font-color);
`;

const Inner = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  color: red;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Text = styled.span`
  font-size: 1.1rem;

  & + & {
    margin-top: 0.5rem;
  }

  .em {
    font-weight: 700;
  }
`;

const Changes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50px;
`;

const ArrowIcon = styled(MdOutlineKeyboardDoubleArrowDown)`
  font-size: 1.5rem;
  transform: rotate(-90deg);
  margin-left: 4rem;
  margin-right: 4rem;
`;

const SameStoreChecker = ({ storeId, categoryCode, setIsOpened, setTaskQueue, setPhase }) => {
  const { nickname, voteStatus } = useRecoilValue(userState);
  const { categoryCode: prevCategoryCode } = voteStatus.find(vote => vote.storeId === storeId);

  const { data: store } = useQuery({
    queryKey: ['storeInfo', storeId],
    queryFn: fetchStore(storeId),
  });

  const onNext = () => {
    setTaskQueue(taskQueue => [...taskQueue, () => removeVote(nickname, prevCategoryCode)]);

    setPhase('success');
  };

  return (
    <Container>
      <Inner>
        <Title>매장 중복</Title>
        <Text>
          하나의 매장에는 <span className="em">하나의 투표만</span> 부여할 수 있습니다.
        </Text>
        <Text>
          <span className="em">&quot;{store.storeName}&quot;</span> 의 투표 카테고리를 변경합니다.
        </Text>
      </Inner>
      <Changes>
        <Box>
          <Image src={`/categoryIcons/${categoryInfo[prevCategoryCode].imgFile}.png`} alt="logo" />
          {categoryInfo[prevCategoryCode].ko}
        </Box>
        <ArrowIcon />
        <Box>
          <Image src={`/categoryIcons/${categoryInfo[categoryCode].imgFile}.png`} alt="logo" />
          {categoryInfo[categoryCode].ko}
        </Box>
      </Changes>
      <Controller
        leftText="확인"
        rightText="취소"
        onNext={onNext}
        onClose={() => {
          setTaskQueue([]);
          setIsOpened(false);
        }}
      />
    </Container>
  );
};

export default SameStoreChecker;
