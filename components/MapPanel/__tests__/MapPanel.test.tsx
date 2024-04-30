import React from 'react';
import { render } from '@testing-library/react';
import MapPanel from '..';

describe('MapPanel component', () => {
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

  // Define mock properties
  const mockProperties = [
    {
      mlsId: 1,
      geo: { lat: 37.7749, lng: -122.4194 },
      listPrice: 1000000,
      bedrooms: 3,
      bathsFull: 2,
      bathsHalf: 1,
      area: 2000,
      photos: ['mock-photo-url'],
      address: mockAddress,
      listDate: new Date('2024-04-29'),
    },
  ];
  
  const mockFavorites = [] as any;
  const mockOnToggleFavorite = jest.fn();
  const mockOnPropertyUpdate = jest.fn();
  const mockSetSelectedProperty = jest.fn();
  const mockScrollToProperty = jest.fn();

  it('renders without crashing', () => {
    render(
      <MapPanel
        properties={mockProperties}
        favorites={mockFavorites}
        onToggleFavorite={mockOnToggleFavorite}
        onPropertyUpdate={mockOnPropertyUpdate}
        selectedProperty={null}
        setSelectedProperty={mockSetSelectedProperty}
        scrollToProperty={mockScrollToProperty}
      />
    );
  });
});
