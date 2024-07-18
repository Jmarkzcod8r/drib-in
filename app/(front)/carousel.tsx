import React, { useState } from 'react';
import ProductItem from '@/components/products/ProductItem';

const ProductCarousel = ({ latestProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % latestProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + latestProducts.length) % latestProducts.length);
  };

  const carouselStyle = {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
  };

  const itemStyle = {
    minWidth: '33.33%', // Adjust based on how many items you want to show
    transition: 'transform 0.5s ease-in-out',
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  return (
    <div>
      <button onClick={handlePrev}>Previous</button>
      <div style={carouselStyle}>
        <div style={itemStyle}>
          {latestProducts.map((product) => (
            <ProductItem key={product.slug} product={product} />
          ))}
        </div>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ProductCarousel;
