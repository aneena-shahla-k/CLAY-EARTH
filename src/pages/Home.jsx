import React, { useState, useEffect } from 'react';
// import { Hero } from '../components/Hero/Hero';
import { CollectionIntro } from '../components/CollectionIntro/CollectionIntro';
import { CategoryNav } from '../components/CategoryNav/CategoryNav';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { StorySection } from '../components/StorySection/StorySection';
import { FeaturesSection } from '../components/FeaturesSection/FeaturesSection';
import { PromoBanner } from '../components/PromoBanner/PromoBanner';
import { Testimonials } from '../components/Testimonials/Testimonials';
// import { Newsletter } from '../components/Newsletter/Newsletter';
import { productService } from '../services/productService';
import HeroMain from '../components/Hero/HeroMain';

export const Home = ({ onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    productService.getProducts({ category: activeCategory }).then((list) => {
      setDisplayedProducts(list);
    });
  }, [activeCategory]);

  return (
    <main className="home-page">
      <HeroMain/>
      {/* <Hero /> */}
      <CollectionIntro onSelectCategory={setActiveCategory} />

      <section className="container" id="shop-catalog" style={{ paddingTop: '20px' }}>
        <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="section-subtitle">FEATURED COLLECTION</span>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 500 }}>Thoughtfully Handcrafted</h2>
        </div>

        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <ProductGrid
          products={displayedProducts}
          onQuickView={onQuickView}
        />
      </section>

      <StorySection />
      <FeaturesSection />
      <PromoBanner />
      <Testimonials />
      {/* <Newsletter /> */}
    </main>
  );
};
