import React, { useEffect, useState } from 'react';
import { useProducts } from '../ProductsContext';
import ProductList from '../components/ProductList';
import './BeautyPage.css';

const BeautyPage = () => {
  const { categoryProducts, loading, fetchProducts } = useProducts();
  const beautyProducts = categoryProducts['beauty'] || [];
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch beauty category products on mount if not already fetched
  useEffect(() => {
    if (!hasFetched && beautyProducts.length === 0) {
      fetchProducts('beauty');
      setHasFetched(true);
    }
  }, [fetchProducts, beautyProducts.length, hasFetched]);

  return (
    <div className="category-page">
      <h1>Beauty Collection</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="products-grid">
          {beautyProducts.length === 0 ? (
            <p>No products available in this category.</p>
          ) : (
            <ProductList products={beautyProducts} />
          )}
        </div>
      )}
    </div>
  );
};

export default BeautyPage;
