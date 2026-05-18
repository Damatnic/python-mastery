"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface PyodideResult {
  output: string;
  error: string | null;
  locals: Record<string, unknown>;
  executionTime: number;
}

interface UsePyodideReturn {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  runCode: (code: string) => Promise<PyodideResult>;
}

const WORKER_PATH = "/pyodide-worker.js";
const EXECUTION_TIMEOUT_MS = 10_000;

interface PendingRun {
  resolve: (result: PyodideResult) => void;
  timer: ReturnType<typeof setTimeout>;
  startTime: number;
}

export function usePyodide(): UsePyodideReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<number, PendingRun>>(new Map());
  const runIdRef = useRef(0);

  const spawnWorker = useCallback(() => {
    if (typeof window === "undefined") return null;
    const worker = new Worker(WORKER_PATH);
    worker.onmessage = (event: MessageEvent) => {
      const data = event.data as
        | { type: "ready" }
        | { type: "init-error"; error: string }
        | {
            type: "result";
            id: number;
            output: string;
            error: string | null;
            locals: Record<string, unknown>;
            executionTime: number;
          };

      if (data.type === "ready") {
        setIsReady(true);
        setIsLoading(false);
        setError(null);
        return;
      }
      if (data.type === "init-error") {
        setError(data.error);
        setIsLoading(false);
        return;
      }
      if (data.type === "result") {
        const pending = pendingRef.current.get(data.id);
        if (!pending) return;
        clearTimeout(pending.timer);
        pendingRef.current.delete(data.id);
        pending.resolve({
          output: data.output,
          error: data.error,
          locals: data.locals,
          executionTime: data.executionTime,
        });
      }
    };
    worker.onerror = (e) => {
      setError(e.message || "pyodide worker crashed");
      setIsLoading(false);
      setIsReady(false);
    };
    return worker;
  }, []);

  useEffect(() => {
    // Capture the stable pending-runs map for the cleanup closure (the ref
    // itself may be reassigned by the time cleanup runs).
    const pendingMap = pendingRef.current;
    workerRef.current = spawnWorker();
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      // Reject all pending runs
      for (const pending of pendingMap.values()) {
        clearTimeout(pending.timer);
        pending.resolve({
          output: "",
          error: "runtime closed",
          locals: {},
          executionTime: 0,
        });
      }
      pendingMap.clear();
    };
  }, [spawnWorker]);

  const runCode = useCallback(
    (code: string): Promise<PyodideResult> => {
      return new Promise((resolve) => {
        if (!workerRef.current || !isReady) {
          resolve({
            output: "",
            error: "python runtime is not ready yet",
            locals: {},
            executionTime: 0,
          });
          return;
        }

        const id = ++runIdRef.current;
        const startTime = performance.now();

        const timer = setTimeout(() => {
          // Watchdog: terminate the worker, spawn a new one, resolve with timeout error.
          const pending = pendingRef.current.get(id);
          if (!pending) return;
          pendingRef.current.delete(id);

          workerRef.current?.terminate();

          // Reject other pending runs that were on the killed worker
          for (const other of pendingRef.current.values()) {
            clearTimeout(other.timer);
            other.resolve({
              output: "",
              error: "runtime terminated due to a runaway sibling task",
              locals: {},
              executionTime: 0,
            });
          }
          pendingRef.current.clear();

          // Respawn for the next attempt
          setIsReady(false);
          setIsLoading(true);
          workerRef.current = spawnWorker();

          pending.resolve({
            output: "",
            error: `execution exceeded ${EXECUTION_TIMEOUT_MS / 1000}s; likely an infinite loop. python runtime reloaded.`,
            locals: {},
            executionTime: performance.now() - startTime,
          });
        }, EXECUTION_TIMEOUT_MS);

        pendingRef.current.set(id, { resolve, timer, startTime });

        workerRef.current.postMessage({ type: "run", id, code });
      });
    },
    [isReady, spawnWorker],
  );

  return { isLoading, isReady, error, runCode };
}
