import React from 'react';
import { Group, Button } from '@mantine/core';

const ToggleButton = ({ onClick, width }) => (
  <Group position="center">
    <Button
      onClick={onClick}
      styles={theme => ({
        root: {
          width: width || '200px',
          height: '44px',
          margin: '6px',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          backgroundColor: '#d21312',
          color: '#fff',
          '&:not([data-disabled])': theme.fn.hover({
            backgroundColor: theme.fn.darken('#d21312', 0.05),
          }),
        },
      })}>
      투표하기
    </Button>
  </Group>
);

export default ToggleButton;
