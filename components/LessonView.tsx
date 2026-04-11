"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { CopyButton } from "./CopyButton";
import { TheoryContent } from "./TheoryContent";
import { usePyodide } from "@/lib/pyodide";
import type { Lesson, Example, Challenge, ProjectChallenge, Module } from "@/lib/types";
import { PROJECT_THREAD_INFO } from "@/lib/project-threads";

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
  modules?: Module[];
  prevLesson?: { slug: string; moduleSlug: string; title: string } | null;
  nextLesson?: { slug: string; moduleSlug: string; title: string } | null;
}

// Validator for lesson challenges - evaluates predefined validation functions from lesson data
function createValidator(validateFnString: string): (output: string, locals: Record<string, unknown>) => boolean {
  return new Function("output", "locals", validateFnString) as (output: string, locals: Record<string, unknown>) => boolean;
}

function Breadcrumbs({ module, lessonTitle }: { module: string; lessonTitle: string }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link href="/learn" className="hover:text-foreground transition-colors">
        Python Mastery
      </Link>
      <span className="text-border">/</span>
      <span className="text-muted-foreground">{module}</span>
      <span className="text-border">/</span>
      <span className="text-foreground font-medium truncate max-w-[200px]">{lessonTitle}</span>
    </nav>
  );
}

function ChallengeProgressBar({ completed, total }: { completed: number; total: number }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-purple-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {completed}/{total} completed
      </span>
    </div>
  );
}

