import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './WishlistDrawer.css';

export const WishlistDrawer = () => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  const handleExplore = () => {
    setIsWishlistOpen(false);
    navigate('/shop');
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <Heart size={20} className="terracotta-icon" fill="#A65D3B" />
            <h2>YOUR WISHLIST ({wishlistItems.length})</h2>
          </div>
          <button className="drawer-close" onClick={() => setIsWishlistOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="drawer-empty-state">
            <div className="empty-icon-circle">
              <Heart size={36} color="#A65D3B" />
            </div>
            <h3>Your wishlist is waiting for something beautiful.</h3>
            <p>Save items you love to revisit them anytime.</p>
            <button className="btn-primary" onClick={handleExplore}>
              EXPLORE PRODUCTS
            </button>
          </div>
        ) : (
          <div className="drawer-body">
            <div className="wishlist-item-list">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <div className="wishlist-img">
                    <img src={item.images.front} alt={item.name} />
                  </div>
                  <div className="wishlist-details">
                    <span className="item-cat">{item.category}</span>
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-price">{formatPrice(item.price)}</span>

                    <div className="item-actions">
                      <button
                        className="btn-move-cart"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingBag size={14} /> MOVE TO CART
                      </button>
                      <button
                        className="btn-remove-wishlist"
                        onClick={() => toggleWishlist(item.id)}
                        title="Remove from Wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
