import { useEffect, useState } from 'react';
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
  const { user } = useAuth();
  const { getProductById, fetchProducts, categoryProducts } = useProducts();

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const found = await getProductById(id);
        setProduct(found);
        setMainImage(found.image);
        if (!categoryProducts[found.category]) {
          await fetchProducts(found.category);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (product && categoryProducts[product.category]) {
      setSuggestions(
        categoryProducts[product.category].filter(p => p._id !== product._id)
      );
    }
  }, [product, categoryProducts]);

  const images = [product?.image, ...(product?.images || [])];

  const handleThumbnailClick = (url) => {
    setMainImage(url);
  };

  const handleBuyNow = () => {
    if (!user) { navigate('/login'); return; }
    buyNow(product, navigate);
  };
  const handleWishlist = () => {
    if (!user) { navigate('/login'); return; }
    addToWishlist(product);
  };

  if (loading || !product) return <div className="loader"></div>;

  return (
    <div className="product-details-container">
      <div className="product-detail-card">
        <div className="image-section">
          <img src={mainImage} alt={product.name} />
          {/* Thumbnail grid */}
          {images.length > 1 && (
            <div className="thumbnail-grid">
              {images.map((url, idx) => (
                <div
                  key={idx}
                  className={`thumb ${url === mainImage ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(url)}
                >
                  <img src={url} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
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
                {product.sizes.map((s, i) => (
                  <span key={i} className="size">{s}</span>
                ))}
              </div>
            ) : <p>No sizes available</p>}
          </div>

          <div className="actions">
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            <button className="add-to-cart" onClick={handleWishlist}>Add to Wishlist</button>
          </div>
        </div>
      </div>

      <div className="suggestions-section">
        <h2>You May Also Like</h2>
        {suggestions.length > 0 ? <ProductList products={suggestions} /> : <p>No suggestions available.</p>}
      </div>
    </div>
  );
};

export default ProductDetails;
