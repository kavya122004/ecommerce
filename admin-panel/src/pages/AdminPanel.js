import React, { useState, useEffect } from 'react';
import { useProducts } from '../ProductsContext';
import ProductList from '../components/ProductList';
import './AdminPanel.css';

const AdminPanel = () => {
  const { products, loading, fetchProducts, addProduct, deleteProduct, updateProduct } = useProducts();
  const initialForm = {
    name: '', price: '', description: '',
    category: 'women', image: '',
    images: [''], // start with one URL field
    sizes: [], specifications: {}
  };
  const [formData, setFormData] = useState(initialForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched && !loading && products.length === 0) {
      fetchProducts();
      setHasFetched(true);
    }
  }, [hasFetched, loading, products.length, fetchProducts]);

  const handleImageChange = (i, val) => {
    const imgs = [...formData.images];
    imgs[i] = val;
    setFormData({ ...formData, images: imgs });
  };

  const handleAddImage = () =>
    setFormData({ ...formData, images: [...formData.images, ''] });

  const handleRemoveImage = (i) =>
    setFormData({ ...formData, images: formData.images.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,

      images: formData.images.filter(u => u.trim()),
    };  console.log('Payload being sent:', payload);

    if (isEditMode && editingProductId) await updateProduct(editingProductId, payload);
    else await addProduct(payload);

    setFormData(initialForm);
    setIsEditMode(false);
    setEditingProductId(null);
  };

  const handleEdit = (p) => {
    setFormData({
      name: p.name || '',
      price: p.price?.toString() || '',
      description: p.description || '',
      category: p.category || 'women',
      image: p.image || '',
      images: p.images?.length ? p.images : [''],
      sizes: p.sizes || [],
      specifications: p.specifications ? Object.fromEntries(p.specifications) : {},
    });
    setIsEditMode(true);
    setEditingProductId(p._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="admin-panel-container">
      <div className="add-product-form-container">
        <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Main Fields */}
          <div className="form-row">
            <input type="text" placeholder="Name" value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            <input type="number" placeholder="Price" value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })} required />
            <select value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}>
              {['women','men','kids','gift','beauty'].map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
            <input type="text" placeholder="Main Image URL" value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })} />
          </div>

          <textarea placeholder="Description" value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })} />

          <input type="text" placeholder="Sizes (comma-separated)" value={formData.sizes.join(',')}
            onChange={e => setFormData({
              ...formData,
              sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
            })} />

          {/* Dynamic Image URL Fields */}
          <div className="image-fields-container">
            <h4>Additional Image URLs</h4>
            {formData.images.map((url, i) => (
              <div key={i} className="form-row image-field-row">
                <input type="text" placeholder={`Image URL ${i + 1}`} value={url}
                  onChange={e => handleImageChange(i, e.target.value)} />
                {formData.images.length > 1 && (
                  <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage(i)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-image-btn" onClick={handleAddImage}>
              + Add Image
            </button>
          </div>

          {/* Specifications */}
          <div className="specifications-inputs">
            <h4>Specifications</h4>
            {Object.entries(formData.specifications).map(([k, v], i) => (
              <div key={i} className="spec-row">
                <input type="text" placeholder="Key" value={k}
                  onChange={e => {
                    const sp = { ...formData.specifications };
                    const nk = e.target.value;
                    sp[nk] = sp[k];
                    delete sp[k];
                    setFormData({ ...formData, specifications: sp });
                  }} />
                <input type="text" placeholder="Value" value={v}
                  onChange={e => {
                    const sp = { ...formData.specifications };
                    sp[k] = e.target.value;
                    setFormData({ ...formData, specifications: sp });
                  }} />
                <button type="button" className="remove-spec-btn"
                  onClick={() => {
                    const sp = { ...formData.specifications };
                    delete sp[k];
                    setFormData({ ...formData, specifications: sp });
                  }}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="add-spec-btn"
              onClick={() => setFormData({
                ...formData,
                specifications: { ...formData.specifications, '': '' }
              })}>
              + Add Spec
            </button>
          </div>

          <button type="submit" className="submit-btn">
            {isEditMode ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      <div className="product-list-container">
        <h2>Product List</h2>
        {loading ? <p>Loading...</p> :
          products.length === 0 ? <p>No products available.</p> :
            <ProductList products={products} onDelete={deleteProduct} onEdit={handleEdit} />}
      </div>
    </div>
  );
};

export default AdminPanel;
