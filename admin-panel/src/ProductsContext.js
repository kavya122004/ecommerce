// src/contexts/ProductsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useWishlist } from './WishlistContext';
import axios from 'axios';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useWishlist();  // Add wishlist functions

  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState({});

  const [orders, setOrders] = useState([]);

  // Fetch products from backend API
  const fetchProducts = async (category = '') => {
    setLoading(true);
    try {
      let url = 'https://ecommerce-10-backend.onrender.com';
      if (category) {
        url += `?category=${category}`;
      }
      const response = await axios.get(url);
      if (category) {
        setCategoryProducts(prev => ({ ...prev, [category]: response.data }));
      } else {
        setProducts(response.data);
      }
      if (user) {
        fetchWishlist();  // Make sure wishlist is fetched when the user is logged in
      }
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (product) => {
    try {
      console.log('Images:', product.images);
    console.log('Number of images:', product.images.length);
      const response = await axios.post('http://localhost:5000/products', product);
      setProducts(prev => [...prev, response.data]);
      setCategoryProducts(prev => ({
        ...prev,
        [product.category]: prev[product.category]
          ? [...prev[product.category], response.data]
          : [response.data],
      }));
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };
  const updateProduct = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${id}`, updatedData);
      const updatedProduct = response.data;

      // Update products list
      setProducts(prev =>
        prev.map(product => (product.id === id ? updatedProduct : product))
      );

      // Update categoryProducts dictionary
      setCategoryProducts(prev => {
        const category = updatedProduct.category;
        if (!prev[category]) return prev;

        return {
          ...prev,
          [category]: prev[category].map(product =>
            product.id === id ? updatedProduct : product
          ),
        };
      });

      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };



  const getProductById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product by ID:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };




  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{
      categoryProducts,
      products,
      loading,
      fetchProducts,
      updateProduct,
      addProduct,
      deleteProduct,
      getProductById,
      addToWishlist,
      removeFromWishlist,
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
