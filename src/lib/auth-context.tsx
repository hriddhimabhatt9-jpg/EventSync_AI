"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { User } from "@/types";

// ============================================
// Auth Context — Client-side mock auth system
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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "eventsync_auth_user";

const defaultUser: User = {
  id: "cu1",
  name: "Julian",
  email: "julian@example.com",
  role: "attendee",
  avatar: "",
  title: "Software Engineer",
  company: "TechCorp",
  interests: ["#AI", "#WebDev", "#Design"],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Hydrate auth from localStorage on mount
  useEffect(() => {
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
  }, []);

  const persistUser = (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 800));

    // Basic validation
    if (!email.includes("@") || password.length < 4) {
      return false;
    }

    const user: User = {
      ...defaultUser,
      email,
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
    persistUser(user);
    return true;
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    // Simulating Google OAuth
    persistUser({
      ...defaultUser,
      name: "Julian Wells",
      email: "julian.wells@gmail.com",
    });
    return true;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, role: "attendee" | "organizer"): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 800));

      if (!name.trim() || !email.includes("@") || password.length < 6) {
        return false;
      }

      const user: User = { ...defaultUser, name, email, role };
      persistUser(user);
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
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
