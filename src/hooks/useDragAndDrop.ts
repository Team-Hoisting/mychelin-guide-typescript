import { VoteStore } from 'components/profile/types';
import React from 'react';

const useDragAndDrop = (initialOrder: Array<VoteStore> = []) => {
  const [order, setOrder] = React.useState<Array<VoteStore>>(initialOrder);
  const dragTargetIdx = React.useRef<number | null>(null);

  const dragStartHandler = (idx: number) => {
    dragTargetIdx.current = idx;
  };

  const swap = (idx: number) => {
    if (dragTargetIdx.current === idx || dragTargetIdx.current === null) return;

    const newOrder = [...order];
    [newOrder[dragTargetIdx.current], newOrder[idx]] = [newOrder[idx], newOrder[dragTargetIdx.current]];

    setOrder(newOrder);
  };

  return { order, dragStartHandler, swap };
};

export default useDragAndDrop;
