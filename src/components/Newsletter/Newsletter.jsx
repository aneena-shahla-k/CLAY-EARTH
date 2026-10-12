import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import './Newsletter.css';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-heading">Bring Something Handmade Home.</h2>
          <p className="newsletter-sub">
            Join us for new collections, studio stories and pieces made in small batches.
          </p>
        </div>

        <div className="newsletter-form-wrapper">
          {submitted ? (
            <div className="subscribed-feedback">
              <CheckCircle2 size={24} color="#A65D3B" />
              <span>Thank you for joining our story! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                JOIN US <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
