import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FaHeart, FaShoppingCart, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Devansh</Link>

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
