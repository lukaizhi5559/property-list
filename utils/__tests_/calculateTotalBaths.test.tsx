import { calculateTotalBaths } from '../calculateTotalBaths';

describe('calculateTotalBaths', () => {
  it('calculates total baths correctly', () => {
    // Test case 1: Full baths only
    expect(calculateTotalBaths(2, 0)).toBe(2);

    // Test case 2: Half baths only
    expect(calculateTotalBaths(0, 3)).toBe(1.5);

    // Test case 3: Both full and half baths
    expect(calculateTotalBaths(3, 2)).toBe(4);
  });
});
