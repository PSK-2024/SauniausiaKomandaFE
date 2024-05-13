import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';

import { categories, cuisines, allergies, goals } from '../data/MockFilters';

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

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1, color: '#509E2F' }}>
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
                sx={{
                  color: checked[cuisine.value] ? 'green' : 'default',
                  '&.Mui-checked': {
                    color: '#509E2F',
                  },
                }}
              />
            }
            label={cuisine.label}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1, color: '#509E2F' }}>
        Allergies
      </Typography>
      <FormGroup>
        {allergies.map(allergie => (
          <FormControlLabel
            key={allergie.value}
            control={
              <Checkbox
                checked={checked[allergie.value] || false}
                onChange={() => handleToggle(allergie.value)}
                sx={{
                  color: checked[allergie.value] ? 'green' : 'default',
                  '&.Mui-checked': {
                    color: '#509E2F',
                  },
                }}
              />
            }
            label={allergie.label}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1, color: '#509E2F' }}>
        Gaoals
      </Typography>
      <FormGroup>
        {goals.map(goal => (
          <FormControlLabel
            key={goal.value}
            control={
              <Checkbox
                checked={checked[goal.value] || false}
                onChange={() => handleToggle(goal.value)}
                sx={{
                  color: checked[goal.value] ? 'green' : 'default',
                  '&.Mui-checked': {
                    color: '#509E2F',
                  },
                }}
              />
            }
            label={goal.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default SidebarComponent;
