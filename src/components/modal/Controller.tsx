import React from 'react';
import styled from 'styled-components';
import { Group, Button } from '@mantine/core';

interface ControllerType {
  isDisable?: boolean;
  leftText: string;
  rightText: string;
  onClose: () => void;
  onNext: () => void;
}

const Controller = ({ onNext, onClose, leftText, rightText, isDisable }: ControllerType) => (
  <GroupWithMarginTop position="apart" grow>
    <Button
      size="md"
      styles={theme => ({
        root: {
          backgroundColor: '#d21312',
          '&:not([data-disabled])': theme.fn.hover({
            backgroundColor: theme.fn.darken('#d21312', 0.05),
          }),
        },
      })}
      onClick={onNext}
      disabled={isDisable}>
      {leftText}
    </Button>
    <Button size="md" color="gray" onClick={onClose}>
      {rightText}
    </Button>
  </GroupWithMarginTop>
);

const GroupWithMarginTop = styled(Group)`
  margin-top: 2.5rem;
`;

export default Controller;
