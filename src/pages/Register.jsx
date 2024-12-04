// Register.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../components/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../Styles/auth.css'; // Import the CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }
    dispatch(register({ name, email, password }));
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p className="auth-link">
        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default Register;