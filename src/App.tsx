import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import ResponsiveAppBar from './components/ResponsiveAppBar';
import FooterComponent from './components/FooterComponent';
import HomeComponent from './components/HomeComponent';
import RecipeComponent from './components/RecipeComponent';
import UploadRecipeComponent from './components/uploadRecipe/UploadRecipeComponent';
import ProfileComponent from './components/ProfileComponent';

import './App.css';

function App() {
  return (
    <Router>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <ResponsiveAppBar />
        <Box component='main' sx={{ flexGrow: 1, padding: '50px 100px' }}>
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/recipes/:id' element={<RecipeComponent />} />
            <Route path='/uploadRecipe' element={<UploadRecipeComponent />} />
            <Route path='/profile' element={<ProfileComponent />} />
          </Routes>
        </Box>
        <FooterComponent />
      </Box>
    </Router>
  );
}

export default App;
