import React, { useState } from 'react';
import { RotateCw, Image as ImageIcon } from 'lucide-react';
import { Product360 } from '../Product360/Product360';
import './ProductGallery.css';

export const ProductGallery = ({ product }) => {
  const [activeAngleKey, setActiveAngleKey] = useState('front');
  const [show360View, setShow360View] = useState(false);

  if (!product) return null;

  const angleImages = [
    { key: 'front', label: 'Front Angle', src: product.images.front },
    { key: 'side', label: 'Side Angle', src: product.images.side },
    { key: 'back', label: 'Back Angle', src: product.images.back },
    { key: 'detail', label: 'Craft Detail', src: product.images.detail },
  ];

  const currentMainSrc = product.images[activeAngleKey] || product.images.front;

  return (
    <div className="product-gallery-container">
      {/* View Mode Toggle */}
      <div className="gallery-mode-bar">
        <button
          className={`mode-tab ${!show360View ? 'active' : ''}`}
          onClick={() => setShow360View(false)}
        >
          <ImageIcon size={14} /> GALLERY
        </button>
        <button
          className={`mode-tab ${show360View ? 'active' : ''}`}
          onClick={() => setShow360View(true)}
        >
          <RotateCw size={14} /> 360° VIEW
        </button>
      </div>

      {show360View ? (
        <Product360
          sequence={product.sequence360}
          productName={product.name}
        />
      ) : (
        <div className="main-gallery-view">
          {/* Main Large Image */}
          <div className="main-image-frame">
            <img
              src={currentMainSrc}
              alt={`${product.name} - ${activeAngleKey} view`}
              className="main-product-img"
            />
          </div>

          {/* 4 Angle Thumbnails */}
          <div className="thumbnails-grid">
            {angleImages.map((item) => (
              <button
                key={item.key}
                className={`thumbnail-btn ${activeAngleKey === item.key ? 'selected' : ''}`}
                onClick={() => setActiveAngleKey(item.key)}
                title={item.label}
              >
                <img src={item.src} alt={item.label} />
                <span className="thumb-label">{item.key.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
