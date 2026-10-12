import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    grandTotal,
    cartCount,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={20} className="terracotta-icon" />
            <h2>SHOPPING CART ({cartCount})</h2>
          </div>
          <button className="drawer-close" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="drawer-empty-state">
            <div className="empty-icon-circle">
              <ShoppingBag size={36} color="#A65D3B" />
            </div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any handcrafted pieces yet.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/shop');
              }}
            >
              EXPLORE COLLECTION
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              <div className="cart-item-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-img">
                      <img src={item.images.front} alt={item.name} />
                    </div>
                    <div className="cart-details">
                      <div className="cart-name-row">
                        <h4 className="cart-item-title">{item.name}</h4>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <span className="cart-item-price">{formatPrice(item.price)}</span>

                      <div className="cart-qty-row">
                        <div className="cart-qty-control">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="cart-item-subtotal">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer Summary */}
            <div className="cart-drawer-footer">
              <div className="free-shipping-progress">
                {subtotal >= 2000 ? (
                  <span className="shipping-unlocked">
                    🎉 You've unlocked <strong>FREE Shipping</strong>!
                  </span>
                ) : (
                  <span className="shipping-needed">
                    Add <strong>{formatPrice(2000 - subtotal)}</strong> more for FREE Shipping!
                  </span>
                )}
              </div>

              <div className="summary-line">
                <span>Subtotal</span>
                <span className="bold-val">{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-line">
                <span>Estimated Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>

              <div className="summary-line total-line">
                <span>Total</span>
                <span className="grand-total-val">{formatPrice(grandTotal)}</span>
              </div>

              <div className="cart-drawer-buttons">
                <button className="btn-secondary flex-1" onClick={handleViewCart}>
                  VIEW CART
                </button>
                <button className="btn-primary flex-1" onClick={handleCheckout}>
                  CHECKOUT <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
