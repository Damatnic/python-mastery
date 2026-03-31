"use client";

import { useState, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { CopyButton } from "./CopyButton";
import { usePyodide } from "@/lib/pyodide";
import type { Lesson, Example, Challenge } from "@/lib/types";

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
}

function createValidator(validateFnString: string): (output: string, locals: Record<string, unknown>) => boolean {
  return new Function("output", "locals", validateFnString) as (output: string, locals: Record<string, unknown>) => boolean;
}

export function LessonView({ lesson, onComplete }: LessonViewProps) {
  const { isLoading, isReady, error: pyodideError, runCode } = usePyodide();
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"theory" | "examples" | "challenges">("theory");
  const [showSolution, setShowSolution] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    // Reset state when lesson changes - this is intentional synchronization
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCode(lesson.starterCode);
    setOutput("");
    setError(null);
    setExecutionTime(0);
    setShowSolution(null);
    setCompletedChallenges(new Set());
    setActiveChallenge(null);
    setActiveTab("theory");
  }, [lesson.slug, lesson.starterCode]);

  const handleRun = useCallback(async () => {
    if (!isReady) return;

    setIsRunning(true);
    setError(null);

    const result = await runCode(code);

    setOutput(result.output);
    setError(result.error);
    setExecutionTime(result.executionTime);

    if (activeChallenge && !result.error) {
      try {
        const validateFn = createValidator(activeChallenge.validateFn);
        const isValid = validateFn(result.output, result.locals);
        if (isValid) {
          setCompletedChallenges((prev) => {
            const next = new Set(prev);
            next.add(activeChallenge.id);
            return next;
          });
          setOutput((prev) => prev + "\n\n✅ Challenge completed! Great work!");

          if (
            lesson.challenges.every(
              (c) => completedChallenges.has(c.id) || c.id === activeChallenge.id
            )
          ) {
            onComplete();
          }
        }
      } catch {
        // Validation error, ignore
      }
    }

    setIsRunning(false);
  }, [isReady, runCode, code, activeChallenge, lesson.challenges, completedChallenges, onComplete]);

  const handleReset = useCallback(() => {
    if (activeChallenge) {
      setCode(activeChallenge.solution.split("# Solution:")[0]?.trim() || lesson.starterCode);
    } else {
      setCode(lesson.starterCode);
    }
    setOutput("");
    setError(null);
    setExecutionTime(0);
  }, [lesson.starterCode, activeChallenge]);

  const loadExample = useCallback((example: Example) => {
    setCode(example.code);
    setOutput("");
    setError(null);
    setActiveChallenge(null);
  }, []);

  const startChallenge = useCallback((challenge: Challenge) => {
    setActiveChallenge(challenge);
    setCode(lesson.starterCode + "\n\n# " + challenge.prompt + "\n# Your code here:\n");
    setOutput("");
    setError(null);
    setShowSolution(null);
  }, [lesson.starterCode]);

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Left Panel - Theory/Examples/Challenges */}
      <div className="w-1/2 flex flex-col border-r border-border overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border bg-card">
          {(["theory", "examples", "challenges"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {tab === "challenges" && (
                <span className="ml-2 text-xs">
                  ({completedChallenges.size}/{lesson.challenges.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "theory" && (
            <div className="prose prose-invert max-w-none">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {lesson.title}
              </h1>
              <span
                className={`inline-block px-2 py-0.5 text-xs rounded-full mb-6 badge-${lesson.badge}`}
              >
                {lesson.badge}
              </span>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.theory}
              </ReactMarkdown>
            </div>
          )}

          {activeTab === "examples" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">
                Code Examples
              </h2>
              {lesson.examples.map((example, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">
                      {example.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <CopyButton text={example.code} />
                      <button
                        onClick={() => loadExample(example)}
                        className="text-xs btn-secondary"
                      >
                        Load in Editor
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {example.explanation}
                  </p>
                  <pre className="p-3 rounded bg-background text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Challenges
              </h2>
              {lesson.challenges.map((challenge) => {
                const isComplete = completedChallenges.has(challenge.id);
                const isActive = activeChallenge?.id === challenge.id;

                return (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      isActive
                        ? "border-accent bg-accent-bg"
                        : isComplete
                        ? "border-success bg-success/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isComplete && (
                            <span className="text-success">✓</span>
                          )}
                          <p className="font-medium text-foreground">
                            {challenge.prompt}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Hint: {challenge.hint}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {!isComplete && (
                          <button
                            onClick={() => startChallenge(challenge)}
                            className={`text-xs ${
                              isActive ? "btn-primary" : "btn-secondary"
                            }`}
                          >
                            {isActive ? "Active" : "Start"}
                          </button>
                        )}
                        <button
                          onClick={() =>
                            setShowSolution(
                              showSolution === challenge.id
                                ? null
                                : challenge.id
                            )
                          }
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          {showSolution === challenge.id ? "Hide" : "Show"}{" "}
                          Solution
                        </button>
                      </div>
                    </div>
                    {showSolution === challenge.id && (
                      <div className="mt-3 relative">
                        <div className="absolute top-2 right-2">
                          <CopyButton text={challenge.solution} />
                        </div>
                        <pre className="p-3 pr-16 rounded bg-background text-sm overflow-x-auto">
                          <code>{challenge.solution}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Editor & Output */}
      <div className="w-1/2 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
                <div className="relative w-4 h-4">
                  <span className="absolute inset-0 flex items-center justify-center text-xs">🐍</span>
                  <svg className="absolute inset-0 w-4 h-4 animate-spin" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 10" className="text-warning/50" />
                  </svg>
                </div>
                <span className="text-sm text-warning font-medium">Loading Python...</span>
              </div>
            ) : pyodideError ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error/10 border border-error/20">
                <span className="w-2 h-2 rounded-full bg-error" />
                <span className="text-sm text-error">Error: {pyodideError}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm text-success font-medium">Python Ready</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="btn-secondary text-sm">
              Reset
            </button>
            <button
              onClick={handleRun}
              disabled={!isReady || isRunning}
              className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10" />
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  Run
                  <kbd className="hidden sm:inline text-xs opacity-70 bg-white/20 px-1.5 py-0.5 rounded">
                    ⌘/Ctrl+Enter
                  </kbd>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 min-h-0 p-4 pb-2">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            disabled={!isReady}
          />
        </div>

        {/* Output */}
        <div className="h-48 p-4 pt-2">
          <OutputPanel output={output} error={error} isRunning={isRunning} executionTime={executionTime} />
        </div>
      </div>
    </div>
  );
}
