import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2 className="login-title">Login</h2>
        <p className="login-subtext">Get access to your Orders, Wishlist and Recommendations</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="redirect-text">
          New to Devansh? <Link to="/register">Create an account</Link>
        </p>
      </div>
      <div className="login-right">
        <h1 className="brand-name">Devansh</h1>
        <p className="brand-tagline">Your trusted eCommerce experience</p>
      </div>
    </div>
  );
};

export default Login;
