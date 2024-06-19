import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');
        console.log('Retrieved token:', token);

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('token');
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
        <div className={`nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-links">
                <div className="nav-item">
                    <Link className='nav-link' to="">Upcoming Events</Link>
                </div>
                <div className="nav-item">
                    <Link className='nav-link' to="create">Create Event</Link>
                </div>
                <div className="nav-item">
                    <Link className='nav-link' to="contact">Community Meetup</Link>
                </div>
                <div className="nav-item">
                    <button className='nav-link' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
