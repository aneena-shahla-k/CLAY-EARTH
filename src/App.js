import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SearchOverlay } from './components/SearchOverlay/SearchOverlay';
import { ProductDetailModal } from './components/ProductDetailModal/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer/WishlistDrawer';

import { Home } from './pages/Home';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';

import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="app-shell">
            {/* Header / Navigation */}
            <Header onOpenSearch={() => setIsSearchOpen(true)} />

            {/* Main View Routes */}
            <Routes>
              <Route path="/" element={<Home onQuickView={handleOpenQuickView} />} />
              <Route path="/shop" element={<ShopPage onQuickView={handleOpenQuickView} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/wishlist" element={<WishlistPage onQuickView={handleOpenQuickView} />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>

            {/* Footer */}
            <Footer />

            {/* Interactive Drawers & Overlays */}
            <CartDrawer />
            <WishlistDrawer />
            <SearchOverlay
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSelectProduct={handleOpenQuickView}
            />

            {/* Product Quick View / Detail Modal */}
            {selectedProduct && (
              <ProductDetailModal
                product={selectedProduct}
                onClose={handleCloseQuickView}
              />
            )}
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
