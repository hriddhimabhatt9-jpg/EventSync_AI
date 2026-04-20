/**
 * @jest-environment node
 */
import { GET, POST } from './route';
import { NextResponse } from 'next/server';
import { createRequest } from 'node-mocks-http';
import { getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getFirestore: jest.fn(() => ({}))
}));

describe('/api/events API Route', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Suppress console.error during tests to keep output clean
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  describe('GET Handler', () => {
    it('should return a list of mock events with 200 status', async () => {
      const response = await GET();
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('title', 'AI Summit');
    });

    it('should include security headers', async () => {
      const response = await GET();
      
      expect(response.headers.get('X-Frame-Options')).toBe('SAMEORIGIN');
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    });

    it('should handle firestore fetch failure internally and return mock data silently', async () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      // Suppress DemoMode to hit Firestore block
      jest.mock('@/lib/firebase', () => ({
        isDemoMode: false,
        db: {}
      }));
      
      (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      
      const response = await GET();
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.length).toBeGreaterThan(0); // Mock data returned
      
      consoleWarnSpy.mockRestore();
    });

    it('should handle catastrophic failure and return 500 status', async () => {
      // Force an outer block error by mocking NextResponse.json
      jest.spyOn(NextResponse, 'json').mockImplementationOnce(() => {
        throw new Error('Fatal error');
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch events');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('POST Handler', () => {
    it('should successfully create an event with valid payload', async () => {
      const validPayload = {
        title: 'New Developer Conference',
        date: new Date().toISOString(),
        location: 'Virtual',
      };

      const req = {
        json: async () => validPayload,
      } as unknown as Request;

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toBe('Event created successfully!');
      expect(data.event.title).toBe(validPayload.title);
    });

    it('should return 400 status when validation fails (missing title)', async () => {
      const invalidPayload = {
        // missing title
        date: new Date().toISOString(),
        location: 'Virtual',
      };

      const req = {
        json: async () => invalidPayload,
      } as unknown as Request;

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation Failed');
    });

    it('should handle internal errors and return 500 status', async () => {
      const req = {
        json: async () => {
          throw new Error('Syntax error parsing JSON');
        },
      } as unknown as Request;

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal Server Error');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
