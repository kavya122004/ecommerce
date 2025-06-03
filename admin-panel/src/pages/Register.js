import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext.js';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register({
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-left-panel">
        <h1 className="site-name">Devansh</h1>
        <p className="tagline">Your trusted shopping partner</p>
      </div>

      <div className="auth-right-panel">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Create Your Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
            required
          />

          <button type="submit" className="submit-btn">Register</button>

          <p className="redirect-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
