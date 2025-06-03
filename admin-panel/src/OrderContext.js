import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const OrderContext = createContext();


export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [orders, setOrders] = useState([]);

  const buyNow = (product, navigate) => {
    setPurchases([product]);
    navigate('/buy');
  };

  const placeOrder = async (addressDetails) => {
    if (!user) return alert('Please log in to place an order');

    try {
      const response = await axios.post('http://localhost:5000/orders', {
        email: user.email,
        product: purchases[0],
        addressDetails,
      });
      const newOrder = response.data;
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (error) {
      console.error('Failed to place order:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ purchases, buyNow, placeOrder, orders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
