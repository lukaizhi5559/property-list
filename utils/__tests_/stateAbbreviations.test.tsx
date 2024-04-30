import { getStateAbbreviation } from '../stateAbbreviations';

describe('getStateAbbreviation', () => {
  it('returns the correct abbreviation for a valid state name', () => {
    const stateName = 'California';
    const result = getStateAbbreviation(stateName);
    expect(result).toBe('CA');
  });

  it('returns undefined for an invalid state name', () => {
    const stateName = 'Nonexistent State';
    const result = getStateAbbreviation(stateName);
    expect(result).toBeUndefined();
  });

  it('handles empty string', () => {
    const stateName = '';
    const result = getStateAbbreviation(stateName);
    expect(result).toBeUndefined();
  });

  it('handles null input', () => {
    const stateName = null;
    const result = getStateAbbreviation(stateName);
    expect(result).toBeUndefined();
  });

  it('handles undefined input', () => {
    const stateName = undefined;
    const result = getStateAbbreviation(stateName);
    expect(result).toBeUndefined();
  });
});
