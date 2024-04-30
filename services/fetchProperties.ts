export const fetchProperties = async () => {
  try {
    // Check if properties are cached in local storage
    const cachedProperties = localStorage.getItem('properties');
    if (cachedProperties) {
      return JSON.parse(cachedProperties);
    }

    const baseUrl = 'https://api.simplyrets.com/properties';
    const apiKey = 'simplyrets';
    const apiSecret = 'simplyrets';
    const credentials = `${apiKey}:${apiSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    const response = await fetch(baseUrl, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      
      // Cache properties in local storage
      localStorage.setItem('properties', JSON.stringify(data));
      
      return data;
    } else {
      console.error('Failed to fetch data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
