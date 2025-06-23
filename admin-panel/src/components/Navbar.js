import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Logo from "../assets/Logo.png";
import { FaHeart, FaShoppingCart, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';
import React, { useState } from 'react';


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };
const [searchTerm, setSearchTerm] = useState('');

const handleSearch = () => {
  if (searchTerm.trim()) {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  }
};

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
          src={Logo}
            // src="file:///C:/Users/KAVYA%20SRI/OneDrive/Documents/Desktop/project1/admin-panel/assets/Logo.png" // 👈 Replace this with your actual logo image path
            alt="Devansh Logo" 
            className="logo-image"
          />
        </Link>

        <div className="navbar-search">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button onClick={handleSearch}>Search</button>
</div>


        <div className="navbar-links">
          <div className="navbar-dropdown">
            <span className="dropdown-toggle">Categories</span>
            <div className="dropdown-menu">
              <Link to="/women">Women</Link>
              <Link to="/men">Men</Link>
              <Link to="/kids">Kids</Link>
              <Link to="/gifts">Gifts</Link>
            </div>
          </div>

          {user && (
            <>
              <Link to="/wishlist" className="icon-link">
                <FaHeart /> Wishlist
              </Link>
              <Link to="/buy" className="icon-link">
                <FaShoppingCart /> Cart
              </Link>
            </>
          )}

          {user ? (
            <>
              <Link to="/admin">Admin</Link>
              <button className="icon-button" onClick={handleLogout} title="Logout">
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <Link to="/login" className="icon-link">
              <FaUserCircle /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
