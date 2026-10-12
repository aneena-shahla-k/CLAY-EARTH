import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PromoBanner.css';
import cta from "../../images/cta-bg.png";

export const PromoBanner = () => {
  return (
    <section className="promo-banner-section">
      <div className="promo-banner-image">
        <img
          src={cta}
          alt="Warm handmade pottery, candle and greenery"
        />
      </div>

      <div className="promo-banner-overlay"></div>

      <div className="container promo-banner-container">
        <div className="promo-content">

          <h2 className="promo-heading">
            Bring Home
            <br />
            The Art of Handmade
          </h2>

          <p className="promo-sub">
            Unique pieces. Timeless beauty. All yours.
          </p>

          <Link to="/shop" className="promo-button">
            SHOP COLLECTION
            <ArrowRight size={13} strokeWidth={1.8} />
          </Link>

        </div>
      </div>
    </section>
  );
};