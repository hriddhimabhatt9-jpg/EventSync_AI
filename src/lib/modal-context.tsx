"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// ============================================
// Modal System
// ============================================

interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
}

interface ModalContextType {
  openModal: (title: string, content: React.ReactNode, actions?: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    title: "",
    content: null,
  });

  const openModal = useCallback(
    (title: string, content: React.ReactNode, actions?: React.ReactNode) => {
      setState({ isOpen: true, title, content, actions });
    },
    []
  );

  const closeModal = useCallback(() => {
    setState({ isOpen: false, title: "", content: null, actions: undefined });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* Modal Container */}
      {state.isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={state.title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={closeModal}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="relative bg-surface-container-lowest rounded-t-3xl sm:rounded-xl w-full sm:max-w-md mx-0 sm:mx-4 animate-slide-up p-6 sm:p-8 max-h-[85dvh] overflow-y-auto">
            {/* Handle (mobile) */}
            <div className="flex justify-center mb-4 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-outline-variant"></div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-on-surface">{state.title}</h3>
              <button
                className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="text-on-surface-variant text-sm leading-relaxed">
              {state.content}
            </div>
            {state.actions && (
              <div className="mt-6 flex gap-3">{state.actions}</div>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within <ModalProvider>");
  return ctx;
}
