"use client";

import Link from "next/link";

export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-mono text-sm">
      <header className="border-b border-border/60">
        <div className="max-w-3xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
            <span className="text-accent">$</span> cd ~
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">lessons</Link>
            <Link href="/glossary" className="text-muted-foreground hover:text-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">glossary</Link>
            <Link href="/next-steps" className="text-muted-foreground hover:text-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">next steps</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <h1 className="text-2xl font-semibold">Start here</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          This is a place to learn Python by writing it, right in your browser, with nothing to install.
          If you have never coded before, that is fine. The first module assumes you know nothing and gets
          you running real code in about a minute.
        </p>

        <section className="mt-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground"># the path</p>
          <ol className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
            <li><span className="text-accent">01</span>  <span className="text-foreground">Start Here</span> module: what code is, your first line, what a variable is.</li>
            <li><span className="text-accent">02</span>  <span className="text-foreground">Python Basics</span>: variables, lists, dictionaries, loops, functions.</li>
            <li><span className="text-accent">03</span>  <span className="text-foreground">Core Python Deep Dive</span>: the language features that make you fluent.</li>
            <li><span className="text-accent">04</span>  The data track (pandas, NumPy) and the rest, in order down the list.</li>
            <li><span className="text-accent">05</span>  <Link href="/projects" className="text-foreground hover:text-accent transition-colors">Projects</Link>: put it together on something real.</li>
          </ol>
          <p className="mt-4 text-muted-foreground">
            You do not have to plan it. Just start at the top and let each module unlock the next.
          </p>
        </section>

        <section className="mt-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground"># how each lesson works</p>
          <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed">
            <li><span className="text-foreground">Theory</span> explains the idea in plain words.</li>
            <li><span className="text-foreground">Examples</span> show it running. Change a number and re-run them. Breaking things on purpose teaches a lot.</li>
            <li><span className="text-foreground">Challenges</span> make you write it. This is the part that actually builds the skill, so do not skip it.</li>
          </ul>
        </section>

        <section className="mt-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground"># how to actually learn it</p>
          <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed">
            <li>Write the challenges from memory before you peek. The struggle is where it sticks.</li>
            <li>The site spaces finished lessons back to you over days. That spacing is the difference between cramming something and actually remembering it.</li>
            <li>Short and often beats long and rare. Fifteen minutes a day will outrun a weekly cram.</li>
          </ul>
        </section>

        <section className="mt-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground"># when you get stuck</p>
          <ol className="mt-4 space-y-2 text-muted-foreground leading-relaxed">
            <li>1. Read the error. It names what broke and which line. It is help, not scolding.</li>
            <li>2. Re-read the prompt. Half of being stuck is a misread instruction.</li>
            <li>3. Open the hint.</li>
            <li>4. Ask the tutor (the dock at the bottom right). It asks the question that unsticks you instead of handing over the answer.</li>
          </ol>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/learn/start-here/how-this-works"
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-accent text-accent hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            begin: your first line of code →
          </Link>
          <Link
            href="/next-steps"
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            where this leads (going pro) →
          </Link>
        </div>
      </main>

      <footer className="border-t border-border/60 py-5 text-xs">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
          <span><span className="text-success">exit 0</span> · you can do this</span>
          <Link href="/" className="hover:text-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">~ home</Link>
        </div>
      </footer>
    </div>
  );
}
