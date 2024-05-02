import React from 'react';
import { TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface SectionInputProps {
  placeholder: string;
  minRows: number;
}

const SectionInput: React.FC<SectionInputProps> = ({
  placeholder,
  minRows = 1,
}) => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <div>
      <TextField
        fullWidth
        variant='outlined'
        placeholder={placeholder}
        multiline={!isMobile}
        minRows={!isMobile ? minRows : 1}
        sx={{
          mt: 2,
          fontSize: '3xl',
          fontStyle: 'italic',
          borderColor: 'grey.400',
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
