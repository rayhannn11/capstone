import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Recommendation from './pages/Recommendation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Favorite from './pages/Favorite';
import NotFound from './pages/NotFound';
import About from './pages/About';

const App = () => (
  <Box width='400px' sx={{ width: { xl: '100%' } }} m='auto'>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/exercise/:id' element={<ExerciseDetail />} />
      <Route path='/recommendation' element={<Recommendation />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </Box>
);

export default App;
