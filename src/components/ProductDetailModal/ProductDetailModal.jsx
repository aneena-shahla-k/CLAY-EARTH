import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Minus, Plus, Zap } from 'lucide-react';
import { ProductGallery } from '../ProductGallery/ProductGallery';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import './ProductDetailModal.css';

export const ProductDetailModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // details, specs, shipping
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    navigate('/checkout');
    if (onClose) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        <div className="modal-content-grid">
          {/* LEFT: Product Gallery */}
          <div className="modal-left">
            <ProductGallery product={product} />
          </div>

          {/* RIGHT: Details & Buy Actions */}
          <div className="modal-right">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-product-title">{product.name}</h2>

            {/* Rating */}
            <div className="rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < Math.floor(product.rating) ? "#A65D3B" : "none"}
                    color="#A65D3B"
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating}</span>
              <span className="rating-count">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="modal-price-row">
              <span className="modal-current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="modal-original-price">{formatPrice(product.originalPrice)}</span>
              )}
              <span className="tax-inclusive">Inclusive of all taxes</span>
            </div>

            <p className="modal-short-desc">{product.shortDescription}</p>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <span className="section-label">QUANTITY</span>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions-row">
              <button className="btn-primary flex-1" onClick={handleAddToCart}>
                <ShoppingBag size={18} /> ADD TO CART
              </button>

              <button className="btn-buy-now" onClick={handleBuyNow}>
                <Zap size={18} /> BUY NOW
              </button>

              <button
                className={`wishlist-modal-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isLiked ? "#A65D3B" : "none"} color={isLiked ? "#A65D3B" : "#2D241F"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges-row">
              <div className="trust-item">
                <Truck size={18} />
                <span>Free shipping &gt; ₹2,000</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={18} />
                <span>100% Authentic Handcrafted</span>
              </div>
              <div className="trust-item">
                <RefreshCw size={18} />
                <span>Safe Delivery Guarantee</span>
              </div>
            </div>

            {/* Accordions / Spec Tabs */}
            <div className="spec-tabs-wrapper">
              <div className="spec-tab-headers">
                <button
                  className={activeTab === 'details' ? 'active' : ''}
                  onClick={() => setActiveTab('details')}
                >
                  DESCRIPTION
                </button>
                <button
                  className={activeTab === 'specs' ? 'active' : ''}
                  onClick={() => setActiveTab('specs')}
                >
                  SPECIFICATIONS
                </button>
                <button
                  className={activeTab === 'shipping' ? 'active' : ''}
                  onClick={() => setActiveTab('shipping')}
                >
                  SHIPPING & CARE
                </button>
              </div>

              <div className="spec-tab-content">
                {activeTab === 'details' && (
                  <div className="tab-pane">
                    <p>{product.description}</p>
                    <p className="origin-note">
                      <strong>Craft Origin:</strong> {product.craftOrigin}
                    </p>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="tab-pane specs-table">
                    <div className="spec-row">
                      <span className="spec-name">Material</span>
                      <span className="spec-val">{product.material}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-name">Finish</span>
                      <span className="spec-val">{product.finish}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-name">Dimensions</span>
                      <span className="spec-val">{product.dimensions}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-name">Weight</span>
                      <span className="spec-val">{product.weight}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="tab-pane">
                    <p><strong>Care Instructions:</strong> {product.care}</p>
                    <p style={{ marginTop: '10px' }}><strong>Shipping:</strong> {product.shipping}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
