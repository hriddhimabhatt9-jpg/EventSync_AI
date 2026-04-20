"use client";

/**
 * App-level Providers
 *
 * Wraps the application with all required context providers and
 * initializes Firebase services (Analytics) on the client side.
 */

import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/lib/toast-context";
import { ModalProvider } from "@/lib/modal-context";
import { app, initAnalytics } from "@/lib/firebase";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize Firebase Analytics once on mount (client-only)
  useEffect(() => {
    initAnalytics().then((analyticsInstance) => {
      if (analyticsInstance) {
        console.log("[Firebase] Analytics initialized for project:", app.options.projectId);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>{children}</ModalProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
