import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeComponent from './components/RecipeComponent';
import './App.css';

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
