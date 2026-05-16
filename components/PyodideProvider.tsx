"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePyodide } from "@/lib/pyodide";

// usePyodide() spawns a Worker per call, so it must be instantiated ONCE per
// lesson and shared with every block via context (sql-mastery gets this for
// free because sql.js is a module singleton; Pyodide is not).
interface PyodideRuntime {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  runCode: (code: string) => Promise<{
    output: string;
    error: string | null;
    locals: Record<string, unknown>;
    executionTime: number;
  }>;
}

const PyodideContext = createContext<PyodideRuntime | null>(null);

export function PyodideProvider({ children }: { children: ReactNode }) {
  const runtime = usePyodide();
  return (
    <PyodideContext.Provider value={runtime}>
      {children}
    </PyodideContext.Provider>
  );
}

export function usePyodideRuntime(): PyodideRuntime {
  const ctx = useContext(PyodideContext);
  if (!ctx) {
    throw new Error("usePyodideRuntime must be used within a PyodideProvider");
  }
  return ctx;
}
