import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, ArrowRight } from 'lucide-react';
import './OrderSuccessPage.css';

export const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Fallback demo order if visited directly
  const demoOrder = order || {
    orderId: 'CE10248',
    createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    items: [
      {
        name: 'Terracotta Harmony Vase',
        price: 2490,
        quantity: 1,
        images: { front: '/assets/products/product-01-front.jpg' },
      },
      {
        name: 'Sandstone Earthenware Set',
        price: 2490,
        quantity: 1,
        images: { front: '/assets/products/product-08-front.jpg' },
      },
    ],
    shippingAddress: {
      firstName: 'Aneena',
      lastName: 'Shahla',
      address: '12 Studio Lane, Fort Kochi',
      apartment: 'Suite 4B',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682001',
    },
    total: 4980,
    paymentMethod: 'UPI (INSTANT)',
    transactionId: 'TXN_9812401824_UPI',
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="order-success-wrapper">
      <div className="container">
        <div className="success-card">
          <div className="success-icon-badge">
            <CheckCircle size={48} color="#A65D3B" />
          </div>

          <span className="success-tag">THANK YOU FOR YOUR ORDER</span>
          <h1 className="success-title">ORDER CONFIRMED</h1>
          <p className="success-sub">
            Thank you for supporting handmade craftsmanship. Your order has been received and our Kerala artisans are carefully preparing your piece.
          </p>

          <div className="order-number-banner">
            <span className="num-label">ORDER NUMBER:</span>
            <span className="num-value">#{demoOrder.orderId}</span>
          </div>

          <div className="success-details-grid">
            {/* Delivery Timeline */}
            <div className="detail-box">
              <div className="box-title">
                <Truck size={18} color="#A65D3B" /> Delivery Estimate
              </div>
              <p className="box-text">3–5 Working Days</p>
              <span className="box-sub">Eco-friendly reinforced crate shipping</span>
            </div>

            {/* Payment Status */}
            <div className="detail-box">
              <div className="box-title">
                <Package size={18} color="#A65D3B" /> Payment Info
              </div>
              <p className="box-text">{demoOrder.paymentMethod}</p>
              <span className="box-sub">ID: {demoOrder.transactionId}</span>
            </div>

            {/* Shipping Address */}
            <div className="detail-box">
              <div className="box-title">
                <Calendar size={18} color="#A65D3B" /> Shipping Address
              </div>
              <p className="box-text">
                {demoOrder.shippingAddress.firstName} {demoOrder.shippingAddress.lastName}
              </p>
              <span className="box-sub">
                {demoOrder.shippingAddress.address}, {demoOrder.shippingAddress.city}, {demoOrder.shippingAddress.state} - {demoOrder.shippingAddress.pincode}
              </span>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="confirmed-items-section">
            <h3 className="section-title">Items Ordered</h3>
            <div className="confirmed-items-list">
              {demoOrder.items.map((item, idx) => (
                <div key={idx} className="confirmed-item-row">
                  <div className="c-item-img">
                    <img src={item.images.front} alt={item.name} />
                  </div>
                  <div className="c-item-info">
                    <h4 className="c-item-name">{item.name}</h4>
                    <span className="c-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="c-item-price">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="confirmed-total-row">
              <span>Total Paid:</span>
              <span className="final-price">{formatPrice(demoOrder.total)}</span>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/shop" className="btn-primary">
              CONTINUE SHOPPING <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
