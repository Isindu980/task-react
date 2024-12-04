import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../components/redux/cartSlice';
import { logout } from '../components/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';

const items = [
  { id: 1, name: 'Running Shoes', price: 10000, description: 'Comfortable running shoes', image: 'https://via.placeholder.com/150/0000FF/808080?text=Running+Shoes' },
  { id: 2, name: 'Basketball Shoes', price: 2000, description: 'High-performance basketball shoes', image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Basketball+Shoes' },
  { id: 3, name: 'Soccer Cleats', price: 3500, description: 'Durable soccer cleats', image: 'https://via.placeholder.com/150/00FF00/000000?text=Soccer+Cleats' },
  { id: 4, name: 'Tennis Shoes', price: 45000, description: 'Lightweight tennis shoes', image: 'https://via.placeholder.com/150/FFFF00/000000?text=Tennis+Shoes' },
  { id: 5, name: 'Hiking Boots', price: 5000, description: 'Sturdy hiking boots', image: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Hiking+Boots' },
  { id: 6, name: 'Casual Sneakers', price: 6000, description: 'Stylish casual sneakers', image: 'https://via.placeholder.com/150/800080/FFFFFF?text=Casual+Sneakers' },
  { id: 7, name: 'Formal Shoes', price: 7000, description: 'Elegant formal shoes', image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Formal+Shoes' },
  { id: 8, name: 'Sandals', price: 800, description: 'Comfortable sandals', image: 'https://via.placeholder.com/150/FFC0CB/000000?text=Sandals' },
  { id: 9, name: 'Flip Flops', price: 500, description: 'Casual flip flops', image: 'https://via.placeholder.com/150/008080/FFFFFF?text=Flip+Flops' },
  { id: 10, name: 'Boots', price: 45000, description: 'Warm winter boots', image: 'https://via.placeholder.com/150/800000/FFFFFF?text=Boots' },
  { id: 11, name: 'Loafers', price: 3500, description: 'Comfortable loafers', image: 'https://via.placeholder.com/150/808080/000000?text=Loafers' },
  { id: 12, name: 'Slippers', price: 40, description: 'Cozy slippers', image: 'https://via.placeholder.com/150/FFFFFF/000000?text=Slippers' },
  { id: 13, name: 'Climbing Shoes', price: 55000, description: 'Durable climbing shoes', image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Climbing+Shoes' },
  { id: 14, name: 'Cycling Shoes', price: 6500, description: 'High-performance cycling shoes', image: 'https://via.placeholder.com/150/FF0000/000000?text=Cycling+Shoes' },
];

const Home = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user) || { name: 'Guest', email: 'guest@example.com' };

  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getTotalCostColor = (total) => {
    if (total > 100000) {
      return 'red';
    } else if (total >= 50000 && total <= 100000) {
      return 'yellow';
    } else {
      return 'white';
    }
  };

  return (
    <div className="home-container">
      <h1 className="page-title">Welcome to the Store</h1>
      <div className="profile-section">
        <img
          src="/path/to/profile-image.jpg"
          alt="Profile"
          className="profile-image"
          onClick={() => setProfileOpen(!isProfileOpen)}
        />
        {isProfileOpen && (
          <div className="profile-popup">
            <h1 className="user-name">Name: {user.name}</h1>
            <p className="user-email">Email: {user.email}</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="button-group">
  <button className="view-cart-button" onClick={() => setCartOpen(!isCartOpen)}>
    <i className="fas fa-shopping-cart"></i>
  </button>
</div>
      <div className="items-list">
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            <h2 className="item-name">{item.name}</h2>
            <img src={item.image} alt={item.name} className="item-image" />
            <p className="item-description">{item.description}</p>
            <p className="item-price">LKR {item.price}</p>
            <button className="add-to-cart-button" onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
          </div>
        ))}
      </div>
      {isCartOpen && (
        <div className="cart-popup">
          <h2 className="cart-title">Your Cart</h2>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">Price: LKR {item.price}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              <div className="cart-item-buttons">
                <button className="quantity-button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                <button className="quantity-button" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
                <button className="remove-button" onClick={() => dispatch(removeFromCart({ id: item.id }))}>Remove</button>
              </div>
            </div>
          ))}
           <h3 className="total-cost" style={{ color: getTotalCostColor(totalCost) }}>Total: LKR {totalCost}</h3>
        </div>
      )}
    </div>
  );
};

export default Home;