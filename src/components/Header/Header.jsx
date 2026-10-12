
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X
} from 'lucide-react';

import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Header.css';

export const Header = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  const location = useLocation();
  const navigate = useNavigate();

  /* =========================================
     SCROLL DETECTION
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* =========================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ========================================= */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* =========================================
          ANNOUNCEMENT BAR
      ========================================= */}

      <div className="announcement-bar">
        <span>
          Handcrafted with care
          <span className="announcement-dot">•</span>
          Free shipping on all domestic orders above ₹2,000
        </span>
      </div>


      {/* =========================================
          MAIN HEADER
      ========================================= */}

      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="container header-content">

          {/* =====================================
              MOBILE MENU BUTTON
          ===================================== */}

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            type="button"
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>


          {/* =====================================
              LOGO
          ===================================== */}

          <Link to="/" className="brand-logo">

            <span className="logo-text">
              CLAY &amp; EARTH
            </span>

            <span className="logo-sub">
              STUDIO POTTERY
            </span>

          </Link>


          {/* =====================================
              DESKTOP NAVIGATION
          ===================================== */}

          <nav className="desktop-nav">

            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              HOME
            </Link>

            <Link
              to="/shop"
              className={location.pathname === '/shop' ? 'active' : ''}
            >
              SHOP
            </Link>

            <a
              href="#collections"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  e.preventDefault();
                  navigate('/#collections');
                }
              }}
            >
              COLLECTION
            </a>

            <a
              href="#about"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  e.preventDefault();
                  navigate('/#about');
                }
              }}
            >
              ABOUT
            </a>

          </nav>


          {/* =====================================
              HEADER ACTIONS
          ===================================== */}

          <div className="header-actions">

            {/* Search */}

            <button
              className="icon-btn"
              onClick={onOpenSearch}
              title="Search Products"
              aria-label="Search"
              type="button"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>


            {/* Wishlist */}

            <button
              className="icon-btn wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Wishlist"
              aria-label="Wishlist"
              type="button"
            >
              <Heart size={20} strokeWidth={1.5} />

              {wishlistCount > 0 && (
                <span className="badge">
                  {wishlistCount}
                </span>
              )}
            </button>


            {/* Account */}

            <button
              className="icon-btn"
              onClick={() =>
                alert(
                  'Customer Portal: Connect to Shopify Customer Account'
                )
              }
              title="Account"
              aria-label="Account"
              type="button"
            >
              <User size={20} strokeWidth={1.5} />
            </button>


            {/* Cart */}

            <button
              className="icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="Shopping Cart"
              aria-label="Cart"
              type="button"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="badge">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>


        {/* =========================================
            MOBILE NAVIGATION
        ========================================= */}

        <div
          className={`mobile-nav-drawer ${
            mobileMenuOpen ? 'open' : ''
          }`}
        >

          <div className="mobile-nav-header">

            <span className="brand-logo-sm">
              CLAY &amp; EARTH
            </span>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              type="button"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

          </div>


          <div className="mobile-nav-links">

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>

            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
            >
              SHOP
            </Link>

            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
            >
              COLLECTION
            </a>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </a>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
            >
              CART ({cartCount})
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
            >
              WISHLIST ({wishlistCount})
            </Link>

          </div>

        </div>

      </header>
    </>
  );
};

export default Header;
