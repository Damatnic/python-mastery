"use client";

import { useState, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { CopyButton } from "./CopyButton";
import { usePyodide } from "@/lib/pyodide";
import type { Lesson, Example, Challenge, ProjectChallenge } from "@/lib/types";
import { PROJECT_THREAD_INFO } from "@/lib/project-threads";

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

  // Project Challenge state
  const [projectCode, setProjectCode] = useState("");
  const [projectOutput, setProjectOutput] = useState("");
  const [projectError, setProjectError] = useState<string | null>(null);
  const [projectExecutionTime, setProjectExecutionTime] = useState(0);
  const [isRunningProject, setIsRunningProject] = useState(false);
  const [projectCompleted, setProjectCompleted] = useState(false);
  const [projectFailedAttempts, setProjectFailedAttempts] = useState(0);
  const [showProjectSolution, setShowProjectSolution] = useState(false);
  const [showProjectHint, setShowProjectHint] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

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

    // Reset project challenge state
    if (lesson.projectChallenge) {
      setProjectCode(lesson.projectChallenge.starterCode);
    }
    setProjectOutput("");
    setProjectError(null);
    setProjectExecutionTime(0);
    setProjectFailedAttempts(0);
    setShowProjectSolution(false);
    setShowProjectHint(false);

    // Load project completion state from localStorage
    const savedCompletions = localStorage.getItem("python-mastery-project-completed");
    if (savedCompletions) {
      const completed = new Set(JSON.parse(savedCompletions));
      setProjectCompleted(completed.has(`${lesson.moduleSlug}/${lesson.slug}`));
    } else {
      setProjectCompleted(false);
    }

    // Load XP from localStorage
    const savedXP = localStorage.getItem("python-mastery-xp");
    if (savedXP) {
      setTotalXP(parseInt(savedXP, 10));
    }
  }, [lesson.slug, lesson.starterCode, lesson.projectChallenge, lesson.moduleSlug]);

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

  const handleRunProject = useCallback(async () => {
    if (!isReady || !lesson.projectChallenge) return;

    setIsRunningProject(true);
    setProjectError(null);

    const result = await runCode(projectCode);

    setProjectOutput(result.output);
    setProjectError(result.error);
    setProjectExecutionTime(result.executionTime);

    if (!result.error) {
      try {
        const validateFn = createValidator(lesson.projectChallenge.validateFn);
        const isValid = validateFn(result.output, result.locals);
        if (isValid && !projectCompleted) {
          setProjectCompleted(true);
          const xpGained = lesson.projectChallenge.xpReward;
          const newXP = totalXP + xpGained;
          setTotalXP(newXP);
          localStorage.setItem("python-mastery-xp", String(newXP));

          // Save project completion
          const savedCompletions = localStorage.getItem("python-mastery-project-completed");
          const completed = savedCompletions ? new Set(JSON.parse(savedCompletions)) : new Set();
          completed.add(`${lesson.moduleSlug}/${lesson.slug}`);
          localStorage.setItem("python-mastery-project-completed", JSON.stringify([...completed]));

          setProjectOutput((prev) => prev + `\n\n✅ Project Challenge completed! +${xpGained} XP`);
        } else if (!isValid) {
          setProjectFailedAttempts((prev) => prev + 1);
          setProjectOutput((prev) => prev + "\n\n❌ Not quite right. Check your output and try again.");
        }
      } catch {
        setProjectFailedAttempts((prev) => prev + 1);
      }
    } else {
      setProjectFailedAttempts((prev) => prev + 1);
    }

    setIsRunningProject(false);
  }, [isReady, runCode, projectCode, lesson.projectChallenge, lesson.moduleSlug, lesson.slug, projectCompleted, totalXP]);

  const handleResetProject = useCallback(() => {
    if (lesson.projectChallenge) {
      setProjectCode(lesson.projectChallenge.starterCode);
      setProjectOutput("");
      setProjectError(null);
      setProjectExecutionTime(0);
    }
  }, [lesson.projectChallenge]);

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

              {/* Project Challenge Section */}
              {lesson.projectChallenge && (
                <div className="mt-8 p-5 rounded-xl border-2 border-amber-500/50 bg-amber-500/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/20 text-xl">
                      🏗️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-amber-400">
                          Project Challenge
                        </h3>
                        {projectCompleted && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-success/20 text-success">
                            ✓ Complete
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{PROJECT_THREAD_INFO[lesson.projectChallenge.threadId].icon}</span>
                        <span>{lesson.projectChallenge.threadTitle}</span>
                        <span className="text-amber-500/50">•</span>
                        <span className="text-amber-400">+{lesson.projectChallenge.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium text-foreground mb-2">
                    {lesson.projectChallenge.taskTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {lesson.projectChallenge.context}
                  </p>

                  {/* Collapsible Hint */}
                  <div className="mb-4">
                    <button
                      onClick={() => setShowProjectHint(!showProjectHint)}
                      className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>{showProjectHint ? "▼" : "▶"}</span>
                      <span>{showProjectHint ? "Hide Hint" : "Show Hint"}</span>
                    </button>
                    {showProjectHint && (
                      <p className="mt-2 text-sm text-muted-foreground p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        💡 {lesson.projectChallenge.hint}
                      </p>
                    )}
                  </div>

                  {/* Project Code Editor */}
                  <div className="rounded-lg border border-amber-500/30 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 bg-amber-500/10 border-b border-amber-500/30">
                      <span className="text-sm font-medium text-amber-400">Project Code</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleResetProject}
                          className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                        >
                          Reset
                        </button>
                        <button
                          onClick={handleRunProject}
                          disabled={!isReady || isRunningProject}
                          className="text-xs px-3 py-1 rounded bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors disabled:opacity-50"
                        >
                          {isRunningProject ? "Running..." : "Run & Check"}
                        </button>
                      </div>
                    </div>
                    <div className="h-64">
                      <CodeEditor
                        code={projectCode}
                        onChange={setProjectCode}
                        onRun={handleRunProject}
                        disabled={!isReady}
                      />
                    </div>
                    <div className="h-32 border-t border-amber-500/30">
                      <OutputPanel
                        output={projectOutput}
                        error={projectError}
                        isRunning={isRunningProject}
                        executionTime={projectExecutionTime}
                      />
                    </div>
                  </div>

                  {/* Show Solution after 3 failed attempts */}
                  {(projectFailedAttempts >= 3 || showProjectSolution) && !projectCompleted && (
                    <div className="mt-4">
                      <button
                        onClick={() => setShowProjectSolution(!showProjectSolution)}
                        className="text-sm text-muted-foreground hover:text-foreground mb-2"
                      >
                        {showProjectSolution ? "Hide Solution" : "Show Solution"}
                      </button>
                      {showProjectSolution && (
                        <div className="relative">
                          <div className="absolute top-2 right-2">
                            <CopyButton text={lesson.projectChallenge.solution} />
                          </div>
                          <pre className="p-3 pr-16 rounded-lg bg-background text-sm overflow-x-auto border border-amber-500/20">
                            <code>{lesson.projectChallenge.solution}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {projectCompleted && (
                    <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                      <span className="text-success font-medium">
                        ✅ Project Challenge Complete! +{lesson.projectChallenge.xpReward} XP earned
                      </span>
                    </div>
                  )}
                </div>
              )}
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
