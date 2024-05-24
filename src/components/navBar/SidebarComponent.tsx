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
import { RecipeCard } from '../../state/model/recipeCardModel';
import { Category } from '../../state/model/categoryModel';

interface SidebarComponentProps {
  setFilteredRecipes: (recipes: RecipeCard[]) => void;
}

function SidebarComponent({ setFilteredRecipes }: SidebarComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector(
    (state: RootState) => state.categories
  );
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToggle = async (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    event.preventDefault();
    setChecked(prev => {
      const newState = { ...prev, [category]: !prev[category] };
      if (newState[category]) {
        dispatch(fetchRecipesByCategory({ category })).then(action => {
          if (fetchRecipesByCategory.fulfilled.match(action)) {
            const response = action.payload;
            setFilteredRecipes(response);
          } else if (fetchRecipesByCategory.rejected.match(action)) {
            // Handle rejection if needed
          }
        });
      } else {
        setFilteredRecipes([]);
      }
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
        {categories.map((category: Category) => (
          <FormControlLabel
            key={category.name}
            control={
              <Checkbox
                checked={checked[category.name] || false}
                onChange={event => handleToggle(event, category.name)}
                sx={{
                  color: 'default',
                  '&.Mui-checked': {
                    color: '#509E2F',
                  },
                  '& .MuiSvgIcon-root': {
                    fill: checked[category.name] ? '#509E2F' : 'default',
                  },
                }}
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default SidebarComponent;
