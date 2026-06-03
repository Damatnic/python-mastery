// Builds a clean Markdown study sheet for a module (theory + examples +
// practice prompts/hints + quick reference). Read-only: identical in
// showcase and learn mode, mutates nothing.
import type { Module } from "@/lib/types";
import { cheatSheetFor } from "@/components/PythonCheatSheet";

export function moduleNotesMarkdown(module: Module): string {
  const out: string[] = [];
  out.push(`# ${module.title}`);
  if (module.description) out.push(`\n${module.description}`);
  out.push(`\n> python-mastery notes · module \`${module.slug}\` · ${module.lessons.length} lessons`);

  module.lessons.forEach((lesson, i) => {
    out.push(`\n---\n`);
    out.push(`## ${String(i + 1).padStart(2, "0")}. ${lesson.title}`);
    if (lesson.theory?.trim()) out.push(`\n${lesson.theory.trim()}`);

    if (lesson.examples.length) {
      out.push(`\n### Examples`);
      for (const ex of lesson.examples) {
        out.push(`\n**${ex.title}**`);
        if (ex.explanation?.trim()) out.push(`\n${ex.explanation.trim()}`);
        if (ex.code?.trim()) out.push(`\n\`\`\`python\n${ex.code.trim()}\n\`\`\``);
      }
    }

    if (lesson.challenges.length) {
      out.push(`\n### Practice`);
      for (const c of lesson.challenges) {
        out.push(`\n- **${c.prompt}**`);
        if (c.hint?.trim()) out.push(`  \n  _tip:_ ${c.hint.trim()}`);
      }
    }
  });

  const tips = cheatSheetFor(module.slug);
  if (tips.length) {
    out.push(`\n---\n`);
    out.push(`## Quick reference`);
    for (const t of tips) {
      out.push(`\n- \`${t.code}\`: ${t.description}${t.title ? ` (${t.title})` : ""}`);
    }
  }

  out.push(`\n`);
  return out.join("\n");
}

export function downloadMarkdown(filename: string, content: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
