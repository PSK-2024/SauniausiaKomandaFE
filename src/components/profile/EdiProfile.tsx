import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from '@mui/material';

interface EditProfileProps {
  open: boolean;
  handleClose: () => void;
  profile: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    bio: string;
  };
  handleSave: (profile: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    bio: string;
  }) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  open,
  handleClose,
  profile,
  handleSave,
}) => {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);
  const [bio, setBio] = useState(profile.bio);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setProfilePicture(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    handleSave({ firstName, lastName, profilePicture, bio });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          margin: '100px auto',
          padding: 2,
          bgcolor: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant='h6' gutterBottom>
          Edit Profile
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar src={profilePicture} sx={{ width: 100, height: 100 }} />
          <Button
            variant='contained'
            component='label'
            sx={{ bgcolor: '#509E2F', '&:hover': { bgcolor: '#367022' } }}
          >
            Change Profile Picture
            <input type='file' hidden onChange={handleProfilePictureChange} />
          </Button>
          <TextField
            label='First name'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            label='Last name'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            fullWidth
          />
          <TextField
            label='Bio'
            value={bio}
            onChange={e => setBio(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <Button
            variant='contained'
            onClick={handleSubmit}
            sx={{ bgcolor: '#509E2F', '&:hover': { bgcolor: '#367022' } }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfile;
