import Link from "next/link";

const modules = [
  { num: "01", slug: "python-basics", firstLesson: "variables-fstrings", title: "Python Basics", desc: "Variables, lists, dicts, loops, functions.", lessons: 5 },
  { num: "02", slug: "pandas-fundamentals", firstLesson: "dataframes-series", title: "Pandas Fundamentals", desc: "DataFrames, selecting, filtering, sorting.", lessons: 5 },
  { num: "03", slug: "data-cleaning", firstLesson: "missing-data", title: "Data Cleaning", desc: "Missing data, type conversion, duplicates.", lessons: 5 },
  { num: "04", slug: "grouping-combining", firstLesson: "groupby-basics", title: "Grouping & Combining", desc: "GroupBy, merging, pivot tables.", lessons: 5 },
  { num: "05", slug: "string-file-ops", firstLesson: "string-methods-deep", title: "Strings & Files", desc: "String methods, regex, file I/O, JSON.", lessons: 5 },
  { num: "06", slug: "web-apis", firstLesson: "requests-basics", title: "Web & APIs", desc: "HTTP requests, JSON parsing, pipelines.", lessons: 5 },
  { num: "07", slug: "functions-apply", firstLesson: "lambda-functions", title: "Functions & Apply", desc: "Lambda, apply/map, vectorization.", lessons: 5 },
  { num: "08", slug: "game-dev-pygame", firstLesson: "pygame-basics", title: "Pygame", desc: "Game loops, sprites, collisions, sound.", lessons: 11 },
  { num: "09", slug: "data-manipulation-school", firstLesson: "string-methods", title: "Data Manipulation (WCTC)", desc: "Course notes: strings, dates, combining, pivots.", lessons: 5 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-sm font-medium">python-mastery</span>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/learn" className="hover:text-foreground transition-colors">Lessons</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 sm:py-16">
        <section className="max-w-2xl">
          <h1 className="font-mono text-xl text-foreground">python-mastery</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Lessons I built while picking up Python and pandas. Code runs in
            the browser via Pyodide so I can come back to my own examples on
            any machine without setting up an environment first.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Nine modules, fifty-one lessons, three guided projects. Some
            modules mirror WCTC coursework, others I added when I wanted to
            drill on something.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Modules
          </h2>
          <ul className="divide-y divide-border/50 border-y border-border/50">
            {modules.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/learn/${m.slug}/${m.firstLesson}`}
                  className="grid grid-cols-[3rem_1fr_auto] gap-4 py-3 items-baseline hover:bg-card/50 -mx-3 px-3 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="font-mono text-xs text-accent">{m.num}</span>
                  <div className="min-w-0">
                    <p className="text-foreground font-medium">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{m.lessons} lessons</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Projects
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Three guided projects sit alongside the lessons. They&apos;re
            longer-form practice that reuses what the modules cover.
          </p>
          <Link
            href="/projects"
            className="mt-3 inline-block text-sm text-accent hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            Open the project list →
          </Link>
        </section>
      </main>

      <footer className="border-t border-border/50 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="font-mono">python-mastery</span>
          <span>Personal practice. Next.js + Pyodide.</span>
        </div>
      </footer>
    </div>
  );
}
