import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import userState from '../../recoil/atoms/userState';
import categoryInfo from '../../constants/categoryInfo';
import categoryCodes from '../../constants/categoryCodes';
import { fetchStore } from '../../api/stores';
import { vote } from '../../api/votes';
import { CategoryBox } from '../common/index';
import Controller from './Controller';

const Container = styled.div`
  padding: 0rem 0.5rem;
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--font-color);
`;

const StoreInfo = styled.div`
  margin-bottom: 3.5rem;
`;

const StoreName = styled.h2`
  margin-bottom: 0.4rem;
`;

const Selector = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  font-size: 10px;
  height: 170px;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  color: red;
  font-weight: 700;
`;

const TextBox = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
    margin-bottom: 0.7rem;
    font-size: 1rem;
  }

  .em {
    font-weight: 700;
  }
`;

const Selected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 3rem;

  img {
    width: 10%;
  }
`;

const CategorySelector = ({
  setIsOpened,
  setPhase,
  setTaskQueue,
  storeId,
  store: storeInfo,
  categoryCode,
  setCategoryCode,
}) => {
  const { email, voteStatus } = useRecoilValue(userState);

  const { data: store } = useQuery({
    queryKey: ['storeInfo', storeId],
    queryFn: fetchStore(storeId),
  });

  const onNext = () => {
    const sameCategoryCount = voteStatus.filter(vote => vote.categoryCode === categoryCode).length;
    const sameStoreCount = voteStatus.filter(vote => vote.storeId === storeId).length;

    if (sameCategoryCount !== 0) setPhase('category');
    else {
      setTaskQueue(taskQueue => [
        ...taskQueue,
        () => vote({ storeId, email, categoryCode, votedAt: new Date().valueOf(), storeInfo }),
      ]);

      setPhase(sameStoreCount !== 0 ? 'store' : 'success');
    }
  };

  const isDuplicate = storeId === voteStatus.find(vote => vote.categoryCode === categoryCode)?.storeId;

  return (
    <Container>
      <StoreInfo>
        <StoreName>{store.storeName ?? storeInfo.storeName}</StoreName>
        <span className="address">{store.address ?? storeInfo.address}</span>
      </StoreInfo>
      <Selected>
        {categoryCode !== 'none' ? (
          <CategoryBox
            categoryName={categoryInfo[categoryCode].ko}
            categoryImgFile={categoryInfo[categoryCode].imgFile}
            changeOnHover={false}
            underlineOnHover={false}
            colored
          />
        ) : (
          <div>카테고리를 선택하세요!</div>
        )}
      </Selected>
      <Selector>
        {categoryCodes.map(code => {
          if (code === 'AL00') return null;

          return (
            <CategoryBox
              categoryName={categoryInfo[code].ko}
              categoryImgFile={categoryInfo[code].imgFile}
              colored={categoryCode === code}
              key={categoryInfo[code].ko}
              clickHandler={() => setCategoryCode(code)}
              underlineOnHover={false}
            />
          );
        })}
      </Selector>
      <ErrorMessage>{isDuplicate && '중복'}</ErrorMessage>
      <TextBox>
        <p>카테고리당 1곳만 투표할 수 있습니다.</p>
        <p>
          정말 <span className="em">투표</span>하시겠습니까?
        </p>
      </TextBox>
      <Controller
        isDisable={categoryCode === 'none' || isDuplicate}
        leftText="투표하기"
        rightText="취소하기"
        onNext={onNext}
        onClose={() => setIsOpened(false)}
      />
    </Container>
  );
};

export default CategorySelector;
