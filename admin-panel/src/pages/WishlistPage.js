import React, { useEffect } from 'react';
import { useWishlist } from '../WishlistContext';
import ProductList from '../components/ProductList';

const WishlistPage = () => {
  const { wishlist, fetchWishlist } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-page" style={{ padding: '40px', textAlign: 'center' }}>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div style={{ marginTop: '60px' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty Wishlist"
            style={{ width: '150px', opacity: 0.7 }}
          />
          <h2 style={{ marginTop: '20px', color: '#555' }}>Your wishlist is empty</h2>
          <p style={{ color: '#888', fontSize: '16px' }}>
            Start exploring and add items you love to your wishlist.
          </p>
        </div>
      ) : (
        <ProductList products={wishlist} />
      )}
    </div>
  );
};

export default WishlistPage;
