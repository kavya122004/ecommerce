import React, { useState, useEffect } from 'react';
import { useWishlist } from '../WishlistContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaEdit } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import './ProductCard.css';

const ProductCard = ({ product, onEdit }) => {
  const { user } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item._id === product._id);

  // Combine main image + additional images
  const images = [product.image, ...(product.images || [])];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through images every 3 seconds if multiple exist
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(i => (i + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const handleWishlistClick = e => {
    e.preventDefault();
    if (!user) return;
    isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  const handleEditClick = e => {
    e.preventDefault();
    onEdit?.(product);
  };

  return (
    <div className="product-card-container">
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          <img
            src={images[currentIndex]}
            alt={product.name}
            className="product-card-image"
          />
          {user && (
            <>
              <button
                onClick={handleWishlistClick}
                className="product-card-wishlist-btn"
                aria-label="Toggle Wishlist"
              >
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              </button>
              {onEdit && (
                <button
                  className="edit-btn"
                  onClick={handleEditClick}
                  aria-label="Edit Product"
                >
                  <FaEdit />
                </button>
              )}
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="image-dots">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}

        <div className="product-card-info">
          <h4 className="product-card-name">{product.name}</h4>
          <p className="product-card-price">₹ {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
