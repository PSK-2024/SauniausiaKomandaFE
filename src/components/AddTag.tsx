import React, { useState } from 'react';
import { Box, Button, TextField, Grid } from '@mui/material';

interface AddTagProps {
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  prefix?: string;
}

const AddTag: React.FC<AddTagProps> = ({
  placeholder,
  tags,
  setTags,
  prefix,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== '') {
      const newTag = prefix ? `${prefix}${inputValue}` : inputValue;
      setTags([...tags, newTag]);
      setInputValue('');
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          width: 495,
          mt: 5,
          mb: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { sm: 2.5 },
          }}
        >
          <TextField
            fullWidth
            placeholder={placeholder || 'Ingredient name'}
            variant='outlined'
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '3rem',
              fontStyle: 'italic',
              color: 'black',
              '@media (max-width:768px)': {
                mt: 10,
              },
              InputProps: {
                style: {
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: '#000',
                },
              },
            }}
          />
          <Button
            onClick={handleAddTag}
            variant='contained'
            sx={{
              height: 62,
              width: 62,
              borderRadius: '50%',
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
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2} sx={{ mt: 2, gap: 2 }}>
          {tags.map((tag, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Box
                key={index}
                sx={{
                  p: 1,
                  bgcolor: '#FFF',
                  color: 'black',
                  border: 1,
                  borderColor: 'grey.400',
                  borderRadius: '4px',
                  fontSize: '1.5rem',
                }}
              >
                {tag}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AddTag;
