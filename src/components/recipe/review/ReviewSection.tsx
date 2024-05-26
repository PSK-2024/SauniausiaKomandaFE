import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Rating } from '@mui/material';
import './ReviewSection.css';
import { addReview } from '../../../state/thunk/recipeThunk';
import { useAppDispatch } from '../../../app/hooks';
import { Review } from '../../../state/model/reviewModel';

interface ReviewSectionProps {
  recipeId: number;
  reviews: Review[];
  hasUserReviewed: boolean;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  recipeId,
  reviews,
  hasUserReviewed,
}) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleAddReview = () => {
    if (text && rating !== null && !hasUserReviewed) {
      dispatch(
        addReview({
          review: { recipeId, text, rating },
        })
      );
      setText('');
      setRating(null);
    }
  };

  return (
    <div className='reviews'>
      <List className='reviews-list'>
        {reviews.map(review => (
          <ListItem key={review.id}>
            <ListItemText
              primary={review.text}
              secondary={`By ${review.author.firstName} ${review.author.lastName} - ${review.rating} Stars`}
            />
          </ListItem>
        ))}
      </List>
      <div className='review-form'>
        <div className='review-rating'>
          <Rating
            name='simple-controlled'
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <TextField
          label='Add a review'
          value={text}
          onChange={e => setText(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#509E2F',
              },
              '&:hover fieldset': {
                borderColor: '#509E2F',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#509E2F',
              },
            },
          }}
        />
        <div className='review-button'>
          <button onClick={handleAddReview} disabled={hasUserReviewed}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
