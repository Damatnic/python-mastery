"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

interface ModuleTarget {
  slug: string;
  firstLesson: string;
  title: string;
  desc: string;
}

interface HomeTerminalProps {
  modules: ModuleTarget[];
}

interface HistoryEntry {
  cmd: string;
  out: string[];
}

const PROMPT_PATH = "~/lessons$";

export default function HomeTerminal({ modules }: HomeTerminalProps) {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const readProgress = useCallback(() => {
    try {
      const xp = parseInt(localStorage.getItem("python-mastery-xp") || "0", 10);
      const streak = parseInt(localStorage.getItem("python-mastery-streak") || "0", 10);
      const lessonsRaw = localStorage.getItem("python-mastery-completed");
      const completed = lessonsRaw ? (JSON.parse(lessonsRaw) as string[]).length : 0;
      return { xp, streak, completed };
    } catch {
      return { xp: 0, streak: 0, completed: 0 };
    }
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const parts = cmd.split(/\s+/);
      const head = parts[0]?.toLowerCase() ?? "";
      const arg = parts.slice(1).join(" ");
      const out: string[] = [];

      if (cmd === "") {
        setHistory((h) => [...h, { cmd: "", out: [] }]);
        return;
      }

      switch (head) {
        case "help":
          out.push("help          show this message");
          out.push("ls            list modules");
          out.push("stats         open /stats");
          out.push("projects      open /projects");
          out.push("whoami        rank · xp · streak");
          out.push("cd <module>   open module first lesson");
          out.push("cat readme    project overview");
          out.push("clear         clear screen");
          break;
        case "ls":
          for (const m of modules) {
            out.push(`${m.slug}/`);
          }
          break;
        case "stats":
          out.push("opening /stats…");
          router.push("/stats");
          break;
        case "projects":
          out.push("opening /projects…");
          router.push("/projects");
          break;
        case "whoami": {
          const p = readProgress();
          out.push(`damato · xp ${p.xp} · streak ${p.streak}d · ${p.completed} lessons done`);
          break;
        }
        case "cd": {
          if (!arg) {
            out.push("cd: missing argument · try `ls`");
            break;
          }
          const target = modules.find((m) => m.slug === arg.replace(/\/$/, ""));
          if (!target) {
            out.push(`cd: no such module: ${arg}`);
          } else {
            out.push(`opening ${target.slug}…`);
            router.push(`/learn/${target.slug}/${target.firstLesson}`);
          }
          break;
        }
        case "cat":
          if (arg === "readme" || arg === "readme.md") {
            out.push("# python-mastery");
            out.push("# personal practice site. wctc python + data.");
            out.push("# stack: next.js · pyodide · monaco");
          } else if (!arg) {
            out.push("cat: missing operand");
          } else {
            out.push(`cat: ${arg}: no such file`);
          }
          break;
        case "clear":
          setHistory([]);
          return;
        case "sudo":
          out.push("nice try.");
          break;
        case "rm":
          out.push("rm: refusing this one. your progress is safe.");
          break;
        case "exit":
          out.push("you cannot exit. just close the tab.");
          break;
        case "python":
        case "python3":
          out.push("python: the lessons are the repl. open one to start.");
          break;
        case "pip":
          out.push("pip: there is no pip here. pyodide handles it.");
          break;
        case "hello":
        case "hi":
        case "yo":
          out.push("yo.");
          break;
        case "coffee":
          out.push("brewing… ☕ (snake fuel.)");
          break;
        case "42":
        case "answer":
          out.push("the answer.");
          break;
        case "fortune": {
          const lines = [
            "readability counts. – pep 20",
            "explicit is better than implicit. – pep 20",
            "premature optimization is the root of all evil. – knuth",
            "loops aren't free. neither is pandas .apply().",
            "if list comprehension feels clever, it probably is. revisit it later.",
          ];
          out.push(lines[Math.floor(Math.random() * lines.length)]);
          break;
        }
        case "":
          break;
        default:
          out.push(`${head}: command not found · type \`help\``);
      }

      setHistory((h) => [...h, { cmd, out }]);
      setCmdHistory((h) => [...h, cmd]);
      setCmdIdx(-1);
    },
    [modules, router, readProgress],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = cmdIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIdx - 1);
      setCmdIdx(newIdx);
      setValue(cmdHistory[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIdx === -1) return;
      const newIdx = cmdIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setCmdIdx(-1);
        setValue("");
      } else {
        setCmdIdx(newIdx);
        setValue(cmdHistory[newIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const lower = value.toLowerCase();
      const commands = ["help", "ls", "stats", "projects", "whoami", "cd ", "cat readme", "clear"];
      if (lower.startsWith("cd ")) {
        const partial = lower.slice(3).trim();
        const match = modules.find((m) => m.slug.startsWith(partial));
        if (match) setValue(`cd ${match.slug}`);
      } else if (lower) {
        const match = commands.find((c) => c.startsWith(lower));
        if (match) setValue(match);
      }
    }
  };

  return (
    <div onClick={focusInput} className="cursor-text">
      {history.map((h, i) => (
        <div key={i} className="mb-1">
          <p>
            <span className="text-accent">damato@python</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-muted-foreground">{PROMPT_PATH}</span>{" "}
            <span>{h.cmd}</span>
          </p>
          {h.out.length > 0 && (
            <pre className="text-foreground/80 text-xs leading-relaxed mt-1 mb-2 whitespace-pre-wrap">
              {h.out.join("\n")}
            </pre>
          )}
        </div>
      ))}

      <label className="block">
        <p className="flex items-baseline flex-wrap">
          <span className="text-accent">damato@python</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-muted-foreground">{PROMPT_PATH}</span>{" "}
          <span className="inline-flex items-baseline">
            <span className="text-foreground whitespace-pre">{value}</span>
            <span
              className="ml-1 inline-block w-2 h-4 align-text-bottom bg-foreground terminal-cursor"
              aria-hidden="true"
            />
          </span>
        </p>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          aria-label="terminal command input. type help"
          className="sr-only"
        />
      </label>
    </div>
  );
}
