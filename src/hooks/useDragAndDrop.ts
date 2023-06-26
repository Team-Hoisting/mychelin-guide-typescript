import React from 'react';

const useDragAndDrop = (initialOrder = []) => {
  const [order, setOrder] = React.useState(initialOrder);
  const dragTargetIdx = React.useRef(null);

  const dragStartHandler = idx => {
    dragTargetIdx.current = idx;
  };

  const swap = idx => {
    if (dragTargetIdx.current === idx) return;

    const newOrder = [...order];
    [newOrder[dragTargetIdx.current], newOrder[idx]] = [newOrder[idx], newOrder[dragTargetIdx.current]];

    setOrder(newOrder);
  };

  return { order, dragStartHandler, swap };
};

export default useDragAndDrop;
