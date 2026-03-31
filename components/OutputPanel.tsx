"use client";

import { useMemo } from "react";

interface OutputPanelProps {
  output: string;
  error: string | null;
  isRunning: boolean;
  executionTime?: number;
}

interface OutputPart {
  type: "text" | "dataframe";
  content: string;
}

function parseOutput(output: string): OutputPart[] {
  if (!output) return [];

  const parts: OutputPart[] = [];
  const dfRegex = /<!--DATAFRAME_HTML-->([\s\S]*?)<!--\/DATAFRAME_HTML-->/g;
  let lastIndex = 0;
  let match;

  while ((match = dfRegex.exec(output)) !== null) {
    if (match.index > lastIndex) {
      const text = output.slice(lastIndex, match.index).trim();
      if (text) {
        parts.push({ type: "text", content: text });
      }
    }
    parts.push({ type: "dataframe", content: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < output.length) {
    const text = output.slice(lastIndex).trim();
    if (text) {
      parts.push({ type: "text", content: text });
    }
  }

  return parts;
}

function formatExecutionTime(ms: number): string {
  if (ms < 1) return "<1ms";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function parseError(error: string): { type: string; message: string; details: string[] } {
  const lines = error.split("\n").filter(Boolean);

  const errorLine = lines.find(line =>
    line.includes("Error:") ||
    line.includes("Exception:") ||
    line.match(/^[A-Z][a-zA-Z]*Error/)
  );

  if (errorLine) {
    const match = errorLine.match(/^([A-Za-z]+(?:Error|Exception)):\s*(.+)$/);
    if (match) {
      return {
        type: match[1],
        message: match[2],
        details: lines.filter(l => l !== errorLine && !l.startsWith("Traceback"))
      };
    }
  }

  return {
    type: "Error",
    message: lines[lines.length - 1] || error,
    details: lines.slice(0, -1).filter(l => !l.startsWith("Traceback"))
  };
}

export function OutputPanel({ output, error, isRunning, executionTime }: OutputPanelProps) {
  const outputParts = useMemo(() => parseOutput(output), [output]);
  const parsedError = useMemo(() => error ? parseError(error) : null, [error]);

  return (
    <div className="h-full flex flex-col rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <span className="text-sm font-medium text-muted-foreground">
          Output
        </span>
        <div className="flex items-center gap-3">
          {executionTime !== undefined && executionTime > 0 && !isRunning && (
            <span className="text-xs text-muted-foreground">
              {formatExecutionTime(executionTime)}
            </span>
          )}
          {isRunning && (
            <span className="text-xs text-accent loading-pulse flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Running...
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {!output && !error && !isRunning && (
          <span className="text-muted">
            Press Cmd/Ctrl+Enter or click Run to execute your code
          </span>
        )}

        {outputParts.map((part, index) => (
          <div key={index} className={index > 0 ? "mt-3" : ""}>
            {part.type === "text" ? (
              <pre className="whitespace-pre-wrap text-foreground">{part.content}</pre>
            ) : (
              <div
                className="dataframe-container overflow-x-auto rounded-lg border border-border"
                dangerouslySetInnerHTML={{ __html: part.content }}
              />
            )}
          </div>
        ))}

        {parsedError && (
          <div className="mt-2 rounded-lg border border-error/30 bg-error/5 overflow-hidden">
            <div className="px-3 py-2 bg-error/10 border-b border-error/20">
              <span className="text-error font-semibold">{parsedError.type}</span>
            </div>
            <div className="p-3">
              <p className="text-error font-medium">{parsedError.message}</p>
              {parsedError.details.length > 0 && (
                <pre className="mt-2 text-xs text-error/70 whitespace-pre-wrap">
                  {parsedError.details.join("\n")}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
