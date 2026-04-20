import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './auth-context';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Setup default mock values that we can change per test
let mockIsDemoMode = false;

// Mock Firebase module
jest.mock('@/lib/firebase', () => ({
  get auth() { return {}; },
  get isDemoMode() { return mockIsDemoMode; }
}));

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

// Test component exposing context operations
function TestConsumer() {
  const { user, isAuthenticated, isLoading, login, register, logout, loginWithGoogle } = useAuth();
  
  if (isLoading) return <div data-testid="loading">Loading...</div>;
  
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
      {user && <span data-testid="user-email">{user.email}</span>}
      <button data-testid="login-btn" onClick={() => login('test@example.com', 'pwd123')}>Login</button>
      <button data-testid="google-login-btn" onClick={() => loginWithGoogle()}>Google</button>
      <button data-testid="register-btn" onClick={() => register('John', 'test@example.com', 'pwd123', 'attendee')}>Register</button>
      <button data-testid="logout-btn" onClick={() => logout()}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockIsDemoMode = false;
    jest.clearAllMocks();
    localStorage.clear();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Default auth state: unauthenticated
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn(); // unsubscribe
    });
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('throws error if useAuth is used outside AuthProvider', () => {
    expect(() => render(<TestConsumer />)).toThrow('useAuth must be used within <AuthProvider>');
  });

  it('handles standard authentication flow (login, register, logout)', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});
    (signOut as jest.Mock).mockResolvedValueOnce(undefined);

    await act(async () => { render(<AuthProvider><TestConsumer /></AuthProvider>); });
    
    // Test login
    await act(async () => { screen.getByTestId('login-btn').click(); });
    expect(signInWithEmailAndPassword).toHaveBeenCalled();

    // Test register
    await act(async () => { screen.getByTestId('register-btn').click(); });
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();

    // Test Google login (simulated delay)
    await act(async () => { screen.getByTestId('google-login-btn').click(); });

    // Test logout
    await act(async () => { screen.getByTestId('logout-btn').click(); });
    expect(signOut).toHaveBeenCalled();
  });

  it('handles rejected Firebase promises', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Invalid creds'));
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Email in use'));
    (signOut as jest.Mock).mockRejectedValueOnce(new Error('Sign out failed'));

    await act(async () => { render(<AuthProvider><TestConsumer /></AuthProvider>); });
    
    await act(async () => { screen.getByTestId('login-btn').click(); });
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Login error'), expect.any(Error));

    await act(async () => { screen.getByTestId('register-btn').click(); });
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Registration error'), expect.any(Error));

    await act(async () => { screen.getByTestId('logout-btn').click(); });
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Logout error'), expect.any(Error));
  });

  it('hydrates from Firebase onAuthStateChanged', async () => {
    const mockFirebaseUser = { uid: '123', email: 'firebase@test.com', displayName: 'FB User' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockFirebaseUser);
      return jest.fn();
    });

    await act(async () => { render(<AuthProvider><TestConsumer /></AuthProvider>); });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent('firebase@test.com');
  });

  describe('Demo Mode', () => {
    beforeEach(() => {
      mockIsDemoMode = true;
    });

    it('hydrates from localStorage in demo mode', async () => {
      localStorage.setItem('eventsync_auth_user', JSON.stringify({
        id: 'temp', email: 'demo@test.com', name: 'Demo'
      }));

      await act(async () => { render(<AuthProvider><TestConsumer /></AuthProvider>); });

      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user-email')).toHaveTextContent('demo@test.com');
    });

    it('handles corrupted localStorage data', async () => {
      localStorage.setItem('eventsync_auth_user', '{bad-json}');
      await act(async () => { render(<AuthProvider><TestConsumer /></AuthProvider>); });
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });

    it('handles demo mode login and register flows', async () => {
      let TestComponentResult: any;
      function DemoConsumer() {
        TestComponentResult = useAuth();
        return null; // Don't render UI, just test functions
      }

      await act(async () => { render(<AuthProvider><DemoConsumer /></AuthProvider>); });

      // Invalid login
      let loginSuccess = false;
      await act(async () => { loginSuccess = await TestComponentResult.login('bad', '12'); });
      expect(loginSuccess).toBe(false);

      // Valid login
      await act(async () => { loginSuccess = await TestComponentResult.login('john@test.com', 'secure123'); });
      expect(loginSuccess).toBe(true);

      // Invalid register
      let regSuccess = false;
      await act(async () => { regSuccess = await TestComponentResult.register(' ', 'bad', '12', 'attendee'); });
      expect(regSuccess).toBe(false);

      // Valid register
      await act(async () => { regSuccess = await TestComponentResult.register('Alice', 'alice@test.com', 'secure123', 'attendee'); });
      expect(regSuccess).toBe(true);

      // Google Login
      let gLoginSuccess = false;
      await act(async () => { gLoginSuccess = await TestComponentResult.loginWithGoogle(); });
      expect(gLoginSuccess).toBe(true);
      
      // Logout
      await act(async () => { await TestComponentResult.logout(); });
      expect(localStorage.getItem('eventsync_auth_user')).toBeNull();
    });
  });
});
