"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { CopyButton } from "./CopyButton";
import { TheoryContent } from "./TheoryContent";
import { LessonAnchorNav, type AnchorSection } from "./LessonAnchorNav";
import { NextLessonCard } from "./NextLessonCard";
import { usePyodide } from "@/lib/pyodide";
import { safeJsonParse, safeReadNumber } from "@/lib/storage";
import type { Lesson, Example, Challenge, ProjectChallenge } from "@/lib/types";
import { PROJECT_THREAD_INFO } from "@/lib/project-threads";

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
  prevLesson?: { slug: string; moduleSlug: string; title: string } | null;
  nextLesson?: { slug: string; moduleSlug: string; title: string } | null;
  isAlreadyComplete?: boolean;
  onOpenMobileNav?: () => void;
  onOpenTutorWithPrompt?: (prompt: string) => void;
}

// Validator for lesson challenges - evaluates predefined validation functions from lesson data
function createValidator(validateFnString: string): (output: string, locals: Record<string, unknown>) => boolean {
  return new Function("output", "locals", validateFnString) as (output: string, locals: Record<string, unknown>) => boolean;
}

function Breadcrumbs({ module, lessonTitle }: { module: string; lessonTitle: string }) {
  return (
    <nav className="flex items-center gap-1 text-xs font-mono text-muted-foreground mb-4" aria-label="Breadcrumb">
      <Link
        href="/learn"
        className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
      >
        ~/lessons
      </Link>
      <span>/</span>
      <span className="text-muted-foreground truncate">{module}</span>
      <span>/</span>
      <span className="text-foreground truncate max-w-[200px]">{lessonTitle}</span>
    </nav>
  );
}

