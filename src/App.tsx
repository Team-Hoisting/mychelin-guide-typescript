import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  RootPage,
  MainPage,
  SignupPage,
  SigninPage,
  ErrorPage,
  SearchMapPage,
  StoreDetailPage,
  ProfilePage,
  UserInfoPage,
} from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // default 3
      suspense: true,
    },
    mutations: {
      // useErrorBoundary: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'signin',
        element: <SigninPage />,
      },
      {
        path: 'profile/:nickname',
        element: <ProfilePage />,
      },
      {
        path: 'info',
        element: <UserInfoPage />,
      },
      {
        path: 'searchmap',
        element: <SearchMapPage />,
      },
      {
        path: 'store/:storeId',
        element: <StoreDetailPage />,
        // loader: storeDetailLoader(queryClient),
      },
    ],
  },
]);

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;
