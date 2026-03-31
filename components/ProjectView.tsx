"use client";

import { useState, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { usePyodide } from "@/lib/pyodide";
import type { Project, ProjectStep } from "@/lib/types";

interface ProjectViewProps {
  project: Project;
  completedSteps: Set<string>;
  onStepComplete: (stepId: string) => void;
}

// Note: This validation pattern matches LessonView.tsx - used for educational code validation
function createValidator(
  validateFnString: string
): (output: string, locals: Record<string, unknown>) => boolean {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function("output", "locals", validateFnString) as (
    output: string,
    locals: Record<string, unknown>
  ) => boolean;
}

export function ProjectView({
  project,
  completedSteps,
  onStepComplete,
}: ProjectViewProps) {
  const { isLoading, isReady, error: pyodideError, runCode } = usePyodide();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showDataPreview, setShowDataPreview] = useState(false);

  const currentStep = project.steps[currentStepIndex];

  // Initialize code when step changes
  useEffect(() => {
    if (currentStep) {
      setCode(currentStep.starterCode);
      setOutput("");
      setError(null);
      setShowHints(false);
    }
  }, [currentStep]);

  const handleRun = useCallback(async () => {
    if (!isReady || !currentStep) return;

    setIsRunning(true);
    setError(null);

    const result = await runCode(code);

    setOutput(result.output);
    setError(result.error);

    // Validate the step
    if (!result.error && currentStep) {
      try {
        const validateFn = createValidator(currentStep.validateFn);
        const isValid = validateFn(result.output, result.locals);
        if (isValid) {
          onStepComplete(currentStep.id);
          setOutput(
            (prev) => prev + "\n\n✅ Step completed! Great work!"
          );
        }
      } catch {
        // Validation error, ignore
      }
    }

    setIsRunning(false);
  }, [isReady, runCode, code, currentStep, onStepComplete]);

  const handleReset = useCallback(() => {
    if (currentStep) {
      setCode(currentStep.starterCode);
      setOutput("");
      setError(null);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < project.steps.length) {
        setCurrentStepIndex(index);
      }
    },
    [project.steps.length]
  );

  // Generate data preview (first 5 lines of dataset)
  const dataPreviewLines = project.dataset.split("\n").slice(0, 6);
  const headers = dataPreviewLines[0]?.split(
    project.dataset.includes("|") ? "|" : ","
  );
  const previewRows = dataPreviewLines.slice(1, 6).map((line) =>
    line.split(project.dataset.includes("|") ? "|" : ",")
  );

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Steps */}
      <div className="w-64 flex-shrink-0 border-r border-border bg-card overflow-y-auto">
        <div className="p-4 border-b border-border">
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            ← Back to Projects
          </Link>
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-foreground mb-4 text-lg">
            {project.title}
          </h2>
          <div className="space-y-2">
            {project.steps.map((step, index) => {
              const isComplete = completedSteps.has(step.id);
              const isCurrent = index === currentStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                    isCurrent
                      ? "bg-accent-bg border-l-3 border-accent text-accent"
                      : isComplete
                      ? "bg-success/10 text-success hover:bg-success/20"
                      : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs border border-current">
                      {isComplete ? "✓" : index + 1}
                    </span>
                    <span className="truncate">{step.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dataset Preview Toggle */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => setShowDataPreview(!showDataPreview)}
            className="w-full text-left text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            <span>📊</span>
            <span>
              {showDataPreview ? "Hide" : "Show"} Dataset Preview
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {project.steps.length}
            </span>
            <div className="progress-bar w-32 h-2">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${
                    ((currentStepIndex + 1) / project.steps.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToStep(currentStepIndex - 1)}
              disabled={currentStepIndex === 0}
              className="btn-secondary text-sm disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={() => goToStep(currentStepIndex + 1)}
              disabled={currentStepIndex === project.steps.length - 1}
              className="btn-secondary text-sm disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Instructions */}
          <div className="w-1/2 flex flex-col border-r border-border overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center gap-2 mb-4">
                {completedSteps.has(currentStep.id) && (
                  <span className="text-success text-lg">✓</span>
                )}
                <h1 className="text-2xl font-bold text-foreground">
                  {currentStep.title}
                </h1>
              </div>

              <div className="prose prose-invert max-w-none mb-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentStep.description}
                </ReactMarkdown>
              </div>

              {/* Hints Section */}
              <div className="mt-6">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <span>{showHints ? "▼" : "▶"}</span>
                  <span>
                    {showHints ? "Hide hints" : `Show hints (${currentStep.hints.length})`}
                  </span>
                </button>
                {showHints && (
                  <div className="mt-3 p-4 rounded-lg border border-border bg-background">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {currentStep.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-accent">💡</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Data Preview */}
              {showDataPreview && (
                <div className="mt-6 p-4 rounded-lg border border-border bg-background">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <span>📊</span>
                    {project.datasetName} (first 5 rows)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="text-xs font-mono">
                      <thead>
                        <tr>
                          {headers?.map((h, i) => (
                            <th
                              key={i}
                              className="px-2 py-1 text-left text-accent border-b border-border"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {previewRows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="px-2 py-1 text-muted-foreground border-b border-border/50"
                              >
                                {cell.length > 20
                                  ? cell.slice(0, 17) + "..."
                                  : cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    {project.datasetDescription}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Editor & Output */}
          <div className="w-1/2 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <span className="text-sm text-warning loading-pulse flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                    Loading Python...
                  </span>
                ) : pyodideError ? (
                  <span className="text-sm text-error">
                    Error: {pyodideError}
                  </span>
                ) : (
                  <span className="text-sm text-success flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    Python Ready
                  </span>
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
                  {isRunning ? "Running..." : "Run & Check"}
                  <kbd className="hidden sm:inline text-xs opacity-70 bg-white/20 px-1.5 py-0.5 rounded">
                    Shift+Enter
                  </kbd>
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
              <OutputPanel output={output} error={error} isRunning={isRunning} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
