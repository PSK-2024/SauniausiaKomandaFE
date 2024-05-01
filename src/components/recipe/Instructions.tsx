import React from 'react';
import { List, ListItem, Typography } from '@mui/material';

interface Instruction {
  step: string;
}

interface InstructionsProps {
  steps: Instruction[];
}

const Instructions: React.FC<InstructionsProps> = ({ steps }) => {
  return (
    <List>
      {steps.map((instruction, index) => (
        <ListItem key={index}>
          <Typography variant='body1'>{instruction.step}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default Instructions;
