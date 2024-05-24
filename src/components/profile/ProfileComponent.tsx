import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { AppDispatch } from '../../app/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { Box, CircularProgress, Typography } from '@mui/material';
// import { RootState, AppDispatch } from '../../app/store';
import ProfileHeader from './ProfileHeader';
import BioSection from './BioSection';
import RecipesGrid from './RecipesGrid';
import { mockedProfile } from '../../data/MockUser';
import {
  fetchProfile,
  fetchPostedRecipes,
  fetchFavoriteRecipes,
  updateProfile,
} from '../../state/thunk/userProfileThunk';
import { posted, favorites } from '../../data/MockProfileRecipes';

const ProfileComponent: React.FC = () => {
  // const { profile, postedRecipes, favoriteRecipes, loading } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchPostedRecipes());
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  const handleSave = (updatedProfile: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    bio: string;
  }) => {
    const formData = new FormData();
    formData.append('first name', updatedProfile.firstName);
    formData.append('last name', updatedProfile.lastName);
    formData.append('bio', updatedProfile.bio);
    if (updatedProfile.profilePicture !== mockedProfile?.profilePicture) {
      formData.append('profilePicture', updatedProfile.profilePicture);
    }

    dispatch(updateProfile(formData));
  };

  // if (loading) {
  //   return <CircularProgress />;
  // }

  return (
    <Box>
      {mockedProfile && (
        <>
          <ProfileHeader
            firstName={mockedProfile.firstName}
            lastName={mockedProfile.lastName}
            imageUrl={mockedProfile.profilePicture}
            bio={mockedProfile.bio}
            handleSave={handleSave}
          />
          <BioSection bio={mockedProfile.bio} />
        </>
      )}
      <RecipesGrid recipes={posted} title='Recipes Posted' />
      <RecipesGrid recipes={favorites} title='Favourites' />
    </Box>
  );
};

export default ProfileComponent;
