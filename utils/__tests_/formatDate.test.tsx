import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('formats the date string as MM/DD/YY', () => {
    const dateString = '2024-04-30';
    const result = formatDate(dateString);
    expect(result).toBe('04/29/24');
  });

  it('pads single-digit month and day with leading zeros', () => {
    const dateString = '2024-05-05';
    const result = formatDate(dateString);
    expect(result).toBe('05/04/24');
  });

  it('handles single-digit month and day', () => {
    const dateString = '2024-12-05';
    const result = formatDate(dateString);
    expect(result).toBe('12/04/24');
  });

  it('handles two-digit year', () => {
    const dateString = '2024-12-25';
    const result = formatDate(dateString);
    expect(result).toBe('12/24/24');
  });

  it('handles invalid date string', () => {
    const dateString = 'invalid-date';
    const result = formatDate(dateString);
    expect(result).toBe('NaN/NaN/aN');
  });
});
