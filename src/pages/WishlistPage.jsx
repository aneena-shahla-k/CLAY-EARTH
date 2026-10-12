import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage = ({ onQuickView }) => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="wishlist-page-wrapper" style={{ padding: '60px 0 90px 0', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-subtitle">SAVED PIECES</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 500, marginBottom: '8px' }}>
            Your Wishlist ({wishlistItems.length})
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Your curated collection of handcrafted ceramics and terracotta treasures.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-terracotta-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
              }}
            >
              <Heart size={36} color="#A65D3B" />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '12px' }}>
              Your wishlist is waiting for something beautiful.
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Click the heart icon on any piece to save it here for later.
            </p>
            <Link to="/shop" className="btn-primary">
              EXPLORE PRODUCTS <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <ProductGrid products={wishlistItems} onQuickView={onQuickView} />
        )}
      </div>
    </div>
  );
};
