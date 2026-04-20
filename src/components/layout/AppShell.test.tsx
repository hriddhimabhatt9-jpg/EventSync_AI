import React from 'react';
import { render, screen } from '@testing-library/react';
import AppShell from './AppShell';

// Mock the child components to simplify the test
jest.mock('./TopAppBar', () => {
  return function MockTopAppBar() {
    return <div data-testid="top-app-bar">TopAppBar</div>;
  };
});

jest.mock('./BottomNavBar', () => {
  return function MockBottomNavBar() {
    return <div data-testid="bottom-nav-bar">BottomNavBar</div>;
  };
});

describe('AppShell Component', () => {
  it('renders children correctly', () => {
    render(
      <AppShell>
        <div data-testid="child-content">Test Content</div>
      </AppShell>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders TopAppBar and BottomNavBar by default', () => {
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );
    
    expect(screen.getByTestId('top-app-bar')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-nav-bar')).toBeInTheDocument();
  });

  it('hides BottomNavBar when hideBottomNav is true', () => {
    render(
      <AppShell hideBottomNav={true}>
        <div>Content</div>
      </AppShell>
    );
    
    expect(screen.queryByTestId('bottom-nav-bar')).not.toBeInTheDocument();
  });
});
