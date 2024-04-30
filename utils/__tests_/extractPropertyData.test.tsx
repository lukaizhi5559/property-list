import { extractPropertyData } from '../extractPropertyData';

describe('extractPropertyData', () => {
  it('returns an empty array if input data is null', () => {
    const data = null;
    const result = extractPropertyData(data);
    expect(result).toEqual([]);
  });

  it('returns an empty array if input data is not an object', () => {
    const data = 'not an object';
    const result = extractPropertyData(data);
    expect(result).toEqual([]);
  });

  it('extracts property data from the input array', () => {
    const data = [
      {
        mlsId: 123,
        property: {
          bedrooms: 3,
          bathsFull: 2,
          bathsHalf: 1,
          area: 2000,
        },
        listPrice: 300000,
        address: {
          crossStreet: 'Cross St',
          state: 'State',
          country: 'Country',
          postalCode: '12345',
          streetName: 'Street',
          streetNumberText: '123',
          city: 'City',
          streetNumber: '123',
          full: '123 Street, City, State, 12345',
          unit: 'Unit 1',
        },
        listDate: '2024-04-30',
        photos: ['photo1.jpg', 'photo2.jpg'],
        geo: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
      // Add more test data as needed
    ];

    const expected = [
      {
        mlsId: 123,
        bedrooms: 3,
        bathsFull: 2,
        bathsHalf: 1,
        area: 2000,
        listPrice: 300000,
        address: {
          crossStreet: 'Cross St',
          state: 'State',
          country: 'Country',
          postalCode: '12345',
          streetName: 'Street',
          streetNumberText: '123',
          city: 'City',
          streetNumber: '123',
          full: '123 Street, City, State, 12345',
          unit: 'Unit 1',
        },
        listDate: '2024-04-30',
        photos: ['photo1.jpg', 'photo2.jpg'],
        geo: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
      // Add expected output for other test data
    ];

    const result = extractPropertyData(data);
    expect(result).toEqual(expected);
  });
});
