import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../ProductsContext';
import { useOrder } from '../OrderContext';
import { useWishlist } from '../WishlistContext';
import { useAuth } from '../AuthContext';
import ProductList from '../components/ProductList';
import './ProductDetails.css';

const ProductDetails = () => {
  const { buyNow } = useOrder();
  const { addToWishlist } = useWishlist();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    getProductById,
    fetchProducts,
    categoryProducts,

  } = useProducts();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load product details
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const found = await getProductById(id);
        setProduct(found);

        // Fetch related products only if not already available
        if (!categoryProducts[found.category]) {
          await fetchProducts(found.category);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading product:', error);
        setLoading(false);
      }
    };

    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Prepare suggestions once product and categoryProducts are ready
  useEffect(() => {
    if (product && categoryProducts[product.category]) {
      const filtered = categoryProducts[product.category].filter(
        (p) => p.id !== product.id
      );
      setSuggestions(filtered);
    }
  }, [product, categoryProducts]);

  const handleBuyNow = () => {
    if (!user) {
      alert('Please log in to continue.');
      navigate('/login');
      return;
    }
    buyNow(product, navigate);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      alert('Please log in to continue.');
      navigate('/login');
      return;
    }
    addToWishlist(product);
    alert('Added to Wishlist!');
  };

  if (loading || !product) {
    return (
      <div className="loading-spinner-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-detail-card">
        <div className="image-section">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="info-section">
          <h1>{product.name}</h1>
          <p className="price">₹{product.price}</p>
          <p className="category">Category: {product.category}</p>

          <div className="description">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>

          <div className="sizes">
            <h3>Sizes</h3>
            {product.sizes?.length > 0 ? (
              <div className="size-options">
                {product.sizes.map((size, index) => (
                  <span key={index} className="size">{size}</span>
                ))}
              </div>
            ) : (
              <p>No sizes available</p>
            )}
          </div>

          <div className="actions">
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            <button className="add-to-cart" onClick={handleAddToWishlist}>Add to Wishlist</button>
          </div>
        </div>
      </div>

      <div className="suggestions-section">
        <h2>You May Also Like</h2>
        {suggestions.length > 0 ? (
          <ProductList products={suggestions} />
        ) : (
          <p>No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
