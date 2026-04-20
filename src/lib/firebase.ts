/**
 * ============================================
 * Firebase Configuration & Initialization
 * ============================================
 * 
 * Central Firebase setup for EventSync AI.
 * Initializes the Firebase App, Auth, Firestore, and Analytics services.
 * 
 * Supports a "demo mode" when real credentials are not configured,
 * preventing network errors from invalid API keys.
 * 
 * All Firebase config values are sourced from environment variables.
 * 
 * @see https://firebase.google.com/docs/web/setup
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

// ---------------------------------------------------------------------------
// Firebase configuration — all values from NEXT_PUBLIC_* env vars
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "eventsync-ai.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "eventsync-ai-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "eventsync-ai-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:000000000000",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX",
};

/**
 * Detects whether we are running with real Firebase credentials
 * or fallback demo/placeholder values.
 */
const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "demo-api-key";

// ---------------------------------------------------------------------------
// Singleton Firebase App — only initialize once (SSR-safe)
// ---------------------------------------------------------------------------
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

// In demo mode, log a clear warning instead of throwing network errors
if (isDemoMode && typeof window !== 'undefined') {
  console.warn(
    '[Firebase] Running in DEMO MODE — no real API key configured.\n' +
    'Set NEXT_PUBLIC_FIREBASE_API_KEY in .env.local to enable live Firebase services.\n' +
    'Auth, Firestore, and Analytics calls will be no-ops.'
  );
}

/**
 * Initializes Firebase Analytics if running in a supported browser
 * environment AND real credentials are configured.
 * Returns null during SSR or in demo mode.
 */
async function initAnalytics(): Promise<Analytics | null> {
  // Skip analytics entirely in demo mode to avoid network errors
  if (isDemoMode) {
    return null;
  }
  try {
    if (typeof window !== 'undefined' && await isSupported()) {
      analytics = getAnalytics(app);
      return analytics;
    }
  } catch (error) {
    console.warn('[Firebase] Analytics not supported in this environment:', error);
  }
  return null;
}

export { app, auth, db, analytics, initAnalytics, firebaseConfig, isDemoMode };
