import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './CollectionIntro.css';
import img1 from "../../images/harmony.png";

export const CollectionIntro = ({ onSelectCategory }) => {
  const collections = [
    {
      id: "HOME DÉCOR",
      name: "Home Décor",
      image: img1,
    },
    {
      id: "HOME DÉCOR", // Wall hanging
      name: "Wall Art",
      image: "/assets/products/product-05-front.jpg",
    },
    {
      id: "PLANTERS",
      name: "Planters",
      image: "/assets/products/product-04-front.jpg",
    },
    {
      id: "CANDLE HOLDERS",
      name: "Candles & Lights",
      image: "/assets/products/product-06-front.jpg",
    },
  ];

  return (
    <section className="collection-intro-section" id="collections">
      <div className="container">
        <div className="intro-header-wrapper">
          <div className="intro-text">
            <span className="section-subtitle">OUR COLLECTIONS</span>
            <h2 className="intro-heading">Made by Hand. Meant to Last.</h2>
            {/* <p className="intro-description">
              Each piece carries the subtle marks of the hands that shaped it. From earthy terracotta vessels to quiet decorative accents, our collection celebrates the beauty of slow craftsmanship.
            </p> */}
          </div>
          <a href="#products-grid" className="discover-link">
            DISCOVER COLLECTION <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Collection Cards Grid */}
        <div className="collections-grid">
          {collections.map((item, idx) => (
            <div
              key={idx}
              className="collection-card"
              onClick={() => onSelectCategory && onSelectCategory(item.id)}
            >
              <div className="collection-img-box">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="collection-card-info">
                <div>
                  <h3 className="collection-title">{item.name}</h3>
                  <span className="collection-count">{item.count}</span>
                </div>
                <button className="collection-arrow-btn" aria-label={`View ${item.name}`}>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
