import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';

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

  const categories = [
    { label: 'Veggies', value: 'veggies' },
    { label: 'Dairy', value: 'dairy' },
  ];
  const cuisines = [
    { label: 'Indian', value: 'indian' },
    { label: 'Italian', value: 'italian' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 2, flexBasis: '15%' }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Filters
      </Typography>

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
        Diet
      </Typography>
      <FormGroup>
        {categories.map(category => (
          <FormControlLabel
            key={category.value}
            control={
              <Checkbox
                checked={checked[category.value] || false}
                onChange={() => handleToggle(category.value)}
              />
            }
            label={category.label}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
        Cuisines
      </Typography>
      <FormGroup>
        {cuisines.map(cuisine => (
          <FormControlLabel
            key={cuisine.value}
            control={
              <Checkbox
                checked={checked[cuisine.value] || false}
                onChange={() => handleToggle(cuisine.value)}
              />
            }
            label={cuisine.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default SidebarComponent;
