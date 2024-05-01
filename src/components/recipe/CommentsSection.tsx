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
    <List>
      {comments.map(comment => (
        <ListItem key={comment.id}>
          <ListItemText
            primary={comment.text}
            secondary={`By ${comment.author}`}
          />
        </ListItem>
      ))}
      <ListItem>
        <TextField label='Add a comment' fullWidth />
        <Button variant='contained' color='primary'>
          Comment
        </Button>
      </ListItem>
    </List>
  );
};

export default CommentsSection;
