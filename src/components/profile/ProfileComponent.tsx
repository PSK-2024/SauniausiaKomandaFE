import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { AppDispatch, RootState } from '../../app/store';
import ProfileHeader from './ProfileHeader';
import BioSection from './BioSection';
import RecipesGrid from './RecipesGrid';
import {
  fetchPostedRecipes,
  fetchFavoriteRecipes,
} from '../../state/thunk/userProfileThunk';
import { updateUserData } from '../../state/thunk/userThunk';
import { UserUpdateRequest } from '../../state/model/userModel';
import { blobToBase64, fetchBlob } from '../../utils/imageUtils';

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
      dispatch(fetchPostedRecipes());
    }
  }, [postedStatus, dispatch]);

  useEffect(() => {
    if (favoriteStatus === 'idle') {
      dispatch(fetchFavoriteRecipes());
    }
  }, [favoriteStatus, dispatch]);

  const handleSave = async (updatedProfile: UserUpdateRequest) => {
    const formData = new FormData();
    formData.append('firstName', updatedProfile.firstName);
    formData.append('lastName', updatedProfile.lastName);
    formData.append('about', updatedProfile.about);

    if (updatedProfile.image.startsWith('blob:')) {
      try {
        const blob = await fetchBlob(updatedProfile.image);
        const base64Image = await blobToBase64(blob);
        if (base64Image) {
          formData.append('image', base64Image);
        } else {
          console.error('Error: Failed to convert blob to base64');
        }
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    } else {
      formData.append('image', updatedProfile.image);
    }

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
            firstName={user.firstName}
            lastName={user.lastName}
            image={user.image}
            about={user.about}
            handleSave={handleSave}
          />
          <BioSection bio={user.about} />
        </>
      )}
      {postedRecipes.length > 0 && (
        <RecipesGrid recipes={postedRecipes} title='Recipes Posted' />
      )}
      {favoriteRecipes.length > 0 && (
        <RecipesGrid recipes={favoriteRecipes} title='Favourites' />
      )}
    </Box>
  );
};

export default ProfileComponent;
