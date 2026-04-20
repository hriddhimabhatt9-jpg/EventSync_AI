"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, isDemoMode } from "@/lib/firebase";
import type { User } from "@/types";

// ============================================
// Auth Context — Real Firebase Auth Integration
// ============================================

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string, role: "attendee" | "organizer") => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "eventsync_auth_user";

const defaultUser: User = {
  id: "temp",
  name: "User",
  email: "",
  role: "attendee",
  avatar: "",
  title: "Attendee",
  company: "",
  interests: [],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Listen to Firebase Auth state changes
  useEffect(() => {
    if (isDemoMode) {
      // Demo Mode: Mock hydration from localStorage
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const user = JSON.parse(stored) as User;
          setState({ user, isAuthenticated: true, isLoading: false });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user back to domain User shape
        setState({
          user: {
            ...defaultUser,
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    });
    
    return () => unsubscribe();
  }, []);

  const persistDemoUser = (email: string, name: string, role: "attendee" | "organizer") => {
    const user: User = { ...defaultUser, email, name, role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 800));
      if (!email.includes("@") || password.length < 4) return false;
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      persistDemoUser(email, name, "attendee");
      return true;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("[Firebase Auth] Login error:", error);
      return false;
    }
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    if (isDemoMode) {
      await new Promise((r) => setTimeout(r, 1000));
      persistDemoUser("julian.wells@gmail.com", "Julian Wells", "attendee");
      return true;
    }

    // Left as simulated for now unless a Google provider is explicitly configured
    await new Promise((r) => setTimeout(r, 1000));
    return true;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, role: "attendee" | "organizer"): Promise<boolean> => {
      if (isDemoMode) {
        await new Promise(r => setTimeout(r, 800));
        if (!name.trim() || !email.includes("@") || password.length < 6) return false;
        persistDemoUser(email, name, role);
        return true;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Note: setting custom claims or profile updates (like display name/role) 
        // would normally hit Firestore here.
        return true;
      } catch (error) {
        console.error("[Firebase Auth] Registration error:", error);
        return false;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    if (isDemoMode) {
      localStorage.removeItem(STORAGE_KEY);
      setState({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("[Firebase Auth] Logout error:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
