# Python Mastery

Interactive Python learning platform. Write real Python and pandas code directly in your browser, no installation needed. 61 lessons across 11 modules, plus 3 guided projects.

**Live site:** [damato-python.vercel.app](https://damato-python.vercel.app)

**Stack:** Next.js · TypeScript · Tailwind · Pyodide (Python in the browser)

## What it does

- **Run Python in the browser.** Uses Pyodide so there's no install step. Pandas and numpy come pre-loaded.
- **Instant feedback.** Write code in the editor, click Run, see output. Automatic validation tells you when you got it right.
- **Progress tracking and streaks.** State persists across sessions. Continue where you left off.
- **Built specifically for WCTC coursework.** The Data Manipulation module mirrors what's actually being taught in WCTC's Python Data Manipulation class.

## Curriculum (11 modules, 61 lessons)

| Module | Topic | Lessons |
|---|---|---|
| 01 | Python Basics — variables, lists, dicts, loops, functions | 5 |
| 02 | Pandas Fundamentals — DataFrames, selecting, filtering, sorting | 5 |
| 03 | Data Cleaning — missing data, type conversion, duplicates | 5 |
| 04 | Grouping & Combining — groupby, merging, pivot tables | 5 |
| 05 | String & File Ops — string methods, regex, file I/O, JSON | 5 |
| 06 | Web & APIs — HTTP requests, JSON parsing, pipelines | 5 |
| 07 | Functions & Apply — lambda, apply/map, vectorization | 5 |
| 08 | Game Dev with Pygame — sprites, collision, physics, sound, state | 11 |
| 09 | Data Manipulation (WCTC) — strings, dates, combining, pivots | 5 |

Plus 3 guided projects to apply the skills end to end.

## Why I built it

I'm finishing an AAS in AI Data Specialist at WCTC. Halfway through my Python Data Manipulation course, I realized the assigned learning resources weren't great for actually practicing the pandas patterns the course expected. So I built this. It scratches my own itch, and it's free for anyone else taking the same course or learning pandas from scratch.

The Pygame module came later — I was taking the Python Game Development course and wanted browser-based lessons for that too.

## Local dev

```bash
git clone https://github.com/Damatnic/python-mastery.git
cd python-mastery
npm install
npm run dev
```

Open http://localhost:3000.

## Notable technical bits

- **Pyodide integration.** Loading Python in the browser means a ~10MB initial download but no server costs. Pandas runs entirely client-side.
- **Pygame lessons run locally** (not Pyodide) since Pygame needs a real display. The lessons walk you through running locally with a launcher script.
- **Mobile responsive.** The editor adapts for phones, though obviously a real keyboard helps.
