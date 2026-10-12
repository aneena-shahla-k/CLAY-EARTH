/**
 * Shopify Service Abstraction Layer
 * Interfaces for future Shopify Storefront API & Payment Gateway integration.
 * In this prototype mode, it executes seamless frontend checkout flows.
 */

export const shopifyService = {
  // Create a checkout session (Shopify Storefront checkoutCreate mutation stub)
  createCheckout: async (cartItems, shippingAddress) => {
    const orderId = "CE" + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal >= 2000 ? 0 : 100;
    const total = subtotal + shipping;

    return {
      orderId,
      createdAt: new Date().toISOString(),
      items: cartItems,
      shippingAddress,
      subtotal,
      shipping,
      total,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      shopifyWebUrl: null, // Ready for shopify checkout URL
    };
  },

  // Process payment Gateway Stub (Razorpay / Stripe / Shopify Payments)
  processPayment: async ({ method, orderId, amount }) => {
    // Simulating gateway transaction latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      transactionId: `TXN_${Date.now()}_${method.toUpperCase()}`,
      orderId,
      amount,
      gateway: method,
      message: "Payment successfully processed.",
    };
  },
};
