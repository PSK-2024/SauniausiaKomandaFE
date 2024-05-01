import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import CategoryButton from './CategoryButton';
const UploadRecipeComponent: React.FC = () => {
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);

  useEffect(() => {
    if (redirectToHomePage) {
      window.location.href = '/';
    }
  }, [redirectToHomePage]);

  const handleClickRedirectHomePage = () => {
    setRedirectToHomePage(true);
  };

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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

  return (
    <Box
      sx={{
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        width: '100%',
        maxWidth: '1574px',
        color: 'text.secondary',
        '@media (max-width:768px)': {
          mt: 10,
          maxWidth: '100%',
        },
      }}
    >
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
            justifyContent: 'center',
            width: 20,
            height: 20,
          }}
          loading='lazy'
          src='/left-arrow.png'
        />
        <Box sx={{ flexGrow: 1, my: 'auto' }}>Back to home</Box>
      </Box>
      <Typography
        variant='h5'
        sx={{
          mt: 4,
          pl: 1,
          mb: 2,
          fontWeight: 'bold',
          lineHeight: 'normal',
          color: 'text.primary',
          '@media (max-width:768px)': {
            mt: 10,
            maxWidth: '100%',
            typography: 'h4',
          },
        }}
      >
        SELECT A CATEGORY
      </Typography>
      <Box
        sx={{
          display: 'block',
          flexDirection: 'column',
          pr: 1.5,
          mt: 4,
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
              <CategoryButton key={index} categoryLabel={category} />
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
    </Box>
  );
};

export default UploadRecipeComponent;
