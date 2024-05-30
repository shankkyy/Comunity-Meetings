import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Team from './pages/Team';
import Contact from './pages/Contact';
import About from './pages/About';
import Navbar from './pages/Navbar';

function Home() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default Home;