function ChallengeProgressBar({ completed, total }: { completed: number; total: number }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3 mb-4 font-mono text-xs">
      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={total}>
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-muted-foreground whitespace-nowrap">
        {completed}/{total}
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
  onAskTutor,
}: {
  challenge: Challenge;
  index: number;
  total: number;
  isActive: boolean;
  isComplete: boolean;
  showSolution: boolean;
  onStart: () => void;
  onToggleSolution: () => void;
  onAskTutor?: () => void;
}) {
  return (
    <div
      className={`p-4 rounded border transition-colors ${
        isActive
          ? "border-accent bg-accent/5"
          : isComplete
          ? "border-success/40 bg-success/5"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-3 font-mono text-xs">
        <div className="flex items-baseline gap-2">
          <span className={isComplete ? "text-success" : isActive ? "text-accent" : "text-muted-foreground"}>
            {isComplete ? "✓" : ">"}
          </span>
          <span className="text-muted-foreground">
            challenge {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>
        {!isComplete && (
          <button
            onClick={onStart}
            className={`px-2 py-1 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive
                ? "border-accent text-accent bg-accent/10"
                : "border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
            }`}
          >
            {isActive ? "active" : "start"}
          </button>
        )}
      </div>

      <p className="text-foreground leading-relaxed text-sm mb-3">{challenge.prompt}</p>

      <div className="flex items-start gap-2 font-mono text-xs text-muted-foreground border-l-2 border-warning/40 pl-3">
        <span className="text-warning">!</span>
        <span>hint: {challenge.hint}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-border/40 font-mono text-xs flex items-center justify-between gap-3">
        <button
          onClick={onToggleSolution}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          <span aria-hidden="true">{showSolution ? "▼" : "▶"}</span>
          <span>{showSolution ? "hide solution" : "show solution"}</span>
        </button>
        {onAskTutor && (
          <button
            type="button"
            onClick={onAskTutor}
            className="text-muted-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            &gt; stuck? ask the tutor
          </button>
        )}
      </div>
      {showSolution && (
        <div className="mt-3 relative">
          <div className="absolute top-2 right-2 z-10">
            <CopyButton text={challenge.solution} />
          </div>
          <pre className="p-4 pr-12 rounded bg-[#0f0f12] border border-border text-xs overflow-x-auto">
            <code className="text-foreground">{challenge.solution}</code>
          </pre>
        </div>
      )}
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
    <div className="rounded border border-warning/40 bg-warning/5">
      <div className="px-4 py-3 border-b border-warning/20 font-mono text-xs">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-warning"># project-challenge</p>
            <p className="mt-1 text-muted-foreground">
              thread: {projectChallenge.threadTitle} · reward: {projectChallenge.xpReward} xp
            </p>
          </div>
          {isCompleted && <span className="text-success">✓ done</span>}
        </div>
      </div>

      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2"># brief</p>
        <p className="text-sm text-foreground leading-relaxed mb-5">{projectChallenge.context}</p>

        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2"># task</p>
        <h4 className="font-medium text-foreground mb-4">{projectChallenge.taskTitle}</h4>

        <div className="mb-4 font-mono text-xs">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-warning hover:text-warning/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            {showHint ? "▼" : "▶"} hint
          </button>
          {showHint && (
            <p className="mt-2 text-muted-foreground border-l-2 border-warning/40 pl-3">
              <span className="text-warning">!</span> {projectChallenge.hint}
            </p>
          )}
        </div>

        <div className="rounded border border-border overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-card border-b border-border font-mono text-xs">
            <span className="text-muted-foreground"># your code</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onResetProject}
                className="px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                reset
              </button>
              <button
                onClick={onRunProject}
                disabled={!isReady || isRunningProject}
                className="px-2 py-1 rounded border border-warning text-warning hover:bg-warning/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {isRunningProject ? "running…" : "run & check"}
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
          <div className="h-36 border-t border-border">
            <OutputPanel
              output={projectOutput}
              error={projectError}
              isRunning={isRunningProject}
              executionTime={projectExecutionTime}
            />
          </div>
        </div>

        {(failedAttempts >= 3 || showSolution) && !isCompleted && (
          <div className="mt-4 font-mono text-xs">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            >
              {showSolution ? "▼" : "▶"} solution
            </button>
            {showSolution && (
              <div className="mt-3 relative">
                <div className="absolute top-2 right-2 z-10">
                  <CopyButton text={projectChallenge.solution} />
                </div>
                <pre className="p-4 pr-12 rounded bg-[#0f0f12] border border-border overflow-x-auto">
                  <code className="text-foreground">{projectChallenge.solution}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {isCompleted && (
          <p className="mt-5 font-mono text-xs text-success">
            <span className="text-success">exit 0</span> · +{projectChallenge.xpReward} xp · {threadInfo.icon ? "" : ""}{projectChallenge.threadTitle}
          </p>
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
    <div className="mt-8 pt-6 border-t border-border font-mono text-xs">
      <div className="flex items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/learn/${prevLesson.moduleSlug}/${prevLesson.slug}`}
            className="group flex items-baseline gap-2 px-3 py-2 rounded border border-border hover:border-accent/50 hover:bg-card-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background min-w-0"
          >
            <span className="text-muted-foreground group-hover:text-accent">←</span>
            <span className="text-muted-foreground">prev:</span>
            <span className="text-foreground truncate max-w-[180px]">{prevLesson.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`}
            className="group flex items-baseline gap-2 px-3 py-2 rounded border border-accent text-accent hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background min-w-0"
          >
            <span className="text-muted-foreground">next:</span>
            <span className="truncate max-w-[180px]">{nextLesson.title}</span>
            <span>→</span>
          </Link>
        ) : (
          <Link
            href="/learn"
            className="flex items-baseline gap-2 px-3 py-2 rounded border border-success text-success hover:bg-success/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span>exit 0</span>
            <span className="text-muted-foreground">·</span>
            <span>back to ~/lessons</span>
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

export function LessonView({
  lesson,
  onComplete,
  prevLesson,
  nextLesson,
  isAlreadyComplete = false,
  onOpenMobileNav,
  onOpenTutorWithPrompt,
}: LessonViewProps) {
  const { isLoading, isReady, error: pyodideError, runCode } = usePyodide();
  const isPygameLesson = lesson.moduleSlug === "game-dev-pygame";
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
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
  const projectXpAwardedRef = useRef(false);

  const cheatSheetItems = useMemo(() => generateCheatSheet(lesson.moduleSlug), [lesson.moduleSlug]);

  // Load state from localStorage or reset when lesson changes
  useEffect(() => {
    const codeKey = `python-mastery-code-${lesson.moduleSlug}-${lesson.slug}`;
    const projectKey = `python-mastery-project-${lesson.moduleSlug}-${lesson.slug}`;
    
    const savedCode = localStorage.getItem(codeKey);
    setCode(savedCode || lesson.starterCode);
    
    setOutput("");
    setError(null);
    setExecutionTime(0);
    setShowSolution(null);
    setCompletedChallenges(new Set());
    setActiveChallenge(null);

    if (lesson.projectChallenge) {
      const savedProject = localStorage.getItem(projectKey);
      setProjectCode(savedProject || lesson.projectChallenge.starterCode);
    }
    setProjectOutput("");
    setProjectError(null);
    setProjectExecutionTime(0);
    setProjectFailedAttempts(0);
    setShowProjectSolution(false);
    setShowProjectHint(false);

    const completed = new Set(
      safeJsonParse<string[]>(localStorage.getItem("python-mastery-project-completed"), []),
    );
    setProjectCompleted(completed.has(`${lesson.moduleSlug}/${lesson.slug}`));
    projectXpAwardedRef.current = false;

    setTotalXP(safeReadNumber(localStorage.getItem("python-mastery-xp"), 0));
  }, [lesson.slug, lesson.starterCode, lesson.projectChallenge, lesson.moduleSlug]);

  // Save code to localStorage on change
  useEffect(() => {
    if (code !== lesson.starterCode) {
      localStorage.setItem(`python-mastery-code-${lesson.moduleSlug}-${lesson.slug}`, code);
    }
  }, [code, lesson.moduleSlug, lesson.slug, lesson.starterCode]);

  useEffect(() => {
    if (lesson.projectChallenge && projectCode !== lesson.projectChallenge.starterCode) {
      localStorage.setItem(`python-mastery-project-${lesson.moduleSlug}-${lesson.slug}`, projectCode);
    }
  }, [projectCode, lesson.projectChallenge, lesson.moduleSlug, lesson.slug]);

  if (pyodideError) {
    return (
      <div className="flex-1 flex items-start justify-center p-8 bg-background font-mono text-sm">
        <div className="max-w-md w-full">
          <p>
            <span className="text-accent">damato@python</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-muted-foreground">~$</span> python --start
          </p>
          <p className="mt-2 text-error">
            error: failed to load pyodide. likely a slow or restricted network.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-3 py-2 rounded border border-error text-error hover:bg-error/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            → refresh &amp; retry
          </button>
        </div>
      </div>
    );
  }

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
          setOutput((prev) => prev + "\n\n# challenge validated · exit 0");

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
      } catch (err) {
        console.warn(`[LessonView] validateFn threw for challenge ${activeChallenge.id}:`, err);
        setOutput(
          (prev) =>
            prev +
            "\n\n# validator error in this challenge. open devtools to see the cause and please report.",
        );
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
        if (isValid && !projectCompleted && !projectXpAwardedRef.current) {
          projectXpAwardedRef.current = true;
          setProjectCompleted(true);
          const xpGained = lesson.projectChallenge.xpReward;
          const newXP = totalXP + xpGained;
          setTotalXP(newXP);
          localStorage.setItem("python-mastery-xp", String(newXP));
          window.dispatchEvent(new Event("xp-updated"));

          const completed = new Set(
            safeJsonParse<string[]>(localStorage.getItem("python-mastery-project-completed"), []),
          );
          completed.add(`${lesson.moduleSlug}/${lesson.slug}`);
          localStorage.setItem("python-mastery-project-completed", JSON.stringify([...completed]));

          setProjectOutput((prev) => prev + `\n\n# project validated · exit 0 · +${xpGained} xp`);
        } else if (!isValid) {
          setProjectFailedAttempts((prev) => prev + 1);
          setProjectOutput((prev) => prev + "\n\n# validation failed · check the output and try again");
        }
      } catch (err) {
        console.warn(`[LessonView] project validateFn threw:`, err);
        setProjectFailedAttempts((prev) => prev + 1);
        setProjectOutput(
          (prev) =>
            prev +
            "\n\n# validator error in this project challenge. open devtools to see the cause and please report.",
        );
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

  const anchorSections: AnchorSection[] = useMemo(() => {
    const s: AnchorSection[] = [{ id: "theory", label: "theory" }];
    if (lesson.examples.length > 0) s.push({ id: "examples", label: "examples", badge: String(lesson.examples.length) });
    if (lesson.challenges.length > 0) {
      s.push({
        id: "challenges",
        label: "challenges",
        badge: `${completedChallenges.size}/${lesson.challenges.length}`,
      });
    }
    if (lesson.projectChallenge) s.push({ id: "project", label: "project" });
    if (cheatSheetItems.length > 0) s.push({ id: "cheatsheet", label: "cheatsheet" });
    return s;
  }, [lesson.examples.length, lesson.challenges.length, lesson.projectChallenge, completedChallenges.size, cheatSheetItems.length]);

  const allChallengesDoneThisSession =
    lesson.challenges.length > 0 &&
    completedChallenges.size === lesson.challenges.length &&
    (!lesson.projectChallenge || projectCompleted);

  const showNextLessonCard = allChallengesDoneThisSession || isAlreadyComplete;

  return (
    <div className="flex flex-col lg:flex-row flex-1 h-full overflow-hidden relative">
      {showCompletionToast && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down motion-reduce:animate-none font-mono text-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-baseline gap-2 px-4 py-2 rounded border border-success bg-background/95 backdrop-blur">
            <span className="text-success">exit 0</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-foreground">lesson complete</span>
          </div>
        </div>
      )}

      <div className="flex lg:hidden border-b border-border bg-card font-mono text-xs">
        {onOpenMobileNav && (
          <button
            onClick={onOpenMobileNav}
            className="px-3 py-3 border-r border-border text-muted-foreground hover:text-foreground"
            aria-label="open module nav"
          >
            ☰
          </button>
        )}
        <button
          onClick={() => setMobilePane("content")}
          className={`flex-1 px-4 py-3 transition-colors ${
            mobilePane === "content"
              ? "text-accent border-b border-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {mobilePane === "content" ? "> " : "  "}learn
        </button>
        <button
          onClick={() => setMobilePane("editor")}
          className={`flex-1 px-4 py-3 transition-colors ${
            mobilePane === "editor"
              ? "text-accent border-b border-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {mobilePane === "editor" ? "> " : "  "}code
        </button>
      </div>

      <div className={`w-full lg:w-1/2 flex flex-col border-r border-border overflow-hidden ${mobilePane !== "content" ? "hidden lg:flex" : "flex"}`}>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Breadcrumbs module={lesson.module} lessonTitle={lesson.title} />
          <h1 className="text-2xl font-semibold text-foreground mb-2">{lesson.title}</h1>
          <p className="flex items-center gap-2 mb-4 font-mono text-xs text-muted-foreground">
            <span>[{lesson.badge}]</span>
            <span>·</span>
            <span>~{lesson.badge === "concept" ? "10" : lesson.badge === "practice" ? "12" : "18"} min</span>
          </p>

          <LessonAnchorNav sections={anchorSections} />

          <section id="theory" className="scroll-mt-20 mt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3"># theory</p>
            <TheoryContent content={lesson.theory} />
          </section>

          {lesson.examples.length > 0 && (
            <section id="examples" className="scroll-mt-20 mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                # examples <span className="text-muted-foreground/70">[{lesson.examples.length}]</span>
              </p>
              <p className="font-mono text-xs text-muted-foreground mb-4">
                load any into the editor and modify.
              </p>
              <div className="space-y-4">
                {lesson.examples.map((example, index) => (
                  <div key={index} className="p-4 rounded border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-mono text-sm text-foreground">{example.title}</h3>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <CopyButton text={example.code} />
                        <button
                          onClick={() => loadExample(example)}
                          className="px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          load in editor
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{example.explanation}</p>
                    <pre className="p-4 rounded bg-[#0f0f12] border border-border text-xs overflow-x-auto">
                      <code className="text-foreground">{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          )}

          {lesson.challenges.length > 0 && (
            <section id="challenges" className="scroll-mt-20 mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                # challenges <span className="text-muted-foreground/70">[{lesson.challenges.length}]</span>
              </p>
              <p className="font-mono text-xs text-muted-foreground mb-3">
                finish the challenges to mark the lesson done.
              </p>
              <ChallengeProgressBar
                completed={completedChallenges.size}
                total={lesson.challenges.length}
              />
              <div className="space-y-4">
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
                    onAskTutor={
                      onOpenTutorWithPrompt
                        ? () => onOpenTutorWithPrompt(`I'm stuck on this challenge: ${challenge.prompt}`)
                        : undefined
                    }
                  />
                ))}
              </div>
            </section>
          )}

          {lesson.projectChallenge && (
            <section id="project" className="scroll-mt-20 mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3"># project</p>
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
            </section>
          )}

          {showNextLessonCard && <NextLessonCard nextLesson={nextLesson} />}

          {cheatSheetItems.length > 0 && (
            <section id="cheatsheet" className="scroll-mt-20 mt-10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3"># cheatsheet</p>
              <p className="font-mono text-xs text-muted-foreground mb-3">
                key syntax and methods for this module.
              </p>
              <ul className="divide-y divide-border/40 border-y border-border/40">
                {cheatSheetItems.map((item, index) => (
                  <li key={index} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <code className="px-3 py-1.5 rounded bg-[#0f0f12] border border-border text-xs text-accent font-mono whitespace-nowrap justify-self-start sm:justify-self-end">
                      {item.code}
                    </code>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <LessonNavigation prevLesson={prevLesson} nextLesson={nextLesson} />
        </div>
      </div>

      <div data-tour-target="editor" className={`w-full lg:w-1/2 flex flex-col overflow-hidden ${mobilePane !== "editor" ? "hidden lg:flex" : "flex"}`}>
        {isPygameLesson && (
          <div className="px-4 py-3 border-b border-border bg-warning/5 font-mono text-xs">
            <p className="text-warning"># pygame: run locally</p>
            <p className="mt-1 text-muted-foreground">
              pygame needs a real window so it can&apos;t run in the browser. use the launcher or copy the code panel into a .py file.
            </p>
            <code className="mt-2 inline-block text-warning bg-background/60 px-2 py-1 rounded">
              cd ~/Projects/python-game-dev && python3 run.py
            </code>
          </div>
        )}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card font-mono text-xs">
          <div className="flex items-center gap-2">
            {isPygameLesson ? (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-warning" aria-hidden="true" />
                <span className="text-warning">pygame: run locally</span>
              </>
            ) : isLoading ? (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-warning animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                <span className="text-warning">pyodide: loading…</span>
              </>
            ) : pyodideError ? (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-error" aria-hidden="true" />
                <span className="text-error">pyodide: {pyodideError}</span>
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-success" aria-hidden="true" />
                <span className="text-success">pyodide: ready</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              reset
            </button>
            <button
              onClick={handleRun}
              disabled={!isReady || isRunning}
              className="px-2 py-1 rounded border border-accent text-accent hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background flex items-center gap-1.5"
            >
              {isRunning ? "running…" : "run"}
              {!isRunning && (
                <kbd className="hidden sm:inline text-[10px] opacity-60">⌘↵</kbd>
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
