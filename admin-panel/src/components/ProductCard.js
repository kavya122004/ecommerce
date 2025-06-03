import React from 'react';
import { useWishlist } from '../WishlistContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaEdit  } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import './ProductCard.css'; // Ensure you have matching CSS

const ProductCard = ({ product, onDelete, onEdit }) => {
  const { user } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent navigating when clicking icon
    if (!user) return;
    isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent navigation
    if (onEdit) onEdit(product); // Call parent-provided edit handler
  };


  return (
    <div className="product-card-container">
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          <img src={product.image} alt={product.name} className="product-card-image" />
          {user && (
            <button
              onClick={handleWishlistClick}
              className="product-card-wishlist-btn"
              aria-label="Toggle Wishlist"
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>

          )}
          {user && onEdit && (
            <button
              className="edit-btn"
              onClick={handleEditClick}
              aria-label="Edit Product"
            >
              <FaEdit />
            </button>
          )}
        </div>
        <div className="product-card-info">
          <h4 className="product-card-name">{product.name}</h4>
          <p className="product-card-price">₹ {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
