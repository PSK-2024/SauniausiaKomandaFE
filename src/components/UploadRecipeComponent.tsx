import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CategoryButton from './CategoryButton';
import SectionInput from './SectionInput';
import AddTag from './AddTag';
import SectionTitle from './SectionTitle';
import Snackbar from '@mui/material/Snackbar';

const UploadRecipeComponent: React.FC = () => {
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [time, setTime] = useState('');
  const [calories, setCalories] = useState('');
  const [nutrition, setNutrition] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipeTags, setRecipeTags] = useState<string[]>([]);
  const [imageBase64, setImageBase64] = useState('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const postRecipe = () => {
    const errors = [];
    if (!selectedCategory) errors.push('Category must be selected.');
    if (!recipeName) errors.push('Recipe name must be provided.');
    if (ingredients.length === 0)
      errors.push('At least one ingredient must be added.');
    if (!imageBase64) errors.push('Image must be uploaded.');
    if (!instructions) errors.push('Instructions must be provided.');
    if (!time) errors.push('Time must be specified.');
    if (!calories) errors.push('Calories must be specified.');
    if (!nutrition) errors.push('Nutrition details must be provided.');
    if (recipeTags.length === 0)
      errors.push('At least one recipe tag must be added.');

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    const recipeData = {
      category: selectedCategory,
      recipeName,
      instructions,
      time,
      calories,
      nutrition,
      ingredients: ingredients.reduce(
        (acc, curr, index) => ({ ...acc, ['ingredient' + (index + 1)]: curr }),
        {}
      ),
      recipeTags: recipeTags.reduce(
        (acc, curr, index) => ({ ...acc, ['recipeTag' + (index + 1)]: curr }),
        {}
      ),
      image: imageBase64,
    };

    console.log('Posting recipe:', recipeData);
    // api call or other logic to actually post the data
  };

  useEffect(() => {
    if (redirectToHomePage) {
      window.location.href = '/';
    }
  }, [redirectToHomePage]);

  const handleClickRedirectHomePage = () => {
    setRedirectToHomePage(true);
  };

  const categoryRows = [
    ['Food', 'Beverage', 'Dessert'],
    ['Breakfast', 'Dinner', 'Lunch'],
    ['Snacks', 'Drinks', 'Appetizers'],
    ['Main Course', 'Side Dishes', 'Salads'],
  ];

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
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
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
        onClick={handleClickRedirectHomePage}
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
                selected={category === selectedCategory}
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
            display: 'block',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            '@media (max-width:768px)': {
              mt: 10,
            },
          }}
        >
          <SectionTitle label='PHOTOS AND VIDEOS' />
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
              Upload Photo or Video
            </Button>
            <input
              type='file'
              ref={hiddenFileInput}
              onChange={handleUploadPhotoOrVideoChange}
              style={{ display: 'none' }}
            ></input>
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

        <AddTag
          placeholder='Ingredient name'
          tags={ingredients}
          setTags={setIngredients}
        />

        <SectionTitle label='INSTRUCTIONS' />
        <SectionInput
          placeholder='How do you cook your recipe?'
          value={instructions}
          onChange={setInstructions}
          minRows={6}
        />

        <SectionTitle label='CALORIES' />
        <SectionInput
          placeholder='What’s your calory count?'
          value={calories}
          onChange={setCalories}
          minRows={1}
        />
        <SectionTitle label='TIME' />
        <SectionInput
          placeholder='How long does it take to prepare?'
          value={time}
          onChange={setTime}
          minRows={1}
        />
        <SectionTitle label='NUTRITION' />
        <SectionInput
          placeholder='List your nutrition values.'
          value={nutrition}
          onChange={setNutrition}
          minRows={6}
        />

        <SectionTitle label='RECIPE TAGS' />

        <AddTag
          placeholder='Tag name'
          tags={recipeTags}
          setTags={setRecipeTags}
          prefix='#'
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
        </Box>
      </Box>
    </Box>
  );
};

export default UploadRecipeComponent;
