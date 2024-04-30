import { fetchProperties } from '../fetchProperties';

const property = { mlsId: 1 };

describe('fetchProperties', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('fetches properties from API and caches them in local storage', async () => {
    // Mock successful response from the API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([property])
    });

    const properties = await fetchProperties();

    // Check if properties are fetched and cached
    expect(properties).toEqual([property]);
    expect(localStorage.getItem('properties')).toEqual(JSON.stringify([property]));
  });

  it('returns cached properties from local storage if available', async () => {
    // Mock cached properties in local storage
    const cachedProperties = [property];
    localStorage.setItem('properties', JSON.stringify(cachedProperties));

    // Mock API response (should not be called)
    global.fetch = jest.fn();

    const properties = await fetchProperties();

    // Check if cached properties are returned
    expect(properties).toEqual(cachedProperties);
  });

  it('handles authentication with API credentials', async () => {
    // Mock successful response from the API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([property])
    });

    await fetchProperties();

    // Check if fetch is called with correct authorization header
    expect(fetch).toHaveBeenCalledWith('https://api.simplyrets.com/properties', {
      headers: {
        Authorization: 'Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz' // Base64 encoded 'simplyrets:simplyrets'
      }
    });
  });

  it('handles error when encountering an exception', async () => {
    jest.spyOn(console, 'error');

    // Mocking the fetch call to simulate an exception
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      throw new Error('Network error');
    });

    // Call fetchProperties
    await fetchProperties();

    // Check if error is logged
    expect(console.error).toHaveBeenCalledWith('Error fetching data:', new Error('Network error'));
  });
});
