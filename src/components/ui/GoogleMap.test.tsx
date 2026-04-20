import React from 'react';
import { render, screen } from '@testing-library/react';
import GoogleMap from './GoogleMap';

describe('GoogleMap Component', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('renders iframe with correct default properties', () => {
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'test-api-key';
    
    render(<GoogleMap query="San Francisco" />);
    
    const iframe = screen.getByTitle('Google Maps');
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '100%');
    
    const expectedSrc = 'https://www.google.com/maps/embed/v1/place?key=test-api-key&q=San%20Francisco';
    expect(iframe).toHaveAttribute('src', expectedSrc);
  });

  it('uses fallback URL when API key is missing', () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    render(<GoogleMap query="New York" />);
    
    const iframe = screen.getByTitle('Google Maps');
    const expectedSrc = 'https://www.google.com/maps?q=New%20York&output=embed';
    expect(iframe).toHaveAttribute('src', expectedSrc);
  });

  it('applies custom title, width, height, and className', () => {
    render(
      <GoogleMap 
        query="London" 
        title="Custom Map Title"
        width="500"
        height="300"
        className="custom-map-class"
      />
    );
    
    const iframe = screen.getByTitle('Custom Map Title');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('width', '500');
    expect(iframe).toHaveAttribute('height', '300');
    expect(iframe).toHaveClass('custom-map-class');
  });
});
