import React from 'react';
import { TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface SectionInputProps {
  placeholder: string;
  minRows: number;
  value: string;
  onChange: (value: string) => void;
}

const SectionInput: React.FC<SectionInputProps> = ({
  placeholder,
  minRows = 1,
  value,
  onChange,
}) => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <div>
      <TextField
        fullWidth
        value={value}
        onChange={event => onChange(event.target.value)}
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
