import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

export const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  // Format currency in INR
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img
          src={isHovered && product.images.side ? product.images.side : product.images.front}
          alt={product.name}
          className="product-image"
        />

        {product.isNew && <span className="product-tag new-tag">NEW</span>}

        {/* Wishlist Button */}
        <button
          className={`wishlist-heart-btn ${isLiked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={isLiked ? "#A65D3B" : "none"} color={isLiked ? "#A65D3B" : "#2D241F"} />
        </button>

        {/* Quick Actions Hover Overlay */}
        <div className="product-card-overlay">
          <button
            className="card-quickview-btn"
            onClick={() => onQuickView(product)}
          >
            <Eye size={15} /> QUICK VIEW
          </button>
          <button
            className="card-add-cart-btn"
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingBag size={15} /> ADD TO CART
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>
        <p className="product-short-desc">{product.shortDescription}</p>
        
        <div className="product-price-row">
          <div className="price-wrapper">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            className="icon-add-cart"
            onClick={() => addToCart(product, 1)}
            title="Add to Cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
