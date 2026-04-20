import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from './EventCard';

describe('EventCard Component', () => {
  const mockEvent = {
    id: 'e1',
    title: 'Test Event',
    date: 'Oct 10, 2026',
    location: 'Test Location',
    price: 'Free',
    imageUrl: 'https://via.placeholder.com/150',
  };

  it('renders correctly with given props', () => {
    render(<EventCard {...mockEvent} />);
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Oct 10, 2026')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    
    // Check if image is rendered
    const image = screen.getByAltText('Test Event');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain(encodeURIComponent(mockEvent.imageUrl));
  });

  it('does not render bookmark button if onBookmarkToggle is undefined', () => {
    render(<EventCard {...mockEvent} />);
    expect(screen.queryByLabelText(/bookmark/i)).not.toBeInTheDocument();
  });

  it('renders bookmark button and handles clicks when onBookmarkToggle is provided', () => {
    const mockToggle = jest.fn();
    render(<EventCard {...mockEvent} isBookmarked={false} onBookmarkToggle={mockToggle} />);
    
    const button = screen.getByLabelText('Bookmark event');
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(expect.any(Object), 'e1');
  });

  it('shows correct aria-label when bookmarked', () => {
    render(<EventCard {...mockEvent} isBookmarked={true} onBookmarkToggle={jest.fn()} />);
    expect(screen.getByLabelText('Remove bookmark')).toBeInTheDocument();
  });
});
