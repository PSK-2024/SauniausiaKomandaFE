import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { fetchCategories } from '../../state/thunk/recipeThunk';
import { fetchRecipesByCategory } from '../../state/thunk/recipeThunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';

interface CheckedState {
  [key: string]: boolean;
}

function SidebarComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector(
    (state: RootState) => state.categories
  );
  const [checked, setChecked] = useState<CheckedState>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToggle = (value: string) => {
    const newChecked = {
      ...checked,
      [value]: !checked[value],
    };
    setChecked(newChecked);

    if (newChecked[value]) {
      dispatch(fetchRecipesByCategory(value));
    } else {
      dispatch(fetchRecipesByCategory('')); // Fetch all recipes or handle accordingly
    }
  };

  if (status === 'loading') {
    return <Typography>Loading categories...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

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
            key={category}
            control={
              <Checkbox
                checked={checked[category] || false}
                onChange={() => handleToggle(category)}
                sx={{
                  color: checked[category] ? 'green' : 'default',
                  '&.Mui-checked': {
                    color: '#509E2F',
                  },
                }}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default SidebarComponent;
