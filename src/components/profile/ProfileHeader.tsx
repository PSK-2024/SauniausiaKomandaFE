import React, { useState } from 'react';
import { Box, Button, Typography, Avatar } from '@mui/material';
import EditProfile from './EdiProfile';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  image: string;
  about: string;
  handleSave: (profile: {
    firstName: string;
    lastName: string;
    about: string;
    image: string;
  }) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  image,
  about,
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
      <Avatar src={image} sx={{ width: 200, height: 200 }} />
      <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
          {firstName}
        </Typography>
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
          {lastName}
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
        profile={{ firstName, lastName, image, about }}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default ProfileHeader;
