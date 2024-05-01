import React from 'react';
import { Box, TextField, Button } from '@mui/material';

interface AddTagProps {
  placeholder: string;
}

const AddTag: React.FC<AddTagProps> = ({ placeholder }) => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        width: 495,
        mt: 5,
        mb: 5,
        '@media (max-width:768px)': {
          mt: 10,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { sm: 2.5 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            '@media (max-width:768px)': {
              ml: 0,
              width: '100%',
            },
          }}
        >
          <TextField
            fullWidth
            placeholder={placeholder || 'Ingredient name'}
            variant='outlined'
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '3rem',
              fontStyle: 'italic',
              color: 'black',
              '@media (max-width:768px)': {
                mt: 10,
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
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '@media (max-width:768px)': {
              ml: 0,
              width: '100%',
            },
          }}
        >
          <Button
            variant='contained'
            sx={{
              height: 70,
              width: 70,
              borderRadius: 92,
              bgcolor: '#509E2F',
              '&:hover': {
                bgcolor: '#509E2F',
              },
              fontSize: '3rem',
              '@media (max-width:768px)': {
                mt: 10,
              },
            }}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTag;
