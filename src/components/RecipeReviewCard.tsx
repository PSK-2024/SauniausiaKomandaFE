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
    <Card
      sx={{ borderRadius: 2, overflow: 'visible', boxShadow: 3, margin: 2 }}
    >
      <CardMedia component='img' height='200' image={img} alt={title} />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{ fontWeight: 'bold', flexGrow: 1, fontSize: '25px', m: 0 }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StarIcon sx={{ color: '#FDC040', fontSize: '20px' }} />
          <Typography
            variant='subtitle1'
            sx={{ ml: 0.5, color: '#ADADAD', fontSize: '20px' }}
          >
            {rating}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ justifyContent: 'space-between', padding: 2, paddingTop: 0 }}
      >
        <Typography
          sx={{
            color: '#DC582A',
            fontSize: '20px',
            fontWeight: '600',
            padding: '8px',
          }}
        >
          {duration} min
        </Typography>
        <Box>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon sx={{ color: 'red' }} />
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
