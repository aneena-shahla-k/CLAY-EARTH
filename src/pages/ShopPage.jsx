import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryNav } from '../components/CategoryNav/CategoryNav';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { productService } from '../services/productService';
import { SlidersHorizontal } from 'lucide-react';

export const ShopPage = ({ onQuickView }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'ALL';

  const [activeCategory, setActiveCategory] = useState(catParam);
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setActiveCategory(catParam);
  }, [catParam]);

  useEffect(() => {
    productService.getProducts({ category: activeCategory, sort: sortBy }).then((data) => {
      setProducts(data);
    });
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'ALL') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="shop-page-wrapper" style={{ padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        <div className="shop-header" style={{ marginBottom: '32px', textAlign: 'center' }}>
          <span className="section-subtitle">THE COMPLETE CATALOG</span>
          <h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '8px' }}>
            Handcrafted Pottery &amp; Home D&eacute;cor
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Browse our entire collection of clay vessels, planters, candle holders and tableware shaped slowly by hand.
          </p>
        </div>

        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Sort and Count Controls */}
        <div
          className="shop-controls-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Showing <strong>{products.length}</strong> handcrafted pieces
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={16} color="var(--accent-terracotta)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em' }}>
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 14px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-warm)',
                color: 'var(--text-dark)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <ProductGrid products={products} onQuickView={onQuickView} />
      </div>
    </div>
  );
};
