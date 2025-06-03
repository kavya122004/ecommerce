import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDelete, onEdit  }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {products.map((product) => (
        <ProductCard 
          key={product._id || product.id} 
          product={product} 
          onDelete={onDelete} // Make sure this is handled inside ProductCard
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProductList;
