"use client";

interface OutputPanelProps {
  output: string;
  error: string | null;
  isRunning: boolean;
}

export function OutputPanel({ output, error, isRunning }: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <span className="text-sm font-medium text-muted-foreground">
          Output
        </span>
        {isRunning && (
          <span className="text-xs text-accent loading-pulse">Running...</span>
        )}
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {!output && !error && !isRunning && (
          <span className="text-muted">
            Press Shift+Enter or click Run to execute your code
          </span>
        )}
        {output && (
          <pre className="whitespace-pre-wrap text-foreground">{output}</pre>
        )}
        {error && (
          <pre className="whitespace-pre-wrap text-error mt-2">{error}</pre>
        )}
      </div>
    </div>
  );
}
