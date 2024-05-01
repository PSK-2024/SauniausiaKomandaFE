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
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import '../styles/recipeReviewCard.css';

interface RecipeReviewCardProps {
  key: number;
  title: string;
  rating: number;
  img: string;
  duration: number;
}

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({
  title,
  rating,
  img,
  duration,
}) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, margin: 2 }}>
      <CardMedia
        component='img'
        height='200'
        image={img}
        alt={title}
        sx={{ borderRadius: 2 }}
      />
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
        <Box className='rating'>
          <StarIcon className='star' />
          <Typography
            variant='subtitle1'
            color='#ADADAD'
            fontSize='20px'
            marginLeft='2px'
          >
            {rating}
          </Typography>
        </Box>
      </CardContent>
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
          <IconButton aria-label='add to favorites'>
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
