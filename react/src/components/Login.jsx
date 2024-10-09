import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './login.css';
import logo from '../assets/Travelers-Logo.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Login successful! User ID: ${data._id}`);
        navigate('/home', { state: { personInfo: data } });
      } else if (response.status === 401) {
        setMessage('Authentication failed');
      } else {
        setMessage('Internal server error');
      }
    } catch (error) {
      setMessage('Internal server error');
    }
  };

  return (
    <div className='contain'>
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-h2">Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label className="login-label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-btn" type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
