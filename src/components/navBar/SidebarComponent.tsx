import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchRecipesByCategory,
} from '../../state/thunk/recipeThunk';
import { AppDispatch, RootState } from '../../app/store';
import { RecipeCard } from '../../state/model/recipeCardModel';
import { Category } from '../../state/model/categoryModel';

interface SidebarComponentProps {
  setFilteredRecipes: (recipes: RecipeCard[]) => void;
}

interface CheckedState {
  [key: string]: boolean;
}

function SidebarComponent({ setFilteredRecipes }: SidebarComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector(
    (state: RootState) => state.categories
  );
  const [checked, setChecked] = useState<CheckedState>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const initialCheckedState: CheckedState = categories.reduce(
      (acc: CheckedState, category: Category) => {
        acc[category.name] = false;
        return acc;
      },
      {}
    );
    setChecked(initialCheckedState);
  }, [categories]);

  const dispatchUpdateRecipes = (
    newCheckedState: CheckedState,
    category: string
  ) => {
    if (newCheckedState[category]) {
      dispatch(fetchRecipesByCategory({ category })).then(action => {
        if (fetchRecipesByCategory.fulfilled.match(action)) {
          setFilteredRecipes(action.payload);
        }
      });
    } else {
      setFilteredRecipes([]);
    }
  };

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    event.preventDefault();
    setChecked(prev => {
      const newState: CheckedState = { ...prev, [category]: !prev[category] };
      dispatchUpdateRecipes(newState, category);
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
                checked={checked[category.name]}
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
