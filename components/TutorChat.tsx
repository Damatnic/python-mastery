"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TutorChatProps {
  lessonTitle: string;
  moduleSlug: string;
  currentCode: string;
  errorMessage?: string;
}

export interface TutorChatHandle {
  openWithPrompt: (prompt: string) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = (slug: string) => `python-mastery-tutor-${slug}`;

export const TutorChat = forwardRef<TutorChatHandle, TutorChatProps>(function TutorChat(
  { lessonTitle, moduleSlug, currentCode, errorMessage }: TutorChatProps,
  ref,
) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [errored, setErrored] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(ref, () => ({
    openWithPrompt: (prompt: string) => {
      setOpen(true);
      setInput((prev) => (prev.trim().length ? prev : prompt));
      setTimeout(() => inputRef.current?.focus(), 50);
    },
  }), []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY(`${moduleSlug}-${lessonTitle}`));
      if (raw) setMessages(JSON.parse(raw));
    } catch {
      // ignore corrupted history
    }
  }, [moduleSlug, lessonTitle]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY(`${moduleSlug}-${lessonTitle}`),
        JSON.stringify(messages),
      );
    } catch {
      // storage full or disabled
    }
  }, [messages, moduleSlug, lessonTitle]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, busy]);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || busy) return;

    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setErrored(null);

    try {
      const resp = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          context: { lessonTitle, moduleSlug, currentCode, errorMessage },
        }),
      });
      if (!resp.ok) {
        const body = (await resp.json().catch(() => ({}))) as { error?: string };
        setErrored(body.error ?? `tutor unavailable (status ${resp.status})`);
        return;
      }
      const data = (await resp.json()) as { content?: string };
      if (data.content) {
        setMessages([...next, { role: "assistant", content: data.content }]);
      }
    } catch {
      setErrored("network error contacting tutor.");
    } finally {
      setBusy(false);
    }
  }

  function clear() {
    setMessages([]);
    setErrored(null);
  }

  // No own floating launcher, the bottom-right tool dock is the single
  // entry point (opened via openWithPrompt). Avoids stacking on the dock.
  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex h-[min(40rem,calc(100vh-7rem))] w-[min(30rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-stone-700 bg-stone-950/95 shadow-2xl backdrop-blur"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="AI tutor chat"
    >
      <div className="flex items-center justify-between border-b border-stone-800 bg-stone-900/60 px-3 py-2 font-mono text-xs">
        <span>
          <span className="text-emerald-400">✦ tutor</span>
          <span className="ml-2 text-stone-500">refuses to hand you the answer</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clear}
            className="rounded px-1.5 py-0.5 text-stone-400 hover:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-500"
            aria-label="Clear conversation"
          >
            clear
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded px-1.5 py-0.5 text-stone-400 hover:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-500"
            aria-label="Close tutor"
          >
            ×
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm"
        role="log"
        aria-live="polite"
        aria-label="tutor conversation"
      >
        {messages.length === 0 && (
          <p className="font-mono text-xs text-stone-500">
            ask in your own words. i&apos;ll point at the next move, i won&apos;t write the solution.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded border px-3 py-2 leading-relaxed ${
              m.role === "user"
                ? "border-stone-700 bg-stone-900/40 text-stone-100"
                : "border-emerald-400/20 bg-emerald-400/[0.04] text-stone-100"
            }`}
          >
            <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-stone-500">
              {m.role === "user" ? "you" : "tutor"}
            </p>
            <div className="prose prose-sm prose-invert max-w-none [&_pre]:my-2 [&_pre]:bg-stone-950 [&_pre]:border [&_pre]:border-stone-800 [&_pre]:rounded [&_pre]:px-3 [&_pre]:py-2 [&_code]:font-mono [&_p]:my-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {busy && (
          <p className="font-mono text-xs text-stone-500" role="status" aria-live="polite">
            <span className="text-emerald-400">tutor</span> thinking...
          </p>
        )}
        {errored && (
          <p
            className="rounded border border-rose-400/30 bg-rose-400/[0.04] px-3 py-2 font-mono text-xs text-rose-300"
            role="alert"
            aria-live="assertive"
          >
            {errored}
          </p>
        )}
      </div>

      <div className="border-t border-stone-800 bg-stone-900/40 p-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={2}
          placeholder="ask about this lesson. enter to send, shift+enter for newline."
          className="w-full resize-none rounded border border-stone-800 bg-stone-950 px-2 py-1.5 font-mono text-xs text-stone-200 placeholder:text-stone-600 focus:border-emerald-400 focus:outline-none"
          disabled={busy}
          aria-label="Tutor input"
        />
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-stone-500">
          <span>
            History saved locally per lesson. Code and lesson title are sent with each message.
          </span>
          <button
            type="button"
            onClick={send}
            disabled={busy || input.trim().length === 0}
            className="rounded border border-emerald-400/40 bg-stone-950 px-2 py-0.5 font-mono text-[11px] text-emerald-300 hover:border-emerald-400 hover:text-emerald-200 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
});
