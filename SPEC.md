# Python Mastery — Interactive Python Learning Site

## Goal
Build an interactive Python learning website modeled after the SQL Mastery site at ~/Projects/sql-mastery.
Users write real Python code in a browser editor, run it with Pyodide (Python in WASM), and see output instantly.

## Stack
- Next.js 14 (App Router, TypeScript, Tailwind) — already scaffolded
- **Pyodide** for in-browser Python execution (load from CDN: https://cdn.jsdelivr.net/pyodide/v0.27.0/full/)
- **Monaco Editor** (@monaco-editor/react) for code editing
- **react-markdown** + **remark-gfm** for rendering theory content
- No backend needed — everything runs client-side

## Reference: SQL Mastery
~/Projects/sql-mastery — look at this for the overall structure, routing, and UI patterns.
Key files to study:
- app/learn/page.tsx — module dashboard
- app/learn/[moduleSlug]/[lessonSlug]/page.tsx — lesson page
- lib/lessons.ts — lesson data structure
- components/LessonView.tsx (or equivalent)

## Visual Design
- Dark theme (match SQL Mastery's dark palette — dark bg, subtle borders, colored accents)
- Purple accent color for Python (vs the blue SQL mastery uses)
- Sidebar nav with module sections
- Three-column lesson layout: Theory (left) | Code Editor + Output (right)

## Lesson Structure
Each lesson has:
- module, lesson number
- title, badge ('concept' | 'practice' | 'challenge')
- theory: markdown string with mental model, syntax, explanation
- starterCode: string — the code shown in editor on load
- examples: Array<{ title, explanation, code }> — runnable examples
- challenges: Array<{ id, prompt, hint, validateFn, solution }>

## Validation
validateFn is a string of JS code that receives `output` (string of stdout) and `locals` (dict of last-defined variables as JSON).
Example: `return output.includes("Hello") && output.split("\n").length >= 1`

## Modules & Lessons (35 total, 5 per module, 7 modules)

### Module 1: Python Basics (slug: python-basics)
1. Variables & F-Strings — assignment, types, f-string formatting
2. Lists & Tuples — indexing, slicing, append, len, iteration
3. Dictionaries — key/value, .get(), .items(), .keys(), nested dicts
4. Loops & Conditionals — for/while, if/elif/else, range(), enumerate()
5. Functions & Comprehensions — def, return, args, list comprehensions, dict comprehensions

### Module 2: Pandas Fundamentals (slug: pandas-fundamentals)
6. DataFrames & Series — creating from dict/CSV, .head(), .info(), .describe()
7. Selecting Data — df["col"], df[["col1","col2"]], .loc[], .iloc[]
8. Filtering Rows — boolean indexing, &/|, .isin(), .between()
9. Sorting & Adding Columns — .sort_values(), new column assignment, .apply()
10. Reading & Writing Files — pd.read_csv(), to_csv(), read parameters

### Module 3: Data Cleaning (slug: data-cleaning)
11. Missing Data — .isna(), .fillna(), .dropna(), checking nulls
12. Type Conversion — pd.to_numeric(), pd.to_datetime(), astype(), errors="coerce"
13. String Cleaning — .str.strip(), .str.lower(), .str.replace(), .str.contains()
14. Renaming & Dropping — .rename(), .drop(), .columns, column reordering
15. Duplicates & Reset — .duplicated(), .drop_duplicates(), .reset_index()

### Module 4: Grouping & Combining (slug: grouping-combining)
16. GroupBy Basics — .groupby().agg(), .mean()/.sum()/.count(), reset_index()
17. Multi-Column GroupBy — multiple group keys, multiple aggs, named aggs
18. Merge & Join — pd.merge(), how='inner'/'left'/'outer', on=, suffixes
19. Concat & Pivot — pd.concat(), .pivot_table(), index/values/aggfunc
20. Fixed-Width Files — pd.read_fwf(), colspecs, names parameter

### Module 5: String & File Ops (slug: string-file-ops)
21. String Methods Deep Dive — split, join, startswith/endswith, zfill, format
22. Regex Basics — re.findall(), re.sub(), re.match(), common patterns
23. File I/O — open(), read(), write(), with statement, csv module
24. JSON Handling — json.loads(), json.dumps(), nested access, to DataFrame
25. Error Handling — try/except, ValueError, KeyError, FileNotFoundError

### Module 6: Web & APIs (slug: web-apis)
26. Requests Basics — requests.get(), .status_code, .json(), headers
27. JSON from APIs — parsing nested JSON, list of dicts → DataFrame
28. BeautifulSoup Basics — BeautifulSoup(), .find(), .find_all(), .text, .get()
29. Scraping Tables — pd.read_html(), scraping structured data
30. Building a Data Pipeline — fetch → parse → clean → save (end-to-end mini project)

### Module 7: Functions & Apply (slug: functions-apply)
31. Lambda Functions — lambda syntax, when to use, map() + filter()
32. Apply & Map — df.apply(), Series.map(), axis=0/1
33. Custom Aggregations — agg() with dict, custom agg functions, transform()
34. Vectorized Operations — avoid loops, .str accessor, np.where(), pd.cut()
35. Capstone — combine all skills: load CSV → clean → group → export

## Starter Data (available in every lesson via Pyodide)
Pre-load this Python in the Pyodide environment before each lesson runs:

```python
import pandas as pd
import json
import io

# Students dataset
students_csv = """name,grade,score,subject,age
Alice,A,95,Math,20
Bob,B,82,Science,21
Carol,A,91,Math,19
Dave,C,74,English,22
Eve,B,88,Science,20
Frank,A,96,Math,21
Grace,C,71,English,19
Hank,B,85,Science,22"""

students = pd.read_csv(io.StringIO(students_csv))

# Sales dataset
sales_csv = """product,category,price,quantity,date
Widget A,Electronics,29.99,150,2024-01-15
Widget B,Electronics,49.99,80,2024-01-16
Gadget X,Tools,12.50,200,2024-01-15
Gadget Y,Tools,19.99,120,2024-01-17
Item Alpha,Electronics,99.99,45,2024-01-18
Item Beta,Tools,7.50,300,2024-01-19"""

sales = pd.read_csv(io.StringIO(sales_csv))
```

## Key UX Requirements
1. **Run button** — Shift+Enter or button to execute code
2. **Output panel** — shows stdout (print statements) + any errors in red
3. **Reset button** — resets editor to starter code
4. **Solution toggle** — "Show Solution" button (hidden by default)
5. **Pyodide loading state** — show "Loading Python..." while Pyodide initializes
6. **Module progress** — sidebar shows completed lessons (use localStorage)
7. **Dashboard** — /learn shows all 7 modules with progress bars

## File Structure
```
app/
  page.tsx — home/landing
  learn/
    page.tsx — module dashboard
    [moduleSlug]/[lessonSlug]/page.tsx — lesson page
lib/
  lessons.ts — lesson interface + module metadata + all lessons
  pyodide.ts — Pyodide initialization hook
components/
  Sidebar.tsx
  LessonView.tsx
  CodeEditor.tsx — Monaco with Python syntax
  OutputPanel.tsx
  ModuleCard.tsx
```

## Lessons Content
Write ALL 35 lessons with:
- Complete theory markdown (mental model, syntax, examples, when to use)
- Meaningful starter code (not empty — show them something that works)
- 2-3 runnable examples each
- 2 challenges per lesson with validateFn and solution

Lessons should feel like a smart tutor wrote them — clear mental models, real analogies, not dry documentation.

## Deployment
After build passes:
1. git add && git commit -m "feat: Python Mastery — complete interactive learning site"
2. git push (init remote: git remote add origin https://github.com/Damatnic/python-mastery.git)
   WAIT — don't push to GitHub, just build and verify locally. Nick will set up the repo.
3. Run: npm run build — must pass with 0 errors

## Final Notify
When completely done and build passes, run:
openclaw system event --text "Done: Python Mastery site built — all 35 lessons, Pyodide in-browser execution, ready to deploy" --mode now
