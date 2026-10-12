import React from 'react';
import { Sparkles, Shield, Leaf, HeartHandshake } from 'lucide-react';
import './FeaturesSection.css';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Sparkles size={28} />,
      title: "100% Handmade",
      desc: "Crafted with love and traditional wheel techniques."
    },
    {
      icon: <Shield size={28} />,
      title: "Premium Quality",
      desc: "Durable & kiln-fired long-lasting pottery pieces."
    },
    {
      icon: <Leaf size={28} />,
      title: "Natural Materials",
      desc: "Eco-friendly, toxic-free safe for your home."
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Support Artisans",
      desc: "Empowering rural artisan craft communities."
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header">
          <span className="section-subtitle">WHY CHOOSE US</span>
          <h2 className="features-title">More Than Just Products</h2>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-box">{feat.icon}</div>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
