// components/CategorySlider.js
import React, { useRef } from 'react';
import ProductList from './ProductList';
import './CategorySlider.css';

const CategorySlider = ({ title, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="category-slider">
      <h2 className="category-title">{title}</h2>
      <div className="slider-wrapper">
        <button className="slider-arrow left" onClick={() => scroll('left')}>
          &lt;
        </button>
        <div className="scroll-container" ref={scrollRef}>
          <ProductList products={products} />
        </div>
        <button className="slider-arrow right" onClick={() => scroll('right')}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
