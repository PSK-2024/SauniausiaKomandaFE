import React from 'react';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface CommentsSectionProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
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
        <TextField label='Add a comment' fullWidth />
      </div>
      <div className='comment-button'>
        <Button variant='contained' color='primary'>
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentsSection;
