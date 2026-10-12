import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import './SearchOverlay.css';

export const SearchOverlay = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      });

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="search-overlay-backdrop" onClick={onClose}>
      <div className="search-overlay-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <Search size={22} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search handcrafted pieces, vases, planters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {query.trim() === '' && (
          <div className="search-suggestions">
            <span className="suggestion-label">POPULAR SEARCHES:</span>
            <div className="suggestion-tags">
              <button onClick={() => setQuery('Vase')}>Terracotta Vases</button>
              <button onClick={() => setQuery('Candle')}>Candle Holders</button>
              <button onClick={() => setQuery('Planter')}>Planters</button>
              <button onClick={() => setQuery('Tableware')}>Tableware</button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() !== '' && (
          <div className="search-results-wrapper">
            <span className="results-count">
              Found {results.length} handcrafted {results.length === 1 ? 'piece' : 'pieces'}
            </span>

            {results.length === 0 ? (
              <div className="no-results">
                <p>No products matched &ldquo;{query}&rdquo;.</p>
              </div>
            ) : (
              <div className="search-results-grid">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="search-result-item"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    <div className="result-img">
                      <img src={product.images.front} alt={product.name} />
                    </div>
                    <div className="result-info">
                      <span className="result-cat">{product.category}</span>
                      <h4 className="result-title">{product.name}</h4>
                      <p className="result-desc">{product.shortDescription}</p>
                      <span className="result-price">{formatPrice(product.price)}</span>
                    </div>
                    <ArrowRight size={18} className="result-arrow" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
