// Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../components/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../Styles/auth.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert('All fields are required');
      return;
    }
    dispatch(login({ email, password }));
    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && storedUser.password === password) {
      alert('Login successful!');
      navigate('/home');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p className="auth-link">
        Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
      </p>
    </div>
  );
};

export default Login;