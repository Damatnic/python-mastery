"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen flex flex-col bg-background text-foreground font-mono text-sm">
      <section className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <p>
          <span className="text-accent">damato@python</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-muted-foreground">~$</span> <span>./app</span>
        </p>

        <p className="mt-4 text-error">
          error: {error.message || "something went wrong"}
        </p>

        {error.digest && (
          <p className="mt-1 text-xs text-muted-foreground">digest: {error.digest}</p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="px-3 py-2 rounded border border-border hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="text-accent">$</span> retry
          </button>
          <Link
            href="/"
            className="px-3 py-2 rounded border border-border hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="text-accent">→</span> back to ~
          </Link>
        </div>

        <p className="mt-10">
          <span className="text-accent">damato@python</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-muted-foreground">~$</span>{" "}
          <span className="ml-1 inline-block w-2 h-4 align-text-bottom bg-foreground terminal-cursor" aria-hidden="true" />
        </p>
      </section>

      <footer className="border-t border-border py-5 text-xs">
        <div className="max-w-3xl mx-auto px-6 text-muted-foreground">
          <span className="text-error">exit 1</span> · unexpected runtime error
        </div>
      </footer>
    </main>
  );
}
