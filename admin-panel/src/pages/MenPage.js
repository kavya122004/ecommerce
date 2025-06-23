import React, { useEffect, useState } from 'react';
import { useProducts } from '../ProductsContext';
import ProductList from '../components/ProductList';
import './MenPage.css';

const MensPage = () => {
  const { categoryProducts, loading, fetchProducts } = useProducts();
  const giftProducts = categoryProducts['men'] || [];
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch gifts category products on mount if not already fetched
  useEffect(() => {
    if (!hasFetched && giftProducts.length === 0) {
      fetchProducts('men');
      setHasFetched(true);
    }
  }, [fetchProducts, giftProducts.length, hasFetched]);

  return (
    <div className="category-page">
      <h1>Men's Collection</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="products-grid">
          {giftProducts.length === 0 ? (
            <p>No products available in this category.</p>
          ) : (
            <ProductList products={giftProducts} />
          )}
        </div>
      )}
    </div>
  );
};

export default MensPage;
