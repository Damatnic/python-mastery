"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "python-mastery-onboarding-seen";

interface Step {
  selector: string;
  text: string;
  placement: "top" | "bottom" | "left";
}

const STEPS: Step[] = [
  {
    selector: "#lesson-anchor-nav",
    text: "theory teaches it. examples show it. challenges make you do it. project ties it together.",
    placement: "bottom",
  },
  {
    selector: "#code-editor-pane",
    text: "your code runs here. live, no install. ⌘+enter runs.",
    placement: "left",
  },
  {
    selector: "#tutor-button",
    text: "stuck? this won't give you the answer — but it'll ask the question that gets you unstuck.",
    placement: "top",
  },
];

export function InterfaceOnboarding() {
  const [step, setStep] = useState<number>(-1);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }
    const t = setTimeout(() => setStep(0), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step < 0 || step >= STEPS.length) return;
    const el = document.querySelector(STEPS[step].selector);
    if (!el) {
      setStep((s) => s + 1);
      return;
    }
    const update = () => setRect(el.getBoundingClientRect());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [step]);

  function done() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setStep(-1);
  }

  if (step < 0 || step >= STEPS.length || !rect) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  let top = rect.bottom + 12;
  let left = rect.left;
  if (current.placement === "top") {
    top = rect.top - 12 - 100;
  }
  if (current.placement === "left") {
    top = rect.top;
    left = Math.max(12, rect.left - 320);
  }

  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    top: `${Math.max(12, top)}px`,
    left: `${Math.min(left, window.innerWidth - 320)}px`,
    width: "300px",
    zIndex: 60,
  };

  const highlightStyle: React.CSSProperties = {
    position: "fixed",
    top: `${rect.top - 4}px`,
    left: `${rect.left - 4}px`,
    width: `${rect.width + 8}px`,
    height: `${rect.height + 8}px`,
    border: "2px solid var(--accent, #a855f7)",
    borderRadius: "8px",
    pointerEvents: "none",
    zIndex: 59,
    boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
  };

  return (
    <>
      <div style={highlightStyle} />
      <div
        role="dialog"
        aria-label="interface tour"
        style={tooltipStyle}
        className="rounded border border-accent bg-stone-950 px-4 py-3 font-mono text-xs shadow-2xl"
      >
        <p className="text-stone-100 leading-relaxed">{current.text}</p>
        <div className="mt-3 flex items-center justify-between text-[10px] text-stone-500">
          <span>
            step {step + 1} of {STEPS.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={done}
              className="rounded px-2 py-1 text-stone-400 hover:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              skip
            </button>
            <button
              type="button"
              onClick={() => (isLast ? done() : setStep(step + 1))}
              className="rounded border border-accent px-2 py-1 text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {isLast ? "got it" : "next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
