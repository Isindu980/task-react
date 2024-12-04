import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
<div class="landing-container">
  <div class="landing-content">
    <h1 class="landing-title">Step Up</h1>
    <p class="landing-subtitle">Where Style Meets Comfort</p>
    <button class="landing-button" onClick={handleButtonClick}>Shop the Collection</button>
  </div>
  <div class="landing-decor"></div>
</div>


  );
};

export default Landing;