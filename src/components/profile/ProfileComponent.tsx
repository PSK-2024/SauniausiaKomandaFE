/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { AppDispatch, RootState } from '../../app/store';
import ProfileHeader from './ProfileHeader';
import BioSection from './BioSection';
import RecipesGrid from './RecipesGrid';
import { mockedProfile } from '../../data/mockProfile';
import {
  fetchPostedRecipes,
  fetchFavoriteRecipes,
} from '../../state/thunk/userProfileThunk';
import { fetchUserData, updateUserData } from '../../state/thunk/userThunk';
import { favorites, posted } from '../../data/MockProfileRecipes';

const ProfileComponent: React.FC = () => {
  const {
    user,
    status: userStatus,
    error: userError,
  } = useSelector((state: RootState) => state.user);
  const {
    postedRecipes,
    favoriteRecipes,
    favoriteStatus,
    postedStatus,
    error: recipesError,
  } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (postedStatus === 'idle') {
      //dispatch(fetchPostedRecipes());
    }
  }, [postedStatus, dispatch]);

  useEffect(() => {
    if (favoriteStatus === 'idle') {
      //dispatch(fetchFavoriteRecipes());
    }
  }, [favoriteStatus, dispatch]);

  const handleSave = (updatedProfile: {
    name: string;
    profilePicture: string;
    bio: string;
  }) => {
    const formData = new FormData();
    formData.append('firstName', updatedProfile.name);
    formData.append('about', updatedProfile.bio);
    formData.append('image', updatedProfile.profilePicture);

    dispatch(updateUserData(formData));
  };

  if (
    userStatus == 'loading' ||
    postedStatus == 'loading' ||
    favoriteStatus == 'loading'
  ) {
    return <CircularProgress />;
  }

  if (userError) {
    return <div>Error: {userError}</div>;
  }
  if (recipesError) {
    return <div>Error: {recipesError}</div>;
  }

  return (
    <Box>
      {user && (
        <>
          <ProfileHeader
            name={user.firstName}
            imageUrl={user.image}
            bio={user.about}
            handleSave={handleSave}
          />
          <BioSection bio={user.about} />
        </>
      )}
      <RecipesGrid recipes={posted} title='Recipes Posted' />
      <RecipesGrid recipes={favorites} title='Favourites' />
    </Box>
  );
};

export default ProfileComponent;
