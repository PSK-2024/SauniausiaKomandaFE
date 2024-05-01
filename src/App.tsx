import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RecipeComponent from './components/recipe/RecipeComponent';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/recipes/:id' element={<RecipeComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
