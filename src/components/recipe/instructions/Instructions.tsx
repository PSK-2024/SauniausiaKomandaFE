import React from 'react';
import { List, ListItem } from '@mui/material';
import StepNumber from '../step/StepNumber';
import './Instructions.css';

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
          <div className='step-container'>
            <StepNumber number={index + 1} />
            <p>{instruction.step}</p>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default Instructions;
