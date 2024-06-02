import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { uploadRecipe } from '../../state/thunk/uploadRecipeThunk';
import { fetchCategories } from '../../state/thunk/fetchCategoriesThunk';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CategoryButton from './categoryButton/CategoryButton';
import SectionInput from './sectionInput/SectionInput';
import InstructionsComponent from './instructions/InstructionsComponent';
import IngredientsComponent from './ingredients/IngredientsComponent';
import SectionTitle from './sectionTitle/SectionTitle';
import Snackbar from '@mui/material/Snackbar';
import { CircularProgress } from '@mui/material';

const UploadRecipeComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const uploadStatus = useSelector(
    (state: RootState) => state.uploadRecipe.status
  );
  const uploadError = useSelector(
    (state: RootState) => state.uploadRecipe.error
  );
  const categoriesStatus = useSelector(
    (state: RootState) => state.categories.status
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState('');

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [time, setTime] = useState('');
  const [calories, setCalories] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [ingredients, setIngredients] = useState<
    { header: string; steps: string[] }[]
  >([]);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(cat => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleIngredientsChange = (
    data: { header: string; steps: string[] }[]
  ) => {
    setIngredients(data);
  };

  const postRecipe = () => {
    const errors = [];
    if (selectedCategories.length === 0)
      errors.push('At least one category must be selected.');
    if (!recipeName) errors.push('Recipe name must be provided.');
    if (!imageBase64) errors.push('Image must be uploaded.');
    if (ingredients.length === 0) {
      errors.push('At least one ingredient must be provided.');
    } else {
      for (const ingredient of ingredients) {
        if (!ingredient.header.trim()) {
          errors.push('Ingredient headers must not be empty.');
          break;
        }
        if (
          ingredient.steps.length === 0 ||
          ingredient.steps.some(step => !step.trim())
        ) {
          errors.push(
            'Each ingredient header must have at least one non-empty step.'
          );
          break;
        }
      }
    }
    if (instructions.some(step => !step.trim()))
      errors.push('Instruction steps must be filled out.');
    if (!time) errors.push('Time must be specified.');
    if (isNaN(Number(time))) errors.push('Time must be a number in minutes.');
    if (!calories) errors.push('Calories must be specified.');
    if (isNaN(Number(calories))) errors.push('Calories must be a number.');

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    const recipeData = {
      categories: selectedCategories,
      recipeName,
      instructions,
      time: Number(time),
      calories: Number(calories),
      ingredients,
      imageBase64,
    };

    dispatch(uploadRecipe(recipeData));
  };

  useEffect(() => {
    if (uploadStatus === 'succeeded') {
      const timeoutId = setTimeout(() => {
        window.location.href = '/';
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [uploadStatus]);

  const getCategoryRows = () => {
    const rows: string[][] = [];
    for (let i = 0; i < categories.length; i += 3) {
      rows.push(categories.slice(i, i + 3).map(category => category.name));
    }
    return rows;
  };

  const categoryRows = getCategoryRows();

  const handleToggleCategories = () => {
    setShowAllCategories(!showAllCategories);
    setIsFlipped(!isFlipped);
  };

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleUploadPhotoOrVideoClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleUploadPhotoOrVideoChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <Box
      sx={{
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        width: '100%',
        color: 'text.secondary',
        '@media (max-width:768px)': {
          maxWidth: '100%',
        },
      }}
    >
      <Snackbar
        open={!!error || !!uploadError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error || uploadError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          typography: 'h5',
          cursor: 'pointer',
        }}
        onClick={() => (window.location.href = '/')}
      >
        <Box
          component='img'
          sx={{
            display: 'inline-block',
            width: 15,
            height: 15,
          }}
          loading='lazy'
          src='/left-arrow.png'
        />
        <Box sx={{ flexGrow: 1, my: 'auto' }}>Back to home</Box>
      </Box>
      <SectionTitle label='SELECT A CATEGORY' />
      <Box
        sx={{
          display: 'block',
          flexDirection: 'column',
          pr: 1.5,
          mt: 6,
          width: '100%',
          '@media (max-width:768px)': {
            mt: 10,
          },
        }}
      >
        {categoryRows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              maxHeight: showAllCategories || rowIndex === 0 ? '500px' : '0px',
              opacity: showAllCategories || rowIndex === 0 ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s ease, opacity 0.5s ease',
              '@media (max-width:768px)': {
                flexDirection: 'column',
                gap: 2,
              },
            }}
          >
            {row.map((category, index) => (
              <CategoryButton
                key={index}
                categoryLabel={category}
                onClick={() => handleCategoryClick(category)}
                selected={selectedCategories.includes(category)}
              />
            ))}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 4,
          cursor: 'pointer',
        }}
        onClick={handleToggleCategories}
      >
        <Typography
          sx={{
            typography: 'caption',
            fontWeight: 'bold',
            mr: 1,
          }}
        >
          {showAllCategories ? 'Reduce Categories' : 'Show All Categories'}
        </Typography>
        <Box
          component='img'
          sx={{
            width: 18,
            height: 18,
            transform: isFlipped ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
          loading='lazy'
          src='/arrow-down.png'
        />
      </Box>
      <Box
        sx={{
          display: 'block',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 0,
          width: '100%',
          '@media (max-width:768px)': {
            mt: 10,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: imageBase64 ? 'row' : 'column',
            gap: 3,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'block',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: imageBase64 ? '50%' : '100%',
              '@media (max-width:768px)': {
                mt: 10,
              },
            }}
          >
            <SectionTitle label='UPLOAD PHOTOS' />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 1,
                mt: 6,
                borderColor: 'grey.400',
                '@media (max-width:768px)': {
                  px: 2,
                },
              }}
            >
              <Button
                variant='contained'
                sx={{
                  mt: 24,
                  mb: 24,
                  bgcolor: '#509E2F',
                  '&:hover': {
                    bgcolor: '#509E2F',
                  },
                  width: { xs: '100%', md: '633px' },
                  fontSize: '2rem',
                  borderRadius: 'lg',
                  color: 'white',
                  '@media (max-width:768px)': {
                    mt: 10,
                    fontSize: '4xl',
                  },
                }}
                onClick={handleUploadPhotoOrVideoClick}
              >
                Upload Photo
              </Button>
              <input
                type='file'
                ref={hiddenFileInput}
                onChange={handleUploadPhotoOrVideoChange}
                style={{ display: 'none' }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              maxHeight: imageBase64 ? '500px' : '0px',
              opacity: imageBase64 ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s ease, opacity 0.5s ease',
            }}
          >
            {imageBase64 && (
              <>
                <SectionTitle label='PHOTO PREVIEW' />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 6,
                    width: { xs: '100%', md: '633px' },
                    height: '455px',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component='img'
                    src={imageBase64}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>

        <SectionTitle label='RECIPE NAME' />
        <SectionInput
          placeholder='What do you call your recipe?'
          value={recipeName}
          onChange={setRecipeName}
          minRows={1}
        />

        <SectionTitle label='INGREDIENTS' />

        <IngredientsComponent
          placeholder='E.g. 2 cups of flour'
          onChange={handleIngredientsChange}
        />

        <SectionTitle label='INSTRUCTIONS' />
        <InstructionsComponent onChange={setInstructions} />

        <SectionTitle label='CALORIES' />
        <SectionInput
          placeholder='What’s your calory count?'
          value={calories}
          onChange={setCalories}
          minRows={1}
          type='number'
        />
        <SectionTitle label='TIME' />
        <SectionInput
          placeholder='How long does it take to prepare? (In minutes)'
          value={time}
          onChange={setTime}
          minRows={1}
          type='number'
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {uploadStatus === 'loading' ? (
            <CircularProgress sx={{ mt: 4 }} />
          ) : (
            <Button
              onClick={postRecipe}
              variant='contained'
              sx={{
                mt: 8,
                bgcolor: '#509E2F',
                '&:hover': {
                  bgcolor: '#509E2F',
                },
                width: { xs: '100%', md: '633px' },
                fontSize: '2rem',
                borderRadius: 'lg',
                color: 'white',
                '@media (max-width:768px)': {
                  mt: 10,
                  fontSize: '4xl',
                },
              }}
            >
              Post Recipe
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadRecipeComponent;
