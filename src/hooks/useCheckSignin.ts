// 웹 애플리케이션 초기 랜더링시 쿠키 존재 여부를 확인하여 로그인 상태를 확인한다.

import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/atoms';
import { check } from '../api/auth';

const useCheckSignin = () => {
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const user = await check();
        setUser(user);
      } catch (e) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading;
};

export default useCheckSignin;
