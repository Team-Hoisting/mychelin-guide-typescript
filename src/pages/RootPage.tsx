import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Theme, ToastContainer } from 'react-toastify';
import { Header, Footer, SideBanner, Loader } from '../components/common';
import { userState, themeState } from '../recoil/atoms';
import useCheckSignin from '../hooks/useCheckSignin';

const RootPage = () => {
  const user = useRecoilValue(userState);
  const theme = useRecoilValue(themeState);
  const location = useLocation();
  const isLoading = useCheckSignin();

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  if (isLoading) return <></>;

  return (
    <>
      <Header />
      {user && <SideBanner user={user} />}
      <React.Suspense fallback={<Loader />}>
        <Outlet />
      </React.Suspense>

      <ToastContainer
        className="toastContainer"
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme as Theme}
      />
      <Footer />
    </>
  );
};

export default RootPage;
