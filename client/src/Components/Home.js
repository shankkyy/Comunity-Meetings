import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Team from './pages/Team';
import Contact from './pages/Contact';
import CreateEvent from './pages/CreateEvent';
import Navbar from './Navbar';
import UpdateEvent from './pages/UpdateEvent';
import Footer from './Footer';

function Home() {
  const location = useLocation();

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path="update/:id" element={<UpdateEvent />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '100px', // Ensure this margin matches your Navbar height to avoid layout shifts
  },
};

export default Home;
