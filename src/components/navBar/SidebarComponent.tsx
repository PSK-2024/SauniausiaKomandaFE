import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  fetchCategories,
  fetchRecipesByCategory,
} from '../../state/thunk/recipeThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';

function SidebarComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector(
    (state: RootState) => state.categories
  );
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToggle = (category: string) => {
    setChecked(prev => {
      const newState = { ...prev, [category]: !prev[category] };
      dispatch(fetchRecipesByCategory({ category }));
      return newState;
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        Filters
      </Typography>

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1, color: '#509E2F' }}>
        Categories
      </Typography>

      {status === 'loading' && <Typography>Loading categories...</Typography>}
      {status === 'failed' && <Typography>Error: {error}</Typography>}

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
