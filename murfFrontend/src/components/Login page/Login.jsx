import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    setEmailError('')
    setPasswordError('')

    if (!email) {
      setEmailError('Email cannot be empty')
    }
    if (!password) {
      setPasswordError('Password cannot be empty')
    }

    if (email && password) {
      console.log('Form submitted:', { email, password })
    }
  }

  return (
    
      <div className="login-card">
        <div className="login-form-container">
          <h1 className="login-title">Welcome to murf</h1>
          
          <p className="login-subtitle">
            Login to the platform and stay up to date with 
            <br />the current trend of the world!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="error-message">{emailError}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-text">
            Do not have an account?{' '}
            <NavLink to="/signup" className="signup-link">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    
  )
}

export default Login
