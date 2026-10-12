import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('clay_earth_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('clay_earth_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
    setPromoSuccess('');
  };

  const applyPromoCode = (code) => {
    const formatted = code.trim().toUpperCase();
    if (!formatted) {
      setPromoError('Please enter a valid promo code');
      setPromoSuccess('');
      return false;
    }
    if (formatted === 'HANDMADE10' || formatted === 'CLAY10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied!');
      setPromoError('');
      setPromoCode(formatted);
      return true;
    } else if (formatted === 'CRAFT15' || formatted === 'EARTH15') {
      setDiscountPercent(15);
      setPromoSuccess('15% discount applied!');
      setPromoError('');
      setPromoCode(formatted);
      return true;
    } else {
      setPromoError('Invalid coupon code. Try HANDMADE10 or EARTH15');
      setPromoSuccess('');
      return false;
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Free shipping over ₹2,000
  const shippingCost = subtotal > 0 ? (subtotal >= 2000 ? 0 : 100) : 0;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        shippingCost,
        discountPercent,
        discountAmount,
        grandTotal,
        promoCode,
        promoError,
        promoSuccess,
        applyPromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
