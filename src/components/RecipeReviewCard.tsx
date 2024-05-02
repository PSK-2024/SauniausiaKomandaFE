import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import '../styles/recipeReviewCard.css';

interface RecipeReviewCardProps {
  key: number;
  id: number;
  title: string;
  rating: number;
  img: string;
  duration: number;
}

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({
  id,
  title,
  rating,
  img,
  duration,
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
          >
            {title}
          </Typography>
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
