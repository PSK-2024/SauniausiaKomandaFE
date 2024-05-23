import React, { useState } from 'react';
import { Box, Button, Typography, Avatar } from '@mui/material';
import EditProfile from './EdiProfile';

interface ProfileHeaderProps {
  name: string;
  imageUrl: string;
  bio: string;
  handleSave: (profile: {
    name: string;
    profilePicture: string;
    bio: string;
  }) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  imageUrl,
  bio,
  handleSave,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          onClick={handleOpen}
          sx={{ mt: 1, bgcolor: '#509E2F', '&:hover': { bgcolor: '#367022' } }}
        >
          Edit Profile
        </Button>
      </Box>
      <EditProfile
        open={open}
        handleClose={handleClose}
        profile={{ name, profilePicture: imageUrl, bio }}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default ProfileHeader;
