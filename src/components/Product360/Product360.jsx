import React, { useState, useRef } from 'react';
import { RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import './Product360.css';

export const Product360 = ({ sequence, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const images = sequence && sequence.length > 0 ? sequence : [];
  const totalFrames = images.length;

  const nextFrame = () => {
    setCurrentIndex((prev) => (prev + 1) % totalFrames);
  };

  const prevFrame = () => {
    setCurrentIndex((prev) => (prev - 1 + totalFrames) % totalFrames);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 20) {
      if (deltaX > 0) {
        prevFrame();
      } else {
        nextFrame();
      }
      startXRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="product-360-viewer">
      <div className="360-badge">
        <RotateCw size={14} className="rotate-icon" /> 360° INTERACTIVE VIEW
      </div>

      <div
        className="product-360-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={images[currentIndex]}
          alt={`${productName} 360 view frame ${currentIndex + 1}`}
          className="360-frame-image"
        />

        <div className="360-drag-hint">
          <span>&larr; Drag horizontally to rotate &rarr;</span>
        </div>
      </div>

      <div className="360-controls">
        <button onClick={prevFrame} className="control-btn" title="Rotate Left">
          <ChevronLeft size={18} /> Rotate Left
        </button>

        <span className="frame-counter">
          Angle {currentIndex + 1} of {totalFrames}
        </span>

        <button onClick={nextFrame} className="control-btn" title="Rotate Right">
          Rotate Right <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
