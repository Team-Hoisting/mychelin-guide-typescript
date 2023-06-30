import styled from 'styled-components';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../../recoil/atoms';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { StoresDataType } from 'types';

const ScrollObserver = ({
  fetchNextPage,
}: {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<StoresDataType, unknown>>;
}) => {
  const category = useRecoilValue(categoryState);
  const observerRef = React.useRef(null);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) fetchNextPage();
      });
    },
    { threshold: 0.1 }
  );

  React.useEffect(() => {
    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [category]);

  return (
    <Container ref={observerRef}>
      <img src="/images/scroll-observer.svg" alt="Loading..." />
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin: 10px;
  opacity: 0;
`;

export default ScrollObserver;
