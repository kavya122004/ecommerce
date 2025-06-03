// src/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);


  useEffect(() => {
    // Check for user in localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const login = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };


  const register = async ({ name, email, password }) => {
    try {
      const response = await axios.post('http://localhost:5000/register', { name, email, password });
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
