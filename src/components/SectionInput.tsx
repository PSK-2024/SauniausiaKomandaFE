import React from 'react';
import { TextField } from '@mui/material';

interface SectionInputProps {
  placeholder: string;
  minRows: number;
}

const SectionInput: React.FC<SectionInputProps> = ({
  placeholder,
  minRows = 1,
}) => {
  return (
    <div>
      <TextField
        fullWidth
        variant='outlined'
        placeholder={placeholder}
        multiline
        minRows={minRows}
        sx={{
          mt: 2,
          fontSize: '3xl',
          fontStyle: 'italic',
          borderColor: 'grey.400',
          '@media (max-width:768px)': {
            pr: 5,
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
    </div>
  );
};

export default SectionInput;
