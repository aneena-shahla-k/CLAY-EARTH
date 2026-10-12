import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, QrCode, Building2, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { shopifyService } from '../services/shopifyService';
import './CheckoutPage.css';

export const CheckoutPage = () => {
  const { cart, subtotal, shippingCost, discountAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    email: 'aneena@example.com',
    phone: '+91 98765 43210',
  });

  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'Aneena',
    lastName: 'Shahla',
    address: '12 Studio Lane, Fort Kochi',
    apartment: 'Suite 4B',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682001',
    country: 'India',
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // standard, express
  const [paymentMethod, setPaymentMethod] = useState('upi'); // card, upi, netbanking, cod
  const [upiId, setUpiId] = useState('aneena@upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const deliveryFee = deliveryMethod === 'express' ? 250 : shippingCost;
  const finalPayTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create Shopify / Backend checkout record
      const orderData = await shopifyService.createCheckout(cart, shippingAddress);

      // 2. Process payment gateway adapter
      const paymentResult = await shopifyService.processPayment({
        method: paymentMethod,
        orderId: orderData.orderId,
        amount: finalPayTotal,
      });

      if (paymentResult.success) {
        // Clear cart & navigate to order confirmation
        clearCart();
        navigate('/order-success', {
          state: {
            order: {
              ...orderData,
              total: finalPayTotal,
              shippingFee: deliveryFee,
              paymentMethod: paymentMethod.toUpperCase(),
              transactionId: paymentResult.transactionId,
            },
          },
        });
      }
    } catch (err) {
      alert('Checkout error. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page-wrapper">
        <div className="container text-center py-12">
          <h2>No items in cart for checkout</h2>
          <Link to="/shop" className="btn-primary mt-4">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrapper">
      <div className="container">
        <div className="checkout-top-bar">
          <Link to="/cart" className="back-to-cart">
            <ArrowLeft size={16} /> Return to Cart
          </Link>
          <span className="checkout-step-tag">SECURE CHECKOUT</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="checkout-grid">
          {/* LEFT: Checkout Form Steps */}
          <div className="checkout-form-column">
            {/* Step 1: Contact Info */}
            <div className="checkout-section">
              <div className="section-title-row">
                <span className="step-num">1</span>
                <h2>Contact Information</h2>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="checkout-section">
              <div className="section-title-row">
                <span className="step-num">2</span>
                <h2>Shipping Address</h2>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.firstName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.lastName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street address or P.O. Box"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Apartment, suite, unit (optional)</label>
                <input
                  type="text"
                  value={shippingAddress.apartment}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                />
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Options */}
            <div className="checkout-section">
              <div className="section-title-row">
                <span className="step-num">3</span>
                <h2>Delivery Method</h2>
              </div>
              <div className="delivery-options-grid">
                <label className={`option-card ${deliveryMethod === 'standard' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={deliveryMethod === 'standard'}
                    onChange={() => setDeliveryMethod('standard')}
                  />
                  <div className="option-info">
                    <span className="option-name">Standard Delivery (3–5 Business Days)</span>
                    <span className="option-desc">Carefully packed in eco-friendly protective crates</span>
                  </div>
                  <span className="option-price">
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </label>

                <label className={`option-card ${deliveryMethod === 'express' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={deliveryMethod === 'express'}
                    onChange={() => setDeliveryMethod('express')}
                  />
                  <div className="option-info">
                    <span className="option-name">Express Fragile Shipping (1–2 Days)</span>
                    <span className="option-desc">Priority handling with shockproof wooden box</span>
                  </div>
                  <span className="option-price">{formatPrice(250)}</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Gateway Selection */}
            <div className="checkout-section">
              <div className="section-title-row">
                <span className="step-num">4</span>
                <h2>Payment Method</h2>
              </div>

              <div className="payment-options-grid">
                {/* UPI Option */}
                <label className={`payment-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <div className="payment-card-header">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <QrCode size={20} className="pay-icon" />
                    <span className="pay-title">UPI Instant (GPay / PhonePe / Paytm)</span>
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="payment-expand-body">
                      <label className="sub-label">Enter UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="sub-input"
                      />
                      <span className="sub-hint">Instant 0% transaction fee via Razorpay / Shopify Payments</span>
                    </div>
                  )}
                </label>

                {/* Cards Option */}
                <label className={`payment-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <div className="payment-card-header">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <CreditCard size={20} className="pay-icon" />
                    <span className="pay-title">Credit / Debit Card</span>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="payment-expand-body">
                      <input type="text" placeholder="Card Number" className="sub-input mb-2" defaultValue="4111 2222 3333 4444" />
                      <div className="form-row-2">
                        <input type="text" placeholder="MM/YY" className="sub-input" defaultValue="12/28" />
                        <input type="password" placeholder="CVV" className="sub-input" defaultValue="123" />
                      </div>
                    </div>
                  )}
                </label>

                {/* NetBanking */}
                <label className={`payment-card ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                  <div className="payment-card-header">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                    />
                    <Building2 size={20} className="pay-icon" />
                    <span className="pay-title">Net Banking (HDFC / ICICI / SBI / Axis)</span>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`payment-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <div className="payment-card-header">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <Truck size={20} className="pay-icon" />
                    <span className="pay-title">Cash on Delivery (COD)</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-place-order"
            >
              {isSubmitting ? 'PROCESSING ORDER...' : `PLACE ORDER • ${formatPrice(finalPayTotal)}`}
            </button>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="checkout-summary-column">
            <div className="checkout-summary-card">
              <h3 className="summary-title">Order Summary ({cart.length})</h3>

              <div className="checkout-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <div className="item-thumb">
                      <img src={item.images.front} alt={item.name} />
                      <span className="item-badge">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <span className="item-cat">{item.category}</span>
                    </div>
                    <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="checkout-totals-box">
                <div className="c-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="c-row text-terracotta">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="c-row">
                  <span>Shipping</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="c-row total-row">
                  <span>Total Payable</span>
                  <span className="total-val">{formatPrice(finalPayTotal)}</span>
                </div>
              </div>

              <div className="checkout-guarantee">
                <ShieldCheck size={20} color="#A65D3B" />
                <span>Shopify Storefront Security • 100% Risk Free Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
