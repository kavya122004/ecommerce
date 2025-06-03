import React, { useState, useEffect } from 'react';
import { useProducts } from '../ProductsContext'; // Import the context
import ProductList from '../components/ProductList'; // Import the ProductList component
import './AdminPanel.css';

const AdminPanel = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const { products, loading, fetchProducts, addProduct, deleteProduct, updateProduct } = useProducts(); // Destructure required functions and state from context
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'women',
    image: ''
  });

  const [hasFetched, setHasFetched] = useState(false); // State to track if products have been fetched

  // Fetch products from the context on component mount, but only if they haven't been fetched yet
  useEffect(() => {
    if (!hasFetched && products.length === 0 && !loading) {
      fetchProducts();
      setHasFetched(true); // Set the flag to true after fetching
    }
  }, [fetchProducts, products.length, loading, hasFetched]);

  // Handle adding a product to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (isEditMode && editingProductId) {
        // Update existing product
        await updateProduct(editingProductId, productData);
        setIsEditMode(false);
        setEditingProductId(null);
      } else {
        // Add new product
        await addProduct(productData);
      }

      // Reset form
      setFormData({ name: '', price: '', category: 'women', image: '' });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };


  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id); // Delete product using context's deleteProduct function
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name || '',
      price: product.price || '',
      category: product.category || 'women',
      image: product.image || '',
      images: product.images || [],
      sizes: product.sizes || [],
      description: product.description || '',
      specifications: product.specifications
        ? Object.fromEntries(product.specifications)
        : {},
    });

    setIsEditMode(true);
    setEditingProductId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="admin-panel-container">
      {/* Add New Product Form */}
      <div className="add-product-form-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
              <option value="gift">Gift</option>
            </select>
            <input
              type="text"
              placeholder="Main Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          {/* New Fields Below */}
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Additional Image URLs (comma-separated)"
            value={formData.images?.join(',') || ''}
            onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',') })}
          />

          <input
            type="text"
            placeholder="Available Sizes (comma-separated)"
            value={formData.sizes?.join(',') || ''}
            onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(',') })}
          />

          <div className="specifications-inputs">
            <h4>Specifications (key-value)</h4>
            {Object.entries(formData.specifications || {}).map(([key, value], index) => (
              <div key={index} className="spec-row">
                <input
                  type="text"
                  placeholder="Key"
                  value={key}
                  onChange={(e) => {
                    const updated = { ...formData.specifications };
                    const newKey = e.target.value;
                    updated[newKey] = updated[key];
                    delete updated[key];
                    setFormData({ ...formData, specifications: updated });
                  }}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => {
                    const updated = { ...formData.specifications };
                    updated[key] = e.target.value;
                    setFormData({ ...formData, specifications: updated });
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...formData.specifications };
                    delete updated[key];
                    setFormData({ ...formData, specifications: updated });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, '': '' },
                });
              }}
            >
              + Add Spec
            </button>
          </div>

          <button type="submit">
            {isEditMode ? 'Update Product' : 'Add Product'}
          </button>



        </form>

      </div>

      {/* Product List Section */}
      <div className="product-list-container">
        <h2>Product List</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ProductList products={products} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
