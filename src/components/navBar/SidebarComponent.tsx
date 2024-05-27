import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchCategories } from '../../state/thunk/fetchCategoriesThunk';
import { useAppDispatch } from '../../app/hooks';

interface SidebarComponentProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

interface CheckedState {
  [key: string]: boolean;
}

function SidebarComponent({
  selectedCategories,
  onCategoryChange,
}: SidebarComponentProps) {
  const dispatch = useAppDispatch();
  const { categories, status } = useSelector(
    (state: RootState) => state.categories
  );
  const [checked, setChecked] = useState<CheckedState>({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const initialChecked: CheckedState = {};
    selectedCategories.forEach(category => {
      initialChecked[category] = true;
    });
    setChecked(initialChecked);
  }, [selectedCategories]);

  const handleToggle = (value: string) => {
    const newChecked = {
      ...checked,
      [value]: !checked[value],
    };
    setChecked(newChecked);

    const selected = Object.keys(newChecked).filter(key => newChecked[key]);
    onCategoryChange(selected);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        Filters
      </Typography>

      <Typography variant='subtitle2' sx={{ mt: 2, mb: 1, color: '#509E2F' }}>
        Categories
      </Typography>
      {status === 'loading' ? (
        <Typography>Loading...</Typography>
      ) : (
        <FormGroup>
          {categories.map(category => (
            <FormControlLabel
              key={category.name}
              control={
                <Checkbox
                  checked={checked[category.name] || false}
                  onChange={() => handleToggle(category.name)}
                  sx={{
                    color: checked[category.name] ? 'green' : 'default',
                    '&.Mui-checked': {
                      color: '#509E2F',
                    },
                  }}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      )}

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default SidebarComponent;
