import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
 
    // Perform assertions after the component has been rendered
    const heading = screen.getByRole("heading", {
      name: /Side React Take-home Assignment/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
