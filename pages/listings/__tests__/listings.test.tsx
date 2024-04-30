import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Listings from '..';
import { Property } from 'models';

const mockAddress = { 
    streetName: 'Mock St', 
    city: 'Mock City', 
    state: 'Mock State',
    crossStreet: 'Mock Cross Street',
    country: 'Mock Country',
    postalCode: 'Mock1234',
    streetNumberText: 'Mock Street Number Text',
    streetNumber: '1234',
    full: 'Mock full',
    unit: 'Mock unit',
};

const mockProperties: Property[] = [
  {
    mlsId: 1,
    geo: { lat: 37.7749, lng: -122.4194 },
    bedrooms: 3,
    bathsFull: 2,
    bathsHalf: 1,
    area: 2000,
    listPrice: 1000000,
    photos: ['mock-photo-url'],
    address: mockAddress,
    listDate: new Date('2024-04-29'),
  },
];

// Mock the fetchProperties function
jest.mock('../../../services/fetchProperties', () => ({
  fetchProperties: jest.fn(() => Promise.resolve(mockProperties)),
}));

describe('Listings component', () => {
  test('fetches properties data on component mount', async () => {
    const { getByText } = render(<Listings />);

    // Wait for properties to be fetched and rendered
    await waitFor(() => expect(getByText(/Mock St/)).toBeInTheDocument());

    // Check if properties are rendered correctly
    expect(getByText(/Mock St/)).toBeInTheDocument();
  });

  test('toggles between map and list view', async () => {
    const { getByText } = render(<Listings />);
    
    // Click on view toggle button
    fireEvent.click(getByText('List View'));

    // Initially in map view
    expect(getByText('Map View')).toBeInTheDocument();
  
    // Click on view toggle button
    fireEvent.click(getByText('Map View'));
  
    // Now in list view
    expect(getByText('List View')).toBeInTheDocument();
  });

  test('toggles map visibility', async () => {
    const { getByTestId, queryByTestId } = render(<Listings />);
  
    // Initially map visible
    expect(getByTestId('map-panel')).toBeInTheDocument();
  
    // Click on map toggle button
    fireEvent.click(getByTestId('map-toggle-button'));
  
    // Now map hidden
    expect(queryByTestId('map-panel')).not.toBeInTheDocument();
  });
});
