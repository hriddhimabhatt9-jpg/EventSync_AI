"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// ============================================
// Toast Notification System
// ============================================

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto dismiss after 3.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      {/* Toast Container */}
      <div
        className="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto animate-slide-up max-w-sm rounded-xl px-5 py-4 shadow-xl text-sm font-medium flex items-center gap-3 cursor-pointer ${
              toast.type === "success"
                ? "bg-secondary-container text-on-secondary-container"
                : toast.type === "error"
                ? "bg-error-container text-on-error-container"
                : toast.type === "warning"
                ? "bg-tertiary-fixed text-on-tertiary-fixed"
                : "bg-surface-container-lowest text-on-surface shadow-cloud-lg"
            }`}
            onClick={() => dismissToast(toast.id)}
            role="alert"
          >
            <span className="material-symbols-outlined text-lg filled flex-shrink-0">
              {toast.type === "success"
                ? "check_circle"
                : toast.type === "error"
                ? "error"
                : toast.type === "warning"
                ? "warning"
                : "info"}
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
