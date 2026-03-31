"use client";

interface PythonLoadingStateProps {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

export function PythonLoadingState({
  isLoading,
  isReady,
  error,
}: PythonLoadingStateProps) {
  if (error) {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-error/10 border border-error/20">
        <div className="w-2 h-2 rounded-full bg-error" />
        <div>
          <span className="text-sm font-medium text-error">Python Error</span>
          <p className="text-xs text-error/70">{error}</p>
        </div>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className="flex items-center gap-2 text-sm text-success">
        <div className="w-2 h-2 rounded-full bg-success" />
        <span className="font-medium">Python Ready</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        {/* Animated Python icon */}
        <div className="relative">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-lg animate-bounce">🐍</span>
          </div>
          {/* Spinner ring */}
          <svg
            className="absolute inset-0 w-8 h-8 animate-spin"
            viewBox="0 0 32 32"
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="60 28"
              className="text-accent/30"
            />
          </svg>
        </div>
        <div>
          <div className="text-sm font-medium text-warning">
            Loading Python Environment
          </div>
          <div className="text-xs text-muted-foreground">
            Initializing pandas & numpy...
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function PythonLoadingOverlay({
  isLoading,
}: {
  isLoading: boolean;
}) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
      <div className="relative mb-4">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-accent/20 animate-ping" />
        {/* Main circle */}
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center border border-accent/20">
          <span className="text-4xl">🐍</span>
        </div>
        {/* Spinner */}
        <svg
          className="absolute inset-0 w-20 h-20 animate-spin"
          style={{ animationDuration: "2s" }}
          viewBox="0 0 80 80"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="170 56"
            strokeLinecap="round"
            className="text-accent"
          />
        </svg>
      </div>
      <div className="text-lg font-medium text-foreground mb-1">
        Loading Python
      </div>
      <div className="text-sm text-muted-foreground">
        Setting up pandas and numpy in your browser...
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>This usually takes a few seconds</span>
      </div>
    </div>
  );
}
