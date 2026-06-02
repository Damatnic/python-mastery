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
  "core-python": [
    { title: "Generator", code: "(x*x for x in nums)", description: "Lazy, one value at a time" },
    { title: "yield", code: "def g():\\n    yield 1", description: "Make a generator function" },
    { title: "Decorator", code: "@wraps\\ndef deco(f): ...", description: "Wrap a function" },
    { title: "Context manager", code: "with open(p) as f:", description: "Setup + guaranteed cleanup" },
    { title: "Custom exception", code: "class MyErr(Exception): pass", description: "Self-describing errors" },
    { title: "Counter", code: "Counter(items).most_common(1)", description: "Tally and rank" },
    { title: "await", code: "result = await coro()", description: "Run an async call" },
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
    { title: "Inherit", code: "class Dog(Animal):", description: "Subclass a parent" },
    { title: "super()", code: "super().__init__(name)", description: "Call the parent method" },
    { title: "Dataclass", code: "@dataclass\\nclass P: x: int", description: "Auto __init__/__repr__" },
    { title: "Property", code: "@property\\ndef area(self): ...", description: "Method that reads like an attribute" },
    { title: "Dunder add", code: "def __add__(self, other): ...", description: "Make + work on objects" },
    { title: "Abstract method", code: "@abstractmethod\\ndef pay(self): ...", description: "Force subclasses to implement" },
  ],
  "tooling-environments": [
    { title: "Create venv", code: "python -m venv .venv", description: "Isolated per-project packages" },
    { title: "Install", code: "pip install -r requirements.txt", description: "Reproduce dependencies" },
    { title: "pytest", code: "def test_add():\\n    assert add(2,3)==5", description: "Plain-assert tests" },
    { title: "Mock", code: "m = Mock(); m.return_value = 5", description: "Stand-in for real services" },
    { title: "Time it", code: "timeit.timeit(stmt, number=1000)", description: "Measure before optimizing" },
    { title: "Format + lint", code: "black . && ruff check .", description: "Auto-format, then lint" },
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
