import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Box } from '@mui/material';

import ResponsiveAppBar from './components/navBar/ResponsiveAppBar';
import FooterComponent from './components/footer/FooterComponent';
import HomeComponent from './components/home/HomeComponent';
import RecipeComponent from './components/recipe/RecipeComponent';
import UploadRecipeComponent from './components/uploadRecipe/UploadRecipeComponent';
import ProfileComponent from './components/profile/ProfileComponent';
import LoginComponent from './components/login/LoginPage';
import PrivateRoute from './router/PrivateRoute';
import './App.css';
import { RootState } from './app/store';
import { fetchUserData } from './state/thunk/userThunk';
import { useAppDispatch, useAppSelector } from './app/hooks';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  const hideAppBarAndFooter = isLoginPage || isRegisterPage;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideAppBarAndFooter && <ResponsiveAppBar />}
      <Box component='main' sx={{ flexGrow: 1, padding: '50px 100px' }}>
        {children}
      </Box>
      {!hideAppBarAndFooter && <FooterComponent />}
    </Box>
  );
};

function App() {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state: RootState) => state.user.status);
  const token = localStorage.getItem('apiToken');

  useEffect(() => {
    if (token && userStatus == 'idle') {
      dispatch(fetchUserData());
    }
  }, [dispatch, token, userStatus]);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/login' element={<LoginComponent />} />
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/recipes/:id' element={<RecipeComponent />} />
            <Route path='/uploadRecipe' element={<UploadRecipeComponent />} />
            <Route path='/profile' element={<ProfileComponent />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