function ChallengeCard({
  challenge,
  index,
  total,
  isActive,
  isComplete,
  showSolution,
  onStart,
  onToggleSolution,
}: {
  challenge: Challenge;
  index: number;
  total: number;
  isActive: boolean;
  isComplete: boolean;
  showSolution: boolean;
  onStart: () => void;
  onToggleSolution: () => void;
}) {
  return (
    <div
      className={`challenge-card p-4 rounded-xl border-2 transition-all ${
        isActive
          ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
          : isComplete
          ? "border-success/50 bg-success/5"
          : "border-border bg-card hover:border-border-hover"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
              isComplete
                ? "bg-success text-white"
                : isActive
                ? "bg-accent text-white"
                : "bg-border text-muted-foreground"
            }`}
          >
            {isComplete ? "✓" : index + 1}
          </div>
          <div>
            <span className="text-xs text-muted-foreground">
              Challenge {index + 1} of {total}
            </span>
          </div>
        </div>
        {!isComplete && (
          <button
            onClick={onStart}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-all ${
              isActive
                ? "bg-accent text-white"
                : "bg-card-hover text-foreground hover:bg-accent/20"
            }`}
          >
            {isActive ? "Active" : "Start"}
          </button>
        )}
      </div>

      <div className="mb-3">
        <p className="font-medium text-foreground leading-relaxed">{challenge.prompt}</p>
      </div>

      <div className="mb-3 p-3 rounded-lg bg-background/50 border border-border/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span>🎯</span>
          <span className="font-medium">What the validator checks:</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your code should produce output that demonstrates the task is complete.
        </p>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
        <span className="text-amber-400 text-sm">💡</span>
        <div>
          <span className="text-xs text-amber-400 font-medium">Hint:</span>
          <p className="text-sm text-muted-foreground mt-0.5">{challenge.hint}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <button
          onClick={onToggleSolution}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <span>{showSolution ? "▼" : "▶"}</span>
          <span>{showSolution ? "Hide" : "Show"} Solution</span>
        </button>
        {showSolution && (
          <div className="mt-3 relative">
            <div className="absolute top-2 right-2 z-10">
              <CopyButton text={challenge.solution} />
            </div>
            <pre className="p-4 pr-12 rounded-lg bg-[#1e1e1e] border border-border text-sm overflow-x-auto">
              <code className="text-foreground">{challenge.solution}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectChallengeDashboard({
  projectChallenge,
  isCompleted,
  onRunProject,
  onResetProject,
  projectCode,
  setProjectCode,
  projectOutput,
  projectError,
  projectExecutionTime,
  isRunningProject,
  isReady,
  showHint,
  setShowHint,
  showSolution,
  setShowSolution,
  failedAttempts,
}: {
  projectChallenge: ProjectChallenge;
  isCompleted: boolean;
  onRunProject: () => void;
  onResetProject: () => void;
  projectCode: string;
  setProjectCode: (code: string) => void;
  projectOutput: string;
  projectError: string | null;
  projectExecutionTime: number;
  isRunningProject: boolean;
  isReady: boolean;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  showSolution: boolean;
  setShowSolution: (show: boolean) => void;
  failedAttempts: number;
}) {
  const threadInfo = PROJECT_THREAD_INFO[projectChallenge.threadId];

  return (
    <div className="project-challenge mt-8 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent overflow-hidden">
      <div className="px-5 py-4 bg-amber-500/10 border-b border-amber-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
              🏗️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-foreground">Project Challenge</h3>
                {isCompleted && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-success/20 text-success font-medium">
                    ✓ Complete
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                <span>{threadInfo.icon}</span>
                <span>{projectChallenge.threadTitle}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-400">+{projectChallenge.xpReward}</div>
            <div className="text-xs text-amber-400/70">XP Reward</div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-5 p-4 rounded-xl bg-card border border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              PM
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground">Project Manager</span>
                <span className="text-xs text-muted-foreground">2:34 PM</span>
              </div>
              <p className="text-foreground/90 leading-relaxed">{projectChallenge.context}</p>
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
          <span className="text-amber-400">📋</span>
          {projectChallenge.taskTitle}
        </h4>

        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>{showHint ? "▼" : "▶"}</span>
            <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
          </button>
          {showHint && (
            <div className="mt-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-2">
                <span className="text-amber-400">💡</span>
                <p className="text-sm text-foreground/80">{projectChallenge.hint}</p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-amber-500/30 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/30">
            <span className="text-sm font-medium text-amber-400">Your Code</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onResetProject}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={onRunProject}
                disabled={!isReady || isRunningProject}
                className="text-xs px-4 py-1.5 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
              >
                {isRunningProject ? "Running..." : "Run & Check"}
              </button>
            </div>
          </div>
          <div className="h-64">
            <CodeEditor
              code={projectCode}
              onChange={setProjectCode}
              onRun={onRunProject}
              disabled={!isReady}
            />
          </div>
          <div className="h-36 border-t border-amber-500/30">
            <OutputPanel
              output={projectOutput}
              error={projectError}
              isRunning={isRunningProject}
              executionTime={projectExecutionTime}
            />
          </div>
        </div>

        {(failedAttempts >= 3 || showSolution) && !isCompleted && (
          <div className="mt-4">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <span>{showSolution ? "▼" : "▶"}</span>
              <span>{showSolution ? "Hide Solution" : "Show Solution"}</span>
            </button>
            {showSolution && (
              <div className="mt-3 relative">
                <div className="absolute top-2 right-2 z-10">
                  <CopyButton text={projectChallenge.solution} />
                </div>
                <pre className="p-4 pr-12 rounded-lg bg-[#1e1e1e] border border-amber-500/20 text-sm overflow-x-auto">
                  <code className="text-foreground">{projectChallenge.solution}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {isCompleted && (
          <div className="mt-5 p-4 rounded-xl bg-success/10 border border-success/30 text-center">
            <div className="text-success font-semibold text-lg mb-1">
              ✅ Project Challenge Complete!
            </div>
            <div className="text-success/80 text-sm">
              You earned +{projectChallenge.xpReward} XP
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonNavigation({
  prevLesson,
  nextLesson,
}: {
  prevLesson?: { slug: string; moduleSlug: string; title: string } | null;
  nextLesson?: { slug: string; moduleSlug: string; title: string } | null;
}) {
  if (!prevLesson && !nextLesson) return null;

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/learn/${prevLesson.moduleSlug}/${prevLesson.slug}`}
            className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border-hover hover:bg-card-hover transition-colors"
          >
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">←</span>
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="text-sm font-medium text-foreground truncate max-w-[150px]">
                {prevLesson.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`}
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
          >
            <div className="text-right">
              <div className="text-xs text-white/80">Next Lesson</div>
              <div className="text-sm font-semibold truncate max-w-[180px]">
                {nextLesson.title}
              </div>
            </div>
            <span className="text-xl">→</span>
          </Link>
        ) : (
          <Link
            href="/learn"
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-success hover:bg-success/90 text-white transition-all shadow-lg shadow-success/25"
          >
            <div className="text-right">
              <div className="text-xs text-white/80">Congratulations!</div>
              <div className="text-sm font-semibold">Back to Dashboard</div>
            </div>
            <span className="text-xl">🎉</span>
          </Link>
        )}
      </div>
    </div>
  );
}

function generateCheatSheet(moduleSlug: string): Array<{ title: string; code: string; description: string }> {
  const cheatSheets: Record<string, Array<{ title: string; code: string; description: string }>> = {
    "python-basics": [
      { title: "Print output", code: "print(value)", description: "Display values in the output" },
      { title: "Create variable", code: "x = 10", description: "Assign a value to a variable" },
      { title: "String formatting", code: 'f"Hello {name}"', description: "Insert variables into strings" },
      { title: "List creation", code: "[1, 2, 3]", description: "Create a list of items" },
    ],
    "pandas-fundamentals": [
      { title: "Read CSV", code: "pd.read_csv('file.csv')", description: "Load data from CSV file" },
      { title: "View first rows", code: "df.head()", description: "See first 5 rows" },
      { title: "Select column", code: "df['column']", description: "Get a single column" },
      { title: "Filter rows", code: "df[df['col'] > 5]", description: "Filter by condition" },
    ],
    "data-cleaning": [
      { title: "Check nulls", code: "df.isnull().sum()", description: "Count missing values" },
      { title: "Fill nulls", code: "df.fillna(value)", description: "Replace missing values" },
      { title: "Drop nulls", code: "df.dropna()", description: "Remove rows with nulls" },
      { title: "Drop duplicates", code: "df.drop_duplicates()", description: "Remove duplicate rows" },
    ],
    "grouping-combining": [
      { title: "Group by", code: "df.groupby('col').sum()", description: "Group and aggregate" },
      { title: "Multiple aggs", code: ".agg(['sum', 'mean'])", description: "Multiple aggregations" },
      { title: "Merge", code: "pd.merge(df1, df2, on='key')", description: "Join two DataFrames" },
      { title: "Concat", code: "pd.concat([df1, df2])", description: "Stack DataFrames" },
    ],
    "string-file-ops": [
      { title: "String methods", code: "df['col'].str.lower()", description: "Apply string methods" },
      { title: "Contains", code: "df['col'].str.contains('x')", description: "Check if contains" },
      { title: "Replace", code: "df['col'].str.replace('a','b')", description: "Replace in strings" },
      { title: "Split", code: "df['col'].str.split(',')", description: "Split strings" },
    ],
    "web-apis": [
      { title: "GET request", code: "requests.get(url)", description: "Fetch data from URL" },
      { title: "JSON response", code: "response.json()", description: "Parse JSON response" },
      { title: "JSON to DataFrame", code: "pd.DataFrame(data)", description: "Convert JSON to df" },
      { title: "API params", code: "params={'key': 'val'}", description: "Pass URL parameters" },
    ],
    "functions-apply": [
      { title: "Define function", code: "def func(x): return x*2", description: "Create a function" },
      { title: "Apply to column", code: "df['col'].apply(func)", description: "Apply function to column" },
      { title: "Lambda", code: "lambda x: x * 2", description: "Anonymous function" },
      { title: "Map values", code: "df['col'].map(dict)", description: "Map using dictionary" },
    ],
  };

  return cheatSheets[moduleSlug] || [];
}

export function LessonView({ lesson, onComplete, prevLesson, nextLesson }: LessonViewProps) {
  const { isLoading, isReady, error: pyodideError, runCode } = usePyodide();
  const isPygameLesson = lesson.moduleSlug === "game-dev-pygame";
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"theory" | "examples" | "challenges" | "cheatsheet">("theory");
  const [showSolution, setShowSolution] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

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
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  const cheatSheetItems = useMemo(() => generateCheatSheet(lesson.moduleSlug), [lesson.moduleSlug]);

  // Reset state when lesson changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting state when lesson changes
    setCode(lesson.starterCode);
    setOutput("");
    setError(null);
    setExecutionTime(0);
    setShowSolution(null);
    setCompletedChallenges(new Set());
    setActiveChallenge(null);
    setActiveTab("theory");

    if (lesson.projectChallenge) {
      setProjectCode(lesson.projectChallenge.starterCode);
    }
    setProjectOutput("");
    setProjectError(null);
    setProjectExecutionTime(0);
    setProjectFailedAttempts(0);
    setShowProjectSolution(false);
    setShowProjectHint(false);

    const savedCompletions = localStorage.getItem("python-mastery-project-completed");
    if (savedCompletions) {
      const completed = new Set(JSON.parse(savedCompletions));
      setProjectCompleted(completed.has(`${lesson.moduleSlug}/${lesson.slug}`));
    } else {
      setProjectCompleted(false);
    }

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
            // Show completion toast
            setShowCompletionToast(true);
            setTimeout(() => setShowCompletionToast(false), 3000);
            onComplete();
          }
        }
      } catch {
        // Validation error
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
          window.dispatchEvent(new Event("xp-updated"));

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

  const [mobilePane, setMobilePane] = useState<"content" | "editor">("content");

  return (
    <div className="flex flex-col lg:flex-row flex-1 h-full overflow-hidden relative">
      {/* Completion Toast */}
      {showCompletionToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-success text-white shadow-2xl shadow-success/30">
            <span className="text-2xl">✓</span>
            <div>
              <div className="font-bold text-lg">Lesson Complete!</div>
              <div className="text-sm text-white/90">+10 XP earned</div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile pane toggle — only visible on small screens */}
      <div className="flex lg:hidden border-b border-border bg-card">
        <button
          onClick={() => setMobilePane("content")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            mobilePane === "content"
              ? "text-accent border-b-2 border-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📖 Learn
        </button>
        <button
          onClick={() => setMobilePane("editor")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            mobilePane === "editor"
              ? "text-accent border-b-2 border-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          💻 Code
        </button>
      </div>

      <div className={`w-full lg:w-1/2 flex flex-col border-r border-border overflow-hidden ${mobilePane !== "content" ? "hidden lg:flex" : "flex"}`}>
        <div className="flex border-b border-border bg-card">
          {(["theory", "examples", "challenges", "cheatsheet"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "cheatsheet" ? "Cheat Sheet" : tab}
              {tab === "challenges" && (
                <span className="ml-2 text-xs">
                  ({completedChallenges.size}/{lesson.challenges.length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "theory" && (
            <div>
              <Breadcrumbs module={lesson.module} lessonTitle={lesson.title} />
              <h1 className="text-2xl font-bold text-foreground mb-2">{lesson.title}</h1>
              <div className="flex items-center gap-2 mb-6">
                <span className={`inline-block px-2.5 py-1 text-xs rounded-full badge-${lesson.badge}`}>
                  {lesson.badge}
                </span>
                <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-muted/30 text-muted-foreground border border-border">
                  ~{lesson.badge === "concept" ? "10" : lesson.badge === "practice" ? "12" : "18"} min
                </span>
              </div>
              <TheoryContent content={lesson.theory} />
              <LessonNavigation prevLesson={prevLesson} nextLesson={nextLesson} />
            </div>
          )}

          {activeTab === "examples" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Code Examples</h2>
              <p className="text-muted-foreground text-sm">
                Click &quot;Load in Editor&quot; to try any example in the code editor.
              </p>
              {lesson.examples.map((example, index) => (
                <div key={index} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{example.title}</h3>
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
                  <p className="text-sm text-muted-foreground mb-4">{example.explanation}</p>
                  <pre className="p-4 rounded-lg bg-[#1e1e1e] border border-border text-sm overflow-x-auto">
                    <code className="text-foreground">{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Challenges</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete all challenges to master this lesson.
                </p>
                <ChallengeProgressBar
                  completed={completedChallenges.size}
                  total={lesson.challenges.length}
                />
              </div>

              {lesson.challenges.map((challenge, index) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  index={index}
                  total={lesson.challenges.length}
                  isActive={activeChallenge?.id === challenge.id}
                  isComplete={completedChallenges.has(challenge.id)}
                  showSolution={showSolution === challenge.id}
                  onStart={() => startChallenge(challenge)}
                  onToggleSolution={() =>
                    setShowSolution(showSolution === challenge.id ? null : challenge.id)
                  }
                />
              ))}

              {lesson.projectChallenge && (
                <ProjectChallengeDashboard
                  projectChallenge={lesson.projectChallenge}
                  isCompleted={projectCompleted}
                  onRunProject={handleRunProject}
                  onResetProject={handleResetProject}
                  projectCode={projectCode}
                  setProjectCode={setProjectCode}
                  projectOutput={projectOutput}
                  projectError={projectError}
                  projectExecutionTime={projectExecutionTime}
                  isRunningProject={isRunningProject}
                  isReady={isReady}
                  showHint={showProjectHint}
                  setShowHint={setShowProjectHint}
                  showSolution={showProjectSolution}
                  setShowSolution={setShowProjectSolution}
                  failedAttempts={projectFailedAttempts}
                />
              )}
            </div>
          )}

          {activeTab === "cheatsheet" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Quick Reference</h2>
                <p className="text-muted-foreground text-sm">
                  Key syntax and methods for this module.
                </p>
              </div>

              {cheatSheetItems.length > 0 ? (
                <div className="grid gap-3">
                  {cheatSheetItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <code className="px-3 py-2 rounded-lg bg-[#1e1e1e] border border-border text-sm text-accent font-mono whitespace-nowrap">
                          {item.code}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground rounded-xl border border-border bg-card">
                  <span className="text-3xl mb-3 block">📋</span>
                  <p>No cheat sheet available for this module yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`w-full lg:w-1/2 flex flex-col overflow-hidden ${mobilePane !== "editor" ? "hidden lg:flex" : "flex"}`}>
        {/* Pygame lessons: show "Run Locally" banner instead of Pyodide status */}
        {isPygameLesson && (
          <div className="px-4 py-3 border-b border-border bg-amber-500/10 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span>🎮</span>
              <span className="font-semibold text-amber-400">Pygame — Run Locally</span>
            </div>
            <p className="text-muted-foreground text-xs">
              Pygame needs a real window, so it can&apos;t run in the browser. Copy this code and run it in your terminal:
            </p>
            <code className="block mt-1 text-xs text-amber-300 bg-black/30 px-2 py-1 rounded">
              python3 ~/Projects/python-game-dev/{lesson.slug.replace('pygame-', '')}/
            </code>
          </div>
        )}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            {isPygameLesson ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-sm">🎮</span>
                <span className="text-sm text-amber-400 font-medium">Copy & Run Locally</span>
              </div>
            ) : isLoading ? (
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

        <div className="flex-1 min-h-0 p-4 pb-2">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            disabled={!isReady}
          />
        </div>

        <div className="h-48 p-4 pt-2">
          <OutputPanel
            output={output}
            error={error}
            isRunning={isRunning}
            executionTime={executionTime}
            activeChallenge={activeChallenge ? { hint: activeChallenge.hint, prompt: activeChallenge.prompt } : null}
          />
        </div>
      </div>
    </div>
  );
}
