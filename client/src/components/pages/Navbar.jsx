import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
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
                console.log('Logout successful'); // Debug log
                localStorage.removeItem('token');
                navigate('/login');
                alert('Logged out succesfully')
            } else {
                const data = await response.json(); 
                console.error('Logout failed:', data.message);
            }
        } catch (error) {
            console.error('Logout error', error);
        }
    };
    

    return (
        <div className="nav">
            <div className="nav-links">
                <div className="nav-item">
                    <Link className='nav-link' to="team">Team</Link>
                </div>
                <div className="nav-item">
                    <Link className='nav-link' to="about">About</Link>
                </div>
                <div className="nav-item">
                    <Link className='nav-link' to="contact">Contact</Link>
                </div>
            </div>
            <div className="nav-item">
                <button className='nav-link' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
