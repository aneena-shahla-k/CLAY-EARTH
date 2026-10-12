import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    discountAmount,
    grandTotal,
    promoCode,
    promoError,
    promoSuccess,
    applyPromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState(promoCode || '');
  const navigate = useNavigate();

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyPromoCode(inputCode);
  };

  return (
    <div className="cart-page-wrapper">
      <div className="container">
        <div className="cart-page-header">
          <h1 className="cart-page-title">Your Cart</h1>
          <span className="cart-item-count">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your shopping bag
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-box">
            <div className="empty-icon-circle">
              <ShoppingBag size={48} color="#A65D3B" />
            </div>
            <h2>Your cart feels a bit light.</h2>
            <p>Explore our handcrafted terracotta collection and bring home timeless artistry.</p>
            <Link to="/shop" className="btn-primary">
              EXPLORE COLLECTION <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="cart-page-grid">
            {/* LEFT: Cart Items List */}
            <div className="cart-items-column">
              <div className="cart-table-header">
                <span>PRODUCT</span>
                <span>PRICE</span>
                <span>QUANTITY</span>
                <span>SUBTOTAL</span>
              </div>

              <div className="cart-table-body">
                {cart.map((item) => (
                  <div key={item.id} className="cart-table-row">
                    <div className="col-product">
                      <div className="row-img">
                        <img src={item.images.front} alt={item.name} />
                      </div>
                      <div className="row-info">
                        <span className="row-cat">{item.category}</span>
                        <h3 className="row-name">{item.name}</h3>
                        <button
                          className="row-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="col-price">{formatPrice(item.price)}</div>

                    <div className="col-qty">
                      <div className="page-qty-control">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="col-subtotal">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="cart-page-actions">
                <Link to="/shop" className="btn-secondary">
                  <ArrowLeft size={16} /> CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="cart-summary-column">
              <div className="summary-card">
                <h2 className="summary-title">Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Promo Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                {/* Promo Code Form */}
                <div className="promo-form-container">
                  <label className="promo-label">
                    <Tag size={14} /> Promo Code
                  </label>
                  <form onSubmit={handleApplyCoupon} className="promo-form">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. HANDMADE10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="promo-input"
                    />
                    <button type="submit" className="btn-apply">
                      APPLY
                    </button>
                  </form>
                  {promoError && <p className="promo-msg error">{promoError}</p>}
                  {promoSuccess && (
                    <p className="promo-msg success">
                      <CheckCircle2 size={14} /> {promoSuccess}
                    </p>
                  )}
                </div>

                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="grand-total">{formatPrice(grandTotal)}</span>
                </div>

                <button
                  className="btn-primary btn-full-checkout"
                  onClick={() => navigate('/checkout')}
                >
                  PROCEED TO CHECKOUT <ArrowRight size={16} />
                </button>

                <div className="summary-trust-note">
                  🔒 Guaranteed safe &amp; encrypted checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
