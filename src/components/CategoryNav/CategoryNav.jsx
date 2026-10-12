import React from 'react';
import { CATEGORIES } from '../../data/products';
import './CategoryNav.css';

export const CategoryNav = ({ activeCategory, onSelectCategory }) => {
  return (
    <nav className="category-nav-wrapper">
      <div className="category-scroll-container">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
