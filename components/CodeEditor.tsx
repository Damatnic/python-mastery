"use client";

import { useCallback, useRef, useEffect } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  disabled?: boolean;
}

export function CodeEditor({
  code,
  onChange,
  onRun,
  disabled = false,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Shift+Enter, Ctrl+Enter, or Cmd+Enter to run
      if ((e.shiftKey || e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onRun();
        return;
      }

      // Tab key handling for indentation
      if (e.key === "Tab") {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const value = target.value;
        const newValue = value.substring(0, start) + "    " + value.substring(end);
        onChange(newValue);
        // Set cursor position after the inserted spaces
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 4;
        }, 0);
      }
    },
    [onRun, onChange]
  );

  // Add line numbers
  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  useEffect(() => {
    // Sync scroll between line numbers and textarea
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleScroll = () => {
      const lineNumbersEl = textarea.previousElementSibling as HTMLElement;
      if (lineNumbersEl) {
        lineNumbersEl.scrollTop = textarea.scrollTop;
      }
    };

    textarea.addEventListener("scroll", handleScroll);
    return () => textarea.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-full rounded-lg overflow-hidden border border-border bg-[#1e1e1e]">
      <div className="flex h-full">
        {/* Line numbers */}
        <div
          className="flex-shrink-0 py-4 px-2 text-right select-none overflow-hidden text-muted-foreground text-sm font-mono border-r border-border bg-[#252526]"
          style={{ width: "3rem" }}
        >
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          spellCheck={false}
          className="flex-1 resize-none p-4 bg-transparent text-foreground font-mono text-sm leading-6 outline-none disabled:opacity-50"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            tabSize: 4,
          }}
        />
      </div>
      {disabled && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="relative mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center border border-accent/20">
              <span className="text-2xl">🐍</span>
            </div>
            <svg
              className="absolute inset-0 w-14 h-14 animate-spin"
              style={{ animationDuration: "2s" }}
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100 50"
                strokeLinecap="round"
                className="text-accent"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-foreground">Loading Python</span>
          <span className="text-xs text-muted-foreground">Setting up pandas & numpy...</span>
        </div>
      )}
    </div>
  );
}
