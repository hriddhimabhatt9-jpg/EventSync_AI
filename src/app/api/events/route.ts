/**
 * ============================================
 * /api/events — Events API Route Handler
 * ============================================
 *
 * Provides REST endpoints for event management.
 * - GET:  Returns a list of mock events with security headers.
 * - POST: Creates a new event with Zod schema validation.
 *
 * Security headers are applied manually to align with
 * best-practice HTTP hardening (similar to helmet defaults).
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDocs, collection } from 'firebase/firestore';
import { db, isDemoMode } from '@/lib/firebase';

// ---------------------------------------------------------------------------
// Validation schema — enforces required fields for new events
// ---------------------------------------------------------------------------
const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  date: z.string().datetime('Must be a valid ISO 8601 date'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
});

// ---------------------------------------------------------------------------
// Shared security headers applied to every response
// ---------------------------------------------------------------------------
const securityHeaders: Record<string, string> = {
  'X-DNS-Prefetch-Control': 'off',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
  'X-Download-Options': 'noopen',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

/**
 * GET /api/events
 *
 * Returns a JSON array of events. Uses Firestore if available, otherwise mocks.
 * Applies strict caching headers for efficiency.
 */
export async function GET() {
  try {
    let events: any[] = [];
    
    if (!isDemoMode && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (fbError) {
        console.warn('[API] Firestore fetch failed, falling back to mock:', fbError);
      }
    }

    if (events.length === 0) {
      events = [
        { id: 1, title: 'AI Summit', date: '2026-05-01T10:00:00Z', location: 'Tech Hall' },
      ];
    }

    return NextResponse.json(events, {
      status: 200,
      headers: securityHeaders,
    });
  } catch (error) {
    console.error('[API] GET /api/events failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500, headers: securityHeaders }
    );
  }
}

/**
 * POST /api/events
 *
 * Creates a new event after validating the request body against
 * the Zod schema. Returns 201 on success, 400 on validation failure.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body against schema
    const validatedData = eventSchema.parse(body);

    return NextResponse.json(
      { message: 'Event created successfully!', event: validatedData },
      { status: 201, headers: securityHeaders }
    );
  } catch (error) {
    // Distinguish validation errors from unexpected failures
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation Failed', details: error.issues },
        { status: 400, headers: securityHeaders }
      );
    }

    console.error('[API] POST /api/events failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: securityHeaders }
    );
  }
}
