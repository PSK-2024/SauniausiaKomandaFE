import React from 'react';
import { List, ListItem, ListItemText, TextField } from '@mui/material';
import './ReviewSection.css';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface CommentsSectionProps {
  comments: Comment[];
}

const ReviewSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  return (
    <div className='comments'>
      <div className='comments-list'>
        <List>
          {comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText
                primary={comment.text}
                secondary={`By ${comment.author}`}
              />
            </ListItem>
          ))}
        </List>
        <TextField
          label='Add a comment'
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
      </div>
      <div className='comment-button'>
        <button>Comment</button>
      </div>
    </div>
  );
};

export default ReviewSection;
