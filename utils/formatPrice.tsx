/**
 * Formats the price of a property.
 * @param {number} price - The price of the property.
 * @returns {string} The formatted price string.
 */
export const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(1)}K`;
  } else {
    return `$${price}`;
  }
};