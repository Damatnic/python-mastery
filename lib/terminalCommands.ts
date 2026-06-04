// Shared command engine for the terminal UIs (the homepage HomeTerminal and the
// site-wide CommandPalette). Keeping the switch here means both surfaces stay in
// perfect sync: a command added once works everywhere.

import { getAllModules } from "@/lib/lessons";
import { safeJsonParse } from "@/lib/storage";

export interface TerminalModule {
  slug: string;
  firstLesson: string;
  title: string;
  desc: string;
}

export interface TerminalResult {
  out: string[];
  clear?: boolean;
}

export interface TerminalContext {
  modules: TerminalModule[];
  navigate: (path: string) => void;
}

// Commands offered for tab-completion (and a quick reference for help).
export const TERMINAL_COMMANDS = [
  "help",
  "ls",
  "stats",
  "projects",
  "whoami",
  "cd ",
  "search ",
  "review ",
  "cat readme",
  "clear",
];

// Build the module list the terminal needs (slug + first lesson) directly from
// the lesson data so it can never go stale.
export function getTerminalModules(): TerminalModule[] {
  return getAllModules().map((m) => ({
    slug: m.slug,
    firstLesson: m.lessons[0]?.slug ?? "",
    title: m.slug,
    desc: m.description,
  }));
}

export function readProgress(): { xp: number; streak: number; completed: string[] } {
  const xp = parseInt(localStorage.getItem("python-mastery-xp") || "0", 10) || 0;
  const streak = parseInt(localStorage.getItem("python-mastery-streak") || "0", 10) || 0;
  const completed = safeJsonParse<string[]>(localStorage.getItem("python-mastery-completed"), []);
  return { xp, streak, completed };
}

// Tab-completion: returns the completed value, or null if nothing matches.
export function completeCommand(value: string, modules: TerminalModule[]): string | null {
  const lower = value.toLowerCase();
  if (lower.startsWith("cd ")) {
    const partial = lower.slice(3).trim();
    const match = modules.find((m) => m.slug.startsWith(partial));
    return match ? `cd ${match.slug}` : null;
  }
  if (lower) {
    const match = TERMINAL_COMMANDS.find((c) => c.startsWith(lower));
    return match ?? null;
  }
  return null;
}

export function runTerminalCommand(raw: string, ctx: TerminalContext): TerminalResult {
  const { modules, navigate } = ctx;
  const cmd = raw.trim();
  const parts = cmd.split(/\s+/);
  const head = parts[0]?.toLowerCase() ?? "";
  const arg = parts.slice(1).join(" ");
  const out: string[] = [];

  if (cmd === "") return { out: [] };

  switch (head) {
    case "help":
      out.push("help              show this message");
      out.push("ls                list modules");
      out.push("stats             open /stats");
      out.push("projects          open /projects");
      out.push("whoami            rank · xp · streak");
      out.push("cd <module>       open module first lesson");
      out.push("search <keyword>  find a lesson by keyword");
      out.push("review            interleaved mixed review (recall-gated SRS)");
      out.push("review <module>   revisit a random completed lesson in <module>");
      out.push("cat readme        project overview");
      out.push("clear             clear screen");
      break;
    case "ls":
      for (const m of modules) {
        out.push(`${m.slug}/`);
      }
      break;
    case "stats":
      out.push("opening /stats…");
      navigate("/stats");
      break;
    case "projects":
      out.push("opening /projects…");
      navigate("/projects");
      break;
    case "whoami": {
      const p = readProgress();
      out.push(`damato · xp ${p.xp} · streak ${p.streak}d · ${p.completed.length} lessons done`);
      break;
    }
    case "review": {
      if (!arg) {
        out.push("opening mixed review…");
        navigate("/review");
        break;
      }
      const allModules = getAllModules();
      const validKeys = new Set(
        allModules.flatMap((m) => m.lessons.map((l) => `${m.slug}/${l.slug}`)),
      );
      const p = readProgress();
      const pool = p.completed.filter(
        (k) => validKeys.has(k) && k.startsWith(`${arg}/`),
      );
      if (pool.length === 0) {
        out.push(
          arg
            ? `review: no completed lessons in module "${arg}". try \`ls\`.`
            : "review: nothing completed yet. finish a lesson first.",
        );
        break;
      }
      const pick = pool[Math.floor(Math.random() * pool.length)];
      out.push(`opening ${pick} (review)…`);
      navigate(`/learn/${pick}`);
      break;
    }
    case "search":
    case "find": {
      if (!arg) {
        out.push("search: missing keyword · usage: search <keyword>");
        break;
      }
      const needle = arg.toLowerCase();
      const allModules = getAllModules();
      const matches: Array<{ module: string; slug: string; title: string }> = [];
      for (const m of allModules) {
        for (const l of m.lessons) {
          const haystack = [l.title, m.slug, l.slug, l.theory?.slice(0, 400) ?? ""]
            .join(" ")
            .toLowerCase();
          if (haystack.includes(needle)) {
            matches.push({ module: m.slug, slug: l.slug, title: l.title });
            if (matches.length >= 8) break;
          }
        }
        if (matches.length >= 8) break;
      }
      if (matches.length === 0) {
        out.push(`search: no lesson matches "${arg}"`);
      } else {
        out.push(`# ${matches.length} match${matches.length === 1 ? "" : "es"} for "${arg}"`);
        for (const l of matches) {
          out.push(`  ${l.module}/${l.slug}  · ${l.title}`);
        }
        out.push("tip: cd <module-slug> to open a module's first lesson");
      }
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
        navigate(`/learn/${target.slug}/${target.firstLesson}`);
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
      return { out: [], clear: true };
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
        "readability counts. (pep 20)",
        "explicit is better than implicit. (pep 20)",
        "premature optimization is the root of all evil. (knuth)",
        "loops aren't free. neither is pandas .apply().",
        "if list comprehension feels clever, it probably is. revisit it later.",
      ];
      out.push(lines[Math.floor(Math.random() * lines.length)]);
      break;
    }
    default:
      out.push(`${head}: command not found · type \`help\``);
  }

  return { out };
}
