import { NextResponse } from 'next/server';
import { z } from 'zod';
import helmet from 'helmet';

// Simple validation schema using Zod
const eventSchema = z.object({
  title: z.string().min(3).max(100),
  date: z.string().datetime(),
  location: z.string().min(2),
});

/**
 * Handles GET requests for events.
 */
export async function GET() {
  // Mock response for GET
  const events = [
    { id: 1, title: 'AI Summit', date: '2026-05-01T10:00:00Z', location: 'Tech Hall' },
  ];

  return NextResponse.json(events, {
    status: 200,
    headers: {
      // Basic security headers matching helmet defaults for demonstration
      'X-DNS-Prefetch-Control': 'off',
      'X-Frame-Options': 'SAMEORIGIN',
      'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
      'X-Download-Options': 'noopen',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
    },
  });
}

/**
 * Handles POST requests to create a new event.
 * Includes Zod validation for input payload.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = eventSchema.parse(body);

    // If valid, return success
    return NextResponse.json(
      { message: 'Event created successfully!', event: validatedData },
      { 
        status: 201,
        headers: {
          'X-Content-Type-Options': 'nosniff',
        }
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation Failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
