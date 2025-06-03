import React, { useState } from 'react';

const { createElement: h } = React;

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState({ name: '', price: '', category: 'women', image: '' });

  const handleChange = (field) => (e) => {
    setProduct(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
    setProduct({ name: '', price: '', category: 'women', image: '' });
  };

  return h('form',
    {
      onSubmit: handleSubmit,
      style: {
        maxWidth: 700,
        margin: '20px auto',
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 10,
        border: '1px solid #ddd',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }
    },

    // Product Name (takes 48% width)
    h('div', { style: formItemStyle },
      h('label', { htmlFor: 'name', style: labelStyle }, 'Product Name'),
      h('input', {
        id: 'name',
        type: 'text',
        placeholder: 'Enter product name',
        value: product.name,
        onChange: handleChange('name'),
        required: true,
        style: fullWidthInputStyle
      }),
    ),

    // Price (takes 48% width)
    h('div', { style: formItemStyle },
      h('label', { htmlFor: 'price', style: labelStyle }, 'Price (₹)'),
      h('input', {
        id: 'price',
        type: 'number',
        placeholder: 'Price',
        value: product.price,
        onChange: handleChange('price'),
        required: true,
        min: 0,
        style: fullWidthInputStyle
      }),
    ),

    // Category (takes 48% width)
    h('div', { style: formItemStyle },
      h('label', { htmlFor: 'category', style: labelStyle }, 'Category'),
      h('select', {
        id: 'category',
        value: product.category,
        onChange: handleChange('category'),
        style: fullWidthSelectStyle
      },
        h('option', { value: 'women' }, 'Women'),
        h('option', { value: 'men' }, 'Men'),
        h('option', { value: 'kids' }, 'Kids')
      ),
    ),

    // Image URL (takes 48% width)
    h('div', { style: formItemStyle },
      h('label', { htmlFor: 'image', style: labelStyle }, 'Image URL'),
      h('input', {
        id: 'image',
        type: 'url',
        placeholder: 'Paste image URL here',
        value: product.image,
        onChange: handleChange('image'),
        required: true,
        style: fullWidthInputStyle
      }),
    ),

    // Submit button (full width)
    h('button', {
      type: 'submit',
      style: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '14px 0',
        border: 'none',
        borderRadius: 6,
        fontSize: 18,
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: '100%',
        userSelect: 'none',
        marginTop: 8,
      },
      onMouseEnter: e => e.currentTarget.style.backgroundColor = '#0056b3',
      onMouseLeave: e => e.currentTarget.style.backgroundColor = '#007bff',
    }, 'Add Product')
  );
};

const formItemStyle = {
  flex: '1 1 48%',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 280,
};

const labelStyle = {
  marginBottom: 8,
  fontWeight: 600,
  color: '#333',
  fontSize: 15,
  userSelect: 'none'
};

const fullWidthInputStyle = {
  padding: '12px 14px',
  borderRadius: 6,
  border: '1.5px solid #ccc',
  fontSize: 16,
  outline: 'none',
  transition: 'border-color 0.25s ease',
  width: '100%',
  boxSizing: 'border-box'
};

const fullWidthSelectStyle = {
  padding: '12px 14px',
  borderRadius: 6,
  border: '1.5px solid #ccc',
  fontSize: 16,
  cursor: 'pointer',
  outline: 'none',
  transition: 'border-color 0.25s ease',
  width: '100%',
  boxSizing: 'border-box'
};

export default ProductForm;
