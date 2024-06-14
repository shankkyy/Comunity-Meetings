import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Team from './pages/Team';
import Contact from './pages/Contact';
import CreateEvent from './pages/CreateEvent';
import Navbar from './pages/Navbar';
import UpdateEvent from './pages/UpdateEvent';
function Home() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '200px' }}>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path="update/:id" element={<UpdateEvent />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;
