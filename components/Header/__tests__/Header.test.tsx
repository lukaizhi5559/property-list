import React from 'react';
import { render } from '@testing-library/react';
import Header from '..';

describe('Header component', () => {
  const mockNavButton: JSX.Element = <button>Navigation Button</button>;

  it('renders the header with the provided navigation button', () => {
    const { getByText } = render(<Header navButton={mockNavButton} />);

    // Check if the header text is rendered
    const headerText = getByText('Property Listings');
    expect(headerText).toBeInTheDocument();

    // Check if the navigation button is rendered
    const navigationButton = getByText('Navigation Button');
    expect(navigationButton).toBeInTheDocument();
  });

  it('renders a link to the property listings page', () => {
    const { getByText } = render(<Header navButton={mockNavButton} />);

    // Check if the link to the property listings page is rendered
    const propertyListingsLink = getByText('Property Listings');
    expect(propertyListingsLink).toBeInTheDocument();
    expect(propertyListingsLink).toHaveAttribute('href', '/');
  });
});
