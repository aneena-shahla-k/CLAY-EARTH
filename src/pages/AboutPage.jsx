import React from 'react';
import { FeaturesSection } from '../components/FeaturesSection/FeaturesSection';
import { Newsletter } from '../components/Newsletter/Newsletter';

export const AboutPage = () => {
  return (
    <div className="about-page-wrapper" style={{ padding: '60px 0 0 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto' }}>
          <span className="section-subtitle">OUR STORY &amp; PHILOSOPHY</span>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 500, marginBottom: '16px' }}>
            Objects With a Story.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            We believe everyday objects should feel personal. Our pieces celebrate the irregularity, warmth and character that only slow, handmade craft can offer.
          </p>
        </div>

        {/* Hero image grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '32px',
            marginBottom: '80px',
            alignItems: 'center',
          }}
        >
          <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            <img
              src="/assets/artisan-story.jpg"
              alt="Artisan hands shaping terracotta clay on pottery wheel"
              style={{ width: '100%', height: '480px', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 500, marginBottom: '16px' }}>
              Handcrafted in Kerala, Loved Worldwide
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
              Founded in the serene pottery hamlets of Kerala, Clay &amp; Earth was born out of a desire to preserve traditional terracotta heritage while adapting it for quiet, mindful modern interiors.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Every vase, planter and candle holder passes through master artisan hands—from raw clay gathering and wheel spinning to wood-firing in traditional brick kilns.
            </p>
          </div>
        </div>
      </div>

      <FeaturesSection />
      <Newsletter />
    </div>
  );
};
