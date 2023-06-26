import React from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import userState from '../../recoil/atoms/userState';
import { Loader } from '../common';
import Controller from './Controller';

const Container = styled.div`
  background-color: var(--bg-color);
  color: var(--font-color);

  img {
    width: 60px;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0 3rem 0;
`;

const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const SuccessVerifier = ({ setIsOpened, taskQueue, storeId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    try {
      setIsLoading(true);

      taskQueue.forEach(async task => {
        const data = await task();
        setUser({ ...user, voteStatus: data.voteStatus });

        if (data.newStore) {
          queryClient.setQueryData(['storeInfo', storeId], data.newStore);
        }
      });
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Inner>
        <img src="/images/success.png" alt="success" />
        <Text>투표가 성공적으로 완료되었습니다</Text>
      </Inner>
      <Controller
        leftText="마이페이지"
        rightText="닫기"
        onNext={() => navigate(`/profile/${user.nickname}`)}
        onClose={() => setIsOpened(false)}
      />
    </Container>
  );
};

export default SuccessVerifier;
