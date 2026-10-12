import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

export const ProductGrid = ({ products, onQuickView }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-grid-msg">
        <p>No handcrafted pieces found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="product-grid" id="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
