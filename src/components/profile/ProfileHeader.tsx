import React from 'react';
import { Box, Button, Typography, Avatar } from '@mui/material';

interface ProfileHeaderProps {
  name: string;
  imageUrl: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, imageUrl }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        justifyContent: 'center',
      }}
    >
      <Avatar src={imageUrl} sx={{ width: 200, height: 200 }} />
      <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Button
          variant='contained'
          sx={{ mt: 1, bgcolor: '#509E2F', '&:hover': { bgcolor: '#367022' } }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
