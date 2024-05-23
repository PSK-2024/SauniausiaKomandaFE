import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import { RecipeCard } from '../../state/model/recipeCardModel';

import './recipeReviewCard.css';

const RecipeReviewCard: React.FC<RecipeCard> = ({
  id,
  title,
  rating,
  img,
  duration,
  categories,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className='card'>
      <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className='media-wrapper'
          component='img'
          height='200'
          image={img}
          alt={title}
          sx={{ borderRadius: 2 }}
        />
        <Box className='rating'>
          <StarIcon className='star' />
          <Typography
            variant='subtitle1'
            color='#ffffff'
            fontSize='20px'
            marginLeft='2px'
          >
            {rating.toFixed(1)}
          </Typography>
        </Box>
        <CardContent className='card-content'>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            fontWeight='bold'
            fontSize='25px'
            color='#000000'
          >
            {title}
          </Typography>
          <Box className='categories'>
            {categories.map(category => (
              <Chip key={category} label={category} className='category-chip' />
            ))}
          </Box>
        </CardContent>
      </Link>
      <CardActions className='card-bottom' disableSpacing>
        <Typography
          color='#DC582A'
          fontWeight='600'
          fontSize='20px'
          padding='8px'
        >
          {duration} min
        </Typography>
        <Box>
          <IconButton
            aria-label='add to favorites'
            onClick={toggleFavorite}
            sx={{ color: isFavorite ? '#e01930' : '#D3D3D3' }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <ModeCommentOutlinedIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RecipeReviewCard;
