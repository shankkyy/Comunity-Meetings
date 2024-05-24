import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log form data to the console
    console.log('Form Data:', formData);

    
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response format');
      }

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('An error occurred during registration.');
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;
