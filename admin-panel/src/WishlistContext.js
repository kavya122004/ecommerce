import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Fetch Wishlist
  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`http://localhost:5000/wishlist?email=${user.email}`);
      setWishlist(response.data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  // Add to Wishlist
  const addToWishlist = async (product) => {
    if (!user) return alert('Please log in to add to wishlist');
    try {
      await axios.post('http://localhost:5000/wishlist', {
        email: user.email,
        product,
      });
      setWishlist(prev => [...prev, product]);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

// src/contexts/WishlistContext.js
const removeFromWishlist = async (productId) => {
  if (!user) return;

  try {
    await axios.delete(`http://localhost:5000/wishlist?email=${user.email}&productId=${productId}`);
    // setWishlist(prev => prev.filter(item => item.product._id !== productId));
    setWishlist(prev =>
  prev.filter(item => {
    const id = item?.product?._id || item?._id;
    return id !== productId;
  })
);
  } catch (error) {
    console.error('Failed to remove from wishlist:', error);
  }
};



  // Optional: Remove from wishlist
  // const removeFromWishlist = async (...) => { ... }

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, fetchWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
