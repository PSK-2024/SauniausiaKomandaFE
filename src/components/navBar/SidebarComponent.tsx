import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { categories } from '../../data/MockFilters';

interface CheckedState {
  [key: string]: boolean;
}

function SidebarComponent() {
  const [checked, setChecked] = useState<CheckedState>({});

  const handleToggle = (value: string) => {
    const newChecked = {
      ...checked,
      [value]: !checked[value],
    };
    setChecked(newChecked);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        Filters
      </Typography>

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1, color: '#509E2F' }}>
        Categories
      </Typography>
      <FormGroup>
        {categories.map(category => (
          <FormControlLabel
            key={category.value}
            control={
              <Checkbox
                checked={checked[category.value] || false}
                onChange={() => handleToggle(category.value)}
                sx={{
                  color: checked[category.value] ? 'green' : 'default',
                  '&.Mui-checked': {
                    color: '#509E2F',
                  },
                }}
              />
            }
            label={category.label}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default SidebarComponent;
