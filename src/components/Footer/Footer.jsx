import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Globe, Heart } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            CLAY &amp; EARTH
          </Link>
          <p className="footer-brand-desc">
            Handcrafted pottery and home d&eacute;cor inspired by natural materials and timeless forms.
          </p>
          <div className="social-icons-row">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Globe size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Share2 size={18} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
              <Heart size={18} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">SHOP</h4>
          <ul className="footer-link-list">
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop?cat=VASES">Terracotta Vases</Link></li>
            <li><Link to="/shop?cat=PLANTERS">Clay Planters</Link></li>
            <li><Link to="/shop?cat=CANDLE HOLDERS">Candle Holders</Link></li>
            <li><Link to="/shop?cat=TABLEWARE">Tableware Sets</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">QUICK LINKS</h4>
          <ul className="footer-link-list">
            <li><Link to="/about">About Our Studio</Link></li>
            <li><Link to="/about#artisans">Artisan Stories</Link></li>
            <li><Link to="/cart">View Cart</Link></li>
            <li><Link to="/wishlist">Your Wishlist</Link></li>
            <li><a href="#contact">Contact Studio</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">HELP &amp; INFO</h4>
          <ul className="footer-link-list">
            <li><a href="#shipping">Shipping &amp; Delivery</a></li>
            <li><a href="#returns">Returns &amp; Exchange</a></li>
            <li><a href="#care">Care Guide</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="copyright-text">
          &copy; 2026 Clay &amp; Earth. All rights reserved. Designed for Shopify Storefront.
        </div>
        <div className="payment-badges">
          <span className="pay-badge">VISA</span>
          <span className="pay-badge">MASTERCARD</span>
          <span className="pay-badge">RUPAY</span>
          <span className="pay-badge">UPI</span>
        </div>
      </div>
    </footer>
  );
};
