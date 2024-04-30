import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
  it('formats the price in millions', () => {
    const price = 1500000;
    const result = formatPrice(price);
    expect(result).toBe('$1.5M');
  });

  it('formats the price in thousands', () => {
    const price = 2500;
    const result = formatPrice(price);
    expect(result).toBe('$2.5K');
  });

  it('does not format the price if less than 1000', () => {
    const price = 500;
    const result = formatPrice(price);
    expect(result).toBe('$500');
  });

  it('rounds to one decimal place', () => {
    const price = 1234567;
    const result = formatPrice(price);
    expect(result).toBe('$1.2M');
  });

  it('handles zero price', () => {
    const price = 0;
    const result = formatPrice(price);
    expect(result).toBe('$0');
  });

  it('handles negative price', () => {
    const price = -1000;
    const result = formatPrice(price);
    expect(result).toBe('$-1000');
  });
});
