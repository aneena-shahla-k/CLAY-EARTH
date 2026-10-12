import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';
import img from "../../images/heroo.png";

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-wrapper">
        <img
          src={img}
          alt="Handcrafted terracotta pottery and candle holder"
          className="hero-img"
        />

        {/* Dark overlay for text readability */}
        <div className="hero-overlay"></div>

        {/* Hero Content */}
        <div className="container hero-container">
          <div className="hero-content">

            <h1 className="hero-heading">
              Timeless
              <br />
              Handcrafted Pieces
            </h1>

            <p className="hero-description">
              Beautifully made, naturally inspired.
              <br />
              Bringing warmth, tradition and character
              <br />
              to your everyday spaces.
            </p>

            <div className="hero-actions">
              <Link to="/shop" className="hero-button">
                Explore Collection
                <ArrowRight size={13} strokeWidth={1.8} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};