import React from 'react';
import { List, ListItem } from '@mui/material';
import ListNumber from './ListNumber';

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
        <ListItem key={index} className='list-item'>
          <div className='step-container'>
            <ListNumber number={index + 1} />
            <p>{instruction.step}</p>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default Instructions;
