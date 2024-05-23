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
import {
  fetchProfile,
  fetchPostedRecipes,
  fetchFavoriteRecipes,
} from '../../state/thunk/userProfileThunk';
import { posted, favorites } from '../../data/MockProfileRecipes';

const ProfileComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { profile, postedRecipes, favoriteRecipes, loading, error } = useSelector((state: RootState) => state.profile);

  const mockedProfile = {
    name: 'John Doe',
    profilePicture: 'https://via.placeholder.com/100',
    bio: 'Lorem ipsum dolor sit amet...',
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchPostedRecipes());
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  // if (loading) {
  //   return <CircularProgress />;
  // }

  // if (error) {
  //   return <Typography variant="h6">Error loading profile: {error}</Typography>;
  // }

  // if (!profile) {
  //   return <Typography variant="h6">Error loading profile data.</Typography>;
  // }

  return (
    <Box>
      <ProfileHeader
        name={mockedProfile.name}
        imageUrl={mockedProfile.profilePicture}
      />
      <BioSection bio={mockedProfile.bio} />
      <RecipesGrid recipes={posted} title='Recipes Posted' />
      <RecipesGrid recipes={favorites} title='Favourites' />
    </Box>
  );
};

export default ProfileComponent;
