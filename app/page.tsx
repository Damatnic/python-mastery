import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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

      {/* Hero with Gradient */}
      <main className="relative pt-24 flex-1 flex flex-col">
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-accent/30 via-accent/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 via-accent/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-sm text-accent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              No installation required
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Master Python
              <br />
              <span className="bg-gradient-to-r from-accent via-purple-400 to-accent bg-clip-text text-transparent">
                Through Practice
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Write real Python and pandas code directly in your browser.
              35 interactive lessons, 3 guided projects, and instant feedback
              to take you from basics to data analysis.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/learn"
                className="btn-primary px-8 py-3.5 text-lg font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow"
              >
                Start Learning Free
              </Link>
              <Link
                href="/projects"
                className="btn-secondary px-8 py-3.5 text-lg font-semibold"
              >
                View Projects
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">35</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">7</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </div>

          {/* Right: Code Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">lesson_1.py</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded bg-success/20 text-success">Python Ready</span>
                </div>
              </div>
              {/* Code */}
              <div className="p-6 font-mono text-sm">
                <pre className="text-foreground leading-relaxed">
                  <code>
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-blue-400">pandas</span>{" "}
                    <span className="text-purple-400">as</span>{" "}
                    <span className="text-blue-400">pd</span>{"\n\n"}
                    <span className="text-muted-foreground"># Load your data</span>{"\n"}
                    <span className="text-blue-300">df</span>{" "}
                    <span className="text-accent">=</span>{" "}
                    <span className="text-blue-400">pd</span>
                    <span className="text-accent">.</span>
                    <span className="text-yellow-300">read_csv</span>
                    <span className="text-foreground">(</span>
                    <span className="text-green-400">&quot;sales.csv&quot;</span>
                    <span className="text-foreground">)</span>{"\n\n"}
                    <span className="text-muted-foreground"># Quick analysis</span>{"\n"}
                    <span className="text-yellow-300">print</span>
                    <span className="text-foreground">(</span>
                    <span className="text-blue-300">df</span>
                    <span className="text-accent">.</span>
                    <span className="text-yellow-300">describe</span>
                    <span className="text-foreground">())</span>
                  </code>
                </pre>
              </div>
              {/* Output */}
              <div className="border-t border-border bg-background/50 p-4">
                <div className="text-xs text-muted-foreground mb-2">Output:</div>
                <pre className="text-xs text-foreground font-mono leading-relaxed">
                  {`       price    quantity
count  1000.00    1000.00
mean    49.99       5.32
std     28.86       3.21
min      5.00       1.00
max     99.99      15.00`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="py-24 border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Complete Learning Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              7 modules covering everything from Python basics to building data pipelines
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: "🎯",
                title: "Python Basics",
                desc: "Variables, lists, dicts, loops, functions",
                lessons: 5,
              },
              {
                num: "02",
                icon: "📊",
                title: "Pandas Fundamentals",
                desc: "DataFrames, selecting, filtering, sorting",
                lessons: 5,
              },
              {
                num: "03",
                icon: "🧹",
                title: "Data Cleaning",
                desc: "Missing data, type conversion, duplicates",
                lessons: 5,
              },
              {
                num: "04",
                icon: "🔗",
                title: "Grouping & Combining",
                desc: "GroupBy, merging, pivot tables",
                lessons: 5,
              },
              {
                num: "05",
                icon: "📝",
                title: "String & File Ops",
                desc: "String methods, regex, file I/O, JSON",
                lessons: 5,
              },
              {
                num: "06",
                icon: "🌐",
                title: "Web & APIs",
                desc: "HTTP requests, JSON parsing, pipelines",
                lessons: 5,
              },
              {
                num: "07",
                icon: "⚡",
                title: "Functions & Apply",
                desc: "Lambda, apply/map, vectorization",
                lessons: 5,
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border bg-background hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-xs font-mono text-accent">Module {feature.num}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feature.desc}</p>
                <div className="text-xs text-muted">{feature.lessons} lessons</div>
              </div>
            ))}
            {/* Projects Card */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5 flex flex-col items-center justify-center text-center">
              <span className="text-3xl mb-3">🚀</span>
              <h3 className="font-semibold text-lg mb-2">3 Real Projects</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Apply your skills with guided data projects
              </p>
              <Link href="/projects" className="text-sm text-accent hover:underline">
                View projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Learn by doing, not watching
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-accent/30">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Read the Concept</h3>
              <p className="text-muted-foreground">
                Each lesson starts with clear, concise theory and real-world context
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-accent/30">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Write Code</h3>
              <p className="text-muted-foreground">
                Practice in the built-in editor with pandas and numpy pre-loaded
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-accent/30">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Feedback</h3>
              <p className="text-muted-foreground">
                Run your code instantly and see results with automatic validation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-accent/10" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            No signup required. Jump in and write your first Python code in under a minute.
          </p>
          <Link
            href="/learn"
            className="btn-primary px-10 py-4 text-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow"
          >
            Start Lesson 1
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐍</span>
              <span className="font-bold text-lg">Python Mastery</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link href="/learn" className="hover:text-foreground transition-colors">
                Lessons
              </Link>
              <Link href="/projects" className="hover:text-foreground transition-colors">
                Projects
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with Next.js + Pyodide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
