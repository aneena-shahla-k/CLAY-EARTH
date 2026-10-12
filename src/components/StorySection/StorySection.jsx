import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './StorySection.css';
import candle from "../../images/clay-pot.jpg";

export const StorySection = () => {
  return (
    <section className="story-section" id="story">
      <div className="story-container">

        {/* Image */}
        <div className="story-visual">
          <img
            src={candle}
            alt="Artisan hands shaping a traditional clay pot"
            className="story-img"
          />
        </div>

        {/* Content */}
        <div className="story-content">

          <span className="story-label">
            OUR STORY
          </span>

          <h2 className="story-heading">
            Rooted in Tradition,
            <br />
            Made for Today
          </h2>

          <p className="story-text">
            At Aysha's herbal care, we celebrate the beauty
            of handmade craftsmanship. Each piece is thoughtfully
            created by skilled artisans, blending traditional
            techniques with modern living.
          </p>

          <Link to="/about" className="story-button">
            LEARN MORE
            <ArrowRight size={13} strokeWidth={1.8} />
          </Link>

        </div>

      </div>
    </section>
  );
};