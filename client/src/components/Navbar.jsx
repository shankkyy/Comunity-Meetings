import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch('https://comunity-meetings-3.onrender.com/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                navigate('/login');
                alert('Logged out successfully');
            } else {
                const data = await response.json();
                console.error('Logout failed:', data.message);
            }
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            backgroundColor: scrolled ? '#fff' : 'transparent',
            boxShadow: scrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
            zIndex: 1000,
            padding: '10px 20px',
            transition: 'background-color 0.3s, box-shadow 0.3s'
        }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="" style={{ marginRight: '20px', textDecoration: 'none', color: scrolled ? '#333' : '#fff', fontSize: '2em', fontWeight:'inherit' }}>Upcoming Events</Link>
                    <Link to="create" style={{ marginRight: '20px', textDecoration: 'none', color: scrolled ? '#333' : '#fff', fontSize: '2em', fontWeight: 'inherit' }}>Create Event</Link>
                    <Link to="contact" style={{ marginRight: '20px', textDecoration: 'none', color: scrolled ? '#333' : '#fff', fontSize: '2em', fontWeight: 'inherit' }}>Community Meetup</Link>
                    <button onClick={handleLogout} style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        fontSize: '2em',
                        fontWeight:'inherit',
                        color: scrolled ? '#333' : '#fff'
                    }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
