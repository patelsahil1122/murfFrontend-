import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';



function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '' // Added general error field
  });
  const [loading, setLoading] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const navigate = useNavigate();

  // Add useEffect to check for stored user data
  
  const loginUser = async () => {
    

    try {
      setLoading(true);
      console.log('Login attempt with:', { email: formData.email }); // Debug log

      const response = await axios.post('http://localhost:5000/login', {
        user_email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login response:', response.data); // Debug log

      if (response.data.data.token) {
        // Store authentication data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify({
          email: formData.email,
          lastLogin: new Date().toISOString()
        }));
    
       
        navigate('/create-forum', { replace: true });
      }
    } catch (error) {
      console.error('Login Error:', error?.response || error.message);
      setErrors(prev => ({
        ...prev,
        general: error.response?.data?.message || 'Login failed. Please try again.'
      }));

    } finally {
      setLoading(false);
      setShouldLogin(false);
    }
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({
      email: '',
      password: '',
      general: ''
    });

    // Validation
    let hasErrors = false;
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setShouldLogin(true);
  }

  const handleSignupClick = () => {
    // Store initial form data in localStorage
    localStorage.setItem('signupData', JSON.stringify({
      email: formData.email,
      timestamp: new Date().toISOString()
    }));
    navigate('/signup');
  };

  const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };


 
  return (
    <div className="login-card">
      <div className="login-form-container">
        <h1 className="login-title">Welcome to murf</h1>
        
        <p className="login-subtitle">
          Login to the platform and stay up to date with 
          <br />the current trend of the world!
        </p>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error-input' : ''}`}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                if (errors.email) setErrors({ ...errors, email: '' })
              }}
            />
            {errors.email && <span className="input-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'error-input' : ''}`}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                if (errors.password) setErrors({ ...errors, password: '' })
              }}
            />
            {errors.password && <span className="input-error">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="login-button"
            onClick={loginUser}
        
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-text">
          Do not have an account?{' '}
          <NavLink 
            to="/signup" 
            className="signup-link"
            onClick={handleSignupClick}
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login

