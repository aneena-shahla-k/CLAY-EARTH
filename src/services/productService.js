import { PRODUCTS, CATEGORIES } from '../data/products';

/**
 * Product Data Service
 * Designed with a clean abstraction layer so local mock data can easily
 * be replaced with Shopify Storefront API or GraphQL queries in production.
 */

export const productService = {
  // Get all products with optional category filter & search query
  getProducts: async ({ category = "ALL", searchQuery = "", sort = "featured" } = {}) => {
    let list = [...PRODUCTS];

    if (category && category !== "ALL") {
      list = list.filter((p) => p.category.toUpperCase() === category.toUpperCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  },

  // Get single product by ID
  getProductById: async (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  },

  // Get available categories
  getCategories: async () => {
    return CATEGORIES;
  },

  // Get featured products for homepage
  getFeaturedProducts: async () => {
    return PRODUCTS.filter((p) => p.isFeatured);
  },
};
