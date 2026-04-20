import { app, auth, db, analytics, initAnalytics, isDemoMode } from './firebase';
import { getApps, initializeApp } from 'firebase/app';
import { isSupported, getAnalytics } from 'firebase/analytics';

jest.mock('firebase/app', () => {
  const actual = jest.requireActual('firebase/app');
  return {
    ...actual,
    getApps: jest.fn(() => []),
    getApp: jest.fn(() => ({})),
    initializeApp: jest.fn(() => ({})),
  };
});

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(() => ({})),
  isSupported: jest.fn(),
}));

describe('firebase.ts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exports necessary firebase instances', () => {
    expect(app).toBeDefined();
    expect(auth).toBeDefined();
    expect(db).toBeDefined();
  });

  describe('initAnalytics', () => {
    let originalEnvConfig: any;

    beforeEach(() => {
      // Temporarily mock window to true to test branches
      (global as any).window = {};
    });

    afterEach(() => {
      delete (global as any).window;
    });

    it('returns null if demo mode is true', async () => {
      // By default isDemoMode might be true based on env. 
      // isDemoMode is evaluated on file import. We test its exported evaluated value.
      if (isDemoMode) {
        const result = await initAnalytics();
        expect(result).toBeNull();
      }
    });

    it('handles analytics errors silently', async () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      (isSupported as jest.Mock).mockRejectedValueOnce(new Error('unsupported'));
      
      const result = await initAnalytics();
      
      if (!isDemoMode) {
        expect(result).toBeNull();
        expect(consoleWarnSpy).toHaveBeenCalled();
      }
      
      consoleWarnSpy.mockRestore();
    });
  });
});
