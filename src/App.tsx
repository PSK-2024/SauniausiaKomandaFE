import React from 'react';
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
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage'; // Import RegisterPage
import './App.css';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register'; // Check if on Register page

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
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />{' '}
          {/* Add Register route */}
          <Route path='/' element={<HomeComponent />} />
          <Route path='/recipes/:id' element={<RecipeComponent />} />
          <Route path='/uploadRecipe' element={<UploadRecipeComponent />} />
          <Route path='/profile' element={<ProfileComponent />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
