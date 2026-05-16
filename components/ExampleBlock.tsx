"use client";

import { useCallback, useEffect, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { CopyButton } from "./CopyButton";
import { usePyodideRuntime } from "./PyodideProvider";
import { useLearn } from "@/lib/mode";
import type { Example } from "@/lib/types";

interface ExampleBlockProps {
  example: Example;
  index: number;
  isPygame?: boolean;
  onActiveCodeChange?: (code: string) => void;
}

// Learn mode hides the explanation until the learner commits a prediction.
// Predicting from the code first is the retrieval rep that builds memory.
export default function ExampleBlock({
  example,
  index,
  isPygame = false,
  onActiveCodeChange,
}: ExampleBlockProps) {
  const { isReady, runCode } = usePyodideRuntime();
  const learn = useLearn();
  const [revealed, setRevealed] = useState(false);
  const [code, setCode] = useState(example.code);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const showExplanation = !learn || revealed;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset block state when the example changes
    setCode(example.code);
    setOutput("");
    setError(null);
    setExecutionTime(0);
    setRevealed(false);
  }, [example.code]);

  const handleRun = useCallback(async () => {
    if (!isReady || isPygame) return;
    setIsRunning(true);
    setError(null);
    onActiveCodeChange?.(code);
    const result = await runCode(code);
    setOutput(result.output);
    setError(result.error);
    setExecutionTime(result.executionTime);
    setIsRunning(false);
  }, [isReady, isPygame, runCode, code, onActiveCodeChange]);

  const handleReset = useCallback(() => {
    setCode(example.code);
    setOutput("");
    setError(null);
    setExecutionTime(0);
  }, [example.code]);

  return (
    <div className="rounded border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border font-mono text-xs">
        <span className="text-foreground">
          <span className="text-accent"># example {String(index + 1).padStart(2, "0")}</span>
          <span className="text-muted-foreground"> · {example.title}</span>
        </span>
        <CopyButton text={example.code} />
      </div>

      <div className="p-4 space-y-4">
        {showExplanation ? (
          <p className="text-sm text-muted-foreground">{example.explanation}</p>
        ) : (
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">
              predict: what does this output / do? then reveal.
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="px-2 py-1 rounded border border-border font-mono text-xs text-accent hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              reveal explanation →
            </button>
          </div>
        )}

        <div className="rounded border border-border overflow-hidden">
          <div style={{ height: 200 }}>
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRun}
              disabled={!isReady || isPygame}
            />
          </div>
          <div className="flex items-center justify-end gap-2 -mt-px border-x border-b border-border bg-card rounded-b px-3 py-1 font-mono text-[11px]">
            <button
              type="button"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              reset
            </button>
            <button
              type="button"
              onClick={handleRun}
              disabled={!isReady || isRunning || isPygame}
              className="px-2 py-0.5 rounded border border-accent text-accent hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isRunning ? "running…" : "run"}
            </button>
          </div>
        </div>

        {isPygame && (
          <p className="font-mono text-[11px] text-warning">
            pygame needs a real window — copy this into a .py file and run it locally.
          </p>
        )}

        {(output || error || isRunning) && (
          <div className="h-40 rounded border border-border overflow-hidden">
            <OutputPanel
              output={output}
              error={error}
              isRunning={isRunning}
              executionTime={executionTime}
            />
          </div>
        )}
      </div>
    </div>
  );
}
