import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface IngredientsComponentProps {
  placeholder: string;
  onChange: (data: { header: string; steps: string[] }[]) => void;
}

interface Step {
  id: string;
  headerIndex: number;
  text: string;
}

const IngredientsComponent: React.FC<IngredientsComponentProps> = ({
  placeholder,
  onChange,
}) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    const ingredientsData = headers.map(header => ({
      header,
      steps: steps
        .filter(step => step.headerIndex === headers.indexOf(header))
        .map(step => step.text),
    }));
    onChange(ingredientsData);
  }, [headers, steps, onChange]);

  function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  const handleAddHeader = () => {
    setHeaders([...headers, '']);
    setSteps([
      ...steps,
      { id: generateId(), headerIndex: headers.length, text: '' },
    ]);
  };

  const handleAddStep = (headerIndex: number) => {
    setSteps([...steps, { id: generateId(), headerIndex, text: '' }]);
  };

  const handleDeleteHeader = (index: number) => {
    setHeaders(prevHeaders => prevHeaders.filter((_, idx) => idx !== index));
    setSteps(prevSteps =>
      prevSteps
        .filter(step => step.headerIndex !== index)
        .map(step => ({
          ...step,
          headerIndex:
            step.headerIndex > index ? step.headerIndex - 1 : step.headerIndex,
        }))
    );
  };

  const handleDeleteStep = (id: string) => {
    const newSteps = steps.filter(step => step.id !== id);
    setSteps(newSteps);
    setSteps(prevSteps => {
      const stillExistingSteps = prevSteps.filter(step => step.id !== id);
      headers.forEach((_, index) => {
        if (!stillExistingSteps.some(step => step.headerIndex === index)) {
          handleDeleteHeader(index);
        }
      });

      return stillExistingSteps;
    });
  };

  const handleHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newHeaders = [...headers];
    newHeaders[index] = event.target.value;
    setHeaders(newHeaders);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const updatedSteps = steps.map(step =>
      step.id === id ? { ...step, text: event.target.value } : step
    );
    setSteps(updatedSteps);
  };

  return (
    <>
      <Box sx={{ mb: 2, fontSize: '1rem', color: '#000' }}>
        Type one ingredient per line. Include the quantity (i.e., cups,
        tablespoons) and any special preparation (i.e., sifted, softened,
        chopped). Use headers to organize
        <br />
        the different parts of the recipe (i.e. Cake, Frosting, Dressing).
        <br />
        <br />
        Enter ingredients below
      </Box>
      <Box sx={{ maxWidth: '100%', width: 495, mt: 5, mb: 5 }}>
        {headers.map((header, headerIndex) => (
          <Box key={headerIndex} sx={{ mt: headerIndex !== 0 ? 8 : 0 }}>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}
              >{`Part ${headerIndex + 1}`}</Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  placeholder='Add a header, e.g., Sauce'
                  variant='outlined'
                  value={header}
                  onChange={e => handleHeaderChange(e, headerIndex)}
                  sx={{
                    '& .MuiInputBase-input::placeholder': {
                      fontWeight: 'bold',
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: '1.25rem',
                      fontStyle: 'italic',
                      color: '#000',
                    },
                  }}
                />
                <Box
                  component='img'
                  onClick={() => handleDeleteHeader(headerIndex)}
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
            {steps
              .filter(step => step.headerIndex === headerIndex)
              .map((step, stepIndex) => (
                <Box
                  key={step.id}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <TextField
                    fullWidth
                    placeholder={
                      stepIndex === 0 ? placeholder : 'Add another ingredient'
                    }
                    variant='outlined'
                    value={step.text}
                    onChange={e => handleInputChange(e, step.id)}
                    sx={{ mt: stepIndex === 0 ? 0 : 2, fontStyle: 'italic' }}
                    InputProps={{
                      style: {
                        fontSize: '1rem',
                        fontStyle: 'italic',
                        color: '#000',
                      },
                    }}
                  />
                  <Box
                    component='img'
                    onClick={() => handleDeleteStep(step.id)}
                    sx={{
                      width: 24,
                      height: 24,
                      cursor: 'pointer',
                      mt: 1,
                    }}
                    loading='lazy'
                    src='/x.png'
                  />
                </Box>
              ))}
          </Box>
        ))}
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            onClick={handleAddHeader}
            variant='contained'
            sx={{
              mt: 2,
              bgcolor: '#509E2F',
              '&:hover': { bgcolor: '#607D3B' },
              p: 2,
              typography: 'h6',
              width: '200px',
            }}
          >
            Add Header
          </Button>
          <Button
            onClick={() =>
              handleAddStep(
                steps.length ? steps[steps.length - 1].headerIndex : 0
              )
            }
            variant='contained'
            sx={{
              mt: 2,
              bgcolor: '#509E2F',
              '&:hover': { bgcolor: '#607D3B' },
              p: 2,
              typography: 'h6',
              width: '200px',
            }}
          >
            Add Step
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default IngredientsComponent;
