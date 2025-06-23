import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDelete, onEdit, isHomePage }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isHomePage 
          ? 'repeat(auto-fill, minmax(250px, 1fr))' 
          : 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        padding: '16px',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      {products.map((product) => (
        <div 
          key={product._id || product.id}
          style={{
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
          className="product-card-wrapper"
        >
          <ProductCard
            product={product}
            onDelete={onDelete}
            onEdit={onEdit}
            cardStyle={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              transition: 'all 0.3s ease',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            contentStyle={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column'
            }}
            imageStyle={{
              width: '100%',
              height: isHomePage ? '180px' : '220px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '16px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px dashed rgba(255,255,255,0.1)'
            }}
            titleStyle={{
              fontSize: isHomePage ? '1.1rem' : '1.2rem',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'white'
            }}
            priceStyle={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#ff7a8a',
              marginTop: 'auto'
            }}
            buttonContainerStyle={{
              display: 'flex',
              gap: '10px',
              marginTop: '16px'
            }}
            editButtonStyle={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flex: 1
            }}
            deleteButtonStyle={{
              background: 'rgba(255, 122, 138, 0.2)',
              color: '#ff7a8a',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flex: 1
            }}
            isHomePage={isHomePage}
          />
        </div>
      ))}
    </div>
  );
};

// Add hover effect using CSS
const style = document.createElement('style');
style.innerHTML = `
  .product-card-wrapper:hover {
    transform: translateY(-8px) !important;
  }
  
  .product-card-wrapper:hover .product-card {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2) !important;
    background: linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1)) !important;
  }
  
  .edit-button:hover {
    background: rgba(255, 255, 255, 0.25) !important;
  }
  
  .delete-button:hover {
    background: rgba(255, 122, 138, 0.3) !important;
  }
`;
document.head.appendChild(style);

export default ProductList;