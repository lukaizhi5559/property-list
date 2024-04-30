import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getByTestId } from '@testing-library/dom';
import PropertyList from '..';
import { Property } from '../../../models';

describe('PropertyList component', () => {
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

  const mockFavorites: number[] = [];

  const mockSetSelectedProperty = jest.fn();
  const mockOnToggleFavorite = jest.fn();
  const mockScrollToProperty = jest.fn();

  it('renders a list of properties', () => {
    const { getAllByAltText } = render(
      <PropertyList
        properties={mockProperties}
        favorites={mockFavorites}
        selectedPropertyMlsId={null}
        setSelectedProperty={mockSetSelectedProperty}
        onToggleFavorite={mockOnToggleFavorite}
        scrollToProperty={mockScrollToProperty}
      />
    );

    // Check if each property is rendered
    const propertyImages = getAllByAltText('Property');
    expect(propertyImages).toHaveLength(mockProperties.length);
  });

  it('calls setSelectedProperty and scrollToProperty when a property card is clicked', () => {
    // Mock property data
    const mockProperty = {
        ...mockProperties[0],
        bedrooms: 0,
        bathsFull: 0,
        bathsHalf: 0,
        area: 0,
    };
   
    // Mock setSelectedProperty and scrollToProperty functions
    const mockSetSelectedProperty = jest.fn();
    const mockScrollToProperty = jest.fn();
  
    render(
      <PropertyList
        properties={[mockProperty]}
        favorites={[]}
        selectedPropertyMlsId={null}
        setSelectedProperty={mockSetSelectedProperty}
        onToggleFavorite={() => {}}
        mapVisible={true}
        scrollToProperty={mockScrollToProperty}
      />
    );
  
    // Simulate click on the property card
    fireEvent.click(getByTestId(document.body, `property-${mockProperty.mlsId}`));
    
    // Check if setSelectedProperty and scrollToProperty are called with the correct arguments
    expect(mockSetSelectedProperty).toHaveBeenCalledWith(mockProperty);
    expect(mockScrollToProperty).toHaveBeenCalledWith(mockProperty.mlsId);
  });
  
});
