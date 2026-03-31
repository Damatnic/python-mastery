import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <span className="font-bold text-xl">Python Mastery</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/learn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Lessons
            </Link>
            <Link
              href="/projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link href="/learn" className="btn-primary">
              Start Learning
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-5xl font-bold leading-tight">
            Master Python Through
            <span className="text-accent"> Interactive Practice</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Write real Python code in your browser. Get instant feedback. Learn
            by doing with 35 hands-on lessons covering Python basics, pandas,
            data cleaning, APIs, and more.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/learn"
              className="btn-primary px-8 py-3 text-lg font-semibold"
            >
              Start Learning Free
            </Link>
            <a
              href="#features"
              className="btn-secondary px-8 py-3 text-lg font-semibold"
            >
              See Curriculum
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>No setup required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>Runs in browser</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>Instant feedback</span>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="py-20 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Python Basics",
                desc: "Variables, lists, dicts, loops, functions, and comprehensions",
              },
              {
                icon: "📊",
                title: "Pandas Fundamentals",
                desc: "DataFrames, selecting, filtering, sorting, and reading files",
              },
              {
                icon: "🧹",
                title: "Data Cleaning",
                desc: "Handle missing data, convert types, clean strings, remove duplicates",
              },
              {
                icon: "🔗",
                title: "Grouping & Combining",
                desc: "GroupBy aggregations, merging datasets, pivot tables",
              },
              {
                icon: "📝",
                title: "String & File Ops",
                desc: "String methods, regex, file I/O, JSON handling, error handling",
              },
              {
                icon: "🌐",
                title: "Web & APIs",
                desc: "HTTP requests, JSON parsing, BeautifulSoup, building pipelines",
              },
              {
                icon: "⚡",
                title: "Functions & Apply",
                desc: "Lambda functions, apply/map, custom aggregations, vectorization",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-border bg-background"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Jump in and write your first Python code in under a minute.
          </p>
          <Link
            href="/learn"
            className="btn-primary px-8 py-3 text-lg font-semibold"
          >
            Begin Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js and Pyodide. Python runs entirely in your
            browser.
          </p>
        </div>
      </footer>
    </div>
  );
}
