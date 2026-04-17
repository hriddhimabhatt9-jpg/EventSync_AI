import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies the correct primary variant classes', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('bg-primary');
  });

  it('handles the fullWidth property correctly', () => {
    const { container } = render(<Button fullWidth>Wide</Button>);
    expect(container.firstChild).toHaveClass('w-full');
  });
});
