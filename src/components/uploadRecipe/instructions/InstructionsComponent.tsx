import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface InstructionsComponentProps {
  onChange: (steps: string[]) => void;
}

const InstructionsComponent: React.FC<InstructionsComponentProps> = ({
  onChange,
}) => {
  const [steps, setSteps] = useState<string[]>(['']);

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleDeleteStep = (index: number) => {
    const newSteps = steps.filter((_, idx) => idx !== index);
    setSteps(newSteps);
    onChange(newSteps);
  };

  const handleChange = (index: number, value: string) => {
    const newSteps = steps.map((step, idx) => (idx === index ? value : step));
    setSteps(newSteps);
    onChange(newSteps);
  };

  return (
    <Box sx={{ mt: 5, mb: 5, maxWidth: '100%', width: 495 }}>
      {steps.map((step, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography
            sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}
          >{`Step ${index + 1}`}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              placeholder='Describe the step...'
              variant='outlined'
              value={step}
              onChange={e => handleChange(index, e.target.value)}
            />
            <Box
              component='img'
              onClick={() => handleDeleteStep(index)}
              sx={{
                width: 24,
                height: 24,
                cursor: 'pointer',
                marginLeft: 2,
              }}
              loading='lazy'
              src='/x.png'
            />
          </Box>
        </Box>
      ))}
      <Button
        onClick={handleAddStep}
        variant='contained'
        sx={{
          mt: 2,
          bgcolor: '#509E2F',
          '&:hover': { bgcolor: '#607D3B' },
          p: 2,
          typography: 'h6',
          width: '250px',
        }}
      >
        Add Step
      </Button>
    </Box>
  );
};

export default InstructionsComponent;
