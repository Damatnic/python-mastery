"use client";

import { useEffect } from "react";

interface CheatItem {
  title: string;
  code: string;
  description: string;
}

const CHEAT_SHEETS: Record<string, CheatItem[]> = {
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
  "oop-tooling": [
    { title: "Define class", code: "class C:\\n    def __init__(self): ...", description: "Blueprint for objects" },
    { title: "Dataclass", code: "@dataclass\\nclass P: x: int", description: "Auto __init__/__repr__" },
    { title: "Type hint", code: "def f(a: int) -> int:", description: "Document in/out types" },
    { title: "Assert test", code: "assert double(2) == 4", description: "Cheap inline test" },
  ],
};

export function cheatSheetFor(moduleSlug: string): CheatItem[] {
  return CHEAT_SHEETS[moduleSlug] ?? [];
}

interface PythonCheatSheetProps {
  moduleSlug: string;
  open: boolean;
  onClose: () => void;
}

export default function PythonCheatSheet({
  moduleSlug,
  open,
  onClose,
}: PythonCheatSheetProps) {
  const items = cheatSheetFor(moduleSlug);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="python reference"
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[80vh] overflow-y-auto rounded border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border font-mono text-xs sticky top-0 bg-card">
          <span className="text-accent"># reference.py</span>
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            close · esc
          </button>
        </div>
        {items.length === 0 ? (
          <p className="p-4 font-mono text-xs text-muted-foreground">
            no quick reference for this module yet.
          </p>
        ) : (
          <ul className="divide-y divide-border/60">
            {items.map((item, i) => (
              <li
                key={i}
                className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <code className="px-3 py-1.5 rounded bg-[#0f0f12] border border-border text-xs text-accent font-mono whitespace-pre justify-self-start sm:justify-self-end">
                  {item.code.replace(/\\n/g, "\n")}
                </code>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
