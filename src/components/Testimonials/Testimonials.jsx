import React from 'react';
import { Quote } from 'lucide-react';
import './Testimonials.css';

export const Testimonials = () => {
  const reviews = [
    {
      quote: "Absolutely love the quality and beauty of these pieces. They add such a warm touch to my home!",
      author: "Priya K.",
      location: "Kochi, Kerala"
    },
    {
      quote: "The wall hanging decor is stunning! You can readily feel the craftsmanship in every detail.",
      author: "Arjun R.",
      location: "Calicut, Kerala"
    },
    {
      quote: "Beautiful, minimal and so well made. I keep coming back for more!",
      author: "Sneha N.",
      location: "Thrissur, Kerala"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-subtitle">TESTIMONIALS</span>
          <h2 className="testimonials-title">What Our Customers Say</h2>
          <p className="testimonials-desc">Real people. Real love for our handcrafted treasures.</p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <Quote size={28} className="quote-icon" />
              <p className="review-quote">&ldquo;{item.quote}&rdquo;</p>
              <div className="author-info">
                <span className="author-name">{item.author}</span>
                <span className="author-loc">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
