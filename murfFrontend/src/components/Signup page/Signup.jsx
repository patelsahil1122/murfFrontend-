import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Signup.css'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Reset errors
    setNameError('')
    setEmailError('')
    setPasswordError('')

    // Validate
    let isValid = true

    if (!name) {
      setNameError('Name cannot be empty')
      isValid = false
    }

    if (!email) {
      setEmailError('Email cannot be empty')
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email')
      isValid = false
    }

    if (!password) {
      setPasswordError('Password cannot be empty')
      isValid = false
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    }

    if (isValid) {
      console.log('Form submitted:', { name, email, password })
    }
  }

  return (
    
      <div className="signup-card">
        <div className="signup-form-container">
          <h1 className="signup-title">Welcome to murf</h1>
          
          <p className="signup-subtitle">
            Sign up into the platform and write some exciting posts to attract users
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <p className="error-message">{nameError}</p>
              )}
            </div>

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

            <button type="submit" className="signup-button">
              Sign up
            </button>
          </form>

          <p className="login-text">
            Already have an account?{' '}
            <NavLink to="/" className="login-link">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    
  )
}

export default Signup
